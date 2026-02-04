"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'sonner';
import { API_URL } from "@/lib/api";
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Calendar, 
  Paperclip, 
  Download,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2
} from "lucide-react";
import { getAuthHeaders } from "@/lib/auth";

interface Attachment {
  id: string;
  path: string;
  mimeType: string;
  sizeBytes: number;
  signedUrl: string;
}

interface BudgetRequest {
  id: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  company: string;
  projectDescription: string;
  createdAt: string;
  status: string;
  attachments: Attachment[];
}

interface BudgetDetailModalProps {
  budget: BudgetRequest | null;
  onClose: (refresh?: boolean) => void;
}

export default function BudgetDetailModal({ budget, onClose }: BudgetDetailModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!budget) return null;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleStartService = async () => {
    setIsUpdating(true);
    const toastId = toast.loading('Atualizando status...');

    try {
      const res = await fetch(`${API_URL}/api/admin/v1/budget-requests/${budget.id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ 
          status: 'REVIEWED',
          adminNotes: 'Atendimento iniciado pelo painel administrativo.'
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Falha ao atualizar status");
      }

      toast.success('Atendimento iniciado com sucesso!', { id: toastId });
      onClose(true);
    } catch (error: any) {
      console.error("Error starting service:", error);
      toast.error(error.message || 'Erro ao iniciar atendimento. Tente novamente.', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("Tem certeza que deseja recusar este orçamento?")) return;
    
    const toastId = toast.loading('Recusando orçamento...');
    setIsUpdating(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/v1/budget-requests/${budget.id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ 
          status: 'ARCHIVED',
          adminNotes: 'Solicitação recusada pelo admin.'
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Falha ao recusar solicitação");
      }

      toast.success('Orçamento recusado com sucesso.', { id: toastId });
      onClose(true);
    } catch (error: any) {
      console.error("Error rejecting request:", error);
      toast.error(error.message || 'Erro ao recusar solicitação.', { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose()}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden font-sans border border-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 truncate max-w-[400px]">Solicitação #{budget.id.split('-')[0]}</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Calendar className="w-3 h-3" />
                  {formatDate(budget.createdAt)}
                </div>
              </div>
            </div>
            <button 
              onClick={() => onClose()}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto bg-white">
            <div className="p-6 space-y-8">
              
              {/* Customer Info */}
              <section>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Informações do Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem icon={<Building2 className="w-4 h-4" />} label="Empresa" value={budget.company || "Pessoa Física"} />
                  <InfoItem icon={<MapPin className="w-4 h-4" />} label="Contato" value={budget.requesterName} />
                  <InfoItem icon={<Mail className="w-4 h-4" />} label="E-mail" value={budget.requesterEmail} />
                  <InfoItem icon={<Phone className="w-4 h-4" />} label="WhatsApp" value={budget.requesterPhone || "Não informado"} />
                </div>
              </section>

              {/* Project Description */}
              <section className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Descrição do Projeto</h3>
                <p className="text-sm text-slate-700 leading-relaxed italic whitespace-pre-wrap">
                  "{budget.projectDescription}"
                </p>
              </section>

              {/* Attachments - COFRE DIGITAL */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cofre Digital - Anexos</h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <ShieldCheck className="w-3 h-3" />
                    CRIPTOGRAFIA V4 (GCS)
                  </div>
                </div>
                
                <div className="space-y-3">
                  {budget.attachments && budget.attachments.length > 0 ? budget.attachments.map((file) => (
                    <div 
                      key={file.id}
                      className="group flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-white hover:border-primary/30 hover:bg-slate-50/50 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Paperclip className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 leading-none mb-1 truncate max-w-[200px]">
                            {file.path.split('/').pop()}
                          </p>
                          <p className="text-xs text-slate-500">{formatSize(file.sizeBytes)} • {file.mimeType}</p>
                        </div>
                      </div>
                      
                      <a 
                        href={file.signedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-primary transition-all shadow-md active:scale-95"
                      >
                        <Download className="w-3 h-3 text-white" />
                        Download
                      </a>
                    </div>
                  )) : (
                    <div className="p-8 border-2 border-dashed border-slate-100 rounded-xl text-center">
                      <Paperclip className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nenhum arquivo anexado</p>
                    </div>
                  )}

                  {budget.attachments && budget.attachments.length > 0 && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <p className="text-[11px] text-amber-700 leading-tight font-medium">
                        <strong>Link Volátil:</strong> Por segurança, estes links expiram em **60 minutos**. 
                        Se o download falhar, feche e abra este detalhe novamente.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button 
              onClick={handleReject}
              disabled={isUpdating || budget.status === 'ARCHIVED'}
              className="text-[10px] font-black text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest disabled:opacity-30"
            >
              Recusar Solicitação
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => onClose()}
                className="px-5 py-2.5 text-[10px] font-black text-slate-600 hover:bg-slate-200 rounded-lg transition-all uppercase tracking-widest"
              >
                FECHAR
              </button>
              <button 
                onClick={handleStartService}
                disabled={isUpdating || budget.status !== 'PENDING'}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-lg hover:bg-primary transition-all shadow-lg active:scale-95 uppercase tracking-widest disabled:opacity-30"
              >
                {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldCheck className="w-3 h-3" />}
                INICIAR ATENDIMENTO
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
        {icon}
        {label}
      </span>
      <span className="text-sm text-slate-800 font-bold tracking-tight">
        {value}
      </span>
    </div>
  );
}
