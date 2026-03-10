const JSONBIN_KEY = process.env.JSONBIN_KEY;
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID; // lo creamos la primera vez

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
  try { body = JSON.parse(event.body || "{}"); } catch { return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "JSON inválido" }) }; }

  const { name, job, wa, email, plan, cvHtml } = body;
  if (!name || !cvHtml) return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "Faltan datos" }) };

  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const order = { id, name, job, wa, email, plan, cvHtml, status: "pending", createdAt: new Date().toISOString() };

  try {
    // Leer bin actual
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

    // Guardar bin actualizado
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
