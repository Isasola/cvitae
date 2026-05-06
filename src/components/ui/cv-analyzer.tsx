'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, Zap, Loader2, AlertTriangle, ArrowRight, Lock } from 'lucide-react';
import { Button } from './button';
import { ShineBorder } from './shine-border';
import { TetrisLoaderModern } from './tetris-loader-modern';

interface PremiumData {
  missingKeywords: string[];
  coverLetterSnippet: string;
  interviewQuestions: Array<{ question: string; suggestion: string }>;
}

interface AnalysisResult {
  success: boolean;
  atsScore?: number;
  compatibilityPercentage?: number;
  strengths?: string[];
  criticalImprovements?: string[];
  actionPlan?: string[];
  estimatedInterviewChance?: string;
  cvOptimizationMessage?: string;
  premiumData?: PremiumData;
  error?: string;
}

interface CVAnalyzerProps {
  initialTargetJob?: string;
}

export const CVAnalyzer: React.FC<CVAnalyzerProps> = ({ initialTargetJob = '' }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [extractionStep, setExtractionStep] = useState<'idle' | 'extracting' | 'analyzing'>('idle');
  const [targetJob, setTargetJob] = useState<string>(initialTargetJob);

  useEffect(() => {
    if (initialTargetJob) {
      setTargetJob(initialTargetJob);
    }
  }, [initialTargetJob]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const MAX_FILE_SIZE = 15 * 1024 * 1024;
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];

      if (selectedFile.size > MAX_FILE_SIZE) {
        alert(`El archivo es demasiado grande (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB).\n\nMáximo permitido: 15 MB.`);
        return;
      }

      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      } else {
        alert('Por favor, carga un archivo PDF o DOCX');
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = (event.target?.result as string)?.split(',')[1];

          setExtractionStep('extracting');
          const extractResponse = await fetch('/.netlify/functions/extract-pdf-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pdfBase64: base64, fileName: file.name }),
          });

          const extractData = await extractResponse.json();
          if (!extractResponse.ok || !extractData.success) throw new Error(extractData.error || "Error extrayendo texto");

          setExtractionStep('analyzing');
          const response = await fetch('/.netlify/functions/analyze-cv-candidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cvText: extractData.text, targetJob, fileName: file.name }),
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Error analizando CV");

          setResults({
            success: true,
            atsScore: data.atsScore,
            compatibilityPercentage: data.compatibilityPercentage,
            strengths: data.strengths,
            criticalImprovements: data.criticalImprovements,
            actionPlan: data.actionPlan,
            estimatedInterviewChance: data.estimatedInterviewChance,
            cvOptimizationMessage: data.cvOptimizationMessage,
            premiumData: data.premiumData,
          });
          setHasAnalyzed(true);
        } catch (error: any) {
          setResults({ success: false, error: error.message });
          setHasAnalyzed(true);
        } finally {
          setIsAnalyzing(false);
          setExtractionStep('idle');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-500';
  };

  const buildWhatsAppMessage = () => {
    const baseMsg = `🚀 ¡Hola! Quiero el INFORME PREMIUM de CVitae por 50.000 Gs.`;
    const jobPart = targetJob.trim() ? `%0A%0APuesto:%20${encodeURIComponent(targetJob)}` : '';
    const scorePart = results?.atsScore ? `%0A%0AScore%20ATS:%20${results.atsScore}/100` : '';
    return `https://wa.me/595992954169?text=${baseMsg}${jobPart}${scorePart}`;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!hasAnalyzed ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ShineBorder className="max-w-2xl mx-auto bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8">
              <div
                onClick={() => !isAnalyzing && document.getElementById('cv-upload')?.click()}
                className={`border-2 border-dashed border-[#c9a84c]/20 rounded-2xl p-12 text-center transition-all cursor-pointer group ${isAnalyzing ? 'opacity-50 pointer-events-none' : 'hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/5'}`}
              >
                <Upload className="w-12 h-12 text-[#c9a84c] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {fileName || 'Carga tu CV para analizar'}
                </h3>
                <p className="text-gray-500 text-sm mb-6">PDF o Word (Máx 15MB)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cv-upload"
                />
                {!fileName && (
                  <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10">
                    Seleccionar Archivo
                  </Button>
                )}
              </div>

              {fileName && !isAnalyzing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Puesto al que postulas (opcional, pero ayuda a personalizar)"
                    value={targetJob}
                    onChange={(e) => setTargetJob(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/50"
                  />
                  <Button
                    onClick={handleAnalyze}
                    className="w-full bg-[#c9a84c] text-black font-black py-8 text-xl rounded-2xl shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:scale-[1.02] transition-all"
                  >
                    <Zap className="mr-2 fill-current" /> ANALIZAR MI CV AHORA
                  </Button>
                </motion.div>
              )}

              {isAnalyzing && (
                <div className="mt-8 flex flex-col items-center gap-6">
                  <TetrisLoaderModern size="md" speed="fast" text={extractionStep === 'extracting' ? 'Buscando errores críticos...' : 'Analizando compatibilidad con empresas de Paraguay...'} />
                </div>
              )}
            </ShineBorder>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {results?.success ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                  <div className={`p-8 rounded-3xl border ${results.atsScore! < 50 ? 'border-red-500/30 bg-red-500/5' : 'border-[#c9a84c]/30 bg-[#c9a84c]/5'} text-center`}>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Tu Score ATS</span>
                    <div className={`text-6xl font-black mb-2 ${getScoreColor(results.atsScore!)}`}>
                      {results.atsScore}/100
                    </div>
                    <p className="text-sm text-gray-400">
                      {results.atsScore! < 50
                        ? "Tu perfil es invisible para el 75% de las empresas en Paraguay."
                        : "Buen perfil, pero todavía hay margen de mejora crítica."}
                    </p>
                  </div>

                  <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
                      <AlertTriangle size={14} className="text-yellow-500" /> Errores Críticos
                    </h4>
                    <ul className="space-y-3">
                      {results.criticalImprovements?.slice(0, 3).map((err, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span> {err}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="bg-gradient-to-br from-[#c9a84c] to-[#d4b85f] p-1 rounded-3xl shadow-[0_0_50px_rgba(201,168,76,0.2)]">
                    <div className="bg-black rounded-[22px] p-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-black uppercase mb-6">
                        <Lock size={12} /> Informe Premium
                      </div>
                      <h3 className="text-3xl font-black text-white mb-4 leading-tight">
                        ¿Querés que tu CV pase los filtros y te llamen?
                      </h3>

                      {results.premiumData?.missingKeywords && results.premiumData.missingKeywords.length > 0 && (
                        <div className="mb-6 p-4 bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-xl">
                          <p className="text-[#c9a84c] font-bold text-sm mb-2">🔑 Te faltan palabras clave ATS</p>
                          <p className="text-gray-300 text-sm">
                            Tu CV omite {results.premiumData.missingKeywords.length} términos críticos como{' '}
                            <span className="text-white font-semibold">"{results.premiumData.missingKeywords.slice(0, 2).join('", "')}"</span>.
                          </p>
                          <p className="text-gray-400 text-xs mt-2">
                            En el informe premium te damos la lista completa + carta de presentación y guía de entrevista personalizada.
                          </p>
                        </div>
                      )}

                      <ul className="space-y-3 mb-6">
                        <li className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-green-500" /> Lista completa de palabras clave faltantes
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-green-500" /> Carta de presentación lista para enviar
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-green-500" /> Guía con 5 preguntas de entrevista y respuestas sugeridas
                        </li>
                      </ul>

                      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                        <div className="text-left bg-white/5 p-4 rounded-2xl border border-white/10 flex-shrink-0">
                          <span className="text-gray-500 line-through text-xs block mb-1">Normal: ₲150.000</span>
                          <div className="text-4xl font-black text-[#c9a84c] leading-none mb-1">₲50.000</div>
                          <span className="text-[10px] font-black text-[#c9a84c] uppercase tracking-tighter animate-pulse">¡OFERTA ACTIVA!</span>
                        </div>
                        <Button
                          onClick={() => window.open(buildWhatsAppMessage(), '_blank')}
                          className="flex-1 w-full bg-[#c9a84c] text-black font-black py-10 text-2xl rounded-2xl hover:scale-[1.05] transition-all shadow-[0_0_40px_rgba(201,168,76,0.4)] border-b-4 border-[#b39540] active:border-b-0 active:translate-y-1"
                        >
                          OBTENER INFORME PREMIUM <ArrowRight className="ml-3 w-6 h-6" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle size={14} className="text-green-500" /> Pago único y seguro
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle size={14} className="text-green-500" /> Recibís todo por WhatsApp
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { setHasAnalyzed(false); setResults(null); setFile(null); setFileName(''); setTargetJob(initialTargetJob); }}
                    className="w-full py-4 text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    ← Analizar otro archivo
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center p-12 bg-[#0a0a0a] border border-red-500/20 rounded-3xl">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Error en el análisis</h3>
                <p className="text-gray-500 mb-8">{results?.error || "Ocurrió un error inesperado."}</p>
                <Button onClick={() => setHasAnalyzed(false)} className="bg-white/5 border border-white/10 text-white">
                  Reintentar
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
