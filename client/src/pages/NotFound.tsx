import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-9xl font-bold text-[#c9a84c]">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-8">Página no encontrada</h2>
      <p className="text-gray-400 text-center max-w-md mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Button 
        onClick={() => setLocation('/')}
        className="bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-bold"
      >
        Volver al inicio
      </Button>
    </div>
  );
}
