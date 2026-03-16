const JSONBIN_KEY = process.env.JSONBIN_KEY;
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID;

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
    // Datos del cliente
    nombre: name,
    email: email || null,
    whatsapp: wa || null,
    plan: plan || "cv_digital",
    // Formulario completo — listo para Supabase
    experiencia: formData?.experiencia || null,
    estudios: formData?.estudios || null,
    habilidades: formData?.habilidades || null,
    aviso_trabajo: formData?.aviso_trabajo || job || null,
    idioma: formData?.idioma || "español",
    formato: formData?.formato || "latam",
    observaciones: formData?.observaciones || null,
    // CV generado
    cv_generado: cvHtml,
    // Estado
    estado: "pendiente_pago",
    // Timestamps
    fecha_creacion: new Date().toISOString(),
    fecha_pago: null,
    fecha_entrega: null,
    // Legacy para cvadmin.js — no tocar
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  try {
    let orders = [];
    if (JSONBIN_BIN_ID) {
      const readRes = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: { "X-Master-Key": JSONBIN_KEY }
      });
      if (readRes.ok) {
        const data = await readRes.json();
        orders = data.record.orders || [];
      }
    }

    orders.push(order);

    const saveRes = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Master-Key": JSONBIN_KEY },
      body: JSON.stringify({ orders })
    });

    if (!saveRes.ok) throw new Error("Error guardando en JSONBin");

    return { statusCode: 200, headers: cors(), body: JSON.stringify({ ok: true, id }) };

  } catch (e) {
    console.error("save-cv error:", e);
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Error guardando pedido" }) };
  }
};
