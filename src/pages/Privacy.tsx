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
          <p>En CVitae respetamos tu privacidad. Los CVs analizados se procesan de forma temporal y no se almacenan permanentemente en nuestros servidores. Los datos de contacto solo se utilizan para enviarte los informes solicitados.</p>
          <p className="mt-4">Para cualquier consulta, escribinos a cpdparaguay@gmail.com.</p>
        </motion.div>
      </div>
    </div>
  );
}
