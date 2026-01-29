
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workshop, User, WorkshopStatus, UserRole, ActivityLog, Invitation, InvitationStatus } from '../types';

interface AppContextType {
  workshops: Workshop[];
  users: User[];
  activityLogs: ActivityLog[];
  invitations: Invitation[];
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  addWorkshop: (workshop: Omit<Workshop, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWorkshop: (id: string, updates: Partial<Workshop>) => void;
  deleteWorkshop: (id: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  cancelInvitation: (id: string) => void;
  loading: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    // Initial Mock Data
    const mockUsers: User[] = [
      { id: 'u1', nombre: 'Carlos Ruiz', email: 'admin@barro.com', telefono: '+34 600 111 222', pais: 'España', ciudad: 'Barcelona', estado: WorkshopStatus.ACTIVE, rolesGlobales: [UserRole.SUPER_ADMIN], rolesPorTaller: [] },
      { id: 'u2', nombre: 'Ana García', email: 'ana@pottery.com', telefono: '+34 611 222 333', pais: 'España', ciudad: 'Madrid', estado: WorkshopStatus.ACTIVE, rolesGlobales: [UserRole.WORKSHOP_ADMIN], rolesPorTaller: [{ tallerId: 't1', rol: 'Admin General' }] },
    ];

    const mockWorkshops: Workshop[] = [
      { id: 't1', nombre: 'Barro de Madrid', pais: 'España', ciudad: 'Madrid', direccion: 'Calle Mayor 12', lat: 40.4168, lng: -3.7038, emailTaller: 'madrid@barro.com', telefonoTaller: '912345678', estado: WorkshopStatus.ACTIVE, adminGeneralUserId: 'u2', adminUserIds: ['u2'], createdAt: '2023-01-01', updatedAt: '2023-01-01' },
      { id: 't2', nombre: 'Taller Gràcia', pais: 'España', ciudad: 'Barcelona', direccion: 'Carrer de Verdi 45', lat: 41.4034, lng: 2.1581, emailTaller: 'gracia@barro.com', telefonoTaller: '934567890', estado: WorkshopStatus.ACTIVE, adminGeneralUserId: 'u3', adminUserIds: ['u3'], createdAt: '2023-02-15', updatedAt: '2023-02-15' },
    ];
    
    for(let i=3; i<=15; i++) {
        mockWorkshops.push({
            id: `t${i}`,
            nombre: `Workshop Mock ${i}`,
            pais: i % 2 === 0 ? 'España' : 'Portugal',
            ciudad: i % 2 === 0 ? (i % 3 === 0 ? 'Sevilla' : 'Barcelona') : 'Lisboa',
            direccion: `Calle Inventada ${i}`,
            lat: 41.0 + (Math.random() * 2),
            lng: 2.0 + (Math.random() * 2),
            estado: WorkshopStatus.ACTIVE,
            adminUserIds: [],
            createdAt: '2023-09-01',
            updatedAt: '2023-09-01'
        });
    }

    const mockLogs: ActivityLog[] = [
      { id: 'l1', fecha: '2023-11-24 10:30', accion: 'Taller creado', usuario: 'Carlos Ruiz', tallerId: 't6' },
      { id: 'l2', fecha: '2023-11-23 15:45', accion: 'Admin asignado', usuario: 'Carlos Ruiz', tallerId: 't1' },
    ];

    const mockInvitations: Invitation[] = [
      { id: 'i1', email: 'gestor@madrid.com', tallerId: 't1', rol: 'Auxiliar', fechaEnvio: '2023-11-20', estado: InvitationStatus.PENDING },
      { id: 'i2', email: 'nuevo@gracia.com', tallerId: 't2', rol: 'Admin General', fechaEnvio: '2023-11-21', estado: InvitationStatus.PENDING },
    ];

    setUsers(mockUsers);
    setWorkshops(mockWorkshops);
    setActivityLogs(mockLogs);
    setInvitations(mockInvitations);
    
    // Check local session
    const savedUser = localStorage.getItem('barro_session');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    
    setLoading(false);
  }, []);

  const login = (email: string, pass: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user && pass === 'admin123') { // Mock pass
      setCurrentUser(user);
      localStorage.setItem('barro_session', JSON.stringify(user));
      showToast(`Bienvenido de nuevo, ${user.nombre}`, 'success');
      return true;
    }
    showToast('Credenciales incorrectas', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('barro_session');
    showToast('Sesión cerrada correctamente', 'info');
  };

  const addWorkshop = (workshop: Omit<Workshop, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newWorkshop: Workshop = {
      ...workshop,
      id: `t${workshops.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setWorkshops([...workshops, newWorkshop]);
    setActivityLogs([{ id: Date.now().toString(), fecha: new Date().toLocaleString(), accion: 'Taller creado', usuario: currentUser?.nombre || 'Super Admin', tallerId: newWorkshop.id }, ...activityLogs]);
    showToast('Taller creado con éxito', 'success');
  };

  const updateWorkshop = (id: string, updates: Partial<Workshop>) => {
    setWorkshops(prev => prev.map(w => w.id === id ? { ...w, ...updates, updatedAt: new Date().toISOString() } : w));
    showToast('Taller actualizado', 'info');
  };

  const deleteWorkshop = (id: string) => {
    setWorkshops(prev => prev.filter(w => w.id !== id));
    showToast('Taller eliminado', 'error');
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = { ...user, id: `u${users.length + 1}` };
    setUsers([...users, newUser]);
    
    if (user.rolesPorTaller.length > 0) {
      setWorkshops(prev => prev.map(w => {
        const assignment = user.rolesPorTaller.find(r => r.tallerId === w.id);
        if (assignment) {
          return {
            ...w,
            adminUserIds: Array.from(new Set([...w.adminUserIds, newUser.id])),
            adminGeneralUserId: assignment.rol === 'Admin General' ? newUser.id : w.adminGeneralUserId
          };
        }
        return w;
      }));
    }

    showToast('Administrador creado con éxito', 'success');
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    showToast('Usuario actualizado', 'info');
  };

  const cancelInvitation = (id: string) => {
    setInvitations(prev => prev.filter(i => i.id !== id));
    showToast('Invitación cancelada', 'info');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppContext.Provider value={{ workshops, users, activityLogs, invitations, currentUser, login, logout, addWorkshop, updateWorkshop, deleteWorkshop, addUser, updateUser, cancelInvitation, loading, toast, showToast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
