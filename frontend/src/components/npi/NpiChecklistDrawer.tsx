'use client';

import { X, CheckSquare, FileCheck, Info } from 'lucide-react';

interface NpiChecklistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export function NpiChecklistDrawer({ isOpen, onClose, onStartProject }: NpiChecklistDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
           isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
           isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs mb-2">
                <CheckSquare className="w-4 h-4" /> Prontidão Industrial
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Checklist de Manufatura</h2>
              <p className="text-slate-500 text-sm mt-1">O que seu projeto precisa para entrar em linha.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Section 1 */}
            <section>
              <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">1</span>
                Documentação de Design
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Gerber Files (RS-274X)", desc: "Todas as camadas de cobre, máscara de solda, legenda e furação." },
                  { label: "Arquivo de Furação (NC Drill)", desc: "Dados EXCELLON com tabela de ferramentas." },
                  { label: "Pick & Place Data", desc: "Arquivo Centroid (X, Y, Rotação, Lado) para montagem SMT." }
                ].map((item, idx) => (
                   <li key={idx} className="flex gap-3">
                     <div className="mt-0.5 min-w-[20px]">
                       <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                     </div>
                     <div>
                       <span className="font-semibold text-slate-800 block">{item.label}</span>
                       <span className="text-sm text-slate-500">{item.desc}</span>
                     </div>
                   </li>
                ))}
              </ul>
            </section>

             {/* Section 2 */}
            <section>
              <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">2</span>
                Lista de Materiais (BOM)
              </h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex gap-3">
                 <Info className="w-5 h-5 text-amber-600 shrink-0" />
                 <p className="text-xs text-amber-800">
                   <strong>Dica Industrial:</strong> Evite descrições genéricas como "Cap 100nF". Use sempre o Part Number do Fabricante (MPN).
                 </p>
              </div>
              <ul className="space-y-4">
                {[
                  { label: "Manufacturer Part Number (MPN)", desc: "Código único do fabricante para cada linha." },
                  { label: "Designators (RefDes)", desc: "R1, C1, U1 batendo exatamente com o Gerber." },
                  { label: "Indicadores DNP", desc: "Clara identificação de componentes &apos;Do Not Populate&apos;." }
                ].map((item, idx) => (
                   <li key={idx} className="flex gap-3">
                     <div className="mt-0.5 min-w-[20px]">
                       <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                     </div>
                     <div>
                       <span className="font-semibold text-slate-800 block">{item.label}</span>
                       <span className="text-sm text-slate-500">{item.desc}</span>
                     </div>
                   </li>
                ))}
              </ul>
            </section>

             {/* Section 3 */}
            <section>
              <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">3</span>
                Processo & Rastreabilidade
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Acabamento PCB", desc: "ENIG (Ouro), HASL (Estanho) ou OSP definidos." },
                  { label: "Fiducias no Painel", desc: "Marcas de registro para alinhamento de máquinas SMT." },
                  { label: "Plano de Teste", desc: "Procedimento passo-a-passo para validação funcional." }
                ].map((item, idx) => (
                   <li key={idx} className="flex gap-3">
                     <div className="mt-0.5 min-w-[20px]">
                       <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                     </div>
                     <div>
                       <span className="font-semibold text-slate-800 block">{item.label}</span>
                       <span className="text-sm text-slate-500">{item.desc}</span>
                     </div>
                   </li>
                ))}
              </ul>
            </section>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <h4 className="font-bold text-slate-900 mb-2">Seu projeto está pronto?</h4>
            <div className="flex gap-3">
               <button 
                 onClick={onClose}
                 className="flex-1 py-3 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-white hover:text-slate-900 transition-colors"
               >
                 Ainda não
               </button>
               <button 
                 onClick={() => { onClose(); onStartProject(); }}
                 className="flex-1 py-3 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
               >
                 <FileCheck className="w-4 h-4" /> Sim, Iniciar
               </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
