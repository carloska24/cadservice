'use client';

import { useState } from 'react';
import { API_URL } from '@/lib/api';
import { uploadFileToStorage } from '@/lib/upload';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  Package, 
  CheckCircle2, 
  Wrench,
  Truck,
  BoxSelect,
  Factory,
  Shield,
  QrCode,
  Globe
} from 'lucide-react';

interface BoxBuildBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContactInfo?: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
}

const TOTAL_STEPS = 4;

const STEP_LABELS = [
  { id: 1, label: 'Escopo', icon: Wrench },
  { id: 2, label: 'Materiais', icon: Package },
  { id: 3, label: 'Logística', icon: Truck },
  { id: 4, label: 'Envio', icon: Factory },
];

export function BoxBuildBudgetModal({ isOpen, onClose, initialContactInfo }: BoxBuildBudgetModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Scope
    scopeAssembly: true,
    scopeHarness: false,
    scopeFirmware: false,
    scopePackaging: false,
    scopeCoating: false,
    scopePotting: false,
    
    // Step 2: Materials
    supplyModel: 'turnkey' as 'turnkey' | 'consigned' | 'hybrid',
    cabinetType: '',
    ipRating: '' as '' | 'none' | 'ip54' | 'ip65' | 'ip67' | 'ip68',
    
    // Step 3: Logistics
    volume: 5000,
    deliveryFormat: 'single' as 'single' | 'monthly' | 'kanban',
    isExport: false,
    needsSerialization: false,
    
    // Step 4: Contact
    contactName: initialContactInfo?.name || '',
    company: initialContactInfo?.company || '',
    email: initialContactInfo?.email || '',
    phone: initialContactInfo?.phone || '',
    drawingFile: null as File | null,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const setRadio = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, drawingFile: file }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 4) {
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
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const scopeItems = [];
      if (formData.scopeAssembly) scopeItems.push('Montagem Final');
      if (formData.scopeHarness) scopeItems.push('Chicotes/Harness');
      if (formData.scopeFirmware) scopeItems.push('Firmware Flash');
      if (formData.scopePackaging) scopeItems.push('Embalagem Final');
      if (formData.scopeCoating) scopeItems.push('Conformal Coating');
      if (formData.scopePotting) scopeItems.push('Resinagem/Potting');

      const deliveryFormatText = {
        'single': 'Unitário (Caixa Individual)',
        'bulk': 'Coletivo (ESD Bulk)',
        'pallet': 'Paletizado'
      }[formData.deliveryFormat] || formData.deliveryFormat;

      // Generate protocol
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const protocol = `BOX-${new Date().getFullYear()}-${timestamp.toString().slice(-6)}-${random}`;

      const technicalSpecs = `
[PROTOCOLO: ${protocol}]

[ESCOPO BOX BUILD]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Serviços: ${scopeItems.join(', ')}
→ Modelo Supply: ${formData.supplyModel.toUpperCase()}
→ Tipo Gabinete: ${formData.cabinetType || 'Não especificado'}
→ Grau IP: ${formData.ipRating || 'N/A'}

[LOGÍSTICA]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Volume Anual: ${formData.volume} unidades
→ Formato Entrega: ${deliveryFormatText}
→ Exportação: ${formData.isExport ? 'Sim' : 'Não'}
→ Serialização: ${formData.needsSerialization ? 'Sim (QR Code individual)' : 'Não'}

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
      if (formData.drawingFile) {
        try {
          const uploaded = await uploadFileToStorage(formData.drawingFile as File);
          attachments.push(uploaded);
        } catch (err) {
          console.error('Failed to upload drawingFile', err);
          throw new Error(`Erro ao enviar arquivo: ${formData.drawingFile.name}`);
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

      // Reset form
      setStep(1);
      setFormData({
        scopeAssembly: true,
        scopeHarness: false,
        scopeFirmware: false,
        scopePackaging: false,
        scopeCoating: false,
        scopePotting: false,
        supplyModel: 'turnkey',
        cabinetType: '',
        ipRating: '',
        volume: 5000,
        deliveryFormat: 'single',
        isExport: false,
        needsSerialization: false,
        contactName: '',
        company: '',
        email: '',
        phone: '',
        drawingFile: null,
        notes: ''
      });
      
      alert(`✅ Orçamento de Box Build solicitado com sucesso! Protocolo: ${protocol}`);
      onClose();

    } catch (error: any) {
      console.error(error);
      alert(`❌ ${error.message || 'Erro ao enviar solicitação'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress bar width calculation
  const progressWidth = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-slate-100"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-xl font-bold text-white flex items-center gap-2">
              <Package className="w-6 h-6" />
              Cotação - Box Build (Integração)
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
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/20" />
            <div 
              className="absolute top-4 left-0 h-0.5 bg-white transition-all duration-300"
              style={{ width: `${progressWidth}%` }}
            />
            
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
                        ? 'bg-white text-amber-600' 
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
              STEP 1: INTEGRATION SCOPE
          ═══════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 items-start">
                <BoxSelect className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>Configure sua linha de integração.</strong> Entregamos desde o sub-frame até o produto lacrado na caixa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Mechanical Assembly */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopeAssembly ? 'border-amber-500 bg-amber-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopeAssembly" 
                      checked={formData.scopeAssembly} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Montagem Mecânica</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      PCBA + Gabinete com torque controlado e labels.
                    </span>
                  </div>
                </label>

                {/* Option 2: Harnessing */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopeHarness ? 'border-amber-500 bg-amber-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopeHarness" 
                      checked={formData.scopeHarness} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Cabeamento (Harness)</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Corte, decape e crimpagem de chicotes customizados.
                    </span>
                  </div>
                </label>

                {/* Option 3: Firmware */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopeFirmware ? 'border-amber-500 bg-amber-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopeFirmware" 
                      checked={formData.scopeFirmware} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Gravação Firmware + FCT</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Flash + calibração + teste funcional antes de fechar.
                    </span>
                  </div>
                </label>

                {/* Option 4: Retail Packaging */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopePackaging ? 'border-amber-500 bg-amber-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopePackaging" 
                      checked={formData.scopePackaging} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Embalagem Varejo</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Ship-to-Stock com caixa, manual e acessórios.
                    </span>
                  </div>
                </label>

                {/* Option 5: Conformal Coating */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopeCoating ? 'border-amber-500 bg-amber-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopeCoating" 
                      checked={formData.scopeCoating} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Conformal Coating</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Proteção ambiental contra umidade e poeira.
                    </span>
                  </div>
                </label>

                {/* Option 6: Potting */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopePotting ? 'border-amber-500 bg-amber-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopePotting" 
                      checked={formData.scopePotting} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Potting / Resina</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Encapsulamento para proteção IP67+.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 2: MATERIALS & CABINET
          ═══════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Supply Model */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-500" /> Modelo de Fornecimento
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(['turnkey', 'consigned', 'hybrid'] as const).map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setRadio('supplyModel', model)}
                      className={`
                        cursor-pointer p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all
                        ${formData.supplyModel === model 
                          ? 'border-amber-500 bg-amber-50 shadow-md' 
                          : 'border-slate-200 hover:border-slate-300'
                        }
                      `}
                    >
                      <span className="font-bold text-slate-900 text-sm">
                        {model === 'turnkey' && 'TURNKEY'}
                        {model === 'consigned' && 'CONSIGNADO'}
                        {model === 'hybrid' && 'HÍBRIDO'}
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        {model === 'turnkey' && 'Nós compramos tudo'}
                        {model === 'consigned' && 'Você envia os kits'}
                        {model === 'hybrid' && 'Mix de ambos'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cabinet Type */}
              <div>
                <label htmlFor="cabinetType" className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Gabinete / Case
                </label>
                <select 
                  id="cabinetType"
                  name="cabinetType"
                  value={formData.cabinetType}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all cursor-pointer"
                >
                  <option value="">Selecione...</option>
                  <option value="plastic-injected">Plástico Injetado (Molde do Cliente)</option>
                  <option value="metal-sheet">Metal Sheet (Chapa Metálica)</option>
                  <option value="off-shelf">Caixa Padrão de Mercado (Hammond, Bopla...)</option>
                  <option value="aluminum-extrusion">Extrusão de Alumínio</option>
                  <option value="none">Sem Gabinete (Apenas PCBA + Cabos)</option>
                </select>
              </div>

              {/* IP Rating */}
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-500" /> Classificação IP Requerida
                </h3>
                <div className="flex flex-wrap gap-3">
                  {([
                    { value: 'none', label: 'Sem requisito' },
                    { value: 'ip54', label: 'IP54' },
                    { value: 'ip65', label: 'IP65' },
                    { value: 'ip67', label: 'IP67' },
                    { value: 'ip68', label: 'IP68' }
                  ] as const).map((ip) => (
                    <button
                      key={ip.value}
                      type="button"
                      onClick={() => setRadio('ipRating', ip.value)}
                      className={`
                        px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer
                        ${formData.ipRating === ip.value 
                          ? 'border-amber-500 bg-amber-50 text-amber-700' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }
                      `}
                    >
                      {ip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 3: LOGISTICS
          ═══════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Volume Slider */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <label htmlFor="volume" className="text-sm font-bold text-slate-900">
                    Volume Anual Estimado
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      id="volume"
                      min={100}
                      max={50000}
                      value={formData.volume}
                      onChange={(e) => setFormData(prev => ({ ...prev, volume: parseInt(e.target.value) || 100 }))}
                      className="w-24 h-9 px-2 text-right font-mono text-amber-600 font-bold border border-slate-300 rounded focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                    />
                    <span className="text-sm font-bold text-slate-500">un</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={100} 
                  max={50000} 
                  step={100}
                  value={formData.volume}
                  onChange={(e) => setFormData(prev => ({ ...prev, volume: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>100 (Lote Piloto)</span>
                  <span>50.000+ (Série)</span>
                </div>
              </div>

              {/* Delivery Format */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Formato de Entrega
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { value: 'single', label: 'Lote Único' },
                    { value: 'monthly', label: 'Entregas Mensais' },
                    { value: 'kanban', label: 'Kanban / JIT' }
                  ] as const).map((format) => (
                    <button
                      key={format.value}
                      type="button"
                      onClick={() => setRadio('deliveryFormat', format.value)}
                      className={`
                        cursor-pointer p-3 rounded-lg border-2 text-center transition-all text-sm font-medium
                        ${formData.deliveryFormat === format.value 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-slate-200 hover:border-slate-300'
                        }
                      `}
                    >
                      {format.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <label className={`
                  flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer
                  ${formData.isExport ? 'border-amber-300 bg-amber-50/50' : 'border-slate-200 hover:bg-slate-50'}
                `}>
                  <input 
                    type="checkbox" 
                    name="isExport" 
                    checked={formData.isExport} 
                    onChange={handleChange}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="flex items-center gap-2 font-medium text-slate-900">
                      <Globe className="w-4 h-4" /> Produto será exportado
                    </span>
                    <span className="text-sm text-slate-500">Requer documentação especial</span>
                  </div>
                </label>

                <label className={`
                  flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer
                  ${formData.needsSerialization ? 'border-amber-300 bg-amber-50/50' : 'border-slate-200 hover:bg-slate-50'}
                `}>
                  <input 
                    type="checkbox" 
                    name="needsSerialization" 
                    checked={formData.needsSerialization} 
                    onChange={handleChange}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="flex items-center gap-2 font-medium text-slate-900">
                      <QrCode className="w-4 h-4" /> Serialização Individual
                    </span>
                    <span className="text-sm text-slate-500">QR Code / Número de série por unidade</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 4: CONTACT & FINISH
          ═══════════════════════════════════════════════════════════ */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Projeto de Integração</h3>
                <p className="text-slate-600 max-w-sm mx-auto">
                  Nossa equipe de processos avaliará a viabilidade de montagem.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-bold text-slate-700 mb-2">
                    Seu Nome *
                  </label>
                  <input 
                    type="text" 
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="João Silva" 
                    className={`w-full h-12 px-4 rounded-lg border ${errors.contactName ? 'border-red-500' : 'border-slate-300'} focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none`}
                  />
                  {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-slate-700 mb-2">
                    Empresa
                  </label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da Empresa" 
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                    E-mail Corporativo *
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nome@empresa.com.br" 
                    className={`w-full h-12 px-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">
                    WhatsApp / Telefone
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999" 
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Desenhos Mecânicos
                </label>
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-amber-400 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept=".pdf,.dxf,.step,.stp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <UploadCloud className={`w-8 h-8 mb-2 transition-colors ${formData.drawingFile ? 'text-green-500' : 'text-slate-400 group-hover:text-amber-500'}`} />
                  {formData.drawingFile ? (
                    <span className="text-sm font-medium text-green-600">{formData.drawingFile.name}</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-slate-700">Arraste ou clique para upload</span>
                      <span className="text-xs text-slate-500 mt-1">PDF, DXF ou STEP</span>
                    </>
                  )}
                </label>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-bold text-slate-700 mb-2">
                  Observações de Processo
                </label>
                <textarea 
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full h-24 p-4 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none resize-none"
                  placeholder="Ex: Entrega fracionada mensal; Produto vai para exportação..."
                />
              </div>
            </div>
          )}

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
              className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg shadow-lg hover:bg-amber-400 transition-all flex items-center group cursor-pointer"
            >
              Continuar <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg shadow-lg hover:bg-slate-800 transition-all flex items-center hover:scale-105 transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Enviando...' : 'Cotar Box Build'} 
              {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2" />}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
