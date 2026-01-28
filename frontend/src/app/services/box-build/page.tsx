
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  Wrench, 
  Truck, 
  CheckSquare, 
  Cpu,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { BoxBuildBudgetModal } from '@/components/box-build/BoxBuildBudgetModal';

export default function BoxBuildPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      <BoxBuildBudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-800/50 z-0"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent skew-x-12"></div>

        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl relative z-10">
          <div className="text-sm text-amber-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <Package className="w-4 h-4" /> System Integration
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Seu Produto Pronto <br/> na Prateleira
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Mais que montar placas. Entregamos a caixa final fechada, testada e com firmware gravado. 
            Operação Turnkey completa para reduzir sua logística.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/10 backdrop-blur">#Turnkey</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/10 backdrop-blur">#DropShipping</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/10 backdrop-blur">#FinalTest</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex h-12 items-center justify-center rounded-md bg-amber-500 px-8 text-base font-bold text-slate-900 shadow-lg hover:bg-amber-400 transition-all hover:-translate-y-px"
            >
              Falar sobre Integração
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE FLOW: DA PLACA À CAIXA (BENTO GRID) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">A Jornada do Box Build</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Transformamos componentes soltos em um SKU de varejo pronto para venda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
             {/* Arrow Connector (Desktop) */}
             <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 p-2 rounded-full shadow-sm text-slate-400">
               <ArrowRight className="w-6 h-6" />
            </div>

            {/* INPUT CARD */}
            <div className="group relative bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                 <Image 
                   src="/box_build_input_placeholder_1769573858025.png"
                   alt="Input Components"
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-slate-900/10"></div>
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 border border-white/50">
                   1. VOCÊ FORNECE (INPUT)
                 </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-600" /> Kit de Integração
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                   <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">PCBA + Cabos:</strong> A eletrônica funcional e chicotes (ou nós montamos).
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">Gabinete Mecânico:</strong> Moldes plásticos, caixas metálicas e parafusos.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">Assets de Software:</strong> Firmware (.bin/.hex) e range de MAC Address/Serial.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* OUTPUT CARD */}
             <div className="group relative bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-56 overflow-hidden relative">
                 <Image 
                   src="/box_build_output_placeholder_1769573875288.png"
                   alt="Finished Retail Box"
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
                  <Package className="w-5 h-5 text-green-600" /> Produto Final (SKU)
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                   <li className="flex gap-3 items-start">
                    <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Unidade Testada:</strong> Teste Funcional (FCT) completo antes de fechar a caixa.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Embalagem Varejo:</strong> Inserção de berços, manuais e acessórios.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckSquare className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Etiquetagem Final:</strong> UID único com código de barras na caixa master.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PROCESS STEPS */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12">
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Cpu className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Sub-Assembly</h3>
              <p className="text-slate-600 text-sm leading-relaxed px-4">
                Pré-montagem de cabos (crimpar/soldar), preparação de displays LCD, colagem de membranas e aplicação de potting.
              </p>
            </div>

             <div className="text-center relative">
               <div className="hidden md:block absolute top-10 -left-1/2 w-full h-px bg-slate-200 -z-10"></div>
              <div className="w-20 h-20 mx-auto bg-amber-100 border border-amber-200 rounded-2xl shadow-sm flex items-center justify-center mb-6 relative z-10">
                <Wrench className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. System Integration</h3>
              <p className="text-slate-600 text-sm leading-relaxed px-4">
                União da PCBA com o gabinete. Parafusamento com controle de torque calibrado, roteamento de cabos e fechamento.
              </p>
            </div>

            <div className="text-center relative">
               <div className="hidden md:block absolute top-10 -left-1/2 w-full h-px bg-slate-200 -z-10"></div>
              <div className="w-20 h-20 mx-auto bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center mb-6 relative z-10">
                <Package className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Packout & Logistics</h3>
              <p className="text-slate-600 text-sm leading-relaxed px-4">
                Embalagem de varejo, inserção de manuais e segurança. Paletização pronta para o Centro de Distribuição.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CTA LOGISTICS */}
      <section className="py-24 bg-blue-900 text-white">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-4xl text-center">
          <Truck className="w-16 h-16 mx-auto mb-6 text-blue-300" />
          <h2 className="text-3xl font-bold mb-4">Do Chão de Fábrica direto para seu Cliente</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Elimine custos de transporte intermediário. Oferecemos serviços de Drop-Shipping e gestão de estoque Kanban.
          </p>
          <Link 
            href="/budget?service=box-build" 
            className="inline-flex h-14 items-center justify-center rounded-md bg-white px-8 text-lg font-bold text-blue-900 shadow-xl hover:bg-blue-50 transition-all hover:-translate-y-1"
          >
           Solicitar Orçamento Turnkey
          </Link>
        </div>
      </section>

    </div>
  );
}
