'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import Newsletter from '@/components/Newsletter.tsx';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import { TestimonialsGrid } from '@/components/ui/testimonials-grid';
import RecruitersPromo from '@/components/RecruitersPromo';
import { CVAnalyzer } from '@/components/ui/cv-analyzer';

const WA_NUMBER = '595992954169';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function Home() {
  const [, setLocation] = useLocation();
  const [opportunitiesCount, setOpportunitiesCount] = useState(539);
  const [latestOpportunities, setLatestOpportunities] = useState<any[]>([]);
  const [loadingOpps, setLoadingOpps] = useState(true);

  useEffect(() => {
    const fetchStatsAndOpps = async () => {
      try {
        const { count, error: countError } = await supabase
          .from('content_hub')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)
          .gte('fecha_vencimiento', new Date().toISOString());
        
        if (!countError && count !== null) {
          setOpportunitiesCount(500 + count);
        }

        const { data: opps, error: oppsError } = await supabase
          .from('content_hub')
          .select('*')
          .eq('is_active', true)
          .eq('tipo', 'oportunidad')
          .gte('fecha_vencimiento', new Date().toISOString())
          .order('fecha_vencimiento', { ascending: true })
          .limit(3);

        if (!oppsError && opps) {
          setLatestOpportunities(opps);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoadingOpps(false);
      }
    };

    fetchStatsAndOpps();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c9a84c]/30">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', letterSpacing: '-0.02em', color: '#c9a84c' }}>
              <span style={{ fontWeight: 900 }}>CV</span>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>itae</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLocation('/opportunities')} className="text-sm text-[#c9a84c] font-semibold">Oportunidades</button>
            <button onClick={() => setLocation('/recruiters/interface')} className="text-sm bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black px-4 py-2 rounded-lg font-semibold">Panel Reclutadores</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#c9a84c]/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Tu Carrera en <span className="text-[#c9a84c]">Elite</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                No somos una agencia de empleos. Somos el puente entre tu potencial y las mejores empresas de Paraguay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setLocation('/opportunities')}
                  className="bg-[#c9a84c] text-black font-bold px-8 py-6 text-lg rounded-xl hover:bg-[#b39540] transition-all"
                >
                  Ver Oportunidades ({opportunitiesCount})
                </Button>
                <Button 
                  onClick={() => {
                    const el = document.getElementById('cv-analyzer');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="outline" 
                  className="border-[#c9a84c] text-[#c9a84c] font-bold px-8 py-6 text-lg rounded-xl hover:bg-[#c9a84c]/10 transition-all"
                >
                  Analizar mi CV Gratis
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 border-y border-[#c9a84c]/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Oportunidades', value: `${opportunitiesCount}+` },
              { label: 'Candidatos Elite', value: '1.2k+' },
              { label: 'Empresas Top', value: '85+' },
              { label: 'Tasa de Éxito', value: '92%' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST OPPORTUNITIES PREVIEW */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Últimas Vacantes Verificadas</h2>
            <button 
              onClick={() => setLocation('/opportunities')}
              className="text-[#c9a84c] font-semibold flex items-center gap-2 hover:underline"
            >
              Ver todas <ArrowRight size={16} />
            </button>
          </div>

          {loadingOpps ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestOpportunities.map((opp, i) => (
                <motion.div
                  key={opp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setLocation(`/opportunities/${opp.slug}`)}
                  className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:border-[#c9a84c]/30 transition-all cursor-pointer group"
                >
                  <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-widest mb-2 block">{opp.categoria}</span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c9a84c] transition-colors">{opp.titulo}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <MapPin size={14} /> {opp.ubicacion}
                  </div>
                  <div className="text-gray-400 text-sm line-clamp-2 mb-6">
                    <ReactMarkdown>{opp.cuerpo}</ReactMarkdown>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Vence: {new Date(opp.fecha_vencimiento).toLocaleDateString()}</span>
                    <ArrowRight size={18} className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== CV ANALYZER SECTION ==================== */}
      <section id="cv-analyzer" className="py-20 border-t border-[#c9a84c]/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Diagnóstico Gratuito de tu CV
          </motion.h2>
          <CVAnalyzer />
        </div>
      </section>

      {/* WHY CVITAE SECTION */}
      <section className="py-20 border-t border-[#c9a84c]/10 bg-[#0a0a0a]">
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
      <section id="pricing" className="py-20 border-t border-[#c9a84c]/10">
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
                name: 'Plan Elite',
                price: '₲150.000',
                description: 'Acompañamiento total',
                features: [
                  'Todo lo del Plan Pro',
                  'Simulacro de entrevista',
                  'Optimización de LinkedIn',
                  'Seguimiento por 30 días',
                ],
                highlighted: false,
              },
            ].map((plan, index) => (
              <div key={index} className={`flex flex-col h-full rounded-2xl border bg-[#0a0a0a] p-0 ${plan.highlighted ? 'border-[#c9a84c] shadow-lg shadow-[#c9a84c]/20' : 'border-white/10'}`}>
                <div className="p-8 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-[#c9a84c]">{plan.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-8">{plan.description}</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-[#c9a84c]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0">
                  <Button
                    onClick={() => window.open(`${WA_BASE}?text=Hola! Me interesa el ${plan.name}`, '_blank')}
                    className={`w-full ${plan.highlighted ? 'bg-[#c9a84c] text-black hover:bg-[#b89740]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    Comenzar Ahora
                  </Button>
                </div>
              </div>
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
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Casos de Éxito
          </motion.h2>
          <TestimonialsGrid />
        </div>
      </section>

      {/* ==================== RECRUITERS PROMO ==================== */}
      <RecruitersPromo />

      {/* ==================== CONTACT SECTION ==================== */}
      <section className="py-20 border-t border-[#c9a84c]/10 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-3xl border border-[#c9a84c]/20 bg-black/40 backdrop-blur-sm mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">¿Listo para el siguiente nivel?</h2>
            <p className="text-xl text-gray-300 mb-10">
              No dejes tu carrera al azar. Obtené un perfil que los reclutadores no puedan ignorar.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="text-left">
                <p className="text-gray-300 text-sm mb-4 font-medium">¿Dudas? Hablá directamente con un asesor</p>
                <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9a84c]/40 transition-all duration-300 hover:scale-105 transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.116-4.797 5.864-4.797 10.6 0 5.192 1.892 9.957 5.288 12.3a9.723 9.723 0 005.175 1.654h.006c5.487 0 9.968-4.506 9.968-10.007C22.04 9.93 17.55 6.979 12.051 6.979z"/>
                  </svg>
                  Contactar por WhatsApp
                </a>
                <p className="text-gray-400 text-xs mt-3">Respuesta inmediata</p>
              </div>
            </div>
          </motion.div>

          <Newsletter source="home" title="Recibí oportunidades en tu email" />
        </div>
      </section>

    </div>
  );
}

// Missing icon imports
import { MapPin, ArrowRight } from 'lucide-react';
