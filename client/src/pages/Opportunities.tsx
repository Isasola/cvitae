import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import Newsletter from '@/components/Newsletter';

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
  rubro?: string;
}

export default function Opportunities() {
  const [, setLocation] = useLocation();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedRubro, setSelectedRubro] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['Trabajo', 'Beca', 'Capital Semilla/Concurso', 'Foro/Evento', 'Voluntariado'];
  const locations = ['Paraguay', 'Remoto', 'Internacional'];
  const rubros = ['Tecnología', 'Administración', 'Educación', 'Marketing', 'Operativo', 'Otros'];

  useEffect(() => {
    document.title = 'CVitae | Oportunidades Laborales en Paraguay';
  }, []);

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const { data, error } = await supabase
          .from('content_hub')
          .select('*')
          .eq('is_active', true)
          .eq('tipo', 'oportunidad')
          .gte('fecha_vencimiento', new Date().toISOString())
          .order('fecha_vencimiento', { ascending: true });

        if (error) throw error;
        setOpportunities(data || []);
      } catch (error) {
        console.error('Error loading opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCategory = selectedCategory === 'all' || opp.categoria === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || opp.ubicacion.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesRubro = selectedRubro === 'all' || (opp.rubro && opp.rubro === selectedRubro);
    const matchesSearch = searchTerm === '' || 
      opp.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLocation && matchesRubro && matchesSearch;
  });

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
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 hover:opacity-80 transition">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', letterSpacing: '-0.02em', color: '#c9a84c' }}>
              <span style={{ fontWeight: 900 }}>CV</span>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>itae</span>
            </span>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => setLocation('/opportunities')} className="text-sm text-[#c9a84c] font-semibold">Oportunidades</button>
            <button onClick={() => setLocation('/recruiters/interface')} className="text-sm bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black px-4 py-2 rounded-lg font-semibold">Panel Reclutadores</button>
          </div>
        </div>
      </nav>

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

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Buscar por título o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0d0d0f] border border-[#c9a84c]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#c9a84c] mb-2">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0d0d0f] border border-[#c9a84c]/20 text-white focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#c9a84c] mb-2">Ubicación</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0d0d0f] border border-[#c9a84c]/20 text-white focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
            >
              <option value="all">Todas las ubicaciones</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Rubro Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#c9a84c] mb-2">Rubro</label>
            <select
              value={selectedRubro}
              onChange={(e) => setSelectedRubro(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0d0d0f] border border-[#c9a84c]/20 text-white focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
            >
              <option value="all">Todos los rubros</option>
              {rubros.map((rub) => (
                <option key={rub} value={rub}>{rub}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-sm text-gray-400"
        >
          Mostrando {filteredOpportunities.length} de {opportunities.length} oportunidades
        </motion.div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp, index) => (
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
                    {opp.titulo}
                  </h3>
                  <p className="text-[#c9a84c] font-semibold text-sm mt-1">
                    {opp.categoria}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-[#c9a84c]" />
                    {opp.ubicacion}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Briefcase className="w-4 h-4 text-[#c9a84c]" />
                    {opp.tipo}
                  </div>
                </div>

                {/* Description */}
                <div className="text-gray-300 text-sm mb-6 line-clamp-2">
                  <ReactMarkdown>{opp.cuerpo}</ReactMarkdown>
                </div>

                {/* Button */}
                <Button
                  onClick={() => setLocation(`/opportunities/${opp.slug}`)}
                  className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-semibold hover:shadow-lg hover:shadow-[#c9a84c]/30 flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.02]"
                >
                  Ver Oportunidad
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
          <Newsletter source="opportunities" title="Recibir Alertas de Empleos" />
        </motion.div>
      </div>
    </div>
  );
}
