# CVitae · Perfiles Profesionales de Alto Impacto

**Versión:** 2.1 | **Estado:** Producción | **Última actualización:** Marzo 2026

---

## Resumen Ejecutivo

CVitae es una plataforma SaaS que reestructura perfiles profesionales usando metodología avanzada de reclutamiento. Transformamos CVs invisibles para filtros ATS en perfiles de alto impacto que generan entrevistas en 30 minutos.

**Dirigido a:**
- Candidatos en Paraguay y Latam que buscan mejorar su visibilidad profesional
- Reclutadores y empresas que necesitan perfiles pre-optimizados y rankeados
- Freelancers y creativos que quieren posicionarse como expertos

**Diferencial:**
- Protocolo de Misterio: Vendemos el resultado, no el proceso
- Indicadores de Competencia: Extrae automáticamente keywords del aviso y los integra en el perfil
- Ranking B2B: Reclutadores reciben candidatos pre-filtrados con score de compatibilidad
- Búsqueda de Oportunidades: Candidatos encuentran trabajos compatibles con su perfil

---

## Stack Técnico

| Componente | Tecnología | Versión |
|---|---|---|
| **Frontend** | React 19 + TypeScript | 19.2.1 |
| **Bundler** | Vite | 7.1.7 |
| **Estilos** | Tailwind CSS 4 + shadcn/ui | 4.1.14 |
| **Tipografía** | Playfair Display + Outfit | Google Fonts |
| **Enrutamiento** | Wouter | 3.3.5 |
| **Iconos** | Lucide React | 0.453.0 |
| **Animaciones** | Framer Motion | 12.23.22 |
| **Notificaciones** | Sonner | 2.0.7 |
| **Backend** | Express.js (placeholder) | 4.21.2 |
| **Hosting** | Netlify (Static) | - |

---

## Estructura del Proyecto

```
cvitae/
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── manifest.json
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx                 # Landing page principal
│   │   │   ├── RecruitersLots.tsx       # Herramienta B2B para reclutadores
│   │   │   ├── JobOpportunities.tsx     # Búsqueda de trabajos para candidatos
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Map.tsx                  # Google Maps integration
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── App.tsx                      # Router principal
│   │   ├── main.tsx                     # React entry point
│   │   └── index.css                    # Diseño tokens + Tailwind
│   ├── index.html
│   └── tsconfig.json
├── server/
│   └── index.ts                         # Express server (placeholder)
├── shared/
│   └── const.ts                         # Constantes compartidas
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md                            # Este archivo
```

---

## Características Principales

### 1. Landing Page (Home.tsx)
- **Hero Section:** Propuesta de valor con mockup de CV animado
- **Estadísticas:** 6 segundos, 75% descartados, ₲50k, 30 minutos
- **Optimizador Interactivo:** Diagnóstico gratuito en 3 pasos
- **Sección "Cómo Funciona":** 4 pasos del proceso
- **Antes/Después:** Casos reales con transformación visual
- **Precios:** Dos planes para candidatos (Perfil Digital, Portafolio Web)
- **B2B Reclutadores:** Tres planes (Starter, Pro, Enterprise)
- **FAQ:** Preguntas frecuentes expandibles
- **CTA Final:** Botón flotante de WhatsApp

### 2. Herramienta de Reclutadores (/recruiters/lots)
- **Paso 1:** Indicar puesto y descripción del aviso
- **Paso 2:** Subir múltiples CVs en PDF
- **Paso 3:** Ranking automático con:
  - Score de compatibilidad (0-100)
  - Porcentaje de match con el aviso
  - Fortalezas detectadas
  - Áreas de mejora
  - Botones para agendar entrevista

### 3. Búsqueda de Oportunidades (/jobs)
- **Subir Perfil:** Candidatos cargan su CV optimizado
- **Búsqueda y Filtros:** Por compatibilidad, tipo de contrato, ubicación
- **Listado de Trabajos:** Con score de compatibilidad individual
- **Guardar Favoritos:** Sistema de likes
- **Aplicar Directamente:** Integración con ofertas
- **Estadísticas:** Oportunidades compatibles, compatibilidad promedio

