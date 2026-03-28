import React from 'react';
import { X } from 'lucide-react';

interface BannerProps {
  title?: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  children?: React.ReactNode;
}

export function Banner({ 
  title = "Anuncio importante", 
  description = "Estamos trabajando para expandir masivamente nuestra base de datos.",
  type = 'info',
  onClose,
  children
}: BannerProps) {
  const bgColor = {
    info: 'bg-blue-500/10 border-blue-500/20',
    success: 'bg-green-500/10 border-green-500/20',
    warning: 'bg-yellow-500/10 border-yellow-500/20',
    error: 'bg-red-500/10 border-red-500/20',
  }[type];

  const textColor = {
    info: 'text-blue-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
  }[type];

  return (
    <div className={`${bgColor} border rounded-lg p-4 flex items-start justify-between gap-4`}>
      <div className="flex-1">
        {title && <h3 className={`font-semibold ${textColor} mb-1`}>{title}</h3>}
        {description && <p className="text-sm text-gray-400">{description}</p>}
        {children}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
