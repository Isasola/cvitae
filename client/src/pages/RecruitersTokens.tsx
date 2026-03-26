import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function RecruitersTokens() {
  const [, setLocation] = useLocation();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [isProMode, setIsProMode] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return;
    
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        total: uploadedFiles.length,
        topCVs: [
          {
            name: uploadedFiles[0]?.name || "CV 1",
            score: 92,
            strengths: ["Experiencia relevante", "Habilidades técnicas claras", "Formato ATS-friendly"],
            improvements: ["Agregar certificaciones", "Mejorar palabras clave"],
            recommendation: "Excelente candidato para posiciones senior"
          }
        ]
      });
      setAnalyzing(false);
    }, 2000);
  };

  const validateToken = () => {
    if (tokenInput === "PRO2026") {
      setIsProMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-20 pb-20">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center font-black text-xs">CV</div>
            <span className="font-bold">CVitae Pro</span>
          </button>
          <button onClick={() => setLocation("/")} className="text-sm hover:text-purple-400 transition hidden md:block">Volver</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4">
        {/* HERO */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight animate-fade-in">
              Panel de Reclutadores
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Sube CVs, obtén análisis automático con IA, y ranking de compatibilidad en segundos.
            </p>
          </div>

          {/* DEMO vs PRO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-slide-up">
            {/* DEMO */}
            <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition transform hover:scale-105 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">DEMO</h2>
                <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full font-semibold uppercase tracking-wider">Gratuito</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Análisis básico</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Hasta 3 CVs</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Ranking simple</p>
                </div>
              </div>
              <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition uppercase tracking-wider text-sm">
                Comenzar Demo
              </button>
            </div>

            {/* PRO */}
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 backdrop-blur border border-purple-600/50 rounded-2xl p-8 hover:border-purple-500/50 transition transform hover:scale-105 duration-300 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">PRO</h2>
                <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full font-semibold uppercase tracking-wider">$50 USD/MES</span>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Análisis avanzado con IA</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Ilimitado CVs</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">Ranking por compatibilidad</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-300">API access</p>
                </div>
              </div>
              
              {!isProMode ? (
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Ingresa tu Token"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                  />
                  <button onClick={validateToken} className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition uppercase tracking-wider text-sm">
                    Desbloquear Pro
                  </button>
                </div>
              ) : (
                <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition uppercase tracking-wider text-sm">
                  ✓ Pro Desbloqueado
                </button>
              )}
            </div>
          </div>
        </section>

        {/* UPLOAD SECTION */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-600/30 rounded-2xl p-8 md:p-12 animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center animate-pulse">
                <Upload className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black">Sube CVs</h2>
                <p className="text-sm text-slate-400">Arrastra o selecciona archivos PDF/Word</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-blue-600/30 rounded-xl p-12 text-center hover:border-blue-600/50 transition cursor-pointer group">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="cv-upload"
              />
              <label htmlFor="cv-upload" className="cursor-pointer block">
                <FileText className="h-16 w-16 text-blue-400/50 group-hover:text-blue-400 transition mx-auto mb-4 animate-bounce" />
                <p className="text-lg font-semibold mb-2">Arrastra CVs aquí</p>
                <p className="text-sm text-slate-400">o haz click para seleccionar</p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-8 animate-fade-in">
                <h3 className="font-semibold mb-4">Archivos seleccionados ({uploadedFiles.length})</h3>
                <div className="space-y-2 mb-6">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-lg hover:bg-slate-800/60 transition">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <span className="text-sm flex-1">{file.name}</span>
                      <span className="text-xs text-slate-400">{(file.size / 1024).toFixed(0)} KB</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition uppercase tracking-wider disabled:opacity-50 transform hover:scale-105 duration-300"
                >
                  {analyzing ? "Analizando..." : "Analizar CVs"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* RESULTADOS */}
        {results && (
          <section className="mb-20 animate-fade-in">
            <h2 className="text-3xl font-black mb-8">Top 5 Candidatos</h2>
            <div className="space-y-6">
              {results.topCVs.map((cv: any, idx: number) => (
                <div key={idx} className="bg-gradient-to-r from-slate-800/40 to-slate-800/20 backdrop-blur border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/30 transition transform hover:scale-102 duration-300">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-black text-blue-400">#{idx + 1}</span>
                        <h3 className="text-xl font-bold">{cv.name}</h3>
                      </div>
                      <p className="text-sm text-slate-400">Score de compatibilidad</p>
                    </div>
                    <div className="text-right w-full md:w-auto">
                      <p className="text-4xl font-black text-blue-400">{cv.score}%</p>
                      <div className="w-full md:w-32 h-2 bg-slate-700/50 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse" style={{width: `${cv.score}%`}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-3 uppercase tracking-wider text-sm">Fortalezas</h4>
                      <ul className="space-y-2">
                        {cv.strengths.map((s: string, i: number) => (
                          <li key={i} className="flex gap-2 text-sm text-slate-300">
                            <span className="text-green-400">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-400 mb-3 uppercase tracking-wider text-sm">Mejoras</h4>
                      <ul className="space-y-2">
                        {cv.improvements.map((imp: string, i: number) => (
                          <li key={i} className="flex gap-2 text-sm text-slate-300">
                            <span className="text-amber-400">•</span>
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <p className="text-sm text-slate-300">{cv.recommendation}</p>
                  </div>

                  <div className="mt-6">
                    <a
                      href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Me interesa este candidato: ${cv.name} (Score: ${cv.score}%)`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-semibold transition uppercase tracking-wider text-sm"
                    >
                      Contactar por WhatsApp <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-20 border-t border-slate-800/50">
          <h2 className="text-3xl font-black mb-6">¿Listo para optimizar tu proceso?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Acceso Pro: Análisis ilimitado de CVs, ranking automático y API para integración.</p>
          <a
            href={`${WA_BASE}?text=${encodeURIComponent("Hola! Quiero acceso Pro para análisis de CVs.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-semibold transition shadow-lg uppercase tracking-wider transform hover:scale-105 duration-300"
          >
            Contactar Ventas <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </div>
    </div>
  );
}
