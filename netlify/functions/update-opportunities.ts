import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

// Standardized Opportunity interface for CVitae
interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  continent: string;
  type: string;
  value: string;
  deadline: string;
  compatibility: number;
  tags: string[];
  description: string;
  application_url: string;
  source: string;
  rubro?: string;
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log("Iniciando actualización de oportunidades reales...");

  // Initialize Supabase inside the handler for correct env reading in production
  const SUPABASE_URL = process.env.SUPABASE_URL || "";
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // API Keys from Environment Variables
  const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
  const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
  const FINDWORK_API_KEY = process.env.FINDWORK_API_KEY;
  const SERPAPI_KEY = process.env.SERPAPI_KEY;

  let allOpportunities: Opportunity[] = [];

  try {
    // 1. Fetch from Adzuna (Global/Tech)
    if (ADZUNA_APP_ID && ADZUNA_APP_KEY) {
      try {
        const adzunaRes = await axios.get(
          `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=10&what=software%20developer&content-type=application/json`
        );
        const adzunaJobs = adzunaRes.data.results.map((job: any) => ({
          id: `adzuna-${job.id}`,
          title: job.title,
          organization: job.company.display_name,
          location: job.location.display_name,
          continent: "Global",
          type: "empleo",
          value: job.salary_min ? `£${job.salary_min} - £${job.salary_max}` : "Competitivo",
          deadline: "Abierto",
          compatibility: 75,
          tags: job.category.tag.split("-"),
          description: job.description,
          application_url: job.redirect_url,
          source: "Adzuna",
          rubro: "Tecnología"
        }));
        allOpportunities = [...allOpportunities, ...adzunaJobs];
      } catch (e) { console.error("Error Adzuna:", e); }
    }

    // 2. Fetch from FindWork (Remote/Global)
    if (FINDWORK_API_KEY) {
      try {
        const findworkRes = await axios.get("https://findwork.dev/api/jobs/", {
          headers: { Authorization: `Token ${FINDWORK_API_KEY}` }
        });
        const findworkJobs = findworkRes.data.results.slice(0, 10).map((job: any) => ({
          id: `findwork-${job.id}`,
          title: job.role,
          organization: job.company_name,
          location: job.remote ? "Remoto" : job.location,
          continent: "Global",
          type: "empleo",
          value: "Competitivo",
          deadline: "Abierto",
          compatibility: 80,
          tags: job.keywords || [],
          description: job.text.substring(0, 200) + "...",
          application_url: job.url,
          source: "FindWork",
          rubro: "Tecnología"
        }));
        allOpportunities = [...allOpportunities, ...findworkJobs];
      } catch (e) { console.error("Error FindWork:", e); }
    }

    // 3. Fetch from SerpApi (Google Jobs - Local Paraguay)
    if (SERPAPI_KEY) {
      try {
        const serpRes = await axios.get("https://serpapi.com/search.json", {
          params: {
            engine: "google_jobs",
            q: "empleos en paraguay",
            hl: "es",
            gl: "py",
            api_key: SERPAPI_KEY
          }
        });
        const serpJobs = serpRes.data.jobs_results.slice(0, 10).map((job: any) => ({
          id: `serp-${job.job_id}`,
          title: job.title,
          organization: job.company_name,
          location: job.location,
          continent: "Sudamérica",
          type: "empleo",
          value: job.extensions?.find((e: string) => e.includes("₲") || e.includes("$")) || "Competitivo",
          deadline: "Abierto",
          compatibility: 85,
          tags: ["Paraguay", "Local", job.detected_extensions?.schedule_type || "Full-time"],
          description: job.description.substring(0, 200) + "...",
          application_url: job.related_links?.[0]?.link || "",
          source: "Google Jobs",
          rubro: "General"
        }));
        allOpportunities = [...allOpportunities, ...serpJobs];
      } catch (e) { console.error("Error SerpApi:", e); }
    }

    // 4. Update Supabase content_hub if we have new opportunities
    if (allOpportunities.length > 0) {
      const upsertData = allOpportunities.map(opp => ({
        titulo: opp.title,
        slug: `opp-${opp.id}`,
        cuerpo: opp.description,
        categoria: opp.type,
        tipo: 'oportunidad',
        is_active: true,
        metadata: {
          organization: opp.organization,
          location: opp.location,
          value: opp.value,
          tags: opp.tags,
          application_url: opp.application_url,
          source: opp.source,
          rubro: opp.rubro
        },
        fecha_vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days default
      }));

      const { error: upsertError } = await supabase
        .from('content_hub')
        .upsert(upsertData, { onConflict: 'slug' });
      
      if (upsertError) console.error("Error updating Supabase:", upsertError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Oportunidades actualizadas con éxito",
        count: allOpportunities.length,
        data: allOpportunities,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error("Error general en el motor de actualización:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Fallo al actualizar oportunidades" }),
    };
  }
};
