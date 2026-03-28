'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JobsMarquee } from '@/components/ui/jobs-marquee';
import { TestimonialsGrid } from '@/components/ui/testimonials-grid';
import { CVAnalyzer } from '@/components/ui/cv-analyzer';
import { useLocation } from 'wouter';

const WA_NUMBER = '595992954169';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="w-full bg-black">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-block">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#c9a84c] to-[#e8d4a0] bg-clip-text text-transparent">
                CVitae
              </h1>
              <p className="text-[#c9a84c] text-lg font-semibold mt-2">
                Estrategia de Perfil Elite
              </p>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Tu perfil profesional optimizado para{' '}
              <span className="text-[#c9a84c]">539 oportunidades verificadas</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Metodología de reclutamiento que transforma tu CV en una herramienta de
              impacto. Logra que te llamen a la entrevista.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-semibold hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all"
            >
              Diagnóstico Gratuito
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10"
            >
              Ver Planes
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-[#c9a84c]">539+</p>
              <p className="text-sm text-gray-400">Oportunidades</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#c9a84c]">98%</p>
              <p className="text-sm text-gray-400">Éxito</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#c9a84c]">24h</p>
              <p className="text-sm text-gray-400">Entrega</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== JOBS MARQUEE SECTION ==================== */}
      <section className="py-16 border-t border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Oportunidades en Movimiento
          </motion.h2>
          <JobsMarquee />
        </div>
      </section>

      {/* ==================== CV ANALYZER SECTION (Diagnóstico) ==================== */}
      <CVAnalyzer />

      {/* ==================== BENEFITS SECTION ==================== */}
      <section className="py-20 border-t border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Por Qué CVitae
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Metodología basada en comportamiento real de reclutadores',
              'Indicadores de competencia específicos por sector',
              'Optimización para sistemas de selección actuales',
              'Garantía de visibilidad en los primeros 6 segundos',
              'Soporte personalizado en cada paso',
              'Resultados medibles en 30 días',
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start gap-4"
              >
                <CheckCircle className="w-6 h-6 text-[#c9a84c] flex-shrink-0 mt-1" />
                <p className="text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRICING SECTION ==================== */}
      <section className="py-20 border-t border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Planes y Precios
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Diagnóstico',
                price: 'Gratis',
                description: 'Análisis inicial de tu perfil',
                features: [
                  'Evaluación de visibilidad',
                  'Identificación de gaps',
                  'Reporte en 20 minutos',
                ],
                highlighted: false,
              },
              {
                name: 'Plan Pro Plus',
                price: '₲50.000',
                description: 'Optimización completa',
                features: [
                  'CV Digital optimizado',
                  'Carta de presentación',
                  'Kit de entrevista',
                  'Mensajes LinkedIn',
                  'Entrega en 30 minutos',
                ],
                highlighted: true,
              },
              {
                name: 'Portafolio Web',
                price: '₲120.000',
                description: 'Solución premium',
                features: [
                  'Todo del Plan Pro Plus',
                  'Página web personal',
                  'Dominio personalizado',
                  'Hosting incluido',
                  'Entrega en 48 horas',
                ],
                highlighted: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-lg border ${
                  plan.highlighted
                    ? 'border-[#c9a84c] bg-gradient-to-br from-slate-900/80 to-slate-800/80'
                    : 'border-[#c9a84c]/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50'
                }`}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#c9a84c]">
                      {plan.price}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-[#c9a84c]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={
                      plan.highlighted
                        ? 'w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-semibold'
                        : 'w-full border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10'
                    }
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Elegir Plan
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-20 border-t border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <TestimonialsGrid />
        </div>
      </section>

      {/* ==================== FINAL CTA SECTION ==================== */}
      <section className="py-20 border-t border-[#c9a84c]/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu carrera?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Comienza con un diagnóstico gratuito. En 20 minutos sabrás exactamente
            qué te falta para ser visible a los reclutadores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-semibold hover:shadow-lg hover:shadow-[#c9a84c]/30"
            >
              Solicitar Diagnóstico
            </Button>
            <a href={WA_BASE} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 w-full"
              >
                +595 992 954 169
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-[#c9a84c]/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-[#c9a84c] font-bold mb-4">CVitae</h4>
              <p className="text-gray-400 text-sm">
                Estrategia de Perfil Elite para profesionales que buscan impacto.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => setLocation('/')} className="hover:text-[#c9a84c] transition-colors">
                    Planes
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-[#c9a84c] transition-colors">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#c9a84c] transition-colors">
                    Testimonios
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href={WA_BASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:cpdparaguay@gmail.com" className="hover:text-[#c9a84c] transition-colors">
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/cvitae.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Redes Sociales</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61580756714500"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/cvitae.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@cvitae.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#c9a84c]/10 pt-8 text-center text-gray-500 text-sm">
            <p>© 2026 CVitae. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
