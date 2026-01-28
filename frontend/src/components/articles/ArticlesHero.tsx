'use client';

import { Search, BookOpen, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface ArticlesHeroProps {
  onSearch?: (query: string) => void;
}

export function ArticlesHero({ onSearch }: ArticlesHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 opacity-90" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', 
            backgroundSize: '32px 32px' 
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/0 to-slate-950/0" />
      </div>

      {/* Content */}
      <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl relative z-10 py-16 md:py-24">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <a href="/" className="hover:text-slate-300 transition-colors">Home</a>
          <span>/</span>
          <span className="text-slate-400">Knowledge Hub</span>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Recursos Técnicos
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            Knowledge Hub
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl">
            Artigos técnicos, guias práticos e tendências de mercado para engenheiros de produto 
            e profissionais de manufatura eletrônica.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar artigos... (Ex: DfM, IPC-A-610, BGA)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </form>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-bold">25+ Artigos</div>
                <div className="text-xs text-slate-500">Conteúdo técnico</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-white font-bold">7 Categorias</div>
                <div className="text-xs text-slate-500">Tópicos especializados</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
