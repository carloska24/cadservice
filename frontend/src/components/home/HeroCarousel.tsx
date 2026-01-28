"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Slide Data Configuration based on approved wireframe
const SLIDES = [
  {
    id: 1,
    image: "/hero-slide-1.jpg", 
    title: "Soluções de Engenharia e Montagem Eletrônica",
    description: "Parceiro estratégico para prototipagem e produção em escala. Qualidade garantida por processos IPC Class 2 e 3.",
    ctaText: "Nossos Serviços",
    ctaLink: "/services",
    gradient: "from-slate-900 to-slate-800", 
  },
  {
    id: 2,
    image: "/hero-slide-2.jpg",
    title: "Alta Confiabilidade para o Setor Médico",
    description: "Montagem de PCBs para dispositivos vitais. Rastreabilidade total e conformidade ISO 13485.",
    ctaText: "Ver Portfólio",
    ctaLink: "/portfolio",
    gradient: "from-blue-900 to-slate-900",
  },
  {
    id: 3,
    image: "/hero-slide-3.jpg",
    title: "Conectividade para Cidades Inteligentes",
    description: "Hardware robusto para infraestrutura urbana. Integração Box Build completa e testes funcionais.",
    ctaText: "Box Build",
    ctaLink: "/services/box-build",
    gradient: "from-indigo-900 to-slate-900",
  },
  {
    id: 4,
    image: "/hero-slide-4.jpg",
    title: "Gestão Global de Componentes",
    description: "Mitigação de obsolescência e sourcing estratégico para garantir a longevidade do seu projeto.",
    ctaText: "Fale Conosco",
    ctaLink: "/contacts",
    gradient: "from-slate-800 to-gray-900",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play logic (6000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  return (
    // Constrained Height: Mobile 500px, Desktop 650px (User Request)
    <div className="relative w-full h-[500px] md:h-[650px] bg-slate-950 overflow-hidden group">
      
      {/* SLIDES */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Layer (Image/Gradient) */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}>
             {/* Overlay for darker text contrast */}
             <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content Layer */}
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className={`max-w-3xl transition-all duration-1000 delay-300 transform ${
                index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <span className="inline-block py-1 px-3 rounded bg-primary/20 text-primary font-bold text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-6 backdrop-blur-sm border border-primary/20">
                Líder em Manufatura EMS
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 md:mb-6 leading-[1.1]">
                {slide.title}
              </h1>
              <p className="text-base md:text-xl text-slate-200 mb-8 md:mb-10 leading-relaxed max-w-2xl">
                {slide.description}
              </p>
              <div className="flex gap-4">
                <Link 
                  href={slide.ctaLink}
                  className="inline-flex h-12 md:h-14 items-center justify-center rounded-sm bg-primary px-6 md:px-8 text-sm md:text-base font-bold text-white shadow hover:bg-primary/90 transition-all hover:-translate-y-1"
                >
                  {slide.ctaText} <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Link>
                <Link 
                  href="/contacts"
                  className="hidden sm:inline-flex h-14 items-center justify-center rounded-sm border border-white/30 bg-white/5 px-8 text-base font-bold text-white hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Solicitar Cotação
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* CONTROLS (Arrows - Visible on Hover) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/20 text-white/50 hover:bg-black/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/20 text-white/50 hover:bg-black/50 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* SEGMENTED INDICATORS (Bottom Center - User Request) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-300 rounded-sm ${
              index === currentSlide ? "w-12 bg-white" : "w-12 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
