import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Search, Globe, Zap, TrendingUp, ArrowRight, MessageCircle, MapPin, DollarSign, Calendar, Star, Sparkles, ChevronRight } from "lucide-react";

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const WA_DIAGNOSTICO = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero hacer un diagnóstico gratuito de mi CV.")}`;
const WA_DUDAS = `${WA_BASE}?text=${encodeURIComponent("Hola! Tengo dudas sobre CVitae, ¿me podés ayudar?")}`;
const WA_ESPECIALISTA = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero hablar con un especialista sobre mis oportunidades.")}`;
// ─────────────────────────────────────────────────────────────────────────────

interface OpportunityHighlight {
  id: string;
  title: string;
  organization: string;
  type: string;
  value: string;
  deadline: string;
  icon: string;
}

const highlightedOpportunities: OpportunityHighlight[] = [
  {
    id: "h1",
    title: "MEXT - Beca Gobierno Japonés",
    organization: "Ministerio de Educación (Japón)",
    type: "Beca Internacional",
    value: "¥144.000/mes + Matrícula",
    deadline: "20 Abril 2026",
    icon: "🇯🇵",
  },
  {
    id: "h2",
    title: "Y Combinator - Summer 2026",
    organization: "Y Combinator",
    type: "Capital Semilla",
    value: "$500K - $2M",
    deadline: "31 Marzo 2026",
    icon: "🚀",
  },
  {
    id: "h3",
    title: "Chevening - Reino Unido",
    organization: "Ministerio de Asuntos Exteriores UK",
    type: "Beca Internacional",
    value: "100% Cobertura",
    deadline: "1 Noviembre 2026",
    icon: "🇬🇧",
  },
  {
    id: "h4",
    title: "500 Global - Luchadores Fund",
    organization: "500 Global",
    type: "Capital Semilla",
    value: "$300K - $1M",
    deadline: "15 Abril 2026",
    icon: "💰",
  },
  {
    id: "h5",
    title: "Fulbright - Estados Unidos",
    organization: "Comisión Fulbright",
    type: "Beca Internacional",
    value: "100% Cobertura",
    deadline: "30 Abril 2026",
    icon: "🇺🇸",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const opportunityTypes = [
    { id: "all", label: "Todas", icon: "🌍" },
    { id: "beca", label: "Becas", icon: "🎓" },
    { id: "capital", label: "Capital Semilla", icon: "💰" },
    { id: "empleo", label: "Empleos", icon: "💼" },
    { id: "curso", label: "Cursos", icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVEGACIÓN */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center text-white font-black text-sm">
              CV
            </div>
            <span className="font-black text-lg">
              <span className="italic font-light">itae</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/jobs" className="text-sm font-medium hover:text-accent transition hidden md:block">
              Explorar Oportunidades
            </a>
            <a href={WA_DUDAS} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">
                ¿Dudas?
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - BUSCADOR CENTRAL */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background via-background to-accent/5">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent">Global Opportunity Hub</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              Encontrá tu oportunidad<br />
              <span className="italic font-light bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                en cualquier rincón del mundo.
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted max-w-2xl mx-auto mb-8">
              50+ becas de élite, capital semilla, cursos certificados y empleos remotos. Todo en un solo lugar. Optimizá tu perfil y aplicá con estrategia.
            </p>
          </div>

          {/* BUSCADOR */}
          <div className="space-y-4 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="¿Qué buscás? (Beca MEXT, Capital Semilla, Empleo remoto...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-12 py-4 text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-base"
              />
            </div>

            {/* FILTROS RÁPIDOS */}
            <div className="flex gap-2 flex-wrap justify-center">
              {opportunityTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-lg border font-medium text-sm transition ${
                    selectedType === type.id
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border hover:border-accent bg-card"
                  }`}
                >
                  {type.icon} {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA PRINCIPAL */}
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/jobs">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full md:w-auto px-8 h-12 text-base font-bold">
                <Globe className="w-5 h-5 mr-2" />
                Explorar 50+ Oportunidades
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 w-full md:w-auto px-8 h-12 text-base font-bold">
                <Zap className="w-5 h-5 mr-2" />
                Diagnóstico Gratuito
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN: DESTACADOS DEL DÍA */}
      <section className="py-16 px-4 bg-background">
        <div className="container max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-sm font-bold text-accent uppercase tracking-wider">Destacados Hoy</span>
              </div>
              <h2 className="text-3xl font-black">5 Oportunidades que se Cierran Pronto</h2>
            </div>
            <a href="/jobs" className="hidden md:flex items-center gap-2 text-accent hover:text-accent/80 transition font-bold">
              Ver todas <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {highlightedOpportunities.map((opp) => (
              <Card
                key={opp.id}
                className="p-4 border-border hover:border-accent hover:shadow-lg transition group cursor-pointer relative overflow-hidden"
              >
                {/* BADGE DE URGENCIA */}
                <div className="absolute top-3 right-3 bg-destructive/10 border border-destructive text-destructive text-xs font-bold px-2 py-1 rounded">
                  Urgente
                </div>

                <div className="text-4xl mb-3">{opp.icon}</div>

                <h3 className="font-black text-sm mb-1 group-hover:text-accent transition line-clamp-2">{opp.title}</h3>

                <p className="text-xs text-muted mb-3 line-clamp-1">{opp.organization}</p>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-muted">
                    <DollarSign className="w-3 h-3" />
                    <span className="font-bold text-accent">{opp.value}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted">
                    <Calendar className="w-3 h-3" />
                    <span>{opp.deadline}</span>
                  </div>
                </div>

                <a href={`/jobs?search=${encodeURIComponent(opp.title)}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs border-accent text-accent hover:bg-accent/10">
                    Ver detalles
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: EL PROBLEMA (ESENCIA V1) */}
      <section className="py-16 px-4 bg-destructive/5 border-t border-destructive/20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">¿Por qué tu CV es invisible?</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              El 75% de los CVs son rechazados antes de ser leídos por un humano. Los algoritmos ATS (Applicant Tracking Systems) filtran candidatos en milisegundos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                stat: "75%",
                label: "CVs rechazados automáticamente",
                icon: "🤖",
              },
              {
                stat: "6 seg",
                label: "Tiempo promedio de lectura",
                icon: "⏱️",
              },
              {
                stat: "12",
                label: "Indicadores que buscan los ATS",
                icon: "🎯",
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-border text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-3xl font-black text-accent mb-2">{item.stat}</div>
                <p className="text-sm text-muted">{item.label}</p>
              </Card>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="font-black text-lg mb-4">Lo que hacemos diferente:</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span><strong>Ingeniería de Reclutamiento Inversa:</strong> Reestructuramos tu trayectoria bajo los 12 indicadores que los ATS buscan.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span><strong>Palabras clave estratégicas:</strong> Insertamos términos que los reclutadores ya decidieron contratar.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold">✓</span>
                <span><strong>Asesoría personalizada:</strong> No es un bot. Hablamos por WhatsApp y ajustamos según tu perfil.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECCIÓN: CÓMO FUNCIONA */}
      <section className="py-16 px-4 bg-accent/5">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black mb-12 text-center">Cómo Funciona CVitae</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Diagnóstico",
                description: "Subí tu CV. Nuestro sistema lo analiza con indicadores de competencia ATS.",
                icon: "📋",
              },
              {
                step: "2",
                title: "Optimización",
                description: "Reestructuramos tu perfil para pasar filtros automáticos y destacar.",
                icon: "✨",
              },
              {
                step: "3",
                title: "Oportunidades",
                description: "Accedé a 50+ becas, empleos y capital semilla en todo el mundo.",
                icon: "🌍",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="inline-flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-full font-black mb-4">
                  {item.step}
                </div>
                <h3 className="font-black text-lg mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: PARA RECLUTADORES */}
      <section className="py-16 px-4 bg-background">
        <div className="container max-w-4xl">
          <Card className="p-8 md:p-12 border-border bg-gradient-to-br from-card to-card/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-sm font-bold text-accent uppercase">Para Reclutadores</span>
                </div>
                <h3 className="text-3xl font-black mb-4">Rankea Candidatos en Segundos</h3>
                <p className="text-muted mb-6">
                  Sube hasta 10 CVs. Nuestro sistema te muestra un ranking de compatibilidad con el puesto. Olvídate de revisar manualmente.
                </p>
                <a href="/recruiters/lots">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Probar Herramienta Gratis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="font-bold text-accent">Score de Compatibilidad</p>
                <p className="text-sm text-muted mt-2">Análisis automático basado en indicadores de competencia</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECCIÓN: PLANES Y PRECIOS */}
      <section className="py-16 px-4 bg-accent/5">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-black mb-4 text-center">Planes para Candidatos</h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos incluyen asesoría personalizada por WhatsApp.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Perfil Digital",
                price: "₲50.000",
                description: "Optimización completa de tu CV",
                features: [
                  "Análisis ATS completo",
                  "Reestructuración de perfil",
                  "Palabras clave estratégicas",
                  "Asesoría por WhatsApp",
                ],
                cta: "Comenzar Ahora",
                highlight: false,
              },
              {
                name: "Portafolio Web",
                price: "₲120.000",
                description: "CV + Sitio web profesional",
                features: [
                  "Todo del plan anterior",
                  "Sitio web personalizado",
                  "Integración con LinkedIn",
                  "Seguimiento de aplicaciones",
                  "Mentoría de 30 días",
                ],
                cta: "Comenzar Ahora",
                highlight: true,
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 border-border transition ${
                  plan.highlight ? "border-accent bg-gradient-to-br from-accent/10 to-accent/5 ring-1 ring-accent" : ""
                }`}
              >
                {plan.highlight && (
                  <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-bold mb-4">
                    <Star className="w-3 h-3" />
                    Más Popular
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-muted text-sm mb-4">{plan.description}</p>
                <div className="text-4xl font-black text-accent mb-6">{plan.price}</div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-sm">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
                  <Button
                    className={`w-full ${
                      plan.highlight
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "border-accent text-accent hover:bg-accent/10"
                    }`}
                    variant={plan.highlight ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: TESTIMONIOS / SOCIAL PROOF */}
      <section className="py-16 px-4 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black mb-12 text-center">Lo que Dicen Nuestros Usuarios</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Martín G.",
                role: "Ingeniero, Asunción",
                text: "En 2 semanas conseguí entrevista en una empresa de tech. El diagnóstico de CVitae fue clave.",
                rating: 5,
              },
              {
                name: "Sofía R.",
                role: "Economista, Encarnación",
                text: "Aplicé a la beca BECAL y quedé seleccionada. CVitae me ayudó a estructurar mi CV.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 border-border">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-secondary">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">¿Listo para Cambiar tu Carrera?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Optimizá tu perfil, accedé a oportunidades globales y aplicá con estrategia.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/jobs">
              <Button className="bg-white text-accent hover:bg-white/90 w-full md:w-auto px-8 h-12 font-bold text-base">
                Explorar Oportunidades
              </Button>
            </a>
            <a href={WA_ESPECIALISTA} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full md:w-auto px-8 h-12 font-bold text-base"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Hablar con Especialista
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-sidebar text-white/80 py-8 px-4">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded flex items-center justify-center font-black text-xs">CV</div>
                <span className="font-bold">CVitae</span>
              </div>
              <p className="text-xs text-white/60">Global Opportunity Hub para profesionales y emprendedores.</p>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Plataforma</p>
              <ul className="space-y-2 text-xs">
                <li><a href="/jobs" className="hover:text-white transition">Oportunidades</a></li>
                <li><a href="/recruiters/lots" className="hover:text-white transition">Para Reclutadores</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Contacto</p>
              <ul className="space-y-2 text-xs">
                <li><a href={WA_DUDAS} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a></li>
                <li><a href="mailto:info@cvitae.com" className="hover:text-white transition">Email</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Legal</p>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-xs text-white/60">
            <p>© 2026 CVitae. Transformando carreras desde Paraguay para el mundo.</p>
          </div>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href={WA_DIAGNOSTICO}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition z-40"
        title="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
