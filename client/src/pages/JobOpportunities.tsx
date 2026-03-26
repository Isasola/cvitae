import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Search, MapPin, Briefcase, DollarSign, Heart, ArrowRight, Upload, Filter, MessageCircle, Info, Globe, Award, Zap, TrendingUp } from "lucide-react";

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
  continent: string;
  type: "beca_nacional" | "beca_internacional" | "capital_semilla" | "curso" | "empleo" | "fondo_innovacion";
  value?: string;
  deadline: string;
  compatibility: number;
  tags: string[];
  description: string;
  liked?: boolean;
}

const opportunities: Opportunity[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // AMÉRICA LATINA (Nacional + Regional)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "latam-001",
    title: "Becas ITAIPU - Postgrado",
    organization: "ITAIPU Binacional",
    location: "Paraguay",
    continent: "América Latina",
    type: "beca_nacional",
    value: "100% Cobertura",
    deadline: "15 Abril 2026",
    compatibility: 88,
    tags: ["Postgrado", "Ingeniería", "Energía"],
    description: "Becas para estudios de postgrado en universidades de excelencia. Cobertura total de aranceles y manutención.",
    liked: false,
  },
  {
    id: "latam-002",
    title: "BECAL - Beca de Excelencia",
    organization: "BECAL (Consejo Nacional de Ciencia y Tecnología)",
    location: "Paraguay",
    continent: "América Latina",
    type: "beca_nacional",
    value: "₲2.5M/mes",
    deadline: "30 Marzo 2026",
    compatibility: 82,
    tags: ["Investigación", "Ciencia", "Tecnología"],
    description: "Becas para investigación científica y desarrollo tecnológico. Acceso a programas internacionales.",
    liked: false,
  },
  {
    id: "latam-003",
    title: "SNJ - Fondo Joven Emprendedor",
    organization: "Secretaría Nacional de la Juventud",
    location: "Paraguay",
    continent: "América Latina",
    type: "beca_nacional",
    value: "Hasta ₲50M",
    deadline: "20 Abril 2026",
    compatibility: 85,
    tags: ["Emprendimiento", "Jóvenes", "Financiamiento"],
    description: "Financiamiento para proyectos de emprendimiento liderados por jóvenes. Incluye mentoría y capacitación.",
    liked: false,
  },
  {
    id: "latam-004",
    title: "SNPP - Programa de Capacitación",
    organization: "Servicio Nacional de Promoción Profesional",
    location: "Paraguay",
    continent: "América Latina",
    type: "curso",
    value: "Gratuito",
    deadline: "Abierto",
    compatibility: 90,
    tags: ["Capacitación", "Técnico", "Gratuito"],
    description: "Cursos técnicos y profesionales gratuitos en oficios demandados. Certificación oficial.",
    liked: false,
  },
  {
    id: "latam-005",
    title: "Capital Semilla - UIP/MIC",
    organization: "Unión Industrial Paraguaya",
    location: "Paraguay",
    continent: "América Latina",
    type: "capital_semilla",
    value: "Hasta ₲100M",
    deadline: "25 Abril 2026",
    compatibility: 87,
    tags: ["Emprendimiento", "Startup", "Mentoría"],
    description: "Financiamiento para startups en etapa temprana. Acceso a mentores, red de inversores y capacitación.",
    liked: false,
  },
  {
    id: "latam-006",
    title: "Aceleradora Endeavor - Programa Intensivo",
    organization: "Endeavor Paraguay",
    location: "Paraguay",
    continent: "América Latina",
    type: "capital_semilla",
    value: "Mentoría + Red",
    deadline: "10 Mayo 2026",
    compatibility: 89,
    tags: ["Acelerador", "Mentoría", "Inversión"],
    description: "Programa de aceleración para emprendedores de alto impacto. Mentoría de emprendedores exitosos.",
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EUROPA (Becas de Élite)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "eu-001",
    title: "Chevening Scholarships - UK",
    organization: "Ministerio de Asuntos Exteriores del Reino Unido",
    location: "Reino Unido",
    continent: "Europa",
    type: "beca_internacional",
    value: "100% Cobertura",
    deadline: "1 Noviembre 2026",
    compatibility: 84,
    tags: ["UK", "Postgrado", "Liderazgo", "Prestigio"],
    description: "Becas para másters de un año en universidades británicas. Programa de liderazgo global de élite.",
    liked: false,
  },
  {
    id: "eu-002",
    title: "Fundación Carolina - España",
    organization: "Fundación Carolina",
    location: "España",
    continent: "Europa",
    type: "beca_internacional",
    value: "€1.500/mes",
    deadline: "10 Mayo 2026",
    compatibility: 79,
    tags: ["España", "Postgrado", "Máster"],
    description: "Becas para estudios de postgrado en universidades españolas. Incluye manutención y seguro médico.",
    liked: false,
  },
  {
    id: "eu-003",
    title: "DAAD - Alemania",
    organization: "Deutscher Akademischer Austauschdienst",
    location: "Alemania",
    continent: "Europa",
    type: "beca_internacional",
    value: "€934/mes",
    deadline: "15 Abril 2026",
    compatibility: 81,
    tags: ["Alemania", "Postgrado", "Investigación"],
    description: "Becas para postgrado e investigación en universidades alemanas. Programa de intercambio académico.",
    liked: false,
  },
  {
    id: "eu-004",
    title: "Erasmus+ - Intercambio Europeo",
    organization: "Comisión Europea",
    location: "Europa",
    continent: "Europa",
    type: "beca_internacional",
    value: "€1.200/mes",
    deadline: "1 Abril 2026",
    compatibility: 84,
    tags: ["Europa", "Intercambio", "Movilidad"],
    description: "Programas de intercambio y estudio en universidades europeas. Beca para gastos de manutención.",
    liked: false,
  },
  {
    id: "eu-005",
    title: "NL Scholarship - Holanda",
    organization: "Gobierno de Países Bajos",
    location: "Holanda",
    continent: "Europa",
    type: "beca_internacional",
    value: "€6.000 - €25.000",
    deadline: "30 Abril 2026",
    compatibility: 80,
    tags: ["Holanda", "Máster", "Becas Parciales"],
    description: "Becas para estudiantes internacionales en universidades holandesas. Becas parciales y completas.",
    liked: false,
  },
  {
    id: "eu-006",
    title: "Becas Suiza - Swiss Government",
    organization: "Gobierno de Suiza",
    location: "Suiza",
    continent: "Europa",
    type: "beca_internacional",
    value: "CHF 2.000/mes",
    deadline: "15 Marzo 2026",
    compatibility: 76,
    tags: ["Suiza", "Postgrado", "Investigación"],
    description: "Becas para postgrado e investigación en universidades suizas. Acceso a educación de élite.",
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ASIA (Becas Masivas - MEXT, GKS, CSC)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "asia-001",
    title: "MEXT - Beca Gobierno Japonés",
    organization: "Ministerio de Educación, Cultura, Deportes, Ciencia y Tecnología (Japón)",
    location: "Japón",
    continent: "Asia",
    type: "beca_internacional",
    value: "¥144.000/mes + Matrícula",
    deadline: "20 Abril 2026",
    compatibility: 85,
    tags: ["Japón", "Postgrado", "Investigación", "Prestige"],
    description: "Una de las becas más competitivas del mundo. Cobertura total de matrícula y manutención. Acceso a universidades de élite como Tokio y Kyoto.",
    liked: false,
  },
  {
    id: "asia-002",
    title: "GKS - Global Korea Scholarship",
    organization: "Gobierno de Corea del Sur",
    location: "Corea del Sur",
    continent: "Asia",
    type: "beca_internacional",
    value: "₩900.000/mes + Matrícula",
    deadline: "10 Abril 2026",
    compatibility: 83,
    tags: ["Corea", "Postgrado", "Licenciatura"],
    description: "Beca del gobierno coreano. Cobertura total. Acceso a universidades top como Seoul National University y KAIST.",
    liked: false,
  },
  {
    id: "asia-003",
    title: "CSC - China Scholarship Council",
    organization: "Consejo de Becas de China",
    location: "China",
    continent: "Asia",
    type: "beca_internacional",
    value: "¥3.000/mes + Matrícula",
    deadline: "31 Marzo 2026",
    compatibility: 82,
    tags: ["China", "Postgrado", "Investigación"],
    description: "Becas del gobierno chino. Cobertura completa. Acceso a universidades de investigación de primer nivel.",
    liked: false,
  },
  {
    id: "asia-004",
    title: "Becas Tailandia - Thai Government",
    organization: "Ministerio de Educación de Tailandia",
    location: "Tailandia",
    continent: "Asia",
    type: "beca_internacional",
    value: "฿25.000/mes",
    deadline: "25 Abril 2026",
    compatibility: 78,
    tags: ["Tailandia", "Postgrado", "Bajo Costo"],
    description: "Becas para postgrado en universidades tailandesas. Costo de vida muy bajo, excelente relación calidad-precio.",
    liked: false,
  },
  {
    id: "asia-005",
    title: "Becas Vietnam - Vingroup",
    organization: "Vingroup Scholarship Program",
    location: "Vietnam",
    continent: "Asia",
    type: "beca_internacional",
    value: "100% Cobertura",
    deadline: "30 Abril 2026",
    compatibility: 80,
    tags: ["Vietnam", "Postgrado", "Emprendimiento"],
    description: "Becas de la corporación Vingroup. Enfoque en emprendimiento y liderazgo. Mentoría de ejecutivos.",
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OCEANÍA (Australia, Nueva Zelanda)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "oc-001",
    title: "Australia Awards Scholarships",
    organization: "Departamento de Asuntos Exteriores y Comercio (Australia)",
    location: "Australia",
    continent: "Oceanía",
    type: "beca_internacional",
    value: "100% Cobertura",
    deadline: "1 Abril 2026",
    compatibility: 86,
    tags: ["Australia", "Postgrado", "Liderazgo"],
    description: "Becas del gobierno australiano. Cobertura total. Acceso a universidades Group of Eight (Go8).",
    liked: false,
  },
  {
    id: "oc-002",
    title: "Manaaki New Zealand Scholarships",
    organization: "Ministerio de Educación de Nueva Zelanda",
    location: "Nueva Zelanda",
    continent: "Oceanía",
    type: "beca_internacional",
    value: "NZ$25.000/año",
    deadline: "15 Abril 2026",
    compatibility: 82,
    tags: ["Nueva Zelanda", "Postgrado", "Liderazgo"],
    description: "Becas para líderes emergentes. Acceso a universidades de investigación de Nueva Zelanda.",
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NORTEAMÉRICA (USA, Canadá)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "na-001",
    title: "Fulbright - Estados Unidos",
    organization: "Comisión Fulbright",
    location: "Estados Unidos",
    continent: "Norteamérica",
    type: "beca_internacional",
    value: "100% Cobertura",
    deadline: "30 Abril 2026",
    compatibility: 77,
    tags: ["EE.UU", "Postgrado", "Investigación", "Prestigio"],
    description: "Beca más prestigiosa del mundo. Acceso a universidades Ivy League. Programa de liderazgo global.",
    liked: false,
  },
  {
    id: "na-002",
    title: "Canada Scholarships - Gobierno",
    organization: "Educación, Investigación e Innovación de Canadá",
    location: "Canadá",
    continent: "Norteamérica",
    type: "beca_internacional",
    value: "CAD $20.000/año",
    deadline: "31 Marzo 2026",
    compatibility: 83,
    tags: ["Canadá", "Postgrado", "Investigación"],
    description: "Becas del gobierno canadiense. Acceso a universidades de investigación de primer nivel.",
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FONDOS DE CAPITAL SEMILLA Y VENTURE CAPITAL (Global)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "vc-001",
    title: "Y Combinator - Summer 2026 Batch",
    organization: "Y Combinator",
    location: "San Francisco, USA",
    continent: "Global",
    type: "capital_semilla",
    value: "$500K - $2M",
    deadline: "31 Marzo 2026",
    compatibility: 88,
    tags: ["Silicon Valley", "Startup", "Inversión", "Mentoría"],
    description: "La aceleradora más prestigiosa del mundo. Inversión + mentoría de emprendedores exitosos. Red global de inversores.",
    liked: false,
  },
  {
    id: "vc-002",
    title: "500 Global - Luchadores Fund",
    organization: "500 Global",
    location: "Latinoamérica",
    continent: "Global",
    type: "capital_semilla",
    value: "$300K - $1M",
    deadline: "15 Abril 2026",
    compatibility: 89,
    tags: ["Latinoamérica", "Startup", "Venture Capital"],
    description: "Fondo especializado en startups latinoamericanas. $2.4B en AUM. Más de 250 inversiones en la región.",
    liked: false,
  },
  {
    id: "vc-003",
    title: "Techstars Accelerator Programs",
    organization: "Techstars",
    location: "Global",
    continent: "Global",
    type: "capital_semilla",
    value: "$120K + Mentoría",
    deadline: "30 Abril 2026",
    compatibility: 86,
    tags: ["Acelerador", "Startup", "Mentoría Global"],
    description: "Red global de aceleradoras. Programas de 3 meses con mentoría intensiva. Acceso a inversores.",
    liked: false,
  },
  {
    id: "vc-004",
    title: "Plug and Play - Startup Program",
    organization: "Plug and Play Tech Center",
    location: "Silicon Valley",
    continent: "Global",
    type: "capital_semilla",
    value: "$250K - $1M",
    deadline: "20 Mayo 2026",
    compatibility: 85,
    tags: ["Silicon Valley", "Startup", "Corporativo"],
    description: "Acelerador con conexiones con Fortune 500. Acceso a corporaciones para B2B. Inversión directa.",
    liked: false,
  },
  {
    id: "vc-005",
    title: "Anterra Capital - Fondo Latinoamericano",
    organization: "Anterra Capital",
    location: "Latinoamérica",
    continent: "Global",
    type: "capital_semilla",
    value: "$500K - $5M",
    deadline: "31 Marzo 2026",
    compatibility: 87,
    tags: ["Latinoamérica", "Venture Capital", "Crecimiento"],
    description: "Fondo de venture capital enfocado en startups latinoamericanas en crecimiento. Mentoría operacional.",
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CURSOS Y CERTIFICACIONES GLOBALES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cur-001",
    title: "SAP - Certificación Profesional",
    organization: "SAP Learning Hub",
    location: "Online",
    continent: "Global",
    type: "curso",
    value: "₲500k",
    deadline: "Abierto",
    compatibility: 92,
    tags: ["ERP", "Contabilidad", "Certificación"],
    description: "Certificación oficial en SAP. Altamente demandado en empresas grandes. Salario +40%.",
    liked: false,
  },
  {
    id: "cur-002",
    title: "Excel Avanzado + Power BI",
    organization: "DataCamp",
    location: "Online",
    continent: "Global",
    type: "curso",
    value: "₲300k",
    deadline: "Abierto",
    compatibility: 95,
    tags: ["Datos", "BI", "Online"],
    description: "Domina análisis de datos. Habilidad crítica para finanzas, marketing y operaciones.",
    liked: false,
  },
  {
    id: "cur-003",
    title: "Inglés Profesional - Cambridge",
    organization: "Cambridge English",
    location: "Presencial/Online",
    continent: "Global",
    type: "curso",
    value: "₲800k",
    deadline: "Abierto",
    compatibility: 88,
    tags: ["Idioma", "Certificación", "Empleabilidad"],
    description: "Certificación Cambridge. Requisito para posiciones internacionales. Reconocido globalmente.",
    liked: false,
  },
  {
    id: "cur-004",
    title: "Google Cloud Certification",
    organization: "Google Cloud",
    location: "Online",
    continent: "Global",
    type: "curso",
    value: "₲400k",
    deadline: "Abierto",
    compatibility: 90,
    tags: ["Cloud", "Certificación", "Tech"],
    description: "Certificación en Google Cloud. Demanda creciente en empresas tech. Salario competitivo.",
    liked: false,
  },
  {
    id: "cur-005",
    title: "AWS Solutions Architect",
    organization: "Amazon Web Services",
    location: "Online",
    continent: "Global",
    type: "curso",
    value: "₲350k",
    deadline: "Abierto",
    compatibility: 91,
    tags: ["Cloud", "Infraestructura", "Tech"],
    description: "Certificación AWS. Estándar de la industria. Salarios de $80k+ USD en remoto.",
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EMPLEOS GLOBALES (Remote + Presencial)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "emp-001",
    title: "Analista Contable Senior",
    organization: "Grupo Financiero Asunción",
    location: "Asunción, PY",
    continent: "América Latina",
    type: "empleo",
    value: "₲4.5M - ₲6M",
    deadline: "30 Abril 2026",
    compatibility: 92,
    tags: ["Contabilidad", "NIIF", "Presencial"],
    description: "Empresa líder en finanzas. Experiencia en NIIF y sistemas ERP. Beneficios competitivos.",
    liked: false,
  },
  {
    id: "emp-002",
    title: "Software Engineer - Remote",
    organization: "Stripe",
    location: "Remote (Global)",
    continent: "Global",
    type: "empleo",
    value: "$120K - $180K USD",
    deadline: "Abierto",
    compatibility: 85,
    tags: ["Tech", "Remote", "Startup"],
    description: "Empresa fintech de élite. Trabajo remoto. Salario competitivo. Acciones y beneficios.",
    liked: false,
  },
  {
    id: "emp-003",
    title: "Product Manager - Latinoamérica",
    organization: "Mercado Libre",
    location: "Buenos Aires, AR",
    continent: "América Latina",
    type: "empleo",
    value: "ARS 500K - 700K",
    deadline: "15 Abril 2026",
    compatibility: 87,
    tags: ["Product", "Liderazgo", "Tech"],
    description: "Líder en e-commerce de Latinoamérica. Gestión de productos. Equipo de alto desempeño.",
    liked: false,
  },
];

