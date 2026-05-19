import { Resend } from "resend";
import type { ContactInquiry } from "@/lib/contact-schema";
import { serverEnv } from "@/lib/env";

type SendResult = { ok: true } | { ok: false; reason: string };

let cachedClient: Resend | null = null;

function client(): Resend {
  if (cachedClient) return cachedClient;
  cachedClient = new Resend(serverEnv().RESEND_API_KEY);
  return cachedClient;
}

type ContactPayload = Omit<ContactInquiry, "website" | "turnstileToken">;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSubject(p: ContactPayload): string {
  return `[FREOLI HP] ${p.category}: ${p.name} 様より`;
}

function buildText(p: ContactPayload): string {
  return [
    "FREOLI 公式サイトの問い合わせフォーム経由でメッセージを受信しました。",
    "",
    `お名前   : ${p.name}`,
    `メアド   : ${p.email}`,
    `用件種別 : ${p.category}`,
    "",
    "── 本文 ──",
    p.body,
    "──────",
    "",
    "返信は通常メールでこのアドレス宛に行ってください。",
  ].join("\n");
}

function buildHtml(p: ContactPayload): string {
  const bodyHtml = escapeHtml(p.body).replace(/\n/g, "<br>");
  return [
    "<p>FREOLI 公式サイトの問い合わせフォーム経由でメッセージを受信しました。</p>",
    "<table>",
    `<tr><th align="left">お名前</th><td>${escapeHtml(p.name)}</td></tr>`,
    `<tr><th align="left">メアド</th><td>${escapeHtml(p.email)}</td></tr>`,
    `<tr><th align="left">用件種別</th><td>${escapeHtml(p.category)}</td></tr>`,
    "</table>",
    "<hr>",
    `<p>${bodyHtml}</p>`,
  ].join("");
}

export async function sendContactEmail(p: ContactPayload): Promise<SendResult> {
  const env = serverEnv();
  try {
    const { error } = await client().emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      replyTo: p.email,
      subject: buildSubject(p),
      text: buildText(p),
      html: buildHtml(p),
    });
    if (error) {
      return { ok: false, reason: error.name ?? "resend-error" };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "resend-throw" };
  }
}
