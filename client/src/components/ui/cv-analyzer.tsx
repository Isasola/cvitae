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
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`p-4 rounded-lg border ${getScoreBg(item.score)}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-gray-300">
                                {item.label}
                              </span>
                              <item.icon className={`w-4 h-4 ${getScoreColor(item.score)}`} />
                            </div>
                            <div className="text-2xl font-bold">
                              <span className={getScoreColor(item.score)}>
                                {item.score}%
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {results?.strengths && results.strengths.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 space-y-2"
                        >
                          <h4 className="font-semibold text-green-300 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Fortalezas
                          </h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {results.strengths.map((strength, i) => (
                              <li key={i}>• {strength}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {results?.criticalImprovements && results.criticalImprovements.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 space-y-2"
                        >
                          <h4 className="font-semibold text-red-300 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Mejoras Urgentes
                          </h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {results.criticalImprovements.map((improvement, i) => (
                              <li key={i}>• {improvement}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {results?.cvOptimizationMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4"
                        >
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {results.cvOptimizationMessage}
                          </p>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-gradient-to-r from-[#c9a84c]/20 to-[#d4b85f]/20 border border-[#c9a84c]/50 rounded-lg p-6 text-center"
                      >
                        <p className="text-white font-semibold mb-4">
                          ¿Quieres optimizar tu CV Elite?
                        </p>
                        <a
                          href="https://wa.me/595992954169?text=¿Quieres un CV Elite? Optimízalo con un asesor por WhatsApp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full"
                        >
                          <Button className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-bold text-lg py-6 hover:shadow-lg hover:shadow-[#c9a84c]/40">
                            Contactar Asesor por WhatsApp
                          </Button>
                        </a>
                      </motion.div>
                    </>
                  ) : (
                    <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Error en el análisis
                      </h4>
                      <p className="text-sm text-gray-300 mt-2">
                        {results?.error}
                      </p>
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col gap-3"
                  >
                    <Button
                      variant="outline"
                      onClick={() => {
                        setHasAnalyzed(false);
                        setFile(null);
                        setFileName('');
                      }}
                      className="w-full border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10"
                    >
                      Analizar Otro CV
                    </Button>
                  </motion.div>
                </motion.div>
              </>
            )}
          </div>
        </ShineBorder>
      </div>
    </section>
  );
};

export default CVAnalyzer;
