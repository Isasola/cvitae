import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowRight, Loader2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import Newsletter from '@/components/Newsletter';
import { TetrisLoader } from '@/components/ui/tetris-loader';
import Footer from '@/components/Footer';

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
  metadata?: any;
}

const PAGE_SIZE = 12;

const formatCategory = (cat: string): string => {
  if (!cat) return cat;
  return cat
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function Opportunities() {
  const [, setLocation] = useLocation();
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const rawCats = allOpportunities.map(o => o.categoria).filter(Boolean) as string[];
    const uniqueCats = Array.from(new Set(rawCats)).sort();
    return ['all', ...uniqueCats];
  }, [allOpportunities]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    document.title = 'CVitae | Oportunidades Laborales en Paraguay';
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
        setAllOpportunities(data || []);
      } catch (error) {
        console.error('Error loading opportunities:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOpportunities();
  }, []);

  const filteredOpportunities = useMemo(() => {
    return allOpportunities.filter(opp => {
      const matchesCategory = selectedCategory === 'all' || opp.categoria === selectedCategory;

      let matchesLocation = true;
      if (selectedLocation !== 'all') {
        const locLower = opp.ubicacion?.toLowerCase() || '';
        if (selectedLocation === 'Paraguay') {
          matchesLocation = locLower.includes('paraguay') || locLower.includes('asunción') || locLower.includes('central');
        } else if (selectedLocation === 'Remoto') {
          matchesLocation = locLower.includes('remoto') || locLower.includes('remote');
        } else {
          matchesLocation = locLower.includes(selectedLocation.toLowerCase());
        }
      }

      const matchesSearch = debouncedSearch === '' ||
        opp.titulo.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (opp.cuerpo && opp.cuerpo.toLowerCase().includes(debouncedSearch.toLowerCase()));

      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [allOpportunities, selectedCategory, selectedLocation, debouncedSearch]);

  const totalPages = Math.ceil(filteredOpportunities.length / PAGE_SIZE);
  const paginatedOpportunities = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOpportunities.slice(start, start + PAGE_SIZE);
  }, [filteredOpportunities, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [selectedCategory, selectedLocation, debouncedSearch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 flex items-center justify-center">
        <TetrisLoader size="lg" text="Cargando oportunidades frescas..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 hover:opacity-80 transition">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', letterSpacing: '-0.02em', color: '#c9a84c' }}>
              <span style={{ fontWeight: 900 }}>CV</span>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>itae</span>
            </span>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => setLocation('/blog')} className="text-sm text-gray-400 hover:text-[#c9a84c]">Blog</button>
            <button onClick={() => setLocation('/opportunities')} className="text-sm text-[#c9a84c] font-semibold">Oportunidades</button>
            <button onClick={() => setLocation('/recruiters/interface')} className="text-sm bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black px-4 py-2 rounded-lg font-semibold">Panel Reclutadores</button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 w-full flex-grow">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Oportunidades Activas del Mercado</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Explora las mejores oportunidades en Paraguay y Latinoamérica</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-lg bg-[#0d0d0f] border border-[#c9a84c]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/50"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#c9a84c] mb-2">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0d0d0f] border border-[#c9a84c]/20 text-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Todas' : formatCategory(cat)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#c9a84c] mb-2">Ubicación</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0d0d0f] border border-[#c9a84c]/20 text-white"
            >
              <option value="all">Todas</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Remoto">Remoto</option>
              <option value="Internacional">Internacional</option>
            </select>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-sm text-gray-400">
          Mostrando {paginatedOpportunities.length} de {filteredOpportunities.length} oportunidades
        </motion.div>

        {paginatedOpportunities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedOpportunities.map((opp, index) => (
                <motion.div key={opp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} className="group p-6 rounded-lg border border-[#c9a84c]/20 bg-[#0d0d0f] hover:border-[#c9a84c]/50 transition-all">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#c9a84c] line-clamp-2">{opp.titulo}</h3>
                    <p className="text-[#c9a84c] font-semibold text-sm mt-1">{formatCategory(opp.categoria)}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm"><MapPin className="w-4 h-4 text-[#c9a84c]" />{opp.ubicacion}</div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm"><Briefcase className="w-4 h-4 text-[#c9a84c]" />{opp.tipo}</div>
                  </div>
                  <div className="text-gray-300 text-sm mb-6 line-clamp-2">
                    <ReactMarkdown>{opp.cuerpo || 'Sin descripción'}</ReactMarkdown>
                  </div>
                  <Button onClick={() => setLocation(`/opportunities/${opp.slug}`)} className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-semibold gap-2">
                    Ver Oportunidad <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="border-[#c9a84c]/30 text-[#c9a84c]">Anterior</Button>
                <span className="text-gray-400 text-sm px-4">Página {currentPage} de {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="border-[#c9a84c]/30 text-[#c9a84c]">Siguiente</Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay oportunidades con esos filtros.</p>
            <Button variant="link" onClick={() => { setSelectedCategory('all'); setSelectedLocation('all'); setSearchTerm(''); }} className="text-[#c9a84c] mt-4">Limpiar filtros</Button>
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 text-center">
          <p className="text-gray-400 mb-4">¿No encuentras lo que buscas?</p>
          <Newsletter source="opportunities" title="Recibir Alertas de Empleos" />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
