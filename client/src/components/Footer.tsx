'use client';

import React from 'react';
import { useLocation } from 'wouter';

const WA_NUMBER = '595992954169';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="border-t border-[#c9a84c]/10 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-[#c9a84c] font-bold mb-4">CVitae</h4>
            <p className="text-gray-400 text-sm">
              Estrategia de Perfil Elite para profesionales que buscan impacto.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => setLocation('/')} className="hover:text-[#c9a84c] transition-colors">
                  Planes
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a84c] transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a84c] transition-colors">
                  Testimonios
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c9a84c] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:cpdparaguay@gmail.com" className="hover:text-[#c9a84c] transition-colors">
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cvitae.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c9a84c] transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => setLocation('/privacy')} className="hover:text-[#c9a84c] transition-colors">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-[#c9a84c] transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61580756714500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c9a84c] transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ==================== ADSENSE PLACEHOLDER - FOOTER ==================== */}
        <div id="adsense-footer" className="py-8 mb-8 flex items-center justify-center min-h-[100px] bg-slate-900/30 rounded-lg border border-[#c9a84c]/10">
          {/* AdSense slot will be injected here */}
        </div>

        <div className="border-t border-[#c9a84c]/10 pt-8">
          <div className="text-center text-gray-500 text-sm mb-6">
            <p>© 2026 CVitae. Todos los derechos reservados.</p>
          </div>
          <div className="text-center text-gray-600 text-xs max-w-3xl mx-auto">
            <p>
              CVitae es un agregador de oportunidades. No garantizamos la vigencia de ofertas externas ni intervenimos en procesos de selección de terceros.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
