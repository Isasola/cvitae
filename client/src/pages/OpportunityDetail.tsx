'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Building2, MapPin, Calendar, Briefcase } from 'lucide-react';
import opportunitiesData from '@/data/opportunities.json';
import NotFound from '@/pages/NotFound';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  application_url: string;
  location?: string;
  deadline?: string;
  source?: string;
}

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar la oportunidad en el JSON de datos
    if (opportunitiesData && opportunitiesData.opportunities) {
      const found = opportunitiesData.opportunities.find((opp: any) => opp.id === id);
      if (found) {
        setOpportunity(found as Opportunity);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!opportunity) return <NotFound />;

  // Limpiar descripción para meta-tags (primeros 150 caracteres)
  const metaDescription = opportunity.description 
    ? opportunity.description.replace(/[#*`]/g, '').substring(0, 150) + '...'
    : 'Oportunidad laboral en CVitae Paraguay';

  const hasUrl = !!opportunity.application_url;

  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-20 px-4">
      <Helmet>
        <title>{`${opportunity.title || 'Vacante'} | ${opportunity.company || 'Empresa'} | CVitae Paraguay`}</title>
        <meta name="description" content={metaDescription || 'Oportunidad laboral en CVitae Paraguay'} />
        <meta property="og:title" content={`${opportunity.title || 'Vacante'} en ${opportunity.company || 'Empresa'}`} />
        <meta property="og:description" content={metaDescription || 'Oportunidad laboral en CVitae Paraguay'} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={`${opportunity.title || 'Vacante'} en ${opportunity.company || 'Empresa'}`} />
        <meta name="twitter:description" content={metaDescription || 'Oportunidad laboral en CVitae Paraguay'} />
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
                {opportunity.source || 'Vacante Verificada'}
              </span>
              {opportunity.deadline && opportunity.deadline !== 'N/A' && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Cierra: {new Date(opportunity.deadline).toLocaleDateString()}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {opportunity.title || 'Sin título'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Building2 className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Empresa</p>
                  <p className="font-medium">{opportunity.company || 'Empresa no especificada'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <MapPin className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Ubicación</p>
                  <p className="font-medium">{opportunity.location || 'Paraguay (Remoto/Presencial)'}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none mb-12">
            <div className="flex items-center gap-2 text-white font-bold mb-4 text-xl">
              <Briefcase className="w-5 h-5 text-[#c9a84c]" />
              Descripción del Puesto
            </div>
            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">
              {opportunity.description || 'Descripción no disponible'}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
            <Button
              size="lg"
              disabled={!hasUrl}
              onClick={() => hasUrl && window.open(opportunity.application_url, '_blank')}
              className={`flex-1 ${hasUrl ? 'bg-gradient-to-r from-[#c9a84c] to-[#d4b85f]' : 'bg-gray-800'} text-black font-bold py-7 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {hasUrl ? 'Aplicar en la fuente original' : 'URL no disponible'}
              {hasUrl && <ExternalLink className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(`https://wa.me/595992954169?text=Hola! Me interesa la vacante de ${opportunity.title || 'esta vacante'} en ${opportunity.company || 'esta empresa'}. Quisiera optimizar mi CV para esta postulación.`, '_blank')}
              className="border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10 py-7 rounded-2xl text-lg px-8"
            >
              Optimizar mi CV para este puesto
            </Button>
          </div>
          
          <p className="text-center text-gray-500 text-xs mt-8 italic">
            Al hacer clic en "Aplicar", serás redirigido al sitio web oficial de la empresa o portal de empleo.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
