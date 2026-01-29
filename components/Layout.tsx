
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Toast, Icon } from './UI';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast, currentUser, logout, workshops, showToast } = useAppContext();
  const location = useLocation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Control Panel';
    if (path.startsWith('/talleres')) return 'Workshop Network';
    if (path === '/reportes') return 'Market Analytics';
    return 'Admin';
  };

  const navItems = [
    { to: '/dashboard', label: 'INICIO', icon: <Icon.Home /> },
    { to: '/talleres', label: 'TALLERES', icon: <Icon.Workshop /> },
    { to: '/reportes', label: 'REPORTES', icon: <Icon.Chart /> },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Sincronización Exitosa', 'success');
    }, 1200);
  };

  const alertsCount = workshops.filter(w => !w.adminGeneralUserId).length;

  return (
    <div className="min-h-screen bg-[#FDF8F3] lg:pl-[320px]">
      
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[320px] bg-white border-r border-[#F1E9E2] flex-col p-12 z-50">
        <div className="flex flex-col items-center mb-20">
            <div className="w-16 h-16 bg-[#312A2C] rounded-[24px] flex items-center justify-center font-bold text-3xl text-white shadow-xl mb-6 tracking-tighter">B</div>
            <span className="text-xl font-extrabold tracking-tighter text-[#312A2C] uppercase">Barro & Co.</span>
            <div className="accent-line mt-3"></div>
        </div>
        
        <nav className="flex-1 space-y-4">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `flex items-center gap-6 px-8 py-5 rounded-[28px] transition-all font-bold text-[12px] tracking-[0.15em] uppercase ${isActive ? 'bg-[#C17D5C] text-white shadow-lg' : 'text-[#8A8481] hover:text-[#312A2C] hover:bg-[#FDF8F3]'}`}
            >
              {({ isActive }) => (
                <>
                  <span className={`${isActive ? '' : 'opacity-40'}`}>{item.icon}</span>
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-8">
            {/* Tarjeta de Perfil movida arriba */}
            <div className="p-8 bg-[#FDF8F3] rounded-[40px] flex items-center gap-4 border border-[#F1E9E2]">
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm shrink-0">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Admin" />
                </div>
                <div className="overflow-hidden">
                    <p className="text-[12px] font-extrabold truncate uppercase tracking-tighter text-[#312A2C]">{currentUser?.nombre || 'Super Admin'}</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Activo</p>
                    </div>
                </div>
            </div>

            {/* Botón DESCONECTAR en la posición final inferior indicada por el usuario */}
            <button 
                onClick={logout}
                className="w-full flex items-center gap-4 px-8 pb-4 eyebrow !text-[11px] hover:text-rose-600 transition-colors group"
            >
                <span className="opacity-30 group-hover:opacity-100 transition-opacity"><Icon.Logout /></span>
                DESCONECTAR
            </button>
        </div>
      </aside>

      {/* TopBar Minimal */}
      <header className="fixed top-0 left-0 lg:left-[320px] right-0 h-28 bg-[#FDF8F3]/80 backdrop-blur-xl z-40 px-12 flex items-center justify-between border-b border-[#F1E9E2]/30">
        <h1 className="text-2xl font-extrabold tracking-tighter text-[#312A2C] uppercase">{getTitle()}</h1>
        
        <div className="flex items-center gap-4">
            <button 
                onClick={handleRefresh}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-[#8A8481] hover:text-[#312A2C] hover:bg-white transition-all ${isRefreshing ? 'animate-spin text-[#C17D5C]' : ''}`}
            >
                <Icon.Refresh />
            </button>
            <div className="w-px h-6 bg-[#F1E9E2] mx-2"></div>
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#8A8481] hover:text-[#312A2C] hover:bg-white transition-all relative">
                <Icon.Bell />
                {alertsCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#C17D5C] border-2 border-[#FDF8F3] rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                        {alertsCount}
                    </span>
                )}
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40 px-12 lg:px-20 pb-32">
        {children}
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="lg:hidden fixed bottom-8 left-8 right-8 h-20 bg-[#312A2C] rounded-full shadow-2xl flex items-center justify-around px-8 z-50">
        {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `transition-all text-white ${isActive ? 'scale-125' : 'opacity-40'}`}>
                {item.icon}
            </NavLink>
        ))}
        <button onClick={logout} className="opacity-40 text-white">
            <Icon.Logout />
        </button>
      </nav>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};
