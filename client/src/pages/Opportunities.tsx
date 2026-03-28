import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOpportunitiesWithCache, type Opportunity } from '@/services/opportunitiesService';

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const data = await getOpportunitiesWithCache();
        setOpportunities(data);
      } catch (error) {
        console.error('Error loading opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando oportunidades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Oportunidades Disponibles
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explora las mejores oportunidades laborales en Paraguay y Latinoamérica
          </p>
          <p className="text-xs text-gray-600 mt-3">
            Actualizado cada 12 horas con nuevas vacantes
          </p>
        </motion.div>

        {/* Opportunities Grid */}
        {opportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-lg border border-[#c9a84c]/20 bg-[#0d0d0f] hover:border-[#c9a84c]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/10"
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-[#c9a84c] font-semibold text-sm mt-1">
                    {opp.company}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-[#c9a84c]" />
                    {opp.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Briefcase className="w-4 h-4 text-[#c9a84c]" />
                    {opp.type}
                  </div>
                  {opp.salary && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <DollarSign className="w-4 h-4 text-[#c9a84c]" />
                      {opp.salary}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                  {opp.description}
                </p>

                {/* Button */}
                <Button className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-semibold hover:shadow-lg hover:shadow-[#c9a84c]/30 flex items-center justify-center gap-2">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay oportunidades disponibles en este momento.</p>
          </div>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-600 max-w-2xl mx-auto">
            Anadimos nuevas oportunidades cada dia. Este es solo el comienzo de tu carrera elite.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            ¿No encuentras lo que buscas?
          </p>
          <Button className="bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-semibold">
            Recibir Alertas de Empleos
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
