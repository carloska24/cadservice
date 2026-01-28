
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  FileText,
  Rocket
} from 'lucide-react';

export default function BudgetPage() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service');

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    company: '',
    projectDescription: '',
    serviceInterest: ''
  });

  // Pre-fill service from URL
  useEffect(() => {
    if (initialService) {
      let serviceName = '';
      switch(initialService) {
        case 'smt': serviceName = 'Montagem SMT'; break;
        case 'box-build': serviceName = 'Box Build / Integração'; break;
        case 'npi': serviceName = 'Engenharia NPI'; break;
        default: serviceName = initialService;
      }
      setFormData(prev => ({ ...prev, serviceInterest: serviceName }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Prepare payload - combine service interest into description if needed
      // ensuring we match the backend DTO exactly
      const payload = {
        requesterName: formData.requesterName,
        requesterEmail: formData.requesterEmail,
        requesterPhone: formData.requesterPhone,
        company: formData.company,
        // Appending service interest to description to ensure it's captured
        projectDescription: formData.serviceInterest 
          ? `[Interesse em: ${formData.serviceInterest}]\n\n${formData.projectDescription}`
          : formData.projectDescription
      };

      const response = await fetch('http://localhost:8080/api/public/v1/budget-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar solicitação.');
      }

      setSubmitStatus('success');
      // Reset form (optional)
      // setFormData({ ... }) 
    } catch (error) {
      console.error('Budget error:', error);
      setSubmitStatus('error');
      setErrorMessage('Ocorreu um erro ao enviar. Tente novamente ou contate via WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 text-center border border-slate-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Solicitação Recebida!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Obrigado, <strong>{formData.requesterName}</strong>. Nossa engenharia já recebeu seus dados. 
            <br/>Em breve entraremos em contato pelo email <strong>{formData.requesterEmail}</strong>.
          </p>
          <div className="flex flex-col gap-3">
            <Link 
              href="/" 
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all"
            >
              Voltar para Início
            </Link>
            <button 
              onClick={() => setSubmitStatus('idle')}
              className="text-slate-500 hover:text-slate-700 font-medium text-sm"
            >
              Enviar outro orçamento
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Header Simple */}
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm">
            <ArrowRight className="w-4 h-4 rotate-180" /> Voltar
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Solicitar Orçamento Comercial</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Descreva seu projeto. Nossa equipe técnica avaliará a viabilidade e retornará com uma proposta detalhada.
          </p>
        </div>
      </div>

      <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl -mt-8 mb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Sidebar Info */}
          <div className="hidden md:block w-1/3 bg-slate-50 p-8 border-r border-slate-100">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" /> Por que cotar conosco?
            </h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span>Análise de DFM Gratuita na cotação</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span>Compra unificada de componentes (Turnkey)</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span>Rastreabilidade total do processo</span>
              </li>
            </ul>

            <div className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-blue-800 text-xs font-semibold uppercase mb-2">Dúvidas Técnicas?</p>
              <p className="text-slate-600 text-sm mb-3">Fale direto com a engenharia.</p>
              <a href="mailto:eng@cadservice.com.br" className="text-primary font-bold text-sm hover:underline">
                eng@cadservice.com.br
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 p-8 md:p-10">
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nome Completo *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input 
                      name="requesterName"
                      required
                      value={formData.requesterName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300" 
                      placeholder="Seu nome"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Empresa</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300" 
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">E-mail Corporativo *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input 
                      name="requesterEmail"
                      type="email"
                      required
                      value={formData.requesterEmail}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300" 
                      placeholder="nome@empresa.com.br"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Telefone / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input 
                      name="requesterPhone"
                      value={formData.requesterPhone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300" 
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Interesse Principal</label>
                <select 
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-700"
                >
                  <option value="">Selecione um serviço...</option>
                  <option value="Montagem SMT">Montagem SMT</option>
                  <option value="Box Build / Integração">Box Build / Integração</option>
                  <option value="Engenharia NPI">Engenharia NPI</option>
                  <option value="Outro">Outro / Projeto Completo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Descrição do Projeto *</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <textarea 
                    name="projectDescription"
                    required
                    value={formData.projectDescription}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 h-32 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300 resize-none" 
                    placeholder="Descreva quantidade estimada, cronograma desejado e detalhes técnicos..."
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 hover:shadow-primary/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Solicitação de Orçamento <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
