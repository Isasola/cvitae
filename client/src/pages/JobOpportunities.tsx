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
  rubro?: "Tecnología" | "Finanzas" | "Marketing" | "RRHH" | "Ingeniería" | "Salud" | "Ventas" | "Otros";
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

  // ═══════════════════════════════════════════════════════════════════════════
  // EMPLEOS POR RUBRO (Paraguay & Latam Remoto)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "job-001", title: "Senior Full Stack Developer", organization: "Mercado Libre", location: "Remoto (Latam)", continent: "América Latina", type: "empleo", rubro: "Tecnología", value: "$3,500 - $5,500 USD", deadline: "Abierto", compatibility: 95, tags: ["React", "Node.js", "Senior"], description: "Únete al equipo de desarrollo de la plataforma e-commerce líder de Latam." },
  { id: "job-002", title: "Analista Contable Senior", organization: "KPMG Paraguay", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Finanzas", value: "₲8M - ₲12M", deadline: "15 Abril 2026", compatibility: 92, tags: ["Contabilidad", "NIIF", "Auditoría"], description: "Buscamos profesional contable con experiencia en auditoría externa y normas internacionales." },
  { id: "job-003", title: "Growth Marketing Manager", organization: "Rappi", location: "Remoto (Latam)", continent: "América Latina", type: "empleo", rubro: "Marketing", value: "$2,500 - $4,000 USD", deadline: "Abierto", compatibility: 88, tags: ["Growth", "Analytics", "Digital"], description: "Lidera las estrategias de crecimiento y adquisición de usuarios en la región." },
  { id: "job-004", title: "Especialista en Selección IT", organization: "Accenture", location: "Remoto", continent: "Global", type: "empleo", rubro: "RRHH", value: "$2,000 - $3,500 USD", deadline: "Abierto", compatibility: 90, tags: ["Recruiting", "Tech", "Talento"], description: "Búsqueda y selección de perfiles tecnológicos para proyectos globales." },
  { id: "job-005", title: "Ingeniero de Proyectos Civiles", organization: "Jiménez Gaona & Lima", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Ingeniería", value: "₲10M - ₲15M", deadline: "20 Abril 2026", compatibility: 85, tags: ["Civil", "Obras", "Gestión"], description: "Liderazgo de obras de infraestructura vial y civil en Paraguay." },
  { id: "job-006", title: "Médico Especialista (Telemedicina)", organization: "SaludSA", location: "Remoto", continent: "América Latina", type: "empleo", rubro: "Salud", value: "$3,000 USD", deadline: "Abierto", compatibility: 82, tags: ["Medicina", "Teleconsulta", "Salud"], description: "Atención médica remota para pacientes en toda Latinoamérica." },
  { id: "job-007", title: "Gerente de Ventas Regional", organization: "Unilever", location: "Asunción / Regional", continent: "América Latina", type: "empleo", rubro: "Ventas", value: "Sueldo + Comisiones", deadline: "30 Abril 2026", compatibility: 94, tags: ["Ventas", "Consumo Masivo", "Liderazgo"], description: "Gestión de canales de venta y distribución para el Cono Sur." },
  { id: "job-008", title: "Data Scientist Junior", organization: "Stripe", location: "Remoto", continent: "Global", type: "empleo", rubro: "Tecnología", value: "$4,000 USD", deadline: "Abierto", compatibility: 87, tags: ["Python", "SQL", "Data"], description: "Análisis de datos financieros para la prevención de fraude global." },
  { id: "job-009", title: "Auditor Interno", organization: "Banco Continental", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Finanzas", value: "₲7M - ₲10M", deadline: "10 Abril 2026", compatibility: 89, tags: ["Banca", "Auditoría", "Riesgos"], description: "Control y auditoría de procesos bancarios y cumplimiento normativo." },
  { id: "job-010", title: "Social Media Strategist", organization: "Agencia Publicitaria", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Marketing", value: "₲4M - ₲6M", deadline: "Abierto", compatibility: 91, tags: ["Social Media", "Contenido", "Ads"], description: "Creación y gestión de estrategias digitales para marcas líderes locales." },

  // ═══════════════════════════════════════════════════════════════════════════
  // MULTINACIONALES - CONSUMO MASIVO Y RETAIL
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "multi-001", title: "Gerente Regional de Ventas", organization: "Unilever", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Ventas", value: "₲10M - ₲15M", deadline: "Abierto", compatibility: 94, tags: ["Unilever", "Ventas", "Liderazgo"], description: "Gestión de canales de distribución para el Cono Sur." },
  { id: "multi-002", title: "Especialista en Logstica", organization: "Nestlé", location: "Remoto (Latam)", continent: "América Latina", type: "empleo", rubro: "Otros", value: "$2,500 USD", deadline: "Abierto", compatibility: 88, tags: ["Nestlé", "Logística", "Supply Chain"], description: "Optimización de cadena de suministro para productos alimenticios." },
  { id: "multi-003", title: "Representante de Ventas - Coca-Cola", organization: "Coca-Cola", location: "Asunción / Interior", continent: "América Latina", type: "empleo", rubro: "Ventas", value: "₲4M - ₲6M + Comisiones", deadline: "Abierto", compatibility: 90, tags: ["Coca-Cola", "Ventas", "Bebidas"], description: "Colocación y promoción de productos en puntos de venta." },
  { id: "multi-004", title: "Asistente de Atención al Cliente", organization: "PedidosYa", location: "Remoto", continent: "América Latina", type: "empleo", rubro: "RRHH", value: "₲3M - ₲4M", deadline: "Abierto", compatibility: 85, tags: ["PedidosYa", "Atención", "Remoto"], description: "Soporte a usuarios de la plataforma de delivery más grande de Latam." },
  { id: "multi-005", title: "Operario de Almacén", organization: "Amazon", location: "Remoto (Latam)", continent: "América Latina", type: "empleo", rubro: "Otros", value: "$1,800 USD", deadline: "Abierto", compatibility: 82, tags: ["Amazon", "Logística", "Operarios"], description: "Gestión de inventario y embalaje en centros de distribución." },
  { id: "multi-006", title: "Promotor de Ventas", organization: "Procter & Gamble", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Ventas", value: "₲3.5M - ₲5M", deadline: "Abierto", compatibility: 88, tags: ["P&G", "Promoción", "Retail"], description: "Promoción de productos de higiene y cuidado personal." },

  // ═══════════════════════════════════════════════════════════════════════════
  // CRUCEROS Y AEROLINEAS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "cruise-001", title: "Tripulante de Cabina - Crucero", organization: "Royal Caribbean", location: "Miami / Embarque", continent: "Norteamérica", type: "empleo", rubro: "Otros", value: "$1,500 USD + Comidas", deadline: "Abierto", compatibility: 87, tags: ["Crucero", "Viajes", "Hoteleria"], description: "Atención a pasajeros en cruceros de lujo. Alojamiento y comidas incluidas." },
  { id: "cruise-002", title: "Chef de Crucero", organization: "Carnival Cruise Line", location: "Embarque Global", continent: "Global", type: "empleo", rubro: "Otros", value: "$2,000 USD + Alojamiento", deadline: "Abierto", compatibility: 89, tags: ["Crucero", "Cocina", "Gastronomia"], description: "Preparación de alimentos para miles de pasajeros en cruceros internacionales." },
  { id: "cruise-003", title: "Animador de Entretenimiento", organization: "Disney Cruise Line", location: "Embarque Global", continent: "Global", type: "empleo", rubro: "Otros", value: "$1,800 USD + Beneficios", deadline: "Abierto", compatibility: 85, tags: ["Disney", "Entretenimiento", "Crucero"], description: "Entretenimiento y animación para familias en cruceros de lujo." },
  { id: "airline-001", title: "Tripulante de Cabina - Emirates", organization: "Emirates Airlines", location: "Dubai / Global", continent: "Global", type: "empleo", rubro: "Otros", value: "$2,500 USD + Beneficios", deadline: "Abierto", compatibility: 92, tags: ["Emirates", "Avión", "Internacional"], description: "Atención a pasajeros en vuelos internacionales de la aerolínea más lujosa del mundo." },
  { id: "airline-002", title: "Agente de Tierra - Copa Airlines", organization: "Copa Airlines", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲4M - ₲6M", deadline: "Abierto", compatibility: 88, tags: ["Copa", "Aerolinea", "Paraguay"], description: "Atención a pasajeros en mostrador y coordinación de vuelos." },
  { id: "airline-003", title: "Tripulante de Cabina - Qatar Airways", organization: "Qatar Airways", location: "Doha / Global", continent: "Global", type: "empleo", rubro: "Otros", value: "$2,200 USD + Alojamiento", deadline: "Abierto", compatibility: 90, tags: ["Qatar", "Avión", "Lujo"], description: "Servicio premium en la aerolínea ganadora de más premios internacionales." },
  { id: "airline-004", title: "Mantenimiento de Aeronaves", organization: "LATAM Airlines", location: "Remoto (Latam)", continent: "América Latina", type: "empleo", rubro: "Ingeniería", value: "$3,500 USD", deadline: "Abierto", compatibility: 86, tags: ["LATAM", "Mantenimiento", "Ingeniería"], description: "Mantenimiento preventivo y correctivo de flota de aeronaves." },

  // ═══════════════════════════════════════════════════════════════════════════
  // ORGANISMOS INTERNACIONALES Y ONGs
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "org-001", title: "Oficial de Programas - OEA", organization: "Organización de Estados Americanos", location: "Washington DC", continent: "Norteamérica", type: "pasantia", rubro: "Otros", value: "Pasantía Remunerada", deadline: "Abierto", compatibility: 88, tags: ["OEA", "Diplomacia", "Pasantia"], description: "Trabajo en programas de desarrollo y cooperación interamericana." },
  { id: "org-002", title: "Especialista en MERCOSUR", organization: "Secretaría del MERCOSUR", location: "Montevideo", continent: "América Latina", type: "empleo", rubro: "Otros", value: "$2,800 USD", deadline: "Abierto", compatibility: 85, tags: ["MERCOSUR", "Integración", "Comercio"], description: "Trabajo en integración económica y comercial del MERCOSUR." },
  { id: "org-003", title: "Coordinador de Proyectos - UNICEF", organization: "UNICEF Paraguay", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "$2,200 USD", deadline: "Abierto", compatibility: 89, tags: ["UNICEF", "Infancia", "ONG"], description: "Coordinación de programas de protección de la infancia." },
  { id: "org-004", title: "Voluntario - Cruz Roja", organization: "Cruz Roja Paraguaya", location: "Asunción / Regional", continent: "América Latina", type: "empleo", rubro: "Salud", value: "Honorarios + Capacitación", deadline: "Abierto", compatibility: 82, tags: ["Cruz Roja", "Voluntariado", "Salud"], description: "Voluntariado en emergencias sanitarias y programas de salud comunitaria." },
  { id: "org-005", title: "Especialista en Desarrollo - BID", organization: "Banco Interamericano de Desarrollo", location: "Washington DC", continent: "Norteamérica", type: "pasantia", rubro: "Finanzas", value: "Pasantía Remunerada + Vivienda", deadline: "Abierto", compatibility: 90, tags: ["BID", "Desarrollo", "Finanzas"], description: "Pasantía en proyectos de desarrollo económico para Latam." },
  { id: "org-006", title: "Oficial de Programas - Techo", organization: "Techo", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲4M - ₲5M", deadline: "Abierto", compatibility: 87, tags: ["Techo", "Vivienda", "ONG"], description: "Trabajo en programas de vivienda digna para comunidades vulnerables." },
  { id: "org-007", title: "Coordinador de Proyectos - Plan International", organization: "Plan International Paraguay", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "$2,000 USD", deadline: "Abierto", compatibility: 86, tags: ["Plan", "Derechos", "ONG"], description: "Coordinación de programas de derechos de niños y jóvenes." },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPORTUNIDADES PARA LATINOS EN EL EXTRANJERO
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "abroad-001", title: "Work & Travel - USA", organization: "J-1 Visa Program", location: "Estados Unidos", continent: "Norteamérica", type: "empleo", rubro: "Otros", value: "$15 - $20 USD/hora", deadline: "31 Marzo 2026", compatibility: 91, tags: ["USA", "Verano", "Estudiantes"], description: "Programa de trabajo y viaje para estudiantes latinos en USA durante el verano." },
  { id: "abroad-002", title: "Au Pair - Alemania", organization: "Au Pair Agency", location: "Alemania", continent: "Europa", type: "empleo", rubro: "Otros", value: "€400/mes + Alojamiento", deadline: "Abierto", compatibility: 88, tags: ["Alemania", "Au Pair", "Familia"], description: "Cuidado de niños en familias alemanas. Incluye alojamiento y comidas." },
  { id: "abroad-003", title: "Profesor de Español - Francia", organization: "Ministerio de Educación Francia", location: "Francia", continent: "Europa", type: "empleo", rubro: "Otros", value: "€1,200 - €1,500/mes", deadline: "30 Abril 2026", compatibility: 89, tags: ["Francia", "Educación", "Idioma"], description: "Enseñanza de español en escuelas francesas. Visa de trabajo incluida." },
  { id: "abroad-004", title: "Digital Nomad Visa - Portugal", organization: "Gobierno de Portugal", location: "Portugal", continent: "Europa", type: "empleo", rubro: "Tecnología", value: "Flexible", deadline: "Abierto", compatibility: 90, tags: ["Portugal", "Remoto", "Visa"], description: "Visa para nómadas digitales. Trabaja remoto desde Portugal con visa de 1 año." },
  { id: "abroad-005", title: "Working Holiday - Australia", organization: "Gobierno de Australia", location: "Australia", continent: "Oceanía", type: "empleo", rubro: "Otros", value: "$25 - $35 AUD/hora", deadline: "Abierto", compatibility: 87, tags: ["Australia", "Viaje", "Trabajo"], description: "Visa de trabajo y viaje para jóvenes latinos. Hasta 1 año en Australia." },
  { id: "abroad-006", title: "Profesor de Inglés - Corea del Sur", organization: "EPIK Program", location: "Corea del Sur", continent: "Asia", type: "empleo", rubro: "Otros", value: "$1,800 - $2,500 USD/mes", deadline: "Abierto", compatibility: 85, tags: ["Corea", "Educación", "Asia"], description: "Enseñanza de inglés en escuelas coreanas. Alojamiento y seguro incluidos." },
  { id: "abroad-007", title: "Trabajador Agrícola - Canadá", organization: "Programa de Movilidad Laboral", location: "Canadá", continent: "Norteamérica", type: "empleo", rubro: "Otros", value: "$15 - $18 CAD/hora", deadline: "31 Mayo 2026", compatibility: 82, tags: ["Canadá", "Agricultura", "Temporal"], description: "Trabajo temporal en granjas de Canadá. Alojamiento y comidas proporcionadas." },
  { id: "abroad-008", title: "Camarero - Suiza", organization: "Hoteles de Lujo", location: "Suiza", continent: "Europa", type: "empleo", rubro: "Otros", value: "CHF 3,500 - CHF 4,500/mes", deadline: "Abierto", compatibility: 88, tags: ["Suiza", "Hoteleria", "Lujo"], description: "Trabajo en hoteles de 5 estrellas en Suiza. Salarios altos y beneficios." },

  // ═══════════════════════════════════════════════════════════════════════════
  // PUESTOS BÁSICOS Y ENTRY-LEVEL (Paraguay)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "entry-001", title: "Cajero/a", organization: "Supermercados Py", location: "Asunción / Interior", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲2.5M - ₲3.5M", deadline: "Abierto", compatibility: 80, tags: ["Retail", "Cajero", "Entry"], description: "Atención al cliente y manejo de caja en supermercados." },
  { id: "entry-002", title: "Reponedor de Mercadería", organization: "Distribuidoras Varias", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲2M - ₲3M", deadline: "Abierto", compatibility: 78, tags: ["Retail", "Logística", "Entry"], description: "Acomodo y reposición de productos en puntos de venta." },
  { id: "entry-003", title: "Mesero/a", organization: "Restaurantes Varios", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲3M + Propinas", deadline: "Abierto", compatibility: 82, tags: ["Gastronomía", "Mesero", "Entry"], description: "Atención a clientes en restaurantes. Oportunidad de propinas." },
  { id: "entry-004", title: "Repartidor/a", organization: "Empresas de Delivery", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲2.5M + Comisiones", deadline: "Abierto", compatibility: 85, tags: ["Delivery", "Transporte", "Entry"], description: "Reparto de pedidos. Flexibilidad de horarios y ganancias por comisión." },
  { id: "entry-005", title: "Vendedor/a de Telefonos", organization: "Tiendas de Electrónica", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Ventas", value: "₲3.5M + Comisiones", deadline: "Abierto", compatibility: 83, tags: ["Electrónica", "Ventas", "Entry"], description: "Venta de teléfonos y accesorios. Comisiones por ventas." },
  { id: "entry-006", title: "Guardia de Seguridad", organization: "Empresas de Seguridad", location: "Asunción / Interior", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲3M - ₲4M", deadline: "Abierto", compatibility: 81, tags: ["Seguridad", "Vigilancia", "Entry"], description: "Vigilancia y seguridad en comercios y empresas. Turnos rotativos." },
  { id: "entry-007", title: "Auxiliar de Limpieza", organization: "Empresas de Limpieza", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲1.8M - ₲2.5M", deadline: "Abierto", compatibility: 79, tags: ["Limpieza", "Mantenimiento", "Entry"], description: "Limpieza y mantenimiento de oficinas y comercios." },
  { id: "entry-008", title: "Teleoperador/a", organization: "Call Centers Py", location: "Remoto / Presencial", continent: "América Latina", type: "empleo", rubro: "RRHH", value: "₲3M - ₲4M", deadline: "Abierto", compatibility: 84, tags: ["Call Center", "Atención", "Entry"], description: "Atención telefónica a clientes. Posibilidad de trabajo remoto." },
  { id: "entry-009", title: "Asistente de Farmacia", organization: "Farmacias Varias", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Salud", value: "₲2.5M - ₲3.5M", deadline: "Abierto", compatibility: 80, tags: ["Farmacia", "Salud", "Entry"], description: "Atención al cliente y manejo de inventario en farmacias." },
  { id: "entry-010", title: "Promotor de Banco", organization: "Bancos Varios", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Finanzas", value: "₲4M - ₲5M + Bonos", deadline: "Abierto", compatibility: 86, tags: ["Banca", "Ventas", "Entry"], description: "Promoción de productos y servicios bancarios en puntos de venta." },

  // ═══════════════════════════════════════════════════════════════════════════
  // SICCA Y EMPLEOS PÚBLICOS (Paraguay & Latam)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "sicca-001", title: "Abogado/a - Ministerio de Justicia", organization: "SICCA - Función Pública", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲8M - ₲12M", deadline: "15 Abril 2026", compatibility: 90, tags: ["SICCA", "Público", "Abogado"], description: "Concurso de mérito para abogados en el Ministerio de Justicia." },
  { id: "sicca-002", title: "Contador/a - Ministerio de Hacienda", organization: "SICCA - Función Pública", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Finanzas", value: "₲6M - ₲9M", deadline: "20 Abril 2026", compatibility: 88, tags: ["SICCA", "Público", "Contabilidad"], description: "Concurso para contadores en el Ministerio de Hacienda." },
  { id: "sicca-003", title: "Enfermero/a - Ministerio de Salud", organization: "SICCA - Función Pública", location: "Asunción / Regional", continent: "América Latina", type: "empleo", rubro: "Salud", value: "₲4M - ₲6M", deadline: "10 Abril 2026", compatibility: 85, tags: ["SICCA", "Salud", "Público"], description: "Concurso para enfermeros en hospitales públicos." },
  { id: "sicca-004", title: "Profesor/a - Ministerio de Educación", organization: "SICCA - Función Pública", location: "Asunción / Interior", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲4M - ₲5M", deadline: "25 Abril 2026", compatibility: 87, tags: ["SICCA", "Educación", "Público"], description: "Concurso para docentes en escuelas públicas de Paraguay." },
  { id: "sicca-005", title: "Ingeniero Civil - Ministerio de Obras Públicas", organization: "SICCA - Función Pública", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Ingeniería", value: "₲10M - ₲14M", deadline: "30 Abril 2026", compatibility: 89, tags: ["SICCA", "Ingeniería", "Obras"], description: "Concurso para ingenieros civiles en proyectos de infraestructura." },
  { id: "portal-chile-001", title: "Especialista en Desarrollo - Gobierno de Chile", organization: "Portal Empleos Públicos Chile", location: "Santiago", continent: "América Latina", type: "empleo", rubro: "Otros", value: "$2,500 USD", deadline: "Abierto", compatibility: 84, tags: ["Chile", "Público", "Desarrollo"], description: "Empleos en la administración pública chilena." },
  { id: "portal-col-001", title: "Oficial de Programas - Gobierno de Colombia", organization: "Portal del Estado Colombia", location: "Bogotá", continent: "América Latina", type: "empleo", rubro: "Otros", value: "$2,200 USD", deadline: "Abierto", compatibility: 83, tags: ["Colombia", "Público", "Programas"], description: "Empleos en entidades del gobierno colombiano." },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONSTRUCCIÓN Y OBRAS
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "const-001", title: "Capataz de Obra", organization: "Empresas Constructoras", location: "Asunción / Interior", continent: "América Latina", type: "empleo", rubro: "Ingeniería", value: "₲8M - ₲12M", deadline: "Abierto", compatibility: 82, tags: ["Construcción", "Liderazgo", "Obra"], description: "Supervisión de obras y coordinación de equipos de construcción." },
  { id: "const-002", title: "Albáñil Especializado", organization: "Empresas Constructoras", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Ingeniería", value: "₲4M - ₲6M", deadline: "Abierto", compatibility: 78, tags: ["Construcción", "Albáñil", "Obra"], description: "Trabajo en construcción de edificios y estructuras." },
  { id: "const-003", title: "Maestro Electricista", organization: "Empresas de Construcción", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Ingeniería", value: "₲6M - ₲8M", deadline: "Abierto", compatibility: 80, tags: ["Electricidad", "Especializado", "Obra"], description: "Instalaciones eléctricas en proyectos de construcción." },
  { id: "const-004", title: "Soldador", organization: "Empresas Industriales", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Ingeniería", value: "₲5M - ₲7M", deadline: "Abierto", compatibility: 79, tags: ["Soldadura", "Industrial", "Técnico"], description: "Soldadura de estructuras metálicas en proyectos industriales." },

  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSPORTE Y LOGÍSTICA
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "trans-001", title: "Chofer de Carga", organization: "Empresas de Transporte", location: "Asunción / Interior", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲5M - ₲7M", deadline: "Abierto", compatibility: 81, tags: ["Transporte", "Chofer", "Carga"], description: "Transporte de carga a nivel nacional e internacional." },
  { id: "trans-002", title: "Coordinador de Logística", organization: "Empresas de Logística", location: "Remoto (Latam)", continent: "América Latina", type: "empleo", rubro: "Otros", value: "$2,000 USD", deadline: "Abierto", compatibility: 84, tags: ["Logística", "Coordinación", "Supply Chain"], description: "Coordinación de rutas y despachos de mercancía." },
  { id: "trans-003", title: "Operario de Almacén", organization: "Centros de Distribución", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲3M - ₲4M", deadline: "Abierto", compatibility: 80, tags: ["Logística", "Almacén", "Operario"], description: "Manejo de inventario y preparación de pedidos en almacenes." },
  { id: "trans-004", title: "Despachante de Aduanas", organization: "Empresas de Comercio Exterior", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲4M - ₲6M", deadline: "Abierto", compatibility: 83, tags: ["Aduanas", "Comercio Exterior", "Especializado"], description: "Trámites aduanales y documentación de importación/exportación." },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCACIÓN
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "edu-001", title: "Profesor de Primaria", organization: "Escuelas Privadas", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲4M - ₲6M", deadline: "Abierto", compatibility: 82, tags: ["Educación", "Docencia", "Primaria"], description: "Docencia en primaria con metodología moderna." },
  { id: "edu-002", title: "Profesor de Secundaria - Matemática", organization: "Colegios Varios", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲5M - ₲7M", deadline: "Abierto", compatibility: 84, tags: ["Educación", "Matemática", "Secundaria"], description: "Enseñanza de matemática en colegios de nivel secundario." },
  { id: "edu-003", title: "Coordinador Pedagógico", organization: "Instituciones Educativas", location: "Asunción", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲7M - ₲9M", deadline: "Abierto", compatibility: 86, tags: ["Educación", "Coordinación", "Liderazgo"], description: "Coordinación de procesos pedagógicos en instituciones." },
  { id: "edu-004", title: "Tutor Online", organization: "Plataformas Educativas", location: "Remoto", continent: "Global", type: "empleo", rubro: "Otros", value: "$500 - $1,500 USD/mes", deadline: "Abierto", compatibility: 85, tags: ["Educación", "Online", "Flexible"], description: "Tutoria online para estudiantes de todo el mundo." },

  // ═══════════════════════════════════════════════════════════════════════════
  // AGRICULTURA Y GANADERIA
  // ═══════════════════════════════════════════════════════════════════════════
  { id: "agro-001", title: "Capataz Agrícola", organization: "Empresas Agrícolas", location: "Interior de Paraguay", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲6M - ₲8M", deadline: "Abierto", compatibility: 80, tags: ["Agricultura", "Liderazgo", "Campo"], description: "Supervisión de trabajos agrícolas y coordinación de equipos." },
  { id: "agro-002", title: "Operario Agrícola", organization: "Empresas Agrícolas", location: "Interior", continent: "América Latina", type: "empleo", rubro: "Otros", value: "₲3M - ₲4M", deadline: "Abierto", compatibility: 77, tags: ["Agricultura", "Operario", "Campo"], description: "Labores agrícolas y mantenimiento de cultivos." },
  { id: "agro-003", title: "Veterinario", organization: "Haciendas y Estancias", location: "Interior", continent: "América Latina", type: "empleo", rubro: "Salud", value: "₲8M - ₲10M", deadline: "Abierto", compatibility: 85, tags: ["Ganadería", "Veterinario", "Especializado"], description: "Atención veterinaria en haciendas y estancias." },
];

export default function JobOpportunities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedContinent, setSelectedContinent] = useState<string>("all");
  const [selectedRubro, setSelectedRubro] = useState<string>("all");

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === "all" || opp.type === selectedType;
    const matchesContinent = selectedContinent === "all" || opp.continent === selectedContinent;
    const matchesRubro = selectedRubro === "all" || opp.rubro === selectedRubro;
    return matchesSearch && matchesType && matchesContinent && matchesRubro;
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
  const rubros = ["all", "Tecnología", "Finanzas", "Marketing", "RRHH", "Ingeniería", "Salud", "Ventas", "Otros"];

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
            Explora 250+ oportunidades: becas de élite, foros internacionales, capital semilla, empleos en multinacionales, cruceros, aerolíneas, ONGs, SICCA, construcción, transporte, educación y más. 
            Desde puestos básicos en Paraguay hasta oportunidades de trabajo en el extranjero. No solo busques, aplica con una estrategia ganadora.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 flex items-center gap-3">
              <Award className              <div className="text-6xl mb-4">📊</div>
                <p className="text-2xl font-black">250+</p>
                <p className="text-xs uppercase font-bold opacity-80">Oportunidades</p>            </div>
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
            <div className="flex flex-wrap md:flex-nowrap gap-2">
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
              <select 
                className="w-full p-2 bg-background border border-border rounded-md text-sm"
                value={selectedRubro}
                onChange={(e) => setSelectedRubro(e.target.value)}
              >
                {rubros.map(r => (
                  <option key={r} value={r}>{r === "all" ? "Rubros" : r}</option>
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
