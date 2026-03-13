const JSONBIN_KEY = process.env.JSONBIN_KEY;
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID;

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
    const readRes = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      headers: { "X-Master-Key": JSONBIN_KEY }
    });
    if (!readRes.ok) throw new Error("Error leyendo JSONBin");
    const data = await readRes.json();
    const orders = data.record.orders || [];
    const order = orders.find(o => o.id === id);
    if (!order) return { statusCode: 404, headers: cors(), body: JSON.stringify({ error: "CV no encontrado" }) };
    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({
        cvHtml: order.cvHtml,
        name: order.name,
        profession: order.profession || "",
        job: order.job || "",
        cartaHtml: order.cartaHtml || "",
        entrevistaHtml: order.entrevistaHtml || "",
        linkedinText: order.linkedinText || "",
        createdAt: order.createdAt || ""
      })
    };
  } catch (e) {
    console.error("get-cv error:", e);
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Error obteniendo CV" }) };
  }
};