---

## Paleta de Diseño

| Elemento | Color | Código | Uso |
|---|---|---|---|
| **Gold (Primario)** | Dorado | `#c9a84c` | Acentos, botones principales, bordes destacados |
| **Teal (Secundario)** | Verde azulado | `#0d5c63` | Backgrounds alternos, texto secundario |
| **Rust (Destructivo)** | Óxido | `#c24b2a` | Alertas, errores, acciones destructivas |
| **Ink (Sidebar)** | Negro profundo | `#0a0a0f` | Backgrounds oscuros, texto en modo oscuro |
| **Paper (Background)** | Crema clara | `#f5f0e8` | Background principal, tarjetas |
| **Cream (Cards)** | Crema media | `#ede8d8` | Tarjetas, backgrounds alternos |
| **Muted (Texto)** | Gris tostado | `#7a7060` | Texto secundario, labels |

**Tipografía:**
- **Playfair Display** (serif): Títulos, headings (h1-h6)
- **Outfit** (sans-serif): Body, labels, botones

---

## Guía de Instalación y Desarrollo

### Requisitos Previos
- Node.js 18+
- pnpm 10.4.1+
- Git

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/cvitae.git
cd cvitae

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Acceder a http://localhost:3000
```

### Compilar para Producción

```bash
# Build
pnpm build

# Preview (local)
pnpm preview

# Deploy a Netlify (ver sección siguiente)
```

---

## Despliegue en Netlify

### Opción 1: Conectar GitHub (Recomendado)

1. **Crear repositorio en GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CVitae v2.1"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/cvitae.git
   git push -u origin main
   ```

