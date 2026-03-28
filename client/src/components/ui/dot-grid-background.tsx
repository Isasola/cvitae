'use client';

import React from 'react';

interface DotGridBackgroundProps {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
  dotOpacity?: number;
}

export const DotGridBackground: React.FC<DotGridBackgroundProps> = ({
  children,
  className = '',
  dotColor = '#c9a84c',
  dotOpacity = 0.1,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Background Grid - Non-interactive */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: dotOpacity,
        }}
      />

      {/* Content Wrapper - Interactive */}
      <div className="relative z-10 pointer-events-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default DotGridBackground;
