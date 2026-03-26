import { useLocation } from "wouter";
import { ArrowRight, Zap, TrendingUp, Users, Globe, MessageCircle, Search, Briefcase, Award } from "lucide-react";
import { opportunities } from "@/data/opportunities-massive";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

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
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            Tu Oportunidad<br />Global Espera
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Descubre 2000+ becas, empleos y fondos de inversión. Optimiza tu CV para destacar en filtros ATS.
          </p>

          {/* BUSCADOR */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-2 flex items-center gap-3">
              <Search className="h-5 w-5 text-slate-500 ml-4" />
              <input type="text" placeholder="MEXT, Mercado Libre, Capital Semilla..." onClick={() => setLocation("/jobs")} className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg" />
              <button onClick={() => setLocation("/jobs")} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition">Explorar</button>
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
            <button onClick={() => setLocation("/jobs")} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition">Explorar 2000+ Oportunidades</button>
            <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Quiero un diagnóstico gratuito de mi CV.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition border border-slate-700">Diagnóstico Gratuito</a>
          </div>
        </div>
      </section>

      {/* BENTO GRID: SERVICIOS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">¿Por qué CVitae?</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">El 75% de los CVs son rechazados por filtros ATS antes de ser leídos. Nosotros te hacemos visible.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition cursor-pointer" onClick={() => setLocation("/jobs")}>
              <Globe className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">2000+ Oportunidades</h3>
              <p className="text-sm text-slate-400">Becas, empleos, capital semilla en 6 continentes.</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition">
              <Zap className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Optimización ATS</h3>
              <p className="text-sm text-slate-400">Reestructuramos tu CV bajo los 12 indicadores que buscan los algoritmos.</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:border-green-500/50 transition">
              <Users className="h-8 w-8 text-green-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Asesoría Directa</h3>
              <p className="text-sm text-slate-400">Soporte personalizado por WhatsApp para cerrar tu oportunidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 px-4 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Cómo Funciona</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Busca", desc: "Explora 2000+ oportunidades globales en un solo lugar." },
              { num: "2", title: "Analiza", desc: "Sube tu CV y recibe un análisis de compatibilidad ATS." },
              { num: "3", title: "Optimiza", desc: "Mejora tu perfil con nuestra guía estratégica y postula." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">Planes para Candidatos</h2>
          <p className="text-slate-400 text-center mb-12">Elige el plan que se ajuste a tus necesidades.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Perfil Digital", price: "₲50.000", features: ["Optimización de CV", "Análisis ATS", "Soporte por chat"] },
              { name: "Portafolio Web", price: "₲120.000", features: ["Todo de Perfil Digital", "Sitio web profesional", "Soporte prioritario", "Estrategia de LinkedIn"] },
            ].map((plan) => (
              <div key={plan.name} className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-black text-blue-400 mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-slate-300">
                      <ArrowRight className="h-4 w-4 text-blue-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero el plan ${plan.name} (${plan.price}).`)}`} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition text-center block">Empezar Ahora</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECLUTADORES */}
      <section className="py-20 px-4 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">Para Reclutadores</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">Accede a candidatos pre-filtrados y optimizados. Ahorra tiempo en selección.</p>

          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur border border-slate-700/50 rounded-2xl p-12 text-center">
            <Briefcase className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Herramienta de Ranking Inteligente</h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Sube hasta 100 CVs y nuestra IA los puntúa según compatibilidad. Acceso Pro disponible.</p>
            <button onClick={() => setLocation("/recruiters/lots")} className="inline-block px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-semibold transition mr-4">Probar Demo</button>
            <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Quiero información sobre el plan Pro para reclutadores.")}`} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition">Obtener Token</a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6">¿Listo para Destacar?</h2>
          <p className="text-xl text-slate-400 mb-8">Comienza tu búsqueda de oportunidades hoy mismo.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={() => setLocation("/jobs")} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition">Explorar Oportunidades</button>
            <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Tengo dudas sobre CVitae.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition border border-slate-700">Hablar con Especialista</a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
