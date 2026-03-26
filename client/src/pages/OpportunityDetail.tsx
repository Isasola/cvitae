import { useLocation, useParams } from "wouter";
import { opportunities } from "@/data/opportunities-massive";
import { ArrowLeft, MapPin, DollarSign, Zap, Heart, ExternalLink, MessageCircle, AlertCircle, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function OpportunityDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const opportunity = opportunities.find(o => o.id === id);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Oportunidad no encontrada</h1>
          <button onClick={() => setLocation("/jobs")} className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mx-auto mt-4">
            <ArrowLeft className="h-4 w-4" />
            Volver a Oportunidades
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-950/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => setLocation("/jobs")} className="flex items-center gap-2 text-slate-400 hover:text-white transition">
            <ArrowLeft className="h-5 w-5" />
            Volver
          </button>
          <h1 className="text-lg font-semibold text-white flex-1 text-center">{opportunity.organization}</h1>
          <div className="w-12"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Detalles */}
          <div className="lg:col-span-2">
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-white mb-2">{opportunity.title}</h1>
              <p className="text-xl text-slate-400">{opportunity.organization}</p>
            </div>

            {/* Información Clave */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
                <p className="text-xs text-slate-500 uppercase mb-1">Ubicación</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <p className="text-white font-semibold text-sm">{opportunity.location}</p>
                </div>
              </div>
              {opportunity.value && (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase mb-1">Salario/Valor</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <p className="text-white font-semibold text-sm">{opportunity.value}</p>
                  </div>
                </div>
              )}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
                <p className="text-xs text-slate-500 uppercase mb-1">Vencimiento</p>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <p className="text-white font-semibold text-sm">{opportunity.deadline}</p>
                </div>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
                <p className="text-xs text-slate-500 uppercase mb-1">Tipo</p>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-400" />
                  <p className="text-white font-semibold text-sm">{opportunity.type.replace(/_/g, " ")}</p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <Card className="bg-slate-800/40 border-slate-700/50 p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Descripción</h2>
              <div className="text-slate-300 space-y-3">
                <p>{opportunity.description || "Descripción disponible en el sitio oficial de la oportunidad."}</p>
                {opportunity.requirements && (
                  <>
                    <h3 className="font-semibold text-white mt-4">Requisitos:</h3>
                    <p>{opportunity.requirements}</p>
                  </>
                )}
              </div>
            </Card>

            {/* Tags */}
            {opportunity.tags && opportunity.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Palabras clave</h3>
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-800/40 border border-slate-700/50 text-slate-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ATS Warning */}
            <Card className="bg-blue-600/10 border-blue-500/30 p-6 mb-8">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-400 mb-1">Consejo para pasar filtros ATS</h3>
                  <p className="text-sm text-slate-300">El 75% de los CVs son rechazados automáticamente. Asegúrate de incluir palabras clave del aviso en tu CV antes de postular.</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* BOTÓN PRINCIPAL: APLICAR */}
              <Card className="bg-gradient-to-br from-green-600/20 to-green-500/10 border-green-500/50 p-6">
                <h3 className="font-bold text-white mb-4">Aplicar Ahora</h3>
                <a
                  href={opportunity.application_url || `${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero aplicar a: ${opportunity.title}. ¿Me pueden ayudar?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-semibold transition"
                >
                  <ExternalLink className="h-4 w-4" />
                  {opportunity.application_url ? "Ir al sitio" : "Contactar"}
                </a>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  {opportunity.application_url ? "Te llevará al sitio oficial de postulación" : "Nos contactaremos para ayudarte"}
                </p>
              </Card>

              {/* CONVERSIÓN PASIVA: CV Optimization */}
              <Card className="bg-slate-800/40 border-slate-700/50 p-6">
                <h3 className="font-bold text-white mb-3">Optimiza tu CV</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Aumenta tu probabilidad de pasar filtros ATS con nuestro servicio de optimización.
                </p>
                <a
                  href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Quiero optimizar mi CV para la posición: ${opportunity.title}. ¿Cuál es el precio?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar Precio
                </a>
              </Card>

              {/* CONVERSIÓN PASIVA: Recruiter Tool */}
              <Card className="bg-slate-800/40 border-slate-700/50 p-6">
                <h3 className="font-bold text-white mb-3">¿Eres Reclutador?</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Accede a nuestra herramienta de ranking de candidatos.
                </p>
                <button
                  onClick={() => setLocation("/recruiters/lots")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition text-sm"
                >
                  Probar Demo
                </button>
              </Card>

              {/* Información Adicional */}
              <Card className="bg-slate-800/40 border-slate-700/50 p-4">
                <p className="text-xs text-slate-400">
                  <strong>Continente:</strong> {opportunity.continent}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  <strong>Rubro:</strong> {opportunity.rubro || "General"}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
