import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Zap, Users, Globe, Search, Target, CheckCircle, FileText, Lightbulb } from "lucide-react";
import { opportunities } from "@/data/opportunities";
import { GlowCard } from "@/components/ui/spotlight-card";
import TetrisLoader from "@/components/ui/tetris-loader";
import GoogleDriveUploaderToast from "@/components/ui/google-drive-uploader-toast";
import TestimonialsColumns from "@/components/ui/testimonials-columns-1";
import { Banner } from "@/components/ui/banner";
import { Footer7 } from "@/components/ui/footer-7";
import { OpportunitiesAutoSlider } from "@/components/ui/opportunities-auto-slider";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const CURRENT_YEAR = 2026;

export default function Home() {
  const [, setLocation] = useLocation();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!cvFile) return;
    
    setAnalyzing(true);
    setShowUploader(true);
    
    setTimeout(() => {
      setAnalysis({
        atsScore: Math.floor(Math.random() * 40 + 50),
        strengths: [
          "Experiencia relevante bien documentada",
          "Habilidades técnicas claras",
        ],
        criticalImprovements: [
          "Agregar palabras clave de la industria",
          "Incluir métricas y resultados cuantificables",
          "Mejorar estructura de secciones",
        ],
      });
      setAnalyzing(false);
      setShowUploader(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* BANNER */}
      <Banner
        variant="rainbow"
        rainbowColors={[
          "rgba(201, 168, 76, 0.3)",
          "rgba(255, 255, 255, 0.1)",
          "transparent",
          "rgba(201, 168, 76, 0.2)",
        ]}
      >
        Estamos creciendo. Pronto cargaremos más oportunidades y nuevas APIs de reclutamiento.
      </Banner>

      {/* TETRIS LOADER */}
      {analyzing && <TetrisLoader duration={3} isVisible={true} />}

      {/* UPLOADER TOAST */}
      <GoogleDriveUploaderToast isVisible={showUploader} />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/cvitae-logo.png" alt="CVitae" className="h-10 w-auto" />
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => setLocation("/jobs")} className="text-sm hover:text-amber-400 transition hidden md:block">Explorar</button>
            <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Tengo dudas sobre CVitae.")}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700 rounded-lg text-sm transition">Ayuda</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-full">
            <span className="text-sm text-amber-300 flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
              539 Oportunidades Verificadas
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            Tu Talento Merece<br />Ser Descubierto
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            539 oportunidades verificadas en Paraguay y Latinoamérica. Optimiza tu CV para pasar filtros ATS y consigue la oportunidad que mereces.
          </p>

          {/* BUSCADOR */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700 rounded-2xl p-2 flex items-center gap-3 shadow-2xl hover:border-amber-500/30 transition">
              <Search className="h-5 w-5 text-slate-500 ml-4" />
              <input type="text" placeholder="MEXT, Mercado Libre, Capital Semilla, Fulbright..." onClick={() => setLocation("/jobs")} className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg" />
              <button onClick={() => setLocation("/jobs")} className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black rounded-xl font-semibold transition shadow-lg">Explorar</button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition">
              <p className="text-2xl font-black text-amber-400">539+</p>
              <p className="text-xs text-slate-400 mt-1">Oportunidades</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition">
              <p className="text-2xl font-black text-amber-400">6</p>
              <p className="text-xs text-slate-400 mt-1">Continentes</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-4 hover:border-amber-500/30 transition">
              <p className="text-2xl font-black text-amber-400">Análisis</p>
              <p className="text-xs text-slate-400 mt-1">ATS en tiempo real</p>
            </div>
          </div>

          {/* INFINITE SCROLL OPPORTUNITIES */}
          <div className="mb-12">
            <p className="text-sm text-slate-400 mb-4">Oportunidades destacadas (scroll automático):</p>
            <OpportunitiesAutoSlider opportunities={opportunities.slice(0, 10)} />
            
            {/* ANNOUNCEMENT BANNER */}
            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
              <p className="text-xs text-blue-300">✨ Estamos trabajando para expandir masivamente nuestra base de datos. Cargamos nuevas páginas y oportunidades cada día. Vuelve pronto para más opciones.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={() => setLocation("/jobs")} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black rounded-lg font-semibold transition shadow-lg">Explorar 539+ Oportunidades</button>
            <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Quiero un diagnóstico gratuito de mi CV.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-800/60 hover:bg-slate-700 text-white rounded-lg font-semibold transition border border-slate-700">Diagnóstico Gratuito</a>
          </div>
        </div>
      </section>

      {/* DIAGNÓSTICO RÁPIDO - MOVED HERE */}
      {!analysis && (
        <section className="py-20 px-4 bg-slate-900/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-3">Diagnóstico Gratuito</h2>
              <p className="text-slate-400">Sube tu CV y descubre tu score de compatibilidad ATS en 3 segundos</p>
            </div>

            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 bg-slate-800/40 rounded-2xl">
              <div>
                {!cvFile ? (
                  <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-12 text-center hover:border-amber-500/50 transition cursor-pointer group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cv-upload-home"
                    />
                    <label htmlFor="cv-upload-home" className="cursor-pointer block">
                      <FileText className="h-16 w-16 text-amber-400/50 group-hover:text-amber-400 transition mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">Arrastra tu CV aquí</p>
                      <p className="text-sm text-slate-400">o haz click para seleccionar</p>
                      <p className="text-xs text-slate-500 mt-4">PDF, Word (.doc, .docx)</p>
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-lg mb-6 justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="h-6 w-6 text-amber-400" />
                        <div>
                          <p className="font-semibold">{cvFile.name}</p>
                          <p className="text-xs text-slate-400">{(cvFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCvFile(null)}
                        className="text-sm text-slate-400 hover:text-red-400 transition"
                      >
                        Cambiar
                      </button>
                    </div>
                    <button
                      onClick={handleAnalyze}
                      disabled={analyzing}
                      className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black rounded-lg font-semibold transition uppercase tracking-wider disabled:opacity-50 transform hover:scale-105 duration-300"
                    >
                      {analyzing ? "Analizando..." : "Analizar CV Ahora"}
                    </button>
                  </div>
                )}
              </div>
            </GlowCard>
          </div>
        </section>
      )}

      {/* RESULTADOS DEL DIAGNÓSTICO */}
      {analysis && (
        <section className="py-20 px-4 bg-slate-900/20">
          <div className="max-w-4xl mx-auto">
            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 bg-slate-800/40 rounded-2xl text-center mb-8">
              <div>
                <p className="text-slate-400 mb-2 uppercase tracking-wider text-sm font-semibold">Score de Compatibilidad ATS</p>
                <p className={`text-7xl font-black mb-4 ${
                  analysis.atsScore >= 70 ? "text-green-400" :
                  analysis.atsScore >= 50 ? "text-amber-400" :
                  "text-red-400"
                }`}>
                  {analysis.atsScore}%
                </p>
                <p className="text-slate-300 mb-6">Tu CV necesita mejoras. Con nuestro servicio de optimización, podemos llevarte a 95%+ en 48 horas.</p>
                <a
                  href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Mi CV tiene ${analysis.atsScore}% de compatibilidad ATS. Quiero mejorarlo a 95%+. ¿Cuál es el costo?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black rounded-lg font-semibold transition shadow-lg uppercase tracking-wider"
                >
                  Mejorar mi CV Ahora <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </GlowCard>

            <button
              onClick={() => {
                setAnalysis(null);
                setCvFile(null);
              }}
              className="w-full px-4 py-2 bg-slate-700/60 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition"
            >
              Analizar otro CV
            </button>
          </div>
        </section>
      )}

      {/* TESTIMONIOS */}
      <section className="py-12 px-4 bg-slate-900/20">
        <TestimonialsColumns />
      </section>

      {/* SOLUCIÓN */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">Nuestra Solución</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">CVitae combina IA, análisis de datos y experiencia en reclutamiento para hacerte visible.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 bg-slate-800/40 rounded-2xl">
              <div>
                <Globe className="h-10 w-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">539+ Oportunidades</h3>
                <p className="text-sm text-slate-400 mb-4">Becas internacionales, empleos remotos, capital semilla y fondos para ONGs en 6 continentes.</p>
                <p className="text-xs text-amber-300">Actualizado diariamente en {CURRENT_YEAR}</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 bg-slate-800/40 rounded-2xl">
              <div>
                <Zap className="h-10 w-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Optimización ATS</h3>
                <p className="text-sm text-slate-400 mb-4">Analizamos tu CV con 12 indicadores clave que buscan los algoritmos de reclutamiento.</p>
                <p className="text-xs text-amber-300">Compatibilidad 95%+</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 bg-slate-800/40 rounded-2xl">
              <div>
                <Users className="h-10 w-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Soporte Directo</h3>
                <p className="text-sm text-slate-400 mb-4">Asesoría personalizada por WhatsApp para cerrar tu oportunidad y negociar oferta.</p>
                <p className="text-xs text-amber-300">Disponible 24/7</p>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 px-4 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Cómo Funciona en 3 Pasos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Busca", desc: "Explora 539+ oportunidades globales filtradas por país, tipo y rubro.", icon: Search },
              { num: "2", title: "Analiza", desc: "Sube tu CV y recibe análisis de compatibilidad ATS en tiempo real.", icon: Target },
              { num: "3", title: "Optimiza", desc: "Mejora tu perfil con nuestra guía estratégica y postula directamente.", icon: CheckCircle },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <GlowCard key={step.num} glowColor="orange" customSize className="w-full h-auto p-8 bg-slate-800/40 rounded-2xl text-center">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-black">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROBLEMA REAL */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">El Problema Real</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">El 75% de CVs mueren en el algoritmo</h3>
                    <p className="text-sm text-slate-400">Los filtros ATS eliminan tu CV antes de que un humano lo vea</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Palabras clave incorrectas</h3>
                    <p className="text-sm text-slate-400">No sabes qué buscan los algoritmos en tu industria</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Oportunidades dispersas</h3>
                    <p className="text-sm text-slate-400">Buscas en 10 portales diferentes sin encontrar lo que necesitas</p>
                  </div>
                </div>
              </div>
            </div>
            <GlowCard glowColor="red" customSize className="w-full h-auto p-8 bg-slate-800/40 rounded-2xl">
              <div>
                <p className="text-sm text-slate-400 mb-4">Estadísticas {CURRENT_YEAR}:</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CVs rechazados por ATS</span>
                    <span className="font-bold text-red-400">75%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: "75%"}}></div>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm">Tiempo promedio de revisión</span>
                    <span className="font-bold text-red-400">6 segundos</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* RECLUTADORES */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">¿Eres Reclutador?</h2>
              <p className="text-slate-400 mb-8 text-lg">Accede a 539 CVs optimizados para ATS con análisis de compatibilidad avanzado. Filtra por habilidades, experiencia y ubicación.</p>
              <button onClick={() => setLocation("/recruiters/tokens")} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black rounded-lg font-semibold transition shadow-lg uppercase tracking-wider text-sm">
                Panel Pro
              </button>
            </div>
            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 bg-slate-800/40 rounded-2xl">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Acceso a 539 Oportunidades Verificadas</p>
                    <p className="text-xs text-slate-400">Base de datos completa de becas, empleos y capital semilla</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Análisis Avanzado</p>
                    <p className="text-xs text-slate-400">Ranking por compatibilidad en tiempo real</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">$50 USD/mes con API</p>
                    <p className="text-xs text-slate-400">Integración en tiempo real a tu sistema</p>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="py-20 px-4 bg-slate-900/20" id="pricing">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">Planes para Candidatos</h2>
          <p className="text-slate-400 text-center mb-12">Elige el plan que se ajuste a tus necesidades en {CURRENT_YEAR}.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                name: "Perfil Digital", 
                price: "₲50.000", 
                priceUsd: "$7",
                features: ["Optimización de CV", "Análisis ATS", "Soporte por chat", "Reporte PDF"],
                cta: "Comenzar"
              },
              { 
                name: "Portafolio Web", 
                price: "₲120.000", 
                priceUsd: "$17",
                features: ["Todo de Perfil Digital", "Sitio web profesional", "Soporte prioritario", "Estrategia de LinkedIn", "Seguimiento de candidaturas"],
                cta: "Comenzar",
                popular: true
              },
            ].map((plan) => (
              <GlowCard key={plan.name} glowColor={plan.popular ? "orange" : "blue"} customSize className={`w-full h-auto p-8 rounded-2xl ${plan.popular ? 'bg-amber-500/10' : 'bg-slate-800/40'}`}>
                <div>
                  {plan.popular && <div className="inline-block mb-4 px-3 py-1 bg-amber-500/30 border border-amber-500/50 rounded-full text-xs text-amber-300 font-semibold uppercase tracking-wider">Recomendado</div>}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <p className="text-3xl font-black text-amber-400">{plan.price}</p>
                    <p className="text-sm text-slate-400">{plan.priceUsd} USD</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero el plan ${plan.name}.`)}`} target="_blank" rel="noopener noreferrer" className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 uppercase tracking-wider text-sm ${plan.popular ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
                    {plan.cta}
                  </a>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/5 py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <img src="/cvitae-logo.png" alt="CVitae" className="h-12 w-auto mb-4 filter brightness-110" />
              <p className="text-sm text-slate-400">Oportunidades globales para profesionales de Latinoamérica</p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Plataforma</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/jobs" className="hover:text-amber-400 transition">Oportunidades</a></li>
                <li><a href="#pricing" className="hover:text-amber-400 transition">Planes</a></li>
                <li><a href="/recruiters/tokens" className="hover:text-amber-400 transition">Panel Reclutadores</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4">Síguenos</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://www.instagram.com/cpdparaguay/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">Instagram</a></li>
                <li><a href="https://www.linkedin.com/company/112507011/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">LinkedIn</a></li>
                <li><a href="https://www.facebook.com/profile.php?id=61580756714500" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">Facebook</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Tengo dudas sobre CVitae.")}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">WhatsApp</a></li>
                <li><p className="text-slate-500">Paraguay, Asunción</p></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/30 pt-8 text-center text-sm text-slate-500">
            <p>CVitae © {CURRENT_YEAR} - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
