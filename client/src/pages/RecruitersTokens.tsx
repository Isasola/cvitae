import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Upload, FileText, ArrowRight, CheckCircle2, Lock, Unlock } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";


interface UploadedCV {
  id: string;
  name: string;
  size: number;
}

interface CVAnalysisResult {
  name: string;
  score: number;
  strengths: string[];
  improvements: string[];
  recommendation: string;
}

interface ClientToken {
  id: string;
  clientName: string;
  email: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
  plan: "DEMO" | "PRO";
}

export default function RecruitersTokens() {
  const [, setLocation] = useLocation();
  const [uploadedCVs, setUploadedCVs] = useState<UploadedCV[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [isProMode, setIsProMode] = useState(false);
  const [mode, setMode] = useState<"DEMO" | "PRO">("DEMO");
  const [jobDescription, setJobDescription] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [tokenError, setTokenError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cvitae_job_description");
    if (saved) {
      setJobDescription(saved);
      setCharCount(saved.length);
    }
    const token = localStorage.getItem("cvitae_pro_token");
    if (token) {
      setIsProMode(true);
      setMode("PRO");
      setTokenInput(token);
    }
  }, []);

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.slice(0, 5000);
    setJobDescription(text);
    setCharCount(text.length);
    localStorage.setItem("cvitae_job_description", text);
  };

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
    
    setTimeout(() => {
      setResults({
        mode,
        totalCVs: uploadedCVs.length,
        topCVs: uploadedCVs.slice(0, Math.ceil(uploadedCVs.length * 0.6)).map((cv) => ({
          name: cv.name,
          score: 85 + Math.random() * 15,
          strengths: ["Experiencia relevante", "Habilidades técnicas", "Educación formal"],
          improvements: ["Agregar certificaciones", "Mejorar palabras clave"],
          recommendation: "Candidato prometedor para siguiente fase"
        }))
      });
      setAnalyzing(false);
    }, 2000);
  };

  const validateToken = () => {
    setTokenError("");
    
    // Get all clients from Admin panel
    const saved = localStorage.getItem("cvitae_clients");
    const clients: ClientToken[] = saved ? JSON.parse(saved) : [];
    
    // Find matching token
    const client = clients.find(c => c.token === tokenInput);
    
    if (!client) {
      setTokenError("Token no encontrado");
      return;
    }
    
    if (!client.isActive) {
      setTokenError("Token revocado");
      return;
    }
    
    if (new Date(client.expiresAt) < new Date()) {
      setTokenError("Token expirado");
      return;
    }
    
    // Token is valid
    setIsProMode(true);
    setMode("PRO");
    localStorage.setItem("cvitae_pro_token", tokenInput);
    setTokenError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/60 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/cvitae-logo.png" alt="CVitae" className="h-10 w-auto" />
          </button>
          <button onClick={() => setLocation("/")} className="text-sm hover:text-amber-400 transition hidden md:block">Volver</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-24">
        {/* INSTRUCTIONS */}
        <section className="mb-16">
          <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 rounded-2xl bg-blue-500/5 border border-blue-500/20">
            <div>
              <h2 className="text-2xl font-black mb-4">Cómo funciona</h2>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-blue-400">1</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Contáctanos por WhatsApp</p>
                    <p className="text-xs text-slate-400">Envíanos un mensaje para conocer nuestros planes PRO</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-blue-400">2</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Realiza el pago</p>
                    <p className="text-xs text-slate-400">$50 USD/mes por acceso a 539 oportunidades, análisis avanzado e API</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-blue-400">3</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Recibe tu token</p>
                    <p className="text-xs text-slate-400">Te enviaremos un token único válido por 30 días</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-blue-400">4</div>
                  <div>
                    <p className="font-semibold text-white mb-1">Ingresa tu token aquí</p>
                    <p className="text-xs text-slate-400">Desbloquea acceso PRO completo a todas las funciones</p>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </section>

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
        </section>

        {/* TOKEN FIELD - ALWAYS VISIBLE */}
        <section className="mb-16">
          <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Acceso PRO</h2>
                  <p className="text-sm text-slate-400">Ingresa tu token para desbloquear funciones avanzadas</p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Ingresa tu token PRO"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition text-sm"
                />
                {tokenError && (
                  <p className="text-sm text-red-400">{tokenError}</p>
                )}
                <button 
                  onClick={validateToken}
                  className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 text-black rounded-lg font-semibold transition uppercase tracking-wider text-sm"
                >
                  Desbloquear PRO
                </button>
              </div>
            </div>
          </GlowCard>
        </section>

        {/* PLANES */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 rounded-2xl bg-slate-800/40">
              <div>
                <h2 className="text-2xl font-black mb-6">DEMO</h2>
                <div className="space-y-3 mb-8">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-slate-300">Análisis básico</p>
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
                <p className="text-xs text-slate-400">Gratuito</p>
              </div>
            </GlowCard>

            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div>
                <h2 className="text-2xl font-black mb-6">PRO</h2>
                <div className="space-y-3 mb-8">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-slate-300">Acceso a 539 oportunidades</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-slate-300">Análisis avanzado con IA</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-slate-300">API para integración</p>
                  </div>
                </div>
                <p className="text-amber-400 font-semibold">$50 USD/MES</p>
              </div>
            </GlowCard>
          </div>
        </section>

        {/* JOB DESCRIPTION SECTION */}
        <section className="mb-16">
          <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 rounded-2xl bg-slate-800/40">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Descripción del Puesto</h2>
                  <p className="text-sm text-slate-400">Recomendado para análisis más preciso</p>
                </div>
              </div>

              <textarea
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Pegá aquí la descripción del trabajo para un análisis más preciso y específico"
                maxLength={5000}
                className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition resize-none text-sm"
              />
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-slate-400">{charCount} / 5000 caracteres</p>
              </div>
            </div>
          </GlowCard>
        </section>

        {/* UPLOAD SECTION */}
        <section className="mb-16">
          <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 md:p-12 rounded-2xl bg-slate-800/40">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Sube Múltiples CVs</h2>
                  <p className="text-sm text-slate-400">Arrastra o selecciona archivos PDF/Word</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-amber-500/50 transition cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-input"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-white font-semibold mb-1">Arrastra archivos aquí</p>
                  <p className="text-sm text-slate-400">o haz clic para seleccionar</p>
                </label>
              </div>

              {uploadedCVs.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-4">CVs Cargados ({uploadedCVs.length})</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uploadedCVs.map((cv) => (
                      <div key={cv.id} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                        <span className="text-sm text-slate-300 truncate">{cv.name}</span>
                        <button
                          onClick={() => handleRemoveCV(cv.id)}
                          className="text-red-400 hover:text-red-300 transition text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={uploadedCVs.length === 0 || analyzing}
                className="w-full mt-6 px-6 py-4 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-black rounded-lg font-semibold transition uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {analyzing ? "Analizando..." : "Analizar CVs"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </GlowCard>
        </section>

        {/* RESULTS SECTION */}
        {results && (
          <section className="mb-16">
            <GlowCard glowColor="orange" customSize className="w-full h-auto p-8 rounded-2xl bg-slate-800/40">
              <div>
                <h2 className="text-2xl font-black mb-6">Resultados del Análisis</h2>
                <div className="space-y-4">
                  {results.topCVs.map((cv: CVAnalysisResult, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-amber-400">{cv.name}</h3>
                          <p className="text-sm text-slate-400 mt-1">Score: {Math.round(cv.score)}/100</p>
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <p className="text-sm text-slate-300">{cv.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </section>
        )}
      </div>


    </div>
  );
}
