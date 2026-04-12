import { Handler } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

interface CandidateAnalysis {
  atsScore: number;
  compatibilityPercentage: number;
  strengths: string[];
  criticalImprovements: string[];
  actionPlan: string[];
  estimatedInterviewChance: string;
  cvOptimizationMessage: string;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Initialize Supabase inside the handler
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "";
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const { cvText, targetJob, recruiterToken } = JSON.parse(event.body || "{}");

    // 1. Recruiter Token Logic (Optional but enforced if provided)
    if (recruiterToken) {
      const { data: tokenData, error: tokenError } = await supabase
        .from('recruiter_tokens')
        .select('*')
        .eq('access_token', recruiterToken)
        .eq('is_active', true)
        .single();

      if (tokenError || !tokenData) {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: "Token de reclutador inválido o inactivo" }),
        };
      }

      if (tokenData.token_balance <= 0) {
        return {
          statusCode: 402,
          body: JSON.stringify({ error: "Sin créditos suficientes. Por favor recarga tu pack." }),
        };
      }

      // Deduct 1 token
      await supabase
        .from('recruiter_tokens')
        .update({ token_balance: tokenData.token_balance - 1 })
        .eq('id', tokenData.id);
    }

    // 2. IA Analysis
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

    const client = new Anthropic({ apiKey });

    if (!cvText || typeof cvText !== 'string' || cvText.trim().length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "CV text is required" }) };
    }

    const prompt = `Eres un experto en ATS (Applicant Tracking Systems) y reclutamiento en Paraguay. Analiza este CV y proporciona recomendaciones HONESTAS y ESPECÍFICAS.
    
    CV:
    ${cvText}
    
    ${targetJob ? `PUESTO OBJETIVO:\n${targetJob}` : "PUESTO GENÉRICO"}
    
    IMPORTANTE: 
    - No endulces la verdad. Si el CV es débil y será rechazado por un ATS, dilo claramente.
    - El score debe ser realista (la mayoría de los CVs en Paraguay sacan menos de 50/100).
    - Vende la SOLUCIÓN de CVitae (Plan Pro Plus de 50.000 Gs) como la única forma de arreglar los errores críticos.
    
    Responde en JSON exactamente así:
    {
      "atsScore": <0-100>,
      "compatibilityPercentage": <0-100>,
      "strengths": [<máximo 3 fortalezas reales>],
      "criticalImprovements": [<máximo 5 mejoras urgentes y específicas>],
      "actionPlan": [<máximo 4 pasos concretos>],
      "estimatedInterviewChance": "<Muy Baja|Baja|Media|Alta|Muy Alta>",
      "cvOptimizationMessage": "Tu perfil tiene errores que lo hacen invisible para los filtros ATS de Paraguay. Desbloqueá tu CV optimizado y la lista de palabras clave por solo 50.000 Gs hoy mismo."
    }`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const analysis = JSON.parse(jsonMatch[0]) as CandidateAnalysis;

    return {
      statusCode: 200,
      body: JSON.stringify(analysis),
    };
  } catch (error: any) {
    console.error("Error analyzing CV:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error en el análisis", details: error.message }),
    };
  }
};

export { handler };
