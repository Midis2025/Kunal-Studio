"use server";

import { headers } from "next/headers";
import { studio } from "@/data/studio";
import { validateInquiry, type Inquiry, type InquiryField, type InquiryState } from "@/lib/inquiry";

const FIELDS: InquiryField[] = ["names", "email", "phone", "eventDate", "location", "weddingType", "guests", "coverage", "source", "message"];

// Best-effort, per-instance rate limit (5 enquiries / 10 min / IP). For multi-instance
// hosting, back this with a shared store (e.g. Upstash / Vercel KV).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function deliver(v: Inquiry) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? studio.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Studio Kunal Website <enquiries@studiokunalphotography.com>";
  const rows = FIELDS.map((k) => `<tr><td style="padding:6px 16px 6px 0;color:#5f5a52;vertical-align:top">${k}</td><td style="padding:6px 0">${esc(v[k] || "—").replace(/\n/g, "<br>")}</td></tr>`).join("");

  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] RESEND_API_KEY not set — logging instead of sending:\n", v);
      return true;
    }
    console.error("[enquiry] RESEND_API_KEY missing in production; enquiry not delivered.");
    return false;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: v.email,
      subject: `New enquiry — ${v.names} · ${v.eventDate} · ${v.location}`,
      html: `<h2 style="font-family:Georgia,serif;font-weight:400">New enquiry from the website</h2><table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
    }),
  });
  if (!res.ok) console.error("[enquiry] Resend error", res.status, await res.text().catch(() => ""));
  return res.ok;
}

export async function submitInquiry(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  const values = Object.fromEntries(FIELDS.map((k) => [k, String(form.get(k) ?? "").trim()])) as Inquiry;

  // Spam traps: a hidden field humans never fill, and a minimum time-on-form.
  const honeypot = String(form.get("company") ?? "");
  const started = Number(form.get("t") ?? 0);
  if (honeypot || !started || Date.now() - started < 3000) {
    // Pretend success so bots learn nothing.
    return { status: "success", names: values.names || "there" };
  }

  const errors = validateInquiry(values);
  if (Object.keys(errors).length) {
    return { status: "error", message: "A few details need another look.", errors, values };
  }

  // Only well-formed enquiries count toward the limit, so fixing typos never locks anyone out.
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "local";
  if (limited(ip)) {
    return { status: "error", message: "We've received several enquiries from you already — we'll be in touch soon.", errors: {}, values };
  }

  const ok = await deliver(values).catch((e) => {
    console.error("[enquiry] delivery failed", e);
    return false;
  });
  if (!ok) {
    return {
      status: "error",
      message: `Something went wrong sending your enquiry. Please try again, or email us directly at ${studio.email}.`,
      errors: {},
      values,
    };
  }
  return { status: "success", names: values.names };
}
