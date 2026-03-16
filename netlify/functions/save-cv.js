const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

function cors() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors(), body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors(), body: JSON.stringify({ error: "Method not allowed" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "JSON inválido" }) }; }

  const { name, job, wa, email, plan, cvHtml, formData } = body;
  if (!name || !cvHtml) return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "Faltan datos" }) };

  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  const order = {
    id,
    nombre: name,
    email: email || null,
    whatsapp: wa || null,
    plan: plan || "cv_digital",
    experiencia: formData?.experiencia || null,
    estudios: formData?.estudios || null,
    habilidades: formData?.habilidades || null,
    aviso_trabajo: formData?.aviso_trabajo || job || null,
    idioma: formData?.idioma || "español",
    formato: formData?.formato || "latam",
    observaciones: formData?.observaciones || null,
    cv_generado: cvHtml,
    estado: "pendiente_pago",
    status: "pending",
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(order)
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error("Error guardando en Supabase: " + err);
    }

    return { statusCode: 200, headers: cors(), body: JSON.stringify({ ok: true, id }) };

  } catch (e) {
    console.error("save-cv error:", e);
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Error guardando pedido" }) };
  }
};
