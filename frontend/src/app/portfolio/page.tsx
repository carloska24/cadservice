
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  X, 
  ArrowRight, 
  Activity, 
  Cpu, 
  Microscope,
  FileCheck,
  Sprout,
  Factory,
  Zap
} from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 'medical',
    category: 'MÉDICO / IoT',
    title: 'Monitor de Sinais Vitais (IoT)',
    tags: ['IPC Class 3', 'BGA 0.4mm'],
    icon: Activity,
    problem: [
      'Componentes 01005 inviáveis para montagem manual.',
      'Lotes reprovados por Voids em BGA > 15%.'
    ],
    process: [
      'Desenvolvimento de Stencil Eletroformado (Nano-coating).',
      'Perfil de Reflow com Soak estendido de 90s.'
    ],
    resultLabel: 'First Pass Yield (FPY)',
    resultValue: '99.98%',
    imageOverlay: 'VOID < 2%',
    imageIcon: Activity
  },
  {
    id: 'automotive',
    category: 'AUTOMOTIVO',
    title: 'ECU de Controle de Tração',
    tags: ['IATF 16949', 'High Vibration'],
    icon: Cpu,
    problem: [
      'Vibração extrema acoplada ao chassi do veículo.',
      'Ciclo térmico hostil de -40ºC a +85ºC.'
    ],
    process: [
      'Aplicação automatizada de Underfill no processador.',
      'Conformal Coating UV seletivo (Áreas críticas).'
    ],
    resultLabel: 'Defeito em Campo (2 Anos)',
    resultValue: '0 PPM',
    imageOverlay: 'IP67 SEALED',
        imageIcon: Cpu
      },
      {
        id: 'industrial',
        category: 'INDUSTRIAL',
        title: 'Inversor de Frequência (High Power)',
        tags: ['High Voltage', 'Heavy Copper'],
        icon: Zap,
        problem: [
          'Dissipação térmica crítica em MOSFETs de potência.',
          'Trilhas de alta corrente (> 30A) com risco de rompimento.'
        ],
        process: [
          'PCB com 3oz de Cobre (Heavy Copper) para condutividade.',
          'Solda Seletiva Automatizada nos conectores de potência.'
        ],
        resultLabel: 'Teste de Burn-in (Carga Max)',
        resultValue: '100% Aprovado',
        imageOverlay: 'HV TESTED',
        imageIcon: Zap
      },
      {
        id: 'agro',
    category: 'AGRO',
    title: 'Controlador de Pivô Central 4.0',
    tags: ['Ruggedized', 'Long Range'],
    icon: Sprout,
    problem: [
      'Alta umidade e corrosão em ambiente externo.',
      'Interferência RF em campo aberto.'
    ],
    process: [
      'Verniz Tropicalizado (Thick) com cura UV.',
      'Blindagem EMI/RFI Customizada.'
    ],
    resultLabel: 'MTBF (Tempo entre falhas)',
    resultValue: '> 50k h',
    imageOverlay: 'LORAWAN',
    imageIcon: Sprout
  }
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('AUTOMOTIVO');

  const filteredCases = CASE_STUDIES.filter(c => c.category === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* 1. HERO - THE HOOK */}
      <section className="bg-slate-900 border-b border-slate-800 pt-24 pb-0">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Engenharia que Reduz Riscos
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Não mostramos apenas fotos. Mostramos o processo de validação 
            que garante <span className="text-white font-bold">99.98% de yield</span> em produtos críticos.
          </p>

          {/* COMPONENT: TAB_BAR_NAVIGATION - UNDERLINE STYLE */}
          <div className="flex justify-center w-full">
            <div className="flex items-center gap-8 md:gap-12 border-b border-white/5 w-full justify-center px-4">
              {[
                'AUTOMOTIVO',
                'MÉDICO / IoT',
                'INDUSTRIAL',
                'AGRO'
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    pb-4 text-sm font-bold tracking-wider uppercase transition-all duration-300 border-b-2
                    ${activeTab === tab
                      ? 'text-blue-400 border-blue-500' // Active State
                      : 'text-slate-400 border-transparent hover:text-white hover:border-slate-700' // Inactive State
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CASE STUDY MATRIX (The Evidence) */}
      <section className="py-24 bg-white border-b border-slate-200 min-h-[600px]">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-6xl space-y-24">
          
          {filteredCases.length > 0 ? (
            filteredCases.map((study, index) => (
              <div 
                key={study.id} 
                className="grid lg:grid-cols-2 gap-0 border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* ALTERNATING LAYOUT LOGIC */}
                {index % 2 === 0 ? (
                  <>
                    {/* IMG ZONE (Left) */}
                    <div className="bg-slate-100 relative h-96 lg:h-auto flex items-center justify-center p-12 group">
                      <div className="w-full h-full bg-white rounded shadow-inner flex items-center justify-center border border-slate-200 group-hover:scale-105 transition-transform duration-500">
                        <study.imageIcon className="w-24 h-24 text-slate-300" />
                      </div>
                      <div className="absolute bottom-6 left-6 bg-slate-900/90 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-md border-l-4 border-blue-500">
                        {study.imageOverlay}
                      </div>
                    </div>

                    {/* CONTENT ZONE (Right) */}
                    <div className="p-10 lg:p-12 flex flex-col justify-center bg-white">
                      <div className="flex gap-2 mb-6">
                        {study.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded border border-slate-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-8">{study.title}</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <X className="w-4 h-4" /> DESAFIO TÉCNICO
                          </h4>
                          <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                            {study.problem.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Microscope className="w-4 h-4" /> SOLUÇÃO DE ENGENHARIA
                          </h4>
                          <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                            {study.process.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-lg">
                            <div>
                              <p className="text-xs font-bold text-green-800 uppercase">{study.resultLabel}</p>
                              <p className="text-2xl font-bold text-green-700">{study.resultValue}</p>
                            </div>
                            <FileCheck className="w-8 h-8 text-green-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* CONTENT ZONE (Left) */}
                    <div className="p-10 lg:p-12 flex flex-col justify-center bg-white order-2 lg:order-1">
                      <div className="flex gap-2 mb-6">
                        {study.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded border border-slate-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-8">{study.title}</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <X className="w-4 h-4" /> DESAFIO TÉCNICO
                          </h4>
                          <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                            {study.problem.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Microscope className="w-4 h-4" /> SOLUÇÃO DE ENGENHARIA
                          </h4>
                          <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                            {study.process.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-lg">
                            <div>
                              <p className="text-xs font-bold text-green-800 uppercase">{study.resultLabel}</p>
                              <p className="text-2xl font-bold text-green-700">{study.resultValue}</p>
                            </div>
                            <FileCheck className="w-8 h-8 text-green-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* IMG ZONE (Right) */}
                    <div className="bg-slate-100 relative h-96 lg:h-auto flex items-center justify-center p-12 order-1 lg:order-2 group">
                      <div className="w-full h-full bg-white rounded shadow-inner flex items-center justify-center border border-slate-200 group-hover:scale-105 transition-transform duration-500">
                        <study.imageIcon className="w-24 h-24 text-slate-300" />
                      </div>
                      <div className="absolute bottom-6 right-6 bg-slate-900/90 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-md border-r-4 border-blue-500">
                        {study.imageOverlay}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-slate-200 border-dashed">
              <Factory className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-600">Em Breve</h3>
              <p className="text-slate-500">Estamos documentando nossos cases para {activeTab}.</p>
            </div>
          )}

        </div>
      </section>

      {/* 3. DFM VALIDATION (Table Comparison) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Caso Real: Otimização NPI</h2>
            <p className="text-slate-600">Comparativo técnico entre o design original recebido e a versão otimizada pela CADService.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 divide-x divide-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
              <div className="p-4">Parâmetro</div>
              <div className="p-4 bg-red-50 text-red-700">Design Original (Cliente)</div>
              <div className="p-4 bg-green-50 text-green-700">Otimização (CADService)</div>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="grid grid-cols-3 divide-x divide-slate-100">
                <div className="p-4 font-semibold text-slate-700">Lados de Montagem</div>
                <div className="p-4 text-red-600 flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0" /> Double-Sided (2x Reflow)
                </div>
                <div className="p-4 text-green-700 font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" /> Single-Sided (1x Reflow)
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-100">
                <div className="p-4 font-semibold text-slate-700">Conectores</div>
                <div className="p-4 text-red-600 flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0" /> THT Manual (Solda Onda)
                </div>
                <div className="p-4 text-green-700 font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" /> SMT Automático (Pick & Place)
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-100">
                <div className="p-4 font-semibold text-slate-700">Contagem de Peças</div>
                <div className="p-4 text-red-600 flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0" /> 120 Componentes
                </div>
                <div className="p-4 text-green-700 font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" /> 85 Componentes (Consolidado)
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50/50">
                <div className="p-4 font-bold text-slate-900 border-l-4 border-transparent">IMPACTO FINAL</div>
                <div className="p-4 text-slate-500">
                  Leadtime de 40 dias
                </div>
                <div className="p-4 text-green-800 font-bold border-l-4 border-green-500 flex items-center gap-2 bg-green-50/30">
                  <ArrowRight className="w-4 h-4" /> Economia de 20% no Custo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA TÉCNICO */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Pare de perder dinheiro na montagem.</h2>
          <Link 
            href="/contacts" 
            className="inline-flex h-14 items-center justify-center rounded-md bg-blue-600 px-10 text-lg font-bold shadow-xl hover:bg-blue-500 transition-all"
          >
            Solicitar Análise de DFM Gratuita
          </Link>
        </div>
      </section>

    </div>
  );
}
