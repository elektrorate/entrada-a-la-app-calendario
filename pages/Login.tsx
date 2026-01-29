
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Input } from '../components/UI';

export const Login: React.FC = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-6 animate-fade-in relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square bg-[#CA7859]/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] aspect-square bg-[#3D3437]/5 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-[520px] space-y-10 text-center relative z-10">
        
        {/* Branding */}
        <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-[#CA7859] rounded-full flex items-center justify-center font-bold text-4xl text-white shadow-2xl animate-float">B</div>
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter text-[#3D3437] uppercase">Barro & Co.</h1>
                <div className="accent-line mx-auto"></div>
                <p className="eyebrow mt-4">Sistema de Control Central</p>
            </div>
        </div>

        {/* Login Form Card */}
        <Card className="!p-12 shadow-2xl border-none">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-left space-y-8">
                    <Input 
                        label="Acceso de Usuario" 
                        type="email" 
                        placeholder="admin@barro.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <div className="space-y-4">
                        <Input 
                            label="Contraseña Segura" 
                            type="password" 
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <div className="flex justify-end px-2">
                            <button type="button" className="text-[11px] font-bold text-[#54545e] uppercase tracking-widest hover:text-[#CA7859] transition-colors">Solicitar Acceso</button>
                        </div>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full !py-7 shadow-xl"
                    disabled={loading}
                >
                    {loading ? 'AUTENTICANDO...' : 'INICIAR SESIÓN'}
                </Button>
            </form>
        </Card>

        <p className="eyebrow !text-[11px] mt-10">
            © 2024 BARRO & CO. ESTUDIO • INFRAESTRUCTURA DE DATOS
        </p>
      </div>
      
      <style>{`
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 6s infinite ease-in-out; }
      `}</style>
    </div>
  );
};
