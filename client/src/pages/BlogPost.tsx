import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Tag, Share2, Copy, Check, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import NotFound from '@/pages/NotFound';
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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [post, setPost] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('content_hub')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <TetrisLoader size="lg" text="Cargando artículo..." />
      </div>
    );
  }

  if (!post) return <NotFound />;

  const metaDescription = post.cuerpo
    ? post.cuerpo.replace(/[#*`]/g, '').substring(0, 150) + '...'
    : 'Artículo en CVitae Paraguay';

  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-20 px-4 flex flex-col">
      <Helmet>
        <title>{`${post.titulo} | CVitae Blog`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={post.titulo} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imagen_url} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto w-full flex-grow"
      >
        <button
          onClick={() => setLocation('/blog')}
          className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA PRINCIPAL */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] border border-[#c9a84c]/20 rounded-3xl p-8 md:p-10 shadow-2xl">
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c9a84c] px-3 py-1 bg-[#c9a84c]/10 rounded-full border border-[#c9a84c]/20">
                    {post.categoria}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.fecha_vencimiento).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {post.titulo}
                </h1>
              </header>

              {post.imagen_url && (
                <div className="aspect-video overflow-hidden rounded-xl mb-10 border border-white/10">
                  <img src={post.imagen_url} alt={post.titulo} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                  >
                    {post.cuerpo || 'Contenido no disponible'}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#c9a84c]/20 to-transparent border border-[#c9a84c]/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-white text-lg">Optimiza tu CV</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Mejora tu currículum con nuestro analizador gratuito.
              </p>
              <Button
                onClick={() => setLocation('/')}
                className="w-full bg-[#c9a84c] text-black font-bold hover:bg-[#d4b85f]"
              >
                Analizar CV ahora
              </Button>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
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
                <span className="ml-2">{copied ? 'Copiado' : 'Copiar enlace'}</span>
              </Button>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="font-bold text-white">Categoría</h3>
              </div>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                {post.categoria}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
