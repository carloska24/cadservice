
import Link from 'next/link';
import { 
  Cpu, 
  Component, 
  Package, 
  FileText, // Draft/Industrialization
  ClipboardList, // List/Materials
  ShieldCheck, // Shield/Quality
  ChevronRight, 
  ArrowRight,
  Search, // Analysis
  FlaskConical, // Pilot
  Rocket // Scale
} from 'lucide-react';

import { ServicesHero } from '@/components/services/ServicesHero';

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 2. Hero Services (Interactive Hub) */}
      <ServicesHero />

      {/* 3. Grid de Capacidades (3x2) */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossas Capacidades Industriais</h2>
            <p className="text-slate-600 max-w-3xl text-lg">
              Engenharia de valor, manufatura avançada e gestão da qualidade integradas em um único ecossistema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* --- Linha 1: Manufatura --- */}
            
            {/* Card 1: SMT */}
            <div id="smt" className="group p-8 rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all bg-slate-50/50 scroll-mt-32">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Montagem SMT</h3>
              <ul className="text-slate-600 text-sm space-y-2 mb-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>01005, BGA, QFN, Fine Pitch</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>SPI 3D & AOI Inline 100%</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Alta Velocidade (150k CPH)</li>
              </ul>
              <Link href="/services/smt" className="text-primary font-medium text-sm flex items-center hover:underline">
                Ver Detalhes SMT <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Card 2: THT */}
            <div className="group p-8 rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all bg-slate-50/50">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Component className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Inserção THT</h3>
              <ul className="text-slate-600 text-sm space-y-2 mb-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Solda Onda (Wave Soldering)</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Solda Seletiva de Precisão</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Conformal Coating Robótico</li>
              </ul>
              <Link href="/services/smt#tht" className="text-primary font-medium text-sm flex items-center hover:underline">
                Ver Detalhes THT <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Card 3: Box Build */}
            <div id="box-build" className="group p-8 rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all bg-slate-50/50 scroll-mt-32">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Box Build Integration</h3>
              <ul className="text-slate-600 text-sm space-y-2 mb-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Montagem Mecânica Final</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Cabeamento e Chicotes</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Testes Funcionais (FCT/ICT)</li>
              </ul>
              <Link href="/services/box-build" className="text-primary font-medium text-sm flex items-center hover:underline">
                Ver Detalhes Box Build <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* --- Linha 2: Gestão & Engenharia --- */}

            {/* Card 4: NPI (Linked to Section below, but good to have ID here too just in case?) No, ID on section below is better for 'NPI Engineering' pill */}
            <div className="group p-8 rounded-xl border border-slate-200 hover:border-indigo-500/30 hover:shadow-lg transition-all bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <FileText className="w-32 h-32 text-slate-900" />
              </div>
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Industrialização / NPI</h3>
              <ul className="text-slate-600 text-sm space-y-2 mb-6 relative z-10">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>Análise DFM / DFA / DFT</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>Engenharia de Risco Zero</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>Gestão de Lote Piloto</li>
              </ul>
              <Link href="/services/npi" className="text-indigo-600 font-medium text-sm flex items-center hover:underline">
                Ver Detalhes NPI <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Card 5: Supply Chain */}
            <div className="group p-8 rounded-xl border border-slate-200 hover:border-slate-400/30 hover:shadow-lg transition-all bg-slate-50/50">
              <div className="w-12 h-12 bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gestão de Materiais</h3>
              <ul className="text-slate-600 text-sm space-y-2 mb-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2"></span>Supply Chain Global</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2"></span>Gestão de BOM & AVL</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2"></span>Rastreabilidade Lote a Lote</li>
              </ul>
              <Link href="#" className="text-slate-700 font-medium text-sm flex items-center hover:underline">
                Ver Detalhes Supply <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Card 6: Quality */}
            <div className="group p-8 rounded-xl border border-slate-200 hover:border-emerald-500/30 hover:shadow-lg transition-all bg-slate-50/50">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Qualidade & Compliance</h3>
              <ul className="text-slate-600 text-sm space-y-2 mb-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>Padrão IPC-A-610 Class 2/3</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>Sistema da Qualidade ISO 9001</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>Auditorias e Documentação</li>
              </ul>
              <Link href="#" className="text-emerald-700 font-medium text-sm flex items-center hover:underline">
                Ver Compliance <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. Industrialização & NPI Flow */}
      <section id="npi" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-32">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                Diferencial Técnico
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Do Protótipo à Produção Escalável
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Nosso processo de NPI (New Product Introduction) elimina riscos ocultos. 
                Investimos tempo na engenharia de front-end para garantir que sua produção 
                não pare por falhas de projeto.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">1. Análise DFM/DFA</h4>
                    <p className="text-sm text-slate-500">Validação completa dos arquivos Gerber e BOM antes de comprar uma única peça.</p>
                  </div>
                </div>
                
                 <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">2. Lote Piloto Controlado</h4>
                    <p className="text-sm text-slate-500">Produção de pequeno volume para validação de processo, ajuste de perfil térmico e Golden Sample.</p>
                  </div>
                </div>

                 <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <Rocket className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">3. Escala Produtiva</h4>
                    <p className="text-sm text-slate-500">Liberação para manufatura em massa com repetibilidade (CPK) e eficiência de custo.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual Flow Representation */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative">
               <div className="absolute top-0 right-0 p-8 opacity-10 blur-3xl bg-indigo-500 w-64 h-64 rounded-full pointer-events-none"></div>
               <h3 className="text-lg font-bold text-slate-900 mb-6 relative z-10">Fluxo de Redução de Risco</h3>
               
               <div className="space-y-4 relative z-10">
                 {/* Step 1 Bar */}
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-colors">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">01</div>
                     <span className="font-medium text-slate-700">Design Review</span>
                   </div>
                   <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">-30% Risco</span>
                 </div>
                 
                 <div className="h-4 w-0.5 bg-slate-200 ml-8"></div>
                 
                  {/* Step 2 Bar */}
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-colors">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">02</div>
                     <span className="font-medium text-slate-700">Prototype / Pilot</span>
                   </div>
                   <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">-80% Risco</span>
                 </div>
                 
                 <div className="h-4 w-0.5 bg-slate-200 ml-8"></div>
                 
                  {/* Step 3 Bar */}
                 <div className="bg-indigo-600 p-4 rounded-lg shadow-md flex justify-between items-center text-white">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center text-white font-bold text-sm">03</div>
                     <span className="font-bold">Mass Production</span>
                   </div>
                   <span className="text-xs text-white/90 font-bold bg-white/20 px-2 py-1 rounded">Risco Controlado</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Infraestrutura & Capacidade */}
      <section className="py-24 bg-white">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
           <div className="grid lg:grid-cols-12 gap-12">
             <div className="lg:col-span-4">
               <h2 className="text-3xl font-bold text-slate-900 mb-6">Infraestrutura & Capacidade Industrial</h2>
               <p className="text-slate-600 leading-relaxed mb-6">
                 Operamos um parque fabril moderno, projetado para flexibilidade. 
                 Nossas linhas são configuradas para troca rápida (SMED), permitindo atender 
                 eficientemente tanto lotes piloto quanto alta demanda.
               </p>
               <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="text-4xl font-bold text-primary mb-2">150k</div>
                 <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Componentes por Hora (CPH)</div>
               </div>
             </div>
             
             <div className="lg:col-span-8">
               <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                 <table className="min-w-full divide-y divide-slate-200">
                   <thead className="bg-slate-50">
                     <tr>
                       <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Departamento</th>
                       <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Equipamento / Capacidade</th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-slate-200">
                     <tr>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">SMT (Surface Mount)</td>
                       <td className="px-6 py-4 text-sm text-slate-600">3 Linhas Independentes (Fuji / Panasonic) · Stencil Printer Automático</td>
                     </tr>
                     <tr>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Inspeção (Quality)</td>
                       <td className="px-6 py-4 text-sm text-slate-600">SPI 3D (Koh Young) · AOI 3D (Omron) · Raio-X (BGA/QFN)</td>
                     </tr>
                     <tr>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Soldagem THT</td>
                       <td className="px-6 py-4 text-sm text-slate-600">Forno de Refusão 10 Zonas (Nitrogênio) · Solda Onda Dupla · Solda Seletiva</td>
                     </tr>
                      <tr>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Teste & Finalização</td>
                       <td className="px-6 py-4 text-sm text-slate-600">Conformal Coating Automatizado · Jigas de Teste (ICT/FCT) · Burn-in</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 6. CTA Técnico */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Seu projeto está pronto para produção industrial?</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Envie seus arquivos Gerber, Lista de Materiais (BOM) e volume estimado para uma análise técnica detalhada.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
               href="/budget" 
               className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-lg font-bold text-white shadow-xl hover:bg-primary/90 transition-all"
             >
               Enviar Pacote Técnico
             </Link>
             <Link 
               href="/contacts" 
               className="inline-flex h-14 items-center justify-center rounded-md border border-slate-300 bg-white px-8 text-lg font-medium text-slate-700 hover:bg-slate-50 transition-all"
             >
               Falar com Engenharia
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
