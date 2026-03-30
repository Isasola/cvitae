import { Handler } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';

interface CVData {
  name: string;
  content: string;
  type: string;
}

interface AnalysisResult {
  candidateName: string;
  atsScore: number;
  keywords: string[];
  recommendation: 'shortlist' | 'longlist' | 'reject';
  summary: string;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { jobDescription, observations, cvs, token } = JSON.parse(event.body || '{}');
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!anthropicKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }),
      };
    }

    if (!jobDescription || !cvs || cvs.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Job description and CVs required' }),
      };
    }

    // Validate CV count (max 10)
    if (cvs.length > 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Maximum 10 CVs allowed per batch' }),
      };
    }

    const client = new Anthropic({
      apiKey: anthropicKey,
    });

    const results: AnalysisResult[] = [];
    const startTime = Date.now();

    // Analyze each CV in batch
    for (let i = 0; i < cvs.length; i++) {
      const cv = cvs[i];
      try {
        // Validate CV content
        if (!cv.content || cv.content.trim().length === 0) {
          results.push({
            candidateName: cv.name.replace(/\.[^/.]+$/, ''),
            atsScore: 0,
            keywords: [],
            recommendation: 'reject',
            summary: 'CV vacío o sin contenido legible',
          });
          continue;
        }

        const filterSection = observations 
          ? `OBSERVACIONES/FILTROS ESPECÍFICOS:\n${observations}\n\n` 
          : '';

        const prompt = `Eres un experto en reclutamiento y análisis de CVs con experiencia en el mercado de Paraguay y Latinoamérica. Analiza este CV contra la descripción del puesto y proporciona un análisis en formato JSON.

DESCRIPCIÓN DEL PUESTO:
${jobDescription}

${filterSection}CV DEL CANDIDATO:
${cv.content}

Por favor, devuelve un JSON con esta estructura EXACTA (sin markdown, solo JSON puro):
{
  "candidateName": "Nombre del candidato",
  "atsScore": número entre 0-100,
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "recommendation": "shortlist" | "longlist" | "reject",
  "summary": "Resumen de 2-3 líneas. IMPORTANTE: Menciona específicamente si cumple o no con los filtros específicos indicados en observaciones (ej: ubicación, experiencia, idiomas)."
}

CRITERIOS:
- Shortlist (80-100): Cumple con TODOS los requisitos clave Y los filtros específicos
- Longlist (60-79): Cumple con la mayoría pero falla en algunos filtros
- Reject (<60): No cumple con requisitos esenciales o filtros críticos

IMPORTANTE: En el summary, siempre menciona si el candidato cumple con los filtros específicos del reclutador. Sé específico y cuantificable.`;

        const message = await client.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        });

        const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
        
        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

        if (analysis) {
          results.push({
            candidateName: analysis.candidateName || cv.name.replace(/\.[^/.]+$/, ''),
            atsScore: Math.min(100, Math.max(0, analysis.atsScore || 0)),
            keywords: Array.isArray(analysis.keywords) ? analysis.keywords : [],
            recommendation: ['shortlist', 'longlist', 'reject'].includes(analysis.recommendation)
              ? analysis.recommendation
              : 'longlist',
            summary: analysis.summary || 'Sin resumen disponible',
          });
        }
      } catch (cvError) {
        console.error(`Error analyzing CV ${cv.name}:`, cvError);
        results.push({
          candidateName: cv.name.replace(/\.[^/.]+$/, ''),
          atsScore: 0,
          keywords: [],
          recommendation: 'reject',
          summary: `Error en el análisis: ${cvError instanceof Error ? cvError.message : 'Error desconocido'}`,
        });
      }
    }

    const processingTime = Date.now() - startTime;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        results,
        totalAnalyzed: cvs.length,
        shortlistCount: results.filter((r) => r.recommendation === 'shortlist').length,
        longlistCount: results.filter((r) => r.recommendation === 'longlist').length,
        rejectedCount: results.filter((r) => r.recommendation === 'reject').length,
        processingTime: `${Math.round(processingTime / 1000)}s`,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('Batch analysis error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to analyze CVs',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

export { handler };
