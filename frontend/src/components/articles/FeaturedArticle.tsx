import Link from 'next/link';
import { ArrowRight, Calendar, Eye, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ArticleData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  categoryColor: string;
  readTime: number;
  publishedAt: string;
  views?: number;
  featured?: boolean;
  author?: {
    name: string;
    avatar?: string;
  };
}

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  green: { bg: 'bg-green-100', text: 'text-green-700' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  red: { bg: 'bg-red-100', text: 'text-red-700' },
};

interface FeaturedArticleProps {
  article: ArticleData;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const colors = colorMap[article.categoryColor] || colorMap.slate;
  
  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 max-w-7xl">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
          <span className="w-8 h-px bg-slate-300" />
          Artigo em Destaque
        </div>
        
        <Link href={`/articles/${article.slug}`} className="group block">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow">
            {/* Image */}
            <div className="relative h-64 lg:h-auto lg:min-h-[400px] bg-slate-200 overflow-hidden">
              {article.coverImage ? (
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                  <span className="text-white/30 text-6xl font-bold">CAD</span>
                </div>
              )}
              {/* Overlay badge */}
              <div className="absolute top-4 left-4">
                <span className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide',
                  colors.bg, colors.text
                )}>
                  {article.category}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min de leitura
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishedAt).toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>
              
              {article.views && (
                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-6">
                  <Eye className="w-4 h-4" />
                  {article.views.toLocaleString('pt-BR')} visualizações
                </div>
              )}
              
              <div className="mt-auto">
                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                  Ler artigo completo
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
