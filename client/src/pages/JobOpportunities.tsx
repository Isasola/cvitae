import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Search, MapPin, Briefcase, DollarSign, Heart, ArrowRight, Upload, Filter, MessageCircle, Info } from "lucide-react";

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
const WA_NUMBER  = "595992954169";
const WA_BASE    = `https://wa.me/${WA_NUMBER}`;
const WA_PERFIL  = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero subir mi perfil optimizado para buscar oportunidades laborales.")}`;
const WA_GENERAR = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero generar un perfil profesional optimizado con CVitae.")}`;
const WA_APLICAR = (puesto: string, empresa: string) =>
  `${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero aplicar al puesto de ${puesto} en ${empresa}. ¿Me pueden ayudar?`)}`;
// ─────────────────────────────────────────────────────────────────────────────

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  compatibility: number;
  tags: string[];
  description: string;
  liked?: boolean;
}

const mockJobs: JobListing[] = [
  {
    id: "1",
    title: "Analista Contable Senior",
    company: "Grupo Financiero Asunción",
    location: "Asunción, PY",
    salary: "₲4.5M - ₲6M",
    type: "Presencial",
    compatibility: 92,
    tags: ["NIIF", "SAP", "Auditoría", "Excel", "RUPE"],
    description: "Buscamos Analista Contable con 5+ años de experiencia en empresas de logística y comercio exterior.",
    liked: false,
  },
  {
    id: "2",
    title: "Contador Público",
    company: "Deloitte Paraguay",
    location: "Asunción, PY",
    salary: "₲3.8M - ₲5.2M",
    type: "Híbrido",
    compatibility: 85,
    tags: ["NIIF", "Auditoría", "Impuestos", "Excel", "Power BI"],
    description: "Contador con experiencia en auditoría y consultoría fiscal para empresas multinacionales.",
    liked: false,
  },
  {
    id: "3",
    title: "Especialista en Finanzas Corporativas",
    company: "BanCorp Paraguay",
    location: "Asunción, PY",
    salary: "₲5M - ₲7M",
    type: "Presencial",
    compatibility: 78,
    tags: ["Finanzas", "Análisis financiero", "Presupuestos", "Excel", "Python"],
    description: "Profesional de finanzas para análisis de inversiones y gestión de riesgos.",
    liked: false,
  },
];

export default function JobOpportunities() {
  const [jobs, setJobs] = useState<JobListing[]>(mockJobs);
  const [profileUploaded, setProfileUploaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ minCompatibility: 70, type: "all" });

  const toggleLike = (id: string) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, liked: !j.liked } : j)));
  };

  const filteredJobs = jobs.filter((job) => {
    if (job.compatibility < filters.minCompatibility) return false;
    if (filters.type !== "all" && job.type !== filters.type) return false;
    return true;
  });

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
              <Briefcase className="w-4 h-4" />
              Búsqueda de oportunidades
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              Encontrá trabajos<br /><span className="italic font-light">que te buscan a vos.</span>
            </h1>
            <p className="text-base md:text-lg text-muted max-w-2xl">
              Subí tu perfil optimizado y encontrá ofertas compatibles con tus indicadores de competencia.
            </p>
          </div>

          {/* SECCIÓN: Subir perfil */}
          {!profileUploaded ? (
            <Card className="p-6 md:p-10 border-border mb-12 bg-card">
              <div className="text-center max-w-lg mx-auto">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-accent opacity-50" />
                <h2 className="text-2xl font-black mb-3">Comenzá con tu perfil</h2>
                <p className="text-muted mb-2 text-sm md:text-base">
                  Subí tu CV optimizado (o generá uno nuevo) para que el sistema te muestre trabajos compatibles con tu perfil.
                </p>

                {/* Aviso explicativo */}
                <div className="flex items-start gap-2 bg-accent/5 border border-accent/20 rounded-lg p-3 text-xs text-muted text-left mb-6">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    Al hacer click en cualquier botón, te conectamos directamente con nuestro equipo por WhatsApp para guiarte en el proceso.
                  </span>
                </div>

                <div className="flex flex-col md:flex-row gap-3 justify-center">
                  {/* "Subir mi perfil" → WhatsApp */}
                  <a href={WA_PERFIL} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:w-auto">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir mi perfil
                    </Button>
                  </a>
                  {/* "Generar perfil ahora" → WhatsApp */}
                  <a href={WA_GENERAR} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 w-full md:w-auto">
                      <Search className="w-4 h-4 mr-2" />
                      Generar perfil ahora
                    </Button>
                  </a>
                </div>

                {/* Opción de demo */}
                <button
                  onClick={() => setProfileUploaded(true)}
                  className="mt-4 text-xs text-muted underline hover:text-accent transition"
                >
                  Ver demo del listado de trabajos →
                </button>
              </div>
            </Card>
          ) : (
            <>
              {/* PERFIL CARGADO (demo) */}
              <Card className="p-4 md:p-6 border-border mb-8 bg-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Perfil cargado (demo)</div>
                  <h3 className="text-lg font-bold">Lucía Fernández Riquelme</h3>
                  <p className="text-sm text-muted">Analista Contable · Finanzas</p>
                </div>
                <div className="flex gap-2">
                  <a href={WA_PERFIL} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10 text-xs">
                      <Upload className="w-3 h-3 mr-1" />
                      Subir mi CV real
                    </Button>
                  </a>
                  <Button
                    onClick={() => setProfileUploaded(false)}
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive/10 text-xs"
                  >
                    Cambiar
                  </Button>
                </div>
              </Card>

              {/* BÚSQUEDA Y FILTROS */}
              <div className="flex gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="Buscar por puesto, empresa..."
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
                        type="range" min="0" max="100"
                        value={filters.minCompatibility}
                        onChange={(e) => setFilters({ ...filters, minCompatibility: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Tipo de contrato</label>
                      <div className="flex gap-2 flex-wrap">
                        {["all", "Presencial", "Híbrido", "Remoto"].map((type) => (
                          <button
                            key={type}
                            onClick={() => setFilters({ ...filters, type })}
                            className={`px-3 py-1.5 rounded border text-xs transition ${
                              filters.type === type
                                ? "bg-accent text-accent-foreground border-accent"
                                : "border-border hover:border-accent"
                            }`}
                          >
                            {type === "all" ? "Todos" : type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* LISTADO DE TRABAJOS */}
              <div className="space-y-4">
                {filteredJobs.length === 0 ? (
                  <Card className="p-12 border-border text-center">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted opacity-30" />
                    <p className="text-muted text-sm">No hay trabajos que coincidan con tus filtros</p>
                  </Card>
                ) : (
                  filteredJobs.map((job) => (
                    <Card key={job.id} className="p-4 md:p-6 border-border hover:border-accent transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="text-base md:text-lg font-black">{job.title}</h3>
                            <span className={`text-base font-black ${getCompatibilityColor(job.compatibility)}`}>
                              {job.compatibility}% compatible
                            </span>
                          </div>
                          <p className="text-sm font-bold text-muted mb-2">{job.company}</p>
                          <div className="flex gap-3 text-xs text-muted flex-wrap">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleLike(job.id)}
                          className={`p-2 rounded border transition ml-2 ${
                            job.liked ? "bg-destructive/10 border-destructive text-destructive" : "border-border hover:border-accent"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${job.liked ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      <p className="text-xs md:text-sm text-muted mb-3">{job.description}</p>

                      <div className="mb-4">
                        <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Indicadores detectados</div>
                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-accent/10 border border-accent/20 text-xs rounded text-accent font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 text-xs md:text-sm" size="sm">
                          Ver detalles
                        </Button>
                        {/* "Aplicar ahora" → WhatsApp con puesto y empresa */}
                        <a href={WA_APLICAR(job.title, job.company)} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs md:text-sm" size="sm">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Aplicar ahora <ArrowRight className="w-3 h-3 ml-1" />
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
                    <div className="text-2xl md:text-3xl font-black text-accent mb-1">{filteredJobs.length}</div>
                    <div className="text-xs md:text-sm text-muted">Oportunidades</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-secondary mb-1">
                      {filteredJobs.length > 0
                        ? Math.round(filteredJobs.reduce((a, j) => a + j.compatibility, 0) / filteredJobs.length)
                        : 0}%
                    </div>
                    <div className="text-xs md:text-sm text-muted">Compatibilidad</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-accent mb-1">{jobs.filter((j) => j.liked).length}</div>
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
