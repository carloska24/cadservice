
import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";

interface ArticleDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
  author?: { fullName: string };
}

async function getArticle(slug: string) {
  try {
    const res = await fetchAPI<{ data: ArticleDetail }>(`/api/public/v1/articles/${slug}`);
    return res?.data;
  } catch (error) {
    console.error(`Failed to fetch article ${slug}:`, error);
    return null;
  }
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
         <div className="max-w-3xl mx-auto">
            <Link href="/articles" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">{article.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
               <div className="flex items-center">
                  <Calendar className="mr-1.5 h-4 w-4" /> 
                  {new Date(article.publishedAt).toLocaleDateString()}
               </div>
               {article.author && (
                 <div>By <span className="font-medium text-slate-900">{article.author.fullName}</span></div>
               )}
            </div>

            {article.coverImage && (
              <div className="mb-10 rounded-lg overflow-hidden border">
                 <img src={article.coverImage} alt={article.title} className="w-full h-auto" />
              </div>
            )}

            <div className="prose prose-lg prose-slate max-w-none text-slate-800">
               {/* Content - simplistic split for now, real app would use a markdown renderer */}
               {article.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
               ))}
            </div>

            {article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                   {article.tags.map(tag => (
                     <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                       <Tag className="mr-1.5 h-3 w-3" /> {tag}
                     </span>
                   ))}
                </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
