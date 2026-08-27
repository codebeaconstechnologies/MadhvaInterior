/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives the contact form submission from the browser, validates and
 * sanitizes it server-side, then sends a formatted enquiry email via the
 * Resend API. The Resend API key never reaches the client — it is read
 * here from a Cloudflare Pages secret (RESEND_API_KEY).
 *
 * Required environment variables / secrets (see README for setup):
 *   RESEND_API_KEY   - secret, from resend.com
 *   CONTACT_EMAIL    - the studio inbox that receives enquiries
 *   FROM_EMAIL       - verified sender address/domain in Resend
 *
 * Optional bindings:
 *   RATE_LIMIT_KV    - a Workers KV namespace used for basic per-IP rate
 *                       limiting. If not bound, rate limiting is skipped
 *                       (the endpoint still works, just without this layer).
 */

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
  FROM_EMAIL: string;
  RATE_LIMIT_KV?: KVNamespace;
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  location?: string;
  budget?: string;
  contactMethod?: string;
  message: string;
  company?: string; // honeypot
}

const MAX_BODY_BYTES = 20_000;
const MAX_FIELD_LENGTH = 2_000;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 10; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value: unknown, maxLength = MAX_FIELD_LENGTH): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidPayload(payload: ContactPayload): string | null {
  if (!payload.name) return "Name is required.";
  if (!payload.email || !EMAIL_RE.test(payload.email)) return "A valid email is required.";
  if (!payload.message) return "Message is required.";
  return null;
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  if (!env.RATE_LIMIT_KV) return true; // no binding configured — skip

  const key = `contact:${ip}`;
  const raw = await env.RATE_LIMIT_KV.get(key);
  const count = raw ? parseInt(raw, 10) : 0;

  if (count >= RATE_LIMIT_MAX_REQUESTS) return false;

  await env.RATE_LIMIT_KV.put(key, String(count + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
  });
  return true;
}

function buildEmailHtml(payload: ContactPayload): string {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Project Type", payload.projectType || "—"],
    ["Project Location", payload.location || "—"],
    ["Budget", payload.budget || "—"],
    ["Preferred Contact Method", payload.contactMethod || "—"],
    ["Submitted", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e6dcc9;color:#7c6f60;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;white-space:nowrap;">${escapeHtml(
            label
          )}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e6dcc9;color:#211a15;font-size:15px;">${escapeHtml(
            value
          )}</td>
        </tr>`
    )
    .join("");

  return `
  <div style="background:#faf7f1;padding:32px 16px;font-family:Georgia,serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6dcc9;">
      <tr>
        <td style="background:#1a1410;padding:28px 32px;">
          <span style="color:#d8b877;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Madhva Interiors &amp; Design Studio</span>
          <h1 style="color:#f3ece1;font-family:Georgia,serif;font-weight:400;font-size:22px;margin:8px 0 0;">New Website Enquiry</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 16px 8px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;font-family:Arial,sans-serif;">
            ${rowsHtml}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 32px 32px;">
          <p style="color:#7c6f60;font-family:Arial,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;margin:16px 0 8px;">Message</p>
          <p style="color:#211a15;font-family:Georgia,serif;font-size:16px;line-height:1.6;white-space:pre-wrap;margin:0;">${escapeHtml(
            payload.message
          )}</p>
        </td>
      </tr>
    </table>
  </div>`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Unsupported content type." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: "Payload too large." }, 413);
  }

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const withinLimit = await checkRateLimit(env, ip);
  if (!withinLimit) {
    return jsonResponse(
      { error: "Too many requests. Please try again later." },
      429
    );
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  // Honeypot: bots that fill hidden fields are silently accepted-but-dropped
  // so as not to teach them the field was rejected.
  if (clean(raw.company)) {
    return jsonResponse({ ok: true }, 200);
  }

  const payload: ContactPayload = {
    name: clean(raw.name, 200),
    email: clean(raw.email, 200),
    phone: clean(raw.phone, 40),
    projectType: clean(raw.projectType, 60),
    location: clean(raw.location, 200),
    budget: clean(raw.budget, 60),
    contactMethod: clean(raw.contactMethod, 40),
    message: clean(raw.message, MAX_FIELD_LENGTH),
  };

  const validationError = isValidPayload(payload);
  if (validationError) {
    return jsonResponse({ error: validationError }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL || !env.FROM_EMAIL) {
    console.error("Missing Resend configuration (RESEND_API_KEY / CONTACT_EMAIL / FROM_EMAIL).");
    return jsonResponse(
      { error: "The enquiry form is temporarily unavailable. Please email us directly." },
      500
    );
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [env.CONTACT_EMAIL],
        reply_to: payload.email,
        subject: `New Website Enquiry — ${payload.name}`,
        html: buildEmailHtml(payload),
      }),
    });

    if (!resendRes.ok) {
      const errorBody = await resendRes.text();
      console.error("Resend API error:", resendRes.status, errorBody);
      return jsonResponse(
        { error: "Something went wrong while sending your enquiry." },
        502
      );
    }
  } catch (err) {
    console.error("Failed to reach Resend API:", err);
    return jsonResponse(
      { error: "Something went wrong while sending your enquiry." },
      502
    );
  }

  return jsonResponse({ ok: true }, 200);
};

export const onRequestGet: PagesFunction = async () => {
  return jsonResponse({ error: "Method not allowed." }, 405);
};
