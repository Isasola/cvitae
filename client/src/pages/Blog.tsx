'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';
import { blogIndex } from '@/data/blog-index';
import { GlowCard } from '@/components/ui/spotlight-card';

export default function Blog() {
  const [, setLocation] = useLocation();

  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-20 px-4">
      <Helmet>
        <title>Blog | CVitae - Consejos de Empleo y Carrera</title>
        <meta name="description" content="Guías, consejos y estrategias para potenciar tu carrera profesional, pasar filtros ATS y conseguir el empleo de tus sueños." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-[#c9a84c] to-[#e8d4a0] bg-clip-text text-transparent inline-block">
            Blog de Carrera
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Estrategias actualizadas para el mercado laboral de Paraguay y el mundo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogIndex.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowCard className="flex flex-col h-full border-white/10 hover:border-[#c9a84c]/50 transition-all cursor-pointer" onClick={() => setLocation(`/blog/${post.slug}`)}>
                <div className="p-6 flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#c9a84c] px-2 py-1 bg-[#c9a84c]/10 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 hover:text-[#c9a84c] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <span className="text-[#c9a84c] text-sm font-semibold flex items-center gap-1">
                    Leer más →
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
