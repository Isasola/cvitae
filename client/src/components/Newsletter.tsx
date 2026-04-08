import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface NewsletterProps {
  source?: string;
  title?: string;
}

export default function Newsletter({ source = 'home', title = 'Recibí alertas de IA' }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, source, created_at: new Date().toISOString() }]);

      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-2xl p-8 max-w-2xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 text-sm">
        Suscribite para recibir las mejores vacantes filtradas por IA directamente en tu correo.
      </p>
      
      {status === 'success' ? (
        <div className="text-[#c9a84c] font-bold animate-pulse">
          ¡Gracias! Ya estás en la lista elite.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="flex-grow bg-black border border-[#c9a84c]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c9a84c] transition"
          />
          <Button 
            type="submit" 
            disabled={status === 'loading'}
            className="bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold"
          >
            {status === 'loading' ? 'Enviando...' : 'Suscribirme'}
          </Button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-2">Ocurrió un error. Intentá de nuevo.</p>
      )}
    </div>
  );
}
