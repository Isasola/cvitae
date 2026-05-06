export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  image?: string;
}

export const blogIndex: BlogPostMeta[] = [
  {
    slug: 'como-pasar-filtros-ats-paraguay-2026',
    title: 'Cómo pasar los filtros ATS en Paraguay en 2026',
    description: 'Guía práctica para que tu CV no sea descartado automáticamente.',
    date: '2026-03-30',
    category: 'cv',
    keywords: ['ATS', 'CV Paraguay', 'filtros de empleo'],
  },
  {
    slug: 'becas-internacionales-latinoamerica-2026',
    title: 'Becas internacionales para latinoamericanos en 2026',
    description: 'Las mejores becas abiertas para latinos este año.',
    date: '2026-03-30',
    category: 'becas',
    keywords: ['becas internacionales', 'latinoamerica', 'estudios'],
  },
  {
    slug: 'empleos-remotos-desde-paraguay',
    title: 'Cómo conseguir empleo remoto desde Paraguay',
    description: 'Plataformas, estrategias y errores comunes al buscar trabajo remoto.',
    date: '2026-03-30',
    category: 'empleos',
    keywords: ['empleo remoto', 'trabajo desde Paraguay', 'freelance'],
  },
];
