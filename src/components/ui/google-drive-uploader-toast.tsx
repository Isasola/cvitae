import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';

interface GoogleDriveUploaderToastProps {
  isVisible?: boolean;
  isAnalyzing?: boolean;
}

export default function GoogleDriveUploaderToast({ isVisible = true, isAnalyzing = false }: GoogleDriveUploaderToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 z-50">
      {isAnalyzing ? (
        <>
          <div className="animate-spin">
            <Upload className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="font-semibold text-sm">Analizando CV...</p>
            <p className="text-xs text-gray-600">Por favor espera</p>
          </div>
        </>
      ) : (
        <>
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-semibold text-sm">¡Análisis completado!</p>
            <p className="text-xs text-gray-600">Revisa los resultados arriba</p>
          </div>
        </>
      )}
    </div>
  );
}
