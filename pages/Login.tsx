
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Input, Badge } from '../components/UI';

export const Login: React.FC = () => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation delay for premium feel
    setTimeout(() => {
      login(email, password);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-[440px] space-y-8 text-center">
        
        {/* Branding */}
        <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-[#F4D000] rounded-[32px] flex items-center justify-center font-extrabold text-4xl shadow-2xl animate-bounce-subtle">🏺</div>
            <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tighter">Barro & Co.</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Panel de Control Global</p>
            </div>
        </div>

        {/* Login Form Card */}
        <Card className="!p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border-none">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-left space-y-6">
                    <Input 
                        label="Correo Electrónico" 
                        type="email" 
                        placeholder="admin@barro.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <div className="space-y-2">
                        <Input 
                            label="Contraseña" 
                            type="password" 
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <div className="flex justify-end px-2">
                            <button type="button" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#111111] transition-colors">¿Olvidaste tu contraseña?</button>
                        </div>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full !py-6 shadow-[0_20px_40px_rgba(244,208,0,0.3)]"
                    disabled={loading}
                >
                    {loading ? 'AUTENTICANDO...' : 'ENTRAR AL WORKSPACE'}
                </Button>
            </form>
        </Card>

        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            © 2024 Barro & Co. • Todos los derechos reservados
        </p>
      </div>
      
      <style>{`
        @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 3s infinite ease-in-out; }
      `}</style>
    </div>
  );
};
