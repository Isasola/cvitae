# CVitae - Global Opportunity Hub v2.1

**CVitae** es una plataforma que combina **optimización de CV con inteligencia de reclutamiento** para conectar talento latinoamericano con oportunidades globales. Desde becas de élite hasta empleos en multinacionales, pasando por capital semilla y programas de movilidad laboral.

## 🎯 La Misión

Resolver dos problemas simultáneamente:
1. **Para Candidatos:** El 75% de los CVs son rechazados por algoritmos ATS antes de ser leídos por humanos. Nosotros reestructuramos tu perfil bajo los 12 indicadores que buscan los reclutadores.
2. **Para Reclutadores:** Analizar cientos de CVs manualmente es imposible. Nuestra herramienta te muestra un ranking de compatibilidad en segundos usando Anthropic API.

## 🚀 Características Principales (v2.1)

### 1. **Global Opportunity Hub** (`/jobs`)
- **539 Oportunidades REALES** actualizadas diariamente:
  - Becas internacionales (DAAD, Fulbright, Chevening, OEA, Fundación Carolina)
  - Capital Semilla (Y Combinator, 500 Startups, Techstars, Startup Chile, NXTP)
  - Empleos remotos (RemoteOK, The Muse, Arbeitnow, WeWorkRemotely)
  - Empleos locales Latam (Bumeran, Computrabajo, GetOnBoard)
  - Oportunidades de contribución open-source (GitHub Issues)
  - Voluntariados y ONGs
  - Puestos en 6 continentes

- **Buscador Inteligente:**
  - Filtro por tipo (Becas, Capital, Empleos, Voluntariados, etc.)
  - Filtro por continente
  - Filtro por país específico
  - Filtro por rubro
  - Búsqueda por palabras clave
  - Paginación optimizada

- **Motor de Scrapping Automático:**
  - Scraper en Python con 90+ fuentes
  - Actualización cada 12 horas
  - Verificación de URLs reales
  - Deduplicación automática
  - Costo $0 (Netlify Functions gratuito)

### 2. **Herramienta de Reclutadores** (`/recruiters/tokens`)
- **Upload de CVs:** Sube múltiples CVs en PDF/Word
- **Análisis con Anthropic API:** Análisis profundo de cada CV
- **Ranking Automático:** Top 5 CVs por compatibilidad
- **Comparativa:** Análisis comparativo entre candidatos
- **Sistema de Tokens:** Demo gratuito vs. Pro ($50 USD/mes)
- **API Access:** Integración programática para reclutadores

### 3. **Optimización de CV para Candidatos** (`/cv-optimization`)
- **Análisis Honesto:** Diagnóstico real de tu CV (no endulzado)
- **Score ATS:** Compatibilidad 0-100 con filtros de reclutadores
- **Mejoras Específicas:** Acciones concretas y medibles
- **Plan de Acción:** Pasos claros para mejorar
- **Venta de Solución:** Propuesta de valor de CVitae
- **Integración WhatsApp:** Conversión directa a venta

### 4. **Panel Admin** (`/admin`)
- Gestión de pedidos de candidatos
- Generación de Tokens para reclutadores
- Estadísticas de uso
- Aprobación de servicios

## 🏗️ Arquitectura Técnica

### Stack
- **Frontend:** React 19 + Vite + TypeScript + Tailwind CSS 4 + shadcn/ui
- **Backend:** Netlify Functions (Node.js)
- **Hosting:** Netlify (Frontend + Serverless)
- **IA:** Anthropic Claude 3.5 Sonnet
- **Scraping:** Python + BeautifulSoup + Feedparser
- **APIs:** 90+ fuentes públicas gratuitas

### Estructura de Carpetas
```
cvitae/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx                    # Landing optimizado
│   │   │   ├── JobOpportunities.tsx        # Hub de 539 oportunidades
│   │   │   ├── OpportunityDetail.tsx       # Detalles con SEO
│   │   │   ├── CVOptimization.tsx          # Análisis de CV candidatos
│   │   │   ├── RecruitersTokens.tsx        # Panel de reclutadores
│   │   │   └── Admin.tsx                   # Panel de gestión
│   │   ├── components/
│   │   │   ├── TokenSystem.tsx             # Validación de tokens
│   │   │   └── ...shadcn/ui components
│   │   ├── lib/
│   │   │   └── seo.ts                      # Configuración SEO/JSON-LD
│   │   └── App.tsx                         # Rutas principales
│   ├── data/
│   │   ├── opportunities.json              # 539 oportunidades
│   │   └── opportunities.ts                # TypeScript interface
│   └── index.html                          # SEO masivo
├── netlify/
│   └── functions/
│       ├── scraper_90_fuentes.py           # Motor de scraping
│       ├── analyze-cvs.ts                  # Análisis múltiples CVs (reclutadores)
│       ├── analyze-cv-candidate.ts         # Análisis individual (candidatos)
│       └── ...otras funciones
├── public/
│   ├── sitemap.xml                         # Mapa del sitio
│   └── robots.txt                          # Instrucciones para crawlers
└── netlify.toml                            # Configuración de despliegue
```

## 📊 Modelo de Negocio

