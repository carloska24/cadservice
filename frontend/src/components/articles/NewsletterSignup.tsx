'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus('success');
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-linear-to-br from-primary to-blue-700 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5" />
        <h3 className="font-bold">Newsletter Técnica</h3>
      </div>
      
      <p className="text-sm text-blue-100 mb-4 leading-relaxed">
        Receba insights mensais sobre manufatura eletrônica, tendências e melhores práticas diretamente no seu e-mail.
      </p>
      
      {status === 'success' ? (
        <div className="flex items-center gap-2 py-3 text-green-200">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Inscrito com sucesso!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-11 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full h-11 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Inscrevendo...
              </>
            ) : (
              'Inscrever-se'
            )}
          </button>
        </form>
      )}
      
      <p className="text-xs text-blue-200 mt-3">
        Sem spam. Cancelamento a qualquer momento.
      </p>
    </div>
  );
}
