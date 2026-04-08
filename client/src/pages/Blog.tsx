import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';

interface ContentItem {
  id: string;
  titulo: string;
  slug: string;
  cuerpo: string;
  categoria: string;
  imagen_url: string;
  fecha_vencimiento: string;
  tipo: 'blog' | 'oportunidad';
  ubicacion: string;
}

export default function Blog() {
  const [, setLocation] = useLocation();
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('content_hub')
          .select('*')
          .eq('is_active', true)
          .eq('tipo', 'blog')
          .gte('fecha_vencimiento', new Date().toISOString())
          .order('fecha_vencimiento', { ascending: true });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <Helmet>
        <title>Blog | CVitae Paraguay</title>
        <meta name="description" content="Consejos, noticias y oportunidades para jóvenes en Paraguay." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog CVitae</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Impulsamos el talento joven paraguayo con información de alto impacto.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0d0d0f] border border-[#c9a84c]/10 rounded-xl overflow-hidden hover:border-[#c9a84c]/30 transition-all group cursor-pointer"
              onClick={() => setLocation(`/blog/${post.slug}`)}
            >
              {post.imagen_url && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.imagen_url} 
                    alt={post.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-wider bg-[#c9a84c]/10 px-2 py-1 rounded mb-4 inline-block">
                  {post.categoria}
                </span>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#c9a84c] transition-colors">
                  {post.titulo}
                </h2>
                <div className="text-gray-400 text-sm line-clamp-3 mb-4">
                  <ReactMarkdown>{post.cuerpo}</ReactMarkdown>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.ubicacion}</span>
                  <span>Vence: {new Date(post.fecha_vencimiento).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No hay artículos publicados en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
