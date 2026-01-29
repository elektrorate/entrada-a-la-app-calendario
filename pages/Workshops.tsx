
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { ListCard, SearchPill, FilterChipsRow, EmptyState } from '../components/UI';
import { WorkshopStatus } from '../types';
import { useNavigate } from 'react-router-dom';

export const Workshops: React.FC = () => {
  const { workshops, users } = useAppContext();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('TODOS');

  const filters = ['TODOS', 'ACTIVOS', 'SIN ADMIN', 'BARCELONA', 'MADRID', 'LISBOA'];

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(w => {
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || w.nombre.toLowerCase().includes(searchLower) || w.ciudad.toLowerCase().includes(searchLower);
      const matchesFilter = 
        activeFilter === 'TODOS' || 
        (activeFilter === 'ACTIVOS' && w.estado === WorkshopStatus.ACTIVE) ||
        (activeFilter === 'SIN ADMIN' && !w.adminGeneralUserId) ||
        w.ciudad.toUpperCase() === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [workshops, search, activeFilter]);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
      
      {/* Controles de Búsqueda */}
      <div className="space-y-8">
        <div className="flex justify-center">
            <SearchPill 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Busca por taller, ciudad o ID..." 
            />
        </div>
        <div className="flex justify-center overflow-hidden">
          <FilterChipsRow 
              items={filters} 
              activeItem={activeFilter} 
              onSelect={setActiveFilter} 
          />
        </div>
      </div>

      {/* Listado de Talleres */}
      <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[11px] font-extrabold tracking-[0.4em] text-gray-400 uppercase">RESULTADOS ({filteredWorkshops.length})</h2>
          </div>

          {filteredWorkshops.length === 0 ? (
            <EmptyState title="Taller no localizado" subtitle="Intenta ajustar los parámetros de búsqueda o limpiar los filtros." />
          ) : (
            <div className="grid grid-cols-1 gap-4">
                {filteredWorkshops.map(w => {
                    const admin = users.find(u => u.id === w.adminGeneralUserId);
                    return (
                        <ListCard 
                            key={w.id}
                            title={w.nombre}
                            subtitle={`${w.ciudad}, ${w.pais}`}
                            info={admin ? `Responsable: ${admin.nombre}` : 'Sín administrador general'}
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
