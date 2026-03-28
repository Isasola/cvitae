import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Check, Zap, TrendingUp, Users, MessageCircle, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function CVOptimization() {
  const [, setLocation] = useLocation();

  const handleWhatsApp = (message: string) => {
    window.open(`${WA_BASE}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => setLocation("/")}
            className="text-slate-400 hover:text-blue-400 transition text-sm mb-3 flex items-center gap-1"
          >
            ← Volver al inicio
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Optimiza tu CV para Conseguir el Trabajo</h1>
          <p className="text-slate-400">De invisible a irresistible en 48 horas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Problem */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">¿Tu CV es invisible?</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Zap className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Los filtros ATS rechazan el 75% de CVs</p>
                  <p className="text-sm text-slate-400">Sin palabras clave correctas, nunca llega a un reclutador</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Formato incorrecto = rechazo automático</p>
                  <p className="text-sm text-slate-400">Los sistemas ATS no leen PDFs mal estructurados</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Compites contra 500+ candidatos por puesto</p>
                  <p className="text-sm text-slate-400">Tu CV debe brillar en los primeros 6 segundos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Solution */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-600/50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Nosotros lo solucionamos</h2>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Optimización ATS 100%</p>
                  <p className="text-sm text-slate-300">Tu CV pasará todos los filtros automáticos</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Palabras clave estratégicas</p>
                  <p className="text-sm text-slate-300">Incluimos términos que buscan los reclutadores</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Formato probado</p>
                  <p className="text-sm text-slate-300">Estructura que garantiza legibilidad en cualquier sistema</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Entrega en 48 horas</p>
                  <p className="text-sm text-slate-300">Tu CV optimizado listo para aplicar</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() =>
                handleWhatsApp(
                  "Hola! Quiero optimizar mi CV para pasar filtros ATS. ¿Cuál es el proceso?"
                )
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
            >
              Solicitar Optimización <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Before/After */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Antes vs Después</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <Card className="bg-red-900/20 border-red-600/50 p-8">
              <h3 className="text-xl font-bold text-red-400 mb-6">❌ CV Rechazado por ATS</h3>
              <div className="space-y-3 text-sm text-slate-300 font-mono">
                <p>Experiencia: Trabajé en varios proyectos</p>
                <p>Habilidades: Microsoft Office, Internet</p>
                <p>Educación: Carrera completada</p>
                <p>Logros: Buen desempeño en el trabajo</p>
              </div>
              <div className="mt-6 p-4 bg-red-900/50 rounded text-red-300 text-sm">
                ⚠️ Resultado: Rechazado automáticamente por falta de palabras clave
              </div>
            </Card>

            {/* After */}
            <Card className="bg-green-900/20 border-green-600/50 p-8">
              <h3 className="text-xl font-bold text-green-400 mb-6">✓ CV Optimizado para ATS</h3>
              <div className="space-y-3 text-sm text-slate-300 font-mono">
                <p>Experiencia: Lideré proyectos de transformación digital</p>
                <p>Habilidades: Python, SQL, Tableau, Power BI, Agile</p>
                <p>Educación: Ingeniero en Sistemas (Universidad X)</p>
                <p>Logros: +30% mejora en eficiencia operativa</p>
              </div>
              <div className="mt-6 p-4 bg-green-900/50 rounded text-green-300 text-sm">
                ✓ Resultado: Aprobado por ATS, llamada en 48 horas
              </div>
            </Card>
          </div>
        </div>

        {/* Pricing & Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Paquetes de Optimización</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic */}
            <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-blue-500/50 transition">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Básico</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">₲50.000</p>
              <p className="text-slate-400 text-sm mb-6">~$8 USD</p>
              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Optimización ATS básica
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Palabras clave para tu puesto
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Formato mejorado
                </li>
              </ul>
              <Button
                onClick={() =>
                  handleWhatsApp("Quiero el paquete Básico de optimización de CV")
                }
                className="w-full bg-slate-700 hover:bg-slate-600 text-white"
              >
                Solicitar
              </Button>
            </Card>

            {/* Professional */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-600/50 p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Profesional</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">₲100.000</p>
              <p className="text-slate-400 text-sm mb-6">~$16 USD</p>
              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Optimización ATS avanzada
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Análisis de compatibilidad
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Carta de presentación
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Revisión de LinkedIn
                </li>
              </ul>
              <Button
                onClick={() =>
                  handleWhatsApp("Quiero el paquete Profesional de optimización de CV")
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Solicitar
              </Button>
            </Card>

            {/* Premium */}
            <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Premium</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">₲150.000</p>
              <p className="text-slate-400 text-sm mb-6">~$24 USD</p>
              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Todo del Profesional +
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Estrategia de búsqueda
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Coaching 1-on-1 (30 min)
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Seguimiento 30 días
                </li>
              </ul>
              <Button
                onClick={() =>
                  handleWhatsApp("Quiero el paquete Premium de optimización de CV")
                }
                className="w-full bg-slate-700 hover:bg-slate-600 text-white"
              >
                Solicitar
              </Button>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Ingeniera de Software",
                text: "Mi CV fue rechazado 50 veces. Después de la optimización, recibí 3 ofertas en 2 semanas.",
                country: "Argentina",
              },
              {
                name: "Carlos López",
                role: "Analista de Datos",
                text: "No sabía qué palabras clave faltaban. Ahora paso todos los filtros ATS sin problema.",
                country: "México",
              },
              {
                name: "Ana Silva",
                role: "Project Manager",
                text: "Excelente servicio. Mi CV ahora es 10x mejor. Recomendado 100%.",
                country: "Brasil",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role} • {testimonial.country}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para cambiar tu carrera?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Deja de ser invisible. Consigue el trabajo que mereces.
          </p>
          <Button
            onClick={() =>
              handleWhatsApp(
                "Hola! Quiero optimizar mi CV. ¿Cuál es el primer paso?"
              )
            }
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 text-lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Contactar por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
