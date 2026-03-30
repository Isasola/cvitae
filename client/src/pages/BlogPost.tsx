'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import { blogIndex } from '@/data/blog-index';
import NotFound from '@/pages/NotFound';
import Newsletter from '@/components/Newsletter';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const meta = blogIndex.find(p => p.slug === slug);

  useEffect(() => {
    if (!meta) {
      setLoading(false);
      return;
    }

    const loadMarkdown = async () => {
      try {
        // Vite dynamic import for markdown files as raw strings
        const modules = import.meta.glob('../data/blog-posts/*.md', { query: '?raw', import: 'default' });
        const path = `../data/blog-posts/${slug}.md`;
        
        if (modules[path]) {
          const rawContent = await modules[path]() as string;
          // Remove frontmatter if present
          const cleanContent = rawContent.replace(/^---[\s\S]*?---/, '');
          // marked v17 is synchronous
          setContent(marked.parse(cleanContent) as string);
        } else {
          console.error('Post not found in modules');
        }
      } catch (err) {
        console.error('Error loading markdown:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [slug, meta]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!meta) return <NotFound />;

  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-20 px-4">
      <Helmet>
        <title>{meta.title} | Blog CVitae</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(', ')} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={meta.date} />
        <meta property="article:section" content={meta.category} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": meta.title,
          "description": meta.description,
          "datePublished": meta.date,
          "author": { "@type": "Organization", "name": "CVitae" },
          "publisher": { "@type": "Organization", "name": "CVitae" }
        })}</script>
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
              {meta.category}
            </span>
            <span className="text-sm text-gray-500">{meta.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {meta.title}
          </h1>
        </header>

        <div 
          className="prose prose-invert prose-[#c9a84c] max-w-none text-gray-300 mb-20"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-20 pt-12 border-t border-[#c9a84c]/10">
          <Newsletter source="blog" title="¿Te gustó este artículo?" />
        </div>
      </motion.article>
    </div>
  );
}
