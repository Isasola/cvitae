# CVitae - Global Opportunity Hub 🌍

**CVitae** es una plataforma que combina **optimización de CV con inteligencia de reclutamiento** para conectar talento latinoamericano con oportunidades globales. Desde becas de élite hasta empleos en multinacionales, pasando por capital semilla y programas de movilidad laboral.

## 🎯 La Misión

Resolver dos problemas simultáneamente:
1. **Para Candidatos:** El 75% de los CVs son rechazados por algoritmos ATS antes de ser leídos por humanos. Nosotros reestructuramos tu perfil bajo los 12 indicadores que buscan los reclutadores.
2. **Para Reclutadores:** Analizar cientos de CVs manualmente es imposible. Nuestra herramienta te muestra un ranking de compatibilidad en segundos.

## 🚀 Características Principales

### 1. **Global Opportunity Hub** (`/jobs`)
- **350+ Oportunidades** en tiempo real:
  - Becas internacionales (MEXT, Chevening, DAAD, Fulbright)
  - Capital Semilla (Y Combinator, 500 Global, Techstars)
  - Empleos en multinacionales (Mercado Libre, KPMG, Rappi)
  - Cruceros y aerolíneas
  - ONGs e instituciones internacionales
  - Puestos básicos en Paraguay y Latam
  - Vacantes de SICCA (Función Pública Paraguay)

- **Buscador Inteligente:**
  - Filtro por tipo (Becas, Capital, Empleos, Cursos)
  - Filtro por continente
  - Filtro por rubro
  - Búsqueda por palabras clave

- **Motor de Scrapping Automático:**
  - Cron Job diario que actualiza las oportunidades
  - Conectado a APIs de becas, empleos y fondos
  - Costo $0 (Netlify Functions gratuito)

### 2. **Herramienta de Reclutadores** (`/recruiters/lots`)
- Sube hasta 10 CVs
- Obtén un ranking de compatibilidad automático
- Demo gratuita vs. Versión Pro con Token
- Análisis basado en indicadores de competencia

### 3. **Panel Admin** (`/admin`)
- Gestión de pedidos de candidatos
- Generación de Tokens para reclutadores (Starter/Pro)
- Aprobación de servicios y generación de entregables

### 4. **Monetización Triple**
- **Ingresos Directos (WhatsApp):** Venta de optimización de CV (₲50k-120k)
- **Ingresos Pasivos (AdSense):** Tráfico masivo de búsquedas globales
- **Ingresos B2B (Reclutadores):** Tokens de acceso Pro (₲150k-350k/mes)

## 🏗️ Arquitectura Técnica

### Stack
- **Frontend:** React 19 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Express.js (Node.js)
- **Hosting:** Netlify (Frontend + Functions)
- **Database:** Supabase (PostgreSQL)
- **IA:** Gemini Flash (Diagnósticos) + Anthropic (Análisis avanzado)

### Estructura de Carpetas
```
cvitae/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Landing con esencia V1
│   │   │   ├── JobOpportunities.tsx  # Hub de 350+ oportunidades
│   │   │   ├── RecruitersLots.tsx    # Herramienta de reclutadores
│   │   │   └── Admin.tsx             # Panel de gestión
│   │   ├── components/               # shadcn/ui + custom
│   │   └── App.tsx                   # Rutas principales
│   └── index.html                    # SEO masivo (JSON-LD)
├── netlify/
│   └── functions/
│       ├── update-opportunities.ts   # Cron Job diario (scrapping)
│       └── admin.ts                  # Funciones serverless
├── server/
│   └── index.ts                      # Express backend
└── netlify.toml                      # Configuración de despliegue
```

## 📊 Modelo de Negocio

