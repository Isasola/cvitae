import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, Plus, Trash2, BarChart3, ArrowRight, Users, FileUp, CheckCircle, AlertCircle, MessageCircle, Info, Key, Lock, Unlock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

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
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([{ id: "1", name: "Candidato 1", file: null }]);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const addCandidate = () => {
    setCandidates([...candidates, { id: Date.now().toString(), name: `Candidato ${candidates.length + 1}`, file: null }]);
  };

  const removeCandidate = (id: string) => {
    if (candidates.length > 1) setCandidates(candidates.filter((c) => c.id !== id));
  };

  const handleFileUpload = (id: string, file: File) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, file, name: file.name.replace(".pdf", "") } : c)));
  };

  const analyzeAll = async () => {
    if (!jobTitle.trim()) { alert("Indicá el puesto objetivo"); return; }
    if (candidates.some((c) => !c.file)) { alert("Subí todos los PDFs"); return; }

    setLoading(true);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-black text-xs">CV</div>
            <span className="font-bold">CVitae</span>
          </button>
          <button onClick={() => setLocation("/")} className="text-sm hover:text-blue-400 transition">← Volver al inicio</button>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* HEADER */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">
              <Users className="w-4 h-4" />
              Herramienta para reclutadores
            </div>
            <h1 className="text-5xl font-black mb-4">Rankea candidatos en segundos</h1>
            <p className="text-xl text-slate-400 max-w-2xl mb-8">
              Subí el aviso del puesto y los CVs de tus candidatos. El sistema los analiza y te devuelve un ranking con score de compatibilidad.
            </p>

            {/* TOKEN ACCESS SECTION - PROMINENTE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* DEMO */}
              <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Unlock className="h-5 w-5 text-green-400" />
                  <span className="font-bold text-green-400">DEMO GRATUITO</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Prueba Ahora</h3>
                <p className="text-sm text-slate-400 mb-4">Análisis visual simulado. Perfecto para ver cómo funciona.</p>
                <button onClick={() => setStep(1)} className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition">
                  Acceder Demo
                </button>
              </div>

              {/* PRO */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur border border-blue-500/50 rounded-2xl p-6 ring-1 ring-blue-500/50">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="h-5 w-5 text-blue-400" />
                  <span className="font-bold text-blue-400">TOKEN PRO</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Análisis Real por IA</h3>
                <p className="text-sm text-slate-300 mb-4">Ranking preciso con análisis profundo de compatibilidad y recomendaciones.</p>
                <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Quiero contratar el Token Pro para reclutadores. ¿Cuál es el precio y cómo funciona?")}`} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition text-center block">
                  Obtener Token
                </a>
              </div>
            </div>

            {/* INFO */}
            <div className="flex items-start gap-3 bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 text-sm text-slate-400">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Planes disponibles:</strong>
                <p className="mt-1">Starter: 1 lote de 30 CVs · Pro: Análisis ilimitado por 30 días</p>
              </div>
            </div>
          </div>

          {/* BARRA DE PROGRESO */}
          <div className="flex gap-4 mb-12">
            {["Puesto", "Candidatos", "Resultados"].map((label, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1">
                <div className={`h-2 rounded transition ${step > i ? "bg-blue-500" : step === i + 1 ? "bg-blue-500/60" : "bg-slate-700"}`} />
                <span className={`text-xs ${step === i + 1 ? "text-blue-400 font-bold" : "text-slate-400"}`}>{label}</span>
              </div>
            ))}
          </div>

          {/* PASO 1: Detalles del puesto */}
          {step === 1 && (
            <Card className="bg-slate-800/40 border-slate-700/50 p-8">
              <h2 className="text-2xl font-black mb-2">Paso 1: Detalles del puesto</h2>
              <p className="text-slate-400 mb-6">Indicá el cargo y pegá la descripción del aviso para que el sistema detecte los indicadores clave.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Puesto objetivo *</label>
                  <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Ej: Analista Contable Senior" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Descripción del aviso <span className="text-slate-400 font-normal">(recomendado)</span></label>
                  <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Pegá la descripción completa del aviso..." rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
                </div>
                <Button onClick={() => setStep(2)} disabled={!jobTitle.trim()} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white disabled:opacity-50">
                  Continuar <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}

          {/* PASO 2: Subir candidatos */}
          {step === 2 && (
            <Card className="bg-slate-800/40 border-slate-700/50 p-8">
              <h2 className="text-2xl font-black mb-2">Paso 2: Candidatos</h2>
              <p className="text-slate-400 mb-6">Subí los CVs en PDF de cada candidato. Podés agregar hasta 10 por lote.</p>

              <div className="space-y-4 mb-6">
                {candidates.map((candidate, idx) => (
                  <div key={candidate.id} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Candidato {idx + 1}</label>
                      <div className="relative">
                        <input type="file" accept=".pdf" onChange={(e) => e.target.files && handleFileUpload(candidate.id, e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <div className="bg-slate-800 border-2 border-dashed border-slate-700 hover:border-blue-500 transition rounded-lg px-4 py-3 cursor-pointer flex items-center gap-3">
                          {candidate.file ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <span className="text-sm font-medium truncate">{candidate.name}</span>
                              <span className="text-xs text-slate-400 ml-auto">PDF cargado ✓</span>
                            </>
                          ) : (
                            <>
                              <FileUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                              <span className="text-sm text-slate-400">Hacé click o arrastrá el PDF aquí</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {candidates.length > 1 && (
                      <Button onClick={() => removeCandidate(candidate.id)} variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={addCandidate} variant="outline" className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 mb-6" disabled={candidates.length >= 10}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar otro candidato {candidates.length >= 10 && "(máx. 10)"}
              </Button>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800">Atrás</Button>
                <Button onClick={analyzeAll} disabled={loading || candidates.some((c) => !c.file)} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white disabled:opacity-50">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            <div className="space-y-6">
              <Card className="bg-slate-800/40 border-slate-700/50 p-8">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-black mb-1">Ranking de candidatos</h2>
                    <p className="text-slate-400">Para: <strong>{jobTitle}</strong> · {results.length} candidatos analizados</p>
                  </div>
                  <a href={`${WA_BASE}?text=${encodeURIComponent("Hola! Quiero contratar el servicio real de ranking con IA.")}`} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contratar Servicio Real
                    </Button>
                  </a>
                </div>
                <div className="flex items-start gap-2 bg-blue-600/10 border border-blue-500/30 rounded-lg p-3 text-xs text-slate-300 mt-4">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Este es un ranking de <strong>demostración</strong>. Para análisis real por IA, contactanos por WhatsApp.</span>
                </div>
              </Card>

              {results.map((candidate: any, idx: number) => (
                <Card key={candidate.id} className="bg-slate-800/40 border-slate-700/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">#{idx + 1} · {candidate.name}</div>
                      <h3 className="text-2xl font-black">{candidate.score}<span className="text-sm font-normal text-slate-400">/100</span></h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Compatibilidad</div>
                      <div className={`text-2xl font-black ${candidate.match >= 80 ? "text-green-400" : candidate.match >= 60 ? "text-blue-400" : "text-red-400"}`}>{candidate.match}%</div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
                    <div className={`h-2 rounded-full transition ${candidate.match >= 80 ? "bg-green-500" : candidate.match >= 60 ? "bg-blue-500" : "bg-red-500"}`} style={{ width: `${candidate.match}%` }} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">Fortalezas</h4>
                      <ul className="space-y-1">
                        {candidate.strengths.map((s: string) => (
                          <li key={s} className="text-sm text-slate-300">✓ {s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Áreas de mejora</h4>
                      <ul className="space-y-1">
                        {candidate.gaps.map((g: string) => (
                          <li key={g} className="text-sm text-slate-300">✗ {g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex gap-4">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800">Atrás</Button>
                <Button onClick={() => { setStep(1); setResults(null); }} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white">
                  Analizar otro lote
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
