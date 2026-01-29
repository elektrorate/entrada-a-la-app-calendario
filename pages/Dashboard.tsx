
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, KpiCard, Button, Badge, Icon, ActivityPill, DaySelector } from '../components/UI';
import { useNavigate } from 'react-router-dom';
import { WorkshopStatus } from '../types';

export const Dashboard: React.FC = () => {
  const { workshops, activityLogs } = useAppContext();
  const navigate = useNavigate();

  const days = [
    { num: '17', name: 'Mon' },
    { num: '18', name: 'Tue' },
    { num: '19', name: 'Wed' },
    { num: '20', name: 'Thu' },
    { num: '21', name: 'Fri' },
    { num: '22', name: 'Sat' },
    { num: '23', name: 'Sun' }
  ];

  return (
    <div className="space-y-20 animate-fade-in max-w-6xl mx-auto">
      
      {/* Analíticas Principales */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <KpiCard 
          title="Centros de Barro"
          value={workshops.filter(w => w.estado === WorkshopStatus.ACTIVE).length.toString().padStart(2, '0')}
          subtitle="Red Global Activa"
          subValue={workshops.length.toString().padStart(2, '0')}
          onAction={() => navigate('/talleres')}
        />
        <KpiCard 
          title="Rendimiento Q4"
          value="14.2k€"
          subtitle="Objetivo Alcanzado"
          subValue="+2.1k€"
          onAction={() => navigate('/reportes')}
        />
        
        <div className="premium-card p-10 flex flex-col justify-between border-none bg-white">
            <div className="space-y-6">
                <div className="w-16 h-16 bg-[#C17D5C]/10 rounded-[28px] flex items-center justify-center text-[#C17D5C]">
                  <Icon.Target />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tighter text-[#312A2C] uppercase leading-none">Gestión de Red</h3>
                  <div className="accent-line mt-4"></div>
                </div>
                <p className="text-[15px] text-[#8A8481] font-semibold leading-relaxed">Configura nuevos centros de producción y supervisa la actividad global.</p>
            </div>
            <div className="space-y-4 mt-10">
                <Button variant="primary" className="w-full justify-between !py-6" onClick={() => navigate('/talleres/nuevo')}>
                    NUEVA SEDE
                    <Icon.ArrowUpRight />
                </Button>
                <Button variant="outline" className="w-full justify-between border-transparent bg-[#F9F6F2] !py-6" onClick={() => navigate('/talleres')}>
                    LISTADO TOTAL
                </Button>
            </div>
        </div>
      </section>

      {/* SECCIÓN DAILY ACTIVITY (Inspirada en la referencia) */}
      <section className="space-y-12">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-5xl font-extrabold text-[#312A2C] tracking-tighter uppercase">Daily Activity</h2>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F1E9E2]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#F1E9E2]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#F1E9E2]"></div>
          </div>
        </div>

        <DaySelector days={days} activeDay="17" />

        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          <ActivityPill 
            label="Talleres" 
            value="12 / 12 Activos" 
            status="Completed" 
            percentage="100%" 
            iconBg="#C17D5C" 
          />
          <ActivityPill 
            label="Facturación" 
            value="1420 / 1680 €" 
            status="In Progress" 
            percentage="85%" 
            iconBg="#8B6452" 
          />
          <ActivityPill 
            label="Inscripciones" 
            value="22 / 30 Pax" 
            status="In Progress" 
            percentage="73%" 
            iconBg="#312A2C" 
          />
        </div>
      </section>

      {/* Distribución Geográfica */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch pb-10">
          <Card className="bg-[#312A2C] text-white border-none p-12 space-y-12 shadow-2xl rounded-[48px]">
              <div className="space-y-4">
                <p className="eyebrow !text-white/40">Notificaciones Críticas</p>
                <div className="flex items-baseline gap-6">
                    <span className="text-8xl font-extrabold text-[#C17D5C] tracking-tighter leading-none">04</span>
                    <span className="text-[14px] text-white/50 font-bold uppercase tracking-[0.2em]">Talleres<br/>Sin Admin</span>
                </div>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="space-y-6">
                  <div className="flex justify-between items-center group cursor-pointer">
                      <p className="eyebrow !text-white/40 group-hover:!text-white transition-colors">ESPAÑA</p>
                      <p className="text-3xl font-bold tracking-tighter">12</p>
                  </div>
                  <div className="flex justify-between items-center group cursor-pointer">
                      <p className="eyebrow !text-white/40 group-hover:!text-white transition-colors">PORTUGAL</p>
                      <p className="text-3xl font-bold tracking-tighter">03</p>
                  </div>
              </div>
              <Button variant="primary" className="w-full !py-7 !text-[14px] shadow-2xl">
                  EXPORTAR ANALÍTICAS
              </Button>
          </Card>

          <Card className="!p-0 overflow-hidden relative border-none bg-white">
            <div className="p-12 space-y-6">
              <h3 className="text-2xl font-bold text-[#312A2C] tracking-tighter uppercase">Estado de la Red</h3>
              <p className="text-[15px] text-[#8A8481] font-semibold leading-relaxed">
                Supervisión activa del flujo de trabajo y ocupación media de los hornos en tiempo real.
              </p>
              <div className="space-y-6 pt-4">
                <div className="w-full h-2 bg-[#F9F6F2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C17D5C] w-[75%] rounded-full"></div>
                </div>
                <div className="flex justify-between eyebrow !text-[11px]">
                  <span>Ocupación Global</span>
                  <span>75%</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 p-8">
               <div className="w-24 h-24 bg-[#C17D5C]/5 rounded-full flex items-center justify-center">
                  <Icon.Chart />
               </div>
            </div>
          </Card>
      </section>
    </div>
  );
};
