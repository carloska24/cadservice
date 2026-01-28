'use client';

import { 
  ClipboardCheck, 
  PaintBucket, 
  Cpu, 
  Flame, 
  ScanEye, 
  Component, 
  Waves, 
  Droplets, 
  Zap, 
  Package 
} from 'lucide-react';
import { useState } from 'react';

// Dados das 10 Etapas do Processo EMS
const PROCESS_STEPS = [
  // Linha 1: SMT & Montagem
  {
    id: 1,
    title: "1. Recebimento (IQC)",
    icon: ClipboardCheck,
    description: "Conferência rigorosa de componentes e materiais.",
    details: "Inspeção Quantitativa e Qualitativa (Incoming Quality Control). Verificação de Part Numbers, integridade de embalagens (MSL) e rastreabilidade inicial.",
    standard: "ISO 9001 · IPC-A-610"
  },
  {
    id: 2,
    title: "2. Pasta de Solda",
    icon: PaintBucket,
    description: "Aplicação de solda com precisão micrométrica.",
    details: "Impressão automática com stencils de alta precisão. Inspeção SPI (Solder Paste Inspection) 3D em linha para garantir volume e alinhamento perfeitos.",
    standard: "IPC-7525 · SPI 3D"
  },
  {
    id: 3,
    title: "3. SMT Pick & Place",
    icon: Cpu,
    description: "Montagem robótica de alta velocidade.",
    details: "Posicionamento de componentes (de 01005 a BGAs/FPGAs) com máquinas de alta performance. Capacidade para montagem de alta densidade.",
    standard: "IPC-9850 · 01005 Ready"
  },
  {
    id: 4,
    title: "4. Refusão",
    icon: Flame,
    description: "Soldagem controlada por perfil térmico.",
    details: "Fornos de convecção com múltiplas zonas controladas. Perfil térmico ajustado para cada projeto (Lead-Free ou Leaded) garantindo juntas confiáveis.",
    standard: "IPC-7530 · Lead-Free"
  },
  {
    id: 5,
    title: "5. Inspeção AOI",
    icon: ScanEye,
    description: "Verificação óptica automatizada pós-refusão.",
    details: "Automated Optical Inspection (AOI) detecta defeitos como ausência de componentes, inversão de polaridade, curtos ou solda insuficiente.",
    standard: "IPC-A-610 Class 2/3"
  },
  // Linha 2: THT, Testes & Finalização
  {
    id: 6,
    title: "6. Montagem THT",
    icon: Component,
    description: "Inserção de componentes convencionais.",
    details: "Montagem manual ou semi-automática de componentes Through-Hole (conectores, capacitores eletrolíticos, transformadores) preparada para solda onda.",
    standard: "IPC-A-610 · ESD Safe"
  },
  {
    id: 7,
    title: "7. Solda Onda",
    icon: Waves,
    description: "Soldagem em massa para componentes THT.",
    details: "Processo de solda onda (Wave Soldering) ou solda seletiva para garantir preenchimento total do furo (barrel fill) e resistência mecânica.",
    standard: "IPC-A-610 · RoHS"
  },
  {
    id: 8,
    title: "8. Conformal Coating",
    icon: Droplets,
    description: "Proteção contra ambientes agressivos.",
    details: "Aplicação automatizada de verniz protetor (Conformal Coating) para blindar a placa contra umidade, poeira, produtos químicos e maresia.",
    standard: "IPC-CC-830 · UV Cure"
  },
  {
    id: 9,
    title: "9. Testes & Mecânica",
    icon: Zap,
    description: "Validação funcional e montagem final.",
    details: "Execução de testes ICT (In-Circuit) e FCT (Funcional). Integração mecânica completa (chassis, cablagem, vedação) com precisão industrial.",
    standard: "ICT · FCT · Assembly"
  },
  {
    id: 10,
    title: "10. Embalagem",
    icon: Package,
    description: "Logística segura até o destino.",
    details: "Limpeza PCBA, embalagem antiestática (ESD) customizada, etiquetagem final, inserção de manuais e preparação para expedição.",
    standard: "ESD S20.20 · ISO"
  }
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const activeStepData = PROCESS_STEPS.find(s => s.id === activeStep);

  return (
    <section id="process" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Processo Industrial EMS</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Fluxo completo de manufatura eletrônica, do recebimento à entrega, garantindo qualidade nível IPC-A-610 Class 3.
          </p>
        </div>

        {/* Grid 2x5 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 max-w-7xl mx-auto">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id}
                className="group flex flex-col items-center text-center cursor-pointer"
                onClick={() => setActiveStep(step.id)}
              >
                <div className="relative mb-4 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white border-2 border-primary/10 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all rounded-full flex items-center justify-center shadow-lg relative z-10">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-blue-600 transition-colors" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    {step.id}
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1 group-hover:text-primary transition-colors">
                  {step.title.split('. ')[1]}
                </h4>
                <p className="text-xs text-slate-500 hidden md:block">
                   Clique para detalhes
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Backdrop & Content */}
      {activeStep !== null && activeStepData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveStep(null)}
          ></div>
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-primary/5 p-6 border-b border-primary/10 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <activeStepData.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-xs font-bold text-primary uppercase user-select-none mb-1">
                  Etapa {activeStepData.id} de {PROCESS_STEPS.length}
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {activeStepData.title.split('. ')[1]}
                </h3>
              </div>
              <button 
                onClick={() => setActiveStep(null)}
                className="ml-auto p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Descrição Técnica
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {activeStepData.details}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">Qualidade Standard</span>
                <span className="text-sm font-bold text-slate-900">{activeStepData.standard}</span>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStep(prev => prev && prev > 1 ? prev - 1 : 10);
                }}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors flex items-center gap-2"
              >
                ← Anterior
              </button>
              <button 
                 onClick={(e) => {
                  e.stopPropagation();
                  setActiveStep(prev => prev && prev < 10 ? prev + 1 : 1);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                Próximo →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
