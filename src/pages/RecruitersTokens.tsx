import { useState } from "react";
import { useLocation } from "wouter";
import { TokenSystem } from "@/components/TokenSystem";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Unlock, Users, Zap } from "lucide-react";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function RecruitersTokens() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Reclutadores</h1>
          <p className="text-slate-400">Acceso a CVs optimizados y análisis de compatibilidad ATS</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <Users className="h-8 w-8 text-blue-400 mb-3" />
            <p className="text-slate-400 text-sm mb-2">CVs Disponibles</p>
            <p className="text-3xl font-bold text-white">500+</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <Zap className="h-8 w-8 text-yellow-400 mb-3" />
            <p className="text-slate-400 text-sm mb-2">Compatibilidad ATS</p>
            <p className="text-3xl font-bold text-white">95%+</p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <Lock className="h-8 w-8 text-green-400 mb-3" />
            <p className="text-slate-400 text-sm mb-2">Datos Verificados</p>
            <p className="text-3xl font-bold text-white">100%</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Token System */}
          <div className="lg:col-span-2">
            <TokenSystem />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Características Pro</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <Unlock className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Acceso a 500+ CVs
                </li>
                <li className="flex gap-2">
                  <Unlock className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Ranking por compatibilidad
                </li>
                <li className="flex gap-2">
                  <Unlock className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Análisis ATS detallado
                </li>
                <li className="flex gap-2">
                  <Unlock className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Filtros avanzados
                </li>
                <li className="flex gap-2">
                  <Unlock className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  Export en múltiples formatos
                </li>
                <li className="flex gap-2">
                  <Unlock className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  API access
                </li>
              </ul>
            </Card>

            {/* Pricing */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-600/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Plan Pro</h3>
              <p className="text-3xl font-bold text-blue-400 mb-2">$50</p>
              <p className="text-sm text-slate-300 mb-4">/mes</p>
              <p className="text-sm text-slate-400 mb-4">
                Acceso completo a todas las características
              </p>
              <Button
                onClick={() =>
                  handleWhatsApp(
                    "Hola! Quiero acceso Pro al panel de reclutadores. ¿Cómo funciona?"
                  )
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Solicitar Acceso <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Support */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">¿Necesitas ayuda?</h3>
              <p className="text-sm text-slate-400 mb-4">
                Nuestro equipo está disponible para asistirte
              </p>
              <Button
                onClick={() =>
                  handleWhatsApp("Hola! Tengo una pregunta sobre el panel de reclutadores")
                }
                className="w-full bg-slate-700 hover:bg-slate-600 text-white"
              >
                Contactar Soporte
              </Button>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Genera tu Token",
                desc: "Crea un token único para acceder al panel",
              },
              {
                step: 2,
                title: "Ingresa el Token",
                desc: "Valida tu acceso Pro en el sistema",
              },
              {
                step: 3,
                title: "Accede a CVs",
                desc: "Explora 500+ CVs optimizados para ATS",
              },
              {
                step: 4,
                title: "Analiza y Contrata",
                desc: "Filtra, rankea y contacta candidatos",
              },
            ].map((item, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "¿Cuánto cuesta el acceso Pro?",
                a: "$50 USD/mes. Acceso ilimitado a todos los CVs y características.",
              },
              {
                q: "¿Cómo funciona el token?",
                a: "El token es tu clave de acceso. Genéralo, guárdalo y úsalo para validar tu acceso Pro.",
              },
              {
                q: "¿Puedo exportar los CVs?",
                a: "Sí, con acceso Pro puedes exportar en PDF, Word, Excel y JSON.",
              },
              {
                q: "¿Hay soporte técnico?",
                a: "Sí, nuestro equipo está disponible por WhatsApp para ayudarte.",
              },
            ].map((item, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 p-6">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-slate-400 text-sm">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
