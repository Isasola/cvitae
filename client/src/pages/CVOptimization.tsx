import { useState } from "react";
import { useLocation } from "wouter";
import { Upload, FileText, ArrowRight, AlertCircle, TrendingUp, Zap } from "lucide-react";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function CVOptimization() {
  const [, setLocation] = useLocation();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [jobTarget, setJobTarget] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!cvFile) return;
    
    setAnalyzing(true);
    
    // En producción, esto llamaría a la Netlify Function que usa Anthropic API
    // Por ahora, simulación realista
    setTimeout(() => {
      setAnalysis({
        atsScore: 68,
        strengths: [
          "Experiencia en el sector relevante",
          "Habilidades técnicas bien documentadas",
          "Educación formal completa"
        ],
        criticalImprovements: [
          "Agregar palabras clave de la industria (ATS no las detecta)",
          "Reformatear para mejorar legibilidad de máquinas",
          "Incluir métricas y resultados cuantificables",
          "Actualizar habilidades técnicas según tendencias 2026",
          "Mejorar estructura de secciones"
        ],
        actionPlan: [
          "Paso 1: Reescribir resumen ejecutivo con palabras clave",
          "Paso 2: Agregar números y métricas a logros",
          "Paso 3: Reorganizar habilidades por relevancia",
          "Paso 4: Validar con herramientas ATS online"
        ],
        estimatedInterviewChance: "Media",
        cvOptimizationMessage: "Tu CV tiene potencial pero necesita optimización estratégica. El 68% de compatibilidad ATS significa que muchos filtros automáticos te descartan. Con nuestro servicio de optimización, podemos llevarte a 95%+ en 48 horas. Inversión: ₲50k-120k. Resultado: 3-5x más entrevistas."
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-20 pb-20">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center font-black text-xs">CV</div>
            <span className="font-bold">CVitae Optimize</span>
          </button>
          <button onClick={() => setLocation("/")} className="text-sm hover:text-green-400 transition hidden md:block">Volver</button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4">
        {/* HERO */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Optimiza tu CV
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Análisis honesto de compatibilidad ATS. Descubre por qué tu CV no pasa filtros automáticos.
            </p>
          </div>

          {/* PROBLEMA */}
          <div className="bg-gradient-to-br from-red-600/10 to-red-600/5 border border-red-600/30 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black mb-3">El Problema Real</h2>
                <p className="text-slate-300 mb-4">
                  El 75% de los CVs son rechazados por algoritmos ATS antes de ser leídos por un humano. Tu CV podría ser excelente, pero si no está optimizado para máquinas, nunca llegará a manos de un reclutador.
                </p>
                <p className="text-sm text-slate-400">
                  Tiempo promedio de revisión: 6 segundos. Tiempo que tarda un ATS en rechazarte: 2 segundos.
                </p>
              </div>
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
                <h2 className="text-2xl font-black">Sube tu CV</h2>
                <p className="text-sm text-slate-400">Análisis gratuito en segundos</p>
              </div>
            </div>

            {!cvFile ? (
              <div className="border-2 border-dashed border-blue-600/30 rounded-xl p-12 text-center hover:border-blue-600/50 transition cursor-pointer group">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="cv-upload"
                />
                <label htmlFor="cv-upload" className="cursor-pointer block">
                  <FileText className="h-16 w-16 text-blue-400/50 group-hover:text-blue-400 transition mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">Arrastra tu CV aquí</p>
                  <p className="text-sm text-slate-400">o haz click para seleccionar</p>
                  <p className="text-xs text-slate-500 mt-4">PDF, Word (.doc, .docx)</p>
                </label>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-lg mb-6 justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="h-6 w-6 text-blue-400" />
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

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">¿A qué puesto aplicas? (opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej: Senior Developer, Product Manager, Data Scientist"
                    value={jobTarget}
                    onChange={(e) => setJobTarget(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition uppercase tracking-wider disabled:opacity-50 transform hover:scale-105 duration-300"
                >
                  {analyzing ? "Analizando..." : "Analizar CV Ahora"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* RESULTADOS */}
        {analysis && (
          <section className="space-y-8">
            {/* SCORE */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-800/20 backdrop-blur border border-slate-700/50 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <p className="text-slate-400 mb-2 uppercase tracking-wider text-sm font-semibold">Score de Compatibilidad ATS</p>
                <p className="text-7xl font-black text-blue-400 mb-4">{analysis.atsScore}%</p>
                <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden max-w-md mx-auto">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400" 
                    style={{width: `${analysis.atsScore}%`}}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-slate-400 mb-1 uppercase tracking-wider">Probabilidad de Entrevista</p>
                  <p className="text-2xl font-black text-amber-400">{analysis.estimatedInterviewChance}</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-slate-400 mb-1 uppercase tracking-wider">Potencial Máximo</p>
                  <p className="text-2xl font-black text-green-400">95%+</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-sm text-slate-400 mb-1 uppercase tracking-wider">Mejora Posible</p>
                  <p className="text-2xl font-black text-purple-400">+{95 - analysis.atsScore}%</p>
                </div>
              </div>
            </div>

            {/* FORTALEZAS */}
            <div className="bg-gradient-to-br from-green-600/10 to-green-600/5 border border-green-600/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-black">Fortalezas</h3>
              </div>
              <div className="space-y-3">
                {analysis.strengths.map((s: string, i: number) => (
                  <div key={i} className="flex gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MEJORAS CRÍTICAS */}
            <div className="bg-gradient-to-br from-amber-600/10 to-amber-600/5 border border-amber-600/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-2xl font-black">Mejoras Críticas</h3>
              </div>
              <div className="space-y-3">
                {analysis.criticalImprovements.map((imp: string, i: number) => (
                  <div key={i} className="flex gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300">{imp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PLAN DE ACCIÓN */}
            <div className="bg-gradient-to-br from-purple-600/10 to-purple-600/5 border border-purple-600/30 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-6">Plan de Acción</h3>
              <div className="space-y-4">
                {analysis.actionPlan.map((step: string, i: number) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold text-purple-400">
                      {i + 1}
                    </div>
                    <p className="text-slate-300 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PROPUESTA DE VALOR */}
            <div className="bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-600/50 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-black mb-4">La Solución</h3>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {analysis.cvOptimizationMessage}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-black text-green-400 mb-2">48h</p>
                  <p className="text-sm text-slate-400">Entrega rápida</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-green-400 mb-2">95%+</p>
                  <p className="text-sm text-slate-400">Compatibilidad ATS</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-green-400 mb-2">3-5x</p>
                  <p className="text-sm text-slate-400">Más entrevistas</p>
                </div>
              </div>
              <a
                href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Mi CV tiene ${analysis.atsScore}% de compatibilidad ATS. Quiero mejorarlo a 95%+. ¿Cuál es el costo?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-semibold transition shadow-lg uppercase tracking-wider transform hover:scale-105 duration-300"
              >
                Mejorar mi CV Ahora <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
