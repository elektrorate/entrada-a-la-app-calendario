
import React from 'react';
import { useAppContext } from '../context/AppContext';
// Fix: Removed Table from the imported members as it is not exported from UI.tsx
import { Card, Badge, Button } from '../components/UI';
import { InvitationStatus } from '../types';

export const Invitations: React.FC = () => {
  const { invitations, workshops, cancelInvitation } = useAppContext();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invitaciones</h1>
          <p className="text-gray-500">Gestiona las invitaciones de nuevos administradores</p>
        </div>
        <Button variant="primary">Nueva invitación</Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Destinatario</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Taller & Rol</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Fecha Envío</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {invitations.map(inv => {
                const taller = workshops.find(w => w.id === inv.tallerId);
                return (
                    <tr key={inv.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                            <div className="font-bold text-gray-900">{inv.email}</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-sm font-semibold">{taller?.nombre || 'Taller desconocido'}</div>
                            <div className="text-xs text-gray-500">{inv.rol}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                            {inv.fechaEnvio}
                        </td>
                        <td className="px-6 py-4">
                            <Badge variant={inv.estado === InvitationStatus.PENDING ? 'warning' : inv.estado === InvitationStatus.ACCEPTED ? 'success' : 'error'}>
                                {inv.estado}
                            </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                            {inv.estado === InvitationStatus.PENDING && (
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm">Reenviar</Button>
                                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => cancelInvitation(inv.id)}>Cancelar</Button>
                                </div>
                            )}
                        </td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
