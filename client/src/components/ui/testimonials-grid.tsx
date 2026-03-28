'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María García',
    role: 'Ingeniera de Software',
    company: 'TechCorp',
    text: 'CVitae transformó mi perfil completamente. Pasé de 0 a 15 entrevistas en 2 semanas.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Carlos López',
    role: 'Product Manager',
    company: 'StartupXYZ',
    text: 'La metodología de CVitae es increíble. Finalmente entiendo qué buscaban los reclutadores.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    role: 'Diseñadora UX',
    company: 'DesignStudio',
    text: 'En 30 días conseguí el trabajo de mis sueños. CVitae es la herramienta que todos necesitamos.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Juan Rodríguez',
    role: 'DevOps Engineer',
    company: 'CloudSystems',
    text: 'Increíble ROI. El diagnóstico gratuito ya valió la pena. Luego compré el plan completo.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'Sofia Mendez',
    role: 'Data Scientist',
    company: 'AI Solutions',
    text: 'CVitae me enseñó a hablar el lenguaje de los ATS. Ahora mis CVs pasan todos los filtros.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    name: 'Lucas Silva',
    role: 'Full Stack Developer',
    company: 'WebAgency',
    text: 'La mejor inversión en mi carrera. Pasé de desempleado a recibir 3 ofertas simultáneamente.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  },
  {
    id: '7',
    name: 'Valentina Torres',
    role: 'Marketing Manager',
    company: 'BrandCo',
    text: 'CVitae no es solo un CV. Es una estrategia completa de posicionamiento profesional.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '8',
    name: 'Diego Fernández',
    role: 'Arquitecto de Software',
    company: 'TechLeaders',
    text: 'Finalmente entiendo por qué mis CVs anteriores no funcionaban. CVitae cambió todo.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: '9',
    name: 'Lucia Gómez',
    role: 'QA Engineer',
    company: 'SoftTest',
    text: 'El kit de entrevista de CVitae fue fundamental para conseguir mi trabajo actual.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
];

const TestimonialColumn = ({ items, duration, delay }: { items: Testimonial[]; duration: number; delay: number }) => (
  <motion.div
    className="flex flex-col gap-4"
    animate={{ y: ['0%', '-100%'] }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'linear',
      delay,
    }}
  >
    {[...items, ...items].map((testimonial, index) => (
      <motion.div
        key={`${testimonial.id}-${index}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-lg border border-[#c9a84c]/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm hover:border-[#c9a84c]/50 transition-all duration-300 min-h-[280px] flex flex-col justify-between"
      >
        <p className="text-gray-300 mb-4 flex-grow italic">"{testimonial.text}"</p>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-white text-sm">{testimonial.name}</p>
            <p className="text-xs text-gray-400">
              {testimonial.role} · {testimonial.company}
            </p>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export const TestimonialsGrid: React.FC = () => {
  const col1 = testimonials.slice(0, 3);
  const col2 = testimonials.slice(3, 6);
  const col3 = testimonials.slice(6, 9);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[600px] overflow-hidden">
      <TestimonialColumn items={col1} duration={20} delay={0} />
      <TestimonialColumn items={col2} duration={22} delay={-5} />
      <TestimonialColumn items={col3} duration={24} delay={-10} />
    </div>
  );
};

export default TestimonialsGrid;
