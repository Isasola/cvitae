'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}

const column1Testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos M.',
    role: 'Project Manager',
    text: 'Pasé de 0 llamadas a 3 entrevistas en una semana en Asunción.',
  },
  {
    id: '2',
    name: 'Andrea R.',
    role: 'Marketing',
    text: 'El diagnóstico gratuito me abrió los ojos. El Plan Pro Plus valió cada guaraní.',
  },
];

const column2Testimonials: Testimonial[] = [
  {
    id: '3',
    name: 'Juan P.',
    role: 'Dev Senior',
    text: 'La estética dorada del CV digital me ayudó a destacar en una terna internacional.',
  },
  {
    id: '4',
    name: 'Sofía L.',
    role: 'RRHH',
    text: 'Como reclutadora, confirmo que los perfiles de CVitae son de impacto inmediato.',
  },
];

const column3Testimonials: Testimonial[] = [
  {
    id: '5',
    name: 'Ricardo G.',
    role: 'Ventas',
    text: 'Con el Portafolio Web mi marca personal subió de nivel. Recomendado.',
  },
  {
    id: '6',
    name: 'Marta S.',
    role: 'Finanzas',
    text: 'Entrega en 30 min real. Increíble la velocidad y calidad.',
  },
];

interface TestimonialColumnProps {
  testimonials: Testimonial[];
  duration: number;
  delay: number;
}

const TestimonialColumn: React.FC<TestimonialColumnProps> = ({
  testimonials,
  duration,
  delay,
}) => {
  // Duplicate testimonials for infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <motion.div
      className="flex flex-col gap-6"
      animate={{ y: ['0%', '-100%'] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    >
      {duplicatedTestimonials.map((testimonial, index) => (
        <motion.div
          key={`${testimonial.id}-${index}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg border border-[#c9a84c]/20 bg-[#0d0d0f] backdrop-blur-sm hover:border-[#c9a84c]/50 transition-all duration-300 min-h-[200px] flex flex-col justify-between group"
        >
          <p className="text-gray-300 italic leading-relaxed flex-grow">
            "{testimonial.text}"
          </p>
          <div className="pt-4 border-t border-[#c9a84c]/10 mt-4">
            <p className="font-semibold text-[#c9a84c] text-sm group-hover:text-[#e8d4a0] transition-colors">
              {testimonial.name}
            </p>
            <p className="text-xs text-gray-400">{testimonial.role}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const TestimonialsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[500px] overflow-hidden">
      {/* Columna 1 - Lenta (20s) */}
      <TestimonialColumn
        testimonials={column1Testimonials}
        duration={20}
        delay={0}
      />

      {/* Columna 2 - Media (18s) */}
      <TestimonialColumn
        testimonials={column2Testimonials}
        duration={18}
        delay={-5}
      />

      {/* Columna 3 - Rápida (16s) */}
      <TestimonialColumn
        testimonials={column3Testimonials}
        duration={16}
        delay={-10}
      />
    </div>
  );
};

export default TestimonialsGrid;
