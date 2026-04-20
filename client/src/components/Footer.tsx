import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#c9a84c]/20 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CVitae Paraguay. Todos los derechos reservados.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-[#c9a84c] transition-colors">
              Acerca de
            </Link>
            <a href="mailto:cpdparaguay@gmail.com" className="text-gray-400 hover:text-[#c9a84c] transition-colors">
              Contacto
            </a>
            <Link href="/privacy" className="text-gray-400 hover:text-[#c9a84c] transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
