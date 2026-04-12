import { Handler } from "@netlify/functions";

function cors() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function getOrders(url: string, key: string) {
  const res = await fetch(
    `${url}/rest/v1/pedidos?select=*&order=fecha_creacion.desc`,
    {
      headers: {
        apikey: key || "",
        Authorization: `Bearer ${key}`,
      },
    }
  );
  if (!res.ok) throw new Error("Error leyendo Supabase");
  return await res.json();
}

async function updateOrder(url: string, key: string, id: string, fields: any) {
  const res = await fetch(
    `${url}/rest/v1/pedidos?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: key || "",
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(fields),
    }
  );
  if (!res.ok) throw new Error("Error actualizando en Supabase");
}

async function deleteOrder(url: string, key: string, id: string) {
  const res = await fetch(
    `${url}/rest/v1/pedidos?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        apikey: key || "",
        Authorization: `Bearer ${key}`,
      },
    }
  );
  if (!res.ok) throw new Error("Error eliminando de Supabase");
}

async function generateExtras(order: any, apiKey: string) {
  const nombre = order.nombre || order.name || "profesional";
  const profesion = order.profession || order.plan || "profesional";
  const puesto = order.aviso_trabajo || order.job || "un puesto relevante";

  const prompt = `Sos un asistente profesional de RR.HH. para Paraguay. Dado el siguiente perfil, generá 3 documentos en español rioplatense formal.

Nombre: ${nombre}
Profesión: ${profesion}
Puesto al que aplica: ${puesto}

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
      "x-api-key": apiKey || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error("Error llamando a Anthropic");
  const data = await res.json();
  const text = data.content[0].text.trim();
  const clean = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
  return JSON.parse(clean);
}

async function sendEmail(
  toName: string,
  toEmail: string,
  templateParams: any,
  config: { serviceId: string, templateId: string, publicKey: string }
) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      template_params: templateParams,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`EmailJS error: ${errText}`);
  }
}

const handler: Handler = async (event) => {
  // Env variables inside handler
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cvitae2026admin";
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
  const SITE_URL = process.env.SITE_URL || "https://cvitae-py.netlify.app";

  if (event.httpMethod === "OPTIONS")
    return { statusCode: 200, headers: cors(), body: "" };
  if (event.httpMethod !== "POST")
    return {
      statusCode: 405,
      headers: cors(),
      body: JSON.stringify({ error: "Method not allowed" }),
    };

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: cors(),
      body: JSON.stringify({ error: "JSON inválido" }),
    };
  }

  const { password, action, orderId } = body;
  if (password !== ADMIN_PASSWORD)
    return {
      statusCode: 401,
      headers: cors(),
      body: JSON.stringify({ error: "Contraseña incorrecta" }),
    };

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Configuración de Supabase faltante" }) };
  }

  // ── LIST ──
  if (action === "list") {
    try {
      const orders = await getOrders(SUPABASE_URL, SUPABASE_KEY);
      const sorted = orders.map((o: any) => ({
        id: o.id,
        name: o.nombre || o.name,
        email: o.email,
        plan: o.plan,
        job: o.aviso_trabajo || o.job,
        status: o.status,
        createdAt: o.created_at || o.fecha_creacion,
      }));
      return {
        statusCode: 200,
        headers: cors(),
        body: JSON.stringify({ orders: sorted }),
      };
    } catch (e) {
      return {
        statusCode: 500,
        headers: cors(),
        body: JSON.stringify({ error: "Error listando pedidos" }),
      };
    }
  }

  // ── APPROVE (Candidatos) ──
  if (action === "approve") {
    if (!orderId)
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({ error: "orderId requerido" }),
      };
    try {
      const orders = await getOrders(SUPABASE_URL, SUPABASE_KEY);
      const order = orders.find((o: any) => o.id === orderId);
      if (!order)
        return {
          statusCode: 404,
          headers: cors(),
          body: JSON.stringify({ error: "Pedido no encontrado" }),
        };
      if (order.status === "sent")
        return {
          statusCode: 409,
          headers: cors(),
          body: JSON.stringify({ error: "Ya fue enviado" }),
        };

      if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY faltante");
      const extras = await generateExtras(order, ANTHROPIC_API_KEY);
      const cvLink = `${SITE_URL}/cv.html?id=${order.id}`;
      const planLabel = order.plan === "pro" ? "Portafolio Web" : "CV Digital";
      const nombreCliente = order.nombre || order.name;
      const emailCliente = order.email;

      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await sendEmail(nombreCliente, emailCliente, {
          to_name: nombreCliente,
          to_email: emailCliente,
          name: nombreCliente,
          email: emailCliente,
          wa: order.whatsapp || order.wa,
          job: order.aviso_trabajo || order.job,
          plan: planLabel,
          cv_html: cvLink,
        }, {
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID,
          publicKey: EMAILJS_PUBLIC_KEY
        });
      }

      await updateOrder(SUPABASE_URL, SUPABASE_KEY, orderId, {
        carta_html: extras.carta,
        entrevista_html: extras.entrevista,
        linkedin_text: extras.linkedin,
        status: "sent",
        estado: "entregado",
        fecha_pago: new Date().toISOString(),
        fecha_entrega: new Date().toISOString(),
      });

      return {
        statusCode: 200,
        headers: cors(),
        body: JSON.stringify({ ok: true, cvLink }),
      };
    } catch (e: any) {
      return {
        statusCode: 500,
        headers: cors(),
        body: JSON.stringify({ error: "Error aprobando: " + e.message }),
      };
    }
  }

  // ── ENABLE_B2B (Reclutadores) ──
  if (action === "enable_b2b") {
    if (!orderId)
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({ error: "orderId requerido" }),
      };
    try {
      const orders = await getOrders(SUPABASE_URL, SUPABASE_KEY);
      const order = orders.find((o: any) => o.id === orderId);
      if (!order)
        return {
          statusCode: 404,
          headers: cors(),
          body: JSON.stringify({ error: "Pedido no encontrado" }),
        };

      // Generar token único
      const token = `REC-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${new Date().getFullYear()}`;
      const nombreEmpresa = order.nombre || order.name;
      const emailEmpresa = order.email;

      // Enviar email con token
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await sendEmail(nombreEmpresa, emailEmpresa, {
          to_name: nombreEmpresa,
          to_email: emailEmpresa,
          name: nombreEmpresa,
          email: emailEmpresa,
          token: token,
          access_link: `${SITE_URL}/recruiters/lots?token=${token}`,
          plan: order.plan || "Pro",
        }, {
          serviceId: EMAILJS_SERVICE_ID,
          templateId: EMAILJS_TEMPLATE_ID,
          publicKey: EMAILJS_PUBLIC_KEY
        });
      }

      // Guardar token en Supabase
      await updateOrder(SUPABASE_URL, SUPABASE_KEY, orderId, {
        token: token,
        status: "approved",
        estado: "habilitado",
        fecha_aprobacion: new Date().toISOString(),
      });

      return {
        statusCode: 200,
        headers: cors(),
        body: JSON.stringify({ ok: true, token }),
      };
    } catch (e: any) {
      return {
        statusCode: 500,
        headers: cors(),
        body: JSON.stringify({ error: "Error habilitando B2B: " + e.message }),
      };
    }
  }

  // ── DELETE ──
  if (action === "delete") {
    if (!orderId)
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({ error: "orderId requerido" }),
      };
    try {
      await deleteOrder(SUPABASE_URL, SUPABASE_KEY, orderId);
      return {
        statusCode: 200,
        headers: cors(),
        body: JSON.stringify({ ok: true }),
      };
    } catch (e: any) {
      return {
        statusCode: 500,
        headers: cors(),
        body: JSON.stringify({ error: "Error eliminando" }),
      };
    }
  }

  return {
    statusCode: 400,
    headers: cors(),
    body: JSON.stringify({ error: "Acción desconocida" }),
  };
};

export { handler };
