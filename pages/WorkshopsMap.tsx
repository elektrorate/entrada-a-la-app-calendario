
import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Badge, Button, Input, Select } from '../components/UI';
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mapa de Talleres</h1>
          <p className="text-gray-500">Visualiza la distribución geográfica de tus centros</p>
        </div>
        <div className="flex gap-2">
           <Button variant={filters.onlyNoAdmin ? 'primary' : 'outline'} size="sm" onClick={() => setFilters(f => ({...f, onlyNoAdmin: !f.onlyNoAdmin}))}>Solo sin admin</Button>
           <Button variant={filters.onlyActive ? 'primary' : 'outline'} size="sm" onClick={() => setFilters(f => ({...f, onlyActive: !f.onlyActive}))}>Solo activos</Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
        <div className="flex-1 min-h-[300px] lg:min-h-0 relative bg-white rounded-xl shadow-sm border overflow-hidden">
            <MockMap 
                workshops={filteredWorkshops} 
                onPinClick={setSelectedWorkshop} 
                selectedWorkshopId={selectedWorkshop?.id}
            />

            {selectedWorkshop && (
                <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 animate-fade-in-up z-30">
                    <Card className="p-4 shadow-2xl border-blue-100">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-gray-900">{selectedWorkshop.nombre}</h3>
                                <p className="text-xs text-gray-500">{selectedWorkshop.ciudad}, {selectedWorkshop.pais}</p>
                            </div>
                            <button onClick={() => setSelectedWorkshop(null)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">&times;</button>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="text-xs flex flex-col">
                                <span className="text-gray-400 font-medium uppercase tracking-tighter">Admin General</span>
                                <span className="text-gray-900 font-semibold">
                                    {users.find(u => u.id === selectedWorkshop.adminGeneralUserId)?.nombre || 'Sin asignar'}
                                </span>
                            </div>
                            <div className="text-xs flex flex-col">
                                <span className="text-gray-400 font-medium uppercase tracking-tighter">Dirección</span>
                                <span className="text-gray-900">{selectedWorkshop.direccion}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="primary" size="sm" className="flex-1" onClick={() => navigate(`/talleres/${selectedWorkshop.id}`)}>Ver detalle</Button>
                            {!selectedWorkshop.adminGeneralUserId && (
                                <Button variant="outline" size="sm" className="flex-1">Asignar admin</Button>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </div>

        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 bg-white rounded-xl shadow-sm border p-4 overflow-hidden">
            <div className="space-y-3 shrink-0">
                <Input placeholder="Buscar por nombre..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} className="h-9" />
                <Select 
                  options={[{label: 'Todos los países', value: 'Todos'}, ...countryList.map(c => ({label: c, value: c}))]} 
                  value={filters.pais} 
                  onChange={e => setFilters({...filters, pais: e.target.value, ciudad: 'Todas'})} 
                  className="h-9" 
                />
                <Select 
                  options={availableCities.map(c => ({label: c, value: c}))} 
                  value={filters.ciudad} 
                  onChange={e => setFilters({...filters, ciudad: e.target.value})} 
                  className="h-9"
                  disabled={filters.pais === 'Todos'}
                />
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredWorkshops.map(w => (
                    <div 
                        key={w.id} 
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedWorkshop?.id === w.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
                        onClick={() => setSelectedWorkshop(w)}
                    >
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-gray-900 truncate pr-2">{w.nombre}</h4>
                            <Badge variant={w.estado === WorkshopStatus.ACTIVE ? 'success' : 'neutral'}>{w.estado === WorkshopStatus.ACTIVE ? 'OK' : 'OFF'}</Badge>
                        </div>
                        <p className="text-xs text-gray-500">{w.ciudad}</p>
                        {!w.adminGeneralUserId && <p className="text-[10px] text-orange-600 font-bold mt-1">SÍN ADMIN</p>}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
