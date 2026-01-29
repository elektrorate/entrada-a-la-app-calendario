
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
    if (path === '/dashboard') return 'WORKSPACE';
    if (path.startsWith('/talleres')) return 'TALLERES';
    if (path === '/reportes') return 'ANALÍTICAS';
    return 'ADMIN';
  };

  const navItems = [
    { to: '/dashboard', label: 'INICIO', icon: '🏠' },
    { to: '/talleres', label: 'TALLERES', icon: '🏺' },
    { to: '/reportes', label: 'ANALÍTICAS', icon: '🎯' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Datos sincronizados correctamente', 'success');
    }, 1200);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        showToast(`Error al activar pantalla completa: ${err.message}`, 'error');
      });
    } else {
      document.exitFullscreen();
    }
  };

  const alertsCount = workshops.filter(w => !w.adminGeneralUserId).length;

  return (
    <div className="min-h-screen bg-[#F2F2F2] lg:pl-[280px]">
      
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-[#E6E6E6] flex-col p-10 z-50">
        <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-16 bg-[#F4D000] rounded-[24px] flex items-center justify-center font-extrabold text-3xl shadow-lg mb-4">B</div>
            <span className="font-extrabold tracking-tighter text-xl text-[#111111]">Barro & Co.</span>
        </div>
        
        <nav className="flex-1 space-y-4">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `flex items-center gap-5 px-8 py-5 rounded-[24px] transition-all font-bold text-xs tracking-widest ${isActive ? 'bg-[#1A1A1A] text-white shadow-xl translate-x-2' : 'text-[#6B6B6B] hover:bg-gray-50'}`}
            >
              <span className="text-xl grayscale">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
            <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-8 py-3 text-[10px] font-extrabold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Cerrar Sesión
            </button>
            <div className="p-6 bg-[#F2F2F2] rounded-[32px] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <img src="https://picsum.photos/48/48" alt="Admin" />
                </div>
                <div className="overflow-hidden">
                    <p className="text-[11px] font-extrabold truncate uppercase tracking-tighter text-[#111111]">{currentUser?.nombre || 'Super Admin'}</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Online</p>
                    </div>
                </div>
            </div>
        </div>
      </aside>

      {/* TopBar Premium */}
      <header className="fixed top-0 left-0 lg:left-[280px] right-0 h-24 bg-[#F2F2F2]/90 backdrop-blur-xl z-40 px-10 flex items-center justify-between">
        <h1 className="text-[12px] font-extrabold tracking-[0.4em] uppercase text-[#111111]">{getTitle()}</h1>
        
        {/* Toolbar de Acciones (Réplica de los iconos circled) */}
        <div className="flex items-center gap-2">
            <button 
                onClick={handleRefresh}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-white/50 transition-all ${isRefreshing ? 'animate-spin text-black' : ''}`}
                title="Sincronizar Datos"
            >
                <Icon.Refresh />
            </button>
            <button 
                onClick={handleFullscreen}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-white/50 transition-all"
                title="Pantalla Completa"
            >
                <Icon.Maximize />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <button className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-white/50 transition-all relative">
                <Icon.Bell />
                {alertsCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-red-500 border-2 border-[#F2F2F2] rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                        {alertsCount}
                    </span>
                )}
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 px-10 lg:px-16 pb-16 max-w-7xl mx-auto">
        {children}
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="lg:hidden fixed bottom-8 left-8 right-8 h-20 bg-[#1A1A1A] rounded-full shadow-2xl flex items-center justify-around px-8 z-50">
        {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `transition-transform ${isActive ? 'scale-125' : 'opacity-40 grayscale'}`}>
                <span className="text-2xl">{item.icon}</span>
            </NavLink>
        ))}
        <button onClick={logout} className="opacity-40 grayscale">
            <span className="text-2xl">🚪</span>
        </button>
      </nav>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};
