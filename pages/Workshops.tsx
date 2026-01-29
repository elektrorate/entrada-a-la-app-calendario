
import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { ListCard, SearchPill, EmptyState, Select, Card } from '../components/UI';
import { WorkshopStatus } from '../types';
import { useNavigate } from 'react-router-dom';
import { countryList, countriesData } from '../data/locations';

export const Workshops: React.FC = () => {
  const { workshops, users } = useAppContext();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState('');
  const [filterPais, setFilterPais] = useState('Todos');
  const [filterCiudad, setFilterCiudad] = useState('Todas');
  const [filterEstado, setFilterEstado] = useState('TODOS');

  // Reiniciar ciudad si cambia el país
  useEffect(() => {
    setFilterCiudad('Todas');
  }, [filterPais]);

  const availableCities = useMemo(() => {
    if (filterPais === 'Todos') return ['Todas'];
    return ['Todas', ...(countriesData[filterPais] || [])];
  }, [filterPais]);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(w => {
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || 
        w.nombre.toLowerCase().includes(searchLower) || 
        w.direccion.toLowerCase().includes(searchLower);
      
      const matchesPais = filterPais === 'Todos' || w.pais === filterPais;
      const matchesCiudad = filterCiudad === 'Todas' || w.ciudad === filterCiudad;
      const matchesEstado = filterEstado === 'TODOS' || 
        (filterEstado === 'ACTIVOS' && w.estado === WorkshopStatus.ACTIVE) ||
        (filterEstado === 'INACTIVOS' && w.estado === WorkshopStatus.INACTIVE);

      return matchesSearch && matchesPais && matchesCiudad && matchesEstado;
    });
  }, [workshops, search, filterPais, filterCiudad, filterEstado]);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
      
      {/* Controles de Búsqueda y Filtros */}
      <div className="space-y-6">
        <div className="flex justify-center">
            <SearchPill 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Busca por nombre de taller o dirección..." 
            />
        </div>

        <Card className="!p-8 bg-white/50 backdrop-blur-sm border-[#F1E9E2]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select 
              label="Filtrar por País"
              value={filterPais}
              onChange={(e) => setFilterPais(e.target.value)}
              options={[
                { label: 'Todos los Países', value: 'Todos' },
                ...countryList.map(c => ({ label: c, value: c }))
              ]}
            />
            
            <Select 
              label="Filtrar por Ciudad"
              value={filterCiudad}
              onChange={(e) => setFilterCiudad(e.target.value)}
              disabled={filterPais === 'Todos'}
              options={availableCities.map(c => ({ label: c, value: c }))}
            />

            <Select 
              label="Estado de Red"
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              options={[
                { label: 'Todos los Estados', value: 'TODOS' },
                { label: 'Solo Activos', value: 'ACTIVOS' },
                { label: 'Solo Inactivos', value: 'INACTIVOS' }
              ]}
            />
          </div>
        </Card>
      </div>

      {/* Listado de Talleres */}
      <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[11px] font-extrabold tracking-[0.4em] text-gray-400 uppercase">
              RESULTADOS LOCALIZADOS ({filteredWorkshops.length})
            </h2>
            {(filterPais !== 'Todos' || filterCiudad !== 'Todas' || filterEstado !== 'TODOS' || search) && (
              <button 
                onClick={() => {
                  setFilterPais('Todos');
                  setFilterCiudad('Todas');
                  setFilterEstado('TODOS');
                  setSearch('');
                }}
                className="text-[10px] font-bold text-[#C17D5C] uppercase tracking-widest hover:underline"
              >
                Limpiar Filtros
              </button>
            )}
          </div>

          {filteredWorkshops.length === 0 ? (
            <EmptyState 
              title="Sin coincidencias" 
              subtitle="No hemos encontrado talleres que coincidan con la selección de país o ciudad actual." 
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
                {filteredWorkshops.map(w => {
                    const admin = users.find(u => u.id === w.adminGeneralUserId);
                    return (
                        <ListCard 
                            key={w.id}
                            title={w.nombre}
                            subtitle={`${w.ciudad}, ${w.pais}`}
                            info={admin ? `Responsable: ${admin.nombre}` : 'Sin administrador asignado'}
                            badge={w.estado === WorkshopStatus.ACTIVE ? undefined : 'INACTIVO'}
                            onView={() => navigate(`/talleres/${w.id}`)}
                            onEdit={() => navigate(`/talleres/editar/${w.id}`)}
                        />
                    );
                })}
            </div>
          )}
      </div>
    </div>
  );
};
