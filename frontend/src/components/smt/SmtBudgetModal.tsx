'use client';

import { useState } from 'react';
import { API_URL } from '@/lib/api';
import { uploadFileToStorage } from '@/lib/upload';
import { toast } from 'sonner';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Settings,
  ShieldCheck,
  FileText,
  Package,
  Truck,
  AlertCircle,
  Download,
  PackageCheck
} from 'lucide-react';
import { ScopeStep } from './steps/ScopeStep';
import { TechSpecsStep } from './steps/TechSpecsStep';
import { FileUploadStep } from './steps/FileUploadStep';
import { SupplyChainStep } from './steps/SupplyChainStep';
import { ContactStep } from './steps/ContactStep';

interface SmtBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContactInfo?: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
}

const TOTAL_STEPS = 5;

const STEP_LABELS = [
  { id: 1, label: 'Escopo', icon: Settings },
  { id: 2, label: 'Placa', icon: Layers },
  { id: 3, label: 'Arquivos', icon: FileText },
  { id: 4, label: 'Supply', icon: Package },
  { id: 5, label: 'Envio', icon: Truck },
];

import { SmtFormData } from './types';

export function SmtBudgetModal({ isOpen, onClose, initialContactInfo }: SmtBudgetModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SmtFormData>({
    // Step 1: Scope
    scopeSmt: true,
    scopeTht: false,
    scopeStencil: false,
    scopeTests: false,
    
    // Step 2: Tech Specs
    projectClass: 'class2' as 'class2' | 'class3',
    mountSide: 'top' as 'top' | 'bottom' | 'both',
    boardWidth: '',
    boardHeight: '',
    layerCount: '4',
    quantity: 500,
    // NEW: P0 Critical Fields
    pcbMaterial: 'fr4' as 'fr4' | 'rogers' | 'flex' | 'aluminum' | 'ceramic',
    surfaceFinish: 'hasl' as 'hasl' | 'enig' | 'osp' | 'immersion_silver' | 'immersion_tin',
    boardThickness: '1.6' as '0.8' | '1.0' | '1.2' | '1.6' | '2.0' | '2.4',
    leadTime: 'standard' as 'standard' | 'express' | 'urgent',
    
    // Step 3: Files
    bomFile: null as File | null,
    gerberFile: null as File | null,
    pickPlaceFile: null as File | null,
    odbFile: null as File | null, // NEW: ODB++ support
    
    // Step 4: Supply Chain
    supplyModel: 'turnkey' as 'turnkey' | 'consigned' | 'hybrid',
    acceptAlternatives: false,
    keepStock: false,
    
    // Step 5: Contact
    contactName: initialContactInfo?.name || '',
    company: initialContactInfo?.company || '',
    email: initialContactInfo?.email || '',
    phone: initialContactInfo?.phone || '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [protocolNumber, setProtocolNumber] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const setRadio = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const handleFileRemove = (fieldName: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: null }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 5) {
      if (!formData.email) newErrors.email = 'E-mail é obrigatório';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'E-mail inválido';
      }
      if (!formData.contactName) newErrors.contactName = 'Nome é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };


  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    try {
      const scopeItems = [];
      if (formData.scopeSmt) scopeItems.push('SMT');
      if (formData.scopeTht) scopeItems.push('THT');
      if (formData.scopeStencil) scopeItems.push('Stencil Laser');
      if (formData.scopeTests) scopeItems.push('FCT');

      // Material labels
      const materialLabels: Record<string, string> = {
        'fr4': 'FR-4 Standard', 'rogers': 'Rogers (RF)', 'flex': 'Flex/Rigid-Flex',
        'aluminum': 'Aluminum (LED)', 'ceramic': 'Cerâmico'
      };
      const finishLabels: Record<string, string> = {
        'hasl': 'HASL Lead-Free', 'enig': 'ENIG (Ouro)', 'osp': 'OSP',
        'immersion_silver': 'Imm. Silver', 'immersion_tin': 'Imm. Tin'
      };
      const leadTimeLabels: Record<string, string> = {
        'standard': 'Standard (15-20 dias)', 'express': 'Express (7-10 dias)', 'urgent': 'Urgente (3-5 dias)'
      };

      // Generate protocol number
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const protocol = `CAD-${new Date().getFullYear()}-${timestamp.toString().slice(-6)}-${random}`;

      const technicalSpecs = `
[PROTOCOLO: ${protocol}]

[ESPECIFICAÇÕES TÉCNICAS SMT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Escopo: ${scopeItems.join(', ')}
→ Classe IPC: ${formData.projectClass === 'class3' ? 'Class 3 (Crítico)' : 'Class 2 (Standard)'}
→ Lado Montagem: ${formData.mountSide === 'both' ? 'Ambos os Lados' : formData.mountSide === 'top' ? 'Top Only' : 'Bottom Only'}
→ Dimensões PCB: ${formData.boardWidth || '?'}mm x ${formData.boardHeight || '?'}mm
→ Layers: ${formData.layerCount}
→ Quantidade: ${formData.quantity} placas

[PCB SPECS]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Material: ${materialLabels[formData.pcbMaterial] || formData.pcbMaterial}
→ Acabamento: ${finishLabels[formData.surfaceFinish] || formData.surfaceFinish}
→ Espessura: ${formData.boardThickness}mm
→ Lead Time: ${leadTimeLabels[formData.leadTime] || formData.leadTime}

[SUPPLY CHAIN]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Modelo: ${formData.supplyModel === 'turnkey' ? 'TURNKEY (CADService compra)' : formData.supplyModel === 'consigned' ? 'CONSIGNADO (Cliente envia kit)' : 'HÍBRIDO'}
→ Aceita alternativas CN: ${formData.acceptAlternatives ? 'Sim' : 'Não'}
→ Manter estoque excedente: ${formData.keepStock ? 'Sim' : 'Não'}

[CONTATO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Nome: ${formData.contactName}
→ Empresa: ${formData.company || 'N/A'}
→ Telefone: ${formData.phone || 'N/A'}

[NOTAS ESPECIAIS]
${formData.notes || 'Nenhuma'}
      `.trim();

      // 1. Upload Files Securely
      const attachments = [];
      const filesToUpload = [
        { file: formData.gerberFile, type: 'gerber' },
        { file: formData.bomFile, type: 'bom' },
        { file: formData.pickPlaceFile, type: 'pickPlace' },
        { file: formData.odbFile, type: 'odb' }
      ];

      for (const item of filesToUpload) {
        if (item.file) {
          try {
            const uploaded = await uploadFileToStorage(item.file as File);
            attachments.push(uploaded);
          } catch (err) {
            console.error(`Failed to upload ${item.type}`, err);
            // Optional: abort or continue with warning? For now, we continue but maybe alert user?
            // Throwing error to stop submission and alert user is safer.
            throw new Error(`Erro ao enviar arquivo: ${item.file.name}`);
          }
        }
      }

      const payload = {
        requesterName: formData.contactName,
        requesterEmail: formData.email,
        company: formData.company || 'N/A',
        requesterPhone: formData.phone || '',
        projectDescription: technicalSpecs,
        attachments
      };

      const response = await fetch(`${API_URL}/api/public/v1/budget-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Falha no envio');

      // Show success screen with protocol number
      setProtocolNumber(protocol);
      setShowSuccess(true);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao enviar solicitação');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setProtocolNumber(null);
    setStep(1);
    setFormData({
      scopeSmt: true,
      scopeTht: false,
      scopeStencil: false,
      scopeTests: false,
      projectClass: 'class2',
      mountSide: 'top',
      boardWidth: '',
      boardHeight: '',
      layerCount: '4',
      quantity: 500,
      pcbMaterial: 'fr4',
      surfaceFinish: 'hasl',
      boardThickness: '1.6',
      leadTime: 'standard',
      bomFile: null,
      gerberFile: null,
      pickPlaceFile: null,
      odbFile: null,
      supplyModel: 'turnkey',
      acceptAlternatives: false,
      keepStock: false,
      contactName: '',
      company: '',
      email: '',
      phone: '',
      notes: ''
    });
    onClose();
  };

  // Progress bar width calculation
  const progressWidth = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity duration-300"
        onClick={showSuccess ? handleCloseSuccess : onClose}
        aria-hidden="true"
      />

      {/* Success Screen */}
      {showSuccess ? (
        <div 
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden p-8 text-center animate-in zoom-in-95 duration-200"
          role="dialog"
          aria-labelledby="success-title"
          aria-modal="true"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 id="success-title" className="text-2xl font-bold text-slate-900 mb-2">
            Solicitação Enviada!
          </h2>
          
          <p className="text-slate-600 mb-6">
            Nossa engenharia analisará seu projeto e retornará em até 24h úteis.
          </p>

          {/* Protocol Number */}
          <div className="bg-slate-100 rounded-xl p-4 mb-6">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
              Número do Protocolo
            </p>
            <p className="text-lg font-mono font-bold text-blue-600 select-all">
              {protocolNumber}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Guarde este número para acompanhamento
            </p>
          </div>

          <div className="text-sm text-slate-500 mb-6">
            <p>📧 Você receberá uma confirmação por e-mail em instantes.</p>
          </div>

          <button
            onClick={handleCloseSuccess}
            className="w-full h-12 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      ) : (
      /* Modal Container */
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-slate-100"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 p-6 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-6 h-6" />
              Cotação - Montagem SMT
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Stepper */}
          <div className="relative">
            {/* Progress Line Background */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/20" />
            {/* Progress Line Filled */}
            <div 
              className="absolute top-4 left-0 h-0.5 bg-white transition-all duration-300"
              style={{ width: `${progressWidth}%` }}
            />
            
            {/* Step Indicators */}
            <div className="relative flex justify-between">
              {STEP_LABELS.map((s) => {
                const Icon = s.icon;
                const isActive = step >= s.id;
                const isCurrent = step === s.id;
                
                return (
                  <div 
                    key={s.id} 
                    className={`flex flex-col items-center transition-all duration-200 ${isCurrent ? 'scale-110' : ''}`}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-white text-blue-600' 
                        : 'bg-white/20 text-white/60 border border-white/30'
                      }
                    `}>
                      {step > s.id ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`
                      text-xs mt-1.5 font-medium transition-colors
                      ${isActive ? 'text-white' : 'text-white/50'}
                    `}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto flex-1 bg-white">
          
          {/* ═══════════════════════════════════════════════════════════
              STEPS ORCHESTRATION
          ═══════════════════════════════════════════════════════════ */}
          {step === 1 && <ScopeStep formData={formData} onChange={handleChange} />}
          {step === 2 && <TechSpecsStep formData={formData} onChange={handleChange} setRadio={setRadio} setFormData={setFormData} />}
          {step === 3 && <FileUploadStep formData={formData} onFileChange={handleFileChange} onFileRemove={handleFileRemove} />}
          {step === 4 && <SupplyChainStep formData={formData} onChange={handleChange} setRadio={setRadio} />}
          {step === 5 && <ContactStep formData={formData} onChange={handleChange} errors={errors} />}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center shrink-0">
          {step > 1 ? (
            <button 
              type="button"
              onClick={handleBack}
              className="flex items-center text-slate-600 font-medium hover:text-slate-900 transition-colors group cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Voltar
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button 
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center group cursor-pointer"
            >
              Continuar <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all flex items-center hover:scale-105 transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'} 
              {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2" />}
            </button>
          )}
        </div>

      </div>
      )}
    </div>
  );
}
