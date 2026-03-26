import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, ArrowRight, MessageCircle, TrendingUp, ChevronRight, Zap, Globe } from "lucide-react";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const WA_DIAGNOSTICO = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero hacer un diagnóstico gratuito de mi CV.")}`;
const WA_DUDAS = `${WA_BASE}?text=${encodeURIComponent("Hola! Tengo dudas sobre CVitae, ¿me podés ayudar?")}`;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVEGACIÓN LIMPIA */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-9 h-9 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center text-white font-black text-xs">
              CV
            </div>
            <span className="font-bold text-base tracking-tight">
              <span className="italic font-light">itae</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/jobs" className="text-sm font-medium hover:text-accent transition hidden md:block">
              Explorar
            </a>
            <a href={WA_DUDAS} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/5">
                Ayuda
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - BUSCADOR CENTRAL */}
      <section className="pt-32 pb-24 px-4 bg-gradient-to-b from-background via-background to-accent/3">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 mb-6 text-xs font-semibold text-accent">
              <Globe className="w-3.5 h-3.5" />
              Global Opportunity Hub
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
              Tu talento,<br />
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                visible en el mundo.
              </span>
            </h1>

            <p className="text-lg text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
              Accedé a 2000+ oportunidades globales. Optimizá tu perfil para pasar filtros ATS. Aplica con estrategia.
            </p>
          </div>

          {/* BUSCADOR PREMIUM */}
          <div className="mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-card border border-border/50 rounded-xl p-1 backdrop-blur-sm">
                <div className="flex items-center gap-3 px-5 py-4">
                  <Search className="w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="MEXT, Mercado Libre, Capital Semilla, Contador..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted/60 focus:outline-none text-base"
                  />
                  <a href={`/jobs?search=${encodeURIComponent(searchQuery)}`}>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 h-10 px-6">
                      Buscar
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA PRINCIPAL */}
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/jobs">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base font-semibold">
                Explorar 2000+ Oportunidades
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/5 h-12 px-8 text-base font-semibold">
                <Zap className="w-4 h-4 mr-2" />
                Diagnóstico Gratuito
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN: EL PROBLEMA (SOFISTICADO) */}
      <section className="py-20 px-4 bg-background border-t border-border/50">
        <div className="container max-w-5xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              El 75% de los CVs nunca son leídos.
            </h2>
            <p className="text-lg text-muted max-w-3xl leading-relaxed">
              Los algoritmos ATS (Applicant Tracking Systems) filtran candidatos en milisegundos. Tu experiencia no importa si el sistema no te ve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { stat: "75%", label: "CVs rechazados automáticamente", detail: "Antes de ser leídos por humanos" },
              { stat: "6 seg", label: "Tiempo promedio de lectura", detail: "Si pasas el filtro ATS" },
              { stat: "12", label: "Indicadores que buscan los ATS", detail: "Palabras clave, formato, estructura" },
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border/50 rounded-xl p-6 hover:border-accent/30 transition">
                <div className="text-4xl font-black text-accent mb-2">{item.stat}</div>
                <div className="font-semibold mb-1">{item.label}</div>
                <p className="text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl p-8 md:p-10">
            <h3 className="font-black text-xl mb-6">Lo que hacemos diferente:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-accent font-black text-lg mb-3">Ingeniería Inversa</div>
                <p className="text-sm text-muted leading-relaxed">Reestructuramos tu perfil bajo los 12 indicadores que los ATS buscan realmente.</p>
              </div>
              <div>
                <div className="text-accent font-black text-lg mb-3">Palabras Clave</div>
                <p className="text-sm text-muted leading-relaxed">Insertamos términos estratégicos que los reclutadores ya decidieron contratar.</p>
              </div>
              <div>
                <div className="text-accent font-black text-lg mb-3">Asesoría Real</div>
                <p className="text-sm text-muted leading-relaxed">Hablamos por WhatsApp. No es un bot. Ajustamos según tu perfil y objetivo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: CÓMO FUNCIONA */}
      <section className="py-20 px-4 bg-background">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-black mb-16 tracking-tight">Tres pasos. Un resultado.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Diagnóstico",
                description: "Subí tu CV. Analizamos cómo lo ve un ATS y qué falta.",
              },
              {
                step: "2",
                title: "Optimización",
                description: "Reestructuramos tu perfil para pasar filtros y destacar.",
              },
              {
                step: "3",
                title: "Oportunidades",
                description: "Accedé a 2000+ becas, empleos y capital semilla globales.",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent/20 rounded-full" />
                <div className="relative bg-card border border-border/50 rounded-xl p-8">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-lg font-black mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-black text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: PARA RECLUTADORES */}
      <section className="py-20 px-4 bg-accent/3 border-t border-border/50">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 mb-6 text-xs font-semibold text-accent">
                <TrendingUp className="w-3.5 h-3.5" />
                Para Reclutadores
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">Rankea candidatos en segundos.</h3>
              <p className="text-lg text-muted mb-8 leading-relaxed">
                Sube CVs. Obtén un ranking de compatibilidad automático. Olvídate de revisar manualmente.
              </p>
              <a href="/recruiters/lots">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 h-12 px-8 text-base font-semibold">
                  Probar Gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
              <div className="text-5xl font-black text-accent mb-4">Score</div>
              <p className="font-semibold mb-2">Compatibilidad Automática</p>
              <p className="text-sm text-muted">Análisis basado en indicadores de competencia reales</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: PLANES */}
      <section className="py-20 px-4 bg-background">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-black mb-4 tracking-tight">Planes para Candidatos</h2>
          <p className="text-lg text-muted mb-12 max-w-2xl">Elige el plan que se adapte a tu objetivo. Incluye asesoría por WhatsApp.</p>

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
              },
              {
                name: "Portafolio Web",
                price: "₲120.000",
                description: "CV + Sitio web profesional",
                features: [
                  "Todo del plan anterior",
                  "Sitio web personalizado",
                  "Integración con LinkedIn",
                  "Mentoría de 30 días",
                ],
                highlight: true,
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 border transition ${
                  plan.highlight ? "border-accent bg-gradient-to-br from-accent/10 to-accent/5" : "border-border/50 hover:border-accent/30"
                }`}
              >
                {plan.highlight && (
                  <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-3 py-1 mb-4 text-xs font-semibold text-accent">
                    Recomendado
                  </div>
                )}
                <h3 className="font-black text-xl mb-2">{plan.name}</h3>
                <p className="text-muted text-sm mb-6">{plan.description}</p>
                <div className="text-3xl font-black text-accent mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-accent font-black mt-0.5">+</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11 font-semibold">
                    Comenzar
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 px-4 bg-accent/5 border-t border-border/50">
        <div className="container max-w-5xl text-center">
          <h2 className="text-3xl font-black mb-6 tracking-tight">¿Listo para destacar?</h2>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">Hablemos sobre tu perfil y tus objetivos. La primera consulta es gratuita.</p>
          <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 h-12 px-8 text-base font-semibold">
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
