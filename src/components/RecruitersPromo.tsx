'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Zap, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export const RecruitersPromo: React.FC = () => {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: Upload,
      title: 'Análisis Masivo',
      description: 'Subida de múltiples archivos en un solo clic',
    },
    {
      icon: Zap,
      title: 'Ranking de Precisión',
      description: 'Clasificación inmediata (Shortlist/Reject)',
    },
    {
      icon: BarChart3,
      title: 'Feedback Detallado',
      description: 'Puntos fuertes y debilidades extraídos con Claude 3.5 Sonnet',
    },
  ];

  return (
    <section className="py-20 border-t border-[#c9a84c]/10 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Lector Inteligente de CVs para Reclutadores
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Optimizá tu proceso de selección analizando lotes de hasta 10 CVs en segundos. 
            Nuestra IA compara cada perfil contra los requisitos del cargo y genera un ranking automático de compatibilidad.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#c9a84c]/50 transition-all duration-300"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 to-[#d4b85f]/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#d4b85f] mb-4"
                  >
                    <Icon className="w-6 h-6 text-black" />
                  </motion.div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative backdrop-blur-xl bg-gradient-to-r from-[#c9a84c]/20 to-[#d4b85f]/10 border border-[#c9a84c]/30 rounded-2xl p-12 text-center overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#c9a84c]/10 to-transparent opacity-0"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Simplifica tu proceso de selección
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Acceso a análisis inteligente de CVs con IA. Reduce tiempo de evaluación, aumenta precisión en contrataciones.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocation('/recruiters/interface')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-[#c9a84c]/40 transition-all text-lg"
            >
              Acceder al Panel de Reclutadores
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-sm text-gray-400 mt-6">
              ✓ Análisis de hasta 10 CVs · ✓ Ranking automático · ✓ Feedback detallado
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruitersPromo;
