'use client';

import { Package } from 'lucide-react';
import { SmtFormData } from '../types';

interface SupplyChainStepProps {
  formData: SmtFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setRadio: (name: string, value: string) => void;
}

export function SupplyChainStep({ formData, onChange, setRadio }: SupplyChainStepProps) {
  return (
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
            onChange={onChange}
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
            onChange={onChange}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5 cursor-pointer"
          />
          <div>
            <span className="block font-medium text-slate-900">Armazenar excedente para próximos lotes</span>
            <span className="text-sm text-slate-500">Estoque seguro para reposição rápida</span>
          </div>
        </label>
      </div>
    </div>
  );
}
