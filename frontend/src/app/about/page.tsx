
import Link from 'next/link';
import { 
  History, 
  Award, 
  Users, 
  MapPin, 
  CheckCircle, 
  FileText,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO "NOSSA HISTÓRIA" */}
      <section className="relative py-24 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Mais que montadores, <br/> somos seus parceiros de engenharia.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed">
            10 Anos de excelência em manufatura eletrônica em São Paulo. 
            Nascemos como design house e evoluímos para uma integração vertical completa.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-primary mb-2">+2.5 M</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Componentes/mês</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">On-Time Delivery</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-slate-900 mb-2">1.500m²</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fab Floor (SP)</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Engenheiros & Técnicos</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LINHA DO TEMPO (Timeline Vertical) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossa Evolução</h2>
            <p className="text-slate-600">De uma sala de engenharia para um parque industrial.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-6 md:ml-12 space-y-12">
            
            {/* Item 1 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white ring-4 ring-white"></div>
              <div className="flex flex-col md:flex-row gap-2 md:items-baseline">
                <span className="text-xl font-bold text-primary">2014</span>
                <h3 className="text-lg font-bold text-slate-900">Fundação</h3>
              </div>
              <p className="text-slate-600 mt-2">Início das operações como escritório de design de PCB focado em projetos de IoT.</p>
            </div>

            {/* Item 2 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-white ring-4 ring-white"></div>
              <div className="flex flex-col md:flex-row gap-2 md:items-baseline">
                <span className="text-xl font-bold text-primary">2016</span>
                <h3 className="text-lg font-bold text-slate-900">Linha SMT 1</h3>
              </div>
              <p className="text-slate-600 mt-2">Instalação da primeira linha de montagem com Pick & Place Samsung para prototipagem rápida.</p>
            </div>

            {/* Item 3 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white ring-4 ring-white"></div>
              <div className="flex flex-col md:flex-row gap-2 md:items-baseline">
                <span className="text-xl font-bold text-primary">2019</span>
                <h3 className="text-lg font-bold text-slate-900">Certificação ISO 9001</h3>
              </div>
              <p className="text-slate-600 mt-2">Padronização total dos processos e implementação do sistema ERP SAP B1.</p>
            </div>

            {/* Item 4 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white ring-4 ring-white"></div>
              <div className="flex flex-col md:flex-row gap-2 md:items-baseline">
                <span className="text-xl font-bold text-primary">2024</span>
                <h3 className="text-lg font-bold text-slate-900">Expansão Box Build</h3>
              </div>
              <p className="text-slate-600 mt-2">Mudança para a nova sede de 1.500m² com área exclusiva para integração final e clean room.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CERTIFICAÇÕES (Trust Wall) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Qualidade Auditada</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Nossas certificações não são apenas quadros na parede. São reflexo de uma cultura 
                obcecada por repetibilidade e rastreabilidade. Auditados anualmente pela SGS.
              </p>
              
              <Link 
                href="/contacts" 
                className="inline-flex items-center font-bold text-primary hover:underline"
              >
                Solicitar Manual de Qualidade <FileText className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid gap-6">
              {/* Cert 1 */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border-l-4 border-green-500">
                <ShieldCheck className="w-8 h-8 text-green-600 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-slate-900">ISO 9001:2015</h4>
                  <p className="text-sm text-slate-500">Sistema de Gestão da Qualidade Certificado.</p>
                </div>
              </div>

              {/* Cert 2 */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border-l-4 border-blue-500">
                <Award className="w-8 h-8 text-blue-600 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-slate-900">IPC Member</h4>
                  <p className="text-sm text-slate-500">Padrões IPC-A-610 (Acceptability of Electronic Assemblies).</p>
                </div>
              </div>

              {/* Cert 3 */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border-l-4 border-red-500">
                <CheckCircle className="w-8 h-8 text-red-600 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-slate-900">UL Registered</h4>
                  <p className="text-sm text-slate-500">Fábrica registrada para produção de PCBs UL 94V-0.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
