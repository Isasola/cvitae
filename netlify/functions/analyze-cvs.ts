import { Handler } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface CVAnalysis {
  name: string;
  score: number;
  strengths: string[];
  improvements: string[];
  recommendation: string;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { cvs, jobDescription } = JSON.parse(event.body || "{}");

    if (!cvs || !Array.isArray(cvs) || cvs.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "CVs array is required" }),
      };
    }

    const analyses: CVAnalysis[] = [];

    for (const cv of cvs) {
      const prompt = `Eres un experto en reclutamiento y ATS. Analiza este CV y proporciona:

CV TEXTO:
${cv.text}

${jobDescription ? `DESCRIPCIÓN DEL PUESTO:\n${jobDescription}` : ""}

Proporciona un análisis JSON con este formato exacto:
{
  "score": <número 0-100>,
  "strengths": [<lista de 3-4 fortalezas principales>],
  "improvements": [<lista de 3-4 mejoras específicas>],
  "recommendation": "<párrafo corto sobre por qué este CV es/no es ideal para la posición>"
}

Sé específico, honesto y constructivo. El score debe reflejar compatibilidad ATS + relevancia.`;

      const message = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const responseText =
        message.content[0].type === "text" ? message.content[0].text : "";

      // Extraer JSON de la respuesta
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const analysis = JSON.parse(jsonMatch[0]);

      analyses.push({
        name: cv.name || "CV Sin Nombre",
        score: analysis.score,
        strengths: analysis.strengths,
        improvements: analysis.improvements,
        recommendation: analysis.recommendation,
      });
    }

    // Ordenar por score descendente
    analyses.sort((a, b) => b.score - a.score);

    // Retornar top 5
    const topCVs = analyses.slice(0, 5);

    return {
      statusCode: 200,
      body: JSON.stringify({
        total: analyses.length,
        topCVs,
        allAnalyses: analyses,
      }),
    };
  } catch (error) {
    console.error("Error analyzing CVs:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error analyzing CVs",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

export { handler };
