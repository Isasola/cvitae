'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  duration?: number;
}

export const ShineBorder: React.FC<ShineBorderProps> = ({
  children,
  className = '',
  borderColor = '#c9a84c',
  duration = 8,
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `conic-gradient(from 0deg, ${borderColor}, transparent 50%, ${borderColor})`,
          opacity: 0.3,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <div className="relative z-10 bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-lg p-8 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default ShineBorder;
