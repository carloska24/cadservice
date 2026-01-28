'use client';

import { useState, useCallback } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Microchip, 
  Settings,
  ShieldCheck,
  PackageCheck,
  Download,
  FileText,
  Package,
  Truck,
  AlertCircle
} from 'lucide-react';

interface SmtBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 5;

const STEP_LABELS = [
  { id: 1, label: 'Escopo', icon: Settings },
  { id: 2, label: 'Placa', icon: Layers },
  { id: 3, label: 'Arquivos', icon: FileText },
  { id: 4, label: 'Supply', icon: Package },
  { id: 5, label: 'Envio', icon: Truck },
];

export function SmtBudgetModal({ isOpen, onClose }: SmtBudgetModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    
    // Step 3: Files
    bomFile: null as File | null,
    gerberFile: null as File | null,
    pickPlaceFile: null as File | null,
    
    // Step 4: Supply Chain
    supplyModel: 'turnkey' as 'turnkey' | 'consigned' | 'hybrid',
    acceptAlternatives: false,
    keepStock: false,
    
    // Step 5: Contact
    contactName: '',
    company: '',
    email: '',
    phone: '',
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

      const technicalSpecs = `
[ESPECIFICAÇÕES TÉCNICAS SMT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Escopo: ${scopeItems.join(', ')}
→ Classe IPC: ${formData.projectClass === 'class3' ? 'Class 3 (Crítico)' : 'Class 2 (Standard)'}
→ Lado Montagem: ${formData.mountSide === 'both' ? 'Ambos os Lados' : formData.mountSide === 'top' ? 'Top Only' : 'Bottom Only'}
→ Dimensões PCB: ${formData.boardWidth || '?'}mm x ${formData.boardHeight || '?'}mm
→ Layers: ${formData.layerCount}
→ Quantidade: ${formData.quantity} placas

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

      const payload = {
        requesterName: formData.contactName,
        requesterEmail: formData.email,
        company: formData.company || 'N/A',
        requesterPhone: formData.phone || '',
        projectDescription: technicalSpecs
      };

      const response = await fetch('http://localhost:8080/api/public/v1/budget-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Falha no envio');

      // Reset form and close
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
        bomFile: null,
        gerberFile: null,
        pickPlaceFile: null,
        supplyModel: 'turnkey',
        acceptAlternatives: false,
        keepStock: false,
        contactName: '',
        company: '',
        email: '',
        phone: '',
        notes: ''
      });
      alert('✅ Orçamento solicitado com sucesso! Nossa engenharia entrará em contato em até 24h.');
      onClose();

    } catch (error) {
      console.error(error);
      alert('❌ Erro ao enviar solicitação. Por favor, tente novamente.');
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 shrink-0">
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
              STEP 1: SCOPE SELECTION
          ═══════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>Personalize seu pacote.</strong> Marque apenas os serviços que você precisa para este lote.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: SMT */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopeSmt ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopeSmt" 
                      checked={formData.scopeSmt} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Montagem SMT</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Componentes SMD com inspeção SPI 3D e AOI. Reflow nitrogenado.
                    </span>
                  </div>
                </label>

                {/* Option 2: THT */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopeTht ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopeTht" 
                      checked={formData.scopeTht} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Montagem THT</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Componentes Through-Hole. Solda Wave ou manual seletiva.
                    </span>
                  </div>
                </label>

                {/* Option 3: Stencil */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopeStencil ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopeStencil" 
                      checked={formData.scopeStencil} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Stencil Laser-Cut</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Estêncil de alta precisão com Nano-coating opcional.
                    </span>
                  </div>
                </label>

                {/* Option 4: Functional Tests */}
                <label className={`
                  relative flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer
                  hover:bg-slate-50 hover:border-slate-300
                  ${formData.scopeTests ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200'}
                `}>
                  <div className="mt-0.5">
                    <input 
                      type="checkbox" 
                      name="scopeTests" 
                      checked={formData.scopeTests} 
                      onChange={handleChange} 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-900">Testes Funcionais (FCT)</span>
                    <span className="text-sm text-slate-500 mt-1 block">
                      Validação elétrica final e gravação de firmware em linha.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 2: TECHNICAL SPECS
          ═══════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* IPC Class */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-500" /> Padrão IPC
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setRadio('projectClass', 'class2')}
                    className={`
                      cursor-pointer p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all
                      ${formData.projectClass === 'class2' 
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <span className="font-bold text-slate-900">IPC Class 2</span>
                    <span className="text-xs text-slate-500 mt-1">Eletrônica Geral & Consumo</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setRadio('projectClass', 'class3')}
                    className={`
                      cursor-pointer p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all
                      ${formData.projectClass === 'class3' 
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <span className="font-bold text-slate-900">IPC Class 3</span>
                    <span className="text-xs text-slate-500 mt-1">Médico, Aeroespacial, Automotivo</span>
                  </button>
                </div>
              </div>

              {/* Assembly Side */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Lado de Montagem
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['top', 'bottom', 'both'] as const).map((side) => (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setRadio('mountSide', side)}
                      className={`
                        cursor-pointer p-3 rounded-lg border-2 text-center transition-all text-sm font-medium
                        ${formData.mountSide === side 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-slate-200 hover:border-slate-300'
                        }
                      `}
                    >
                      {side === 'top' && 'Top Only'}
                      {side === 'bottom' && 'Bottom Only'}
                      {side === 'both' && 'Ambos Lados'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Board Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="boardDimensions" className="block text-sm font-medium text-slate-700 mb-2">
                    Dimensões da Placa (mm)
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      id="boardWidth"
                      name="boardWidth"
                      placeholder="Largura"
                      value={formData.boardWidth} 
                      onChange={handleChange}
                      className="w-full h-11 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                    <span className="text-slate-400 font-bold">×</span>
                    <input 
                      type="number" 
                      name="boardHeight"
                      placeholder="Altura"
                      value={formData.boardHeight} 
                      onChange={handleChange}
                      className="w-full h-11 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="layerCount" className="block text-sm font-medium text-slate-700 mb-2">
                    Camadas (Layers)
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      id="layerCount"
                      name="layerCount"
                      value={formData.layerCount}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="1">1 Layer (Face Simples)</option>
                      <option value="2">2 Layers (Double Sided)</option>
                      <option value="4">4 Layers (Multilayer)</option>
                      <option value="6">6 Layers</option>
                      <option value="8">8+ Layers (HDI)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <label htmlFor="quantity" className="text-sm font-bold text-slate-900">
                    Quantidade de Placas
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      id="quantity"
                      min={50}
                      max={100000}
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 50 }))}
                      className="w-24 h-9 px-2 text-right font-mono text-blue-600 font-bold border border-slate-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                    <span className="text-sm font-bold text-slate-500">un</span>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={50} 
                  max={10000} 
                  step={50}
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  aria-label="Quantidade de placas"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>50 (Lote Piloto)</span>
                  <span>10.000+ (Produção)</span>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 3: FILE UPLOAD
          ═══════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-sm text-amber-900">
                  <strong>Arquivos aceleram sua cotação.</strong> Upload opcional, mas recomendado para análise DFM precisa.
                </div>
              </div>

              {/* BOM Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  BOM (Bill of Materials)
                </label>
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => handleFileChange(e, 'bomFile')}
                    className="hidden"
                  />
                  <UploadCloud className={`w-8 h-8 mb-2 transition-colors ${formData.bomFile ? 'text-green-500' : 'text-slate-400 group-hover:text-blue-500'}`} />
                  {formData.bomFile ? (
                    <span className="text-sm font-medium text-green-600">{formData.bomFile.name}</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-slate-700">Arraste ou clique para upload</span>
                      <span className="text-xs text-slate-500 mt-1">.xlsx, .xls ou .csv</span>
                    </>
                  )}
                </label>
              </div>

              {/* Gerber Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Gerber Files
                </label>
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept=".zip,.rar"
                    onChange={(e) => handleFileChange(e, 'gerberFile')}
                    className="hidden"
                  />
                  <UploadCloud className={`w-8 h-8 mb-2 transition-colors ${formData.gerberFile ? 'text-green-500' : 'text-slate-400 group-hover:text-blue-500'}`} />
                  {formData.gerberFile ? (
                    <span className="text-sm font-medium text-green-600">{formData.gerberFile.name}</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-slate-700">Arraste ou clique para upload</span>
                      <span className="text-xs text-slate-500 mt-1">.zip contendo todos os layers</span>
                    </>
                  )}
                </label>
              </div>

              {/* Pick & Place (Optional) */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Pick & Place / Centroid <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept=".csv,.xlsx,.txt"
                    onChange={(e) => handleFileChange(e, 'pickPlaceFile')}
                    className="hidden"
                  />
                  <UploadCloud className={`w-6 h-6 transition-colors ${formData.pickPlaceFile ? 'text-green-500' : 'text-slate-400 group-hover:text-blue-500'}`} />
                  {formData.pickPlaceFile ? (
                    <span className="text-sm font-medium text-green-600">{formData.pickPlaceFile.name}</span>
                  ) : (
                    <span className="text-sm text-slate-600">Arquivo .csv ou .xlsx com coordenadas XY</span>
                  )}
                </label>
              </div>

              {/* Download Templates */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Template BOM (.xlsx)
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Guia de Preparação de Arquivos
                </a>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 4: SUPPLY CHAIN
          ═══════════════════════════════════════════════════════════ */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" /> Quem fornece os componentes?
              </h3>

              {/* Supply Model Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setRadio('supplyModel', 'turnkey')}
                  className={`
                    cursor-pointer p-5 rounded-xl border-2 text-left transition-all
                    ${formData.supplyModel === 'turnkey' 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.supplyModel === 'turnkey' ? 'border-blue-500' : 'border-slate-300'}`}>
                      {formData.supplyModel === 'turnkey' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <span className="font-bold text-slate-900">TURNKEY</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    CADService compra todos os componentes. Você recebe placas prontas.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRadio('supplyModel', 'consigned')}
                  className={`
                    cursor-pointer p-5 rounded-xl border-2 text-left transition-all
                    ${formData.supplyModel === 'consigned' 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.supplyModel === 'consigned' ? 'border-blue-500' : 'border-slate-300'}`}>
                      {formData.supplyModel === 'consigned' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <span className="font-bold text-slate-900">CONSIGNADO</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Você envia todos os kits de componentes. Nós montamos.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRadio('supplyModel', 'hybrid')}
                  className={`
                    cursor-pointer p-5 rounded-xl border-2 text-left transition-all
                    ${formData.supplyModel === 'hybrid' 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.supplyModel === 'hybrid' ? 'border-blue-500' : 'border-slate-300'}`}>
                      {formData.supplyModel === 'hybrid' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <span className="font-bold text-slate-900">HÍBRIDO</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Dividimos a lista. Você envia alguns, nós compramos outros.
                  </p>
                </button>
              </div>

              {/* Additional Options */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className={`
                  flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer
                  ${formData.acceptAlternatives ? 'border-blue-300 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}
                `}>
                  <input 
                    type="checkbox" 
                    name="acceptAlternatives" 
                    checked={formData.acceptAlternatives} 
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="block font-medium text-slate-900">Aceitar alternativas chinesas equivalentes</span>
                    <span className="text-sm text-slate-500">Pode reduzir custo em até 30%</span>
                  </div>
                </label>

                <label className={`
                  flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer
                  ${formData.keepStock ? 'border-blue-300 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}
                `}>
                  <input 
                    type="checkbox" 
                    name="keepStock" 
                    checked={formData.keepStock} 
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="block font-medium text-slate-900">Armazenar excedente para próximos lotes</span>
                    <span className="text-sm text-slate-500">Estoque seguro para reposição rápida</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 5: CONTACT & FINISH
          ═══════════════════════════════════════════════════════════ */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PackageCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Quase lá!</h3>
                <p className="text-slate-600 max-w-sm mx-auto">
                  Nossa engenharia fará uma análise DFM gratuita nos seus arquivos.
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
                    className={`w-full h-12 px-4 rounded-lg border ${errors.contactName ? 'border-red-500' : 'border-slate-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none`}
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
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
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
                    className={`w-full h-12 px-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none`}
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
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-bold text-slate-700 mb-2">
                  Instruções Especiais de Montagem
                </label>
                <textarea 
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full h-24 p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                  placeholder="Ex: Componente U5 é sensível a MSL; Painelização deve ser feita por vocês..."
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
    </div>
  );
}
