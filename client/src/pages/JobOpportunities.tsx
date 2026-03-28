import { Card } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, Briefcase, DollarSign, Heart, ArrowRight, Upload, Filter, MessageCircle, Globe, Zap, TrendingUp, Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { opportunities } from "@/data/opportunities";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const ITEMS_PER_PAGE = 12;

export default function JobOpportunities() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedRubro, setSelectedRubro] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        opp.title.toLowerCase().includes(searchLower) ||
        opp.organization.toLowerCase().includes(searchLower) ||
        opp.location.toLowerCase().includes(searchLower) ||
        opp.rubro?.toLowerCase().includes(searchLower) ||
        opp.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchesType = !selectedType || opp.type === selectedType;
      const matchesContinent = !selectedContinent || opp.continent === selectedContinent;
      const matchesRubro = !selectedRubro || opp.rubro === selectedRubro;
      const matchesCountry = !selectedCountry || opp.location.toLowerCase().includes(selectedCountry.toLowerCase());
      
      return matchesSearch && matchesType && matchesContinent && matchesRubro && matchesCountry;
    });
    }, [searchTerm, selectedType, selectedContinent, selectedRubro, selectedCountry]);

  // Pagination
  const totalPages = Math.ceil(filteredOpportunities.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedOpportunities = filteredOpportunities.slice(startIdx, endIdx);

  const types = ["empleo", "beca_nacional", "beca_internacional", "capital_semilla", "curso", "foro_internacional", "pasantia", "voluntariado"];
  const continents = ["América Latina", "Europa", "Asia", "Oriente Medio", "Global"];
  const rubros = Array.from(new Set(opportunities.filter(o => o.rubro).map(o => o.rubro))).sort();
  const countries = Array.from(new Set(opportunities.map(o => o.location).filter(l => l && l !== 'Remote' && l !== 'Online'))).sort();

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedIds);
    if (newLiked.has(id)) newLiked.delete(id);
    else newLiked.add(id);
    setLikedIds(newLiked);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button onClick={() => setLocation("/")} className="text-slate-400 hover:text-blue-400 transition text-sm mb-3 flex items-center gap-1">
            ← Volver al inicio
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Oportunidades Globales</h1>
          <p className="text-slate-400 text-sm">{filteredOpportunities.length} oportunidades encontradas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Buscador Principal */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Busca por título, empresa, ubicación, rubro, país..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Tipo</label>
            <select
              value={selectedType || ""}
              onChange={(e) => {
                setSelectedType(e.target.value || null);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Todos</option>
              {types.map(t => (
                <option key={t} value={t}>{t.replace(/_/g, " ").toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Continente</label>
            <select
              value={selectedContinent || ""}
              onChange={(e) => {
                setSelectedContinent(e.target.value || null);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Todos</option>
              {continents.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">País</label>
            <select
              value={selectedCountry || ""}
              onChange={(e) => {
                setSelectedCountry(e.target.value || null);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Todos</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Rubro</label>
            <select
              value={selectedRubro || ""}
              onChange={(e) => {
                setSelectedRubro(e.target.value || null);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Todos</option>
              {rubros.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedType(null);
                setSelectedContinent(null);
                setSelectedRubro(null);
                setSelectedCountry(null);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Grid de Oportunidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {paginatedOpportunities.map((opp) => (
            <Card key={opp.id} className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition overflow-hidden group">
              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm group-hover:text-blue-400 transition line-clamp-2">{opp.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{opp.organization}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(opp.id);
                    }}
                    className="ml-2 p-1.5 hover:bg-slate-700 rounded transition"
                  >
                    <Heart
                      className={`h-4 w-4 ${likedIds.has(opp.id) ? "fill-red-500 text-red-500" : "text-slate-500"}`}
                    />
                  </button>
                </div>

                {/* Detalles */}
                <div className="space-y-2 mb-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{opp.location}</span>
                  </div>
                  {opp.value && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>{opp.value}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5" />
                    <span>Vence: {opp.deadline}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {opp.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Botones */}
                <div className="space-y-2">
                  <button
                    onClick={() => setLocation(`/opportunities/${opp.id}`)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-medium text-sm transition"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Detalles
                  </button>
                  <a
                    href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero aplicar a: ${opp.title}. ¿Me pueden ayudar?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-sm transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Aplicar por WhatsApp
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No se encontraron oportunidades con esos filtros.</p>
          </div>
        )}

        {/* Pagination - Google Style */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first 3, last 3, and current +/- 1
                const showPage = 
                  page <= 3 || 
                  page > totalPages - 3 || 
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!showPage) {
                  if (page === 4 || page === totalPages - 3) {
                    return <span key={page} className="px-2 text-slate-500">...</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-slate-700 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <span className="ml-4 text-sm text-slate-400">
              Página {currentPage} de {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
