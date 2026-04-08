import React from 'react';
import { useLocation } from 'wouter';

export default function Footer() {
  const [, setLocation] = useLocation();
  
  return (
    <footer className="py-12 border-t border-[#c9a84c]/10 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem',
              letterSpacing: '-0.02em',
              color: '#c9a84c',
            }}>
              <span style={{ fontWeight: 900 }}>CV</span>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>itae</span>
            </span>
            <p className="mt-4 text-gray-400 max-w-sm">
              Estrategia de Perfil Elite para Paraguay y Latinoamérica. 
              Optimizamos tu carrera con IA y conexiones reales.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => setLocation('/opportunities')} className="hover:text-[#c9a84c]">Oportunidades</button></li>
              <li><button onClick={() => setLocation('/blog')} className="hover:text-[#c9a84c]">Blog</button></li>
              <li><button onClick={() => setLocation('/')} className="hover:text-[#c9a84c]">Analizador de CV</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => setLocation('/privacy')} className="hover:text-[#c9a84c]">Privacidad</button></li>
              <li><button className="hover:text-[#c9a84c]">Términos</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} CVitae Paraguay. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
