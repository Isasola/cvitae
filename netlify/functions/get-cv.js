// netlify/functions/get-cv.js
// Retorna un CV por ID — usado por cv.html (página pública del cliente)

const { getStore } = require("@netlify/blobs");

function cors() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors(), body: "" };
  }
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers: cors(), body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const id = event.queryStringParameters?.id;
  if (!id || !/^[a-z0-9]+$/.test(id)) {
    return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "ID inválido" }) };
  }

  try {
    const store = getStore("cvitae-orders");
    const order = await store.get(id, { type: "json" });

    if (!order) {
      return { statusCode: 404, headers: cors(), body: JSON.stringify({ error: "CV no encontrado" }) };
    }

    // Solo exponer lo necesario para mostrar el CV (sin datos internos)
    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({
        name: order.name,
        profession: order.profession,
        job: order.job,
        format: order.format,
        cvHtml: order.cvHtml,
        status: order.status,
      }),
    };
  } catch (err) {
    console.error("get-cv error:", err);
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "Error del servidor" }) };
  }
};
