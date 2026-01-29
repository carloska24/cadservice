
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar,
  Award,
  Factory,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Cpu,
  ScanSearch,
  Zap,
  Flame,
  Radio,
  BarChart3,
  Globe
} from 'lucide-react';

// Timeline data based on CADService real history
const timelineEvents = [
  {
    year: '1985',
    title: 'Fundação da FOTOTEC',
    description: 'Início das operações como especialista na produção de fotolitos para fabricação de PCBs. Primeiro passo que estabeleceu as bases técnicas da empresa.',
    highlight: false
  },
  {
    year: '1987',
    title: 'Nasce a CADSERVICE BUREAU',
    description: 'Criação da empresa focada no desenvolvimento de layouts de placas de circuito impresso por meio de softwares CAD — uma abordagem pioneira para a época.',
    highlight: true
  },
  {
    year: '1991',
    title: 'CADService Produtos Eletrônicos',
    description: 'Nasce oficialmente a CADSERVICE PRODUTOS ELETRÔNICOS LTDA, marcando o início da produção própria de PCBs nas tecnologias face simples, dupla face e multicamadas.',
    highlight: true
  },
  {
    year: '1997',
    title: 'Homologação UL',
    description: 'Processos produtivos homologados pelo UL – Underwriters Laboratories Inc., abrindo portas para o fornecimento de PCBs ao mercado norte-americano e europeu.',
    highlight: false
  },
  {
    year: '1998',
    title: 'Linhas Automáticas SMT',
    description: 'Implantação de linhas automáticas de montagem SMT, incorporando tecnologia de ponta para inserção de componentes SMD.',
    highlight: false
  },
  {
    year: '1999',
    title: 'Certificação ISO 9001',
    description: 'Conquista da Certificação ISO 9001, reforçando o compromisso com a qualidade e a padronização dos processos.',
    highlight: true
  },
  {
    year: '2005',
    title: 'Expansão e ISO 13485',
    description: 'Expansão da área fabril acompanhada da obtenção da certificação ISO 13485, habilitando a CADService a atender o exigente setor médico-hospitalar.',
    highlight: true
  },
  {
    year: '2010+',
    title: 'Investimentos em Automação',
    description: 'Aquisição de sistemas AOI, Raio-X 3D para inspeção de BGAs/QFNs, fornos Lead Free e linhas de solda seletiva automática.',
    highlight: false
  },
  {
    year: '2021',
    title: '30 Anos de Excelência',
    description: 'CADService celebra 30 anos consolidando-se como referência em projetos eletrônicos de alta complexidade.',
    highlight: true
  },
  {
    year: 'Hoje',
    title: 'Evolução Contínua',
    description: 'Combinando experiência industrial, engenharia sólida e tecnologia de ponta para entregar soluções completas em PCBs e montagem eletrônica.',
    highlight: true
  }
];

