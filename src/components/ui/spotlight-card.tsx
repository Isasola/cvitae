import React from 'react';

interface GlowCardProps {
  glowColor?: string;
  customSize?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function GlowCard({ 
  glowColor = 'blue', 
  customSize = false,
  className = '',
  children 
}: GlowCardProps) {
  const glowColorMap: Record<string, string> = {
    blue: 'from-blue-500/20 to-blue-600/20',
    orange: 'from-amber-500/20 to-amber-600/20',
    purple: 'from-purple-500/20 to-purple-600/20',
    green: 'from-green-500/20 to-green-600/20',
  };

  const glowClass = glowColorMap[glowColor] || glowColorMap.blue;

  return (
    <div className={`relative overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-br ${glowClass} backdrop-blur-sm ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
