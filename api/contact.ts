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
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ message: "Failed to submit" });
  }
}
