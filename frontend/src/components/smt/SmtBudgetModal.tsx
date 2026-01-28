'use client';

import { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  UploadCloud, 
  FileCode, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Microchip, 
  Settings,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

interface SmtBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmtBudgetModal({ isOpen, onClose }: SmtBudgetModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
     // Step 1: Scope
     scopePcba: true,
     scopeSupply: false,
     scopeStencil: false,
     scopeTests: false,
     
     // Step 2: Tech Specs
     projectClass: 'class2', // class2 | class3
     mountType: 'mixed', // single | double | mixed
     boardWidth: '',
     boardHeight: '',
     layerCount: '4',
     quantity: '50',
     lineItems: '',
     
     // Step 3: Contact
     email: '',
     notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const setRadio = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, quantity: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Format payload for Backend (BudgetRequestDto)
      // Since backend has limited fields, we serialize technical specs into projectDescription
      const technicalSpecs = `
[ESPECIFICAÇÕES TÉCNICAS SMT]
- Escopo: ${formData.scopePcba ? 'PCBA ' : ''}${formData.scopeSupply ? 'Supply ' : ''}${formData.scopeStencil ? 'Stencil ' : ''}${formData.scopeTests ? 'FCT' : ''}
- Classe IPC: ${formData.projectClass}
- Montagem: ${formData.mountType}
- Dimensões: ${formData.boardWidth}x${formData.boardHeight}mm
- Layers: ${formData.layerCount}
- Qtd: ${formData.quantity}
- Line Items: ${formData.lineItems}
- Notas: ${formData.notes}
      `.trim();

      const payload = {
        requesterName: 'Visitante (Via Modal)', // We might want to ask for name in modal Step 3
        requesterEmail: formData.email,
        company: 'N/A', // Modal doesn't ask for company yet, maybe add it?
        requesterPhone: '', 
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

      alert('Orçamento solicitado com sucesso! nossa engenharia entrará em contato.');
      onClose();

    } catch (error) {
      console.error(error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-slate-100">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-600" />
              Cotação - Montagem SMT
            </h2>
            {/* Progress Stepper */}
            <div className="flex items-center gap-2 mt-3 text-sm">
               <span className={`flex items-center gap-1 font-medium transition-colors ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                 <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-slate-300'}`}>1</span> Escopo
               </span>
               <div className="w-8 h-px bg-slate-200"></div>
               <span className={`flex items-center gap-1 font-medium transition-colors ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                 <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-slate-300'}`}>2</span> Detalhes
               </span>
               <div className="w-8 h-px bg-slate-200"></div>
               <span className={`flex items-center gap-1 font-medium transition-colors ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
                 <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${step >= 3 ? 'border-blue-600 bg-blue-50' : 'border-slate-300'}`}>3</span> Envio
               </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto flex-1 bg-white">
          
          {/* STEP 1: SCOPE SELECTION */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-900 leading-relaxed">
                    Personalize seu pacote. Selecione apenas os serviços que você precisa para este lote.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: PCBA */}
                  <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 ${formData.scopePcba ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200'}`}>
                    <div className="mt-1">
                      <input type="checkbox" name="scopePcba" checked={formData.scopePcba} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Montagem de Placa (PCBA)</span>
                      <span className="text-sm text-slate-500 mt-1 block">SMT e THT com inspeção SPI 3D e AOI inclusa. Reflow nitrogenado padrão.</span>
                    </div>
                  </label>

                  {/* Option 2: Supply Chain */}
                  <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 ${formData.scopeSupply ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200'}`}>
                    <div className="mt-1">
                      <input type="checkbox" name="scopeSupply" checked={formData.scopeSupply} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Supply Chain (Peças)</span>
                      <span className="text-sm text-slate-500 mt-1 block">Compra de componentes (Turnkey). Nós gerenciamos a importação e logística.</span>
                    </div>
                  </label>

                  {/* Option 3: Stencil */}
                  <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 ${formData.scopeStencil ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200'}`}>
                    <div className="mt-1">
                      <input type="checkbox" name="scopeStencil" checked={formData.scopeStencil} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Stencil Laser-Cut</span>
                      <span className="text-sm text-slate-500 mt-1 block">Fornecimento do estêncil de alta precisão (Nano-coating opcional).</span>
                    </div>
                  </label>

                  {/* Option 4: Functional Tests */}
                  <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 ${formData.scopeTests ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200'}`}>
                    <div className="mt-1">
                      <input type="checkbox" name="scopeTests" checked={formData.scopeTests} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Testes Funcionais (FCT)</span>
                      <span className="text-sm text-slate-500 mt-1 block">Validação elétrica final e gravação de firmware em linha.</span>
                    </div>
                  </label>
               </div>
            </div>
          )}

          {/* STEP 2: TECHNICAL SPECS */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               
               {/* Complexity / Class */}
               <div>
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                   <Settings className="w-4 h-4 text-slate-500" /> Complexidade & Padrão
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                   <div 
                      onClick={() => setRadio('projectClass', 'class2')}
                      className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center text-center transition-all ${formData.projectClass === 'class2' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
                   >
                      <span className="font-bold text-slate-900">IPC Class 2 (Standard)</span>
                      <span className="text-xs text-slate-500 mt-1">Eletrônica Geral & Consumo</span>
                   </div>
                   <div 
                      onClick={() => setRadio('projectClass', 'class3')}
                      className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center text-center transition-all ${formData.projectClass === 'class3' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
                   >
                      <span className="font-bold text-slate-900">IPC Class 3 (Critical)</span>
                      <span className="text-xs text-slate-500 mt-1">Médico, Aeroespacial, Automotivo</span>
                   </div>
                 </div>
               </div>

               {/* Board Specs Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Dimensoes da Placa (mm)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        name="boardWidth"
                        placeholder="Largura"
                        value={formData.boardWidth} 
                        onChange={handleChange}
                        className="w-full h-11 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                      <span className="text-slate-400">x</span>
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">Layers (Camadas)</label>
                    <div className="relative">
                      <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select 
                        name="layerCount"
                        value={formData.layerCount}
                        onChange={handleChange}
                        className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
                      >
                         <option value="1">1 Layer (Face Simples)</option>
                         <option value="2">2 Layers (Double Sided)</option>
                         <option value="4">4 Layers (Multilayer)</option>
                         <option value="6">6 Layers</option>
                         <option value="8+">8+ Layers (High Density)</option>
                      </select>
                    </div>
                 </div>
               </div>

               {/* Quantity & Items */}
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6">
                 <div>
                    <div className="flex justify-between items-center mb-4">
                       <label className="text-sm font-bold text-slate-900">Quantidade de Placas</label>
                       <div className="flex items-center gap-2">
                         <input 
                           type="number"
                           min="50"
                           max="100000"
                           value={formData.quantity}
                           onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                           className="w-24 h-9 px-2 text-right font-mono text-blue-600 font-bold border border-slate-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                         />
                         <span className="text-sm font-bold text-slate-500">un</span>
                       </div>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="10000" 
                      step="50"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                       <span>50 (Lote Piloto)</span>
                       <span>10.000 (Produção)</span>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Total de Componentes Distintos (Line Items)</label>
                    <div className="relative">
                       <Microchip className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input 
                          type="number"
                          name="lineItems"
                          placeholder="Ex: 85 linhas na BOM"
                          value={formData.lineItems}
                          onChange={handleChange}
                          className="w-full h-11 pl-10 pr-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        />
                    </div>
                 </div>
               </div>
            </div>
          )}

          {/* STEP 3: CONTACT & FINISH */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               
               <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <PackageCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Quase lá!</h3>
                  <p className="text-slate-600 max-w-sm mx-auto">
                    Nossa engenharia fará uma análise preliminar de DFM nos seus arquivos.
                  </p>
               </div>

               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Seu E-mail Corporativo *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nome@empresa.com.br" 
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
               </div>

               {/* File Upload Area Mockup */}
               <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                  <p className="text-sm font-medium text-slate-900">
                    Arraste seus arquivos Gerber (.zip) e BOM (.xls)
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Ou clique para selecionar do computador
                  </p>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Instruções Especiais de Montagem</label>
                 <textarea 
                   name="notes"
                   value={formData.notes}
                   onChange={handleChange}
                   className="w-full h-24 p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                   placeholder="Ex: Painelização deve ser feita por vocês; Componente X deve ser montado manualmente..."
                 ></textarea>
               </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center shrink-0">
          {step > 1 ? (
             <button 
               onClick={() => setStep(step - 1)}
               className="flex items-center text-slate-600 font-medium hover:text-slate-900 transition-colors group"
             >
               <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Voltar
             </button>
          ) : (
            <div></div> // Spacer
          )}

          {step < 3 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center group"
            >
              Continuar <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all flex items-center hover:scale-105 transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento Premium'} 
              {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2" />}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
