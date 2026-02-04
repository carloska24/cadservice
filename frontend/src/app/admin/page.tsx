"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStorage } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (authStorage.getToken()) {
      router.replace("/admin/budgets");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin opacity-20" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Initializing Secure Session...
        </p>
      </div>
    </div>
  );
}
