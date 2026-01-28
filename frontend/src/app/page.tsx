
import Link from "next/link";
import { 
  ArrowRight, 
  Cpu, 
  Package, 
  Settings, 
  Briefcase, 
  Award,
  ChevronRight,
  CheckCircle,
  Zap
} from "lucide-react";
import { ProcessSection } from "@/components/ProcessSection";
import { HeroCarousel } from "@/components/home/HeroCarousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 2. Hero Section */}
      {/* 2. Hero Section */}
      {/* 2. Hero Carousel (Approved Wireframe) */}
      <HeroCarousel />

      {/* 2.1 Trust Bar (Below Fold) */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 relative z-20">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-semibold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" /> ISO 9001
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" /> IPC Member
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" /> +30 Anos de Mercado
            </div>
        </div>
      </div>

      {/* 3. Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-normal">Nossos Serviços Especializados</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Tecnologia de ponta para atender demandas complexas da indústria eletrônica.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group p-8 rounded-xl border border-slate-100 bg-slate-50 hover:shadow-lg hover:border-primary/20 transition-all">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Montagem SMT</h3>
              <p className="text-slate-600 mb-6">
                Alta precisão e velocidade. Capacidade para componentes 0201, BGA e conectores finos.
              </p>
              <Link href="/services/smt" className="text-primary font-medium flex items-center hover:underline">
                Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-xl border border-slate-100 bg-slate-50 hover:shadow-lg hover:border-primary/20 transition-all">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Integração Box Build</h3>
              <p className="text-slate-600 mb-6">
                Montagem final de produto, cabeamento, testes funcionais e embalagem pronta para venda.
              </p>
              <Link href="/services/box-build" className="text-primary font-medium flex items-center hover:underline">
                Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-xl border border-slate-100 bg-slate-50 hover:shadow-lg hover:border-primary/20 transition-all">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Engenharia DFM</h3>
              <p className="text-slate-600 mb-6">
                Análise de viabilidade e otimização de projeto para redução de custos e falhas.
              </p>
              <Link href="/services/npi" className="text-primary font-medium flex items-center hover:underline">
                Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center text-slate-600 font-medium hover:text-primary transition-colors">
              Ver Todos os Serviços <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. The Process */}
      {/* 4. The Process (Interactive 10-Step) */}
      {/* 4. The Process (Interactive 10-Step) */}
      <ProcessSection />

      {/* 5. Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Projetos Recentes</h2>
              <p className="text-slate-600">Cases de sucesso em diversos setores.</p>
            </div>
            <Link href="/portfolio" className="hidden md:flex items-center text-primary font-medium hover:underline">
              Ver Portfólio <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
             {/* Project Placeholder 1 */}
             <div className="group rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                  <span className="font-medium">Foto Produto Industrial</span>
                </div>
                <div className="p-6">
                   <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">Indústria Automotiva</div>
                   <h3 className="text-lg font-bold text-slate-900 mb-2">ECU de Controle de Tração</h3>
                   <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                     Placa de alta densidade com revestimento conformal para ambientes agressivos.
                   </p>
                   <div className="flex items-center text-primary text-sm font-medium">
                     Ver Detalhes <ChevronRight className="w-4 h-4" />
                   </div>
                </div>
             </div>

             {/* Project Placeholder 2 */}
             <div className="group rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                  <span className="font-medium">Foto Placa Médica</span>
                </div>
                <div className="p-6">
                   <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">Saúde / IoT</div>
                   <h3 className="text-lg font-bold text-slate-900 mb-2">Monitor Cardíaco Portátil</h3>
                   <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                     Montagem ISO 13485 com componentes 01005 e inspeção 3D rigorosa.
                   </p>
                   <div className="flex items-center text-primary text-sm font-medium">
                     Ver Detalhes <ChevronRight className="w-4 h-4" />
                   </div>
                </div>
             </div>

             {/* Project Placeholder 3 */}
             <div className="group rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                   <span className="font-medium">Foto IoT Gateway</span>
                </div>
                <div className="p-6">
                   <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">Smart City</div>
                   <h3 className="text-lg font-bold text-slate-900 mb-2">Gateway LoRaWAN Industrial</h3>
                   <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                     Integração completa de hardware e firmware para conectividade urbana.
                   </p>
                   <div className="flex items-center text-primary text-sm font-medium">
                     Ver Detalhes <ChevronRight className="w-4 h-4" />
                   </div>
                </div>
             </div>
          </div>
          
          <div className="md:hidden mt-8 text-center">
             <Link href="/portfolio" className="text-primary font-medium hover:underline">
              Ver Todos os Projetos
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Differentials / Quality */}
      <section className="py-24 md:py-32 bg-slate-900 text-white">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Por que escolher a CADService?</h2>
              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Rastreabilidade Total</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Controle lote a lote de cada componente. Saiba exatamente a origem e o destino de cada peça do seu produto.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Agilidade na Entrega</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Setup rápido de linha e gestão eficiente de cadeia de suprimentos para cumprir prazos agressivos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Suporte de Engenharia</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Não apenas montamos: nosso time de engenharia analisa e sugere melhorias para reduzir custos e aumentar a confiabilidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 relative h-[600px] bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 overflow-hidden shadow-2xl">
              {/* Image Placeholder */}
              <div className="text-center p-8">
                <Award className="w-32 h-32 text-slate-700 mx-auto mb-6" />
                <p className="text-slate-500 font-medium text-lg">Imagem Institucional de Alta Qualidade<br/>(Chão de Fábrica / Certificação)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Final */}
      <section className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Pronto para escalar sua produção?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Fale com nossos engenheiros e receba uma avaliação técnica do seu projeto e uma cotação em até 24 horas.
          </p>
           <Link 
              href="/budget" 
              className="inline-flex h-16 items-center justify-center rounded-md bg-primary px-10 text-lg font-bold text-white shadow-xl hover:bg-primary/90 hover:-translate-y-1 transition-all"
            >
              Solicitar Cotação Agora
            </Link>
        </div>
      </section>
      
    </div>
  );
}
