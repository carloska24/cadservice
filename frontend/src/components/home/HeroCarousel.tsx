"use client";

import { useState, useEffect, useCallback } from "react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Slide Data with dynamic tags per slide
const SLIDES = [
  {
    id: 1,
    image: "/assets/images/home_hero_smt.jpg", 
    tag: "MONTAGEM SMT AVANÇADA",
    title: "Soluções de Engenharia e Montagem Eletrônica",
    description: "Parceiro estratégico para prototipagem e produção em escala. Qualidade garantida por processos IPC Class 2 e 3.",
    ctaText: "Nossos Serviços",
    ctaLink: "/services",
    gradient: "from-slate-900 via-slate-800 to-slate-900", 
  },
  {
    id: 2,
    image: "/assets/images/home_hero_medical.jpg",
    tag: "SETOR MÉDICO",
    title: "Alta Confiabilidade para Dispositivos Vitais",
    description: "Montagem de PCBs para dispositivos médicos. Rastreabilidade total e conformidade ISO 13485.",
    ctaText: "Ver Portfólio",
    ctaLink: "/portfolio",
    gradient: "from-blue-900 via-slate-800 to-slate-900",
  },
  {
    id: 3,
    image: "/assets/images/home_hero_smart_city.png",
    tag: "SMART CITIES",
    title: "Conectividade para Infraestrutura Urbana",
    description: "Hardware robusto para cidades inteligentes. Integração Box Build completa e testes funcionais.",
    ctaText: "Box Build",
    ctaLink: "/services/box-build",
    gradient: "from-indigo-900 via-slate-800 to-slate-900",
  },
  {
    id: 4,
    image: "/assets/images/home_hero_supply_chain.png",
    tag: "SUPPLY CHAIN",
    title: "Gestão Global de Componentes",
    description: "Mitigação de obsolescência e sourcing estratégico para garantir a longevidade do seu projeto.",
    ctaText: "Fale Conosco",
    ctaLink: "/budget",
    gradient: "from-slate-800 via-gray-900 to-slate-900",
  },
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentSlide]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] bg-slate-950 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* SLIDES with Framer Motion */}
      <AnimatePresence mode="wait">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          
          if (!isActive) return null;
          
          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Background Layer - Image Base */}
              {/* Background Layer - Image Base */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Text Contrast Gradient - Minimal for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
              </div>

              {/* Content Layer */}
              <div className="relative z-20 container mx-auto max-w-7xl pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 h-full flex flex-col justify-center">
                <div className="max-w-3xl">
                  
                  {/* Dynamic Tag */}
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 py-1.5 px-4 rounded-sm bg-primary/20 text-primary font-bold text-xs tracking-widest uppercase mb-5 backdrop-blur-sm border border-primary/30"
                  >
                    <span className="text-primary">✦</span>
                    {slide.tag}
                  </motion.span>
                  
                  {/* Title */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight mb-5 leading-[1.1]"
                  >
                    {slide.title}
                  </motion.h1>
                  
                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-base md:text-lg lg:text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl"
                  >
                    {slide.description}
                  </motion.p>
                  
                  {/* CTAs */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link 
                      href={slide.ctaLink}
                      className="inline-flex h-12 md:h-14 items-center justify-center rounded-sm bg-primary px-6 md:px-8 text-sm md:text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      {slide.ctaText} <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                    <Link 
                      href="/budget"
                      className="hidden sm:inline-flex h-12 md:h-14 items-center justify-center rounded-sm border border-white/30 bg-white/5 px-6 md:px-8 text-sm md:text-base font-bold text-white hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer"
                    >
                      Solicitar Cotação
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* PROGRESS INDICATORS with Framer Motion */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, index) => {
          const isActive = index === currentSlide;
          
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative h-1.5 w-14 bg-white/20 rounded-full overflow-hidden cursor-pointer transition-all hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={isActive ? "true" : "false"}
            >
              {/* Progress fill animation with Framer Motion */}
              {isActive && (
                <motion.span 
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? undefined : "100%" }}
                  transition={{ 
                    duration: SLIDE_DURATION / 1000, 
                    ease: "linear"
                  }}
                />
              )}
              {/* Completed slides show full bar */}
              {index < currentSlide && (
                <span className="absolute inset-0 bg-white/60 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
