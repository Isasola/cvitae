import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating?: number;
}

interface TestimonialsColumnsProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Juan García",
    role: "Desarrollador Full Stack",
    text: "CVitae me ayudó a conseguir mi primer trabajo remoto. La optimización del CV fue clave.",
    rating: 5,
  },
  {
    name: "María López",
    role: "Product Manager",
    text: "Excelente plataforma para encontrar oportunidades en Latinoamérica. Muy recomendado.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Data Scientist",
    text: "Las oportunidades son reales y bien filtradas. Conseguí 3 entrevistas en una semana.",
    rating: 5,
  },
];

export default function TestimonialsColumns({ testimonials = defaultTestimonials }: TestimonialsColumnsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, idx) => (
        <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-300 mb-4 text-sm">{testimonial.text}</p>
          <div>
            <p className="font-semibold text-white">{testimonial.name}</p>
            <p className="text-xs text-gray-400">{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
