
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WorkshopStatus, UserRole } from './types';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { Toast } from './components/UI';
import { Dashboard } from './pages/Dashboard';
import { Workshops } from './pages/Workshops';
import { WorkshopForm } from './pages/WorkshopForm';
import { WorkshopDetail } from './pages/WorkshopDetail';
import { Reports } from './pages/Reports';
import { Login } from './pages/Login';

const AppContent: React.FC = () => {
  const { currentUser, loading, showOptimisticUI, logout, toast } = useAppContext();

  useEffect(() => {
    if (!loading && currentUser) {
      const isSuperAdmin = currentUser.rolesGlobales.includes(UserRole.SUPER_ADMIN);
      if (!isSuperAdmin) {
        console.warn('Unauthorized access attempt. Logging out.');
        logout();
      }
    }
  }, [loading, currentUser, logout]);

  // Show skeleton UI while loading (much better UX than a blocking screen)
  if (loading && showOptimisticUI) {
    return (
      <div className="min-h-screen bg-[#F3EDE6] lg:pl-[320px]">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[320px] bg-white border-r border-[#DDD5CD] flex-col p-12 z-50">
          <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-16 bg-gray-200 rounded-[24px] mb-6 animate-pulse"></div>
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-1 bg-gray-200 rounded mt-3 animate-pulse"></div>
          </div>
          <nav className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-14 bg-gray-100 rounded-[28px] animate-pulse"></div>
            ))}
          </nav>
          <div className="mt-auto pt-10 space-y-6">
            <div className="h-14 bg-gray-200 rounded-[32px] animate-pulse"></div>
            <div className="h-20 bg-gray-100 rounded-[48px] animate-pulse"></div>
          </div>
        </aside>

        {/* TopBar Skeleton */}
        <header className="fixed top-0 left-0 lg:left-[320px] right-0 h-28 bg-[#F3EDE6]/80 backdrop-blur-xl z-40 px-12 flex items-center justify-between">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex gap-6">
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="pt-32 px-12 lg:px-20 pb-32">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="h-20 w-96 bg-gray-200 rounded-3xl animate-pulse"></div>
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-white rounded-[48px] animate-pulse"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show simple loading only for truly fresh loads (no stored session)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3EDE6] flex items-center justify-center">
        <div className="text-[#A8A9AE] text-sm uppercase tracking-widest animate-pulse">
          Cargando...
        </div>
      </div>
    );
  }

  const isSuperAdmin = currentUser?.rolesGlobales.includes(UserRole.SUPER_ADMIN);

  if (!currentUser || !isSuperAdmin) {
    return (
      <HashRouter>
        {toast && <Toast message={toast.message} type={toast.type} />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    );
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/talleres" element={<Workshops />} />
          <Route path="/talleres/nuevo" element={<WorkshopForm />} />
          <Route path="/talleres/editar/:id" element={<WorkshopForm />} />
          <Route path="/talleres/:id" element={<WorkshopDetail />} />
          <Route path="/reportes" element={<Reports />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
