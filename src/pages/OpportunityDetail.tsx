'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Building2, MapPin, Calendar, Briefcase, Share2, Copy, Check, Sparkles, Tag, Lightbulb } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import NotFound from '@/pages/NotFound';
import { TetrisLoader } from '@/components/ui/tetris-loader';

interface Opportunity {
  id: string;
  titulo: string;
  slug: string;
  cuerpo: string;
  categoria: string;
  imagen_url: string;
  fecha_vencimiento: string;
  created_at: string;
  tipo: 'blog' | 'oportunidad';
  ubicacion: string;
  is_active: boolean;
  metadata?: {
    application_url?: string;
    organization?: string;
    location?: string;
    value?: string;
    tags?: string[];
    source?: string;
  };
}

const WA_NUMBER = '595992954169';

// Función para convertir URLs planas en enlaces Markdown
const linkify = (text: string): string => {
  if (!text) return text;
  const urlRegex = /(\bhttps?:\/\/[^\s<]+)/gi;
  return text.replace(urlRegex, '[$1]($1)');
};

export default function OpportunityDetail() {
  const { id: slug } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const { data, error } = await supabase
          .from('content_hub')
          .select('slug, titulo, cuerpo, categoria, imagen_url, fecha_vencimiento, created_at, tipo, ubicacion, is_active, metadata')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (data && typeof data.metadata === 'string') {
          try {
            data.metadata = JSON.parse(data.metadata);
          } catch (e) {
            console.warn('Error parseando metadata:', e);
            data.metadata = {};
          }
        }

        if (error) throw error;
        setOpportunity(data);
      } catch (err) {
        console.error('Error fetching opportunity:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchOpportunity();
  }, [slug]);

  // Actualizar metadatos del documento manualmente
  useEffect(() => {
    if (!opportunity) return;

    const title = `${opportunity.titulo || 'Vacante'} | CVitae Paraguay`;
    const metaDescription = opportunity.cuerpo
      ? opportunity.cuerpo.replace(/[#*`]/g, '').substring(0, 150) + '...'
      : 'Oportunidad laboral en CVitae Paraguay';

    document.title = title;

    // Actualizar meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = metaDescription;

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (ogTitle) ogTitle.content = opportunity.titulo || 'Vacante';
    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (ogDesc) ogDesc.content = metaDescription;
    const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    const ogImageUrl = `https://image.thum.io/get/width/1200/crop/800/og/https://cvitae-py.netlify.app/og-image?title=${encodeURIComponent(opportunity.titulo)}&company=${encodeURIComponent(opportunity.metadata?.organization || 'Empresa')}`;
    if (ogImage) ogImage.content = ogImageUrl;

    // Twitter Card
    const twitterImage = document.querySelector('meta[property="twitter:image"]') as HTMLMetaElement;
    if (twitterImage) twitterImage.content = ogImageUrl;

    // Schema.org JobPosting
    const applicationUrl = opportunity.metadata?.application_url;
    const organization = opportunity.metadata?.organization || 'Empresa';
    const locationParts = opportunity.ubicacion?.split(',').map(s => s.trim()) || ['Paraguay'];
    const city = locationParts[0] || 'Paraguay';
    const region = locationParts[1] || '';

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: opportunity.titulo,
      description: opportunity.cuerpo?.substring(0, 5000),
      datePosted: opportunity.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      validThrough: opportunity.fecha_vencimiento?.split('T')[0],
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: organization,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: city,
          addressRegion: region,
          addressCountry: 'PY',
        },
      },
      directApply: !!applicationUrl,
      url: window.location.href,
    };

    // Eliminar script anterior si existe
    const existingScript = document.querySelector('script[data-schema="jobposting"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'jobposting');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Limpiar al desmontar
    return () => {
      const scriptToRemove = document.querySelector('script[data-schema="jobposting"]');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [opportunity]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Oportunidad laboral: ${opportunity?.titulo} en ${opportunity?.metadata?.organization || 'empresa'}. Más info en CVitae: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <TetrisLoader size="lg" text="Cargando oportunidad..." />
      </div>
    );
  }

  if (!opportunity) return <NotFound />;

  const applicationUrl = opportunity.metadata?.application_url;
  const hasValidLink = applicationUrl && applicationUrl.trim() !== '';
  const tags = opportunity.metadata?.tags || [];
  const organization = opportunity.metadata?.organization || 'Empresa líder';

  // Procesar el cuerpo para convertir URLs en enlaces Markdown
  const processedCuerpo = linkify(opportunity.cuerpo || 'Descripción no disponible');

  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <button
          onClick={() => setLocation('/opportunities')}
          className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a oportunidades
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA PRINCIPAL (IZQUIERDA) */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8 md:p-10 shadow-2xl">
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c9a84c] px-3 py-1 bg-[#c9a84c]/10 rounded-full border border-[#c9a84c]/20">
                    {opportunity.categoria || 'Vacante Verificada'}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Vence: {new Date(opportunity.fecha_vencimiento).toLocaleDateString()}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {opportunity.titulo || 'Sin título'}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Building2 className="w-5 h-5 text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold">Empresa</p>
                      <p className="font-medium">{organization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <MapPin className="w-5 h-5 text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold">Ubicación</p>
                      <p className="font-medium">{opportunity.ubicacion || 'Paraguay (Remoto/Presencial)'}</p>
                    </div>
                  </div>
                </div>
              </header>

              {opportunity.imagen_url && (
                <div className="aspect-video overflow-hidden rounded-xl mb-10 border border-white/10">
                  <img src={opportunity.imagen_url} alt={opportunity.titulo} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="prose prose-invert max-w-none mb-12">
                <div className="flex items-center gap-2 text-white font-bold mb-4 text-xl">
                  <Briefcase className="w-5 h-5 text-[#c9a84c]" />
                  Descripción y Detalles
                </div>
                <div className="text-gray-300 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">
                  <p className="text-[#c9a84c] text-sm mb-4 italic">
                    CVitae te ayuda a postularte a esta vacante con un CV optimizado para filtros ATS.
                  </p>
                  <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                    {processedCuerpo}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
                {hasValidLink && (
                  <Button
                    size="lg"
                    onClick={() => window.open(applicationUrl, '_blank', 'noopener,noreferrer')}
                    className="flex-1 bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold py-7 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    Postularse a esta vacante
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(
                    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola! Quiero mejorar mi CV para la oportunidad: ${opportunity.titulo}`)}`,
                    '_blank'
                  )}
                  className={`border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 py-7 rounded-2xl text-lg px-8 ${!hasValidLink ? 'flex-1' : ''}`}
                >
                  Mejorar mi CV para esta oportunidad
                </Button>
              </div>

              <p className="text-center text-gray-400 text-xs mt-8 italic">
                Esta oportunidad es gestionada a través de CVitae Paraguay.
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA (WIDGETS 2030) */}
          <div className="space-y-6">
            {/* Widget 1: Analizar CV para este puesto */}
            <div className="bg-gradient-to-br from-[#c9a84c]/20 to-transparent border border-[#c9a84c]/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-white text-lg">Optimiza tu CV</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Analiza tu CV específicamente para este puesto y obtén recomendaciones personalizadas.
              </p>
              <Button
                onClick={() => setLocation(`/?job=${encodeURIComponent(opportunity.titulo)}`)}
                className="w-full bg-[#c9a84c] text-black font-bold hover:bg-[#d4b85f]"
              >
                🎯 Analizar mi CV para este puesto
              </Button>
            </div>

            {/* Widget 2: Habilidades clave */}
            {tags.length > 0 && (
              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-[#c9a84c]" />
                  <h3 className="font-bold text-white">Habilidades clave</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 8).map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Widget 3: Consejos para postular */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-white">Consejos para postular</h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 list-disc pl-4">
                <li>Adaptá tu CV con las palabras clave de la descripción.</li>
                <li>Investigá la empresa antes de la entrevista.</li>
                <li>Prepará ejemplos concretos de tus logros.</li>
                <li>Revisá tu perfil de LinkedIn antes de postular.</li>
              </ul>
            </div>

            {/* Widget 4: Compartir oportunidad */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-white">Compartir</h3>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="flex-1 border-white/20 text-gray-300 hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="ml-2">{copied ? 'Copiado' : 'Copiar enlace'}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareWhatsApp}
                  className="flex-1 border-white/20 text-gray-300 hover:text-white"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="ml-2">WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
