const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

function cors() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors(), body: "" };

  const id = event.queryStringParameters && event.queryStringParameters.id;
  if (!id) return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "ID requerido" }) };

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/pedidos?id=eq.${encodeURIComponent(id)}&select=*`,
      {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!res.ok) throw new Error("Error leyendo Supabase");

    const data = await res.json();
    const order = data[0];

    if (!order) return { statusCode: 404, headers: cors(), body: JSON.stringify({ error: "CV no encontrado" }) };

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({
        cvHtml: order.cv_generado,
        name: order.nombre,
        job: order.aviso_trabajo || "",
        cartaHtml: order.carta_html || "",
        entrevistaHtml: order.entrevista_html || "",
        linkedinText: order.linkedin_text || "",
        createdAt: order.created_at || ""
      })
    };

  } catch (e) {
    console.error("get-cv error:", e);
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Error obteniendo CV" }) };
  }
};
