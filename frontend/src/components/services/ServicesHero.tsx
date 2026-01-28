import Link from "next/link";
import { Cpu, Package, FileText, CheckCircle, Zap, Clock } from "lucide-react";

export function ServicesHero() {

  return (
    <section className="relative h-[600px] bg-slate-950 overflow-hidden flex flex-col justify-center">
      
      {/* Background with Gradient and Grid Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 opacity-90" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 bg-center" /> 
        {/* Fallback/Placeholder for the "technical drawing" background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950/0 to-slate-950/0" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl relative z-10 text-center">
        
        {/* Breadcrumb / Tagline */}
        <div className="mb-6 flex flex-col items-center gap-4">
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
             <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link> / Soluções EMS
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            Capacidade Industrial & Engenharia
          </span>
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Manufatura Eletrônica de <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
            Alta Precisão e Escalabilidade
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Parque fabril equipado para demandas <span className="text-slate-200 font-medium">High-Mix/Low-Volume</span>. 
          Processos auditados (ISO 9001) para garantir a integridade do seu hardware.
        </p>

        {/* Quick Access Pills (The Interactive Hub) */}
        <div className="flex flex-col items-center animate-fade-in-up">
          <span className="text-slate-500 text-sm mb-4 font-medium">Navegue por especialidade</span>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/services/smt"
              className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all backdrop-blur-md"
            >
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:text-indigo-300">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-slate-300 font-medium group-hover:text-white">Montagem SMT</span>
            </Link>

            <Link 
              href="/services/box-build"
              className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all backdrop-blur-md"
            >
              <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 group-hover:text-blue-300">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-slate-300 font-medium group-hover:text-white">Box Build</span>
            </Link>

            <Link 
              href="/services/npi"
              className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all backdrop-blur-md"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:text-emerald-300">
                 <FileText className="w-5 h-5" />
              </div>
              <span className="text-slate-300 font-medium group-hover:text-white">Engenharia NPI</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Metrics Bar (Authority Bias) */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          <div className="grid grid-cols-3 divide-x divide-white/10 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-center">
               <Zap className="w-5 h-5 text-yellow-500" />
               <div className="text-left">
                  <div className="text-white font-bold text-sm md:text-lg leading-none">150k CPH</div>
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider font-bold">Capacidade SMT</div>
               </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-center">
               <CheckCircle className="w-5 h-5 text-emerald-500" />
               <div className="text-left">
                  <div className="text-white font-bold text-sm md:text-lg leading-none">IPC Class 3</div>
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider font-bold">Qualidade</div>
               </div>
            </div>
             <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-center">
               <Clock className="w-5 h-5 text-blue-500" />
               <div className="text-left">
                  <div className="text-white font-bold text-sm md:text-lg leading-none">24 Horas</div>
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider font-bold">Para Cotação</div>
               </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
