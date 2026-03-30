'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ArrowRight, KeyRound, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { RecruitersPanel } from '@/components/RecruitersPanel';

type AccessState = 'gate' | 'validating' | 'free' | 'pro' | 'invalid';

export default function RecruitersInterface() {
  const [, setLocation] = useLocation();
  const [accessState, setAccessState] = useState<AccessState>('gate');
  const [tokenInput, setTokenInput] = useState('');
  const [tokenError, setTokenError] = useState('');

  useEffect(() => {
    document.title = 'CVitae | Panel de Reclutadores';
  }, []);

  const handleFreeAccess = () => {
    setAccessState('free');
  };

  const handleValidateToken = async () => {
    if (!tokenInput.trim()) {
      setTokenError('Ingresá tu token de acceso.');
      return;
    }
    setAccessState('validating');
    setTokenError('');

    try {
      const res = await fetch('/.netlify/functions/validate-recruiter-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenInput.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.valid) {
        setAccessState('pro');
      } else {
        setTokenError(data.message || 'Token inválido o vencido.');
        setAccessState('gate');
      }
    } catch {
      // Si la función falla, modo free como fallback
      setTokenError('No se pudo validar el token. Podés continuar en modo gratuito.');
      setAccessState('gate');
    }
  };

  // GATE — pantalla de acceso
  if (accessState === 'gate' || accessState === 'validating') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#d4b85f] mb-4">
              <KeyRound className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Panel de Reclutadores</h1>
            <p className="text-gray-400">Análisis masivo de CVs con IA</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
            {/* Token Input */}
            <div>
              <label className="block text-sm font-medium text-[#c9a84c] mb-2">
                Token de Acceso Pro
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => {
                  setTokenInput(e.target.value);
                  setTokenError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleValidateToken()}
                placeholder="CVT-XXXXXXXXXXXX"
                className="w-full px-4 py-3 bg-black/40 border border-[#c9a84c]/30 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c] transition-colors"
                disabled={accessState === 'validating'}
              />
              {tokenError && (
                <div className="flex items-center gap-2 mt-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{tokenError}</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleValidateToken}
              disabled={accessState === 'validating'}
              className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold py-3 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {accessState === 'validating' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Validando...
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  Acceder con Token
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#0a0a0a] text-gray-500">o</span>
              </div>
            </div>

            <Button
              onClick={handleFreeAccess}
              variant="outline"
              className="w-full border-white/20 text-gray-300 hover:border-[#c9a84c]/40 hover:text-[#c9a84c] flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Continuar en Modo Gratuito
              <span className="text-xs text-gray-500">(hasta 3 CVs)</span>
            </Button>

            <p className="text-xs text-gray-600 text-center">
              ¿No tenés token?{' '}
              <a
                href="https://wa.me/595992954169?text=Quiero%20acceso%20Pro%20al%20Panel%20de%20Reclutadores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a84c] hover:underline"
              >
                Contactanos por WhatsApp
              </a>
            </p>
          </div>

          <button
            onClick={() => setLocation('/')}
            className="mt-6 w-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  // PANEL — acceso concedido
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Panel de Reclutadores</h1>
            <div className="flex items-center gap-2 mt-1">
              {accessState === 'pro' ? (
                <span className="flex items-center gap-1 text-sm text-[#c9a84c]">
                  <Unlock className="w-3 h-3" /> Acceso Pro — CVs ilimitados
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm text-gray-400">
                  <Lock className="w-3 h-3" /> Modo Gratuito — hasta 3 CVs
                </span>
              )}
            </div>
          </div>
          <Button
            onClick={() => setAccessState('gate')}
            variant="outline"
            size="sm"
            className="border-white/20 text-gray-400 hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
          >
            Cerrar sesión
          </Button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <RecruitersPanel maxCVs={accessState === 'pro' ? 10 : 3} />
        </div>
      </div>
    </div>
  );
}
