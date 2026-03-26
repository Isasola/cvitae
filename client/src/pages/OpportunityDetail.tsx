import { useParams, useLocation } from "wouter";
import { opportunities } from "@/data/opportunities-massive";
import { ArrowLeft, MapPin, DollarSign, Zap, Heart, ExternalLink, MessageCircle, AlertCircle } from "lucide-react";

const WA_NUMBER = "595992954169";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function OpportunityDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const opportunity = opportunities.find(o => o.id === id);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Oportunidad no encontrada</h1>
          <button
            onClick={() => setLocation("/jobs")}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mx-auto mt-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Oportunidades
          </button>
        </div>
      </div>
    );
  }

  const getApplicationLink = () => {
    // Aquí irían los links reales de postulación según la oportunidad
    // Por ahora, retornamos un placeholder
    return `mailto:aplicaciones@${opportunity.organization.toLowerCase().replace(/\s/g, "")}.com`;
  };

  const getAtsWarning = () => {
    const warnings = [
      "El 75% de las aplicaciones son rechazadas por filtros ATS",
      "Los reclutadores dedican 6 segundos a revisar tu CV",
      "Tu CV necesita los 12 indicadores clave para esta posición",
      "El formato es crucial para pasar los filtros automáticos"
    ];
    return warnings[Math.floor(Math.random() * warnings.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/jobs")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver
          </button>
          <h1 className="text-lg font-semibold text-white flex-1 text-center">{opportunity.organization}</h1>
          <div className="w-12"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Detalles */}
          <div className="lg:col-span-2">
            {/* Título y Organización */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">{opportunity.title}</h1>
              <p className="text-xl text-slate-400">{opportunity.organization}</p>
            </div>

            {/* Información Clave */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-slate-500 uppercase mb-1">Ubicación</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <p className="text-white font-semibold text-sm">{opportunity.location}</p>
                </div>
              </div>
              {opportunity.value && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <p className="text-xs text-slate-500 uppercase mb-1">Salario/Valor</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <p className="text-white font-semibold text-sm">{opportunity.value}</p>
                  </div>
                </div>
              )}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-slate-500 uppercase mb-1">Vencimiento</p>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <p className="text-white font-semibold text-sm">{opportunity.deadline}</p>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="text-xs text-slate-500 uppercase mb-1">Compatibilidad</p>
                <p className="text-white font-semibold text-sm text-blue-400">{opportunity.compatibility}%</p>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Descripción</h2>
              <p className="text-slate-300 leading-relaxed">{opportunity.description}</p>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                {opportunity.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Pasiva - ATS Warning */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-8">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-100 mb-2">Consejo Importante</h3>
                  <p className="text-amber-50/80 text-sm mb-4">{getAtsWarning()}</p>
                  <a
                    href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Voy a aplicar a "${opportunity.title}" en ${opportunity.organization}. ¿Mi CV está optimizado para esta posición?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Verificar mi CV
                  </a>
                </div>
              </div>
            </div>

            {/* Botón Principal de Postulación */}
            <a
              href={getApplicationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold text-lg transition mb-4"
            >
              <ExternalLink className="h-5 w-5" />
              Postular Ahora
            </a>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Card de Compatibilidad */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6 sticky top-24">
              <h3 className="font-semibold text-white mb-4">Tu Compatibilidad</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Perfil Match</span>
                  <span className="text-lg font-bold text-blue-400">{opportunity.compatibility}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition"
                    style={{ width: `${opportunity.compatibility}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                {opportunity.compatibility >= 85
                  ? "Excelente match. Tu perfil es muy compatible."
                  : opportunity.compatibility >= 70
                  ? "Buen match. Tienes buenas posibilidades."
                  : "Requiere preparación. Optimiza tu CV para mejorar."}
              </p>
              <a
                href={`${WA_BASE}?text=${encodeURIComponent(`Hola! Necesito mejorar mi perfil para aplicar a "${opportunity.title}". ¿Cuál es el costo de la optimización?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition"
              >
                <MessageCircle className="h-4 w-4" />
                Mejorar Perfil
              </a>
            </div>

            {/* Card de Información */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-4">Información</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Tipo</p>
                  <p className="text-white capitalize">{opportunity.type.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Continente</p>
                  <p className="text-white">{opportunity.continent}</p>
                </div>
                {opportunity.rubro && (
                  <div>
                    <p className="text-slate-500 mb-1">Rubro</p>
                    <p className="text-white">{opportunity.rubro}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
