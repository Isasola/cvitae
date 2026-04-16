import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { ApifyClient } from 'apify-client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../client/src/data/opportunities.json');

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const FINDWORK_API_KEY = process.env.FINDWORK_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const APIFY_API_KEY = process.env.APIFY_API_KEY;
const JOOBLE_API_KEY = process.env.JOOBLE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let allOpportunities = [];

/**
 * Genera una descripción enriquecida con Gemini.
 */
async function enrichWithGemini(title, company, location, originalUrl) {
  if (!GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY no configurada. Se usará descripción corta.');
    return null;
  }

  const prompt = `Eres un redactor profesional de ofertas de empleo. Genera una descripción atractiva y completa en español para la siguiente vacante:

Título: ${title}
Empresa: ${company || 'Empresa líder'}
Ubicación: ${location || 'Paraguay / Remoto'}

La descripción debe incluir:
- Una breve presentación de la empresa.
- Responsabilidades principales del puesto (3-4 puntos).
- Requisitos deseables (2-3 puntos).
- Beneficios ofrecidos (1-2 puntos).
- Extensión aproximada: 300-400 palabras.
- Al final del texto, incluye EXACTAMENTE esta línea (sin modificarla):
  "Ver oportunidad original: ${originalUrl}"

Responde ÚNICAMENTE con el texto en español, sin etiquetas adicionales.`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (generatedText) {
      console.log(`✅ Gemini generó descripción para: ${title}`);
      return generatedText.trim();
    }
    return null;
  } catch (error) {
    console.error(`❌ Error llamando a Gemini para "${title}":`, error.message);
    return null;
  }
}

// 1. Adzuna
if (ADZUNA_APP_ID && ADZUNA_APP_KEY) {
  try {
    const res = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=20&what=developer&content-type=application/json`
    );
    const jobs = res.data.results.map(job => ({
      id: `adzuna-${job.id}`,
      title: job.title,
      organization: job.company.display_name,
      location: job.location.display_name,
      continent: 'Global',
      type: 'empleo',
      rubro: 'Tecnología',
      value: job.salary_min ? `£${Math.round(job.salary_min)} - £${Math.round(job.salary_max)}` : 'Competitivo',
      deadline: 'Abierto',
      compatibility: 75,
      tags: ['Adzuna', 'Tecnología'],
      description: `Oportunidad laboral: ${job.title} en ${job.company.display_name}. Para más detalles y postular, visita el enlace de la oferta original.`,
      application_url: job.redirect_url,
      source: 'Adzuna',
    }));
    allOpportunities = [...allOpportunities, ...jobs];
    console.log(`✅ Adzuna: ${jobs.length} empleos`);
  } catch (e) {
    console.error('❌ Error Adzuna:', e.message);
  }
}

// 2. FindWork
if (FINDWORK_API_KEY) {
  try {
    const res = await axios.get('https://findwork.dev/api/jobs/', {
      headers: { Authorization: `Token ${FINDWORK_API_KEY}` }
    });
    const jobs = res.data.results.slice(0, 20).map(job => ({
      id: `findwork-${job.id}`,
      title: job.role,
      organization: job.company_name,
      location: job.remote ? 'Remoto' : (job.location || 'Global'),
      continent: 'Global',
      type: 'empleo',
      rubro: 'Tecnología',
      value: 'Competitivo',
      deadline: 'Abierto',
      compatibility: 80,
      tags: job.keywords?.slice(0, 3) || ['Remoto'],
      description: `Oportunidad laboral: ${job.role} en ${job.company_name}. Para más detalles y postular, visita el enlace de la oferta original.`,
      application_url: job.url,
      source: 'FindWork',
    }));
    allOpportunities = [...allOpportunities, ...jobs];
    console.log(`✅ FindWork: ${jobs.length} empleos`);
  } catch (e) {
    console.error('❌ Error FindWork:', e.message);
  }
}

// 3. SerpAPI
if (SERPAPI_KEY) {
  try {
    const res = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_jobs',
        q: 'empleos en paraguay',
        hl: 'es',
        gl: 'py',
        api_key: SERPAPI_KEY
      }
    });
    const jobs = res.data.jobs_results?.slice(0, 10).map(job => ({
      id: `serp-${job.job_id}`,
      title: job.title,
      organization: job.company_name,
      location: job.location,
      continent: 'Sudamérica',
      type: 'empleo',
      rubro: 'General',
      value: 'Competitivo',
      deadline: 'Abierto',
      compatibility: 85,
      tags: ['Paraguay', 'Local'],
      description: `Oportunidad laboral: ${job.title} en ${job.company_name}. Para más detalles y postular, visita el enlace de la oferta original.`,
      application_url: job.related_links?.[0]?.link || '',
      source: 'Google Jobs',
    })) || [];
    allOpportunities = [...allOpportunities, ...jobs];
    console.log(`✅ SerpAPI: ${jobs.length} empleos`);
  } catch (e) {
    console.error('❌ Error SerpAPI:', e.message);
  }
}

// 4. Apify (Computrabajo Paraguay)
if (APIFY_API_KEY) {
  try {
    const apifyClient = new ApifyClient({ token: APIFY_API_KEY });
    const run = await apifyClient.actor('drobnikj/compu-trabajo-scraper').call({
      searchTerms: ['empleos'],
      location: 'Paraguay',
      maxItems: 20
    });
    const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();
    const apifyJobs = items.slice(0, 20).map(job => ({
      id: `apify-${job.id || Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      organization: job.company || 'Empresa',
      location: job.location || 'Paraguay',
      continent: 'Sudamérica',
      type: 'empleo',
      rubro: job.category || 'General',
      value: job.salary || 'Competitivo',
      deadline: job.deadline || 'Abierto',
      compatibility: 80,
      tags: ['Paraguay', 'Computrabajo'],
      description: `Oportunidad laboral: ${job.title} en ${job.company || 'Empresa'}. Para más detalles y postular, visita el enlace de la oferta original.`,
      application_url: job.url,
      source: 'Computrabajo',
    }));
    allOpportunities = [...allOpportunities, ...apifyJobs];
    console.log(`✅ Apify (Computrabajo): ${apifyJobs.length} empleos`);
  } catch (e) {
    console.error('❌ Error Apify:', e.message);
  }
}

