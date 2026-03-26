import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Search, MapPin, Briefcase, DollarSign, Heart, ArrowRight, Upload, Filter, MessageCircle, Info, Globe, Award, Zap } from "lucide-react";

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
const WA_NUMBER  = "595992954169";
const WA_BASE    = `https://wa.me/${WA_NUMBER}`;
const WA_PERFIL  = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero subir mi perfil optimizado para buscar oportunidades laborales.")}`;
const WA_GENERAR = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero generar un perfil profesional optimizado con CVitae.")}`;
const WA_APLICAR = (oportunidad: string, tipo: string) =>
  `${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero aplicar a: ${oportunidad} (${tipo}). ¿Me pueden ayudar?`)}`;
// ─────────────────────────────────────────────────────────────────────────────

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: "beca_nacional" | "beca_internacional" | "capital_semilla" | "curso" | "empleo";
  value?: string;
  deadline: string;
  compatibility: number;
  tags: string[];
  description: string;
  liked?: boolean;
}

const opportunities: Opportunity[] = [
  // BECAS NACIONALES
  {
    id: "bn-001",
    title: "Becas ITAIPU - Postgrado",
    organization: "ITAIPU Binacional",
    location: "Paraguay",
    type: "beca_nacional",
    value: "100% Cobertura",
    deadline: "15 Abril 2026",
    compatibility: 88,
    tags: ["Postgrado", "Ingeniería", "Energía", "Presencial"],
    description: "Becas para estudios de postgrado en universidades de excelencia. Cobertura total de aranceles y manutención.",
    liked: false,
  },
  {
    id: "bn-002",
    title: "BECAL - Beca de Excelencia",
    organization: "BECAL (Consejo Nacional de Ciencia y Tecnología)",
    location: "Paraguay",
    type: "beca_nacional",
    value: "₲2.5M/mes",
    deadline: "30 Marzo 2026",
    compatibility: 82,
    tags: ["Investigación", "Ciencia", "Tecnología", "Postgrado"],
    description: "Becas para investigación científica y desarrollo tecnológico. Acceso a programas internacionales.",
    liked: false,
  },
  {
    id: "bn-003",
    title: "SNJ - Fondo Joven Emprendedor",
    organization: "Secretaría Nacional de la Juventud",
    location: "Paraguay",
    type: "beca_nacional",
    value: "Hasta ₲50M",
    deadline: "20 Abril 2026",
    compatibility: 85,
    tags: ["Emprendimiento", "Jóvenes", "Financiamiento", "Mentoría"],
    description: "Financiamiento para proyectos de emprendimiento liderados por jóvenes. Incluye mentoría y capacitación.",
    liked: false,
  },
  {
    id: "bn-004",
    title: "SNPP - Programa de Capacitación",
    organization: "Servicio Nacional de Promoción Profesional",
    location: "Paraguay",
    type: "curso",
    value: "Gratuito",
    deadline: "Abierto",
    compatibility: 90,
    tags: ["Capacitación", "Oficios", "Técnico", "Gratuito"],
    description: "Cursos técnicos y profesionales gratuitos en oficios demandados. Certificación oficial.",
    liked: false,
  },

  // BECAS INTERNACIONALES
  {
    id: "bi-001",
    title: "Fundación Carolina - Becas para Latinoamérica",
    organization: "Fundación Carolina (España)",
    location: "España",
    type: "beca_internacional",
    value: "100% Cobertura",
    deadline: "10 Mayo 2026",
    compatibility: 79,
    tags: ["España", "Postgrado", "Máster", "Investigación"],
    description: "Becas para estudios de postgrado en universidades españolas. Incluye manutención y seguro médico.",
    liked: false,
  },
  {
    id: "bi-002",
    title: "One Young World - Summit 2026",
    organization: "One Young World",
    location: "París, Francia",
    type: "beca_internacional",
    value: "Viaje + Alojamiento",
    deadline: "31 Marzo 2026",
    compatibility: 86,
    tags: ["Liderazgo", "Networking", "París", "Jóvenes"],
    description: "Cumbre anual de líderes jóvenes. Networking global, conferencias y oportunidades de negocio.",
    liked: false,
  },
  {
    id: "bi-003",
    title: "WYF - World Youth Forum (Rusia)",
    organization: "World Youth Forum",
    location: "Rusia",
    type: "beca_internacional",
    value: "Viaje + Alojamiento",
    deadline: "15 Abril 2026",
    compatibility: 81,
    tags: ["Rusia", "Foro Global", "Liderazgo", "Networking"],
    description: "Foro internacional de jóvenes líderes. Conexiones con emprendedores y empresarios de todo el mundo.",
    liked: false,
  },
  {
    id: "bi-004",
    title: "Erasmus+ - Intercambio Académico",
    organization: "Comisión Europea",
    location: "Europa",
    type: "beca_internacional",
    value: "₲1.2M/mes",
    deadline: "1 Abril 2026",
    compatibility: 84,
    tags: ["Europa", "Intercambio", "Estudio", "Movilidad"],
    description: "Programas de intercambio y estudio en universidades europeas. Beca para gastos de manutención.",
    liked: false,
  },
  {
    id: "bi-005",
    title: "Fulbright - Becas EE.UU.",
    organization: "Comisión Fulbright",
    location: "Estados Unidos",
    type: "beca_internacional",
    value: "100% Cobertura",
    deadline: "30 Abril 2026",
    compatibility: 77,
    tags: ["EE.UU", "Postgrado", "Investigación", "Prestigio"],
    description: "Becas para postgrado e investigación en universidades estadounidenses de élite.",
    liked: false,
  },

  // CAPITAL SEMILLA / EMPRENDIMIENTO
  {
    id: "cs-001",
    title: "Capital Semilla - UIP/MIC",
    organization: "Unión Industrial Paraguaya",
    location: "Paraguay",
    type: "capital_semilla",
    value: "Hasta ₲100M",
    deadline: "25 Abril 2026",
    compatibility: 87,
    tags: ["Emprendimiento", "Financiamiento", "Startup", "Mentoría"],
    description: "Financiamiento para startups en etapa temprana. Acceso a mentores, red de inversores y capacitación.",
    liked: false,
  },
  {
    id: "cs-002",
    title: "Fondo de Garantía - FOGAPY",
    organization: "Fondo de Garantía para Pequeños y Medianos Empresarios",
    location: "Paraguay",
    type: "capital_semilla",
    value: "Hasta ₲150M",
    deadline: "Abierto",
    compatibility: 83,
    tags: ["PYME", "Crédito", "Garantía", "Negocio"],
    description: "Garantías para acceder a créditos bancarios. Ideal para emprendedores sin historial crediticio.",
    liked: false,
  },
  {
    id: "cs-003",
    title: "Aceleradora Endeavor - Programa Intensivo",
    organization: "Endeavor Paraguay",
    location: "Paraguay",
    type: "capital_semilla",
    value: "Mentoría + Red",
    deadline: "10 Mayo 2026",
    compatibility: 89,
    tags: ["Acelerador", "Mentoría", "Networking", "Inversión"],
    description: "Programa de aceleración para emprendedores de alto impacto. Mentoría de emprendedores exitosos.",
    liked: false,
  },

  // CURSOS Y CAPACITACIÓN
  {
    id: "cur-001",
    title: "SAP - Certificación Profesional",
    organization: "SAP Learning Hub",
    location: "Online",
    type: "curso",
    value: "₲500k",
    deadline: "Abierto",
    compatibility: 92,
    tags: ["ERP", "Contabilidad", "Online", "Certificación"],
    description: "Certificación oficial en SAP. Altamente demandado en empresas grandes de Paraguay.",
    liked: false,
  },
  {
    id: "cur-002",
    title: "Excel Avanzado + Power BI",
    organization: "DataCamp",
    location: "Online",
    type: "curso",
    value: "₲300k",
    deadline: "Abierto",
    compatibility: 95,
    tags: ["Datos", "Excel", "BI", "Online"],
    description: "Domina análisis de datos. Habilidad crítica para finanzas, marketing y operaciones.",
    liked: false,
  },
  {
    id: "cur-003",
    title: "Inglés Profesional - Cambridge",
    organization: "Cambridge English",
    location: "Presencial/Online",
    type: "curso",
    value: "₲800k",
    deadline: "Abierto",
    compatibility: 88,
    tags: ["Idioma", "Inglés", "Certificación", "Empleabilidad"],
    description: "Certificación Cambridge. Requisito para muchas posiciones internacionales.",
    liked: false,
  },

  // EMPLEOS
  {
    id: "emp-001",
    title: "Analista Contable Senior",
    organization: "Grupo Financiero Asunción",
    location: "Asunción, PY",
    type: "empleo",
    value: "₲4.5M - ₲6M",
    deadline: "30 Abril 2026",
    compatibility: 92,
    tags: ["Contabilidad", "NIIF", "SAP", "Presencial"],
    description: "Empresa líder en finanzas busca profesional con experiencia en NIIF y sistemas ERP.",
    liked: false,
  },
  {
    id: "emp-002",
    title: "Especialista en Recursos Humanos",
    organization: "Multinacional Tech",
    location: "Asunción, PY",
    type: "empleo",
    value: "₲3.5M - ₲5M",
    deadline: "20 Abril 2026",
    compatibility: 85,
    tags: ["RRHH", "Reclutamiento", "Híbrido", "Inglés"],
    description: "Empresa de tecnología busca especialista en selección y desarrollo de talento.",
    liked: false,
  },
];

export default function JobOpportunities() {
  const [opportunities_list, setOpportunities] = useState<Opportunity[]>(opportunities);
  const [profileUploaded, setProfileUploaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minCompatibility: 70,
    type: "all" as string,
    search: "",
  });

  const toggleLike = (id: string) => {
    setOpportunities(opportunities_list.map((o) => (o.id === id ? { ...o, liked: !o.liked } : o)));
  };

  const filteredOpportunities = opportunities_list.filter((opp) => {
    if (opp.compatibility < filters.minCompatibility) return false;
    if (filters.type !== "all" && opp.type !== filters.type) return false;
    if (filters.search && !opp.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      beca_nacional: "🇵🇾 Beca Nacional",
      beca_internacional: "🌍 Beca Internacional",
      capital_semilla: "💰 Capital Semilla",
      curso: "📚 Curso",
      empleo: "💼 Empleo",
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      beca_nacional: "bg-blue-50 border-blue-200 text-blue-700",
      beca_internacional: "bg-purple-50 border-purple-200 text-purple-700",
      capital_semilla: "bg-green-50 border-green-200 text-green-700",
      curso: "bg-orange-50 border-orange-200 text-orange-700",
      empleo: "bg-accent/10 border-accent/20 text-accent",
    };
    return colors[type] || "bg-gray-50 border-gray-200 text-gray-700";
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-sidebar rounded flex items-center justify-center text-accent font-bold text-sm">CV</div>
            <span className="font-bold text-lg"><span className="italic">itae</span></span>
          </div>
          <a href="/" className="text-sm font-medium hover:text-accent transition">← Volver al inicio</a>
        </div>
      </nav>

      <div className="pt-24 pb-20">
        <div className="container max-w-5xl px-4">

          {/* HEADER */}
          <div className="mb-10">
            <div className="text-sm font-bold text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Centro de Oportunidades
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              Trabajos, becas, cursos<br /><span className="italic font-light">y capital para emprender.</span>
            </h1>
            <p className="text-base md:text-lg text-muted max-w-2xl">
              Accedé a oportunidades nacionales e internacionales. Optimizá tu perfil para cada una.
            </p>
          </div>

          {/* SECCIÓN: Subir perfil */}
          {!profileUploaded ? (
            <Card className="p-6 md:p-10 border-border mb-12 bg-card">
              <div className="text-center max-w-lg mx-auto">
                <Award className="w-12 h-12 mx-auto mb-4 text-accent opacity-50" />
                <h2 className="text-2xl font-black mb-3">Comenzá con tu perfil</h2>
                <p className="text-muted mb-2 text-sm md:text-base">
                  Subí tu CV optimizado (o generá uno nuevo) para que el sistema te muestre oportunidades compatibles.
                </p>

                <div className="flex items-start gap-2 bg-accent/5 border border-accent/20 rounded-lg p-3 text-xs text-muted text-left mb-6">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    Al hacer click en cualquier botón, te conectamos directamente con nuestro equipo por WhatsApp para guiarte en el proceso.
                  </span>
                </div>

                <div className="flex flex-col md:flex-row gap-3 justify-center">
                  <a href={WA_PERFIL} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:w-auto">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir mi perfil
                    </Button>
                  </a>
                  <a href={WA_GENERAR} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 w-full md:w-auto">
                      <Zap className="w-4 h-4 mr-2" />
                      Generar perfil ahora
                    </Button>
                  </a>
                </div>

                <button
                  onClick={() => setProfileUploaded(true)}
                  className="mt-4 text-xs text-muted underline hover:text-accent transition"
                >
                  Ver demo del listado →
                </button>
              </div>
            </Card>
          ) : (
            <>
              {/* BÚSQUEDA Y FILTROS */}
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="Buscar oportunidad..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full bg-card border border-border rounded px-10 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm"
                  />
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className={`border-border ${showFilters ? "bg-accent/10 border-accent" : ""}`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>

              {/* PANEL DE FILTROS */}
              {showFilters && (
                <Card className="p-6 border-border mb-6 bg-card">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">Compatibilidad mínima: {filters.minCompatibility}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.minCompatibility}
                        onChange={(e) => setFilters({ ...filters, minCompatibility: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Tipo de oportunidad</label>
                      <div className="flex gap-2 flex-wrap">
                        {["all", "beca_nacional", "beca_internacional", "capital_semilla", "curso", "empleo"].map((type) => (
                          <button
                            key={type}
                            onClick={() => setFilters({ ...filters, type })}
                            className={`px-3 py-1.5 rounded border text-xs transition ${
                              filters.type === type
                                ? "bg-accent text-accent-foreground border-accent"
                                : "border-border hover:border-accent"
                            }`}
                          >
                            {type === "all" ? "Todas" : getTypeLabel(type).split(" ")[1]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* LISTADO DE OPORTUNIDADES */}
              <div className="space-y-4">
                {filteredOpportunities.length === 0 ? (
                  <Card className="p-12 border-border text-center">
                    <Award className="w-12 h-12 mx-auto mb-4 text-muted opacity-30" />
                    <p className="text-muted text-sm">No hay oportunidades que coincidan con tus filtros</p>
                  </Card>
                ) : (
                  filteredOpportunities.map((opp) => (
                    <Card key={opp.id} className="p-4 md:p-6 border-border hover:border-accent transition">
                      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="text-base md:text-lg font-black">{opp.title}</h3>
                            <span className={`text-base font-black ${getCompatibilityColor(opp.compatibility)}`}>
                              {opp.compatibility}%
                            </span>
                          </div>
                          <p className="text-sm font-bold text-muted mb-2">{opp.organization}</p>
                          <div className="flex gap-3 text-xs text-muted flex-wrap">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
                            {opp.value && <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{opp.value}</span>}
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />Vence: {opp.deadline}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleLike(opp.id)}
                          className={`p-2 rounded border transition ${
                            opp.liked ? "bg-destructive/10 border-destructive text-destructive" : "border-border hover:border-accent"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${opp.liked ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      <p className="text-xs md:text-sm text-muted mb-3">{opp.description}</p>

                      <div className="mb-4 flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded border text-xs font-bold ${getTypeColor(opp.type)}`}>
                          {getTypeLabel(opp.type)}
                        </span>
                        {opp.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-accent/10 border border-accent/20 text-xs rounded text-accent font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 text-xs md:text-sm" size="sm">
                          Ver detalles
                        </Button>
                        <a href={WA_APLICAR(opp.title, opp.organization)} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs md:text-sm" size="sm">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Aplicar <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </a>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              {/* ESTADÍSTICAS */}
              <Card className="p-6 md:p-8 border-border mt-8 bg-card text-center">
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-accent mb-1">{filteredOpportunities.length}</div>
                    <div className="text-xs md:text-sm text-muted">Oportunidades</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-secondary mb-1">
                      {filteredOpportunities.length > 0
                        ? Math.round(filteredOpportunities.reduce((a, o) => a + o.compatibility, 0) / filteredOpportunities.length)
                        : 0}%
                    </div>
                    <div className="text-xs md:text-sm text-muted">Compatibilidad</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-accent mb-1">{opportunities_list.filter((o) => o.liked).length}</div>
                    <div className="text-xs md:text-sm text-muted">Guardadas</div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
