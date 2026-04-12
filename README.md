# CVitae v4 - Automatización Total y Reingeniería 🚀

CVitae es la plataforma líder en Paraguay y Latam para la optimización de perfiles profesionales, conectando a candidatos con empleos, becas y capital semilla mediante inteligencia artificial de última generación.

## 🌟 Novedades de la V4 (Reingeniería de Backend)

### 1. Motor de Oportunidades 100% Automatizado
- **Integración Triple API**: El sistema ahora realiza fetching real de vacantes desde:
  - **Adzuna**: Vacantes globales y tecnológicas.
  - **FindWork**: Empleos remotos de alta calidad.
  - **SerpApi (Google Jobs)**: Captación de vacantes locales específicas en Paraguay.
- **Ciclo de Actualización de 24hs**: Un **GitHub Action** (`daily-jobs.yml`) dispara el motor de actualización cada medianoche, sincronizando los datos con Supabase y actualizando el archivo estático `opportunities.json` para máxima velocidad de carga.

### 2. Sistema de Contenido Dinámico (Blog & Hub)
- **Supabase como Fuente de Verdad**: El blog y las oportunidades se sirven directamente desde la tabla `content_hub` de Supabase, permitiendo actualizaciones en tiempo real sin necesidad de nuevos deploys.
- **Admin Panel Mejorado**: Gestión centralizada de artículos y vacantes con soporte para Markdown y metadatos extendidos.

### 3. Seguridad y Blindaje de Backend
- **Admin Shielding**: La validación de la contraseña maestra se ha movido completamente al lado del servidor mediante una **Netlify Function** (`admin-auth.ts`). El frontend ya no conoce ni maneja la contraseña sensible.
- **Refactor de Handlers**: Todas las funciones serverless inicializan el cliente de Supabase dentro del handler, garantizando la lectura correcta de variables de entorno (`VITE_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) en entornos de producción.

### 4. SEO y Performance 100/100
- **Build Robusto**: Configuración de `netlify.toml` optimizada para asegurar que los scripts de generación de Sitemap y Robots no bloqueen el deploy por advertencias menores.
- **Carga Ultrarrápida**: Mantenimiento del stack ligero para asegurar puntuaciones perfectas en Core Web Vitals.

## 🛠️ Stack Tecnológico
- **Frontend**: React + TypeScript + Vite + TailwindCSS + Framer Motion
- **Backend**: Netlify Functions (Node.js) + GitHub Actions (CI/CD)
- **Base de Datos**: Supabase (PostgreSQL)
- **IA**: Anthropic API (Claude 4.5)
- **APIs de Empleo**: Adzuna, FindWork, SerpApi
- **Routing**: Wouter
- **SEO**: React Helmet Async + marked (Markdown)

## 📦 Comandos
- `pnpm install`: Instalar dependencias.
- `pnpm dev`: Iniciar servidor de desarrollo.
- `pnpm build`: Generar build de producción y scripts de SEO.

---
© 2026 CVitae. Todos los derechos reservados.
Desarrollado para el mercado de Paraguay y Latinoamérica.