// Technology investments
const technologies = [
  {
    icon: ScanSearch,
    title: 'Inspeção AOI',
    description: 'Sistemas de Inspeção Ótica Automática para detecção de defeitos em tempo real'
  },
  {
    icon: Radio,
    title: 'Raio-X 3D',
    description: 'Inspeção avançada de BGAs e QFNs com tecnologia de raio-X tridimensional'
  },
  {
    icon: Flame,
    title: 'Lead Free',
    description: 'Fornos de refusão compatíveis com processos Lead Free e RoHS compliance'
  },
  {
    icon: Zap,
    title: 'Solda Seletiva',
    description: 'Linhas automáticas de solda seletiva de alta precisão para componentes PTH'
  },
  {
    icon: BarChart3,
    title: 'Rastreabilidade',
    description: 'Sistema completo de rastreabilidade lote a lote para total controle de qualidade'
  },
  {
    icon: Cpu,
    title: 'Automação Total',
    description: 'Linhas de produção automatizadas para maior capacidade e menor variabilidade'
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO SECTION - Full Width Impact */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold uppercase tracking-wider mb-6">
                <Factory className="w-4 h-4 mr-2" />
                Desde 1985
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Quase 4 Décadas de{' '}
                <span className="text-primary">Excelência</span>{' '}
                em Engenharia Eletrônica
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                A CADService Produtos Eletrônicos é uma empresa brasileira consolidada como referência 
                em engenharia, precisão e confiabilidade para a indústria eletrônica.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/services" 
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg hover:bg-primary/90 transition-all cursor-pointer"
                >
                  Nossos Serviços
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  href="/contacts" 
                  className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-slate-600 bg-transparent px-6 text-base font-medium text-white hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Fale com Engenharia
                </Link>
              </div>
            </div>

            {/* Right - Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 overflow-hidden shadow-2xl">
                {/* Placeholder for factory/team photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Factory className="w-20 h-20 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Área reservada para foto da fábrica ou equipe</p>
                    <p className="text-slate-500 text-xs mt-2">Dimensão recomendada: 800x600px</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-slate-100">
                <div className="text-3xl font-bold text-primary mb-1">+38</div>
                <div className="text-sm text-slate-600 font-medium">Anos de Experiência</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS BAR - Impact Numbers */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">1985</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Fundação</div>
            </div>
            
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">ISO</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">9001 & 13485</div>
            </div>
            
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">UL</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Homologado</div>
            </div>
            
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">IPC</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Membro Oficial</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOSSA HISTÓRIA - Introduction */}
      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">Nossa História</h2>
            <div className="prose prose-lg prose-slate mx-auto">
              <p className="text-xl text-slate-600 leading-relaxed">
                A CADService Produtos Eletrônicos é uma empresa brasileira com quase quatro décadas de atuação 
                no desenvolvimento, fabricação e montagem de placas de circuitos impressos, consolidando-se como 
                <strong className="text-slate-900"> referência em engenharia, precisão e confiabilidade</strong> para a indústria eletrônica.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mt-6">
                Nossa trajetória teve início em 1985, com a fundação da FOTOTEC, especializada na produção de fotolitos 
                para fabricação de PCBs. Esse primeiro passo estabeleceu as bases técnicas que, poucos anos depois, 
                impulsionariam a criação da CADSERVICE BUREAU, em 1987.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TIMELINE VISUAL - Nossa Trajetória */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Uma Jornada de Inovação e Excelência</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Acompanhe os marcos que moldaram nossa história de quase quatro décadas.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Central Line - Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-slate-300 to-primary transform -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-0">
              {timelineEvents.map((event, index) => (
                <div 
                  key={event.year}
                  className={`relative lg:flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'}`}>
                    <div 
                      className={`
                        p-6 rounded-xl border transition-all hover:shadow-lg cursor-pointer
                        ${event.highlight 
                          ? 'bg-primary/5 border-primary/20 hover:border-primary/40' 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                        }
                      `}
                    >
                      <div className={`inline-flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <span className={`
                          text-2xl font-bold 
                          ${event.highlight ? 'text-primary' : 'text-slate-900'}
                        `}>
                          {event.year}
                        </span>
                        {event.highlight && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Timeline Node - Desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-6 transform -translate-x-1/2 items-center justify-center">
                    <div className={`
                      w-4 h-4 rounded-full border-4 border-white shadow-md
                      ${event.highlight ? 'bg-primary' : 'bg-slate-300'}
                    `} />
                  </div>

                  {/* Spacer for alternate side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECNOLOGIA E AUTOMAÇÃO */}
      <section className="py-20 lg:py-28 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Investimentos em Tecnologia de Ponta
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Nos anos seguintes, a empresa investiu fortemente em automação, inspeção e rastreabilidade 
              para garantir aumento de capacidade produtiva e maior confiabilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => (
              <div 
                key={tech.title}
                className="group p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary/50 transition-all hover:bg-slate-800 cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <tech.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tech.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CERTIFICAÇÕES E CREDENCIAIS */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Reconhecimento e Qualidade Comprovados
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nossas certificações são reflexo de uma cultura obcecada por repetibilidade e rastreabilidade.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* ISO 9001 */}
            <div className="text-center p-8 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">ISO 9001</h4>
              <p className="text-sm text-slate-500">Gestão da Qualidade</p>
              <p className="text-xs text-primary font-medium mt-2">Desde 1999</p>
            </div>

            {/* ISO 13485 */}
            <div className="text-center p-8 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">ISO 13485</h4>
              <p className="text-sm text-slate-500">Dispositivos Médicos</p>
              <p className="text-xs text-primary font-medium mt-2">Desde 2005</p>
            </div>

            {/* UL Listed */}
            <div className="text-center p-8 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">UL Listed</h4>
              <p className="text-sm text-slate-500">Homologação Internacional</p>
              <p className="text-xs text-primary font-medium mt-2">Desde 1997</p>
            </div>

            {/* IPC Member */}
            <div className="text-center p-8 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Membro IPC</h4>
              <p className="text-sm text-slate-500">Padrões da Indústria</p>
              <p className="text-xs text-primary font-medium mt-2">IPC-A-610</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VISÃO DO FUTURO */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold uppercase tracking-wider mb-8">
              30+ Anos de História
            </div>
            
            <blockquote className="text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-8">
              &ldquo;Em 2021, a CADService celebrou 30 anos de história, consolidando-se como uma empresa 
              preparada para atender projetos eletrônicos de alta complexidade, com foco em 
              <span className="text-primary"> qualidade, precisão técnica e parceria de longo prazo</span> com seus clientes.&rdquo;
            </blockquote>

            <div className="w-16 h-0.5 bg-slate-600 mx-auto mb-8" />

            <p className="text-xl text-slate-300 leading-relaxed">
              Hoje, a CADService segue evoluindo, combinando experiência industrial, engenharia sólida 
              e tecnologia de ponta para entregar soluções completas em PCBs e montagem eletrônica.
            </p>
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="py-20 lg:py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto para iniciar seu projeto?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Fale com nossa equipe de engenharia e descubra como podemos transformar sua ideia em realidade.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/budget" 
              className="inline-flex h-14 items-center justify-center rounded-lg bg-white px-8 text-lg font-bold text-primary shadow-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/contacts" 
              className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-white/30 bg-transparent px-8 text-lg font-medium text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Falar com Engenharia
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
