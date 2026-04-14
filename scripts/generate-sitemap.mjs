#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');
const sitemapPath = path.join(distPath, 'sitemap.xml');

const SITE_URL = 'https://cvitae-py.netlify.app';

// Obtener credenciales de Supabase desde variables de entorno
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ ERROR: Variables de entorno de Supabase no encontradas.');
  console.error('   Asegúrate de tener VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el entorno de build.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Crear carpeta dist si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

console.log('🔍 Consultando contenido desde Supabase...');

// 1. Obtener posts de blog activos
const { data: blogPosts, error: blogError } = await supabase
  .from('content_hub')
  .select('slug, fecha_vencimiento')
  .eq('tipo', 'blog')
  .eq('is_active', true);

if (blogError) {
  console.error('❌ Error al obtener blogs:', blogError.message);
} else {
  console.log(`✅ Blogs obtenidos: ${blogPosts.length}`);
}

// 2. Obtener oportunidades activas
const { data: opportunities, error: oppError } = await supabase
  .from('content_hub')
  .select('slug, fecha_vencimiento')
  .eq('tipo', 'oportunidad')
  .eq('is_active', true);

if (oppError) {
  console.error('❌ Error al obtener oportunidades:', oppError.message);
} else {
  console.log(`✅ Oportunidades obtenidas: ${opportunities.length}`);
}

// Generar XML
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Páginas estáticas
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/opportunities', priority: '0.9', changefreq: 'daily' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/recruiters/interface', priority: '0.7', changefreq: 'weekly' },
];

staticPages.forEach((page) => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${SITE_URL}${page.url}</loc>\n`;
  sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
  sitemap += `    <priority>${page.priority}</priority>\n`;
  sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  sitemap += '  </url>\n';
});

// Blogs
if (blogPosts) {
  blogPosts.forEach((post) => {
    const lastmod = post.fecha_vencimiento
      ? post.fecha_vencimiento.split('T')[0]
      : new Date().toISOString().split('T')[0];
    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += '  </url>\n';
  });
}

// Oportunidades
if (opportunities) {
  opportunities.forEach((opp) => {
    const lastmod = opp.fecha_vencimiento
      ? opp.fecha_vencimiento.split('T')[0]
      : new Date().toISOString().split('T')[0];
    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}/opportunities/${opp.slug}</loc>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.6</priority>\n';
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += '  </url>\n';
  });
}

sitemap += '</urlset>';

fs.writeFileSync(sitemapPath, sitemap);
console.log(`✅ Sitemap generado correctamente en: ${sitemapPath}`);
console.log(`   Total URLs: ${4 + (blogPosts?.length || 0) + (opportunities?.length || 0)}`);
