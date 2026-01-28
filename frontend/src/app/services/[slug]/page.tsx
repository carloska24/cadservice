
import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  features?: string[]; // Assuming features might exist or fallback
  icon?: string;
}

async function getService(slug: string) {
  try {
    const res = await fetchAPI<{ data: ServiceDetail }>(`/api/public/v1/services/${slug}`);
    return res?.data;
  } catch (error) {
    console.error(`Failed to fetch service ${slug}:`, error);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Link>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{service.title}</h1>
            <div className="prose prose-slate max-w-none text-slate-600 text-lg">
               {/* description might be html or markdown, simplistic rendering for now */}
               {service.description.split('\n').map((paragraph, idx) => (
                 <p key={idx} className="mb-4">{paragraph}</p>
               ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="rounded-lg border bg-muted/30 p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4 text-slate-900">Why Choose This Service?</h3>
              <ul className="space-y-3">
                 <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                    <span className="text-sm text-slate-700">Expert Engineering Team</span>
                 </li>
                 <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                    <span className="text-sm text-slate-700">High Precision Deliverables</span>
                 </li>
                 <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                    <span className="text-sm text-slate-700">Satisfaction Guaranteed</span>
                 </li>
              </ul>
              <div className="mt-8">
                 <Link href="/contact" className="block w-full text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                    Request a Quote
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
