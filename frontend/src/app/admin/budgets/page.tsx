"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  Loader2,
  RefreshCw,
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";
import BudgetDetailModal from "@/components/admin/BudgetDetailModal";
import { authStorage, getAuthHeaders } from "@/lib/auth";
import { API_URL } from "@/lib/api";

interface BudgetSummary {
  id: string;
  requesterName: string;
  requesterEmail: string;
  company: string;
  createdAt: string;
  status: string;
}

const STATUS_CONFIG = {
  NEW: { label: "Novo", icon: <AlertCircle className="w-4 h-4" />, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  PENDING: { label: "Pendente", icon: <Clock className="w-4 h-4" />, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  APPROVED: { label: "Aprovado", icon: <CheckCircle2 className="w-4 h-4" />, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  REJECTED: { label: "Recusado", icon: <AlertCircle className="w-4 h-4" />, color: "bg-red-500/10 text-red-500 border-red-500/20" },
};

export default function AdminBudgetsPage() {
  const [budgets, setBudgets] = useState<BudgetSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBudget, setSelectedBudget] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchBudgets = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await fetch(`${API_URL}/api/admin/v1/budget-requests`, {
        headers: getAuthHeaders()
      });

      if (res.status === 401) {
        authStorage.removeToken();
        router.push("/admin/login");
        return;
      }

      const result = await res.json();
      setBudgets(result.data || []);
    } catch (error) {
      console.error("Failed to fetch budgets:", error);
      setError("Falha ao comunicar com o servidor. Verifique se o backend está rodando.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!authStorage.isAuthenticated()) {
      router.push("/admin/login");
    } else {
      fetchBudgets();
    }
  }, [fetchBudgets, router]);

  const handeViewDetails = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/v1/budget-requests/${id}`, {
        headers: getAuthHeaders()
      });

      if (res.status === 401) {
        authStorage.removeToken();
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      setSelectedBudget(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch budget details:", error);
    }
  };

  const handleLogout = () => {
    authStorage.removeToken();
    router.push("/admin/login");
  };

  const filteredBudgets = budgets.filter(b => 
    b.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Gestão de Orçamentos
              </h1>
              <p className="text-sm text-slate-500 font-medium">B2B Sales Operations Control</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Pesquisar..."
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-[240px] focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={fetchBudgets}
              title="Atualizar"
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-50 transition-all shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1" />
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all shadow-lg active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              SAIR
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin opacity-50" />
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Sincronizando Dados...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-4">
              <AlertCircle className="w-12 h-12 text-red-400" />
              <div>
                <p className="text-slate-900 font-bold">Erro de Conexão</p>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">{error}</p>
              </div>
              <button 
                 onClick={fetchBudgets}
                 className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all"
              >
                TENTAR NOVAMENTE
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-mono">Request ID</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer / Entity</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-mono">Registry Date</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBudgets.length > 0 ? filteredBudgets.map((budget) => (
                    <motion.tr 
                      key={budget.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handeViewDetails(budget.id)}
                      className="hover:bg-primary/[0.02] transition-colors group cursor-pointer"
                    >
                      <td className="px-8 py-5 text-xs font-mono text-slate-400 font-bold">
                        #{budget.id.split('-')[0]}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{budget.requesterName}</span>
                          <span className="text-[11px] text-slate-500 font-mono tracking-tight">{budget.company}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-xs text-slate-600 font-medium">
                        {new Date(budget.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center">
                          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm ${STATUS_CONFIG[budget.status as keyof typeof STATUS_CONFIG]?.color || "bg-slate-100"}`}>
                            {STATUS_CONFIG[budget.status as keyof typeof STATUS_CONFIG]?.icon}
                            {STATUS_CONFIG[budget.status as keyof typeof STATUS_CONFIG]?.label || budget.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="inline-flex items-center justify-center w-8 h-8 text-slate-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Ver Detalhes">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-32 text-center">
                        <div className="flex flex-col items-center gap-2 opacity-30">
                          <FileText className="w-12 h-12" />
                          <p className="text-xs font-bold uppercase tracking-[0.2em]">Nenhum registro encontrado</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
           <p>Secure Admin Tunnel v1.0.2</p>
           <p>Encrypted Session active</p>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <BudgetDetailModal 
          budget={selectedBudget} 
          onClose={(refresh) => {
            setIsModalOpen(false);
            if (refresh) fetchBudgets();
          }} 
        />
      )}
    </div>
  );
}
