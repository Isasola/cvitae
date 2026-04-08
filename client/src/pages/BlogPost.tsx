'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import NotFound from '@/pages/NotFound';
import Newsletter from '@/components/Newsletter.tsx';

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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [post, setPost] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

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
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) return <NotFound />;

  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-20 px-4">
      <Helmet>
        <title>{post.titulo} | Blog CVitae</title>
        <meta name="description" content={post.titulo} />
        <meta property="og:title" content={post.titulo} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imagen_url} />
      </Helmet>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <button
          onClick={() => setLocation('/blog')}
          className="text-[#c9a84c] mb-8 flex items-center gap-2 hover:underline text-sm"
        >
          ← Volver al blog
        </button>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9a84c] px-2 py-1 bg-[#c9a84c]/10 rounded">
              {post.categoria}
            </span>
            <span className="text-sm text-gray-500">
              Vence: {new Date(post.fecha_vencimiento).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.titulo}
          </h1>
          {post.imagen_url && (
            <div className="aspect-video overflow-hidden rounded-xl mb-12">
              <img src={post.imagen_url} alt={post.titulo} className="w-full h-full object-cover" />
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-[#c9a84c] max-w-none text-gray-300 mb-20">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{post.cuerpo}</ReactMarkdown>
        </div>

        <div className="mt-20 pt-12 border-t border-[#c9a84c]/10">
          <Newsletter source="blog" title="¿Te gustó este artículo?" />
        </div>
      </motion.article>
    </div>
  );
}
