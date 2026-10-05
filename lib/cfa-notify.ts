import "server-only";

import type { CFALevelKey } from "@/data/cfa-types";
import { CFA_ADMIN_EMAIL } from "@/lib/cfa-access";
import { getSiteUrl } from "@/lib/site-url";

// Without a verified domain, Resend only delivers to the account owner's own
// address, which is exactly the administrator inbox this is used for.
export async function notifyAdminOfRequest(
  email: string,
  level: CFALevelKey,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set; skipping CFA request email.");
    return;
  }

  const adminUrl = new URL("/cfa/admin", getSiteUrl()).toString();
  const levelLabel = `Level ${level.slice(1)}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CFA_NOTIFY_FROM ?? "CFA Hub <onboarding@resend.dev>",
      to: [CFA_ADMIN_EMAIL],
      subject: `CFA access request: ${email} (${levelLabel})`,
      text: `${email} requested access to ${levelLabel} notes.\n\nReview it here: ${adminUrl}`,
      html: `<p><strong>${escapeHtml(email)}</strong> requested access to <strong>${levelLabel}</strong> notes.</p><p><a href="${adminUrl}">Review the request</a></p>`,
    }),
  });

  if (!response.ok) {
    console.error(
      `Resend rejected the CFA request email: ${response.status} ${await response.text()}`,
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
