import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ArticleData } from './FeaturedArticle';

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  green: { bg: 'bg-green-100', text: 'text-green-700' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  red: { bg: 'bg-red-100', text: 'text-red-700' },
};

interface ArticleCardProps {
  article: ArticleData;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const colors = colorMap[article.categoryColor] || colorMap.slate;
  
  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <article className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all">
        {/* Cover Image */}
        <div className="relative h-48 bg-slate-200 overflow-hidden">
          {article.coverImage ? (
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <span className="text-white/20 text-4xl font-bold">CAD</span>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              'px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm',
              colors.bg, colors.text
            )}>
              {article.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime} min
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.publishedAt).toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'short' 
              })}
            </span>
            {article.views && (
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {article.views >= 1000 
                  ? `${(article.views / 1000).toFixed(1)}K` 
                  : article.views}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
            {article.excerpt}
          </p>
          
          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <span className="text-primary font-medium text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Ler artigo
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
