'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, MapPin, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, useSearchParams } from 'wouter';
import Newsletter from '@/components/Newsletter.tsx';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import { TestimonialsGrid } from '@/components/ui/testimonials-grid';
import { RecruitersPromo } from '@/components/RecruitersPromo';
import { CVAnalyzer } from '@/components/ui/cv-analyzer';

const WA_NUMBER = '595992954169';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchParams] = useSearchParams();
  const jobFromUrl = searchParams.get('job') || '';

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

      {/* STICKY SOCIAL PROOF */}
      <div className="fixed bottom-4 left-4 z-50 hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0a0a0a] border border-[#c9a84c]/20 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-gray-300">+500 paraguayos ya consiguieron entrevistas este mes</span>
        </motion.div>
      </div>

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
            <button onClick={() => setLocation('/blog')} className="text-sm text-gray-400 hover:text-[#c9a84c] transition-colors font-semibold">Blog</button>
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
                ¿Por qué no te llaman? <br />
                <span className="text-[#c9a84c]">Tu CV es invisible.</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Analiza tu CV y descubre oportunidades globales que aumentan tus posibilidades de empleo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    const el = document.getElementById('cv-analyzer');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#c9a84c] text-black font-bold px-8 py-6 text-lg rounded-xl hover:bg-[#b39540] transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                >
                  Analizar mi CV Gratis Ahora
                </Button>
                <Button
                  onClick={() => setLocation('/opportunities')}
                  variant="outline"
                  className="border-[#c9a84c] text-[#c9a84c] font-bold px-8 py-6 text-lg rounded-xl hover:bg-[#c9a84c]/10 transition-all"
                >
                  Ver Vacantes Verificadas
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CV ANALYZER SECTION (SUBIDA) ==================== */}
      <section id="cv-analyzer" className="py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#c9a84c]/5 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Analizador de Impacto IA</h2>
            <p className="text-gray-400">Descubre qué está frenando tu perfil profesional y cómo superarlo.</p>
          </div>
          <CVAnalyzer initialTargetJob={jobFromUrl} />
        </div>
      </section>

      {/* LATEST OPPORTUNITIES PREVIEW */}
      <section className="py-20 bg-[#0a0a0a] border-y border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Oportunidades activas del mercado</h2>
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
                  className="p-6 rounded-2xl border border-white/5 bg-black hover:border-[#c9a84c]/30 transition-all cursor-pointer group"
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

      {/* NEWSLETTER SECTION (SUBIDA CON CORREO VISIBLE) */}
      <section className="py-20 bg-[#0a0a0a] border-t border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4">
          <Newsletter />
          <p className="text-center text-gray-400 text-sm mt-4">
            También podés escribirnos a <a href="mailto:cpdparaguay@gmail.com" className="text-[#c9a84c] hover:underline">cpdparaguay@gmail.com</a>
          </p>
        </div>
      </section>

      {/* ATS ALERT SECTION */}
      <section className="py-16 bg-[#0a0a0a] border-y border-[#c9a84c]/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase">
                <AlertTriangle size={14} /> Realidad del Mercado
              </div>
              <h2 className="text-3xl font-bold text-white">El 75% de los CVs en Paraguay son rechazados por robots.</h2>
              <p className="text-gray-400 text-lg">
                Las empresas grandes usan sistemas ATS para filtrar candidatos. Si tu CV no tiene el formato y las palabras clave correctas, <span className="text-white font-bold">nunca llegará al escritorio de un reclutador.</span>
              </p>
              <p className="text-gray-300 text-base italic">Por eso muchos pierden oportunidades sin saberlo.</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <ShieldCheck className="text-green-500" /> Formato Optimizado para Paraguay
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#0d0d0f] border border-white/5 rounded-2xl p-8 overflow-hidden">
                <div className="flex justify-between mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-red-500">✕</div>
                    <span className="text-xs font-bold text-gray-500 uppercase">CV "Lindo"</span>
                  </div>
                  <div className="h-px bg-white/10 flex-grow mt-6 mx-4"></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-green-500">✓</div>
                    <span className="text-xs font-bold text-[#c9a84c] uppercase">Optimizado</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-400 italic">"No dejes que tu talento sea ignorado por un algoritmo."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 border-b border-[#c9a84c]/10 bg-black">
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

      {/* TESTIMONIALS & FAQ SECTION */}
      <section className="py-24 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Lo que dicen los candidatos elite</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Cientos de profesionales en Paraguay ya transformaron su búsqueda laboral con CVitae.</p>
          </div>

          <TestimonialsGrid />

          {/* FAQ SUB-SECTION */}
          <div className="mt-32 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
              <p className="text-gray-500">Todo lo que necesitas saber sobre el sistema CVitae.</p>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "¿Cómo funciona el análisis de CV?",
                  a: "Nuestra IA procesa tu archivo buscando patrones de lectura ATS y palabras clave que los reclutadores de Paraguay priorizan. Recibís un score de 0 a 100 y una lista de errores críticos en segundos."
                },
                {
                  q: "¿Qué incluye el Plan Pro Plus?",
                  a: "Incluye la corrección total de tu CV por expertos (formato ATS), una lista de Keywords estratégicas para tu rubro, y acceso prioritario a las vacantes que publicamos diariamente."
                },
                {
                  q: "¿Es seguro subir mi CV?",
                  a: "Totalmente. No almacenamos tus datos personales permanentemente. El procesamiento se hace de forma temporal y segura para generar tu diagnóstico."
                },
                {
                  q: "¿Cómo recibo mi CV optimizado?",
                  a: "Una vez realizado el pago, nuestro equipo se contacta con vos vía WhatsApp para entregarte el material final en menos de 24 horas."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:border-[#c9a84c]/20 transition-all">
                  <h3 className="font-bold text-[#c9a84c] mb-2">{item.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECRUITERS B2B PROMO */}
      <RecruitersPromo />

      {/* ==================== PRICING SECTION ==================== */}
      <section id="pricing" className="py-24 border-t border-[#c9a84c]/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Invertí en tu Futuro</h2>
            <p className="text-gray-400">Desbloqueá tu potencial con herramientas de nivel profesional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Diagnóstico',
                price: 'Gratis',
                description: 'Análisis inicial de tu perfil',
                features: [
                  'Evaluación de visibilidad ATS',
                  'Identificación de errores críticos',
                  'Reporte en 60 segundos',
                ],
                highlighted: false,
                cta: 'Empezar Gratis',
                action: () => document.getElementById('cv-analyzer')?.scrollIntoView({ behavior: 'smooth' })
              },
              {
                name: 'Plan Pro Plus',
                price: '₲50.000',
                description: 'Optimización completa y prioritaria',
                features: [
                  'CV Digital optimizado (Aprobado ATS)',
                  'Lista de Palabras Clave Estratégicas',
                  'Guía de Entrevista Personalizada',
                  'Acceso Prioritario a Vacantes',
                ],
                highlighted: true,
                cta: 'Desbloquear Ahora',
                tag: 'PRECIO PROMO 24HS',
                action: () => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola! Quiero el Plan Pro Plus de CVitae por 50.000 Gs.')}`, '_blank')
              },
              {
                name: 'Elite Business',
                price: '₲100.000',
                description: 'Para Reclutadores y Empresas',
                features: [
                  '10 Tokens de Análisis Masivo',
                  'Ranking de Candidatos IA',
                  'Dashboard de Gestión B2B',
                  'Soporte Enterprise',
                ],
                highlighted: false,
                cta: 'Comprar Pack',
                action: () => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola! Quiero el Pack Elite Business de CVitae por 100.000 Gs.')}`, '_blank')
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-3xl border ${
                  plan.highlighted
                    ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[0_0_30px_rgba(201,168,76,0.15)]'
                    : 'border-white/5 bg-black'
                } relative overflow-hidden group`}
              >
                {plan.tag && (
                  <div className="absolute top-4 right-4 bg-[#c9a84c] text-black text-[10px] font-black px-2 py-1 rounded-md">
                    {plan.tag}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Gratis' && <span className="text-gray-500 text-sm">/pago único</span>}
                </div>
                <p className="text-gray-400 text-sm mb-8">{plan.description}</p>
                <div className="space-y-4 mb-10">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm text-gray-300">
                      <Zap size={14} className="text-[#c9a84c]" /> {feature}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={plan.action}
                  className={`w-full py-6 rounded-xl font-bold transition-all ${
                    plan.highlighted
                      ? 'bg-[#c9a84c] text-black hover:bg-[#b39540]'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