### Ingresos Proyectados (Año 1)
| Fuente | Mes 1-2 | Mes 3-4 | Mes 5-6 | Mes 7-12 |
|--------|---------|---------|---------|----------|
| WhatsApp (CVs) | ₲200k | ₲500k | ₲1.5M | ₲2M-3M |
| AdSense | $50-100 | $300-500 | $1k-2k | $2k-5k |
| Reclutadores | ₲0 | ₲100k | ₲300k | ₲500k-1M |
| **Total** | **₲250k** | **₲600k** | **₲1.8M** | **₲2.5M-4M** |

**Total Año 1:** ₲25M-30M (~$4k-5k USD)

## 🔄 Flujo de Conversión

### Para Candidatos
1. Usuario entra a `/jobs` buscando una beca o empleo
2. Ve la sección "El Problema Real" (75% rechazados por ATS)
3. Hace clic en una oportunidad → Ve detalles ricos en contenido (AdSense)
4. Si quiere aplicar → Botón "Optimizar CV para este puesto" → `/cv-optimization`
5. En CV Optimization: Análisis honesto + Propuesta de valor → WhatsApp
6. En WhatsApp: Diagnóstico gratuito → Venta de plan (₲50k-120k)

### Para Reclutadores
1. Entran a `/recruiters/tokens`
2. Ven demo gratuita (análisis básico)
3. Si quieren versión Pro → Ingresan Token de acceso
4. Token desbloqueado por admin → Acceso a análisis real con Anthropic API
5. Suben CVs → Obtienen ranking Top 5 en segundos

## 🌐 SEO y Monetización

### JSON-LD Implementado
- `JobPosting` (Google Jobs)
- `EducationalOccupationalCredential` (Becas)
- `Organization` (CVitae)
- `BreadcrumbList` (Navegación)

### Palabras Clave Objetivo
- "Scholarships for Latinos 2026"
- "CV Optimization ATS"
- "Remote Jobs Latin America"
- "Becas internacionales para latinoamericanos"
- "Empleos Paraguay 2026"
- "Capital semilla para startups"

### AdSense Ready
- 539 páginas de contenido único indexable
- Actualización diaria (Cron Job)
- Tráfico esperado: 50k+ usuarios/mes en 6 meses
- Meta tags dinámicos por página
- Sitemap XML + robots.txt

## 🚀 Cómo Desplegar

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Isasola/cvitae.git
cd cvitae
git checkout dev/v2
```

### 2. Instalar Dependencias
```bash
pnpm install
```

### 3. Variables de Entorno en Netlify
En Netlify Settings → Environment:
```
ANTHROPIC_API_KEY=tu_key_aqui
```

### 4. Desplegar en Netlify
```bash
# Conectar repo a Netlify
# Rama: dev/v2
# Build command: pnpm build
# Publish directory: dist/public
# Functions directory: netlify/functions
```

## 📈 Roadmap (Próximas Mejoras)

### V2.2 (Próximas 2 semanas)
- [ ] Mejorar UI del panel de reclutadores (upload de CVs)
- [ ] Integración completa de Anthropic API
- [ ] Sistema de alertas por email
- [ ] Dashboard de seguimiento de candidaturas

### V2.3 (Mes 2)
- [ ] Perfiles de usuario livianos (sin login, solo email)
- [ ] Integración con Google AdSense
- [ ] API pública para reclutadores
- [ ] Webhooks para automatización

### V3 (Mes 3+)
- [ ] Automatización de cobros (Stripe)
- [ ] App móvil (React Native)
- [ ] Integración con Zapier/Make
- [ ] Análisis predictivo con Machine Learning

## ⚠️ QUÉ FALTA IMPLEMENTAR

### Crítico (Antes de Producción)
- [ ] Validar que Anthropic API funcione correctamente en Netlify Functions
- [ ] Implementar upload real de CVs en panel de reclutadores
- [ ] Crear sistema de pagos (Stripe/PayPal)
- [ ] Validar que no haya errores en build de Netlify
- [ ] Testing de todas las rutas

### Importante (Próximas 2 semanas)
- [ ] Mejorar diseño del panel de reclutadores (UI/UX)
- [ ] Agregar más fuentes de scraping
- [ ] Implementar sistema de alertas
- [ ] Dashboard de estadísticas

### Futuro (Próximo mes)
- [ ] Integración con Google AdSense
- [ ] Sistema de perfiles de usuario
- [ ] API pública para reclutadores
- [ ] Automatización de emails

## 💡 Por Qué Ganamos

1. **Específico para Latam:** No somos un agregador genérico. Entendemos el mercado paraguayo y latinoamericano.
2. **Datos Reales:** 539 oportunidades verificadas, no simuladas.
3. **IA Honesta:** Análisis real con Anthropic, no endulzado.
4. **Modelo Híbrido:** Ingresos directos (WhatsApp) + Pasivos (AdSense) + B2B (Reclutadores).
5. **Escalabilidad:** Motor de scrapping automático. Costo marginal cercano a cero.
6. **Diferenciación:** Combinamos oportunidades globales + optimización local + asesoría personalizada.

## 📞 Contacto

- **WhatsApp:** +595 9 9295-4169
- **Email:** isasolaeche@gmail.com
- **Sitio:** https://cvitae-py.netlify.app

---

**CVitae v2.1 - Haciendo visible tu talento en el mundo.** 🌟

*Última actualización: Marzo 2026*
*Estado: En desarrollo - Listo para testing*
