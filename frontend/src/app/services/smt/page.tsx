
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Cpu, 
  ScanEye, 
  Zap, 
  Layers, 
  CheckCircle,
  Settings,
  ArrowRight, 
  FileCode,
  Box
} from 'lucide-react';
import { useState } from 'react';
import { SmtBudgetModal } from '@/components/smt/SmtBudgetModal';

export default function SmtPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      <SmtBudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-800/50 z-0"></div>
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-sm text-blue-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> PCB Assembly
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Montagem SMT de <br /> Alta Precisão
              </h1>
              <p className="text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
                Do protótipo à escala industrial. Linhas automatizadas configuradas para 
                High-Mix/Low-Volume e produção seriada com rastreabilidade total.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-base font-bold text-white shadow-lg hover:bg-blue-500 transition-all hover:-translate-y-px"
                >
                  Cotar Lista BOM
                </button>
                <Link 
                  href="#process" 
                  className="inline-flex h-12 items-center justify-center rounded-md border border-slate-600 bg-slate-800/50 px-8 text-base font-medium text-white hover:bg-slate-800 transition-colors"
                >
                  Entenda o Processo
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl grid grid-cols-2 gap-8">
               <div className="space-y-1">
                 <div className="text-3xl font-bold text-white">150k</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">CPH Speed</div>
               </div>
               <div className="space-y-1">
                 <div className="text-3xl font-bold text-white">01005</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Min Component</div>
               </div>
               <div className="space-y-1">
                 <div className="text-3xl font-bold text-green-400">100%</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">3D SPI & AOI</div>
               </div>
                <div className="space-y-1">
                 <div className="text-3xl font-bold text-white">N₂</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Reflow Nitrogen</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROCESS FLOW (NEW: BENTO GRID) */}
      <section id="process" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">O Processo Simplificado</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Entenda exatamente o que precisamos de você e o que vamos entregar.
              Transparência total para sua engenharia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
            {/* Arrow Connector (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 p-2 rounded-full shadow-sm text-slate-400">
               <ArrowRight className="w-6 h-6" />
            </div>

            {/* INPUT CARD */}
            <div className="group relative bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                 {/* PLACEHOLDER IMAGE: SMT INPUT */}
                 <Image 
                   src="/smt_input_placeholder_1769573755159.png" // Replace with generated image path
                   alt="Input Data Requirements"
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
                  <FileCode className="w-5 h-5 text-blue-600" /> Pacote Técnico
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">Gerber Files (RS-274X):</strong> O desenho da placa, camadas de cobre, solda e legenda.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">BOM (Bill of Materials):</strong> Planilha com Part Numbers (Digikey/Mouser) e designadores.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div>
                      <strong className="text-slate-900">Pick & Place (XY):</strong> Coordenadas de centro e rotação de cada componente.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* OUTPUT CARD */}
            <div className="group relative bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                 {/* PLACEHOLDER IMAGE: SMT OUTPUT */}
                 <Image 
                   src="/smt_output_placeholder_1769573771475.png" // Replace with generated image path
                   alt="Finished PCBA Output"
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
                  <Box className="w-5 h-5 text-green-600" /> Produto Validado
                </h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">PCBA Montada:</strong> Padrão IPC-A-610 Class 2 (Standard) ou Class 3 (Alta Confiabilidade).
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Relatório de Qualidade:</strong> Inspeção 3D SPI (Pasta), AOI (Componentes) e Raio-X (BGAs).
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900">Gestão de Sobras:</strong> Devolução organizada de componentes não utilizados (Cut-tape/Reels).
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CAPACIDADE TÉCNICA (Specs Table) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Especificações Técnicas</h2>
              <p className="text-slate-600 text-lg mb-6">
                Nosso parque de máquinas é padronizado para garantir repetibilidade. 
                Processamos desde placas rígidas até flex-rigid complexas.
              </p>
              <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ScanEye className="w-5 h-5 text-primary" /> Inspeção Padrão
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Stencil Printing Inspection (SPI 3D)</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Automated Optical Inspection (AOI 3D)</li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> X-Ray para BGA/QFN (Amostragem)</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                  <tbody className="bg-white divide-y divide-slate-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 bg-slate-50 w-1/3">Component Range</td>
                      <td className="px-6 py-4 text-sm text-slate-600">01005 (Imperial) até conectores de 150mm</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 bg-slate-50">IC Packages</td>
                      <td className="px-6 py-4 text-sm text-slate-600">BGA, uBGA (0.3mm pitch), QFN, CSP, PoP, LGA</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 bg-slate-50">Max PCB Size</td>
                      <td className="px-6 py-4 text-sm text-slate-600">510mm x 460mm (L)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 bg-slate-50">PCB Thickness</td>
                      <td className="px-6 py-4 text-sm text-slate-600">0.4mm a 4.0mm (Suporte a Heavy Copper)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 bg-slate-50">Accuracy</td>
                      <td className="px-6 py-4 text-sm text-slate-600">Chips: ±0.035mm / QFP: ±0.025mm (Cpk ≥ 1.33)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EQUIPAMENTOS (Tech Stack Cards) */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tecnologia Embarcada</h2>
            <p className="text-slate-600">Equipamentos Tier-1 para garantir confiabilidade.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Screen Printer</h3>
              <p className="text-sm font-semibold text-slate-800 mb-2">DEK / GKG</p>
              <p className="text-sm text-slate-500">Alinhamento ótico automático e limpeza de estêncil a vácuo. Inspeção 2D de pasta integrada.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pick & Place</h3>
              <p className="text-sm font-semibold text-slate-800 mb-2">Fuji NPM / ASM</p>
              <p className="text-sm text-slate-500">Cabeçotes modulares de alta velocidade. Verificação elétrica de componentes (LCR Check) on-the-fly.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reflow Oven</h3>
              <p className="text-sm font-semibold text-slate-800 mb-2">Heller 10 Zonas</p>
              <p className="text-sm text-slate-500">Controle preciso de perfil térmico (Ramp-Soak-Spike). Opção de atmosfera inerte (Nitrogênio).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA FOOTER */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Pronto para montar sua placa?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Envie seus arquivos Gerber e BOM. Retornamos com DFM preliminar e orçamento detalhado.
          </p>
          <Link 
            href="/budget?service=smt" 
            className="inline-flex h-14 items-center justify-center rounded-md bg-blue-600 px-8 text-base font-bold text-white shadow hover:bg-blue-500 transition-all hover:-translate-y-1"
          >
            Fazer Orçamento
          </Link>
        </div>
      </section>

    </div>
  );
}
