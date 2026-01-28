'use client';

import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, UploadCloud } from 'lucide-react';

interface NpiWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NpiWizardModal({ isOpen, onClose }: NpiWizardModalProps) {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header / Progress */}
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Iniciar Novo Projeto Industrial</h2>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className={`font-medium ${step >= 1 ? 'text-primary' : 'text-slate-400'}`}>1. Identificação</span>
              <span className="text-slate-300">/</span>
              <span className={`font-medium ${step >= 2 ? 'text-primary' : 'text-slate-400'}`}>2. Técnico</span>
              <span className="text-slate-300">/</span>
              <span className={`font-medium ${step >= 3 ? 'text-primary' : 'text-slate-400'}`}>3. Volume</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Steps */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Identification */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nome do Projeto / PCBA *</label>
                <input 
                  type="text" 
                  placeholder="Ex: Controlador IoT V2.0" 
                  className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Estágio Atual *</label>
                <div className="space-y-3">
                  {[
                    'Design Conceitual', 
                    'Protótipo Funcional (Bancada)', 
                    'Design Pronto (Files Released)', 
                    'Já em Produção (Transferência)'
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-primary/50 transition-all">
                      <input type="radio" name="stage" className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Data Alvo para Lote Piloto</label>
                <input type="date" className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-slate-600" />
              </div>
            </div>
          )}

          {/* STEP 2: Technical */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Arquivos de Design Disponíveis *</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Schematics (.pdf)',
                    'Gerber Files (RS-274X)',
                    'BOM (Excel/CSV)',
                    'Pick & Place (.xy)',
                    '3D Model (.step)',
                    'Firmware (.hex/.bin)'
                  ].map((file) => (
                    <label key={file} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                      <input type="checkbox" className="w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary" />
                      <span className="text-slate-700 text-sm">{file}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Estratégia de Teste *</label>
                <div className="space-y-3">
                   <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                      <input type="radio" name="test" className="w-4 h-4 mt-1 text-primary border-slate-300 focus:ring-primary" />
                      <div className="text-sm">
                        <span className="font-semibold text-slate-900 block">Apenas Inspeção Visual (AOI)</span>
                        <span className="text-slate-500">Padrão para protótipos simples.</span>
                      </div>
                   </label>
                   <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                      <input type="radio" name="test" className="w-4 h-4 mt-1 text-primary border-slate-300 focus:ring-primary" />
                      <div className="text-sm">
                        <span className="font-semibold text-slate-900 block">Teste Funcional (FCT) - Cliente fornece</span>
                        <span className="text-slate-500">Você envia a jiga pronta e o procedimento.</span>
                      </div>
                   </label>
                   <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                      <input type="radio" name="test" className="w-4 h-4 mt-1 text-primary border-slate-300 focus:ring-primary" />
                      <div className="text-sm">
                        <span className="font-semibold text-slate-900 block">Teste Funcional (FCT) - CADService desenvolve</span>
                        <span className="text-slate-500">Nossa engenharia cria a jiga e o software.</span>
                      </div>
                   </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Volume & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2">Volume Estimado (p/ ano) *</label>
                   <select className="w-full h-12 px-4 rounded-lg border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-700">
                     <option>Selecione...</option>
                     <option>100 - 1.000 (Lote Piloto)</option>
                     <option>1.000 - 5.000 (Baixo Volume)</option>
                     <option>5.000 - 50.000 (Médio Volume)</option>
                     <option>50.000+ (High Volume)</option>
                   </select>
                </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2">Lote Piloto Desejado</label>
                   <input type="text" placeholder="Ex: 50 unidades" className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-primary outline-none" />
                </div>
              </div>

               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Seu E-mail Corporativo *</label>
                <input 
                  type="email" 
                  placeholder="nome@empresa.com" 
                  className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Observações / Desafios Específicos</label>
                <textarea 
                  className="w-full h-24 p-4 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  placeholder="Ex: Componente U12 crítico, tolerância fina no conector J1..."
                ></textarea>
              </div>

            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center">
          {step > 1 ? (
             <button 
               onClick={() => setStep(step - 1)}
               className="flex items-center text-slate-600 font-medium hover:text-slate-900 transition-colors"
             >
               <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
             </button>
          ) : (
            <div></div> // Spacer
          )}

          {step < 3 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center"
            >
              Continuar <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all flex items-center hover:scale-105 transform duration-200"
            >
              Enviar Pacote DFM <UploadCloud className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
