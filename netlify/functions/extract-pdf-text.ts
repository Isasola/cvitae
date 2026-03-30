import { Handler } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

// Extracción nativa de texto PDF — sin librerías externas
function extractTextNative(buffer: Buffer): string {
  try {
    const content = buffer.toString("binary");
    const results: string[] = [];
    const tjRegex = /\(([^()\\]*(?:\\.[^()\\]*)*)\)\s*Tj/g;
    const tjArrayRegex = /\[([^\]]*)\]\s*TJ/g;
    let match;
    while ((match = tjRegex.exec(content)) !== null) {
      const text = match[1]
        .replace(/\\n/g, " ").replace(/\\r/g, " ")
        .replace(/\\t/g, " ").replace(/\\\(/g, "(")
        .replace(/\\\)/g, ")").replace(/\\\\/g, "\\").trim();
      if (text.length > 0) results.push(text);
    }
    while ((match = tjArrayRegex.exec(content)) !== null) {
      const inner = match[1];
      const strRegex = /\(([^()\\]*(?:\\.[^()\\]*)*)\)/g;
      let sm;
      while ((sm = strRegex.exec(inner)) !== null) {
        const text = sm[1].trim();
        if (text.length > 0) results.push(text);
      }
    }
    return results.join(" ").replace(/\s+/g, " ").trim();
  } catch {
    return "";
  }
}

// OCR via Claude Vision — para PDFs escaneados (imágenes)
async function extractTextViaOCR(
  buffer: Buffer,
  apiKey: string
): Promise<string> {
  const client = new Anthropic({ apiKey });
  const base64 = buffer.toString("base64");

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: base64,
            },
          },
          {
            type: "text",
            text: "Este es un CV en PDF. Extraé todo el texto que puedas leer: nombre, experiencia, educación, habilidades, contacto. Devolvé solo el texto extraído, sin comentarios ni formato extra.",
          },
        ],
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";
  return text.trim();
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { pdfBase64, fileName } = JSON.parse(event.body || "{}");

    if (!pdfBase64 || typeof pdfBase64 !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Se requiere el archivo en base64" }),
      };
    }

    const buffer = Buffer.from(pdfBase64, "base64");
    const name = (fileName || "document").toLowerCase().trim();
    let extractedText = "";
    let method = "native";

    if (name.endsWith(".docx") || name.endsWith(".doc")) {
      // DOCX con mammoth
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value || "";
      method = "mammoth";
    } else {
      // PDF: primero intento nativo
      extractedText = extractTextNative(buffer);

      // Si el texto nativo es muy corto, es PDF escaneado → OCR con Claude
      if (extractedText.length < 50) {
        console.log("[extract] Texto nativo insuficiente, usando OCR via Claude Vision");
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return {
            statusCode: 500,
            body: JSON.stringify({
              success: false,
              error: "API key no configurada para OCR",
            }),
          };
        }
        try {
          extractedText = await extractTextViaOCR(buffer, apiKey);
          method = "ocr";
        } catch (ocrErr) {
          console.error("[extract] OCR falló:", ocrErr);
          // Si OCR también falla, devolver error claro
          return {
            statusCode: 400,
            body: JSON.stringify({
              success: false,
              error: "No se pudo leer el archivo",
              details:
                "El PDF parece ser una imagen de baja calidad. Por favor usá un PDF con texto o una foto clara.",
            }),
          };
        }
      }
    }

    const cleaned = extractedText.replace(/\s+/g, " ").trim();

    if (!cleaned || cleaned.length < 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "No se pudo extraer texto del archivo",
          details: "Intentá con un PDF diferente o contactá soporte.",
        }),
      };
    }

    console.log(`[extract] OK — método: ${method}, chars: ${cleaned.length}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        text: cleaned,
        charCount: cleaned.length,
        method,
        fileName: fileName || "document",
        extractedAt: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error("[extract] Error global:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Error al procesar el archivo",
        details: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};

export { handler };
