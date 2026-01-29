
'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  ArrowRight,
  Cpu,
  Package,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Loader2,
  AlertCircle,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { SmtBudgetModal } from '@/components/smt/SmtBudgetModal';
import { BoxBuildBudgetModal } from '@/components/box-build/BoxBuildBudgetModal';
import { NpiWizardModal } from '@/components/npi/NpiWizardModal';
import { maskCPF, maskCNPJ, validateCPF, validateCNPJ, fetchCNPJ, clearDocument } from '@/lib/validation';

// Shared Types
interface ContactInfo {
  name: string;
  email: string;
  company: string;
  phone: string;
  document: string;
  documentType: 'CPF' | 'CNPJ';
}

const BudgetContent = () => {
  const [step, setStep] = useState<'gatekeeper' | 'hub'>('gatekeeper');
  
  // Gatekeeper State
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    company: '',
    phone: '',
    document: '',
    documentType: 'CNPJ' // Default to B2B
  });

  const [isLoadingDoc, setIsLoadingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);
  const [isDocValid, setIsDocValid] = useState(false);

  // Modal State
  const [activeModal, setActiveModal] = useState<'smt' | 'box' | 'npi' | null>(null);

  // Validação em Tempo Real do Documento
  useEffect(() => {
    const cleanDoc = clearDocument(contactInfo.document);
    
    if (contactInfo.documentType === 'CPF') {
      if (cleanDoc.length === 11) {
        if (validateCPF(cleanDoc)) {
          setIsDocValid(true);
          setDocError(null);
        } else {
          setIsDocValid(false);
          setDocError('CPF inválido');
        }
      } else {
        setIsDocValid(false);
        setDocError(null); // Ainda digitando
      }
    } else { // CNPJ
      if (cleanDoc.length === 14) {
        if (validateCNPJ(cleanDoc)) {
          handleCNPJFetch(cleanDoc);
        } else {
          setIsDocValid(false);
          setDocError('CNPJ inválido');
        }
      } else {
        setIsDocValid(false);
        setDocError(null);
      }
    }
  }, [contactInfo.document, contactInfo.documentType]);

  const handleCNPJFetch = async (cnpj: string) => {
    setIsLoadingDoc(true);
    setDocError(null);
    try {
      const data = await fetchCNPJ(cnpj);
      setContactInfo(prev => ({
        ...prev,
        company: data.razao_social || data.nome_fantasia || '',
        phone: data.ddd_telefone_1 ? `(${data.ddd_telefone_1.substring(0,2)}) ${data.ddd_telefone_1.substring(2)}` : prev.phone
      }));
      setIsDocValid(true);
    } catch (error) {
      console.error(error);
      setDocError('CNPJ não encontrado ou serviço indisponível.');
      setIsDocValid(false);
    } finally {
      setIsLoadingDoc(false);
    }
  };

  const handleGatekeeperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDocValid && contactInfo.name && contactInfo.email && contactInfo.company) {
      setStep('hub');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'document') {
      const mask = contactInfo.documentType === 'CPF' ? maskCPF : maskCNPJ;
      setContactInfo(prev => ({ ...prev, [name]: mask(value) }));
    } else {
      setContactInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleDocType = (type: 'CPF' | 'CNPJ') => {
    setContactInfo(prev => ({ ...prev, documentType: type, document: '', company: '' }));
    setDocError(null);
    setIsDocValid(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* HEADER SIMPLIFIED */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-8 md:py-12">
        
        {/* ═══════════════════════════════════════════════════════════
            STEP 1: GATEKEEPER (IDENTIFICAÇÃO)
        ═══════════════════════════════════════════════════════════ */}
        {step === 'gatekeeper' && (
          <div className="w-full max-w-lg animate-in fade-in zoom-in-95 duration-500">
            
             <div className="flex justify-center mb-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold tracking-wide border border-blue-100">
                 <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                 PORTAL B2B SEGURO
               </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Iniciar Projeto</h1>
              <p className="text-slate-600">Identifique sua empresa para acessar o portal de engenharia.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Passo 1 de 2</span>
                <span className="text-xs font-bold text-blue-600">Dados Cadastrais</span>
              </div>
              
              <form onSubmit={handleGatekeeperSubmit} className="p-8 space-y-5">
                
                {/* DOCUMENT SELECTOR */}
                <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                  <button
                    type="button"
                    onClick={() => toggleDocType('CNPJ')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${
                      contactInfo.documentType === 'CNPJ' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Building2 className="w-4 h-4" /> Pessoa Jurídica
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleDocType('CPF')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${
                      contactInfo.documentType === 'CPF' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <User className="w-4 h-4" /> Pessoa Física
                  </button>
                </div>

                {/* DOCUMENT INPUT */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {contactInfo.documentType === 'CNPJ' ? 'CNPJ da Empresa *' : 'CPF do Responsável *'}
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      name="document"
                      required
                      value={contactInfo.document}
                      onChange={handleChange}
                      maxLength={contactInfo.documentType === 'CNPJ' ? 18 : 14}
                      className={`w-full pl-10 pr-10 py-3 rounded-lg border focus:ring-2 outline-none transition-all placeholder:text-slate-400 ${
                        docError 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                          : isDocValid 
                            ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/30'
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                      placeholder={contactInfo.documentType === 'CNPJ' ? '00.000.000/0001-91' : '000.000.000-00'}
                    />
                    
                    {/* Status Icons */}
                    <div className="absolute right-3 top-3.5">
                      {isLoadingDoc ? (
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                      ) : isDocValid ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : docError ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : null}
                    </div>
                  </div>
                  {docError && (
                    <p className="text-xs text-red-500 mt-1 font-medium">{docError}</p>
                  )}
                  {contactInfo.documentType === 'CNPJ' && !docError && !isDocValid && contactInfo.document.length > 0 && (
                     <p className="text-xs text-slate-400 mt-1">Digite os 14 números para consultar.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Empresa / Razão Social *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      name="company"
                      required
                      value={contactInfo.company}
                      onChange={handleChange}
                      readOnly={contactInfo.documentType === 'CNPJ' && isDocValid}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 ${
                        contactInfo.documentType === 'CNPJ' && isDocValid ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''
                      }`}
                      placeholder={contactInfo.documentType === 'CNPJ' ? "Razão Social da Empresa" : "Nome Comercial (Opcional)"}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Seu Nome *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      name="name"
                      required
                      value={contactInfo.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400" 
                      placeholder="Nome Completo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">E-mail Corporativo *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      name="email"
                      type="email"
                      required
                      value={contactInfo.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400" 
                      placeholder="voce@empresa.com.br"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp / Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      name="phone"
                      value={contactInfo.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400" 
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={!isDocValid || isLoadingDoc}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    {isLoadingDoc ? 'Validando...' : 'Continuar para Seleção'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <p className="text-xs text-center text-slate-500 mt-4">
                  Seus dados estão protegidos sob nossa Política de Privacidade.
                </p>

              </form>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            STEP 2: SERVICE HUB (SELEÇÃO)
        ═══════════════════════════════════════════════════════════ */}
        {step === 'hub' && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            
            {/* Identity Bar */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  {contactInfo.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{contactInfo.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:gap-2 text-xs text-slate-500">
                     <span className="font-medium text-slate-700">{contactInfo.company}</span>
                     <span className="hidden sm:inline">•</span>
                     <span>{contactInfo.document}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden md:flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Identidade Validada
                </span>
                <button 
                  onClick={() => setStep('gatekeeper')}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Alterar dados
                </button>
              </div>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Qual o escopo do seu projeto?</h2>
              <p className="text-slate-600">Selecione uma das opções abaixo para configurar sua cotação técnica.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* CARD 1: SMT */}
              <button 
                onClick={() => setActiveModal('smt')}
                className="group relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:border-blue-500 hover:shadow-blue-500/10 transition-all text-left flex flex-col h-full cursor-pointer"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Montagem SMT</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  Para quem já possui os arquivos Gerber e BOM. Montagem de placas eletrônicas com tecnologia de ponta.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Linha Fuji de Alta Velocidade
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Inspeção SPI 3D e AOI
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Turnkey ou Consignado
                  </li>
                </ul>
                <div className="w-full py-3 bg-slate-50 text-blue-700 font-bold rounded-lg text-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Configurar SMT
                </div>
              </button>

              {/* CARD 2: BOX BUILD */}
              <button 
                onClick={() => setActiveModal('box')}
                className="group relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:border-amber-500 hover:shadow-amber-500/10 transition-all text-left flex flex-col h-full cursor-pointer"
              >
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">Produto Completo</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  Box Build e Integração final. Montagem mecânica, testes funcionais, embalagem e logística.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Montagem de Gabinetes
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Chicotes e Cabos
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Gravação de Firmware
                  </li>
                </ul>
                <div className="w-full py-3 bg-slate-50 text-amber-700 font-bold rounded-lg text-center border border-slate-100 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  Cotar Box Build
                </div>
              </button>

              {/* CARD 3: NPI */}
              <button 
                onClick={() => setActiveModal('npi')}
                className="group relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:border-violet-500 hover:shadow-violet-500/10 transition-all text-left flex flex-col h-full cursor-pointer"
              >
                <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-6 text-violet-600 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition-colors">Engenharia NPI</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  Introdução de Novos Produtos. Prototipagem, DFM, validação de design e preparação para escala.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" /> Análise DFM Gratuita
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" /> Prototipagem Rápida
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" /> Validação de BOM
                  </li>
                </ul>
                <div className="w-full py-3 bg-slate-50 text-violet-700 font-bold rounded-lg text-center border border-slate-100 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  Iniciar NPI
                </div>
              </button>
            </div>

            {/* Fallback Option */}
            <div className="mt-12 text-center">
              <Link href="/contacts" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
                <Briefcase className="w-4 h-4" />
                Não tenho certeza do que preciso? Falar com um consultor comercial
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER SIMPLE */}
      <footer className="bg-white py-6 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CADService Produtos Eletrônicos Ltda. Todos os direitos reservados.</p>
      </footer>

      {/* MODALS INJECTION */}
      <SmtBudgetModal 
        isOpen={activeModal === 'smt'} 
        onClose={() => setActiveModal(null)} 
        initialContactInfo={contactInfo}
      />
      <BoxBuildBudgetModal 
        isOpen={activeModal === 'box'} 
        onClose={() => setActiveModal(null)} 
        initialContactInfo={contactInfo}
      />
      <NpiWizardModal 
        isOpen={activeModal === 'npi'} 
        onClose={() => setActiveModal(null)} 
        initialContactInfo={contactInfo}
      />

    </div>
  );
};

export default function BudgetPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center">Carregando portal...</div>}>
      <BudgetContent />
    </Suspense>
  );
}
