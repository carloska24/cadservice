'use client';

import { ShieldCheck, Layers } from 'lucide-react';
import { SmtFormData } from '../types';

interface TechSpecsStepProps {
  formData: SmtFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setRadio: (name: string, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<SmtFormData>>;
}

export function TechSpecsStep({ formData, onChange, setRadio, setFormData }: TechSpecsStepProps) {
  return (
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
          <label htmlFor="boardWidth" className="block text-sm font-medium text-slate-700 mb-2">
            Dimensões da Placa (mm)
          </label>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              id="boardWidth"
              name="boardWidth"
              placeholder="Largura"
              value={formData.boardWidth} 
              onChange={onChange}
              className="w-full h-11 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
            <span className="text-slate-400 font-bold">×</span>
            <input 
              type="number" 
              name="boardHeight"
              placeholder="Altura"
              value={formData.boardHeight} 
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={(e) => setFormData((prev: any) => ({ ...prev, quantity: parseInt(e.target.value) || 50 }))}
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
          onChange={(e) => setFormData((prev: any) => ({ ...prev, quantity: parseInt(e.target.value) }))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          aria-label="Quantidade de placas"
        />
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>50 (Lote Piloto)</span>
          <span>10.000+ (Produção)</span>
        </div>
      </div>

      {/* PCB Material & Surface Finish */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pcbMaterial" className="block text-sm font-medium text-slate-700 mb-2">
            Material do PCB
          </label>
          <select 
            id="pcbMaterial"
            name="pcbMaterial"
            value={formData.pcbMaterial}
            onChange={onChange}
            className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
          >
            <option value="fr4">FR-4 Standard</option>
            <option value="rogers">Rogers (RF/High-Freq)</option>
            <option value="flex">Flex / Rigid-Flex</option>
            <option value="aluminum">Aluminum Base (LED)</option>
            <option value="ceramic">Cerâmico (High-Temp)</option>
          </select>
        </div>

        <div>
          <label htmlFor="surfaceFinish" className="block text-sm font-medium text-slate-700 mb-2">
            Acabamento Superficial
          </label>
          <select 
            id="surfaceFinish"
            name="surfaceFinish"
            value={formData.surfaceFinish}
            onChange={onChange}
            className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
          >
            <option value="hasl">HASL Lead-Free</option>
            <option value="enig">ENIG (Ouro)</option>
            <option value="osp">OSP</option>
            <option value="immersion_silver">Immersion Silver</option>
            <option value="immersion_tin">Immersion Tin</option>
          </select>
        </div>
      </div>

      {/* Board Thickness & Lead Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="boardThickness" className="block text-sm font-medium text-slate-700 mb-2">
            Espessura da Placa
          </label>
          <select 
            id="boardThickness"
            name="boardThickness"
            value={formData.boardThickness}
            onChange={onChange}
            className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
          >
            <option value="0.8">0.8mm</option>
            <option value="1.0">1.0mm</option>
            <option value="1.2">1.2mm</option>
            <option value="1.6">1.6mm (Standard)</option>
            <option value="2.0">2.0mm</option>
            <option value="2.4">2.4mm</option>
          </select>
        </div>

        <div>
          <label htmlFor="leadTime" className="block text-sm font-medium text-slate-700 mb-2">
            Lead Time Desejado
          </label>
          <select 
            id="leadTime"
            name="leadTime"
            value={formData.leadTime}
            onChange={onChange}
            className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
          >
            <option value="standard">Standard (15-20 dias úteis)</option>
            <option value="express">Express (7-10 dias úteis)</option>
            <option value="urgent">Urgente (3-5 dias úteis)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
