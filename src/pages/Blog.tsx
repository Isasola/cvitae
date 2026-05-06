import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Tag, Sparkles, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TetrisLoader } from '@/components/ui/tetris-loader';
import Footer from '@/components/Footer';

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
  is_active: boolean;
}

export default function Blog() {
  const [, setLocation] = useLocation();
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 flex items-center justify-center">
        <TetrisLoader size="lg" text="Cargando artículos..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 flex flex-col">
      <Helmet>
        <title>Blog | CVitae Paraguay</title>
        <meta name="description" content="Consejos, noticias y oportunidades para jóvenes en Paraguay." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 w-full flex-grow">
        <button
          onClick={() => setLocation('/')}
          className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA PRINCIPAL (LISTADO DE POSTS) */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog CVitae</h1>
              <p className="text-gray-400 max-w-2xl">
                Impulsamos el talento joven paraguayo con información de alto impacto.
              </p>
            </motion.div>

            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">No hay artículos publicados en este momento.</p>
              </div>
            ) : (
              posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0d0d0f] border border-[#c9a84c]/20 rounded-2xl overflow-hidden hover:border-[#c9a84c]/40 transition-all cursor-pointer group"
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
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-xs font-bold text-[#c9a84c] uppercase tracking-wider bg-[#c9a84c]/10 px-3 py-1 rounded-full">
                        {post.categoria}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.fecha_vencimiento).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#c9a84c] transition-colors">
                      {post.titulo}
                    </h2>
                    <div className="text-gray-400 text-sm line-clamp-3 mb-6">
                      <ReactMarkdown>{post.cuerpo}</ReactMarkdown>
                    </div>
                    <div className="flex items-center text-[#c9a84c] font-semibold text-sm">
                      Leer más <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* COLUMNA DERECHA (WIDGETS) */}
          <div className="space-y-6">
            {/* Widget: Optimiza tu CV */}
            <div className="bg-gradient-to-br from-[#c9a84c]/20 to-transparent border border-[#c9a84c]/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-white text-lg">Optimiza tu CV</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Descubre cómo mejorar tu currículum con nuestro analizador de IA gratuito.
              </p>
              <Button
                onClick={() => setLocation('/')}
                className="w-full bg-[#c9a84c] text-black font-bold hover:bg-[#d4b85f]"
              >
                Analizar mi CV ahora
              </Button>
            </div>

            {/* Widget: Compartir blog */}
            <div className="bg-[#0d0d0f] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-white">Compartir</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="w-full border-white/20 text-gray-300 hover:text-white"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="ml-2">{copied ? 'Enlace copiado' : 'Copiar enlace del blog'}</span>
              </Button>
            </div>

            {/* Widget: Categorías (placeholder, puedes hacerlo dinámico después) */}
            <div className="bg-[#0d0d0f] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-white">Categorías</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(posts.map(p => p.categoria))).map(cat => (
                  <span key={cat} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
