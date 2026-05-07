'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Zap, CheckCircle, XCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CVResult {
  candidateName: string;
  atsScore: number;
  keywords: string[];
  recommendation: 'shortlist' | 'longlist' | 'reject';
  summary: string;
}

interface UploadedFile {
  file: File;
  name: string;
  status: 'pending' | 'extracting' | 'done' | 'error';
  text?: string;
  error?: string;
}

interface RecruitersPanelProps {
  maxCVs?: number;
}

function CVitaeLoader({ text }: { text: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '2rem',
      background: 'rgba(10,10,10,0.85)',
      borderRadius: '16px',
      border: '1px solid rgba(201,168,76,0.2)',
      backdropFilter: 'blur(10px)',
    }}>
      <style>{`
        .cvp-loader { --duration:2.8s; --primary:#c9a84c; --primary-light:#e8d4a0; width:160px; height:260px; position:relative; transform-style:preserve-3d; }
        .cvp-box { position:absolute; left:50%; top:50%; transform-style:preserve-3d; animation:cvp-box var(--duration) ease infinite; }
        .cvp-box div { position:absolute; width:44px; height:44px; border-radius:3px; }
        .cvp-box div:nth-child(1) { transform:translateZ(22px); background:var(--primary-light); }
        .cvp-box div:nth-child(2) { transform:rotateY(90deg) translateZ(22px); background:var(--primary); filter:brightness(0.85); }
        .cvp-box div:nth-child(3) { transform:rotateX(-90deg) translateZ(22px); background:var(--primary); filter:brightness(0.65); }
        .cvp-box div:nth-child(4) { transform:translateZ(-22px) rotateY(180deg); background:rgba(201,168,76,0.25); }
        .cvp-box div:nth-child(5) { transform:rotateY(-90deg) translateZ(-22px) rotateY(180deg); background:rgba(201,168,76,0.15); }
        .cvp-box div:nth-child(6) { transform:rotateX(90deg) translateZ(-22px) rotateX(-180deg); background:rgba(201,168,76,0.1); }
        .cvp-b1 { --x:-50px; --y:-72px; animation-delay:0s; }
        .cvp-b2 { --x:6px; --y:-72px; animation-delay:0.1s; }
        .cvp-b3 { --x:-50px; --y:-14px; animation-delay:0.2s; }
        .cvp-b4 { --x:6px; --y:-14px; animation-delay:0.3s; }
        .cvp-b5 { --x:-50px; --y:44px; animation-delay:0.4s; }
        .cvp-b6 { --x:6px; --y:44px; animation-delay:0.5s; }
        .cvp-b7 { --x:-108px; --y:-14px; animation-delay:0.15s; }
        .cvp-b8 { --x:64px; --y:-14px; animation-delay:0.35s; }
        @keyframes cvp-box {
          0%   { transform:translate(var(--x),calc(var(--y) - 60px)) rotateY(-47.5deg) rotateX(-15deg) rotateZ(15deg) scale(0.8); opacity:0; }
          20%  { opacity:1; }
          50%  { transform:translate(var(--x),var(--y)) rotateY(-47.5deg) rotateX(-15deg) rotateZ(15deg) scale(1); opacity:1; }
          80%  { opacity:1; }
          100% { transform:translate(var(--x),calc(var(--y) + 20px)) rotateY(-47.5deg) rotateX(-15deg) rotateZ(15deg) scale(1); opacity:0; }
        }
        .cvp-text { color:#c9a84c; font-size:12px; letter-spacing:0.15em; text-transform:uppercase; animation:cvp-pulse 2s ease-in-out infinite; }
        @keyframes cvp-pulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
      `}</style>
      <div className="cvp-loader">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className={`cvp-box cvp-b${i}`}>
            <div/><div/><div/><div/><div/><div/>
          </div>
        ))}
      </div>
      <div className="cvp-text">{text}</div>
    </div>
  );
}

