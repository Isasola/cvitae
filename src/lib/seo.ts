/**
 * CVitae SEO Optimization
 * Meta tags, JSON-LD, y optimización para AdSense
 */

export const SEO_CONFIG = {
  siteName: "CVitae",
  siteUrl: "https://cvitae-py.netlify.app",
  description: "Plataforma global de oportunidades: empleos, becas, fondos y CV optimizados para ATS",
  keywords: [
    "empleos remotos",
    "becas internacionales",
    "oportunidades para latinos",
    "CV optimizado ATS",
    "capital semilla",
    "fondos para startups",
  ],
};

export const generateMetaTags = (page: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}) => {
  return {
    title: `${page.title} | CVitae`,
    description: page.description,
    keywords: page.keywords?.join(", ") || SEO_CONFIG.keywords.join(", "),
    og: {
      title: page.title,
      description: page.description,
      image: page.image || `${SEO_CONFIG.siteUrl}/og-image.png`,
      url: page.url || SEO_CONFIG.siteUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      image: page.image || `${SEO_CONFIG.siteUrl}/og-image.png`,
    },
  };
};

export const generateJsonLd = (type: string, data: any) => {
  const baseUrl = SEO_CONFIG.siteUrl;

  const schemas: { [key: string]: any } = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "CVitae",
      url: baseUrl,
      description: SEO_CONFIG.description,
      sameAs: [
        "https://www.linkedin.com/company/cvitae",
        "https://twitter.com/cvitae",
      ],
    },
    jobPosting: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: data.title,
      description: data.description,
      datePosted: data.datePosted || new Date().toISOString(),
      validThrough: data.validThrough || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: data.organization,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: data.country || "Global",
          addressRegion: data.region || data.location,
        },
      },
      baseSalary: data.salary
        ? {
            "@type": "PriceSpecification",
            priceCurrency: data.currency || "USD",
            price: data.salary,
          }
        : undefined,
      url: data.applicationUrl,
    },
    scholarshipOffer: {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalCredential",
      name: data.title,
      description: data.description,
      educationalLevel: data.level || "Bachelor",
      url: data.applicationUrl,
      provider: {
        "@type": "Organization",
        name: data.organization,
      },
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.items.map((item: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${baseUrl}${item.url}`,
      })),
    },
  };

  return schemas[type] || null;
};

export const PAGE_CONFIG = {
  home: {
    title: "CVitae - Oportunidades Globales para Latinos",
    description:
      "Descubre empleos remotos, becas internacionales, fondos para startups y más. Optimiza tu CV para pasar filtros ATS.",
    keywords: [
      "empleos remotos para latinos",
      "becas internacionales 2026",
      "oportunidades de empleo global",
      "CV optimizado ATS",
      "fondos para startups",
    ],
  },
  jobs: {
    title: "Oportunidades de Empleo Global",
    description:
      "500+ empleos, becas, fondos y oportunidades reales. Filtrar por país, tipo y rubro.",
    keywords: [
      "empleos remotos",
      "empleos por país",
      "becas internacionales",
      "capital semilla",
      "oportunidades de trabajo",
    ],
  },
  cvOptimization: {
    title: "Optimiza tu CV para Pasar Filtros ATS",
    description:
      "Servicio de optimización de CV para conseguir más entrevistas. Paquetes desde ₲50.000.",
    keywords: [
      "optimizar CV ATS",
      "CV para conseguir empleo",
      "palabras clave CV",
      "carta de presentación",
      "servicio de CV",
    ],
  },
  recruiters: {
    title: "Panel de Reclutadores - Acceso a CVs Optimizados",
    description:
      "Acceso a 500+ CVs optimizados para ATS. Análisis de compatibilidad y ranking avanzado.",
    keywords: [
      "reclutamiento",
      "búsqueda de talento",
      "CVs optimizados",
      "análisis ATS",
      "panel de reclutadores",
    ],
  },
};

export const generateSitemap = (opportunities: any[]) => {
  const baseUrl = SEO_CONFIG.siteUrl;
  const pages = [
    { url: "/", priority: 1.0, changefreq: "daily" },
    { url: "/jobs", priority: 0.9, changefreq: "daily" },
    { url: "/cv-optimization", priority: 0.8, changefreq: "weekly" },
    { url: "/recruiters/tokens", priority: 0.7, changefreq: "weekly" },
  ];

  // Agregar oportunidades individuales
  const opportunityPages = opportunities.map((opp) => ({
    url: `/opportunities/${opp.id}`,
    priority: 0.7,
    changefreq: "weekly",
    lastmod: opp.deadline,
  }));

  const allPages = [...pages, ...opportunityPages];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  allPages.forEach((page) => {
    sitemap += "  <url>\n";
    sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
    if (page.lastmod) {
      sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
    }
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += "  </url>\n";
  });

  sitemap += "</urlset>";
  return sitemap;
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /#admin

Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml

# Crawl delay for search engines
Crawl-delay: 1
`;
};
