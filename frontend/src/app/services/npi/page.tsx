
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  FileCode, 
  FlaskConical, 
  TrendingDown, 
  ShieldAlert, 
  ArrowRight,
  CheckCircle,
  Settings,
  Database, 
  Briefcase
} from 'lucide-react';
import { NpiWizardModal } from '@/components/npi/NpiWizardModal';
import { NpiChecklistDrawer } from '@/components/npi/NpiChecklistDrawer';

export default function NpiPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      <NpiWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
      <NpiChecklistDrawer 
        isOpen={isChecklistOpen} 
        onClose={() => setIsChecklistOpen(false)} 
        onStartProject={() => setIsWizardOpen(true)}
      />

      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-800/50 z-0"></div>
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl relative z-10">
          <div className="inline-flex items-center gap-2 text-sm text-blue-400 font-medium uppercase tracking-wide mb-6">
            <Settings className="w-4 h-4" />
            <span>Industrialização / NPI</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
            Industrialização de <br/> Produtos Eletrônicos
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
            A ponte segura entre seu protótipo de bancada e a produção em massa.
            Elimine riscos de manufatura antes de gastar em tooling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-bold text-white shadow hover:bg-primary/90 transition-all hover:-translate-y-px"
            >
              Iniciar Projeto NPI
            </button>
             <button 
              onClick={() => setIsChecklistOpen(true)} 
              className="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-slate-800/50 px-8 text-base font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Ver Checklist
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE FLOW: PRODUCTION READY (BENTO GRID) */}
      <section id="process" className="py-24 bg-white">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Entrada & Saída</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nossa engenharia transforma "funciona na bancada" em "pronto para fábrica".
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
             {/* Arrow Connector */}
             <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 p-2 rounded-full shadow-sm text-slate-400">
               <ArrowRight className="w-6 h-6" />
            </div>

            {/* INPUT CARD */}
            <div className="group relative bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                 <Image 
                   src="/npi_input_placeholder_1769573893878.png"
                   alt="Prototype Bench"
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-slate-900/10"></div>
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-white/50">
                   1. VOCÊ ENVIA (INPUT)
                 </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-blue-600" /> Protótipo Funcional
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                   <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">Prova de Conceito (PoC):</strong> Sua placa funcionando na bancada (Arduino/Breadboard é aceitável na fase 1).
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">Arquivos Abertos:</strong> Projetos no Altium/KiCad/Eagle para podermos otimizar o layout.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">Requisitos de Teste:</strong> "O que define que o produto está funcionando?"
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* OUTPUT CARD */}
             <div className="group relative bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                 <Image 
                   src="/npi_output_placeholder_1769573911159.png"
                   alt="Production Ready Docs"
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-slate-900/10"></div>
                 <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                   2. NÓS ENTREGAMOS (OUTPUT)
                 </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-green-600" /> Pacote de Produção (Build Pack)
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                   <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Relatório DfM:</strong> "Mude esse componente de lugar para economizar R$ 2,00 por placa."
                    </div>
                  </li>
                   <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Jiga de Teste:</strong> Equipamento automatizado que testa sua placa em 5 segundos.
                    </div>
                  </li>
                   <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Amostra Padrão (Golden Sample):</strong> A unidade perfeita que será o padrão de qualidade da fábrica.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE GAP (Myers' Rule) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Reduza o Custo do Erro
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                A Regra de Myers diz que o custo de corrigir um defeito multiplica por 10 a cada etapa que avança.
              </p>
              <ul className="space-y-4">
                 <li className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                   <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">1x</div>
                   <div>
                     <strong className="block text-slate-900">Fase de Design</strong>
                     <span className="text-sm text-slate-500">Corrigir no computador (CAD). Custo mínimo.</span>
                   </div>
                 </li>
                 <li className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-200 opacity-70">
                   <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">10x</div>
                   <div>
                     <strong className="block text-slate-900">Fase de Protótipo</strong>
                     <span className="text-sm text-slate-500">Refazer placas físicas. Custo moderado.</span>
                   </div>
                 </li>
                 <li className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-200 opacity-50">
                   <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">100x</div>
                   <div>
                     <strong className="block text-slate-900">Fase de Produção</strong>
                     <span className="text-sm text-slate-500">Parar a linha, recall, sucata. Custo crítico.</span>
                   </div>
                 </li>
              </ul>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 rounded-2xl relative shadow-lg">
              <ShieldAlert className="w-12 h-12 text-primary mb-6" />
              <blockquote className="text-xl font-medium text-slate-800 mb-6">
                &quot;Nossa Engenharia de Front-End blinda seu investimento antes de cortarmos as primeiras PCBs.&quot;
              </blockquote>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-6">
                 <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                   CADService Engineering
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA FINAL */}
      <section className="py-24 bg-white border-t border-slate-200">
         <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-3xl text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">Comece certo, escale rápido.</h2>
           <p className="text-slate-600 text-lg mb-10">
             Envie seu pacote técnico para uma análise preliminar de DfM.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link 
               href="/budget?service=npi" 
               className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-lg font-bold text-white shadow-xl hover:bg-primary/90 transition-all hover:-translate-y-1"
             >
               Solicitar Análise DfM
             </Link>
           </div>
         </div>
      </section>

    </div>
  );
}
