/**
 * API Manager
 * Centralized management of all external API calls
 * Supports: Anthropic (Claude), Supabase, ADZUNA, FINDWORK, SERPAPI
 */

import { Anthropic } from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Job APIs configuration
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const FINDWORK_API_KEY = process.env.FINDWORK_API_KEY;
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;

/**
 * Analyze CV using Claude AI
 */
export async function analyzeCVWithClaude(cvText: string): Promise<{
  analysis: string;
  visibility: number;
  keywords: number;
  formatting: number;
  impact: number;
}> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Analiza este CV y proporciona:
1. Un análisis detallado de visibilidad para reclutadores
2. Identificación de keywords faltantes
3. Evaluación del formato
4. Impacto general del perfil

Formato de respuesta JSON:
{
  "analysis": "análisis detallado",
  "visibility": número 0-100,
  "keywords": número 0-100,
  "formatting": número 0-100,
  "impact": número 0-100
}

CV a analizar:
${cvText}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {
      analysis: responseText,
      visibility: 50,
      keywords: 50,
      formatting: 50,
      impact: 50,
    };
  } catch (error) {
    console.error('Error analyzing CV with Claude:', error);
    throw error;
  }
}

/**
 * Get opportunities from ADZUNA API
 */
export async function getOpportunitiesFromAdzuna(
  location: string = 'Paraguay',
  page: number = 1
): Promise<any[]> {
  try {
    if (!ADZUNA_API_KEY) {
      console.warn('ADZUNA_API_KEY not configured');
      return [];
    }

    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/py/search/1?app_id=${ADZUNA_API_KEY}&app_key=${ADZUNA_API_KEY}&location0=${location}&page=${page}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.results || [];
    }

    return [];
  } catch (error) {
    console.error('Error fetching from ADZUNA:', error);
    return [];
  }
}

/**
 * Get opportunities from FINDWORK API
 */
export async function getOpportunitiesFromFindwork(
  page: number = 1
): Promise<any[]> {
  try {
    if (!FINDWORK_API_KEY) {
      console.warn('FINDWORK_API_KEY not configured');
      return [];
    }

    const response = await fetch(
      `https://findwork.dev/api/jobs/?search=Paraguay&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${FINDWORK_API_KEY}`,
          'Accept': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.results || [];
    }

    return [];
  } catch (error) {
    console.error('Error fetching from FINDWORK:', error);
    return [];
  }
}

/**
 * Supabase: Create token for recruiter
 */
export async function createRecruitToken(
  recruiterId: string,
  durationDays: number = 30
): Promise<{
  token: string;
  expiresAt: string;
}> {
  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    // Generate unique token
    const token = `cvitae_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);

    // Insert into Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/tokens`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        token,
        recruiter_id: recruiterId,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
        is_active: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.statusText}`);
    }

    return {
      token,
      expiresAt: expiresAt.toISOString(),
    };
  } catch (error) {
    console.error('Error creating recruiter token:', error);
    throw error;
  }
}

/**
 * Supabase: Verify token validity
 */
export async function verifyRecruitToken(token: string): Promise<boolean> {
  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/tokens?token=eq.${token}&is_active=eq.true`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        const token_data = data[0];
        const expiresAt = new Date(token_data.expires_at);
        return expiresAt > new Date();
      }
    }

    return false;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}

/**
 * Combine all job sources
 */
export async function getAllOpportunities(page: number = 1): Promise<any[]> {
  try {
    const [adzunaJobs, findworkJobs] = await Promise.all([
      getOpportunitiesFromAdzuna('Paraguay', page),
      getOpportunitiesFromFindwork(page),
    ]);

    // Combine and deduplicate
    const allJobs = [...adzunaJobs, ...findworkJobs];
    const uniqueJobs = Array.from(
      new Map(allJobs.map((job) => [job.id || job.title, job])).values()
    );

    return uniqueJobs.slice(0, 20); // Return top 20
  } catch (error) {
    console.error('Error getting all opportunities:', error);
    return [];
  }
}
