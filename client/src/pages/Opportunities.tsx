import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  description: string;
}

const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'Tech Innovators',
    location: 'Asunción, Paraguay',
    salary: '$3,500 - $5,000 USD',
    type: 'Full-time',
    description: 'Buscamos un desarrollador React experimentado para liderar nuestro equipo frontend.',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Digital Solutions',
    location: 'Remoto',
    salary: '$2,500 - $4,000 USD',
    type: 'Full-time',
    description: 'Gestiona el roadmap de productos y lidera la estrategia de desarrollo.',
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Studio',
    location: 'Asunción, Paraguay',
    salary: '$1,800 - $3,000 USD',
    type: 'Full-time',
    description: 'Diseña interfaces modernas y experiencias de usuario excepcionales.',
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Remoto',
    salary: '$3,000 - $5,500 USD',
    type: 'Full-time',
    description: 'Analiza datos complejos y desarrolla modelos predictivos.',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Remoto',
    salary: '$2,800 - $4,500 USD',
    type: 'Full-time',
    description: 'Gestiona infraestructura en la nube y automatiza procesos de deployment.',
  },
  {
    id: '6',
    title: 'Marketing Manager',
    company: 'Brand Agency',
    location: 'Asunción, Paraguay',
    salary: '$2,000 - $3,500 USD',
    type: 'Full-time',
    description: 'Lidera estrategias de marketing digital y gestiona campañas.',
  },
];

export default function Opportunities() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Oportunidades Disponibles
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explora las mejores oportunidades laborales en Paraguay y Latinoamérica
          </p>
        </motion.div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp, index) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-lg border border-[#c9a84c]/20 bg-[#0d0d0f] hover:border-[#c9a84c]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/10"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                  {opp.title}
                </h3>
                <p className="text-[#c9a84c] font-semibold text-sm mt-1">
                  {opp.company}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-[#c9a84c]" />
                  {opp.location}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Briefcase className="w-4 h-4 text-[#c9a84c]" />
                  {opp.type}
                </div>
                {opp.salary && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <DollarSign className="w-4 h-4 text-[#c9a84c]" />
                    {opp.salary}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                {opp.description}
              </p>

              {/* Button */}
              <Button className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-semibold hover:shadow-lg hover:shadow-[#c9a84c]/30 flex items-center justify-center gap-2">
                Ver Detalles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            ¿No encuentras lo que buscas?
          </p>
          <Button className="bg-gradient-to-r from-[#c9a84c] to-[#d4b85f] text-black font-semibold">
            Recibir Alertas de Empleos
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
