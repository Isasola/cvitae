'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

export default function Privacy() {
  const [, setLocation] = useLocation();

  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-20 px-4">
      <Helmet>
        <title>Política de Privacidad | CVitae</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <button
          onClick={() => setLocation('/')}
          className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline"
        >
          ← Volver al inicio
        </button>

        <h1 className="text-4xl font-bold text-white mb-12 bg-gradient-to-r from-[#c9a84c] to-[#e8d4a0] bg-clip-text text-transparent inline-block">
          Política de Privacidad
        </h1>

        <div className="space-y-12 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Datos que recopilamos</h2>
            <p>
              En CVitae, recopilamos información personal mínima necesaria para brindar nuestros servicios. Esto incluye su dirección de correo electrónico cuando se suscribe a nuestro boletín y los datos contenidos en los archivos de currículum (CV) que usted decide cargar para su análisis.
            </p>
            <p className="mt-2">
              <strong>Protección de menores:</strong> CVitae no está dirigido a menores de 13 años y no recopila conscientemente información de menores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Procesamiento con IA</h2>
            <p>
              Los CVs cargados en nuestra plataforma son procesados utilizando la tecnología de Anthropic Claude API. Este procesamiento se realiza de forma temporal para generar el diagnóstico solicitado. CVitae no almacena permanentemente el contenido de su CV en nuestros servidores después de completar el análisis. Para más información sobre cómo Anthropic maneja los datos, puede visitar su{' '}
              <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">
                Política de Privacidad
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Cookies y Publicidad</h2>
            <p>
              Utilizamos Google AdSense para mostrar anuncios en nuestro sitio. Google utiliza cookies para mostrar anuncios basados en las visitas anteriores de un usuario a nuestro sitio web u otros sitios web. Los usuarios pueden inhabilitar la publicidad personalizada visitando{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">
                Configuración de anuncios de Google
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Almacenamiento y Seguridad</h2>
            <p>
              Las direcciones de correo electrónico de nuestro boletín se almacenan de forma segura en Supabase. Los tokens de acceso para reclutadores tienen una expiración automática para garantizar la seguridad de las cuentas. Implementamos medidas técnicas para proteger sus datos contra el acceso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos a través de:
              <br />
              <strong>Email:</strong> cpdparaguay@gmail.com
            </p>
          </section>
        </div>

        <div className="mt-20 pt-8 border-t border-[#c9a84c]/10 text-sm text-gray-500 text-center">
          Última actualización: 30 de marzo de 2026
        </div>
      </motion.div>
    </div>
  );
}
