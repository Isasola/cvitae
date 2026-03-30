import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { token } = JSON.parse(event.body || '{}');

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token required', isValid: false }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Supabase not configured', isValid: false }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query tokens table
    const { data, error } = await supabase
      .from('tokens')
      .select('*')
      .eq('token', token.trim())
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Token inválido o no encontrado', isValid: false }),
      };
    }

    // Check expiration
    const expiryDate = new Date(data.expires_at);
    const now = new Date();

    if (expiryDate < now) {
      // Mark token as inactive if expired
      await supabase
        .from('tokens')
        .update({ is_active: false })
        .eq('id', data.id);

      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Token expirado', isValid: false }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        isValid: true,
        recruiterId: data.recruiter_id,
        expiresAt: data.expires_at,
      }),
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', isValid: false, details: String(error) }),
    };
  }
};

export { handler };
