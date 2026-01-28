
import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import { ArrowRight, Calendar } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
}

async function getArticles() {
  try {
    const res = await fetchAPI<{ data: Article[] }>('/api/public/v1/articles');
    return res?.data || [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Latest Articles</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Insights, updates, and technical resources from our experts.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {articles.map((article) => (
              <div key={article.id} className="group flex flex-col justify-between rounded-lg border bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
                {article.coverImage && (
                  <div className="h-48 w-full bg-slate-200">
                    {/* Real implementation would accept optimized image here */}
                    <img src={article.coverImage} alt={article.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                   <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                   </div>
                   <h3 className="font-bold text-xl mb-3 text-slate-900 leading-tight group-hover:text-primary transition-colors">
                     <Link href={`/articles/${article.slug}`}>
                       {article.title}
                     </Link>
                   </h3>
                   <p className="text-slate-600 line-clamp-3 mb-4 text-sm flex-1">{article.excerpt}</p>
                   
                   <div className="mt-auto pt-4 border-t border-slate-100">
                      <Link href={`/articles/${article.slug}`} className="text-primary font-medium text-sm flex items-center hover:underline">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                   </div>
                </div>
              </div>
            ))}
            {articles.length === 0 && <p className="text-center col-span-full text-muted-foreground">No articles found.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
