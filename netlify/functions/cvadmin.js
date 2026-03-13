const JSONBIN_KEY = process.env.JSONBIN_KEY;
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cvitae2026admin";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const EMAILJS_SERVICE_ID = "service_muvlq14";
const EMAILJS_TEMPLATE_ID = "template_u399kvj";
const EMAILJS_PUBLIC_KEY = "CZy-kIlMnZIBxjh15";
const SITE_URL = "https://cvitae-py.netlify.app";

function cors() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function getOrders() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
    headers: { "X-Master-Key": JSONBIN_KEY }
  });
  if (!res.ok) throw new Error("Error leyendo JSONBin");
  const data = await res.json();
  return data.record.orders || [];
}

async function saveOrders(orders) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Master-Key": JSONBIN_KEY },
    body: JSON.stringify({ orders })
  });
  if (!res.ok) throw new Error("Error guardando en JSONBin");
}

async function generateExtras(order) {
  const prompt = `Sos un asistente profesional de RR.HH. para Paraguay. Dado el siguiente perfil, generá 3 documentos en español rioplatense formal.

Nombre: ${order.name}
Profesión: ${order.profession || "profesional"}
Puesto al que aplica: ${order.job || "un puesto relevante"}

Respondé SOLO con un JSON válido con esta estructura exacta, sin texto extra antes ni después:
{
  "carta": "<p>...carta de presentación completa en HTML, 3 párrafos, usando solo tags p y strong...</p>",
  "entrevista": "<div>...3 preguntas frecuentes de entrevista con sus respuestas ideales, usando h4 para la pregunta y p para la respuesta...</div>",
  "linkedin": "Texto listo para copiar en LinkedIn, máximo 5 líneas, sin HTML, tono profesional y cercano."
}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!res.ok) throw new Error("Error llamando a Anthropic");
  const data = await res.json();
  const text = data.content[0].text.trim();
  const clean = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
  return JSON.parse(clean);
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors(), body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors(), body: JSON.stringify({ error: "Method not allowed" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "JSON inválido" }) }; }

  const { password, action, orderId } = body;
  if (password !== ADMIN_PASSWORD) return { statusCode: 401, headers: cors(), body: JSON.stringify({ error: "Contraseña incorrecta" }) };

  if (action === "list") {
    try {
      const orders = await getOrders();
      const sorted = orders
        .map(o => ({ id: o.id, name: o.name, email: o.email, plan: o.plan, job: o.job, status: o.status, createdAt: o.createdAt }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return { statusCode: 200, headers: cors(), body: JSON.stringify({ orders: sorted }) };
    } catch (e) {
      return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Error listando pedidos" }) };
    }
  }

  if (action === "approve") {
    if (!orderId) return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "orderId requerido" }) };
    try {
      const orders = await getOrders();
      const order = orders.find(o => o.id === orderId);
      if (!order) return { statusCode: 404, headers: cors(), body: JSON.stringify({ error: "Pedido no encontrado" }) };
      if (order.status === "sent") return { statusCode: 409, headers: cors(), body: JSON.stringify({ error: "Ya fue enviado" }) };

      // Generar carta, entrevista y LinkedIn con IA
      const extras = await generateExtras(order);
      order.cartaHtml = extras.carta;
      order.entrevistaHtml = extras.entrevista;
      order.linkedinText = extras.linkedin;

      const cvLink = `${SITE_URL}/cv.html?id=${order.id}`;
      const planLabel = order.plan === "pro" ? "Portafolio Web" : "CV Digital";

      // Enviar email al cliente con el link
      const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_name: order.name,
            to_email: order.email,
            name: order.name,
            email: order.email,
            wa: order.wa,
            job: order.job,
            plan: planLabel,
            cv_html: cvLink
          }
        })
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error("EmailJS error status:", emailRes.status, "body:", errText);
        return { statusCode: 502, headers: cors(), body: JSON.stringify({ error: "Error EmailJS: " + errText }) };
      }

      order.status = "sent";
      order.sentAt = new Date().toISOString();
      await saveOrders(orders);

      return { statusCode: 200, headers: cors(), body: JSON.stringify({ ok: true, cvLink }) };
    } catch (e) {
      return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Error aprobando: " + e.message }) };
    }
  }

  if (action === "delete") {
    if (!orderId) return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "orderId requerido" }) };
    try {
      let orders = await getOrders();
      orders = orders.filter(o => o.id !== orderId);
      await saveOrders(orders);
      return { statusCode: 200, headers: cors(), body: JSON.stringify({ ok: true }) };
    } catch (e) {
      return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Error eliminando" }) };
    }
  }

  return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "Acción desconocida" }) };
};
