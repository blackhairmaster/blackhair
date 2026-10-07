/**
 * Serverless endpoint — POST /api/contact
 *
 * Works out of the box on Vercel (api/ folder) and similar platforms
 * (Netlify/Cloudflare: point the function to the same file or use a proxy).
 *
 * Environment variables (see .env.example):
 *   CONTACT_EMAIL   — where the message is delivered
 *   RESEND_API_KEY  — https://resend.com API key (server-side only!)
 *   CONTACT_FROM    — optional "Name <onboarding@resend.dev>"
 *
 * The API key is read on the server only — it never reaches the browser.
 */

type ContactPayload = {
  name?: string;
  contact?: string;
  message?: string;
};

type ApiResponse = {
  status: number;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type ApiRequest = {
  method?: string;
  body?: ContactPayload | string;
};

const MAX_LENGTHS = { name: 120, contact: 200, message: 3000 };

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body: ContactPayload =
      typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});

    const name = String(body.name ?? "").trim();
    const contact = String(body.contact ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (
      name.length < 2 ||
      contact.length < 5 ||
      message.length < 5 ||
      name.length > MAX_LENGTHS.name ||
      contact.length > MAX_LENGTHS.contact ||
      message.length > MAX_LENGTHS.message
    ) {
      return res.status(400).json({ ok: false, error: "Invalid payload" });
    }

    const to = process.env.CONTACT_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!to || !apiKey) {
      console.error("[contact] Missing CONTACT_EMAIL or RESEND_API_KEY");
      return res.status(500).json({ ok: false, error: "Server is not configured" });
    }

    const from =
      process.env.CONTACT_FROM ?? "Website Form <onboarding@resend.dev>";

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: isValidEmail(contact) ? contact : undefined,
        subject: `Новая заявка с сайта — ${name}`,
        text: [
          `Имя: ${name}`,
          `Контакт: ${contact}`,
          "",
          "Сообщение:",
          message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("[contact] Resend error:", details);
      return res.status(502).json({ ok: false, error: "Email provider error" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return res.status(500).json({ ok: false, error: "Unexpected error" });
  }
}
