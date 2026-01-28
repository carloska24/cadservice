
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  Zap, 
  BookOpen, 
  Heart
} from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO RECRUTAMENTO */}
      <section className="relative py-24 md:py-32 bg-blue-900 text-white text-center px-4">
        <div className="absolute inset-0 bg-blue-800/50 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-700">
            <Briefcase className="w-3 h-3" /> Carreiras
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Construa o Futuro da <br/> Eletrônica Brasileira
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Estamos buscando mentes brilhantes para operar máquinas de última geração e 
            resolver desafios complexos de engenharia.
          </p>
          <a 
            href="#openings" 
            className="inline-flex h-12 items-center justify-center rounded-md bg-white text-blue-900 px-8 text-base font-bold shadow-lg hover:bg-slate-100 transition-all"
          >
            Ver Vagas Abertas
          </a>
        </div>
      </section>

      {/* 2. BENEFÍCIOS (Why Join Us?) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Por que a CADService?</h2>
            <p className="text-slate-600">Não oferecemos apenas um emprego, mas uma escola técnica prática.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-xl border border-slate-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lab de Prototipagem</h3>
              <p className="text-slate-600 text-sm">
                Acesso livre aos equipamentos do laboratório para projetos pessoais dos funcionários (maker culture).
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-xl border border-slate-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Capacitação Contínua</h3>
              <p className="text-slate-600 text-sm">
                Bolsa integral para certificações IPC e treinamentos nos fabricantes de máquinas (Fuji/Panasonic).
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-xl border border-slate-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Saúde Premium</h3>
              <p className="text-slate-600 text-sm">
                Plano de saúde top-tier sem coparticipação para o titular, extensível a dependentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VAGAS (Job Board) */}
      <section id="openings" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
            Vagas em Aberto <span className="ml-3 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">2 Vagas</span>
          </h2>

          <div className="space-y-4">
            
            {/* Job Card 1 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Engenheiro de Processos SMT (Sênior)</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> Engenharia</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> São Paulo - SP (Presencial)</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 max-w-xl">
                  Responsável por definir perfis de refluxo, grids de stencil e programação de máquinas Fuji. Desejável inglês avançado.
                </p>
              </div>
              <button className="whitespace-nowrap px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                Candidatar-se
              </button>
            </div>

            {/* Job Card 2 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Operador de Máquina II</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> Produção</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> São Paulo - SP (Turno B)</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 max-w-xl">
                  Operação de linha SMT, setup de feeders e inspeção visual. Conhecimento em componentes eletrônicos e normas ESD é obrigatório.
                </p>
              </div>
              <button className="whitespace-nowrap px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                Candidatar-se
              </button>
            </div>

          </div>

          <div className="mt-12 p-8 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <h4 className="font-bold text-blue-900 mb-2">Não encontrou sua vaga?</h4>
            <p className="text-blue-700 text-sm mb-4">
              Estamos sempre de olho em bons talentos. Envie seu CV para nosso banco de talentos.
            </p>
            <a href="mailto:rh@cadservice.com.br" className="text-primary font-bold hover:underline">
              Enviar CV Espontâneo &rarr;
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
