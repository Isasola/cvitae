import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, Search, FileUp, Target, BarChart3, MessageCircle, Zap, Eye, Users, CheckCircle, XCircle, ArrowRight, Menu, X } from "lucide-react";

// ─── Configuración de WhatsApp ────────────────────────────────────────────────
const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const WA_DIAGNOSTICO  = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero hacer un diagnóstico gratuito de mi CV.")}`;
const WA_DUDAS        = `${WA_BASE}?text=${encodeURIComponent("Hola! Tengo dudas sobre CVitae, ¿me podés ayudar?")}`;
const WA_ARREGLAR     = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero que arreglen mi perfil. Vi el diagnóstico y me interesa.")}`;
const WA_ESPECIALISTA = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero hablar con un especialista de CVitae.")}`;
// ─────────────────────────────────────────────────────────────────────────────

const WhatsApp = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.505-2.337 1.236-3.256 2.154-1.798 1.798-2.885 4.242-2.885 6.82 0 1.583.292 3.114.851 4.555l-1.265 3.855 3.921-1.217c1.33.719 2.844 1.096 4.465 1.096 5.409 0 9.8-4.391 9.8-9.8 0-2.611-.994-5.067-2.798-6.871-1.804-1.804-4.26-2.798-6.871-2.798z"/>
  </svg>
);

