
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Badge, Button, Input, Select, Modal } from '../components/UI';
import { WorkshopStatus, UserRole } from '../types';
import { countryList } from '../data/locations';

export const Admins: React.FC = () => {
    const { users, workshops, addUser, showToast } = useAppContext();
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form State
    const [newUser, setNewUser] = useState({
        nombre: '',
        email: '',
        password: '',
        telefono: '',
        pais: '',
        ciudad: '',
        rolGlobal: UserRole.WORKSHOP_ADMIN,
        tallerAsignado: ''
    });

    const filteredUsers = users.filter(u =>
        u.nombre.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreateUser = async () => {
        if (!newUser.nombre || !newUser.email || !newUser.pais || !newUser.password) {
            showToast('Por favor completa los campos obligatorios (incluyendo contraseña)', 'error');
            return;
        }

        const result = await addUser({
            nombre: newUser.nombre,
            email: newUser.email,
            password: newUser.password,
            telefono: newUser.telefono,
            pais: newUser.pais,
            ciudad: newUser.ciudad,
            estado: WorkshopStatus.ACTIVE,
            rolesGlobales: [newUser.rolGlobal],
            rolesPorTaller: newUser.tallerAsignado ? [{ tallerId: newUser.tallerAsignado, rol: 'Admin General' }] : []
        });

        if (result) {
            setIsCreateModalOpen(false);
            setNewUser({ nombre: '', email: '', password: '', telefono: '', pais: '', ciudad: '', rolGlobal: UserRole.WORKSHOP_ADMIN, tallerAsignado: '' });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-8 pt-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Administradores</h1>
                    <p className="text-gray-500">Gestiona los perfiles de administradores y sus accesos</p>
                </div>
                <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    Crear Administrador
                </Button>
            </div>

            <div className="px-8 pb-8 space-y-6">
                <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Nombre o email..." value={search} onChange={e => setSearch(e.target.value)} />
                        <Select label="" options={[{ label: 'Todos los roles', value: 'all' }, { label: 'Super Admin', value: UserRole.SUPER_ADMIN }, { label: 'Admin de Taller', value: UserRole.WORKSHOP_ADMIN }]} />
                        <Select label="" options={[{ label: 'Todos los estados', value: 'all' }, { label: 'Activo', value: WorkshopStatus.ACTIVE }, { label: 'Inactivo', value: WorkshopStatus.INACTIVE }]} />
                    </div>
                </Card>

                <Card className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Administrador</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Contacto</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Talleres Asignados</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredUsers.map(u => (
                                <tr key={u.id} className="hover:bg-gray-50 group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{u.nombre}</div>
                                        <div className="flex gap-1 mt-1">
                                            {u.rolesGlobales.map(r => <Badge key={r} variant={r === UserRole.SUPER_ADMIN ? 'error' : 'info'}>{r}</Badge>)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{u.email}</div>
                                        <div className="text-xs text-gray-500">{u.telefono}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold bg-blue-50 text-blue-700 w-7 h-7 flex items-center justify-center rounded-lg">
                                                {workshops.filter(w => w.adminUserIds.includes(u.id)).length}
                                            </span>
                                            <div className="flex -space-x-1.5 overflow-hidden">
                                                {workshops.filter(w => w.adminUserIds.includes(u.id)).slice(0, 3).map(w => (
                                                    <div key={w.id} title={w.nombre} className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">
                                                        {w.nombre.charAt(0)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" onClick={() => setSelectedUser(u)}>Ver Perfil</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>

            {/* Create Admin Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Crear nuevo administrador"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancelar</Button>
                        <Button variant="primary" onClick={handleCreateUser}>Crear Perfil</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Nombre completo *" placeholder="Ej: Jesús García" value={newUser.nombre} onChange={e => setNewUser({ ...newUser, nombre: e.target.value })} />
                        <Input label="Email *" placeholder="admin@taller.com" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Contraseña *" type="password" placeholder="••••••" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                        <Input label="Teléfono" placeholder="+34..." value={newUser.telefono} onChange={e => setNewUser({ ...newUser, telefono: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Select label="País *" options={[{ label: 'Seleccionar...', value: '' }, ...countryList.map(c => ({ label: c, value: c }))]} value={newUser.pais} onChange={e => setNewUser({ ...newUser, pais: e.target.value })} />
                    </div>
                    <div className="pt-4 border-t">
                        <Select
                            label="Rol Global"
                            options={[
                                { label: 'Administrador de Taller', value: UserRole.WORKSHOP_ADMIN },
                                { label: 'Super Administrador (Acceso total)', value: UserRole.SUPER_ADMIN }
                            ]}
                            value={newUser.rolGlobal}
                            onChange={e => setNewUser({ ...newUser, rolGlobal: e.target.value as UserRole })}
                        />
                    </div>
                    {newUser.rolGlobal === UserRole.WORKSHOP_ADMIN && (
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <Select
                                label="Asociar a taller inicial"
                                options={[{ label: 'Ninguno (asignar luego)', value: '' }, ...workshops.map(w => ({ label: w.nombre, value: w.id }))]}
                                value={newUser.tallerAsignado}
                                onChange={e => setNewUser({ ...newUser, tallerAsignado: e.target.value })}
                            />
                            <p className="text-[10px] text-blue-600 mt-2 font-medium italic">Asignar un taller permitirá al usuario gestionar ese centro de cerámica.</p>
                        </div>
                    )}
                </div>
            </Modal>

            {/* Profile Drawer */}
            {selectedUser && (
                <>
                    <div className="fixed inset-0 bg-black/30 z-[60]" onClick={() => setSelectedUser(null)}></div>
                    <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-[70] shadow-2xl animate-slide-in-right p-8 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold">Perfil de Usuario</h2>
                            <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-3xl font-bold text-blue-600">
                                {selectedUser.nombre.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedUser.nombre}</h3>
                                <div className="flex gap-2 mt-1">
                                    {selectedUser.rolesGlobales.map((r: string) => <Badge key={r} variant={r === UserRole.SUPER_ADMIN ? 'error' : 'info'}>{r}</Badge>)}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 flex-1 overflow-y-auto pr-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Email</p>
                                    <p className="text-sm font-semibold truncate">{selectedUser.email}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Teléfono</p>
                                    <p className="text-sm font-semibold">{selectedUser.telefono || '-'}</p>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400">Talleres Asignados</h4>
                                    <button className="text-xs font-bold text-blue-600 hover:underline">+ Asociar taller</button>
                                </div>
                                <div className="space-y-3">
                                    {workshops.filter(w => w.adminUserIds.includes(selectedUser.id)).length > 0 ? (
                                        workshops.filter(w => w.adminUserIds.includes(selectedUser.id)).map(w => (
                                            <div key={w.id} className="flex items-center justify-between p-3 border rounded-xl hover:border-blue-500 transition-colors group cursor-pointer">
                                                <div>
                                                    <p className="text-sm font-bold group-hover:text-blue-600">{w.nombre}</p>
                                                    <p className="text-xs text-gray-500">{w.ciudad}, {w.pais}</p>
                                                </div>
                                                <Badge variant={w.adminGeneralUserId === selectedUser.id ? 'success' : 'neutral'}>
                                                    {w.adminGeneralUserId === selectedUser.id ? 'Admin General' : 'Auxiliar'}
                                                </Badge>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded-xl">Sin talleres asignados aún.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t flex gap-4">
                            <Button variant="outline" className="flex-1">Editar perfil</Button>
                            <Button variant="danger" className="flex-1">Dar de baja</Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
