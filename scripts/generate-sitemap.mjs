#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const opportunitiesPath = path.join(projectRoot, 'client/src/data/opportunities.json');
const blogIndexPath = path.join(projectRoot, 'client/src/data/blog-index.json');
const distPath = path.join(projectRoot, 'dist/public');
const sitemapPath = path.join(distPath, 'sitemap.xml');

const SITE_URL = 'https://cvitae-py.netlify.app';

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

let opportunities = [];
try {
  const data = fs.readFileSync(opportunitiesPath, 'utf-8');
  const parsed = JSON.parse(data);
  opportunities = parsed.opportunities || [];
  
  // Fix 3: Deduplicación y filtrado de 'None'
  const seenIds = new Set();
  opportunities = opportunities.filter(opp => {
    if (!opp.id || opp.id.includes('None') || seenIds.has(opp.id)) {
      return false;
    }
    seenIds.add(opp.id);
    return true;
  });
  
  console.log('✅ Loaded and filtered ' + opportunities.length + ' unique opportunities');
} catch (error) {
  console.error('❌ Error reading opportunities.json:', error.message);
}

let blogPosts = [];
try {
  const data = fs.readFileSync(blogIndexPath, 'utf-8');
  blogPosts = JSON.parse(data);
  console.log('✅ Loaded ' + blogPosts.length + ' blog posts');
} catch (error) {
  console.error('❌ Error reading blog-index.json:', error.message);
}

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/opportunities', priority: '0.9', changefreq: 'daily' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { url: '/recruiters/interface', priority: '0.7', changefreq: 'weekly' },
];

staticPages.forEach((page) => {
  sitemap += '  <url>\n';
  sitemap += '    <loc>' + SITE_URL + page.url + '</loc>\n';
  sitemap += '    <changefreq>' + page.changefreq + '</changefreq>\n';
  sitemap += '    <priority>' + page.priority + '</priority>\n';
  sitemap += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
  sitemap += '  </url>\n';
});

blogPosts.forEach((post) => {
  sitemap += '  <url>\n';
  sitemap += '    <loc>' + SITE_URL + '/blog/' + post.slug + '</loc>\n';
  sitemap += '    <changefreq>monthly</changefreq>\n';
  sitemap += '    <priority>0.7</priority>\n';
  sitemap += '    <lastmod>' + post.date + '</lastmod>\n';
  sitemap += '  </url>\n';
});

opportunities.forEach((opp) => {
  sitemap += '  <url>\n';
  sitemap += '    <loc>' + SITE_URL + '/opportunities/' + opp.id + '</loc>\n';
  sitemap += '    <changefreq>weekly</changefreq>\n';
  sitemap += '    <priority>0.6</priority>\n';
  if (opp.deadline && opp.deadline !== 'N/A') {
    try {
        sitemap += '    <lastmod>' + opp.deadline.split('T')[0] + '</lastmod>\n';
    } catch(e) {}
  }
  sitemap += '  </url>\n';
});

sitemap += '</urlset>';

fs.writeFileSync(sitemapPath, sitemap);
console.log('✅ sitemap.xml generated: ' + sitemapPath);