export default function Home() {
  const [optimizerStep, setOptimizerStep] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-sidebar rounded flex items-center justify-center text-accent font-bold text-xs md:text-sm">CV</div>
            <span className="font-bold text-sm md:text-lg"><span className="italic">itae</span></span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#como-funciona" className="hover:text-accent transition">Cómo funciona</a>
            <a href="#precios"       className="hover:text-accent transition">Precios</a>
            <a href="#rrhh"          className="hover:text-accent transition">Reclutadores</a>
            <a href="#faq"           className="hover:text-accent transition">FAQ</a>
            <a href="/recruiters/lots" className="hover:text-accent transition font-bold text-accent">Rankear</a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-card rounded">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop CTA → WhatsApp */}
          <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="hidden md:flex bg-sidebar text-sidebar-foreground hover:bg-sidebar/90">
              <Search className="w-4 h-4 mr-2" />
              Diagnóstico
            </Button>
          </a>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="container py-4 space-y-3">
              <a href="#como-funciona" className="block text-sm font-medium hover:text-accent transition py-2">Cómo funciona</a>
              <a href="#precios"       className="block text-sm font-medium hover:text-accent transition py-2">Precios</a>
              <a href="#rrhh"          className="block text-sm font-medium hover:text-accent transition py-2">Reclutadores</a>
              <a href="#faq"           className="block text-sm font-medium hover:text-accent transition py-2">FAQ</a>
              <a href="/recruiters/lots" className="block text-sm font-bold text-accent py-2">Rankear candidatos</a>
              <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 text-sm">
                  <Search className="w-4 h-4 mr-2" />
                  Diagnóstico gratis
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="pt-20 md:pt-32 pb-12 md:pb-20 bg-background">
        <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-accent"></span>
              Metodología de Reclutamiento
            </div>
            <h1 className="text-3xl md:text-6xl font-black leading-tight mb-4 md:mb-6">
              Tu talento<br /><span className="italic font-light">no es invisible.</span><br />Tu formato sí.
            </h1>
            <p className="text-base md:text-lg text-muted mb-6 md:mb-8 leading-relaxed max-w-md">
              Reestructuramos tu perfil con los <strong>indicadores de competencia exactos</strong> que los sistemas de selección están buscando. En 30 minutos tenés la entrevista que buscabas.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              {/* Diagnóstico gratuito → WhatsApp */}
              <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 text-sm md:text-base w-full md:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Diagnóstico gratuito
                </Button>
              </a>
              {/* ¿Dudas? → WhatsApp */}
              <a href={WA_DUDAS} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 text-sm md:text-base w-full md:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  ¿Dudas?
                </Button>
              </a>
            </div>
          </div>

          {/* CV Mockup */}
          <div className="hidden md:block bg-card rounded-lg border border-border p-6 shadow-lg">
            <div className="h-2 bg-gradient-to-r from-sidebar to-accent rounded mb-4"></div>
            <h3 className="font-bold text-lg mb-1">Lucía Fernández Riquelme</h3>
            <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">Analista Contable · Finanzas</p>
            <div className="space-y-2 text-xs text-muted mb-4">
              <div>📧 lucia@email.com</div>
              <div>📱 +595 981 234 567</div>
              <div>📍 Asunción, PY</div>
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div>
                <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Perfil Profesional</div>
                <div className="space-y-1">
                  <div className="h-2 bg-border rounded w-full"></div>
                  <div className="h-2 bg-border rounded w-5/6"></div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Habilidades</div>
                <div className="flex flex-wrap gap-1">
                  {["NIIF", "SAP", "Auditoría", "Excel", "RUPE"].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-accent/10 border border-accent/20 text-xs rounded text-muted">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <section className="bg-sidebar text-sidebar-foreground py-6 md:py-8 border-y border-sidebar-border">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {[
            { val: "6 seg",  label: "Decide el reclutador" },
            { val: "75%",    label: "CVs descartados" },
            { val: "₲50k",   label: "Perfil optimizado" },
            { val: "30 min", label: "Entrega garantizada" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-black mb-1">{s.val}</div>
              <div className="text-xs uppercase tracking-wider opacity-75">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OPTIMIZADOR ─────────────────────────────────────────────────────── */}
      <section id="optimizador" className="py-12 md:py-20 bg-sidebar text-sidebar-foreground">
        <div className="container">
          <div className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Diagnóstico gratuito
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4">
            ¿Tu perfil está llegando<br /><span className="italic font-light">donde tiene que llegar?</span>
          </h2>
          <p className="text-base md:text-lg opacity-75 mb-8 md:mb-12 max-w-2xl">
            Subí tu CV o pegá tu experiencia y en segundos te decimos exactamente qué está frenando tu convocatoria.
          </p>

          {/* Pasos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-8">
            {[
              { n: "01", icon: FileUp,       title: "Subís tu CV",    desc: "PDF o texto" },
              { n: "02", icon: Target,       title: "Indicás puesto", desc: "El cargo" },
              { n: "03", icon: BarChart3,    title: "Diagnóstico",    desc: "Score" },
              { n: "04", icon: MessageCircle,title: "Lo arreglamos",  desc: "30 min" },
            ].map((step, i) => (
              <button
                key={i}
                onClick={() => setOptimizerStep(i + 1)}
                className={`p-3 md:p-4 rounded border-2 transition text-sm md:text-base ${
                  optimizerStep === i + 1 ? "border-accent bg-accent/10" : "border-sidebar-border hover:border-accent/50"
                }`}
              >
                <div className="text-xs font-bold text-accent/60 mb-1 md:mb-2">{step.n}</div>
                <step.icon className="w-5 h-5 md:w-6 md:h-6 mb-1 md:mb-2 mx-auto" />
                <h3 className="font-bold text-xs md:text-sm">{step.title}</h3>
                <p className="text-xs opacity-60 hidden md:block">{step.desc}</p>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="bg-sidebar-accent/5 border border-sidebar-border rounded-lg p-4 md:p-8">

            {/* Paso 1: subir CV → click abre WhatsApp */}
            {optimizerStep === 1 && (
              <div className="space-y-4">
                <a
                  href={WA_DIAGNOSTICO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-dashed border-accent/30 rounded-lg p-6 md:p-8 text-center cursor-pointer hover:border-accent/60 transition"
                >
                  <FileUp className="w-6 md:w-8 h-6 md:h-8 mx-auto mb-2 md:mb-3 opacity-50" />
                  <p className="font-bold text-sm md:text-base mb-1">Arrastrá tu CV en PDF</p>
                  <p className="text-xs md:text-sm opacity-60">o hacé click para enviarlo por WhatsApp</p>
                </a>
                <textarea
                  className="w-full bg-sidebar border border-sidebar-border rounded px-3 md:px-4 py-2 md:py-3 text-sidebar-foreground placeholder:opacity-50 text-sm md:text-base"
                  placeholder="Pegá tu experiencia acá..."
                  rows={3}
                />
                <Button
                  onClick={() => setOptimizerStep(2)}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-sm md:text-base"
                >
                  Continuar <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Paso 2 */}
            {optimizerStep === 2 && (
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full bg-sidebar border border-sidebar-border rounded px-3 md:px-4 py-2 md:py-3 text-sidebar-foreground placeholder:opacity-50 text-sm md:text-base"
                  placeholder="Ej: Analista Contable"
                />
                <textarea
                  className="w-full bg-sidebar border border-sidebar-border rounded px-3 md:px-4 py-2 md:py-3 text-sidebar-foreground placeholder:opacity-50 text-sm md:text-base"
                  placeholder="Pegá el aviso (opcional)..."
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button onClick={() => setOptimizerStep(1)} variant="outline" className="flex-1 text-sm md:text-base">Atrás</Button>
                  <Button onClick={() => setOptimizerStep(3)} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-sm md:text-base">
                    Analizar <Search className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Paso 3: resultado → "Quiero que lo arreglen" → WhatsApp */}
            {optimizerStep === 3 && (
              <div className="text-center space-y-4 md:space-y-6">
                <div className="inline-block">
                  <svg width="80" height="80" viewBox="0 0 120 120" className="mx-auto md:w-[120px] md:h-[120px]">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.1" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="200 326.7" strokeLinecap="round" />
                    <text x="60" y="70" textAnchor="middle" className="text-xl md:text-2xl font-black" fill="currentColor">72</text>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Score de visibilidad</div>
                  <h3 className="text-lg md:text-2xl font-black mb-2">Perfil con base sólida</h3>
                  <p className="text-xs md:text-sm opacity-75">Con reestructuración podés alcanzar el nivel de convocatoria que merecés.</p>
                </div>
                <a href={WA_ARREGLAR} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-sm md:text-base">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Quiero que lo arreglen
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ───────────────────────────────────────────────────── */}
      <section id="como-funciona" className="py-12 md:py-20 bg-background">
        <div className="container">
          <div className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            El proceso
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4">Simple, rápido<br /><span className="italic font-light">y sin rodeos.</span></h2>
          <p className="text-base md:text-lg text-muted mb-8 md:mb-12 max-w-2xl">No hay formularios eternos ni esperas de días.</p>
          <div className="grid md:grid-cols-4 gap-4 md:gap-6">
            {[
              { n: "01", icon: FileUp,      title: "Compartís tu perfil", desc: "Mandás tu CV o trayectoria" },
              { n: "02", icon: Eye,         title: "Diagnóstico",         desc: "Analizamos indicadores" },
              { n: "03", icon: Zap,         title: "Reestructuración",    desc: "Reconstruimos tu perfil" },
              { n: "04", icon: CheckCircle, title: "Kit completo",        desc: "PDF, carta, preguntas" },
            ].map((item, i) => (
              <Card key={i} className="p-4 md:p-6 border-border hover:border-accent transition hover:shadow-lg">
                <div className="text-2xl md:text-4xl font-black text-accent/20 mb-3 md:mb-4">{item.n}</div>
                <item.icon className="w-6 md:w-8 h-6 md:h-8 text-accent mb-3 md:mb-4" />
                <h3 className="font-bold text-base md:text-lg mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANTES / DESPUÉS ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container">
          <div className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2 justify-center">
            <Eye className="w-4 h-4" />
            Antes vs Después
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-center mb-2 md:mb-4">La diferencia <span className="italic font-light">es visible.</span></h2>
          <p className="text-center text-muted text-sm md:text-base mb-8 md:mb-12 max-w-2xl mx-auto">El mismo candidato. Distinto perfil. Distinto resultado.</p>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            <Card className="border-destructive/30 bg-destructive/5 overflow-hidden">
              <div className="bg-destructive/10 px-4 py-2 md:py-3 border-b border-destructive/20 flex items-center gap-2 text-xs md:text-sm font-bold text-destructive">
                <XCircle className="w-4 h-4" /> Perfil invisible
              </div>
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <div><h4 className="font-bold text-sm md:text-base">Diego Ramírez</h4><p className="text-xs md:text-sm text-muted">Marketing</p></div>
                <div className="space-y-2 text-xs md:text-sm">
                  <p><strong>Objetivo:</strong> Busco trabajo en marketing.</p>
                  <p><strong>Experiencia:</strong> Community manager en agencia.</p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded p-2 md:p-3 text-xs text-destructive font-bold flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Sin indicadores — descartado
                </div>
              </div>
            </Card>
            <Card className="border-accent/40 bg-accent/5 shadow-lg overflow-hidden">
              <div className="bg-accent/10 px-4 py-2 md:py-3 border-b border-accent/20 flex items-center gap-2 text-xs md:text-sm font-bold text-accent">
                <CheckCircle className="w-4 h-4" /> Perfil optimizado
              </div>
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <div><h4 className="font-black text-sm md:text-lg">DIEGO RAMÍREZ SOLÍS</h4><p className="text-xs font-bold text-secondary uppercase tracking-wider">Marketing Digital</p></div>
                <div className="space-y-2 text-xs md:text-sm">
                  <p>Especialista con 3 años generando resultados medibles.</p>
                  <p>▸ +180% seguidores · ▸ CPL -40% · ▸ ROAS 4.2x</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded p-2 md:p-3 text-xs text-secondary font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 12 indicadores — pasa ✓
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── PRECIOS CANDIDATOS ──────────────────────────────────────────────── */}
      <section id="precios" className="py-12 md:py-20 bg-background">
        <div className="container">
          <div className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Para candidatos
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4">Simple y <span className="italic font-light">sin sorpresas.</span></h2>
          <p className="text-base md:text-lg text-muted mb-8 md:mb-12 max-w-2xl">Pago único. Sin suscripciones.</p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl">
            {[
              {
                name: "Perfil Digital", price: "₲50.000",
                msg: "Hola! Quiero empezar con el plan Perfil Digital (₲50.000). ¿Cómo procedo?",
                features: ["Perfil reestructurado","Carta de presentación","Kit de entrevista","3 mensajes LinkedIn","1 revisión gratuita"],
              },
              {
                name: "Portafolio Web", price: "₲120.000", badge: "Más elegido",
                msg: "Hola! Quiero empezar con el plan Portafolio Web (₲120.000). ¿Cómo procedo?",
                features: ["Todo el plan anterior","Página online","Foto y proyectos","Estilo personalizable","6 actualizaciones/año"],
              },
            ].map((plan, i) => (
              <Card key={i} className={`p-4 md:p-8 border-2 transition ${i === 1 ? "border-accent shadow-lg" : "border-border"}`}>
                {plan.badge && <div className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded mb-4 inline-block">{plan.badge}</div>}
                <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <div className="text-2xl md:text-3xl font-black">{plan.price}</div>
                  <div className="text-xs text-muted">pago único</div>
                </div>
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex gap-2 text-xs md:text-sm">
                      <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                {/* "Empezar ahora" → WhatsApp con mensaje del plan */}
                <a href={`${WA_BASE}?text=${encodeURIComponent(plan.msg)}`} target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full text-sm md:text-base ${i === 1 ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-sidebar text-sidebar-foreground hover:bg-sidebar/90"}`}>
                    Empezar ahora
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECLUTADORES ────────────────────────────────────────────────────── */}
      <section id="rrhh" className="py-12 md:py-20 bg-card">
        <div className="container">
          <div className="text-xs md:text-sm font-bold text-secondary uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Para reclutadores
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4">Accedé a perfiles<br /><span className="italic font-light">pre-rankeados.</span></h2>
          <p className="text-base md:text-lg text-muted mb-8 md:mb-12 max-w-2xl">Recibís lotes de perfiles ya filtrados y puntuados.</p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                name: "Starter", price: "₲150.000", period: "/lote",
                msg: "Hola! Me interesa el plan Starter para reclutadores (₲150.000/lote). ¿Cómo funciona?",
                features: ["30 perfiles","Score individual","PDF completo","48hs"],
              },
              {
                name: "Pro", price: "₲350.000", period: "/mes", badge: true,
                msg: "Hola! Me interesa el plan Pro para reclutadores (₲350.000/mes). ¿Cómo funciona?",
                features: ["Ilimitados","Búsquedas activas","Ranking automático","Panel dedicado"],
              },
              {
                name: "Enterprise", price: "A consultar",
                msg: "Hola! Quiero consultar sobre el plan Enterprise para reclutadores.",
                features: ["Volumen personalizado","Integración","Múltiples idiomas","SLA garantizado"],
              },
            ].map((plan, i) => (
              <Card key={i} className={`p-4 md:p-6 border-2 ${plan.badge ? "border-secondary shadow-lg" : "border-border"}`}>
                {plan.badge && <div className="bg-secondary text-sidebar-foreground text-xs font-bold px-3 py-1 rounded mb-4 inline-block">Recomendado</div>}
                <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <div className="text-2xl md:text-3xl font-black">{plan.price}</div>
                  {plan.period && <div className="text-xs text-muted">{plan.period}</div>}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex gap-2 text-xs md:text-sm">
                      <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                {/* "Empezar" / "Consultar" → WhatsApp con mensaje del plan */}
                <a href={`${WA_BASE}?text=${encodeURIComponent(plan.msg)}`} target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full text-sm md:text-base ${plan.badge ? "bg-secondary text-sidebar-foreground hover:bg-secondary/90" : "border border-border hover:bg-card"}`}>
                    {plan.badge ? "Empezar" : "Consultar"}
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-12 md:py-20 bg-background">
        <div className="container max-w-2xl">
          <div className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2 justify-center">
            <HelpCircle className="w-4 h-4" />
            Preguntas frecuentes
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8 md:mb-12">Todo lo que<br /><span className="italic font-light">necesitás saber.</span></h2>
          <div className="space-y-3">
            {[
              { q: "¿Cuánto tiempo tarda?",   a: "Perfil Digital: 30 min. Portafolio Web: 48 horas." },
              { q: "¿Necesito CV previo?",     a: "No. Podés contarnos tu trayectoria directamente." },
              { q: "¿Se adapta a cada aviso?", a: "Sí. Cada perfil se personaliza para el puesto específico." },
              { q: "¿Qué incluye el kit?",     a: "PDF, carta, 6 preguntas de entrevista y 3 mensajes LinkedIn." },
              { q: "¿Puedo pedir cambios?",    a: "Sí. Cada plan incluye 1 revisión gratuita." },
            ].map((item, i) => (
              <Card
                key={i}
                className="border-border overflow-hidden cursor-pointer hover:border-accent transition"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                <div className="p-4 flex items-center justify-between">
                  <h3 className="font-bold text-sm md:text-base">{item.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-accent transition ${expandedFaq === i ? "rotate-180" : ""}`} />
                </div>
                {expandedFaq === i && (
                  <div className="px-4 pb-4 text-xs md:text-sm text-muted border-t border-border pt-4">{item.a}</div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-sidebar text-sidebar-foreground text-center">
        <div className="container max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-4">Tu próxima entrevista<br /><span className="italic font-light">empieza acá.</span></h2>
          <p className="text-base md:text-lg opacity-75 mb-6 md:mb-8">En 30 minutos tu perfil trabaja para vos.</p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center flex-wrap">
            <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm md:text-base w-full md:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Diagnóstico gratuito
              </Button>
            </a>
            <a href={WA_ESPECIALISTA} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-sidebar-foreground text-sidebar-foreground hover:bg-sidebar-foreground/10 text-sm md:text-base w-full md:w-auto">
                <MessageCircle className="w-4 h-4 mr-2" />
                Hablar con especialista
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-sidebar rounded flex items-center justify-center text-accent font-bold text-xs">CV</div>
            <span className="font-bold text-sm md:text-base"><span className="italic">itae</span></span>
          </div>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-muted">
            <a href="#como-funciona" className="hover:text-accent transition">Cómo funciona</a>
            <a href="#precios"       className="hover:text-accent transition">Precios</a>
            <a href="#faq"           className="hover:text-accent transition">FAQ</a>
          </div>
          <div className="text-xs text-muted">© 2026 CVitae Paraguay</div>
        </div>
      </footer>

      {/* ── BOTÓN FLOTANTE WHATSAPP ──────────────────────────────────────────── */}
      <a
        href={WA_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-40"
      >
        <WhatsApp className="w-6 h-6" />
      </a>
    </div>
  );
}

function HelpCircle(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