### Ingresos Proyectados (Año 1)
| Fuente | Mes 1-2 | Mes 3-4 | Mes 5-6 | Mes 7-12 |
|--------|---------|---------|---------|----------|
| WhatsApp (CVs) | ₲200k | ₲500k | ₲1.5M | ₲2M-3M |
| AdSense | $50 | $300 | $1k | $2k-5k |
| Reclutadores | ₲0 | ₲100k | ₲300k | ₲500k-1M |
| **Total** | **₲250k** | **₲600k** | **₲1.8M** | **₲2.5M-4M** |

**Total Año 1:** ₲25M-30M (~$4k-5k USD)

## 🔄 Flujo de Conversión

### Para Candidatos
1. Usuario entra a `/jobs` buscando una beca o empleo
2. Ve la sección "¿Por qué tu CV es invisible?" (75% rechazados por ATS)
3. Hace clic en una oportunidad → Ve detalles ricos en contenido (AdSense)
4. Si quiere aplicar → Botón "Optimizar CV para este puesto" → WhatsApp
5. En WhatsApp: Diagnóstico gratuito → Venta de plan (₲50k-120k)

### Para Reclutadores
1. Entran a `/recruiters/lots`
2. Ven demo gratuita (hasta 10 CVs, análisis simulado)
3. Si quieren versión Pro → Ingresan Token de acceso
4. Token desbloqueado por vos en Admin → Acceso a análisis real por IA

## 🌐 SEO y Monetización

### JSON-LD Implementado
- `JobPosting` (Google Jobs)
- `SoftwareApplication` (Herramienta de CV)
- `Service` (Consultoría B2B)

### Palabras Clave Objetivo
- "Scholarships for Latinos"
- "CV Optimization ATS"
- "Remote Jobs Latin America"
- "Becas Paraguay"
- "Trabajo en Latam"

### AdSense Ready
- 350+ páginas de contenido indexable
- Actualización diaria (Cron Job)
- Tráfico esperado: 50k+ usuarios/mes en 6 meses

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

### 3. Variables de Entorno
Crear `.env.local` en la raíz:
```env
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_KEY=tu_key
ADMIN_PASSWORD=tu_contraseña
ANTHROPIC_API_KEY=tu_key
```

### 4. Desplegar en Netlify
```bash
# Conectar repo a Netlify
# Rama: dev/v2
# Build command: pnpm build
# Publish directory: dist/public
```

## 📈 Roadmap (Próximas Mejoras)

### V2.1 (Próximas 2 semanas)
- [ ] Página de detalles completa para cada oportunidad
- [ ] Campo de Token en Reclutadores (UX mejorada)
- [ ] Inyección de 200+ empleos adicionales (500+ total)
- [ ] Integración con LinkedIn API para scrapping de empleos

### V2.2 (Mes 2)
- [ ] Perfiles de usuario livianos (sin login, solo email)
- [ ] Sistema de alertas por email (nuevas oportunidades según perfil)
- [ ] Dashboard de seguimiento de aplicaciones
- [ ] Integración con Google AdSense

### V3 (Mes 3+)
- [ ] Automatización de cobros (Stripe/PayPal)
- [ ] Análisis de IA mejorado (Gemini + LangChain)
- [ ] Integración con Zapier/Make para automatización
- [ ] App móvil (React Native)

## 💡 Por Qué Ganamos

1. **Específico para Latam:** No somos un agregador genérico. Entendemos el mercado paraguayo y latinoamericano.
2. **Asesoría Humana:** No es un bot. Hablamos por WhatsApp y ajustamos según el perfil del usuario.
3. **Modelo Híbrido:** Ingresos directos (WhatsApp) + Pasivos (AdSense) + B2B (Reclutadores).
4. **Escalabilidad:** El motor de scrapping trae datos automáticamente. Costo marginal cercano a cero.
5. **Diferenciación:** Combinamos oportunidades globales + optimización local + asesoría personalizada.

## 📞 Contacto

- **WhatsApp:** +595 9 9295-4169
- **Email:** isasolaeche@gmail.com
- **Sitio:** https://cvitae-pry.netlify.app

---

**CVitae - Haciendo visible tu talento en el mundo.** 🌟
