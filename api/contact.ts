import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const webhookUrl = process.env.SOLAR_WEBHOOK_URL;
  const webhookToken = process.env.SOLAR_WEBHOOK_TOKEN;

  if (!webhookUrl || !webhookToken) {
    return res.status(500).json({ message: "Webhook not configured" });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${webhookToken}`,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    notifySlack(req.body);
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Failed to submit" });
  }
}

/**
 * Best-effort Slack ping so a new lead doesn't sit unseen in a Solar queue.
 * Solar (above) is the system of record; this is just the nudge. Never lets
 * a Slack failure affect the response to the visitor.
 */
function notifySlack(body: Record<string, unknown>) {
  const slackWebhookUrl = process.env.LEAD_SLACK_WEBHOOK_URL;
  if (!slackWebhookUrl) return;

  const title = typeof body.title === "string" ? body.title : "New lead";
  const description = typeof body.description === "string" ? body.description : "";

  fetch(slackWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `:inbox_tray: *New lead from obhsoftware.ie*\n*${title}*\n${description}`,
    }),
  }).catch(() => {
    // Best-effort only — the lead is already safely in Solar.
  });
}
