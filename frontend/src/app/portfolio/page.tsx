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
  Zap,
  Car,
  HeartPulse,
  Cog,
  Leaf,
  ChevronRight,
  Award,
  Target,
  TrendingUp
} from 'lucide-react';

// Dados dos setores
const SECTORS = [
  {
    id: 'automotive',
    name: 'Automotivo',
    icon: Car,
    certifications: ['IATF 16949', '-40°C a +85°C'],
    color: 'blue',
    caseCount: 2
  },
  {
    id: 'medical',
    name: 'Médico / Saúde',
    icon: HeartPulse,
    certifications: ['ISO 13485', 'IPC Class 3'],
    color: 'green',
    caseCount: 1
  },
  {
    id: 'industrial',
    name: 'Industrial',
    icon: Cog,
    certifications: ['High Voltage', 'Heavy Copper'],
    color: 'amber',
    caseCount: 1
  },
  {
    id: 'agro',
    name: 'Agronegócio',
    icon: Leaf,
    certifications: ['Ruggedized', 'LoRaWAN'],
    color: 'emerald',
    caseCount: 1
  }
];

const CASE_STUDIES = [
  {
    id: 'medical',
    sectorId: 'medical',
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
    sectorId: 'automotive',
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
    id: 'automotive-2',
    sectorId: 'automotive',
    category: 'AUTOMOTIVO',
    title: 'Módulo de Iluminação LED',
    tags: ['IATF 16949', 'Thermal Management'],
    icon: Cpu,
    problem: [
      'Dissipação térmica crítica em LEDs de alta potência.',
      'Exigência de vida útil > 50.000 horas.'
    ],
    process: [
      'PCB Metal Core (MCPCB) com condutividade otimizada.',
      'Solda SAC305 com perfil otimizado para LEDs.'
    ],
    resultLabel: 'Temperatura de Junção',
    resultValue: '-15°C vs. spec',
    imageOverlay: 'THERMAL OK',
    imageIcon: Cpu
  },
  {
    id: 'industrial',
    sectorId: 'industrial',
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
    sectorId: 'agro',
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
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const filteredCases = selectedSector 
    ? CASE_STUDIES.filter(c => c.sectorId === selectedSector)
    : CASE_STUDIES;

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', hover: 'hover:border-blue-400' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', hover: 'hover:border-green-400' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', hover: 'hover:border-amber-400' },
      emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', hover: 'hover:border-emerald-400' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* 1. HERO - PREMIUM STYLE */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-20 lg:py-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Portfólio</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Engenharia de Manufatura
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                que Gera Resultados
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-12">
              Cases reais com métricas de sucesso em indústrias de alta exigência.
              Não mostramos apenas fotos — mostramos o processo de validação.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Projetos Críticos</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">99.98%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">FPY Médio</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">0 PPM</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Defeito em Campo</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <Factory className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">4</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Setores Industriais</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SETORES - GRID CARDS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Setores Atendidos</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Clique em um setor para filtrar nossos cases de sucesso
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {SECTORS.map((sector) => {
              const colorClasses = getColorClasses(sector.color);
              const isSelected = selectedSector === sector.id;
              const Icon = sector.icon;
              
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSector(isSelected ? null : sector.id)}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all duration-300 text-left group
                    ${isSelected 
                      ? `${colorClasses.bg} ${colorClasses.border} ring-2 ring-offset-2 ring-${sector.color}-400` 
                      : `bg-white border-slate-200 ${colorClasses.hover} hover:shadow-lg`
                    }
                  `}
                >
                  <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{sector.name}</h3>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {sector.certifications.map((cert, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                        {cert}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-slate-500">
                    {sector.caseCount} {sector.caseCount === 1 ? 'case' : 'cases'} disponível
                  </p>

                  {isSelected && (
                    <div className={`absolute top-3 right-3 w-6 h-6 ${colorClasses.bg} ${colorClasses.text} rounded-full flex items-center justify-center`}>
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedSector && (
            <div className="text-center">
              <button 
                onClick={() => setSelectedSector(null)}
                className="text-sm text-slate-500 hover:text-slate-700 underline"
              >
                Limpar filtro e ver todos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. CASE STUDIES */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
          
          {filteredCases.length > 0 ? (
            filteredCases.map((study, index) => (
              <div 
                key={study.id} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* IMG ZONE */}
                  <div className="lg:col-span-2 bg-slate-100 relative min-h-[300px] lg:min-h-full flex items-center justify-center p-8 group">
                    <div className="w-full h-full bg-white rounded-xl shadow-inner flex items-center justify-center border border-slate-200 group-hover:scale-105 transition-transform duration-500">
                      <study.imageIcon className="w-20 h-20 text-slate-300" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md border-l-4 border-blue-500">
                      {study.imageOverlay}
                    </div>
                  </div>

                  {/* CONTENT ZONE */}
                  <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded">
                        {study.category}
                      </span>
                      {study.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">{study.title}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Desafio */}
                      <div className="bg-red-50/50 border border-red-100 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <X className="w-4 h-4" /> Desafio Técnico
                        </h4>
                        <ul className="text-sm text-slate-600 space-y-2">
                          {study.problem.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-red-400 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solução */}
                      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Microscope className="w-4 h-4" /> Solução de Engenharia
                        </h4>
                        <ul className="text-sm text-slate-600 space-y-2">
                          {study.process.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Resultado */}
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl">
                      <div>
                        <p className="text-xs font-bold text-green-800 uppercase tracking-wider">{study.resultLabel}</p>
                        <p className="text-2xl font-bold text-green-700">{study.resultValue}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border-2 border-slate-200 border-dashed">
              <Factory className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-600">Em Breve</h3>
              <p className="text-slate-500">Estamos documentando nossos cases para este setor.</p>
            </div>
          )}

        </div>
      </section>

      {/* 4. DFM VALIDATION TABLE */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Caso Real: Otimização NPI</h2>
            <p className="text-slate-600">Comparativo técnico entre o design original recebido e a versão otimizada pela CADService.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
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

      {/* 5. CTA FINAL */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Pare de perder dinheiro na montagem.</h2>
          <p className="text-slate-400 mb-8">
            Solicite uma análise gratuita do seu projeto e descubra oportunidades de otimização.
          </p>
          <Link 
            href="/contacts" 
            className="inline-flex h-14 items-center justify-center rounded-lg bg-blue-600 px-10 text-lg font-bold shadow-xl hover:bg-blue-500 transition-all hover:-translate-y-1"
          >
            Solicitar Análise de DFM Gratuita
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
}
