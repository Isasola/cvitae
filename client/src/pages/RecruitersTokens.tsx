import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, FileText, ArrowRight, CheckCircle2, AlertCircle, TrendingUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

interface UploadedCV {
  id: string;
  name: string;
  size: number;
}

export default function RecruitersTokens() {
  const [, setLocation] = useLocation();
  const [uploadedCVs, setUploadedCVs] = useState<UploadedCV[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [isProMode, setIsProMode] = useState(false);
  const [mode, setMode] = useState<"DEMO" | "PRO">("DEMO");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(),
        name: file.name,
        size: file.size,
      }));
      setUploadedCVs([...uploadedCVs, ...newFiles]);
    }
  };

  const handleRemoveCV = (id: string) => {
    setUploadedCVs(uploadedCVs.filter((cv) => cv.id !== id));
  };

  const handleAnalyze = async () => {
    if (uploadedCVs.length === 0) return;
    
    setAnalyzing(true);
    // Simulación para DEMO, en PRO llamaría a Anthropic API
    setTimeout(() => {
      setResults({
        mode,
        totalCVs: uploadedCVs.length,
        shortlist: Math.ceil(uploadedCVs.length * 0.4),
        rejected: uploadedCVs.length - Math.ceil(uploadedCVs.length * 0.4),
        topCandidates: uploadedCVs.slice(0, Math.ceil(uploadedCVs.length * 0.4)).map((cv, idx) => ({
          name: cv.name,
          score: 85 + Math.random() * 15,
          strengths: ["Experiencia relevante", "Habilidades técnicas", "Educación formal"],
          improvements: ["Agregar certificaciones", "Mejorar palabras clave"],
        })),
        rejectedReasons: [
          "Falta experiencia en el sector",
          "No cumple requisitos técnicos",
          "Incompatibilidad geográfica",
          "Formato ATS no óptimo",
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  const validateToken = () => {
    if (tokenInput === "PRO2026") {
      setIsProMode(true);
      setMode("PRO");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-20 pb-20">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center font-black text-xs">CV</div>
            <span className="font-bold">CVitae Reclutadores</span>
          </button>
          <button onClick={() => setLocation("/")} className="text-sm hover:text-purple-400 transition hidden md:block">Volver</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4">
        {/* HERO */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Panel de Reclutadores
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Sube múltiples CVs, obtén análisis automático con IA y ranking de compatibilidad.
            </p>
          </div>

          {/* MODO SELECTOR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* DEMO */}
            <div
              onClick={() => { setMode("DEMO"); setIsProMode(false); }}
              className={`cursor-pointer bg-slate-800/40 backdrop-blur border-2 rounded-2xl p-8 transition transform hover:scale-105 ${mode === "DEMO" ? "border-amber-500" : "border-slate-700/50 hover:border-slate-600/50"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">DEMO</h2>
                <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full font-semibold uppercase tracking-wider">Gratuito</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Análisis básico (simulado)</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Hasta 5 CVs</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Ranking simple</p>
                </div>
              </div>
              {mode === "DEMO" && <div className="text-center text-amber-400 font-semibold text-sm">Seleccionado</div>}
            </div>

            {/* PRO */}
            <div
              onClick={() => { setMode("PRO"); }}
              className={`cursor-pointer bg-gradient-to-br from-purple-600/20 to-purple-600/5 backdrop-blur border-2 rounded-2xl p-8 transition transform hover:scale-105 ${mode === "PRO" ? "border-purple-500" : "border-purple-600/50 hover:border-purple-500/50"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">PRO</h2>
                <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full font-semibold uppercase tracking-wider">$50 USD/MES</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Análisis real con IA (Anthropic)</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Ilimitado CVs</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Requiere aprobación admin</p>
                </div>
              </div>
              
              {mode === "PRO" && !isProMode ? (
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Ingresa tu Token"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition text-sm"
                  />
                  <button onClick={validateToken} className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition uppercase tracking-wider text-sm">
                    Desbloquear Pro
                  </button>
                </div>
              ) : mode === "PRO" && isProMode ? (
                <div className="text-center text-purple-400 font-semibold text-sm">Pro Desbloqueado</div>
              ) : null}
            </div>
          </div>
        </section>

        {/* UPLOAD SECTION */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-600/30 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black">Sube Múltiples CVs</h2>
                <p className="text-sm text-slate-400">Arrastra o selecciona archivos PDF/Word</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-blue-600/30 rounded-xl p-12 text-center hover:border-blue-600/50 transition cursor-pointer group mb-8">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="cv-upload"
              />
              <label htmlFor="cv-upload" className="cursor-pointer block">
                <FileText className="h-16 w-16 text-blue-400/50 group-hover:text-blue-400 transition mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Arrastra CVs aquí</p>
                <p className="text-sm text-slate-400">o haz click para seleccionar</p>
              </label>
            </div>

            {uploadedCVs.length > 0 && (
              <div>
                <h3 className="font-semibold mb-4">Archivos cargados ({uploadedCVs.length}/{mode === "DEMO" ? 5 : "Ilimitado"})</h3>
                <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                  {uploadedCVs.map((cv) => (
                    <div key={cv.id} className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-lg hover:bg-slate-800/60 transition justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        <span className="text-sm flex-1 truncate">{cv.name}</span>
                        <span className="text-xs text-slate-400">{(cv.size / 1024).toFixed(0)} KB</span>
                      </div>
                      <button
                        onClick={() => handleRemoveCV(cv.id)}
                        className="p-1 hover:bg-red-600/30 rounded transition"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={analyzing || (mode === "DEMO" && uploadedCVs.length > 5)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition uppercase tracking-wider disabled:opacity-50 transform hover:scale-105 duration-300"
                >
                  {analyzing ? "Analizando..." : `Analizar ${uploadedCVs.length} CV${uploadedCVs.length !== 1 ? "s" : ""}`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* RESULTADOS */}
        {results && (
          <section className="space-y-8">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 backdrop-blur border border-slate-700/50 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-12">
                <p className="text-slate-400 mb-2 uppercase tracking-wider text-sm font-semibold">Análisis Completado ({results.mode})</p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-400 mb-1 uppercase tracking-wider">Total</p>
                    <p className="text-3xl font-black text-blue-400">{results.totalCVs}</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-400 mb-1 uppercase tracking-wider">Shortlist</p>
                    <p className="text-3xl font-black text-green-400">{results.shortlist}</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-400 mb-1 uppercase tracking-wider">Rechazados</p>
                    <p className="text-3xl font-black text-red-400">{results.rejected}</p>
                  </div>
                </div>
              </div>

              {results.topCandidates.length > 0 && (
                <div>
                  <h3 className="text-2xl font-black mb-6">Top Candidatos</h3>
                  <div className="space-y-4">
                    {results.topCandidates.map((candidate: any, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-lg font-bold">#{idx + 1} - {candidate.name}</p>
                          </div>
                          <p className="text-3xl font-black text-green-400">{candidate.score.toFixed(0)}%</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-green-400 font-semibold mb-2">Fortalezas</p>
                            <ul className="space-y-1">
                              {candidate.strengths.map((s: string, i: number) => (
                                <li key={i} className="text-xs text-slate-300">• {s}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm text-amber-400 font-semibold mb-2">Mejoras</p>
                            <ul className="space-y-1">
                              {candidate.improvements.map((imp: string, i: number) => (
                                <li key={i} className="text-xs text-slate-300">• {imp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.rejectedReasons.length > 0 && (
                <div className="mt-8 p-6 bg-red-600/10 border border-red-600/30 rounded-xl">
                  <p className="text-sm text-red-400 font-semibold mb-3 uppercase tracking-wider">Razones de Rechazo</p>
                  <div className="space-y-2">
                    {results.rejectedReasons.map((reason: string, idx: number) => (
                      <p key={idx} className="text-sm text-slate-300">• {reason}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mode === "PRO" && isProMode && (
              <div className="text-center p-6 bg-purple-600/10 border border-purple-600/30 rounded-xl">
                <p className="text-slate-300 mb-4">Resultados enviados a admin para revisión. Recibirás un email con el análisis completo.</p>
                <a
                  href={`${WA_BASE}?text=${encodeURIComponent("Hola! Subí mis CVs para análisis. ¿Cuándo tendré los resultados?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition"
                >
                  Contactar por WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
