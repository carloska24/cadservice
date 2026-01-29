'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Mail } from 'lucide-react';

// Components
import { ArticlesHero } from '@/components/articles/ArticlesHero';
import { CategoryFilter } from '@/components/articles/CategoryFilter';
import { FeaturedArticle } from '@/components/articles/FeaturedArticle';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { PopularArticles } from '@/components/articles/PopularArticles';
import { NewsletterSignup } from '@/components/articles/NewsletterSignup';

// Data
import { MOCK_ARTICLES, POPULAR_ARTICLES, FEATURED_ARTICLE, GRID_ARTICLES } from '@/data/mockArticles';

// Category ID to category name mapping
const categoryIdToName: Record<string, string> = {
  'smt': 'SMT/PCBA',
  'npi': 'NPI',
  'ipc-qa': 'IPC/QA',
  'supply-chain': 'Supply Chain',
  'box-build': 'Box Build',
  'tendencias': 'Tendências',
  'engenharia': 'Engenharia',
};

const ArticlesContent = () => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    let articles = GRID_ARTICLES;
    
    // Category filter
    if (activeCategory !== 'all') {
      const categoryName = categoryIdToName[activeCategory];
      articles = articles.filter(a => a.category === categoryName);
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query)
      );
    }
    
    return articles;
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* 1. HERO SECTION */}
      <ArticlesHero onSearch={setSearchQuery} />
      
      {/* 2. CATEGORY FILTER */}
      <CategoryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      {/* 3. FEATURED ARTICLE (only show if no filter/search active) */}
      {activeCategory === 'all' && !searchQuery && (
        <FeaturedArticle article={FEATURED_ARTICLE} />
      )}
      
      {/* 4. MAIN CONTENT */}
      <section className="py-12 lg:py-16 flex-1">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* ARTICLES GRID (Main Column) */}
            <div className="lg:col-span-8">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900">
                  {activeCategory === 'all' && !searchQuery 
                    ? 'Todos os Artigos' 
                    : searchQuery 
                      ? `Resultados para "${searchQuery}"` 
                      : categoryIdToName[activeCategory] || 'Artigos'
                  }
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({filteredArticles.length} {filteredArticles.length === 1 ? 'artigo' : 'artigos'})
                  </span>
                </h2>
              </div>
              
              {/* Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filteredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-6xl mb-4">📚</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Nenhum artigo encontrado</h3>
                  <p className="text-slate-500 mb-6">
                    {searchQuery 
                      ? 'Tente buscar por outros termos.' 
                      : 'Não há artigos nesta categoria ainda.'
                    }
                  </p>
                  <button 
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                    className="text-primary font-medium hover:underline"
                  >
                    Ver todos os artigos
                  </button>
                </div>
              )}
              
              {/* Pagination (future implementation) */}
              {filteredArticles.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 text-sm text-slate-500">
                    Mostrando {filteredArticles.length} de {MOCK_ARTICLES.length} artigos
                  </div>
                </div>
              )}
            </div>
            
            {/* SIDEBAR */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Popular Articles */}
              <PopularArticles articles={POPULAR_ARTICLES} />
              
              {/* Newsletter */}
              <NewsletterSignup />
              
              {/* CTA Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3">Precisa de Ajuda Técnica?</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Nossa equipe de engenharia pode revisar seu projeto e identificar oportunidades de otimização.
                </p>
                <Link 
                  href="/contacts"
                  className="flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  Falar com Engenharia
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      
      {/* 5. CTA FINAL */}
      <section className="py-16 bg-linear-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Tem um projeto em mente?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Nossa equipe de engenharia pode transformar seu conceito em um produto pronto para manufatura em escala.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/budget" 
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-bold text-white shadow-lg hover:bg-primary/90 transition-all"
            >
              Solicitar Cotação
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/contacts" 
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 font-medium text-white hover:bg-white/10 transition-all"
            >
              <Mail className="mr-2 w-5 h-5" />
              Falar com Engenharia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default function ArticlesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading articles...</div>}>
         <ArticlesContent />
      </Suspense>
    </div>
  );
}
