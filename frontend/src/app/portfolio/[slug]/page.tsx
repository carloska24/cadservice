
import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

interface ProjectDetail {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  description: string;
  completionDate?: string;
  // relations
  service?: { title: string };
}

async function getProject(slug: string) {
  try {
    const res = await fetchAPI<{ data: ProjectDetail }>(`/api/public/v1/projects/${slug}`);
    return res?.data;
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <Link href="/portfolio" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
        </Link>

        <div className="grid md:grid-cols-3 gap-10">
           <div className="md:col-span-2 space-y-6">
             <div className="flex flex-wrap gap-4 items-center text-sm text-slate-500 mb-2">
                {project.clientName && (
                  <span className="flex items-center">
                    <User className="mr-1.5 h-4 w-4" /> {project.clientName}
                  </span>
                )}
                {project.completionDate && (
                  <span className="flex items-center">
                    <Calendar className="mr-1.5 h-4 w-4" /> {new Date(project.completionDate).toLocaleDateString()}
                  </span>
                )}
             </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900">{project.title}</h1>
            
            <div className="prose prose-slate max-w-none text-slate-600">
               {project.description.split('\n').map((paragraph, idx) => (
                 <p key={idx} className="mb-4">{paragraph}</p>
               ))}
            </div>
           </div>

           <div className="md:col-span-1">
             <div className="rounded-lg border bg-muted/30 p-6">
                <h3 className="font-semibold text-lg mb-4 text-slate-900">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <span className="block text-xs font-semibold uppercase text-slate-500">Service Category</span>
                    <span className="text-slate-900">{project.service?.title || "Engineering"}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-slate-500">Status</span>
                    <span className="text-slate-900">Completed</span>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
