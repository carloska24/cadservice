'use client';

import { PackageCheck } from 'lucide-react';
import { SmtFormData } from '../types';

interface ContactStepProps {
  formData: SmtFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  errors: Record<string, string>;
}

export function ContactStep({ formData, onChange, errors }: ContactStepProps) {
  return (
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
          onChange={onChange}
          className="w-full h-24 p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
          placeholder="Ex: Componente U5 é sensível a MSL; Painelização deve ser feita por vocês..."
        />
      </div>
    </div>
  );
}
