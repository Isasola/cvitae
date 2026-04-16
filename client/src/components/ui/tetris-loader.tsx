import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const frases = [
  'Encajando oportunidades...',
  'Tu próximo movimiento laboral...',
  'Apilando éxito...',
  'Rotando tu futuro...',
  '¡Casi listo!',
];

const colores = ['#c9a84c', '#d4b85f', '#b39540', '#e5c76b', '#a0842e'];

interface TetrisLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const TetrisLoader: React.FC<TetrisLoaderProps> = ({ size = 'md', text }) => {
  const [fraseIndex, setFraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const bloqueSize = size === 'sm' ? 20 : size === 'md' ? 28 : 36;
  const gridSize = bloqueSize * 4;

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative mb-8" style={{ width: gridSize, height: gridSize }}>
        {/* Bloques cayendo animados */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{
              width: bloqueSize,
              height: bloqueSize,
              backgroundColor: colores[i % colores.length],
              left: `${(i * 1.5) % 4 * bloqueSize}px`,
              boxShadow: '0 0 10px currentColor',
            }}
            initial={{ y: -bloqueSize * 2, opacity: 0 }}
            animate={{
              y: [ -bloqueSize * 2, gridSize + bloqueSize ],
              opacity: [0, 1, 1, 0],
              rotate: [0, 90, 180, 270],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Grid de fondo */}
        <div
          className="absolute inset-0 grid grid-cols-4 gap-px opacity-10"
          style={{ border: '1px solid #c9a84c' }}
        >
          {[...Array(16)].map((_, i) => (
            <div key={i} className="border border-[#c9a84c]" />
          ))}
        </div>
      </div>
      <motion.p
        key={fraseIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="text-[#c9a84c] font-bold text-lg"
      >
        {text || frases[fraseIndex]}
      </motion.p>
    </div>
  );
};
