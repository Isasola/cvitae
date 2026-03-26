import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Upload, Plus, Trash2, BarChart3, ArrowRight, Users, FileUp, CheckCircle, AlertCircle, MessageCircle, Info } from "lucide-react";

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
const WA_NUMBER = "595992954169";
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;
const WA_RANKEO = `${WA_BASE}?text=${encodeURIComponent("Hola! Quiero usar el servicio de ranking de candidatos para reclutadores. ¿Cómo funciona?")}`;
const WA_AGENDAR = (nombre: string) =>
  `${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero agendar una entrevista con el candidato: ${nombre}.`)}`;
// ─────────────────────────────────────────────────────────────────────────────

interface Candidate {
  id: string;
  name: string;
  file: File | null;
  score?: number;
  match?: number;
  strengths?: string[];
  gaps?: string[];
}

export default function RecruitersLots() {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: "1", name: "Candidato 1", file: null },
  ]);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { id: Date.now().toString(), name: `Candidato ${candidates.length + 1}`, file: null },
    ]);
  };

  const removeCandidate = (id: string) => {
    if (candidates.length > 1) {
      setCandidates(candidates.filter((c) => c.id !== id));
    }
  };

  const handleFileUpload = (id: string, file: File) => {
    setCandidates(
      candidates.map((c) =>
        c.id === id ? { ...c, file, name: file.name.replace(".pdf", "") } : c
      )
    );
  };

  const analyzeAll = async () => {
    if (!jobTitle.trim()) { alert("Indicá el puesto objetivo"); return; }
    if (candidates.some((c) => !c.file)) { alert("Subí todos los PDFs"); return; }

    setLoading(true);
    // Demo: simula análisis (en producción esto llamaría a la API)
    await new Promise((r) => setTimeout(r, 2000));

    const mockResults = candidates.map((c, idx) => ({
      id: c.id,
      name: c.name,
      score: Math.max(50, 90 - idx * 7),
      match: Math.max(45, 92 - idx * 9),
      strengths: ["Experiencia relevante", "Habilidades técnicas", "Formación académica"],
      gaps: ["Inglés avanzado", "Certificaciones adicionales"],
    }));

    setResults(mockResults);
    setStep(3);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-sidebar rounded flex items-center justify-center text-accent font-bold text-xs md:text-sm">CV</div>
            <span className="font-bold text-sm md:text-lg"><span className="italic">itae</span></span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-xs md:text-sm font-medium hover:text-accent transition">← Volver al inicio</a>
          </div>
        </div>
      </nav>

      <div className="pt-20 md:pt-24 pb-12 md:pb-20">
        <div className="container max-w-4xl px-4">

          {/* HEADER */}
          <div className="mb-6 md:mb-10">
            <div className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Herramienta para reclutadores
            </div>
            <h1 className="text-2xl md:text-5xl font-black mb-3 md:mb-4">
              Rankea candidatos<br /><span className="italic font-light">en segundos.</span>
            </h1>
            <p className="text-sm md:text-lg text-muted max-w-2xl mb-4">
              Subí el aviso del puesto y los CVs de tus candidatos. El sistema los analiza y te devuelve un <strong>ranking con score de compatibilidad</strong>, fortalezas y áreas de mejora para cada uno.
            </p>

            {/* Aviso explicativo */}
            <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-lg p-4 text-sm text-muted max-w-2xl">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">¿Cómo funciona esta herramienta?</strong>
                <p className="mt-1">
                  Esta es una <strong>demostración visual</strong> del servicio. Completá los pasos para ver cómo se vería el ranking.
                  Para contratar el servicio real con análisis por IA, contactanos por WhatsApp.
                </p>
                <a href={WA_RANKEO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-accent font-bold hover:underline">
                  <MessageCircle className="w-4 h-4" />
                  Contratar servicio de ranking →
                </a>
              </div>
            </div>
          </div>

          {/* BARRA DE PROGRESO */}
          <div className="flex gap-2 md:gap-4 mb-8 md:mb-12">
            {["Puesto", "Candidatos", "Resultados"].map((label, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1">
                <div className={`h-1 md:h-2 rounded transition ${step > i ? "bg-accent" : step === i + 1 ? "bg-accent/60" : "bg-border"}`} />
                <span className={`text-xs hidden md:block ${step === i + 1 ? "text-accent font-bold" : "text-muted"}`}>{label}</span>
              </div>
            ))}
          </div>

          {/* PASO 1: Detalles del puesto */}
          {step === 1 && (
            <Card className="p-4 md:p-8 border-border">
              <h2 className="text-xl md:text-2xl font-black mb-1 md:mb-2">Paso 1: Detalles del puesto</h2>
              <p className="text-xs md:text-sm text-muted mb-4 md:mb-6">Indicá el cargo y pegá la descripción del aviso para que el sistema detecte los indicadores clave.</p>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">Puesto objetivo *</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Ej: Analista Contable Senior"
                    className="w-full bg-card border border-border rounded px-3 md:px-4 py-2 md:py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">Descripción del aviso <span className="text-muted font-normal">(recomendado)</span></label>
                  <textarea
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Pegá la descripción completa del aviso para obtener un ranking más preciso..."
                    rows={5}
                    className="w-full bg-card border border-border rounded px-3 md:px-4 py-2 md:py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent text-sm md:text-base"
                  />
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!jobTitle.trim()}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 text-sm md:text-base"
                >
                  Continuar <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}

          {/* PASO 2: Subir candidatos */}
          {step === 2 && (
            <Card className="p-4 md:p-8 border-border">
              <h2 className="text-xl md:text-2xl font-black mb-1 md:mb-2">Paso 2: Candidatos</h2>
              <p className="text-xs md:text-sm text-muted mb-4 md:mb-6">
                Subí los CVs en PDF de cada candidato. Podés agregar hasta 10 por lote.
              </p>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                {candidates.map((candidate, idx) => (
                  <div key={candidate.id} className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-end">
                    <div className="flex-1 w-full">
                      <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                        Candidato {idx + 1}
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => e.target.files && handleFileUpload(candidate.id, e.target.files[0])}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="bg-card border-2 border-dashed border-border hover:border-accent transition rounded px-3 md:px-4 py-3 cursor-pointer flex items-center gap-2 md:gap-3">
                          {candidate.file ? (
                            <>
                              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-secondary flex-shrink-0" />
                              <span className="text-xs md:text-sm font-medium truncate">{candidate.name}</span>
                              <span className="text-xs text-muted ml-auto">PDF cargado ✓</span>
                            </>
                          ) : (
                            <>
                              <FileUp className="w-4 md:w-5 h-4 md:h-5 text-muted flex-shrink-0" />
                              <span className="text-xs md:text-sm text-muted">Hacé click o arrastrá el PDF aquí</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {candidates.length > 1 && (
                      <Button
                        onClick={() => removeCandidate(candidate.id)}
                        variant="outline"
                        size="sm"
                        className="border-destructive text-destructive hover:bg-destructive/10 mt-2 md:mt-0 w-full md:w-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={addCandidate}
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent/10 mb-4 md:mb-6 text-sm md:text-base"
                disabled={candidates.length >= 10}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar otro candidato {candidates.length >= 10 && "(máx. 10)"}
              </Button>

              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 text-sm md:text-base">
                  Atrás
                </Button>
                <Button
                  onClick={analyzeAll}
                  disabled={loading || candidates.some((c) => !c.file)}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 text-sm md:text-base"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Analizando...
                    </span>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Rankear candidatos <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {/* PASO 3: Resultados */}
          {step === 3 && results && (
            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-8 border-border">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 mb-2">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black mb-1">Ranking de candidatos</h2>
                    <p className="text-xs md:text-sm text-muted">Para: <strong>{jobTitle}</strong> · {results.length} candidatos analizados</p>
                  </div>
                  {/* Contratar servicio real → WhatsApp */}
                  <a href={WA_RANKEO} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm md:text-base w-full md:w-auto">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contratar servicio real
                    </Button>
                  </a>
                </div>
                <div className="flex items-start gap-2 bg-accent/5 border border-accent/20 rounded p-3 text-xs text-muted mt-2">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Este es un ranking de <strong>demostración</strong>. Los datos son simulados. Para análisis real por IA, contactanos por WhatsApp.</span>
                </div>
              </Card>

              {results.map((candidate: any, idx: number) => (
                <Card key={candidate.id} className="p-4 md:p-6 border-border overflow-hidden">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 mb-4">
                    <div>
                      <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
                        #{idx + 1} · {candidate.name}
                      </div>
                      <h3 className="text-lg md:text-xl font-black">{candidate.score}<span className="text-sm font-normal text-muted">/100</span></h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Compatibilidad</div>
                      <div className={`text-xl md:text-2xl font-black ${candidate.match >= 80 ? "text-secondary" : candidate.match >= 60 ? "text-accent" : "text-destructive"}`}>
                        {candidate.match}%
                      </div>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="w-full bg-border rounded-full h-2 mb-4">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${candidate.match}%` }}
                    />
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Fortalezas detectadas</div>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {candidate.strengths.map((s: string, i: number) => (
                          <span key={i} className="px-2 md:px-3 py-1 bg-secondary/10 border border-secondary/20 text-xs rounded text-secondary font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-destructive uppercase tracking-wider mb-2">Áreas de mejora</div>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {candidate.gaps.map((g: string, i: number) => (
                          <span key={i} className="px-2 md:px-3 py-1 bg-destructive/10 border border-destructive/20 text-xs rounded text-destructive font-medium flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border flex flex-col md:flex-row gap-2">
                    <Button variant="outline" className="flex-1 text-xs md:text-sm" size="sm">
                      Ver perfil
                    </Button>
                    {/* Agendar entrevista → WhatsApp */}
                    <a href={WA_AGENDAR(candidate.name)} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-secondary text-sidebar-foreground hover:bg-secondary/90 text-xs md:text-sm" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Agendar entrevista
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}

              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <Button
                  onClick={() => {
                    setStep(1);
                    setResults(null);
                    setCandidates([{ id: "1", name: "Candidato 1", file: null }]);
                    setJobTitle("");
                    setJobDesc("");
                  }}
                  variant="outline"
                  className="flex-1 text-sm md:text-base"
                >
                  Analizar otro lote
                </Button>
                {/* Contratar servicio real → WhatsApp */}
                <a href={WA_RANKEO} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-sm md:text-base">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hablar con especialista
                  </Button>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