export const RecruitersPanel: React.FC<RecruitersPanelProps> = ({ maxCVs = 10 }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [observations, setObservations] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<'extracting' | 'analyzing'>('extracting');
  const [results, setResults] = useState<CVResult[] | null>(null);
  const [globalError, setGlobalError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    const validFiles = files.filter((f) => validTypes.includes(f.type));
    if (validFiles.length + uploadedFiles.length > maxCVs) {
      setGlobalError(`Máximo ${maxCVs} CVs en tu plan actual.`);
      return;
    }
    const newFiles: UploadedFile[] = validFiles.map((f) => ({
      file: f,
      name: f.name,
      status: 'pending',
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setGlobalError('');
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setGlobalError('Ingresá los requisitos del puesto.');
      return;
    }
    if (uploadedFiles.length === 0) {
      setGlobalError('Subí al menos un CV.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep('extracting');
    setGlobalError('');
    setResults(null);

    const extractedCVs: { name: string; content: string }[] = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      setUploadedFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: 'extracting' } : f))
      );

      try {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = (e) => {
            const result = (e.target?.result as string)?.split(',')[1];
            if (result) resolve(result);
            else reject(new Error('No se pudo leer el archivo'));
          };
          reader.onerror = () => reject(new Error('Error de lectura'));
          reader.readAsDataURL(uploadedFiles[i].file);
        });

        const extractRes = await fetch('/.netlify/functions/extract-pdf-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdfBase64: base64, fileName: uploadedFiles[i].name }),
        });

        const extractData = await extractRes.json();

        if (!extractRes.ok || !extractData.success || !extractData.text) {
          setUploadedFiles((prev) =>
            prev.map((f, idx) =>
              idx === i
                ? { ...f, status: 'error', error: extractData.error || 'Error de extracción' }
                : f
            )
          );
          continue;
        }

        setUploadedFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'done', text: extractData.text } : f))
        );
        extractedCVs.push({ name: uploadedFiles[i].name, content: extractData.text });
      } catch (err) {
        setUploadedFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: 'error', error: 'Error al procesar el archivo' } : f
          )
        );
      }
    }

    if (extractedCVs.length === 0) {
      setGlobalError('No se pudo extraer texto de ningún CV. Verificá los archivos.');
      setIsAnalyzing(false);
      return;
    }

    setAnalysisStep('analyzing');

    try {
      const analysisRes = await fetch('/.netlify/functions/analyze-recruiters-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, observations, cvs: extractedCVs }),
      });

      const analysisData = await analysisRes.json();

      if (!analysisRes.ok || !analysisData.success) {
        setGlobalError(analysisData.error || 'Error en el análisis. Intentá de nuevo.');
      } else {
        setResults(analysisData.results);
      }
    } catch {
      setGlobalError('Error de conexión con el servidor. Intentá de nuevo.');
    }

    setIsAnalyzing(false);
  };

  const getRecommendationStyle = (rec: string) => {
    if (rec === 'shortlist') return { bg: 'bg-green-500/20 border-green-500/50', text: 'text-green-400', label: '✓ Shortlist' };
    if (rec === 'longlist') return { bg: 'bg-yellow-500/20 border-yellow-500/50', text: 'text-yellow-400', label: '~ Longlist' };
    return { bg: 'bg-red-500/20 border-red-500/50', text: 'text-red-400', label: '✗ Rechazado' };
  };

  const reset = () => {
    setUploadedFiles([]);
    setResults(null);
    setJobDescription('');
    setObservations('');
    setGlobalError('');
  };

  if (results) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Resultados del Análisis</h3>
          <Button onClick={reset} variant="outline" className="border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10">
            Nuevo Análisis
          </Button>
        </div>
        <div className="grid gap-4">
          {results.map((result, i) => {
            const style = getRecommendationStyle(result.recommendation);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl border ${style.bg} backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{result.candidateName}</h4>
                    <span className={`text-sm font-bold ${style.text}`}>{style.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#c9a84c]">{result.atsScore}</p>
                    <p className="text-xs text-gray-400">Score ATS</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{result.summary}</p>
                {result.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((kw, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 relative">

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(6px)',
              borderRadius: '1rem',
              minHeight: '400px',
            }}
          >
            <CVitaeLoader
              text={
                analysisStep === 'extracting'
                  ? `Leyendo CVs... (${uploadedFiles.filter(f => f.status === 'done').length}/${uploadedFiles.length})`
                  : 'Analizando candidatos con IA...'
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      <h3 className="text-2xl font-bold text-white">Panel de Análisis de CVs</h3>

      <div>
        <label className="block text-sm font-medium text-[#c9a84c] mb-2">
          Requisitos del Puesto *
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Pegá aquí la descripción del puesto o los requisitos clave que buscás en los candidatos..."
          rows={5}
          disabled={isAnalyzing}
          className="w-full px-4 py-3 bg-black/40 border border-[#c9a84c]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a84c] resize-none disabled:opacity-40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Filtros específicos (opcional)
        </label>
        <textarea
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          placeholder="Ej: Solo candidatos de Asunción. Mínimo 3 años de experiencia. Requiere inglés avanzado."
          rows={2}
          disabled={isAnalyzing}
          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/50 resize-none disabled:opacity-40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#c9a84c] mb-2">
          CVs a analizar * (PDF o DOCX — hasta {maxCVs})
        </label>
        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#c9a84c]/40 rounded-xl bg-black/20 transition-all ${isAnalyzing ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-[#c9a84c] hover:bg-[#c9a84c]/5'}`}>
          <Upload className="w-8 h-8 text-[#c9a84c] mb-2" />
          <span className="text-sm text-gray-400">Hacé clic para subir o arrastrá los archivos</span>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={isAnalyzing}
            className="hidden"
          />
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((f, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                {f.status === 'extracting' && <Loader2 className="w-4 h-4 text-[#c9a84c] animate-spin" />}
                {f.status === 'done' && <CheckCircle className="w-4 h-4 text-green-400" />}
                {f.status === 'error' && <XCircle className="w-4 h-4 text-red-400" />}
                {f.status === 'pending' && <div className="w-4 h-4 rounded-full border border-gray-500" />}
                <span className="text-sm text-gray-300 truncate max-w-[200px]">{f.name}</span>
                {f.error && <span className="text-xs text-red-400">{f.error}</span>}
              </div>
              {!isAnalyzing && (
                <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {globalError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{globalError}</p>
        </div>
      )}

      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || uploadedFiles.length === 0 || !jobDescription.trim()}
        className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold py-4 hover:shadow-lg hover:shadow-[#c9a84c]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Zap className="w-5 h-5" />
        Analizar {uploadedFiles.length > 0 ? `${uploadedFiles.length} CV${uploadedFiles.length > 1 ? 's' : ''}` : 'CVs'}
      </Button>
    </div>
  );
};

export default RecruitersPanel;
