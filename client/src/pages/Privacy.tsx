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
        <meta name="description" content="Política de privacidad de CVitae. Información sobre cómo gestionamos tus datos y el uso de cookies." />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setLocation('/')} className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline text-sm">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8 md:p-12 text-gray-300">
          <h1 className="text-3xl font-bold text-white mb-6">Política de Privacidad</h1>
          
          <p className="mb-4">En CVitae, respetamos tu privacidad. Los currículums analizados se procesan de forma temporal y no se almacenan permanentemente en nuestros servidores. Los datos de contacto solo se utilizan para enviarte los informes solicitados y no se comparten con terceros sin tu consentimiento expreso.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">Uso de Cookies y Google AdSense</h2>
          <p className="mb-4">
            Utilizamos Google AdSense para mostrar anuncios en nuestro sitio web. Google, como proveedor de terceros, utiliza cookies para publicar anuncios basados en las visitas anteriores de los usuarios a este sitio web o a otros sitios. El uso de cookies de publicidad permite a Google y a sus socios publicar anuncios basados en las visitas de los usuarios a este sitio y/u otros sitios de Internet.
          </p>
          <p className="mb-4">
            Los usuarios pueden desactivar la publicidad personalizada accediendo a la <a href="https://www.google.com/settings/ads" className="text-[#c9a84c] hover:underline" target="_blank" rel="noopener noreferrer">Configuración de anuncios de Google</a>. Alternativamente, pueden visitar <a href="https://www.aboutads.info" className="text-[#c9a84c] hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a> para desactivar el uso de cookies de publicidad de terceros.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">Google Analytics</h2>
          <p className="mb-4">
            Utilizamos Google Analytics para analizar el tráfico de nuestro sitio web. Google Analytics recopila información anónima como el número de visitantes, las páginas visitadas y el tiempo de permanencia. Esta información nos ayuda a mejorar el sitio.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">Contacto</h2>
          <p>
            Para cualquier consulta sobre esta política de privacidad, puedes escribirnos a <a href="mailto:cpdparaguay@gmail.com" className="text-[#c9a84c] hover:underline">cpdparaguay@gmail.com</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
