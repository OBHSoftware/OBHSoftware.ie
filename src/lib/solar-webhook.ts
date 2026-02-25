/**
 * Solar Webhook — Form-to-Board Integration
 *
 * Builds the issue payload client-side and sends it to /api/contact,
 * a Vercel serverless function that proxies to Solar (avoids CORS).
 *
 * Server-side environment variables (set in Vercel, NOT prefixed with VITE_):
 *   SOLAR_WEBHOOK_URL      — Solar webhook endpoint
 *   SOLAR_WEBHOOK_TOKEN    — Bearer token for auth
 *
 * Client-side environment variables (prefixed with VITE_ for Vite):
 *   VITE_SOLAR_QUEUE_ID         — Fallback queue for all form types
 *   VITE_SOLAR_QUEUE_ID_CONTACT — Queue for contact submissions
 *   VITE_SOLAR_QUEUE_ID_DEMO    — Queue for demo requests & pricing inquiries
 *   VITE_SOLAR_QUEUE_ID_SUPPORT — Queue for support requests
 */

export type FormType = "contact" | "demo-request" | "support" | "pricing";

interface SolarSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  formType?: FormType;
}

export async function submitToSolar({
  name,
  email,
  company,
  phone,
  message,
  formType = "contact",
}: SolarSubmission) {
  // Queue routing — specific queues fall back to the generic QUEUE_ID
  const queueId =
    {
      contact: import.meta.env.VITE_SOLAR_QUEUE_ID_CONTACT,
      "demo-request": import.meta.env.VITE_SOLAR_QUEUE_ID_DEMO,
      support: import.meta.env.VITE_SOLAR_QUEUE_ID_SUPPORT,
      pricing: import.meta.env.VITE_SOLAR_QUEUE_ID_DEMO,
    }[formType] || import.meta.env.VITE_SOLAR_QUEUE_ID;

  // Issue title
  const title =
    {
      contact: `Contact Form: ${name}`,
      "demo-request": `Demo Request: ${company || name}`,
      support: `Support Request: ${name}`,
      pricing: `Pricing Inquiry: ${company || name}`,
    }[formType] || `Website Inquiry: ${name}`;

  // Structured markdown body
  const description = [
    `## ${formType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Submission`,
    "",
    `**Name:** ${name}`,
    `**Email:** ${email}`,
    company && `**Company:** ${company}`,
    phone && `**Phone:** ${phone}`,
    "",
    "---",
    "",
    "### Message",
    "",
    message,
    "",
    "---",
    "",
    `*Submitted via webhook — ${new Date().toISOString()}*`,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      type: "task",
      priority: formType === "support" ? "high" : "medium",
      source: "webhook-integration",
      ...(queueId && { queueId }),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      (error as { message?: string }).message ||
        `Solar webhook failed (${response.status})`
    );
  }

  return response.json();
}
