'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TetrisLoaderProps {
  speed?: 'slow' | 'normal' | 'fast';
  message?: string;
}

const speedMap = {
  slow: 0.8,
  normal: 0.6,
  fast: 0.3,
};

export const TetrisLoader: React.FC<TetrisLoaderProps> = ({
  speed = 'normal',
  message = 'Procesando...',
}) => {
  const duration = speedMap[speed];

  // Tetris blocks configuration - Golden theme
  const blocks = [
    { id: 1, color: '#c9a84c', delay: 0 },
    { id: 2, color: '#d4b85f', delay: 0.1 },
    { id: 3, color: '#b8963f', delay: 0.2 },
    { id: 4, color: '#c9a84c', delay: 0.3 },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Tetris Blocks */}
      <div className="flex gap-2">
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: block.color }}
            animate={{
              y: [0, -20, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration,
              delay: block.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Message */}
      {message && (
        <motion.p
          className="text-gray-400 text-sm font-medium"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{
            duration: duration * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {message}
        </motion.p>
      )}

      {/* Rotating Ring */}
      <motion.div
        className="w-8 h-8 border-2 border-transparent border-t-[#c9a84c] border-r-[#c9a84c] rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default TetrisLoader;
