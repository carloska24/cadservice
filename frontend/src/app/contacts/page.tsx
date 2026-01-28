'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Truck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ContactsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      // Mapping to BudgetRequest DTO to reuse the endpoint
      // Generic contact will be saved as a Request with "CONTACT" prefix in description
      const payload = {
        requesterName: formData.name,
        requesterEmail: formData.email,
        requesterPhone: "", // Optional in backend
        company: "Desconhecido / Contato Geral", // Optional placeholder
        projectDescription: `[CONTACT FORM - ${formData.subject}]\n\n${formData.message}`
      };

      const response = await fetch('http://localhost:8080/api/public/v1/budget-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed');
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO TITLE */}
      <section className="bg-slate-900 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fale com a CADService</h1>
          <p className="text-slate-300 text-lg">Estamos prontos para receber seu projeto ou tirar suas dúvidas.</p>
        </div>
      </section>

      {/* 2. MAPA E GRID DE CONTATO */}
      <section className="py-12 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="grid lg:grid-cols-12 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            
            {/* ESQUERDA: CANAIS RÁPIDOS (4 Cols) */}
            <div className="lg:col-span-5 p-8 md:p-12 bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-8 border-b border-slate-700 pb-4">Canais Diretos</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Vendas & Engenharia</h4>
                    <div className="flex items-center gap-3 mb-2 text-slate-300">
                      <Phone className="w-5 h-5 text-blue-500" />
                      <span>+55 11 3000-0000</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <span>sales@cadservice.com.br</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3">Suporte & Qualidade</h4>
                    <div className="flex items-center gap-3 mb-2 text-slate-300">
                      <Phone className="w-5 h-5 text-green-500" />
                      <span>+55 11 3000-0001</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Mail className="w-5 h-5 text-green-500" />
                      <span>quality@cadservice.com.br</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4" /> Logística (Doca 3)
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-2">
                      Recebimento de materiais e expedição.
                    </p>
                    <div className="flex items-start gap-3 text-slate-300 text-sm">
                      <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <p>Seg - Qui: 08h00 - 17h00</p>
                        <p>Sex: 0800 - 16h00</p>
                        <p className="text-slate-500 text-xs mt-1">(Fechado para almoço: 12h-13h)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <span className="block font-bold text-white">Sede Industrial</span>
                    <span className="text-slate-400 text-sm">
                      Av. Industrial, 1500 - Distrito Industrial<br/>
                      São Paulo - SP, 01000-000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* DIREITA: FORMULÁRIO (8 Cols) */}
            <div className="lg:col-span-7 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Envie uma Mensagem</h3>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Mensagem Enviada!</h4>
                  <p className="text-slate-600 mb-6">
                    Obrigado pelo contato. Nossa equipe responderá em breve pelo email <strong>{formData.email}</strong>.
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="text-primary font-bold hover:underline"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus === 'error' && (
                     <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-3">
                       <AlertCircle className="w-5 h-5" />
                       <span>Ocorreu um erro ao enviar. Tente novamente.</span>
                     </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Seu Nome *</label>
                      <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        type="text" 
                        className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                        placeholder="Nome Completo" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail Corporativo *</label>
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email" 
                        className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                        placeholder="voce@empresa.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Assunto / Departamento *</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-600"
                    >
                      <option value="">Selecione...</option>
                      <option value="Sales">Quero Cotar (Tenho Gerber/BOM)</option>
                      <option value="Technical">Dúvida Técnica / DFM</option>
                      <option value="Fiscal">Financeiro / NFE</option>
                      <option value="HR">Trabalhe Conosco (RH)</option>
                      <option value="Other">Outros Assuntos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mensagem *</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full h-32 p-4 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Descreva sua necessidade..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-70"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAPA WIDGET */}
      <div className="h-96 w-full bg-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold">
          [ GOOGLE MAPS EMBEDDED PLACEHOLDER ]
        </div>
      </div>

    </div>
  );
}
