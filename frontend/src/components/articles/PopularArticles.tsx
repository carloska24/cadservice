import Link from 'next/link';
import { Eye, TrendingUp } from 'lucide-react';
import type { ArticleData } from './FeaturedArticle';

interface PopularArticlesProps {
  articles: ArticleData[];
}

export function PopularArticles({ articles }: PopularArticlesProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-slate-900">Mais Lidos</h3>
      </div>
      
      <div className="space-y-4">
        {articles.slice(0, 5).map((article, index) => (
          <Link 
            key={article.id} 
            href={`/articles/${article.slug}`}
            className="group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {article.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                <Eye className="w-3 h-3" />
                {article.views?.toLocaleString('pt-BR') || 0}
                <span className="mx-1">·</span>
                <span>{article.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
