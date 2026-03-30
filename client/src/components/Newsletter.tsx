'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsletterProps {
  source?: string;
  title?: string;
}

export default function Newsletter({ 
  source = 'website', 
  title = 'Suscribite a nuestro Newsletter' 
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/.netlify/functions/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Ocurrió un error. Intentá de nuevo.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Error de conexión. Intentá de nuevo.');
    }
  };

  return (
    <div className="w-full p-8 rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 backdrop-blur-sm">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6">
          Recibí consejos de carrera, alertas de empleo y guías exclusivas en tu email.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-2 py-4"
            >
              <CheckCircle className="w-12 h-12 text-green-400" />
              <p className="text-white font-medium">¡Gracias por suscribirte!</p>
              <p className="text-gray-400 text-xs">Revisá tu bandeja de entrada pronto.</p>
              <Button 
                variant="link" 
                onClick={() => setStatus('idle')}
                className="text-[#c9a84c] text-xs"
              >
                Suscribir otro email
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 bg-black/40 border border-[#c9a84c]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a84c] transition-colors disabled:opacity-50"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs px-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{message}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={status === 'loading' || !email}
                className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold py-6 hover:shadow-lg hover:shadow-[#c9a84c]/30 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Unirme ahora
                  </>
                )}
              </Button>
              <p className="text-[10px] text-gray-500">
                Al suscribirte, aceptás nuestra Política de Privacidad. Sin spam, solo valor.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
