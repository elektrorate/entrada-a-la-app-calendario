
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, KpiCard, Button, Badge, Icon } from '../components/UI';
import { useNavigate } from 'react-router-dom';
import { WorkshopStatus } from '../types';

export const Dashboard: React.FC = () => {
  const { workshops, activityLogs } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="space-y-16 animate-fade-in">
      
      {/* Analíticas Principales */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <KpiCard 
          title="Centros de Barro"
          value={workshops.filter(w => w.estado === WorkshopStatus.ACTIVE).length.toString().padStart(2, '0')}
          subtitle="Red Global"
          subValue={workshops.length.toString().padStart(2, '0')}
          onAction={() => navigate('/talleres')}
        />
        <KpiCard 
          title="Crecimiento Mensual"
          value="€14.2k"
          subtitle="Objetivo Q4"
          subValue="+€2.1k"
          onAction={() => navigate('/reportes')}
        />
        
        <div className="premium-card p-10 flex flex-col justify-between bg-white border-none shadow-xl">
            <div className="space-y-4">
                <div className="w-14 h-14 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <Icon.Target />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tighter">Acceso Directo</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">Configura los nuevos centros de producción y supervisa la actividad global.</p>
            </div>
            <div className="space-y-4 mt-8">
                <Button variant="primary" className="w-full justify-between shadow-lg" onClick={() => navigate('/talleres/nuevo')}>
                    CREAR NUEVO TALLER
                    <Icon.ArrowUpRight />
                </Button>
                <Button variant="outline" className="w-full justify-between" onClick={() => navigate('/talleres')}>
                    GESTIONAR RED
                </Button>
            </div>
        </div>
      </section>

      {/* Actividad e Información */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-sm font-extrabold tracking-[0.3em] uppercase text-[#111111]">LÍNEA DE TIEMPO</h2>
                <Badge variant="outline">TIEMPO REAL</Badge>
              </div>
              <div className="space-y-4">
                  {activityLogs.slice(0, 4).map(log => (
                      <Card key={log.id} className="!p-6 group hover:border-[#111111]">
                          <div className="flex items-center gap-6">
                              <div className="w-14 h-14 bg-[#F2F2F2] rounded-full flex items-center justify-center text-xl group-hover:bg-[#F4D000] transition-colors">
                                  {log.accion.includes('Taller') ? '🏺' : '👤'}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                  <p className="text-lg font-extrabold tracking-tight truncate">{log.accion.toUpperCase()}</p>
                                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{log.usuario} • {log.fecha}</p>
                              </div>
                              <Button variant="circular" size="sm" onClick={() => log.tallerId && navigate(`/talleres/${log.tallerId}`)}>
                                <Icon.ArrowUpRight />
                              </Button>
                          </div>
                      </Card>
                  ))}
              </div>
          </div>

          <div className="space-y-8">
              <h2 className="text-sm font-extrabold tracking-[0.3em] uppercase text-[#111111] px-2">RESUMEN GEOGRÁFICO</h2>
              <Card className="bg-[#1A1A1A] text-white border-none p-10 space-y-10 shadow-2xl rounded-[40px]">
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500">Alertas</p>
                    <div className="flex items-baseline gap-4">
                        <span className="text-6xl font-extrabold text-[#F4D000] tracking-tighter">04</span>
                        <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Sin Admin</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/5 w-full"></div>

                  <div className="space-y-6">
                      <div className="flex justify-between items-center">
                          <p className="text-sm font-bold tracking-widest text-gray-400">ESPAÑA</p>
                          <p className="text-xl font-extrabold">12</p>
                      </div>
                      <div className="flex justify-between items-center">
                          <p className="text-sm font-bold tracking-widest text-gray-400">PORTUGAL</p>
                          <p className="text-xl font-extrabold">03</p>
                      </div>
                  </div>

                  <Button variant="primary" className="w-full !py-6 text-xs tracking-[0.2em]">
                      DESCARGAR DATA
                  </Button>
              </Card>
          </div>
      </div>
    </div>
  );
};
