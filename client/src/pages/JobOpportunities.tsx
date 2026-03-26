import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Search, MapPin, Briefcase, DollarSign, Heart, ArrowRight, Upload, Filter, MessageCircle, Info, Globe, Award, Zap, TrendingUp, Star, Sparkles } from "lucide-react";

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
  type: "beca_nacional" | "beca_internacional" | "capital_semilla" | "curso" | "empleo" | "foro_internacional" | "pasantia";
  value?: string;
  deadline: string;
  compatibility: number;
  tags: string[];
  description: string;
  liked?: boolean;
}

const opportunities: Opportunity[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // AMÉRICA LATINA (100% Reforzado)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "py-001", title: "Becas ITAIPU - Grado y Postgrado", organization: "ITAIPU Binacional", location: "Paraguay", continent: "América Latina", type: "beca_nacional", value: "100% Cobertura", deadline: "15 Abril 2026", compatibility: 95, tags: ["Paraguay", "Elite", "Grado"], description: "La beca más importante de Paraguay para estudios universitarios de excelencia." },
  { id: "py-002", title: "BECAL - Becas de Postgrado", organization: "Gobierno de Paraguay", location: "Paraguay", continent: "América Latina", type: "beca_nacional", value: "Hasta $50,000", deadline: "30 Mayo 2026", compatibility: 92, tags: ["Paraguay", "Master", "PhD"], description: "Financiamiento para maestrías y doctorados en las mejores universidades del mundo." },
  { id: "py-003", title: "SNJ - Becas Juventud", organization: "Secretaría Nacional de la Juventud", location: "Paraguay", continent: "América Latina", type: "beca_nacional", value: "₲2.000.000", deadline: "15 Abril 2026", compatibility: 88, tags: ["Paraguay", "Apoyo", "Universitarios"], description: "Ayuda económica para estudiantes universitarios de todo el país." },
  { id: "py-004", title: "Capital Semilla Emprendedores", organization: "UIP / MIC", location: "Paraguay", continent: "América Latina", type: "capital_semilla", value: "Hasta ₲50M", deadline: "20 Abril 2026", compatibility: 90, tags: ["Paraguay", "Startup", "Fondos"], description: "Fondos no reembolsables para emprendimientos innovadores en Paraguay." },
  { id: "latam-001", title: "Becas OEA - Desarrollo Académico", organization: "Organización de los Estados Americanos", location: "Washington / Online", continent: "América Latina", type: "beca_internacional", value: "100% Cobertura", deadline: "31 Mayo 2026", compatibility: 85, tags: ["OEA", "Latam", "Postgrado"], description: "Becas para ciudadanos de estados miembros de la OEA para estudios de postgrado." },
  { id: "latam-002", title: "Alianza del Pacífico - Movilidad", organization: "Alianza del Pacífico", location: "Chile/Colombia/México/Perú", continent: "América Latina", type: "beca_internacional", value: "Pasajes + Manutención", deadline: "15 Junio 2026", compatibility: 82, tags: ["Intercambio", "Latam", "Grado"], description: "Becas de intercambio estudiantil entre los países miembros de la Alianza." },
  { id: "latam-003", title: "PRONABEC - Beca Generación E", organization: "Gobierno de Perú", location: "Perú / Global", continent: "América Latina", type: "beca_internacional", value: "Cobertura Total", deadline: "10 Mayo 2026", compatibility: 80, tags: ["Perú", "Excelencia", "Postgrado"], description: "Becas para peruanos de alto rendimiento académico para estudiar en el extranjero." },
  { id: "latam-004", title: "ICETEX - Becas para Extranjeros", organization: "Gobierno de Colombia", location: "Colombia", continent: "América Latina", type: "beca_internacional", value: "100% Cobertura", deadline: "20 Mayo 2026", compatibility: 78, tags: ["Colombia", "Intercambio", "Postgrado"], description: "Becas para extranjeros que deseen realizar estudios de postgrado en Colombia." },
  { id: "latam-005", title: "CONACYT - Becas al Extranjero", organization: "Gobierno de México", location: "México / Global", continent: "América Latina", type: "beca_internacional", value: "Estipendio Mensual", deadline: "30 Abril 2026", compatibility: 84, tags: ["México", "Ciencia", "PhD"], description: "Becas para mexicanos para realizar estudios de doctorado y maestría en el exterior." },
  { id: "latam-006", title: "ANII - Becas de Investigación", organization: "Gobierno de Uruguay", location: "Uruguay", continent: "América Latina", type: "beca_internacional", value: "Fondos de Investigación", deadline: "15 Mayo 2026", compatibility: 75, tags: ["Uruguay", "Ciencia", "I+D"], description: "Apoyo a investigadores uruguayos y extranjeros para proyectos en Uruguay." },
  { id: "latam-007", title: "Start-Up Chile - Build/Seed", organization: "CORFO", location: "Chile", continent: "América Latina", type: "capital_semilla", value: "Hasta $80,000", deadline: "10 Abril 2026", compatibility: 89, tags: ["Chile", "Startup", "Global"], description: "La aceleradora pública más importante de Latam para startups de todo el mundo." },
  { id: "latam-008", title: "Ruta N - Innovación Medellín", organization: "Alcaldía de Medellín", location: "Colombia", continent: "América Latina", type: "capital_semilla", value: "Softlanding + Fondos", deadline: "Abierto", compatibility: 86, tags: ["Colombia", "Tech", "Innovación"], description: "Apoyo para empresas tecnológicas que quieran establecerse en Medellín." },
  { id: "latam-009", title: "Fundación Carolina - Postgrado", organization: "Gobierno de España", location: "España", continent: "Europa", type: "beca_internacional", value: "Pasajes + Seguro + €1200/mes", deadline: "15 Marzo 2026", compatibility: 94, tags: ["España", "Latam", "Master"], description: "La beca preferida por latinos para estudiar en las mejores universidades de España." },
  { id: "latam-010", title: "Beca Santander - Movilidad", organization: "Banco Santander", location: "Global", continent: "Global", type: "beca_internacional", value: "€3,000", deadline: "30 Abril 2026", compatibility: 91, tags: ["Santander", "Grado", "Intercambio"], description: "Apoyo económico para estudiantes de universidades en convenio con Santander." },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOROS Y SUMMITS (5-7 Días - Alta Visibilidad)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "foro-001", title: "One Young World Summit 2026", organization: "One Young World", location: "París, Francia", continent: "Europa", type: "foro_internacional", value: "Beca Completa (Vuelo+Hotel)", deadline: "1 Mayo 2026", compatibility: 93, tags: ["Liderazgo", "París", "Elite"], description: "El foro de jóvenes líderes más influyente del mundo. Conoce a premios Nobel y CEOs globales." },
  { id: "foro-002", title: "World Youth Forum - Rusia", organization: "Gobierno de Rusia", location: "Sochi, Rusia", continent: "Europa", type: "foro_internacional", value: "Todo Incluido", deadline: "15 Enero 2026", compatibility: 85, tags: ["Rusia", "Cultura", "Networking"], description: "Evento masivo en Sochi para jóvenes de todo el mundo. Gastos cubiertos por el gobierno ruso." },
  { id: "foro-003", title: "Hesselbein Global Academy", organization: "University of Pittsburgh", location: "USA", continent: "Norteamérica", type: "foro_internacional", value: "Beca de Participación", deadline: "1 Abril 2026", compatibility: 82, tags: ["Liderazgo", "USA", "Academia"], description: "Cumbre intensiva de liderazgo para estudiantes universitarios destacados." },
  { id: "foro-004", title: "South Summit - Startup Competition", organization: "South Summit", location: "Madrid, España", continent: "Europa", type: "foro_internacional", value: "Tickets + Pitch", deadline: "15 Abril 2026", compatibility: 88, tags: ["Madrid", "Startup", "Inversores"], description: "La competencia de startups más grande del sur de Europa. Oportunidad de pitch ante VCs." },
  { id: "foro-005", title: "Web Summit - Scholarship Program", organization: "Web Summit", location: "Lisboa, Portugal", continent: "Europa", type: "foro_internacional", value: "Tickets Gratuitos", deadline: "1 Septiembre 2026", compatibility: 90, tags: ["Lisboa", "Tech", "Networking"], description: "Becas para que jóvenes talentos asistan gratis a la conferencia tecnológica más grande del mundo." },
  { id: "foro-006", title: "Global Shapers - WEF", organization: "World Economic Forum", location: "Global", continent: "Global", type: "foro_internacional", value: "Membresía + Eventos", deadline: "Abierto", compatibility: 87, tags: ["WEF", "Liderazgo", "Impacto"], description: "Red de jóvenes líderes del Foro Económico Mundial con hubs en todo el mundo." },

  // ═══════════════════════════════════════════════════════════════════════════
  // ASIA (Becas de Cobertura Total)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "asia-001", title: "MEXT - Beca Monbukagakusho", organization: "Gobierno de Japón", location: "Japón", continent: "Asia", type: "beca_internacional", value: "¥144,000/mes + Vuelos", deadline: "20 Abril 2026", compatibility: 96, tags: ["Japón", "Elite", "PhD"], description: "La beca más prestigiosa de Asia. Cobertura total para estudios en Japón." },
  { id: "asia-002", title: "GKS - Global Korea Scholarship", organization: "Gobierno de Corea", location: "Corea del Sur", continent: "Asia", type: "beca_internacional", value: "₩900,000/mes + Vuelos", deadline: "10 Abril 2026", compatibility: 94, tags: ["Corea", "K-Culture", "Master"], description: "Beca completa para estudiar en las mejores universidades de Corea del Sur." },
  { id: "asia-003", title: "CSC - Chinese Government Scholarship", organization: "Gobierno de China", location: "China", continent: "Asia", type: "beca_internacional", value: "¥3,000/mes + Matrícula", deadline: "31 Marzo 2026", compatibility: 89, tags: ["China", "Investigación", "Master"], description: "Becas completas para estudiar en universidades chinas de primer nivel." },
  { id: "asia-004", title: "Singapore International Graduate Award", organization: "A*STAR", location: "Singapur", continent: "Asia", type: "beca_internacional", value: "S$2,200/mes + Vuelos", deadline: "1 Junio 2026", compatibility: 85, tags: ["Singapur", "STEM", "PhD"], description: "Becas para doctorado en ciencias e ingeniería en Singapur." },
  { id: "asia-005", title: "Taiwan ICDF Scholarship", organization: "Gobierno de Taiwán", location: "Taiwán", continent: "Asia", type: "beca_internacional", value: "NT$15,000/mes + Vuelos", deadline: "15 Marzo 2026", compatibility: 88, tags: ["Taiwán", "Desarrollo", "Master"], description: "Becas para estudios de postgrado en áreas de desarrollo y tecnología." },

  // ═══════════════════════════════════════════════════════════════════════════
  // CAPITAL SEMILLA Y STARTUPS (Global)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "seed-001", title: "Y Combinator - Summer Batch", organization: "Y Combinator", location: "San Francisco, USA", continent: "Norteamérica", type: "capital_semilla", value: "$500,000", deadline: "31 Marzo 2026", compatibility: 98, tags: ["Startup", "Elite", "Silicon Valley"], description: "La aceleradora más famosa del mundo. Inversión y red de contactos inigualable." },
  { id: "seed-002", title: "500 Global - Flagship Accelerator", organization: "500 Global", location: "Global", continent: "Global", type: "capital_semilla", value: "$150,000", deadline: "15 Abril 2026", compatibility: 95, tags: ["Startup", "Inversión", "Global"], description: "Inversión en startups de etapa temprana con enfoque en crecimiento rápido." },
  { id: "seed-003", title: "Techstars Accelerator Program", organization: "Techstars", location: "Global", continent: "Global", type: "capital_semilla", value: "$120,000", deadline: "Abierto", compatibility: 92, tags: ["Startup", "Mentoría", "Global"], description: "Programa de aceleración basado en mentoría con presencia en las principales ciudades del mundo." },
  { id: "seed-004", title: "Plug and Play - Innovation Platform", organization: "Plug and Play", location: "Silicon Valley / Global", continent: "Global", type: "capital_semilla", value: "Inversión + Corporativos", deadline: "Abierto", compatibility: 89, tags: ["Startup", "Corporativo", "Silicon Valley"], description: "Conexión directa entre startups y las corporaciones más grandes del mundo." },
  { id: "seed-005", title: "Anterra Capital - Food & AgTech", organization: "Anterra Capital", location: "Ámsterdam / Boston", continent: "Global", type: "capital_semilla", value: "Hasta $5M", deadline: "Abierto", compatibility: 84, tags: ["AgTech", "FoodTech", "Inversión"], description: "Fondo de inversión especializado en tecnología para la agricultura y alimentación." },

  // ═══════════════════════════════════════════════════════════════════════════
  // PASANTÍAS INTERNACIONALES (Organismos)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "intern-001", title: "Pasantías ONU - New York", organization: "Naciones Unidas", location: "New York, USA", continent: "Norteamérica", type: "pasantia", value: "Experiencia Elite", deadline: "Abierto", compatibility: 90, tags: ["ONU", "Diplomacia", "Elite"], description: "Oportunidad de trabajar en la sede central de la ONU. Ideal para perfiles internacionales." },
  { id: "intern-002", title: "Pasantías Banco Mundial", organization: "World Bank Group", location: "Washington DC", continent: "Norteamérica", type: "pasantia", value: "Estipendio Mensual", deadline: "31 Enero 2026", compatibility: 88, tags: ["Finanzas", "Desarrollo", "USA"], description: "Pasantías remuneradas para estudiantes de postgrado en desarrollo internacional." },
  { id: "intern-003", title: "Pasantías BID - Washington", organization: "Banco Interamericano de Desarrollo", location: "Washington DC", continent: "Norteamérica", type: "pasantia", value: "Remunerado", deadline: "15 Marzo 2026", compatibility: 92, tags: ["BID", "Latam", "Economía"], description: "Programa de pasantías para jóvenes de países miembros del BID." },
  { id: "intern-004", title: "Pasantías Google - STEP", organization: "Google", location: "Global", continent: "Global", type: "pasantia", value: "Salario Competitivo", deadline: "1 Diciembre 2026", compatibility: 95, tags: ["Google", "Tech", "Software"], description: "Programa de pasantías para estudiantes de ciencias de la computación." },

  // ═══════════════════════════════════════════════════════════════════════════
  // EUROPA (Becas de Élite Adicionales)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "eu-001", title: "Chevening Scholarships - UK", organization: "Gobierno del Reino Unido", location: "Reino Unido", continent: "Europa", type: "beca_internacional", value: "100% Cobertura", deadline: "1 Noviembre 2026", compatibility: 97, tags: ["UK", "Elite", "Master"], description: "La beca más prestigiosa del Reino Unido para líderes emergentes." },
  { id: "eu-002", title: "DAAD - Becas Alemania", organization: "Gobierno de Alemania", location: "Alemania", continent: "Europa", type: "beca_internacional", value: "€934/mes + Vuelos", deadline: "15 Abril 2026", compatibility: 93, tags: ["Alemania", "Ciencia", "Master"], description: "Becas para estudios de postgrado e investigación en universidades alemanas." },
  { id: "eu-003", title: "Erasmus Mundus Joint Masters", organization: "Unión Europea", location: "Varios Países", continent: "Europa", type: "beca_internacional", value: "€1,400/mes + Matrícula", deadline: "1 Febrero 2026", compatibility: 95, tags: ["Europa", "Viajes", "Master"], description: "Estudia en al menos 3 países europeos diferentes con beca completa." },
  { id: "eu-004", title: "Eiffel Excellence Scholarship", organization: "Gobierno de Francia", location: "Francia", continent: "Europa", type: "beca_internacional", value: "€1,181/mes + Vuelos", deadline: "10 Enero 2026", compatibility: 91, tags: ["Francia", "Elite", "Master"], description: "Becas para estudiantes internacionales destacados en universidades francesas." },
  { id: "eu-005", title: "Holland Scholarship", organization: "Gobierno de Holanda", location: "Países Bajos", continent: "Europa", type: "beca_internacional", value: "€5,000", deadline: "1 Mayo 2026", compatibility: 85, tags: ["Holanda", "Grado", "Master"], description: "Apoyo para estudiantes de fuera del Espacio Económico Europeo." },

  // ═══════════════════════════════════════════════════════════════════════════
  // NORTEAMÉRICA Y OCEANÍA
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "na-001", title: "Fulbright Scholarship - USA", organization: "Gobierno de USA", location: "Estados Unidos", continent: "Norteamérica", type: "beca_internacional", value: "Cobertura Total", deadline: "30 Abril 2026", compatibility: 98, tags: ["USA", "Elite", "Master"], description: "El programa de intercambio educativo más prestigioso de los Estados Unidos." },
  { id: "na-002", title: "Vanier Canada Graduate Scholarships", organization: "Gobierno de Canadá", location: "Canadá", continent: "Norteamérica", type: "beca_internacional", value: "$50,000/año", deadline: "1 Noviembre 2026", compatibility: 89, tags: ["Canadá", "PhD", "Investigación"], description: "Becas de doctorado de alto nivel para estudiantes internacionales en Canadá." },
  { id: "oc-001", title: "Australia Awards Scholarships", organization: "Gobierno de Australia", location: "Australia", continent: "Oceanía", type: "beca_internacional", value: "Cobertura Total", deadline: "30 Abril 2026", compatibility: 92, tags: ["Australia", "Desarrollo", "Master"], description: "Becas completas para líderes de países en desarrollo para estudiar en Australia." },
  { id: "oc-002", title: "Manaaki New Zealand Scholarships", organization: "Gobierno de Nueva Zelanda", location: "Nueva Zelanda", continent: "Oceanía", type: "beca_internacional", value: "Cobertura Total", deadline: "28 Febrero 2026", compatibility: 90, tags: ["NZ", "Sostenibilidad", "Master"], description: "Becas para estudios de postgrado enfocados en el desarrollo sostenible." },

  // ═══════════════════════════════════════════════════════════════════════════
  // CURSOS Y CERTIFICACIONES (Alta Demanda)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "curso-001", title: "Certificación SAP S/4HANA", organization: "SAP Academy", location: "Online", continent: "Global", type: "curso", value: "Certificación Oficial", deadline: "Abierto", compatibility: 96, tags: ["SAP", "ERP", "Empresas"], description: "La certificación más demandada por las grandes empresas en Paraguay y el mundo." },
  { id: "curso-002", title: "Google Data Analytics Professional", organization: "Google / Coursera", location: "Online", continent: "Global", type: "curso", value: "Certificado Google", deadline: "Abierto", compatibility: 94, tags: ["Data", "Google", "Tech"], description: "Aprende análisis de datos con las herramientas oficiales de Google." },
  { id: "curso-003", title: "AWS Certified Solutions Architect", organization: "Amazon Web Services", location: "Online", continent: "Global", type: "curso", value: "Certificación Cloud", deadline: "Abierto", compatibility: 92, tags: ["Cloud", "AWS", "IT"], description: "Domina la infraestructura en la nube con la plataforma líder del mercado." },
  { id: "curso-004", title: "Inglés para Negocios - British Council", organization: "British Council", location: "Online", continent: "Global", type: "curso", value: "Certificado Internacional", deadline: "Abierto", compatibility: 98, tags: ["Inglés", "Negocios", "Elite"], description: "Mejora tu nivel de inglés enfocado en el entorno profesional global." },
  { id: "curso-005", title: "Excel Avanzado para Finanzas", organization: "CVitae Academy", location: "Online", continent: "Global", type: "curso", value: "Certificado CVitae", deadline: "Abierto", compatibility: 100, tags: ["Excel", "Finanzas", "Productividad"], description: "Domina Excel al nivel que exigen los bancos y consultoras internacionales." },
];

