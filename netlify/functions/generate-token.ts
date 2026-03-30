import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { recruiterId, plan = 'pro' } = JSON.parse(event.body || '{}');
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Supabase not configured' }),
      };
    }

    if (!recruiterId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'recruiterId required' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate unique token
    const tokenCode = `CVT-${randomBytes(8).toString('hex').toUpperCase()}`;
    
    // Set expiry to 30 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Insert token into Supabase
    const { data, error } = await supabase
      .from('tokens')
      .insert([
        {
          token: tokenCode,
          recruiter_id: recruiterId,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
          is_active: true,
          plan: plan,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create token', details: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        token: tokenCode,
        expiresAt: expiresAt.toISOString(),
        plan: plan,
        message: 'Token generado exitosamente',
      }),
    };
  } catch (error) {
    console.error('Token generation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate token', details: String(error) }),
    };
  }
};

export { handler };
