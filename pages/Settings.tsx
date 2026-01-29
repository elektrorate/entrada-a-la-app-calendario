
import React from 'react';
import { Card, Button, Badge } from '../components/UI';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500">Administra las políticas globales y roles del sistema</p>
      </div>

      <div className="space-y-6">
          <Card className="p-6">
              <h3 className="font-bold text-lg mb-6">Roles y Permisos</h3>
              <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                          <p className="font-bold text-gray-900">Super Admin</p>
                          <p className="text-sm text-gray-500">Acceso total a todos los módulos y talleres</p>
                      </div>
                      <Badge>Global</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                          <p className="font-bold text-gray-900">Admin de Taller</p>
                          <p className="text-sm text-gray-500">Gestión limitada al taller o talleres asignados</p>
                      </div>
                      <Badge variant="info">Por taller</Badge>
                  </div>
              </div>
          </Card>

          <Card className="p-6">
              <h3 className="font-bold text-lg mb-6">Políticas de Seguridad</h3>
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="font-bold text-gray-900">Autenticación 2FA</p>
                          <p className="text-sm text-gray-500">Requerir segundo factor para administradores</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative p-1 cursor-pointer">
                          <div className="absolute right-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                  </div>
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="font-bold text-gray-900">Expiración de invitaciones</p>
                          <p className="text-sm text-gray-500">Las invitaciones caducan tras 7 días de inactividad</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900">7 días</span>
                  </div>
              </div>
          </Card>

          <Card className="p-6">
              <h3 className="font-bold text-lg mb-6">Registros Globales (Logs)</h3>
              <div className="p-12 text-center text-gray-400 bg-gray-50 border border-dashed rounded-xl">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="font-medium text-sm">Próximamente: Historial completo de auditoría del sistema</p>
              </div>
          </Card>
      </div>
    </div>
  );
};