export default function JobOpportunities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedContinent, setSelectedContinent] = useState<string>("all");

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === "all" || opp.type === selectedType;
    const matchesContinent = selectedContinent === "all" || opp.continent === selectedContinent;
    return matchesSearch && matchesType && matchesContinent;
  });

  const typeLabels: Record<string, string> = {
    all: "Todos",
    beca_nacional: "Becas Nacionales",
    beca_internacional: "Becas Internacionales",
    capital_semilla: "Capital Semilla",
    curso: "Cursos",
    empleo: "Empleos",
    foro_internacional: "Foros",
    pasantia: "Pasantías"
  };

  const continents = ["all", "América Latina", "Europa", "Asia", "Norteamérica", "Oceanía", "Global"];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-accent to-secondary py-16 px-4 text-white">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-6 h-6 animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-sm">Global Opportunity Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Tu pasaporte al <br />
            <span className="italic font-light">éxito mundial.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Explora 100+ becas de élite, foros internacionales, capital semilla y empleos remotos. 
            No solo busques, aplica con una estrategia ganadora.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-black">100+</p>
                <p className="text-xs uppercase font-bold opacity-80">Oportunidades</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-black">6</p>
                <p className="text-xs uppercase font-bold opacity-80">Continentes</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 flex items-center gap-3">
              <Zap className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-black">24h</p>
                <p className="text-xs uppercase font-bold opacity-80">Actualización</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BUSCADOR Y FILTROS */}
      <section className="container max-w-6xl -mt-8 px-4">
        <Card className="p-6 shadow-xl border-border bg-card/80 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Buscar por nombre, país o habilidad (ej: Japón, Python, Beca)..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="w-full p-2 bg-background border border-border rounded-md text-sm"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {Object.entries(typeLabels).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
              <select 
                className="w-full p-2 bg-background border border-border rounded-md text-sm"
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
              >
                {continents.map(c => (
                  <option key={c} value={c}>{c === "all" ? "Continentes" : c}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </section>

      {/* LISTADO DE OPORTUNIDADES */}
      <main className="container max-w-6xl mt-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            Resultados Encontrados ({filteredOpportunities.length})
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Filter className="w-4 h-4" />
            <span>Ordenado por relevancia</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <Card key={opp.id} className="flex flex-col border-border hover:border-accent hover:shadow-lg transition-all group overflow-hidden">
              {/* HEADER CARD */}
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-accent/10 text-accent text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
                    {typeLabels[opp.type]}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    <Zap className="w-3 h-3" />
                    {opp.compatibility}% Match
                  </div>
                </div>

                <h3 className="text-xl font-black mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {opp.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-muted mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{opp.location}</span>
                  <span className="mx-1">•</span>
                  <Globe className="w-4 h-4" />
                  <span>{opp.continent}</span>
                </div>

                <p className="text-sm text-muted mb-6 line-clamp-3">
                  {opp.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {opp.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* FOOTER CARD */}
              <div className="p-6 pt-0 mt-auto border-t border-border bg-accent/5">
                <div className="flex items-center justify-between mb-4 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-muted">Valor / Apoyo</span>
                    <span className="text-sm font-black text-accent">{opp.value || "Consultar"}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-muted">Cierre</span>
                    <span className="text-sm font-bold">{opp.deadline}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a href={WA_APLICAR(opp.title, typeLabels[opp.type])} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs font-bold">
                      Aplicar Ahora
                    </Button>
                  </a>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 text-xs font-bold">
                    Detalles
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-black mb-2">No encontramos resultados</h3>
            <p className="text-muted">Intenta con otros filtros o términos de búsqueda.</p>
            <Button 
              variant="link" 
              className="mt-4 text-accent font-bold"
              onClick={() => {setSearchQuery(""); setSelectedType("all"); setSelectedContinent("all");}}
            >
              Limpiar todos los filtros
            </Button>
          </div>
        )}
      </main>

      {/* CTA SECCIÓN */}
      <section className="container max-w-4xl mt-20 px-4">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-accent/10 border-accent/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-32 h-32 text-accent" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl font-black mb-4">¿Tu CV está listo para competir?</h2>
            <p className="text-muted mb-8 max-w-xl">
              Las oportunidades de élite reciben miles de aplicaciones. No dejes tu futuro al azar. 
              Optimizamos tu perfil para que pases los filtros ATS y destaques ante los comités de selección.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <a href={WA_GENERAR} target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 h-auto text-lg font-black">
                  Optimizar mi Perfil Ahora
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href={WA_PERFIL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 px-8 py-6 h-auto text-lg font-black">
                  Diagnóstico Gratuito
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </section>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a 
        href={WA_BASE} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
