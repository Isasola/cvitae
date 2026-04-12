import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { password } = JSON.parse(event.body || "{}");
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASSWORD) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Admin password not configured on server" }),
      };
    }

    if (password === ADMIN_PASSWORD) {
      return {
        statusCode: 200,
        body: JSON.stringify({ authenticated: true, message: "Authentication successful" }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ authenticated: false, error: "Invalid password" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }
};
