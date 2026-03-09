// netlify/functions/admin.js
// Panel admin — listar pedidos y aprobar/enviar CV por email via EmailJS

const { getStore } = require("@netlify/blobs");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cvitae2026admin";
const EMAILJS_SERVICE_ID = "service_muvlq14";
const EMAILJS_TEMPLATE_ID = "template_i94qkza";
const EMAILJS_PUBLIC_KEY = "CZy-kIlMnZIBxjh15";
const SITE_URL = "https://cvitaepy.netlify.app";

function cors() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": SITE_URL,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function ok(data) {
  return { statusCode: 200, headers: cors(), body: JSON.stringify(data) };
}
function err(code, msg) {
  return { statusCode: code, headers: cors(), body: JSON.stringify({ error: msg }) };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors(), body: "" };
  if (event.httpMethod !== "POST") return err(405, "Method not allowed");

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch { return err(400, "JSON inválido"); }

  const { password, action, orderId } = body;

  if (password !== ADMIN_PASSWORD) {
    return err(401, "Contraseña incorrecta");
  }

  const store = getStore("cvitae-orders");

  // ── LISTAR pedidos ──────────────────────────────────────────
  if (action === "list") {
    try {
      const { blobs } = await store.list();
      const orders = await Promise.all(
        blobs.map(async (b) => {
          const o = await store.get(b.key, { type: "json" });
          return o ? {
            id: o.id,
            name: o.name,
            email: o.email,
            profession: o.profession,
            job: o.job,
            plan: o.plan,
            format: o.format,
            status: o.status,
            createdAt: o.createdAt,
          } : null;
        })
      );
      const sorted = orders
        .filter(Boolean)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return ok({ orders: sorted });
    } catch (e) {
      console.error("list error:", e);
      return err(500, "Error listando pedidos");
    }
  }

  // ── APROBAR y ENVIAR email ──────────────────────────────────
  if (action === "approve") {
    if (!orderId) return err(400, "orderId requerido");

    let order;
    try {
      order = await store.get(orderId, { type: "json" });
    } catch {
      return err(404, "Pedido no encontrado");
    }
    if (!order) return err(404, "Pedido no encontrado");
    if (order.status === "sent") return err(409, "Este CV ya fue enviado");

    const cvLink = `${SITE_URL}/cv.html?id=${order.id}`;
    const planLabel = order.plan === "pro" ? "Portafolio Web" : "CV Digital";

    // Enviar email via EmailJS REST API
    const emailPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        to_name: order.name,
        to_email: order.email,
        cv_link: cvLink,
        profession: order.profession,
        job: order.job,
        plan_label: planLabel,
        reply_to: "cpdparaguay@gmail.com",
      },
    };

    try {
      const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error("EmailJS error:", errText);
        return err(502, "Error enviando email: " + errText);
      }
    } catch (e) {
      console.error("fetch EmailJS error:", e);
      return err(502, "No se pudo conectar con EmailJS");
    }

    // Actualizar estado en Blobs
    order.status = "sent";
    order.approvedAt = new Date().toISOString();
    order.sentAt = new Date().toISOString();
    await store.setJSON(orderId, order);

    return ok({ ok: true, message: `Email enviado a ${order.email}`, cvLink });
  }

  // ── ELIMINAR pedido ─────────────────────────────────────────
  if (action === "delete") {
    if (!orderId) return err(400, "orderId requerido");
    try {
      await store.delete(orderId);
      return ok({ ok: true });
    } catch (e) {
      return err(500, "Error eliminando");
    }
  }

  return err(400, "Acción desconocida");
};
