'use client';

import { useState } from 'react';
import { API_URL } from '@/lib/api';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Truck,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

// CADService real address from Google Maps
const COMPANY_INFO = {
  name: 'CADService Produtos Eletrônicos Ltda',
  address: {
    street: 'R. Pedro Stancato, 290',
    neighborhood: 'Chácaras Campos dos Amarais',
    city: 'Campinas',
    state: 'SP',
    zip: '13082-050'
  },
  phone: '(19) 3716-0656',
  coordinates: {
    lat: -22.8579,
    lng: -47.0929
  },
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.6!2d-47.0929!3d-22.8579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf4e8e0d1d1d%3A0x1234567890abcdef!2sR.%20Pedro%20Stancato%2C%20290%20-%20Ch%C3%A1caras%20Campos%20dos%20Amarais%2C%20Campinas%20-%20SP%2C%2013082-050!5e0!3m2!1spt-BR!2sbr!4v1234567890',
  googleMapsLink: 'https://www.google.com/maps/place/CADService+Produtos+Eletr%C3%B4nicos+Ltda/@-22.8579,-47.0929,17z'
};

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
      const payload = {
        requesterName: formData.name,
        requesterEmail: formData.email,
        requesterPhone: "",
        company: "Desconhecido / Contato Geral",
        projectDescription: `[CONTACT FORM - ${formData.subject}]\n\n${formData.message}`
      };

      const response = await fetch(`${API_URL}/api/public/v1/budget-requests`, {
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
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fale com a CADService</h1>
          <p className="text-slate-300 text-lg">Estamos prontos para receber seu projeto ou tirar suas dúvidas.</p>
        </div>
      </section>

      {/* 2. MAPA E GRID DE CONTATO */}
      <section className="py-12 bg-slate-50 flex-1">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          
          <div className="grid lg:grid-cols-12 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            
            {/* ESQUERDA: CANAIS RÁPIDOS (5 Cols) */}
            <div className="lg:col-span-5 p-8 md:p-12 bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-8 border-b border-slate-700 pb-4">Canais Diretos</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Vendas & Engenharia</h4>
                    <div className="flex items-center gap-3 mb-2 text-slate-300">
                      <Phone className="w-5 h-5 text-blue-500" />
                      <span>{COMPANY_INFO.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <span>vendas@cadservice.com.br</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3">Suporte & Qualidade</h4>
                    <div className="flex items-center gap-3 mb-2 text-slate-300">
                      <Phone className="w-5 h-5 text-green-500" />
                      <span>{COMPANY_INFO.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Mail className="w-5 h-5 text-green-500" />
                      <span>qualidade@cadservice.com.br</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4" /> Logística (Expedição)
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-2">
                      Recebimento de materiais e expedição.
                    </p>
                    <div className="flex items-start gap-3 text-slate-300 text-sm">
                      <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <p>Seg - Sex: 08h00 - 17h30</p>
                        <p className="text-slate-500 text-xs mt-1">(Fechado para almoço: 12h-13h)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Endereço real */}
              <div className="mt-12 pt-8 border-t border-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <span className="block font-bold text-white">{COMPANY_INFO.name}</span>
                    <span className="text-slate-400 text-sm">
                      {COMPANY_INFO.address.street}<br/>
                      {COMPANY_INFO.address.neighborhood}<br/>
                      {COMPANY_INFO.address.city} - {COMPANY_INFO.address.state}, {COMPANY_INFO.address.zip}
                    </span>
                    <a 
                      href={COMPANY_INFO.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Abrir no Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* DIREITA: FORMULÁRIO (7 Cols) */}
            <div className="lg:col-span-7 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Envie uma Mensagem</h3>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Mensagem Enviada!</h4>
                  <p className="text-slate-600 mb-6">
                    Obrigado pelo contato. Nossa equipe responderá em breve.
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="text-primary font-bold hover:underline cursor-pointer"
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
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Seu Nome *</label>
                      <input 
                        id="name"
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
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">E-mail Corporativo *</label>
                      <input 
                        id="email"
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
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Assunto / Departamento *</label>
                    <select 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-600 cursor-pointer"
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
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Mensagem *</label>
                    <textarea 
                      id="message"
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
                    className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-70 cursor-pointer"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. GOOGLE MAPS FULL WIDTH */}
      <section className="relative">
        {/* Map Container */}
        <div className="h-[400px] md:h-[500px] w-full bg-slate-100 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2773441855!2d-47.0950937!3d-22.860003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c8f5b5b5b5b5%3A0x1234567890abcdef!2sR.%20Pedro%20Stancato%2C%20290%20-%20Ch%C3%A1caras%20Campos%20dos%20Amarais%2C%20Campinas%20-%20SP%2C%2013082-050!5e0!3m2!1spt-BR!2sbr!4v1704067200000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização CADService - Campinas, SP"
            className="absolute inset-0"
          />
          
          {/* Floating Info Card */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white rounded-xl shadow-2xl p-5 md:p-6 max-w-sm border border-slate-200 z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">CADService</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {COMPANY_INFO.address.street}<br/>
                  {COMPANY_INFO.address.city} - {COMPANY_INFO.address.state}
                </p>
                <a 
                  href={COMPANY_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Como Chegar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
