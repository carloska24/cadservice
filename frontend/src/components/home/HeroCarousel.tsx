"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Slide Data with dynamic tags per slide
const SLIDES = [
  {
    id: 1,
    image: "/hero-slide-1.jpg", 
    tag: "MONTAGEM SMT AVANÇADA",
    title: "Soluções de Engenharia e Montagem Eletrônica",
    description: "Parceiro estratégico para prototipagem e produção em escala. Qualidade garantida por processos IPC Class 2 e 3.",
    ctaText: "Nossos Serviços",
    ctaLink: "/services",
    gradient: "from-slate-900 via-slate-800 to-slate-900", 
  },
  {
    id: 2,
    image: "/hero-slide-2.jpg",
    tag: "SETOR MÉDICO",
    title: "Alta Confiabilidade para Dispositivos Vitais",
    description: "Montagem de PCBs para dispositivos médicos. Rastreabilidade total e conformidade ISO 13485.",
    ctaText: "Ver Portfólio",
    ctaLink: "/portfolio",
    gradient: "from-blue-900 via-slate-800 to-slate-900",
  },
  {
    id: 3,
    image: "/hero-slide-3.jpg",
    tag: "SMART CITIES",
    title: "Conectividade para Infraestrutura Urbana",
    description: "Hardware robusto para cidades inteligentes. Integração Box Build completa e testes funcionais.",
    ctaText: "Box Build",
    ctaLink: "/services/box-build",
    gradient: "from-indigo-900 via-slate-800 to-slate-900",
  },
  {
    id: 4,
    image: "/hero-slide-4.jpg",
    tag: "SUPPLY CHAIN",
    title: "Gestão Global de Componentes",
    description: "Mitigação de obsolescência e sourcing estratégico para garantir a longevidade do seu projeto.",
    ctaText: "Fale Conosco",
    ctaLink: "/contacts",
    gradient: "from-slate-800 via-gray-900 to-slate-900",
  },
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const slideRef = useRef<NodeJS.Timeout | null>(null);

  // Progress animation
  const startProgress = useCallback(() => {
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        progressRef.current = setTimeout(updateProgress, 50);
      }
    };
    
    updateProgress();
  }, []);

  // Clear timers
  const clearTimers = useCallback(() => {
    if (progressRef.current) clearTimeout(progressRef.current);
    if (slideRef.current) clearTimeout(slideRef.current);
  }, []);

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  // Go to specific slide
  const goToSlide = (index: number) => {
    clearTimers();
    setCurrentSlide(index);
    setProgress(0);
  };

  // Auto-play effect
  useEffect(() => {
    if (isPaused) return;

    clearTimers();
    startProgress();
    
    slideRef.current = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearTimers();
  }, [currentSlide, isPaused, startProgress, nextSlide, clearTimers]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] bg-slate-950 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* SLIDES */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Layer */}
            <div className={`absolute inset-0 bg-linear-to-br ${slide.gradient}`}>
              {/* Dark overlay for text contrast */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Layer */}
            <div className="relative z-20 container mx-auto max-w-7xl pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 h-full flex flex-col justify-center">
              <div className="max-w-3xl">
                
                {/* Dynamic Tag */}
                <span 
                  className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-sm bg-primary/20 text-primary font-bold text-xs tracking-widest uppercase mb-5 backdrop-blur-sm border border-primary/30 transition-all duration-500 ${
                    isActive && !prefersReducedMotion
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: isActive ? "100ms" : "0ms" }}
                >
                  <span className="text-primary">✦</span>
                  {slide.tag}
                </span>
                
                {/* Title */}
                <h1 
                  className={`text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight mb-5 leading-[1.1] transition-all duration-500 ${
                    isActive && !prefersReducedMotion
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: isActive ? "200ms" : "0ms" }}
                >
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p 
                  className={`text-base md:text-lg lg:text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl transition-all duration-500 ${
                    isActive && !prefersReducedMotion
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: isActive ? "300ms" : "0ms" }}
                >
                  {slide.description}
                </p>
                
                {/* CTAs */}
                <div 
                  className={`flex flex-wrap gap-4 transition-all duration-500 ${
                    isActive && !prefersReducedMotion
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: isActive ? "400ms" : "0ms" }}
                >
                  <Link 
                    href={slide.ctaLink}
                    className="inline-flex h-12 md:h-14 items-center justify-center rounded-sm bg-primary px-6 md:px-8 text-sm md:text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    {slide.ctaText} <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                  <Link 
                    href="/contacts"
                    className="hidden sm:inline-flex h-12 md:h-14 items-center justify-center rounded-sm border border-white/30 bg-white/5 px-6 md:px-8 text-sm md:text-base font-bold text-white hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer"
                  >
                    Solicitar Cotação
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* PROGRESS INDICATORS (TT Electronics Style) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, index) => {
          const isActive = index === currentSlide;
          
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative h-1 w-14 bg-white/20 rounded-sm overflow-hidden cursor-pointer transition-all hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={isActive ? "true" : "false"}
            >
              {/* Progress fill animation */}
              {isActive && (
                <span 
                  className="absolute inset-y-0 left-0 bg-white rounded-sm transition-all"
                  style={{ 
                    width: isPaused ? `${progress}%` : `${progress}%`,
                    transition: isPaused ? 'none' : 'width 50ms linear'
                  }}
                />
              )}
              {/* Completed slides show full bar */}
              {index < currentSlide && (
                <span className="absolute inset-0 bg-white/60 rounded-sm" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