2. **Conectar a Netlify**
   - Ir a [netlify.com](https://netlify.com)
   - Hacer clic en "New site from Git"
   - Seleccionar GitHub y autorizar
   - Elegir el repositorio `cvitae`
   - Configurar:
     - **Build command:** `pnpm build`
     - **Publish directory:** `dist`
     - **Node version:** 18.x o superior

3. **Variables de Entorno (si aplica)**
   - En Netlify: Settings → Environment
   - Agregar variables necesarias (ver `.env.example`)

4. **Deploy Automático**
   - Cada push a `main` dispara un nuevo deploy
   - Los cambios estarán en vivo en ~2 minutos

### Opción 2: Deploy Manual

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Loguear
netlify login

# Deploy
netlify deploy --prod
```

---

## Configuración de Dominio Personalizado

1. **Comprar dominio** (Namecheap, GoDaddy, etc.)
2. **En Netlify:**
   - Settings → Domain management
   - Agregar dominio personalizado
   - Seguir instrucciones de DNS
3. **SSL/HTTPS:** Automático con Netlify

---

## Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# API
VITE_API_URL=https://tu-api.com
VITE_API_KEY=tu-api-key

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=tu-website-id

# OAuth (si aplica)
VITE_OAUTH_PORTAL_URL=https://oauth.example.com
```

---

## Rutas Disponibles

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | Home.tsx | Landing page principal |
| `/recruiters/lots` | RecruitersLots.tsx | Herramienta B2B para rankear candidatos |
| `/jobs` | JobOpportunities.tsx | Búsqueda de oportunidades para candidatos |
| `/404` | NotFound.tsx | Página no encontrada |

---

## API Integration (Futuro)

### Endpoints Esperados

```
POST /api/cv/generate
  - Input: CV data, job description, format
  - Output: Optimized CV HTML

POST /api/cv/analyze
  - Input: CV PDF, job description
  - Output: Score, compatibility, gaps

POST /api/jobs/search
  - Input: Profile data, filters
  - Output: Compatible job listings

POST /api/recruiters/rank
  - Input: Job description, candidate PDFs
  - Output: Ranked candidates with scores
```

---

## Personalización

### Cambiar Colores

Editar `/client/src/index.css`:

```css
:root {
  --primary: #c9a84c;        /* Gold */
  --secondary: #0d5c63;      /* Teal */
  --destructive: #c24b2a;    /* Rust */
  /* ... más colores */
}
```

### Cambiar Tipografía

Editar `/client/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=TU-FONT:wght@400;700&display=swap" rel="stylesheet" />
```

Luego actualizar `/client/src/index.css`:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Tu Font', serif;
}
```

### Agregar Nueva Página

1. Crear componente en `/client/src/pages/MiPagina.tsx`
2. Importar en `/client/src/App.tsx`
3. Agregar ruta en el Router:
   ```tsx
   <Route path="/mi-pagina" component={MiPagina} />
   ```

---

## Performance y Optimización

- **Code Splitting:** Vite automáticamente divide el código por ruta
- **Image Optimization:** Usar CDN para imágenes (no guardar en `/public`)
- **Lazy Loading:** Componentes se cargan bajo demanda
- **Caching:** Netlify cachea automáticamente assets estáticos
- **Lighthouse Score:** Objetivo 90+ en todas las métricas

---

## Seguridad

- **HTTPS:** Obligatorio en Netlify
- **Headers de Seguridad:** Configurados automáticamente
- **CORS:** Restringido a dominios autorizados
- **Sanitización:** Inputs validados con Zod
- **Secretos:** Nunca commitear `.env` a Git

---

## Monitoreo y Analytics

- **Google Analytics 4:** Integrado en el HTML
- **Netlify Analytics:** Dashboard incluido
- **Error Tracking:** Sentry (opcional)
- **Performance:** Web Vitals monitoreados

---

## Roadmap v2.2+

- [ ] Integración con LangChain para embeddings
- [ ] Base de datos de trabajos en tiempo real
- [ ] Sistema de notificaciones por email
- [ ] Perfil de usuario con historial
- [ ] Integración con LinkedIn API
- [ ] Generación de carta de presentación automática
- [ ] Preguntas de entrevista personalizadas por IA
- [ ] Panel de reclutadores con CRM integrado
- [ ] Reportes de compatibilidad en PDF
- [ ] Soporte multiidioma (EN, PT, IT)

---

## Troubleshooting

### El servidor no inicia
```bash
# Limpiar cache y reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Build falla
```bash
# Verificar TypeScript
pnpm check

# Limpiar build
rm -rf dist
pnpm build
```

### Estilos no se aplican
- Verificar que `index.css` esté importado en `main.tsx`
- Limpiar cache del navegador (Ctrl+Shift+R)
- Reiniciar servidor de desarrollo

---

## Contribuir

1. Fork el repositorio
2. Crear rama: `git checkout -b feature/mi-feature`
3. Commit cambios: `git commit -m "Add: mi feature"`
4. Push: `git push origin feature/mi-feature`
5. Abrir Pull Request

---

## Licencia

MIT License - Ver `LICENSE` para detalles

---

## Contacto y Soporte

- **WhatsApp:** +595 992 954 169
- **Email:** isasolaeche@gmail.com
- **Website:** https://cvitae.netlify.app

---

## Changelog

### v2.1 (Marzo 2026)
- ✅ Migración a React 19 + Vite
- ✅ Nuevo diseño premium (dorado/negro/teal)
- ✅ Herramienta de reclutadores con ranking
- ✅ Sistema de búsqueda de oportunidades
- ✅ Optimizador interactivo mejorado
- ✅ Casos reales antes/después

### v2.0 (Febrero 2026)
- ✅ Landing page completa
- ✅ Generador de CVs
- ✅ Integración de pago
- ✅ Waitlist NEXO

### v1.0 (Enero 2026)
- ✅ MVP inicial
- ✅ Prototipo de concepto

---

**Hecho con ❤️ en Paraguay | © 2026 CVitae**