export default function JobOpportunities() {
  const [opportunities_list, setOpportunities] = useState<Opportunity[]>(opportunities);
  const [profileUploaded, setProfileUploaded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minCompatibility: 70,
    continent: "all" as string,
    type: "all" as string,
    search: "",
  });

  const toggleLike = (id: string) => {
    setOpportunities(opportunities_list.map((o) => (o.id === id ? { ...o, liked: !o.liked } : o)));
  };

  const filteredOpportunities = opportunities_list.filter((opp) => {
    if (opp.compatibility < filters.minCompatibility) return false;
    if (filters.continent !== "all" && opp.continent !== filters.continent) return false;
    if (filters.type !== "all" && opp.type !== filters.type) return false;
    if (filters.search && !opp.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const continents = ["all", ...new Set(opportunities_list.map((o) => o.continent))];
  const types = ["all", "beca_nacional", "beca_internacional", "capital_semilla", "curso", "empleo", "fondo_innovacion"];

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      beca_nacional: "🇵🇾 Beca Nacional",
      beca_internacional: "🌍 Beca Internacional",
      capital_semilla: "💰 Capital Semilla",
      curso: "📚 Curso",
      empleo: "💼 Empleo",
      fondo_innovacion: "🚀 Fondo",
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
      fondo_innovacion: "bg-red-50 border-red-200 text-red-700",
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
        <div className="container max-w-6xl px-4">

          {/* HEADER */}
          <div className="mb-10">
            <div className="text-sm font-bold text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Global Opportunity Hub
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              50+ Oportunidades Globales<br /><span className="italic font-light">en 6 continentes.</span>
            </h1>
            <p className="text-base md:text-lg text-muted max-w-3xl">
              Becas de élite (MEXT, Chevening, Fulbright), Capital Semilla (Y Combinator, 500 Global), Cursos Certificados y Empleos Remotos. Todo en un solo lugar.
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{opportunities_list.length}+ Oportunidades</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" />{continents.length - 1} Continentes</span>
            </div>
          </div>

          {/* SECCIÓN: Subir perfil */}
          {!profileUploaded ? (
            <Card className="p-6 md:p-10 border-border mb-12 bg-card">
              <div className="text-center max-w-lg mx-auto">
                <Award className="w-12 h-12 mx-auto mb-4 text-accent opacity-50" />
                <h2 className="text-2xl font-black mb-3">Comenzá con tu perfil</h2>
                <p className="text-muted mb-2 text-sm md:text-base">
                  Subí tu CV optimizado (o generá uno nuevo) para que el sistema te muestre oportunidades compatibles en todo el mundo.
                </p>

                <div className="flex items-start gap-2 bg-accent/5 border border-accent/20 rounded-lg p-3 text-xs text-muted text-left mb-6">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    Al hacer click en cualquier botón, te conectamos directamente con nuestro equipo por WhatsApp para guiarte en el proceso de aplicación.
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
                  Ver demo del listado global →
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
                    placeholder="Buscar oportunidad (MEXT, Y Combinator, Chevening...)..."
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
                      <label className="block text-sm font-bold mb-2">Continente</label>
                      <div className="flex gap-2 flex-wrap">
                        {continents.map((continent) => (
                          <button
                            key={continent}
                            onClick={() => setFilters({ ...filters, continent })}
                            className={`px-3 py-1.5 rounded border text-xs transition ${
                              filters.continent === continent
                                ? "bg-accent text-accent-foreground border-accent"
                                : "border-border hover:border-accent"
                            }`}
                          >
                            {continent === "all" ? "Todos" : continent}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Tipo</label>
                      <div className="flex gap-2 flex-wrap">
                        {types.map((type) => (
                          <button
                            key={type}
                            onClick={() => setFilters({ ...filters, type })}
                            className={`px-3 py-1.5 rounded border text-xs transition ${
                              filters.type === type
                                ? "bg-accent text-accent-foreground border-accent"
                                : "border-border hover:border-accent"
                            }`}
                          >
                            {type === "all" ? "Todos" : getTypeLabel(type).split(" ")[1]}
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
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
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-accent mb-1">{continents.length - 1}</div>
                    <div className="text-xs md:text-sm text-muted">Continentes</div>
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
