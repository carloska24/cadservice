'use client';

import { ShieldCheck } from 'lucide-react';
import { SmtFormData } from '../types';

interface ScopeStepProps {
  formData: SmtFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export function ScopeStep({ formData, onChange }: ScopeStepProps) {
  return (
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
              onChange={onChange} 
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
              onChange={onChange} 
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
              onChange={onChange} 
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
              onChange={onChange} 
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
  );
}
