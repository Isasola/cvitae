'use client';

import React from 'react';
import { useLocation } from 'wouter';

const WA_NUMBER = '595992954169';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

export default function Footer() {
  const [, setLocation] = useLocation();
  
  return (
    <footer className="py-20 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', letterSpacing: '-0.02em', color: '#c9a84c' }}>
              <span style={{ fontWeight: 900 }}>CV</span>
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>itae</span>
            </span>
            <p className="text-gray-500 mt-6 max-w-sm leading-relaxed">
              Empoderando el talento paraguayo con tecnología de punta. No solo buscamos empleo, construimos carreras de elite.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Plataforma</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><button onClick={() => { setLocation('/'); window.scrollTo(0, 0); }} className="hover:text-[#c9a84c] transition-colors">Analizador IA</button></li>
              <li><button onClick={() => setLocation('/opportunities')} className="hover:text-[#c9a84c] transition-colors">Ver Oportunidades</button></li>
              <li><button onClick={() => setLocation('/blog')} className="hover:text-[#c9a84c] transition-colors">Blog & Consejos</button></li>
              <li><button onClick={() => setLocation('/recruiters/interface')} className="hover:text-[#c9a84c] transition-colors">CVitae Business</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contacto</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href={WA_BASE} target="_blank" rel="noreferrer" className="hover:text-[#c9a84c] transition-colors">Soporte WhatsApp</a></li>
              <li><a href="mailto:hola@cvitae.py" className="hover:text-[#c9a84c] transition-colors">hola@cvitae.py</a></li>
              <li>Asunción, Paraguay</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] md:text-xs text-gray-600">
          <p>© {new Date().getFullYear()} CVitae Paraguay. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button onClick={() => setLocation('/privacy')} className="hover:text-gray-400">Privacidad</button>
            <button onClick={() => setLocation('/privacy')} className="hover:text-gray-400">Términos</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
