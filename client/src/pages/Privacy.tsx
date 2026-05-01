import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <Helmet>
        <title>Política de Privacidad | CVitae Paraguay</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setLocation('/')} className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline text-sm">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8 md:p-12 text-gray-300">
          <h1 className="text-3xl font-bold text-white mb-6">Política de Privacidad</h1>
          
          <p className="mb-4">En CVitae respetamos tu privacidad. Los CVs analizados se procesan de forma temporal y no se almacenan permanentemente en nuestros servidores. Los datos de contacto solo se utilizan para enviarte los informes solicitados.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">Uso de Cookies y Google AdSense</h2>
          <p className="mb-4">
            Utilizamos Google AdSense para mostrar anuncios en nuestro sitio web. Google, como proveedor de terceros, utiliza cookies para publicar anuncios basados en las visitas anteriores de los usuarios a este sitio web o a otros sitios.
          </p>
          <p className="mb-4">
            Los usuarios pueden desactivar la publicidad personalizada accediendo a la <a href="https://www.google.com/settings/ads" className="text-[#c9a84c] hover:underline" target="_blank" rel="noopener noreferrer">Configuración de anuncios de Google</a>.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">Contacto</h2>
          <p>
            Para cualquier consulta sobre esta política de privacidad, puedes escribirnos a <a href="mailto:cvitaeparaguay@gmail.com" className="text-[#c9a84c] hover:underline">cvitaeparaguay@gmail.com</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
