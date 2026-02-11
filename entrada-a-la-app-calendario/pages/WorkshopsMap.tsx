
import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Badge, Button, Input, Select, Icon } from '../components/UI';
import { WorkshopStatus, Workshop } from '../types';
import { useNavigate } from 'react-router-dom';
import { MockMap } from '../components/MockMap';
import { countriesData, countryList } from '../data/locations';

export const WorkshopsMap: React.FC = () => {
  const { workshops, users } = useAppContext();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    search: '',
    pais: 'Todos',
    ciudad: 'Todas',
    onlyNoAdmin: false,
    onlyActive: true
  });

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const availableCities = useMemo(() => {
    if (filters.pais === 'Todos') return ['Todas'];
    return ['Todas', ...(countriesData[filters.pais] || [])];
  }, [filters.pais]);

  useEffect(() => {
    if (filters.pais !== 'Todos' && filters.ciudad !== 'Todas' && !countriesData[filters.pais]?.includes(filters.ciudad)) {
      setFilters(prev => ({ ...prev, ciudad: 'Todas' }));
    }
  }, [filters.pais]);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(w => {
      const matchesSearch = !filters.search || w.nombre.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPais = filters.pais === 'Todos' || w.pais === filters.pais;
      const matchesCiudad = filters.ciudad === 'Todas' || w.ciudad === filters.ciudad;
      const matchesNoAdmin = !filters.onlyNoAdmin || !w.adminGeneralUserId;
      const matchesActive = !filters.onlyActive || w.estado === WorkshopStatus.ACTIVE;
      return matchesSearch && matchesPais && matchesCiudad && matchesNoAdmin && matchesActive;
    });
  }, [workshops, filters]);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2 shrink-0">
        <div>
          <p className="eyebrow">Localización Global</p>
          <h1 className="title-huge text-[#312A2C]">Mapa de Red</h1>
          <div className="accent-line mt-2"></div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="primary" className="!py-6 gap-4" onClick={() => navigate('/talleres/nuevo')}>
                NUEVA SEDE
                <Icon.ArrowUpRight />
           </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
        <div className="flex-1 min-h-[300px] lg:min-h-0 relative bg-white rounded-[48px] shadow-sm border border-[#F1E9E2] overflow-hidden">
            <MockMap 
                workshops={filteredWorkshops} 
                onPinClick={setSelectedWorkshop} 
                selectedWorkshopId={selectedWorkshop?.id}
            />

            {selectedWorkshop && (
                <div className="absolute top-8 left-8 right-8 md:right-auto md:w-96 animate-fade-in z-30">
                    <Card className="!p-8 shadow-2xl border-none">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="eyebrow !text-[10px] mb-1">{selectedWorkshop.ciudad}, {selectedWorkshop.pais}</p>
                                <h3 className="text-2xl font-extrabold text-[#312A2C] tracking-tighter">{selectedWorkshop.nombre}</h3>
                            </div>
                            <button onClick={() => setSelectedWorkshop(null)} className="w-10 h-10 rounded-full hover:bg-[#F9F6F2] flex items-center justify-center transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A8481" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex flex-col">
                                <span className="eyebrow !text-[9px] opacity-60">Admin General</span>
                                <span className="text-[14px] font-bold text-[#312A2C]">
                                    {users.find(u => u.id === selectedWorkshop.adminGeneralUserId)?.nombre || 'Sin asignar'}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="primary" size="sm" className="flex-1 !rounded-[20px]" onClick={() => navigate(`/talleres/${selectedWorkshop.id}`)}>VER DETALLE</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>

        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 bg-white rounded-[48px] shadow-sm border border-[#F1E9E2] p-8 overflow-hidden">
            <div className="space-y-4 shrink-0">
                <Input placeholder="Buscar por nombre..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
                <Select 
                  options={[{label: 'Todos los países', value: 'Todos'}, ...countryList.map(c => ({label: c, value: c}))]} 
                  value={filters.pais} 
                  onChange={e => setFilters({...filters, pais: e.target.value, ciudad: 'Todas'})} 
                />
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">
                {filteredWorkshops.map(w => (
                    <div 
                        key={w.id} 
                        className={`p-6 rounded-[32px] border transition-all cursor-pointer ${selectedWorkshop?.id === w.id ? 'border-[#C17D5C] bg-[#FDF8F3] shadow-md' : 'border-transparent bg-[#F9F6F2] hover:bg-[#F4EEE8]'}`}
                        onClick={() => setSelectedWorkshop(w)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-extrabold text-sm text-[#312A2C] truncate pr-2 uppercase tracking-tighter">{w.nombre}</h4>
                            <Badge variant={w.estado === WorkshopStatus.ACTIVE ? 'yellow' : 'neutral'}>{w.estado === WorkshopStatus.ACTIVE ? 'OK' : 'OFF'}</Badge>
                        </div>
                        <p className="eyebrow !text-[10px] !text-[#8A8481]">{w.ciudad}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
