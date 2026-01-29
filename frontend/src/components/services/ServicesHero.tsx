"use client";

import Link from "next/link";
import { Cpu, Package, FileText, CheckCircle, Zap, Clock, Award } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export function ServicesHero() {

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] bg-slate-950 overflow-hidden flex flex-col">
      
      {/* Background Layers - Premium Enterprise Feel */}
      <div className="absolute inset-0 z-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
        
        {/* Accent Glow - Top Left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
        
        {/* Accent Glow - Bottom Right */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px] pointer-events-none" />
        
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 lg:py-14"
        >
          
          {/* Breadcrumb / Tagline */}
          <motion.div variants={fadeInUp} className="text-center mb-6 lg:mb-8">
            <nav className="mb-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                <Link href="/" className="hover:text-slate-300 transition-colors duration-200">Início</Link>
                <span className="mx-2 text-slate-600">/</span>
                <span className="text-slate-400">Soluções EMS</span>
              </span>
            </nav>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.15em] text-indigo-300 uppercase">
                Capacidade Industrial & Engenharia
              </span>
            </div>
          </motion.div>

          {/* Headlines */}
          <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-8 lg:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              Manufatura Eletrônica de{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-[length:200%_auto] animate-gradient">
                  Alta Precisão
                </span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Parque fabril equipado para demandas{' '}
              <span className="text-slate-200 font-semibold">High-Mix/Low-Volume</span>.{' '}
              Processos auditados ISO 9001 & ISO 13485 para garantir a integridade do seu hardware.
            </p>
          </motion.div>

          {/* Navigation Pills */}
          <motion.div variants={fadeInUp} className="text-center">
            <span className="text-slate-500 text-sm font-medium tracking-wide mb-5 block">
              Navegue por especialidade
            </span>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              <Link 
                href="/services/smt"
                className="group relative flex items-center gap-3 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors duration-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-slate-300 font-semibold group-hover:text-white transition-colors duration-300">
                  Montagem SMT
                </span>
              </Link>

              <Link 
                href="/services/box-build"
                className="group relative flex items-center gap-3 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors duration-300">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-slate-300 font-semibold group-hover:text-white transition-colors duration-300">
                  Box Build
                </span>
              </Link>

              <Link 
                href="/services/npi"
                className="group relative flex items-center gap-3 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors duration-300">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-slate-300 font-semibold group-hover:text-white transition-colors duration-300">
                  Engenharia NPI
                </span>
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Metrics Bar - Separated with Clear Visual Hierarchy */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="relative z-10 border-t border-white/[0.08] bg-black/40 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.08]">
            
            {/* Metric 1: Speed */}
            <div className="group py-8 px-4 text-center lg:text-left hover:bg-white/[0.02] transition-colors duration-300">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                <div className="p-2.5 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    150 mil
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                    CPH · Velocidade SMT
                  </div>
                </div>
              </div>
            </div>
            
            {/* Metric 2: Quality */}
            <div className="group py-8 px-4 text-center lg:text-left hover:bg-white/[0.02] transition-colors duration-300">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    Classe 3
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                    IPC-A-610 · Qualidade
                  </div>
                </div>
              </div>
            </div>
            
            {/* Metric 3: Response Time */}
            <div className="group py-8 px-4 text-center lg:text-left hover:bg-white/[0.02] transition-colors duration-300">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    24 Horas
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                    Resposta · Cotação
                  </div>
                </div>
              </div>
            </div>

            {/* Metric 4: Certification */}
            <div className="group py-8 px-4 text-center lg:text-left hover:bg-white/[0.02] transition-colors duration-300">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    ISO
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-[0.15em] mt-1">
                    9001 + 13485 · Certified
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

    </section>
  );
}
