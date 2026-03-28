import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description?: string;
}

interface OpportunitiesAutoSliderProps {
  opportunities?: Opportunity[];
  autoScroll?: boolean;
  interval?: number;
}

export function OpportunitiesAutoSlider({ 
  opportunities = [], 
  autoScroll = true,
  interval = 5000 
}: OpportunitiesAutoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoScroll || opportunities.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % opportunities.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoScroll, interval, opportunities.length]);

  if (opportunities.length === 0) {
    return <div className="text-center text-gray-400">No hay oportunidades disponibles</div>;
  }

  const current = opportunities[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + opportunities.length) % opportunities.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % opportunities.length);
  };

  return (
    <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700">
      <div className="flex items-center justify-between">
        <button 
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700 rounded-lg transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex-1 mx-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{current.title}</h3>
          <p className="text-lg text-blue-400 mb-1">{current.company}</p>
          <p className="text-sm text-gray-400 mb-4">{current.location}</p>
          {current.salary && <p className="text-lg font-semibold text-green-400">{current.salary}</p>}
          {current.description && <p className="text-sm text-gray-300 mt-4">{current.description}</p>}
        </div>

        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700 rounded-lg transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {opportunities.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition ${
              idx === currentIndex ? 'bg-blue-500' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
