import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const { email, source = 'website' } = JSON.parse(event.body || '{}');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Email inválido' }) 
      };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        { email, source, created_at: new Date().toISOString() }, 
        { onConflict: 'email' }
      );

    if (error) {
      console.error('Supabase error:', error);
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: 'Error al guardar en la base de datos' }) 
      };
    }

    return { 
      statusCode: 200, 
      body: JSON.stringify({ success: true, message: 'Suscripción exitosa' }) 
    };
  } catch (err) {
    console.error('Server error:', err);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Error interno del servidor' }) 
    };
  }
};

export { handler };