// 5. Jooble
if (JOOBLE_API_KEY) {
  try {
    const res = await axios.post('https://jooble.org/api/', {
      keywords: 'empleo',
      location: 'Paraguay',
      apiKey: JOOBLE_API_KEY
    });
    const jobs = res.data.jobs?.slice(0, 20).map(job => ({
      id: `jooble-${job.id || Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      organization: job.company,
      location: job.location || 'Paraguay',
      continent: 'Sudamérica',
      type: 'empleo',
      rubro: 'General',
      value: job.salary || 'Competitivo',
      deadline: job.updated || 'Abierto',
      compatibility: 80,
      tags: ['Paraguay', 'Jooble'],
      description: `Oportunidad laboral: ${job.title} en ${job.company}. Para más detalles y postular, visita el enlace de la oferta original.`,
      application_url: job.link,
      source: 'Jooble',
    })) || [];
    allOpportunities = [...allOpportunities, ...jobs];
    console.log(`✅ Jooble: ${jobs.length} empleos`);
  } catch (e) {
    console.error('❌ Error Jooble:', e.message);
  }
}

// 6. Enriquecer descripciones con Gemini (limitado a 5 para no exceder cuota gratuita)
console.log('🤖 Iniciando enriquecimiento con Gemini...');
const MAX_GEMINI_CALLS = 5;
let geminiProcessed = 0;

for (const opp of allOpportunities) {
  if (geminiProcessed >= MAX_GEMINI_CALLS) {
    console.log(`⚠️ Límite de ${MAX_GEMINI_CALLS} llamadas a Gemini alcanzado. El resto usarán descripción corta.`);
    break;
  }

  const enriched = await enrichWithGemini(
    opp.title,
    opp.organization,
    opp.location,
    opp.application_url
  );
  
  if (enriched) {
    opp.description = enriched;
    geminiProcessed++;
  }
  
  // Esperar 3 segundos entre llamadas para evitar error 429
  await new Promise(resolve => setTimeout(resolve, 3000));
}
console.log(`✅ Enriquecimiento con Gemini completado. ${geminiProcessed} descripciones generadas.`);

// 7. Guardar JSON (opcional)
const output = {
  total: allOpportunities.length,
  timestamp: new Date().toISOString(),
  opportunities: allOpportunities,
};
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`✅ JSON actualizado: ${allOpportunities.length} oportunidades`);

// 8. Persistir en Supabase
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const upsertData = allOpportunities.map(opp => ({
      titulo: opp.title,
      slug: `opp-${opp.id}`,
      cuerpo: opp.description,
      categoria: opp.rubro || 'General',
      tipo: 'oportunidad',
      is_active: true,
      ubicacion: opp.location,
      metadata: {
        organization: opp.organization,
        location: opp.location,
        value: opp.value,
        tags: opp.tags,
        application_url: opp.application_url,
        source: opp.source,
      },
      fecha_vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }));
    const { error } = await supabase
      .from('content_hub')
      .upsert(upsertData, { onConflict: 'slug' });
    if (error) console.error('❌ Error Supabase:', error.message);
    else console.log('✅ Supabase actualizado');
  } catch (e) {
    console.error('❌ Error Supabase:', e.message);
  }
}
