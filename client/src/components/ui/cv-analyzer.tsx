'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, Zap, Loader2 } from 'lucide-react';
import { Button } from './button';
import { ShineBorder } from './shine-border';
import { TetrisLoaderModern } from './tetris-loader-modern';

interface AnalysisResult {
  success: boolean;
  atsScore?: number;
  compatibilityPercentage?: number;
  strengths?: string[];
  criticalImprovements?: string[];
  actionPlan?: string[];
  estimatedInterviewChance?: string;
  cvOptimizationMessage?: string;
  error?: string;
}

export const CVAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [extractionStep, setExtractionStep] = useState<'idle' | 'extracting' | 'analyzing'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];
      
      if (selectedFile.size > MAX_FILE_SIZE) {
        alert(`El archivo es demasiado grande (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB).\n\nMáximo permitido: 15 MB.\n\nSi tu archivo es más pesado, por favor optimizalo.`);
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
    if (!file) {
      alert('Por favor, selecciona un archivo');
      return;
    }

    const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
    if (file.size > MAX_FILE_SIZE) {
      alert(`El archivo excede el límite de 15 MB.\n\nTamaño actual: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      return;
    }

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = (event.target?.result as string)?.split(',')[1];

          // Step 1: Extract PDF text
          setExtractionStep('extracting');
          const extractResponse = await fetch('/.netlify/functions/extract-pdf-text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pdfBase64: base64,
              fileName: file.name,
            }),
          });

          const extractData = await extractResponse.json();

          if (!extractResponse.ok) {
            setResults({
              success: false,
              error: `Error en servidor: ${extractResponse.status}. Por favor, intenta más tarde.`,
            });
            setHasAnalyzed(true);
            setIsAnalyzing(false);
            setExtractionStep('idle');
            return;
          }

          if (!extractData.success || !extractData.text) {
            setResults({
              success: false,
              error: extractData.error || 'No se pudo extraer texto del PDF. Verifica que sea un PDF válido (máximo 15 MB).',
            });
            setHasAnalyzed(true);
            setIsAnalyzing(false);
            setExtractionStep('idle');
            return;
          }

          // Step 2: Analyze extracted text with Claude
          setExtractionStep('analyzing');
          const response = await fetch('/.netlify/functions/analyze-cv-candidate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cvText: extractData.text,
              fileName: file.name,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            setResults({
              success: false,
              error: `Error en análisis: ${response.status}. Por favor, intenta más tarde.`,
            });
            setHasAnalyzed(true);
            setIsAnalyzing(false);
            setExtractionStep('idle');
            return;
          }

          if (data.atsScore !== undefined) {
            setResults({
              success: true,
              atsScore: data.atsScore,
              compatibilityPercentage: data.compatibilityPercentage,
              strengths: data.strengths,
              criticalImprovements: data.criticalImprovements,
              actionPlan: data.actionPlan,
              estimatedInterviewChance: data.estimatedInterviewChance,
              cvOptimizationMessage: data.cvOptimizationMessage,
            });
          } else {
            setResults({
              success: false,
              error: data.error || 'Error al analizar el CV',
            });
          }
          setHasAnalyzed(true);
        } catch (error) {
          setResults({
            success: false,
            error: 'Error al procesar el archivo. Intenta de nuevo.',
          });
          setHasAnalyzed(true);
        } finally {
          setIsAnalyzing(false);
          setExtractionStep('idle');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setResults({
        success: false,
        error: 'Error al leer el archivo',
      });
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-green-400/10 border-green-400/30';
    if (score >= 50) return 'bg-yellow-400/10 border-yellow-400/30';
    return 'bg-red-400/10 border-red-400/30';
  };

  return (
    <section className="py-20 border-t border-[#c9a84c]/10">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-white text-center mb-4"
        >
          Diagnóstico de CV Gratis
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Descubre exactamente por qué tu perfil no está siendo visible para los
          reclutadores. Análisis en tiempo real con IA, sin compromisos.
        </motion.p>

        <ShineBorder className="max-w-2xl mx-auto">
          <div className="space-y-8">
            {!hasAnalyzed ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-2 border-dashed border-[#c9a84c]/30 rounded-lg p-12 text-center hover:border-[#c9a84c]/50 transition-colors cursor-pointer group"
                >
                  <Upload className="w-12 h-12 text-[#c9a84c] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {fileName || 'Carga tu CV'}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    PDF o Word
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <Button
                    onClick={() => document.getElementById('cv-upload')?.click()}
                    className="bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-semibold"
                  >
                    Seleccionar Archivo
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex gap-4"
                >
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                      <TetrisLoaderModern size="md" speed="fast" text={extractionStep === 'extracting' ? 'Extrayendo texto del PDF...' : 'Analizando con IA...'} />
                    </div>
                  ) : (
                    <Button
                      onClick={handleAnalyze}
                      disabled={!file}
                      className="flex-1 bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-semibold hover:shadow-lg hover:shadow-[#c9a84c]/30 disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Análisis Gratis
                    </Button>
                  )}
                </motion.div>

                <p className="text-center text-sm text-gray-500">
                  ✓ Análisis instantáneo · ✓ Sin datos guardados · ✓ Confidencial
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {results?.success ? (
                    <>
                      <h3 className="text-2xl font-bold text-white text-center">
                        Resultados del Análisis
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            label: 'ATS Score',
                            score: results?.atsScore || 0,
                            icon: CheckCircle,
                          },
                          {
                            label: 'Compatibilidad',
                            score: results?.compatibilityPercentage || 0,
                            icon: CheckCircle,
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-xl border ${getScoreBg(item.score)} text-center`}
                          >
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">{item.label}</p>
                            <p className={`text-3xl font-bold ${getScoreColor(item.score)}`}>
                              {item.score}%
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <h4 className="text-[#c9a84c] font-bold text-sm uppercase mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Probabilidad de Entrevista
                          </h4>
                          <p className="text-white font-medium">{results?.estimatedInterviewChance}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <h4 className="text-green-400 font-bold text-sm uppercase mb-3">Fortalezas</h4>
                            <ul className="space-y-2">
                              {results?.strengths?.map((s, i) => (
                                <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                                  <span className="text-green-400">•</span> {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <h4 className="text-red-400 font-bold text-sm uppercase mb-3">Mejoras Críticas</h4>
                            <ul className="space-y-2">
                              {results?.criticalImprovements?.map((m, i) => (
                                <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                                  <span className="text-red-400">•</span> {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl p-6">
                          <h4 className="text-[#c9a84c] font-bold text-sm uppercase mb-4">Plan de Acción Sugerido</h4>
                          <ul className="space-y-3">
                            {results?.actionPlan?.map((step, i) => (
                              <li key={i} className="text-sm text-gray-200 flex items-start gap-3">
                                <span className="w-5 h-5 rounded-full bg-[#c9a84c] text-black text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 space-y-4">
                        <Button
                          onClick={() => window.open(`https://wa.me/595992954169?text=Hola! Mi puntaje ATS fue de ${results?.atsScore}%. Quisiera optimizar mi CV para mejorar mis oportunidades.`, '_blank')}
                          className="w-full bg-[#c9a84c] text-black font-bold py-6 rounded-xl hover:shadow-lg hover:shadow-[#c9a84c]/20 transition-all"
                        >
                          Optimizar mi CV con un Experto
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setHasAnalyzed(false);
                            setFile(null);
                            setFileName('');
                            setResults(null);
                          }}
                          className="w-full text-gray-500 hover:text-white"
                        >
                          Analizar otro archivo
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Error en el análisis</h3>
                      <p className="text-gray-400 mb-6">{results?.error}</p>
                      <Button
                        onClick={() => {
                          setHasAnalyzed(false);
                          setFile(null);
                          setFileName('');
                          setResults(null);
                        }}
                        className="bg-white/10 text-white hover:bg-white/20"
                      >
                        Reintentar
                      </Button>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </div>
        </ShineBorder>
      </div>
    </section>
  );
};
