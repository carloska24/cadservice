'use client';

import { useState } from 'react';
import { API_URL } from '@/lib/api';
import { uploadFileToStorage } from '@/lib/upload';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  Lightbulb, 
  FileCode, 
  Settings, 
  BarChart,
  Send,
  CheckCircle2
} from 'lucide-react';

interface NpiWizardModalProps {
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
  { id: 1, label: 'Projeto', icon: Lightbulb },
  { id: 2, label: 'Design', icon: FileCode },
  { id: 3, label: 'Teste', icon: Settings },
  { id: 4, label: 'Volume', icon: BarChart },
  { id: 5, label: 'Contato', icon: Send },
];

export function NpiWizardModal({ isOpen, onClose, initialContactInfo }: NpiWizardModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Project Info
    projectName: '',
    stage: '' as '' | 'concept' | 'prototype' | 'design-ready' | 'production-transfer',
    targetDate: '',
    
    // Step 2: Design Files
    hasSchematics: false,
    hasGerber: false,
    hasBom: false,
    hasPickPlace: false,
    has3dModel: false,
    hasFirmware: false,
    
    // Step 3: Test Strategy
    testStrategy: '' as '' | 'aoi-only' | 'ict' | 'fct-client' | 'fct-cad',
    needsFirmwareFlash: false,
    hasCalibration: false,
    complexity: 'medium' as 'basic' | 'medium' | 'advanced',
    
    // Step 4: Volume
    annualVolume: '',
    pilotQty: '',
    
    // Step 5: Contact
    contactName: initialContactInfo?.name || '',
    company: initialContactInfo?.company || '',
    email: initialContactInfo?.email || '',
    phone: initialContactInfo?.phone || '',
    designFile: null as File | null,
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
    setFormData(prev => ({ ...prev, designFile: file }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.projectName) newErrors.projectName = 'Nome do projeto é obrigatório';
      if (!formData.stage) newErrors.stage = 'Selecione o estágio atual';
    }
    
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
      const testText = {
        'none': 'Sem Testes',
        'ict': 'ICT (In-Circuit)',
        'fct': 'FCT (Funcional)',
        'flying': 'Flying Probe',
        'xray': 'Raio-X (BGA/QFN)'
      }[formData.testStrategy] || formData.testStrategy;

      // Generate protocol
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const protocol = `NPI-${new Date().getFullYear()}-${timestamp.toString().slice(-6)}-${random}`;

      const technicalSpecs = `
[PROTOCOLO: ${protocol}]

[PROJETO NPI]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Nome: ${formData.projectName}
→ Estágio Atual: ${formData.stage === 'concept' ? 'Conceito/Ideia' : formData.stage === 'schematic' ? 'Esquemático Pronto' : formData.stage === 'layout' ? 'Layout Pronto' : 'Protótipo Validado'}
→ Data Alvo: ${formData.targetDate || 'ASAP'}
→ Complexidade Estimada: ${formData.complexity.toUpperCase()}

[ARQUIVOS DISPONÍVEIS]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.hasSchematics ? '☑ Esquemático' : '☐ Esquemático'}
${formData.hasGerber ? '☑ Gerber' : '☐ Gerber'}
${formData.hasBom ? '☑ BOM' : '☐ BOM'}
${formData.hasPickPlace ? '☑ Pick & Place' : '☐ Pick & Place'}
${formData.has3dModel ? '☑ 3D STEP' : '☐ 3D STEP'}

[TESTES & QUALIDADE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Estratégia: ${testText}
→ Gravação Firmware: ${formData.needsFirmwareFlash ? 'Sim' : 'Não'}
→ Calibração: ${formData.hasCalibration ? 'Sim' : 'Não'}

[VOLUME]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Volume Anual: ${formData.annualVolume || 'N/A'}
→ Lote Piloto: ${formData.pilotQty || 'N/A'}

[CONTATO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Nome: ${formData.contactName}
→ Empresa: ${formData.company || 'N/A'}
→ Telefone: ${formData.phone || 'N/A'}

[NOTAS]
${formData.notes || 'Nenhuma'}
      `.trim();

      // 1. Upload Files Securely
      const attachments = [];
      if (formData.designFile) {
        try {
          const uploaded = await uploadFileToStorage(formData.designFile as File);
          attachments.push(uploaded);
        } catch (err) {
          console.error('Failed to upload designFile', err);
          throw new Error(`Erro ao enviar arquivo: ${formData.designFile.name}`);
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
        projectName: '',
        stage: '',
        targetDate: '',
        hasSchematics: false,
        hasGerber: false,
        hasBom: false,
        hasPickPlace: false,
        has3dModel: false,
        hasFirmware: false,
        testStrategy: '',
        needsFirmwareFlash: false,
        hasCalibration: false,
        complexity: 'medium',
        annualVolume: '',
        pilotQty: '',
        contactName: '',
        company: '',
        email: '',
        phone: '',
        designFile: null,
        notes: ''
      });
      
      alert(`✅ Projeto NPI enviado com sucesso! Protocolo: ${protocol}`);
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
        <div className="bg-gradient-to-r from-violet-600 to-violet-700 p-6 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Iniciar Novo Projeto (NPI)
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
                        ? 'bg-white text-violet-600' 
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
              STEP 1: PROJECT IDENTIFICATION
          ═══════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="bg-violet-50 border border-violet-100 rounded-lg p-4 flex gap-3 items-start">
                <Zap className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" />
                <p className="text-sm text-violet-900 leading-relaxed">
                  <strong>Novo Produto!</strong> Vamos entender seu projeto para preparar uma análise DFM completa.
                </p>
              </div>

              <div>
                <label htmlFor="projectName" className="block text-sm font-bold text-slate-700 mb-2">
                  Nome do Projeto / PCBA *
                </label>
                <input 
                  type="text" 
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Ex: Controlador IoT V2.0" 
                  className={`w-full h-12 px-4 rounded-lg border ${errors.projectName ? 'border-red-500' : 'border-slate-300'} focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all outline-none`}
                />
                {errors.projectName && <p className="text-red-500 text-xs mt-1">{errors.projectName}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Estágio Atual do Projeto *
                </label>
                <div className="space-y-3">
                  {([
                    { value: 'concept', label: 'Design Conceitual', desc: 'Esquemático em andamento' },
                    { value: 'prototype', label: 'Protótipo Funcional (Bancada)', desc: 'Já validou a funcionalidade' },
                    { value: 'design-ready', label: 'Design Pronto (Files Released)', desc: 'Gerber e BOM finalizados' },
                    { value: 'production-transfer', label: 'Já em Produção (Transferência)', desc: 'Migração de outro CM' }
                  ] as const).map((option) => (
                    <label 
                      key={option.value} 
                      className={`
                        flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all
                        hover:bg-slate-50 hover:border-slate-300
                        ${formData.stage === option.value ? 'border-violet-500 bg-violet-50/50' : 'border-slate-200'}
                      `}
                    >
                      <input 
                        type="radio" 
                        name="stage" 
                        value={option.value}
                        checked={formData.stage === option.value}
                        onChange={() => setRadio('stage', option.value)}
                        className="w-4 h-4 mt-1 text-violet-600 border-slate-300 focus:ring-violet-500 cursor-pointer" 
                      />
                      <div>
                        <span className="font-medium text-slate-900">{option.label}</span>
                        <span className="text-sm text-slate-500 block">{option.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.stage && <p className="text-red-500 text-xs mt-1">{errors.stage}</p>}
              </div>

              <div>
                <label htmlFor="targetDate" className="block text-sm font-bold text-slate-700 mb-2">
                  Data Alvo para Lote Piloto
                </label>
                <input 
                  type="date" 
                  id="targetDate"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-slate-600 cursor-pointer" 
                />
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 2: DESIGN FILES
          ═══════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4 text-slate-500" /> Arquivos de Design Disponíveis
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {([
                  { name: 'hasSchematics', label: 'Schematics (.pdf)', desc: 'Esquemático eletrônico' },
                  { name: 'hasGerber', label: 'Gerber Files (RS-274X)', desc: 'Arquivos de fabricação PCB' },
                  { name: 'hasBom', label: 'BOM (Excel/CSV)', desc: 'Lista de materiais' },
                  { name: 'hasPickPlace', label: 'Pick & Place (.csv)', desc: 'Coordenadas XY' },
                  { name: 'has3dModel', label: '3D Model (.step)', desc: 'Modelo mecânico' },
                  { name: 'hasFirmware', label: 'Firmware (.hex/.bin)', desc: 'Software embarcado' }
                ] as const).map((file) => (
                  <label 
                    key={file.name} 
                    className={`
                      flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all
                      hover:bg-slate-50 hover:border-slate-300
                      ${formData[file.name] ? 'border-violet-500 bg-violet-50/50' : 'border-slate-200'}
                    `}
                  >
                    <input 
                      type="checkbox" 
                      name={file.name}
                      checked={formData[file.name]}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-violet-600 border-slate-300 focus:ring-violet-500 mt-0.5 cursor-pointer" 
                    />
                    <div>
                      <span className="font-medium text-slate-900">{file.label}</span>
                      <span className="text-xs text-slate-500 block">{file.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Complexity Level */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-500" /> Complexidade do Projeto
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { value: 'basic', label: 'Básico', desc: '< 100 componentes' },
                    { value: 'medium', label: 'Médio', desc: '100-500 componentes' },
                    { value: 'advanced', label: 'Avançado', desc: '500+, BGA, HDI' }
                  ] as const).map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setRadio('complexity', level.value)}
                      className={`
                        cursor-pointer p-3 rounded-lg border-2 text-center transition-all
                        ${formData.complexity === level.value 
                          ? 'border-violet-500 bg-violet-50' 
                          : 'border-slate-200 hover:border-slate-300'
                        }
                      `}
                    >
                      <span className="font-bold text-slate-900 text-sm block">{level.label}</span>
                      <span className="text-xs text-slate-500">{level.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 3: TEST STRATEGY
          ═══════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-500" /> Estratégia de Teste
              </h3>
              
              <div className="space-y-3">
                {([
                  { value: 'aoi-only', label: 'Apenas Inspeção Visual (AOI)', desc: 'Padrão para protótipos simples' },
                  { value: 'ict', label: 'ICT (In-Circuit Test)', desc: 'Teste de componentes individuais via bed-of-nails' },
                  { value: 'fct-client', label: 'Teste Funcional (FCT) - Cliente Fornece', desc: 'Você envia jiga e procedimento prontos' },
                  { value: 'fct-cad', label: 'Teste Funcional (FCT) - CADService Desenvolve', desc: 'Nossa engenharia cria jiga e software' }
                ] as const).map((option) => (
                  <label 
                    key={option.value} 
                    className={`
                      flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all
                      hover:bg-slate-50 hover:border-slate-300
                      ${formData.testStrategy === option.value ? 'border-violet-500 bg-violet-50/50' : 'border-slate-200'}
                    `}
                  >
                    <input 
                      type="radio" 
                      name="testStrategy" 
                      value={option.value}
                      checked={formData.testStrategy === option.value}
                      onChange={() => setRadio('testStrategy', option.value)}
                      className="w-4 h-4 mt-1 text-violet-600 border-slate-300 focus:ring-violet-500 cursor-pointer" 
                    />
                    <div>
                      <span className="font-bold text-slate-900">{option.label}</span>
                      <span className="text-sm text-slate-500 block">{option.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Additional Test Options */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className={`
                  flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer
                  ${formData.needsFirmwareFlash ? 'border-violet-300 bg-violet-50/50' : 'border-slate-200 hover:bg-slate-50'}
                `}>
                  <input 
                    type="checkbox" 
                    name="needsFirmwareFlash" 
                    checked={formData.needsFirmwareFlash} 
                    onChange={handleChange}
                    className="w-5 h-5 text-violet-600 rounded focus:ring-violet-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="font-medium text-slate-900">Gravação de Firmware em Linha</span>
                    <span className="text-sm text-slate-500 block">Flash de software embarcado na produção</span>
                  </div>
                </label>

                <label className={`
                  flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer
                  ${formData.hasCalibration ? 'border-violet-300 bg-violet-50/50' : 'border-slate-200 hover:bg-slate-50'}
                `}>
                  <input 
                    type="checkbox" 
                    name="hasCalibration" 
                    checked={formData.hasCalibration} 
                    onChange={handleChange}
                    className="w-5 h-5 text-violet-600 rounded focus:ring-violet-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="font-medium text-slate-900">Calibração de Sensores</span>
                    <span className="text-sm text-slate-500 block">Ajuste fino de parâmetros por unidade</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 4: VOLUME
          ═══════════════════════════════════════════════════════════ */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BarChart className="w-4 h-4 text-slate-500" /> Projeção de Volume
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="annualVolume" className="block text-sm font-bold text-slate-700 mb-2">
                    Volume Estimado (anual) *
                  </label>
                  <select 
                    id="annualVolume"
                    name="annualVolume"
                    value={formData.annualVolume}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none text-slate-700 cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    <option value="100-1000">100 - 1.000 (Lote Piloto)</option>
                    <option value="1000-5000">1.000 - 5.000 (Baixo Volume)</option>
                    <option value="5000-50000">5.000 - 50.000 (Médio Volume)</option>
                    <option value="50000+">50.000+ (High Volume)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="pilotQty" className="block text-sm font-bold text-slate-700 mb-2">
                    Quantidade Lote Piloto
                  </label>
                  <input 
                    type="text" 
                    id="pilotQty"
                    name="pilotQty"
                    value={formData.pilotQty}
                    onChange={handleChange}
                    placeholder="Ex: 50 unidades" 
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none" 
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-violet-50 border border-violet-100 rounded-lg p-4 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" />
                <div className="text-sm text-violet-900">
                  <strong>Lote Piloto:</strong> Primeiro lote para validação do processo de montagem. 
                  Geralmente 10-100 unidades para garantir qualidade antes de escalar produção.
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              STEP 5: CONTACT & FINISH
          ═══════════════════════════════════════════════════════════ */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Pronto para Enviar!</h3>
                <p className="text-slate-600 max-w-sm mx-auto">
                  Nossa equipe NPI entrará em contato para análise de DFM gratuita.
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
                    className={`w-full h-12 px-4 rounded-lg border ${errors.contactName ? 'border-red-500' : 'border-slate-300'} focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none`}
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
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
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
                    className={`w-full h-12 px-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none`}
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
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Arquivos de Design <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-violet-400 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept=".zip,.rar,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <UploadCloud className={`w-8 h-8 mb-2 transition-colors ${formData.designFile ? 'text-green-500' : 'text-slate-400 group-hover:text-violet-500'}`} />
                  {formData.designFile ? (
                    <span className="text-sm font-medium text-green-600">{formData.designFile.name}</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-slate-700">Arraste ou clique para upload</span>
                      <span className="text-xs text-slate-500 mt-1">.zip com Gerber, BOM e Schematics</span>
                    </>
                  )}
                </label>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-bold text-slate-700 mb-2">
                  Desafios Específicos / Observações
                </label>
                <textarea 
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full h-24 p-4 rounded-lg border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none resize-none"
                  placeholder="Ex: Componente U12 crítico; tolerância fina no conector J1..."
                />
              </div>

              {/* Download guides */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Checklist NPI (.pdf)
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
                >
                  <FileCode className="w-4 h-4" />
                  Template BOM (.xlsx)
                </a>
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
              className="px-6 py-3 bg-violet-600 text-white font-bold rounded-lg shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-all flex items-center group cursor-pointer"
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
              {isSubmitting ? 'Enviando...' : 'Iniciar Projeto NPI'} 
              {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2" />}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
