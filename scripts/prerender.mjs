// scripts/prerender.mjs
// Corre después de vite build. Genera HTML estático para que Google indexe el contenido.
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  SUPABASE_URL o SUPABASE_ANON_KEY no definidas — saltando prerender de blogs')
  process.exit(0)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const distDir = join(process.cwd(), 'dist')
const templateHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

function generateBlogHtml(post, template) {
  const excerpt = (post.cuerpo || '').replace(/[#*`>]/g, '').substring(0, 160)
  const title = post.titulo || 'Blog'
  const slug = post.slug

  const metaTags = `
    <title>${title} | CVitae</title>
    <meta name="description" content="${excerpt}">
    <meta property="og:title" content="${title} | CVitae">
    <meta property="og:description" content="${excerpt}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://cvitae-py.netlify.app/blog/${slug}">
    <link rel="canonical" href="https://cvitae-py.netlify.app/blog/${slug}">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${title}",
      "description": "${excerpt}",
      "datePublished": "${post.created_at || new Date().toISOString()}",
      "publisher": {
        "@type": "Organization",
        "name": "CVitae Paraguay"
      }
    }
    </script>`

  const noScriptContent = `
    <noscript>
      <div style="max-width:800px;margin:80px auto;padding:2rem;font-family:sans-serif">
        <h1>${title}</h1>
        <div>${(post.cuerpo || '').replace(/<[^>]+>/g, ' ').substring(0, 500)}...</div>
        <p><a href="/blog">← Volver al blog</a></p>
      </div>
    </noscript>`

  return template
    .replace('<title>CVitae</title>', metaTags)
    .replace('</body>', noScriptContent + '</body>')
}

async function prerender() {
  console.log('🔍 Consultando Supabase para obtener slugs de blogs...')

  // Usando los nombres correctos de las columnas en tu BD
  const { data: posts, error } = await supabase
    .from('content_hub')
    .select('slug, titulo, cuerpo, created_at')
    .eq('tipo', 'blog')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('⚠️  Error consultando Supabase:', error.message)
    process.exit(0)
  }

  if (!posts || posts.length === 0) {
    console.log('ℹ️  No hay posts publicados para prerender')
    process.exit(0)
  }

  console.log(`✅ ${posts.length} posts encontrados. Generando HTML estático...`)

  const blogDir = join(distDir, 'blog')
  if (!existsSync(blogDir)) mkdirSync(blogDir, { recursive: true })

  for (const post of posts) {
    if (!post.slug) continue
    const postDir = join(blogDir, post.slug)
    if (!existsSync(postDir)) mkdirSync(postDir, { recursive: true })
    const html = generateBlogHtml(post, templateHtml)
    writeFileSync(join(postDir, 'index.html'), html, 'utf-8')
    console.log(`  📄 /blog/${post.slug}/index.html generado`)
  }

  // Rutas estáticas para otras páginas
  const staticRoutes = ['blog', 'about', 'privacy', 'opportunities']
  for (const route of staticRoutes) {
    const routeDir = join(distDir, route)
    if (!existsSync(routeDir)) mkdirSync(routeDir, { recursive: true })
    const routeHtml = join(routeDir, 'index.html')
    if (!existsSync(routeHtml)) {
      writeFileSync(routeHtml, templateHtml, 'utf-8')
      console.log(`  📄 /${route}/index.html generado`)
    }
  }

  console.log('🚀 Prerender completado.')
}

prerender().catch(err => {
  console.error('Error en prerender:', err)
  process.exit(0)
})
