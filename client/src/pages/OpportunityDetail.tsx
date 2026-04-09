'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Building2, MapPin, Calendar, Briefcase } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import NotFound from '@/pages/NotFound';

interface Opportunity {
  id: string;
  titulo: string;
  slug: string;
  cuerpo: string;
  categoria: string;
  imagen_url: string;
  fecha_vencimiento: string;
  tipo: 'blog' | 'oportunidad';
  ubicacion: string;
  is_active: boolean;
}

export default function OpportunityDetail() {
  const { id: slug } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const { data, error } = await supabase
          .from('content_hub')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!opportunity) return <NotFound />;

  const metaDescription = opportunity.cuerpo 
    ? opportunity.cuerpo.replace(/[#*`]/g, '').substring(0, 150) + '...'
    : 'Oportunidad laboral en CVitae Paraguay';

  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-20 px-4">
      <Helmet>
        <title>{`${opportunity.titulo || 'Vacante'} | CVitae Paraguay`}</title>
        <meta name="description" content={metaDescription || 'Oportunidad laboral en CVitae Paraguay'} />
        <meta property="og:title" content={opportunity.titulo || 'Vacante'} />
        <meta property="og:description" content={metaDescription || 'Oportunidad laboral en CVitae Paraguay'} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={opportunity.imagen_url} />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <button
          onClick={() => setLocation('/opportunities')}
          className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a oportunidades
        </button>

        <div className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8 md:p-12 shadow-2xl">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Building2 className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Categoría</p>
                  <p className="font-medium">{opportunity.categoria || 'General'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <MapPin className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Ubicación</p>
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
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{opportunity.cuerpo || 'Descripción no disponible'}</ReactMarkdown>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
            <Button
              size="lg"
              onClick={() => window.open(`https://wa.me/595992954169?text=Hola! Quiero optimizar mi CV para ${opportunity?.titulo || 'esta vacante'}`, '_blank')}
              className="flex-1 bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold py-7 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
            >
              Optimizar mi CV para esta vacante
              <ExternalLink className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(`https://wa.me/595992954169?text=Hola! Me interesa la vacante de ${opportunity.titulo || 'esta vacante'}. Quisiera consultar más detalles.`, '_blank')}
              className="border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 py-7 rounded-2xl text-lg px-8"
            >
              Consultar por WhatsApp
            </Button>
          </div>
          
          <p className="text-center text-gray-500 text-xs mt-8 italic">
            Esta oportunidad es gestionada a través de CVitae Paraguay.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
