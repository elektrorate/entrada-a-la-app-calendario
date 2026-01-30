
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Icon, ActivityPill, DaySelector } from '../components/UI';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { workshops } = useAppContext();
  const navigate = useNavigate();

  const days = [
    { num: '17', name: 'MON' },
    { num: '18', name: 'TUE' },
    { num: '19', name: 'WED' },
    { num: '20', name: 'THU' },
    { num: '21', name: 'FRI' },
    { num: '22', name: 'SAT' },
    { num: '23', name: 'SUN' }
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        
        {/* COLUMNA IZQUIERDA: ACTIVIDAD DIARIA */}
        <section className="flex-1 space-y-12">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[64px] font-extrabold tracking-tight text-[#312A2C] leading-none uppercase">
                Daily Activity
            </h2>
            <button className="p-2 text-gray-200">
              <Icon.More />
            </button>
          </div>

          <DaySelector days={days} activeDay="17" />

          <div className="grid grid-cols-1 gap-6 max-w-2xl">
            <ActivityPill 
              label="Steps" 
              value="22000 / 22000" 
              status="Completed" 
              percentage="100%" 
              iconBg="#C17D5C" 
            />
            <ActivityPill 
              label="Steps" 
              value="22000 / 22000" 
              status="Completed" 
              percentage="100%" 
              iconBg="#C17D5C" 
            />
            <ActivityPill 
              label="Calories" 
              value="1420 / 1680 Cal" 
              status="In Progress" 
              percentage="85%" 
              iconBg="#8B6452" 
            />
            <ActivityPill 
              label="Water" 
              value="2,2 / 3 L" 
              status="In Progress" 
              percentage="73%" 
              iconBg="#312A2C" 
            />
          </div>
        </section>

        {/* COLUMNA DERECHA: TARJETA GESTIÓN */}
        <section className="w-full lg:w-[380px] shrink-0">
          <Card className="!p-16 flex flex-col h-[680px] justify-between border-none bg-white shadow-2xl rounded-[64px] relative overflow-hidden group">
              <div className="space-y-12">
                  <div className="w-20 h-20 bg-[#C17D5C]/10 rounded-[32px] flex items-center justify-center text-[#C17D5C]">
                    <Icon.Target />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-extrabold tracking-tighter text-[#312A2C] uppercase leading-[0.9]">Gestión<br/>de Red</h3>
                    <div className="accent-line w-16 h-1 mt-6"></div>
                  </div>
                  <p className="text-[17px] text-[#8A8481] font-bold leading-relaxed max-w-[240px]">Configura nuevos centros de producción y supervisa la actividad global.</p>
              </div>
              
              <div className="mt-12">
                  <Button 
                    variant="primary" 
                    className="w-full justify-between !py-8 !px-10 shadow-2xl shadow-[#C17D5C]/30 group-hover:scale-105 transition-transform" 
                    onClick={() => navigate('/talleres/nuevo')}
                  >
                      NUEVA SEDE
                      <Icon.ArrowUpRight />
                  </Button>
              </div>

              {/* Marca de agua sutil */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 pointer-events-none">
                  <div className="w-64 h-64 bg-black rounded-full"></div>
              </div>
          </Card>
        </section>

      </div>

      {/* Footer Branding */}
      <div className="mt-32 pb-10 flex flex-col items-center opacity-10">
          <div className="w-10 h-10 bg-[#312A2C] rounded-[12px] mb-4"></div>
          <p className="eyebrow !text-[9px]">BARRO & CO. ESTUDIO CENTRAL</p>
      </div>
    </div>
  );
};
