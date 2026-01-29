
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Workshops } from './pages/Workshops';
import { WorkshopForm } from './pages/WorkshopForm';
import { WorkshopDetail } from './pages/WorkshopDetail';
import { Reports } from './pages/Reports';
import { Login } from './pages/Login';

const AppContent: React.FC = () => {
  const { currentUser, loading } = useAppContext();

  if (loading) return null;

  if (!currentUser) {
    return (
      <HashRouter>
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
