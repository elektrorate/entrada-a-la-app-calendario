
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Card, Button, Input, Badge, Icon } from '../components/UI';
import { useAppContext } from '../context/AppContext';

export const Responses: React.FC = () => {
  const { showToast } = useAppContext();
  const [prompt, setPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    {
      title: 'Info de Precios',
      text: 'Hola! Nuestros talleres tienen un coste de 45€ por sesión de 2h, incluyendo materiales y cocción. Te gustaría reservar?',
      category: 'GENERAL'
    },
    {
      title: 'Confirmación Cita',
      text: 'Tu plaza ha sido reservada con éxito. Te esperamos en nuestro estudio con todo listo para crear.',
      category: 'RESERVAS'
    },
    {
      title: 'Lista de Espera',
      text: 'Actualmente no tenemos cupos disponibles, pero te hemos anotado en nuestra lista de espera prioritaria. Te avisaremos!',
      category: 'ESTADO'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Texto copiado al portapapeles', 'success');
  };

  const handleGenerateAI = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Actúa como el asistente de atención al cliente de "Barro & Co.", un estudio de cerámica premium. Redacta una respuesta amable, profesional y sofisticada para lo siguiente: ${prompt}. El texto debe ser breve y cálido.`,
      });
      setAiResult(response.text || '');
      showToast('Respuesta generada por IA', 'info');
    } catch (error) {
      showToast('Error al conectar con la IA', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Sección */}
      <div className="space-y-3">
          <p className="eyebrow">Comunicación Eficiente</p>
          <div className="flex items-baseline gap-4">
              <h1 className="text-4xl font-bold text-[#3D3437] uppercase tracking-tighter">
                BIBLIOTECA DE <span className="text-[#CA7859]">RESPUESTAS</span>
              </h1>
          </div>
          <div className="accent-line"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Panel Izquierdo: Plantillas */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="eyebrow !text-[#3D3437] font-bold">Plantillas Rápidas</h2>
          <div className="space-y-4">
            {templates.map((tpl, i) => (
              <Card key={i} className="!p-6 border-transparent hover:border-[#CA7859]/20 group">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="yellow">{tpl.category}</Badge>
                  <button onClick={() => handleCopy(tpl.text)} className="text-[#ADAEB3] hover:text-[#CA7859] transition-colors">
                    <Icon.ArrowUpRight />
                  </button>
                </div>
                <h4 className="font-bold text-[#3D3437] uppercase text-sm mb-2">{tpl.title}</h4>
                <p className="text-xs text-[#ADAEB3] font-medium leading-relaxed line-clamp-2 italic">"{tpl.text}"</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Panel Derecho: Asistente IA */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="eyebrow !text-[#3D3437] font-bold">Asistente Inteligente</h2>
          <Card className="!p-10 border-none shadow-2xl bg-white relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CA7859]/5 rounded-bl-[100px] pointer-events-none"></div>
            
            <div className="space-y-6 relative z-10">
              <p className="text-sm text-[#3D3437] font-medium leading-relaxed">
                Describe brevemente qué necesitas comunicar y nuestra IA redactará una respuesta con la identidad de marca de <span className="text-[#CA7859] font-bold uppercase">Barro & Co.</span>
              </p>
              
              <div className="space-y-4">
                <textarea 
                  className="w-full min-h-[120px] p-6 rounded-[24px] bg-[#F8F8F8] border border-transparent focus:bg-white focus:border-[#CA7859] outline-none transition-all font-medium text-sm text-[#3D3437] placeholder:text-[#ADAEB3]"
                  placeholder="Ej: Dile a un cliente que el taller de tornos está lleno para este sábado..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button 
                  variant="primary" 
                  className="w-full !py-5 shadow-lg gap-3" 
                  onClick={handleGenerateAI}
                  disabled={isGenerating || !prompt}
                >
                  {isGenerating ? 'ESCRIBIENDO...' : 'GENERAR RESPUESTA'}
                  {!isGenerating && <span className="text-xl">✨</span>}
                </Button>
              </div>

              {aiResult && (
                <div className="mt-10 p-8 bg-[#F8F8F8] rounded-[32px] border border-[#EBEBEB] animate-fade-in relative group">
                  <div className="eyebrow !text-[9px] mb-4 text-[#CA7859]">Sugerencia de la IA</div>
                  <p className="text-sm text-[#3D3437] font-medium leading-relaxed italic pr-12">
                    {aiResult}
                  </p>
                  <button 
                    onClick={() => handleCopy(aiResult)}
                    className="absolute top-8 right-8 w-10 h-10 bg-white border border-[#EBEBEB] rounded-full flex items-center justify-center text-[#3D3437] hover:bg-[#CA7859] hover:text-white transition-all shadow-sm"
                    title="Copiar"
                  >
                    <Icon.ArrowUpRight />
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
