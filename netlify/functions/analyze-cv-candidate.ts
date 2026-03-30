import { Handler } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

// NOTE: Client is created inside the handler to ensure environment variables are loaded at runtime

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
    // Verify API key is available at runtime
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not configured in environment");
      console.error("Available env keys:", Object.keys(process.env).filter(k => k.includes('ANTHROPIC') || k.includes('API')));
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server configuration error: Missing API key" }),
      };
    }

    // Create Anthropic client with explicit API key
    const client = new Anthropic({
      apiKey: apiKey,
    });

    const { cvText, targetJob } = JSON.parse(event.body || "{}");

    if (!cvText || typeof cvText !== 'string' || cvText.trim().length === 0) {
      console.warn("Invalid or empty CV text received");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "CV text is required and must not be empty" }),
      };
    }

    if (cvText.length > 50000) {
      console.warn("CV text exceeds maximum length");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "CV text is too long (max 50000 characters)" }),
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

    console.log("Starting CV analysis with Claude...");
    console.log("API Key loaded:", apiKey.substring(0, 10) + "...");
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
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

    if (!responseText) {
      throw new Error("Empty response from Claude API");
    }

    // Extraer JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in Claude response:", responseText.substring(0, 500));
      throw new Error("No JSON found in response");
    }

    let analysis: CandidateAnalysis;
    try {
      analysis = JSON.parse(jsonMatch[0]) as CandidateAnalysis;
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Raw JSON:", jsonMatch[0].substring(0, 500));
      throw new Error("Failed to parse Claude response as JSON");
    }

    // Validate analysis structure
    if (typeof analysis.atsScore !== 'number' || typeof analysis.compatibilityPercentage !== 'number') {
      throw new Error("Invalid analysis structure: missing required numeric fields");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(analysis),
    };
  } catch (error) {
    console.error("Error analyzing CV:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const statusCode = errorMessage.includes("API") ? 503 : 500;
    
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        error: "Error analyzing CV",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

export { handler };
