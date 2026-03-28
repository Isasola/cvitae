import { Handler } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

  try {
    const { cvText, targetJob } = JSON.parse(event.body || "{}");

    if (!cvText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "CV text is required" }),
      };
    }

    const prompt = `Eres un experto en ATS (Applicant Tracking Systems) y reclutamiento. Analiza este CV y proporciona recomendaciones HONESTAS y ESPECÍFICAS.

CV:
${cvText}

${targetJob ? `PUESTO OBJETIVO:\n${targetJob}` : "PUESTO GENÉRICO"}

IMPORTANTE: 
- No endulces la verdad. Si el CV es débil, dilo claramente.
- Proporciona acciones concretas y medibles.
- Vende la SOLUCIÓN (CVitae), no el problema.

Responde en JSON exactamente así:
{
  "atsScore": <0-100>,
  "compatibilityPercentage": <0-100>,
  "strengths": [<máximo 3 fortalezas reales>],
  "criticalImprovements": [<máximo 5 mejoras urgentes y específicas>],
  "actionPlan": [<máximo 4 pasos concretos>],
  "estimatedInterviewChance": "<Muy Baja|Baja|Media|Alta|Muy Alta>",
  "cvOptimizationMessage": "<Párrafo de 2-3 líneas vendiendo CVitae. Sé directo: qué problema resuelve, cómo ayuda, y por qué es urgente. No uses emojis ni lenguaje genérico.>"
}`;

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extraer JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const analysis = JSON.parse(jsonMatch[0]) as CandidateAnalysis;

    return {
      statusCode: 200,
      body: JSON.stringify(analysis),
    };
  } catch (error) {
    console.error("Error analyzing CV:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error analyzing CV",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

export { handler };
