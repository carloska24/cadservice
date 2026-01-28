'use client';

import { useState } from 'react';
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
  Factory
} from 'lucide-react';

interface BoxBuildBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BoxBuildBudgetModal({ isOpen, onClose }: BoxBuildBudgetModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
     // Step 1: Scope
     scopeAssembly: true,
     scopeHarness: false,
     scopeFirmware: false,
     scopePackaging: false,
     
     // Step 2: Logistics & Materials
     supplyModel: 'turnkey', // turnkey | consigned | hybrid
     cabinetType: '',
     volume: '1000',
     coating: false,
     
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const technicalSpecs = `
[ESPECIFICAÇÕES BOX BUILD]
- Integração: ${formData.scopeAssembly ? 'Mecânica ' : ''}${formData.scopeHarness ? 'Cabos ' : ''}${formData.scopeFirmware ? 'Firmware ' : ''}${formData.scopePackaging ? 'Embalagem' : ''}
- Supply Model: ${formData.supplyModel}
- Gabinete: ${formData.cabinetType}
- Volume Anual: ${formData.volume}
- Coating: ${formData.coating ? 'SIM' : 'NÃO'}
- Notas: ${formData.notes}
      `.trim();

      const payload = {
        requesterName: 'Visitante (Box Build)',
        requesterEmail: formData.email,
        company: 'N/A',
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

      alert('Orçamento de Box Build solicitado com sucesso! Entraremos em contato.');
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
              <Package className="w-6 h-6 text-amber-600" />
              Cotação - Box Build (Integração)
            </h2>
            {/* Progress Stepper */}
            <div className="flex items-center gap-2 mt-3 text-sm">
               <span className={`flex items-center gap-1 font-medium transition-colors ${step >= 1 ? 'text-amber-600' : 'text-slate-400'}`}>
                 <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${step >= 1 ? 'border-amber-600 bg-amber-50' : 'border-slate-300'}`}>1</span> Integração
               </span>
               <div className="w-8 h-px bg-slate-200"></div>
               <span className={`flex items-center gap-1 font-medium transition-colors ${step >= 2 ? 'text-amber-600' : 'text-slate-400'}`}>
                 <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${step >= 2 ? 'border-amber-600 bg-amber-50' : 'border-slate-300'}`}>2</span> Materiais
               </span>
               <div className="w-8 h-px bg-slate-200"></div>
               <span className={`flex items-center gap-1 font-medium transition-colors ${step >= 3 ? 'text-amber-600' : 'text-slate-400'}`}>
                 <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${step >= 3 ? 'border-amber-600 bg-amber-50' : 'border-slate-300'}`}>3</span> Finalização
               </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto flex-1 bg-white">
          
          {/* STEP 1: INTEGRATION SCOPE */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 items-start">
                  <BoxSelect className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-900 leading-relaxed">
                    Configure sua linha de integração. Entregamos desde o sub-frame até o produto lacrado na caixa.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: Mechanical Assembly */}
                  <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 ${formData.scopeAssembly ? 'border-amber-500 bg-amber-50/30' : 'border-slate-200'}`}>
                    <div className="mt-1">
                      <input type="checkbox" name="scopeAssembly" checked={formData.scopeAssembly} onChange={handleChange} className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Montagem Mecânica</span>
                      <span className="text-sm text-slate-500 mt-1 block">União da PCBA com o gabinete, parafusamento com torque controlado e labels.</span>
                    </div>
                  </label>

                  {/* Option 2: Harnessing */}
                  <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 ${formData.scopeHarness ? 'border-amber-500 bg-amber-50/30' : 'border-slate-200'}`}>
                    <div className="mt-1">
                      <input type="checkbox" name="scopeHarness" checked={formData.scopeHarness} onChange={handleChange} className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Cabeamento (Harnessing)</span>
                      <span className="text-sm text-slate-500 mt-1 block">Corte, decape e crimpagem de chicotes customizados sob demanda.</span>
                    </div>
                  </label>

                  {/* Option 3: Firmware */}
                  <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 ${formData.scopeFirmware ? 'border-amber-500 bg-amber-50/30' : 'border-slate-200'}`}>
                    <div className="mt-1">
                      <input type="checkbox" name="scopeFirmware" checked={formData.scopeFirmware} onChange={handleChange} className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Gravação & Teste (FCT)</span>
                      <span className="text-sm text-slate-500 mt-1 block">Flash de firmware, calibração e teste funcional completo antes de fechar.</span>
                    </div>
                  </label>

                  {/* Option 4: Retail Packaging */}
                  <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 ${formData.scopePackaging ? 'border-amber-500 bg-amber-50/30' : 'border-slate-200'}`}>
                    <div className="mt-1">
                      <input type="checkbox" name="scopePackaging" checked={formData.scopePackaging} onChange={handleChange} className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500" />
                    </div>
                    <div>
                      <span className="block font-bold text-slate-900">Embalagem Varejo</span>
                      <span className="text-sm text-slate-500 mt-1 block">Produto pronto para venda (Ship-to-Stock) com manual e acessórios.</span>
                    </div>
                  </label>
               </div>
            </div>
          )}

          {/* STEP 2: LOGISTICS & MATERIALS */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               
               {/* Supply Model */}
               <div>
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                   <Truck className="w-4 h-4 text-slate-500" /> Modelo de Fornecimento
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   <div 
                      onClick={() => setRadio('supplyModel', 'turnkey')}
                      className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center text-center transition-all ${formData.supplyModel === 'turnkey' ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-slate-200 hover:border-slate-300'}`}
                   >
                      <span className="font-bold text-slate-900 text-sm">Full Turnkey</span>
                      <span className="text-xs text-slate-500 mt-1">Nós compramos tudo</span>
                   </div>
                   <div 
                      onClick={() => setRadio('supplyModel', 'consigned')}
                      className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center text-center transition-all ${formData.supplyModel === 'consigned' ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-slate-200 hover:border-slate-300'}`}
                   >
                      <span className="font-bold text-slate-900 text-sm">Consignado</span>
                      <span className="text-xs text-slate-500 mt-1">Você envia os kits</span>
                   </div>
                   <div 
                      onClick={() => setRadio('supplyModel', 'hybrid')}
                      className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center text-center transition-all ${formData.supplyModel === 'hybrid' ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-slate-200 hover:border-slate-300'}`}
                   >
                      <span className="font-bold text-slate-900 text-sm">Híbrido</span>
                      <span className="text-xs text-slate-500 mt-1">Mix de ambos</span>
                   </div>
                 </div>
               </div>

               {/* Cabinet & Volume */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Gabinete / Case</label>
                    <select 
                        name="cabinetType"
                        value={formData.cabinetType}
                        onChange={handleChange}
                        className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                      >
                         <option value="">Selecione...</option>
                         <option value="plastic">Plástico Injetado (Molde Cliente)</option>
                         <option value="metal">Metal Sheet (Chapa Metálica)</option>
                         <option value="off-shelf">Caixa Padrão de Mercado</option>
                         <option value="none">Sem Gabinete (Apenas PCBA+Cabos)</option>
                      </select>
                 </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 col-span-1 sm:col-span-2 md:col-span-1">
                    <div className="flex justify-between items-center mb-4">
                       <label className="text-sm font-bold text-slate-900">Volume Anual Estimado</label>
                       <div className="flex items-center gap-2">
                         <input 
                           type="number"
                           min="100"
                           max="50000"
                           value={formData.volume}
                           onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                           className="w-24 h-9 px-2 text-right font-mono text-amber-600 font-bold border border-slate-300 rounded focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                         />
                         <span className="text-sm font-bold text-slate-500">un</span>
                       </div>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="50000" 
                      step="100"
                      value={formData.volume}
                      onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                       <span>100 (Lote Piloto)</span>
                       <span>50.000 (Série)</span>
                    </div>
                 </div>
               </div>

               {/* Extra Options */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="coating"
                        checked={formData.coating}
                        onChange={handleChange}
                        className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500" 
                       />
                      <div>
                         <span className="text-slate-900 text-sm font-bold">Aplicar Conformal Coating?</span>
                         <span className="text-slate-500 text-xs block">Proteção contra umidade e poeira nas placas.</span>
                      </div>
                    </label>
                 </div>
            </div>
          )}

          {/* STEP 3: CONTACT & FINISH */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               
               <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Factory className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Projeto de Integração</h3>
                  <p className="text-slate-600 max-w-sm mx-auto">
                    Envie os detalhes da mecânica. Nossa equipe de processos avaliará a viabilidade de montagem.
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
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                  />
               </div>

               {/* File Upload Area Mockup */}
               <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3 group-hover:text-amber-500 transition-colors" />
                  <p className="text-sm font-medium text-slate-900">
                    Arraste Desenhos Mecânicos (PDF/DXF) ou STEP
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Documentação de montagem e instruções de embalagem
                  </p>
               </div>

               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Observações de Logística</label>
                 <textarea 
                   name="notes"
                   value={formData.notes}
                   onChange={handleChange}
                   className="w-full h-24 p-4 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none resize-none"
                   placeholder="Ex: Preciso de entrega fracionada mensal; O produto vai para exportação..."
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
              className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg shadow-lg hover:bg-amber-400 transition-all flex items-center group"
            >
              Continuar <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg shadow-lg hover:bg-slate-800 transition-all flex items-center hover:scale-105 transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Cotar Projeto Box Build'} 
              {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2" />}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
