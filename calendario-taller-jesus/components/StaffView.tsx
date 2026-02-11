
import React, { useState, useEffect, useRef } from 'react';
import { StaffMember } from '../types';
import { supabase } from '../supabaseClient';

// Module-level cache: persists across component mounts so navigating
// away and back shows data instantly instead of "Cargando equipo..."
let _staffCache: StaffMember[] | null = null;

interface StaffViewProps {
    userRole: string;
}

const StaffView: React.FC<StaffViewProps> = ({ userRole }) => {
    const [staffList, setStaffList] = useState<StaffMember[]>(_staffCache || []);
    const [isLoading, setIsLoading] = useState(_staffCache === null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const mountedRef = useRef(true);

    const showToastMsg = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const isTallerista = userRole === 'tallerista';

    const fetchStaff = async (showSpinner = false) => {
        if (showSpinner) setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-staff`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({ action: 'list' }),
                }
            );

            const result = await response.json();
            if (!mountedRef.current) return;
            if (result.error) {
                console.error('Staff list error:', result.error);
                showToastMsg(result.error, 'error');
            } else {
                const staff = result.staff || [];
                _staffCache = staff;
                setStaffList(staff);
            }
        } catch (err) {
            console.error('Fetch staff error:', err);
            if (mountedRef.current) showToastMsg('Error al cargar administradores.', 'error');
        } finally {
            if (mountedRef.current) setIsLoading(false);
        }
    };

    useEffect(() => {
        mountedRef.current = true;
        // First visit ever → full loading spinner; subsequent visits → background refresh
        fetchStaff(_staffCache === null);
        return () => { mountedRef.current = false; };
    }, []);

    const handleCreateStaff = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nombre.trim() || !formData.email.trim() || !formData.password.trim()) {
            showToastMsg('Todos los campos son obligatorios.', 'error');
            return;
        }
        setIsSubmitting(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-staff`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({
                        action: 'create',
                        nombre: formData.nombre.trim(),
                        email: formData.email.trim().toLowerCase(),
                        password: formData.password.trim(),
                    }),
                }
            );

            const result = await response.json();
            if (result.error) {
                showToastMsg(result.error, 'error');
            } else {
                showToastMsg('Administrador creado exitosamente.', 'success');
                setFormData({ nombre: '', email: '', password: '' });
                setShowForm(false);
                await fetchStaff(true);
            }
        } catch (err) {
            console.error('Create staff error:', err);
            showToastMsg('Error al crear administrador.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteStaff = async (staffUserId: string) => {
        setConfirmDelete(null);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-staff`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({
                        action: 'delete',
                        staffUserId,
                    }),
                }
            );

            const result = await response.json();
            if (result.error) {
                showToastMsg(result.error, 'error');
            } else {
                showToastMsg('Administrador eliminado correctamente.', 'success');
                await fetchStaff(true);
            }
        } catch (err) {
            console.error('Delete staff error:', err);
            showToastMsg('Error al eliminar administrador.', 'error');
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Controls */}
            <div className="px-6 md:px-10 pt-6 pb-4 shrink-0 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-[12px] text-neutral-textHelper uppercase tracking-widest font-light">
                        {staffList.length} {staffList.length === 1 ? 'administrador' : 'administradores'}
                    </span>
                </div>
                {isTallerista && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-brand text-white px-6 py-3 rounded-full text-[12px] md:text-[13px] font-extrabold uppercase tracking-widest shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 transition-all active:scale-95"
                    >
                        {showForm ? 'Cancelar' : 'Nuevo Admin'}
                    </button>
                )}
            </div>

            {/* Form panel */}
            {showForm && isTallerista && (
                <div className="px-6 md:px-10 pb-4 shrink-0 animate-fade-in">
                    <form onSubmit={handleCreateStaff} className="bg-white rounded-[2rem] p-8 shadow-sm border border-neutral-border space-y-6">
                        <h3 className="text-[16px] font-extrabold text-neutral-textMain uppercase tracking-tight">Crear Administrador</h3>
                        <p className="text-[12px] text-neutral-textHelper leading-relaxed">
                            Este usuario podrá gestionar alumnos, calendario, piezas e inventario de tu estudio. No podrá eliminar administradores ni gestionar el equipo.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold text-neutral-textSec uppercase tracking-widest mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    placeholder="Nombre completo"
                                    className="w-full px-5 py-3 rounded-xl border border-neutral-border bg-neutral-base text-[14px] focus:outline-none focus:ring-2 focus:ring-brand/30"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-neutral-textSec uppercase tracking-widest mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="admin@ejemplo.com"
                                    className="w-full px-5 py-3 rounded-xl border border-neutral-border bg-neutral-base text-[14px] focus:outline-none focus:ring-2 focus:ring-brand/30"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-neutral-textSec uppercase tracking-widest mb-2">Contraseña</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Mínimo 6 caracteres"
                                    className="w-full px-5 py-3 rounded-xl border border-neutral-border bg-neutral-base text-[14px] focus:outline-none focus:ring-2 focus:ring-brand/30"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-3 rounded-xl text-[12px] font-bold text-neutral-textSec uppercase tracking-widest hover:bg-neutral-alt transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-brand text-white rounded-xl text-[12px] font-extrabold uppercase tracking-widest shadow-lg shadow-brand/20 hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                {isSubmitting ? 'Creando...' : 'Crear Administrador'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Staff list */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 pb-6">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-neutral-textHelper text-[12px] uppercase tracking-widest animate-pulse">Cargando equipo...</div>
                    </div>
                ) : staffList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-20 h-20 bg-neutral-alt rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-neutral-textHelper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-neutral-textHelper text-[13px] uppercase tracking-widest font-light">No hay administradores registrados</p>
                        {isTallerista && (
                            <p className="text-neutral-textHelper text-[11px] mt-2 font-light">Crea uno para que te ayude a gestionar tu estudio.</p>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {staffList.map((staff) => (
                            <div key={staff.id} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-neutral-border hover:shadow-md transition-shadow group relative">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-brand rounded-full flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-md">
                                        {staff.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[15px] font-extrabold text-neutral-textMain uppercase tracking-tight truncate">
                                            {staff.name}
                                        </h4>
                                        <p className="text-[12px] text-neutral-textHelper font-light truncate mt-0.5">{staff.email}</p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-100">
                                                Administrador
                                            </span>
                                            <span className="text-[10px] text-neutral-textHelper font-light">
                                                desde {formatDate(staff.joinedAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Only talleristas can delete staff */}
                                {isTallerista && (
                                    <div className="absolute top-4 right-4">
                                        {confirmDelete === staff.id ? (
                                            <div className="flex items-center gap-2 animate-fade-in">
                                                <button
                                                    onClick={() => handleDeleteStaff(staff.id)}
                                                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-md hover:bg-red-600 transition-colors"
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDelete(null)}
                                                    className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setConfirmDelete(staff.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-red-50 text-neutral-textHelper hover:text-red-500"
                                                title="Eliminar administrador"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-4 right-4 px-6 py-4 rounded-xl shadow-2xl z-[200] text-white font-medium animate-fade-in ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default StaffView;
