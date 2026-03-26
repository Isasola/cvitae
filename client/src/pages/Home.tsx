import { useLocation } from "wouter";
import { ArrowRight, Zap, TrendingUp, Users, Globe, MessageCircle, Search, Briefcase, Award, CheckCircle, Sparkles, Target } from "lucide-react";
import { opportunities } from "@/data/opportunities";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const CURRENT_YEAR = 2026;

export default function Home() {
  const [, setLocation] = useLocation();
  const featuredOpps = opportunities.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-black text-xs">CV</div>
            <span className="font-bold">CVitae</span>
            <span className="text-xs text-slate-500 ml-2">{CURRENT_YEAR}</span>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => setLocation("/jobs")} className="text-sm hover:text-blue-400 transition hidden md:block">Explorar</button>
            <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Tengo dudas sobre CVitae.")}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition">Ayuda</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-full">
            <span className="text-sm text-blue-300 flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              539 Oportunidades Verificadas
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            Tu Oportunidad<br />Global Espera
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Descubre becas internacionales, empleos remotos y fondos de capital semilla. Optimiza tu CV para destacar en filtros ATS y consigue la oportunidad que mereces.
          </p>

          {/* BUSCADOR */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-2 flex items-center gap-3 shadow-2xl">
              <Search className="h-5 w-5 text-slate-500 ml-4" />
              <input type="text" placeholder="MEXT, Mercado Libre, Capital Semilla, Fulbright..." onClick={() => setLocation("/jobs")} className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg" />
              <button onClick={() => setLocation("/jobs")} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition shadow-lg">Explorar</button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <p className="text-2xl font-black text-blue-400">539+</p>
              <p className="text-xs text-slate-400 mt-1">Oportunidades</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <p className="text-2xl font-black text-purple-400">6</p>
              <p className="text-xs text-slate-400 mt-1">Continentes</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-4">
              <p className="text-2xl font-black text-green-400">95%+</p>
              <p className="text-xs text-slate-400 mt-1">Compatibilidad</p>
            </div>
          </div>

          {/* MARQUEE */}
          <div className="relative overflow-hidden mb-12">
            <div className="flex gap-4 animate-scroll">
              {[...featuredOpps, ...featuredOpps].map((opp, idx) => (
                <div key={idx} className="flex-shrink-0 w-80 bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition cursor-pointer" onClick={() => setLocation(`/opportunities/${opp.id}`)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-left">
                      <h3 className="font-semibold text-white text-sm line-clamp-2">{opp.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{opp.organization}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded font-medium whitespace-nowrap ml-2">{opp.type.replace(/_/g, " ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Zap className="h-3 w-3" />
                    <span>Vence: {opp.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={() => setLocation("/jobs")} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition shadow-lg">Explorar 539+ Oportunidades</button>
            <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Quiero un diagnóstico gratuito de mi CV.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition border border-slate-700">Diagnóstico Gratuito</a>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-20 px-4 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">El Problema Real</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">75% de CVs rechazados</h3>
                    <p className="text-sm text-slate-400">Los filtros ATS eliminan tu CV antes de que un humano lo vea</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Palabras clave incorrectas</h3>
                    <p className="text-sm text-slate-400">No sabes qué buscan los algoritmos en tu industria</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Oportunidades dispersas</h3>
                    <p className="text-sm text-slate-400">Buscas en 10 portales diferentes sin encontrar lo que necesitas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600/30 rounded-2xl p-8">
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
          </div>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">Nuestra Solución</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">CVitae combina IA, análisis de datos y experiencia en reclutamiento para hacerte visible.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-600/30 rounded-2xl p-8 hover:border-blue-500/50 transition">
              <Globe className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">539+ Oportunidades</h3>
              <p className="text-sm text-slate-400 mb-4">Becas internacionales, empleos remotos, capital semilla y fondos para ONGs en 6 continentes.</p>
              <p className="text-xs text-blue-300">Actualizado diariamente en {CURRENT_YEAR}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-600/30 rounded-2xl p-8 hover:border-purple-500/50 transition">
              <Zap className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Optimización ATS</h3>
              <p className="text-sm text-slate-400 mb-4">Analizamos tu CV con 12 indicadores clave que buscan los algoritmos de reclutamiento.</p>
              <p className="text-xs text-purple-300">Compatibilidad 95%+</p>
            </div>

            <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-600/30 rounded-2xl p-8 hover:border-green-500/50 transition">
              <Users className="h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Soporte Directo</h3>
              <p className="text-sm text-slate-400 mb-4">Asesoría personalizada por WhatsApp para cerrar tu oportunidad y negociar oferta.</p>
              <p className="text-xs text-green-300">Disponible 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 px-4 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Cómo Funciona en 3 Pasos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Busca", desc: "Explora 539+ oportunidades globales filtradas por país, tipo y rubro.", icon: Search },
              { num: "2", title: "Analiza", desc: "Sube tu CV y recibe análisis de compatibilidad ATS en tiempo real.", icon: Target },
              { num: "3", title: "Optimiza", desc: "Mejora tu perfil con nuestra guía estratégica y postula directamente.", icon: CheckCircle },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="text-center relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                  {idx < 2 && <div className="hidden md:block absolute right-0 top-8 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RECLUTADORES */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600/10 to-purple-600/5 border-y border-purple-600/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">¿Eres Reclutador?</h2>
              <p className="text-slate-400 mb-8 text-lg">Accede a 539 CVs optimizados para ATS con análisis de compatibilidad avanzado. Filtra por habilidades, experiencia y ubicación.</p>
              <button onClick={() => setLocation("/recruiters/tokens")} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-semibold transition shadow-lg uppercase tracking-wider text-sm">
                Panel Pro
              </button>
            </div>
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">539 CVs Verificados</p>
                    <p className="text-xs text-slate-400">Optimizados para pasar filtros ATS</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Análisis Avanzado</p>
                    <p className="text-xs text-slate-400">Ranking por compatibilidad en tiempo real</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">$50 USD/mes</p>
                    <p className="text-xs text-slate-400">Acceso ilimitado y API</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">Planes para Candidatos</h2>
          <p className="text-slate-400 text-center mb-12">Elige el plan que se ajuste a tus necesidades en {CURRENT_YEAR}.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                name: "Perfil Digital", 
                price: "₲50.000", 
                features: ["✓ Optimización de CV", "✓ Análisis ATS", "✓ Soporte por chat", "✓ Reporte PDF"],
                cta: "Comenzar"
              },
              { 
                name: "Portafolio Web", 
                price: "₲120.000", 
                features: ["✓ Todo de Perfil Digital", "✓ Sitio web profesional", "✓ Soporte prioritario", "✓ Estrategia de LinkedIn", "✓ Seguimiento de candidaturas"],
                cta: "Comenzar",
                popular: true
              },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-8 transition ${plan.popular ? 'bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-600/50 shadow-xl' : 'bg-slate-800/40 backdrop-blur border border-slate-700/50 hover:border-blue-500/50'}`}>
                  {plan.popular && <div className="inline-block mb-4 px-3 py-1 bg-blue-600/30 border border-blue-500/50 rounded-full text-xs text-blue-300 font-semibold uppercase tracking-wider">Recomendado</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-black text-blue-400 mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                      {f.replace('✓ ', '')}
                    </li>
                  ))}
                </ul>
                <a href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero el plan ${plan.name}.`)}`} target="_blank" rel="noopener noreferrer" className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 uppercase tracking-wider text-sm ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
            <p>CVitae © {CURRENT_YEAR} - Oportunidades Globales para Latinos</p>
          <p className="mt-2">Diseñado para tu éxito profesional</p>
        </div>
      </footer>
    </div>
  );
}
