import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <Helmet>
        <title>Acerca de CVitae | Optimización de CV con IA en Paraguay</title>
        <meta name="description" content="CVitae ayuda a profesionales paraguayos a optimizar su CV para filtros ATS y encontrar oportunidades laborales. Conocé nuestra misión." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setLocation('/')}
          className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Acerca de CVitae</h1>
          
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <p className="text-lg leading-relaxed">
              <span className="text-[#c9a84c] font-bold">CVitae</span> nació con una misión clara: ayudar a los profesionales paraguayos a superar los filtros automáticos (ATS) que descartan el 75% de los currículums antes de que un humano los vea.
            </p>

            <p>
              Somos una plataforma 100% paraguaya que combina <span className="text-white font-semibold">inteligencia artificial</span> con conocimiento del mercado laboral local para ofrecer diagnósticos precisos, recomendaciones personalizadas y acceso a oportunidades reales.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <Shield className="w-10 h-10 text-[#c9a84c] mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">Análisis ATS Real</h3>
                <p className="text-sm text-gray-400">Evaluamos tu CV con los mismos criterios que usan las grandes empresas en Paraguay.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <Zap className="w-10 h-10 text-[#c9a84c] mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">IA Avanzada</h3>
                <p className="text-sm text-gray-400">Usamos modelos de lenguaje de última generación para darte recomendaciones precisas.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                <Users className="w-10 h-10 text-[#c9a84c] mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">Oportunidades Reales</h3>
                <p className="text-sm text-gray-400">Agregamos cientos de vacantes verificadas para que encuentres tu próximo empleo.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8">Nuestro Compromiso</h2>
            <p>
              En CVitae creemos que el talento paraguayo merece ser visto. Por eso ofrecemos un diagnóstico gratuito y herramientas premium a un precio accesible (50.000 Gs), muy por debajo de lo que cuesta una asesoría tradicional de RRHH.
            </p>

            <p>
              Cada día actualizamos nuestra base de datos con nuevas oportunidades laborales, becas y eventos, conectando a los jóvenes profesionales con las empresas que los están buscando.
            </p>

            <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl p-6 mt-8">
              <p className="text-[#c9a84c] font-bold text-center">
                📍 Asunción, Paraguay<br />
                📧 cvitaeparaguay@gmail.com<br />
                📱 +595 992 954 169
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
