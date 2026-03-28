'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { Button } from './button';
import { ShineBorder } from './shine-border';

interface AnalysisResult {
  visibility: number;
  keywords: number;
  formatting: number;
  impact: number;
}

export const CVAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResults({
        visibility: 35,
        keywords: 42,
        formatting: 78,
        impact: 28,
      });
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 2000);
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
          reclutadores. Análisis en tiempo real, sin compromisos.
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
                    Carga tu CV
                  </h3>
                  <p className="text-gray-400 mb-4">
                    PDF, Word o LinkedIn profile URL
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="inline-block cursor-pointer"
                  >
                    <Button className="bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-semibold">
                      Seleccionar Archivo
                    </Button>
                  </label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex gap-4"
                >
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-semibold hover:shadow-lg hover:shadow-[#c9a84c]/30 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Análisis Gratis
                      </>
                    )}
                  </Button>
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
                  <h3 className="text-2xl font-bold text-white text-center">
                    Resultados del Análisis
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: 'Visibilidad',
                        score: results?.visibility || 0,
                        icon: AlertCircle,
                      },
                      {
                        label: 'Keywords',
                        score: results?.keywords || 0,
                        icon: AlertCircle,
                      },
                      {
                        label: 'Formato',
                        score: results?.formatting || 0,
                        icon: CheckCircle,
                      },
                      {
                        label: 'Impacto',
                        score: results?.impact || 0,
                        icon: AlertCircle,
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

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 space-y-2"
                  >
                    <h4 className="font-semibold text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Hallazgos Críticos
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>
                        • Tu perfil carece de indicadores de competencia del sector
                      </li>
                      <li>
                        • Los filtros de selección no están reconociendo tu experiencia
                      </li>
                      <li>• Necesitas optimizar la estructura de tu resumen</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col gap-3"
                  >
                    <p className="text-center text-gray-400 text-sm">
                      Obtén el plan completo de optimización
                    </p>
                    <Button className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-slate-900 font-semibold">
                      Ver Plan Pro Plus
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setHasAnalyzed(false)}
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
