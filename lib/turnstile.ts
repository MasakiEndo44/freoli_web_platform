import { serverEnv } from "@/lib/env";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type VerifyResult = { ok: true } | { ok: false; reason: string };

export async function verifyTurnstile(
  token: string,
  remoteIp: string | null,
): Promise<VerifyResult> {
  if (!token) {
    return { ok: false, reason: "missing-token" };
  }

  const params = new URLSearchParams();
  params.set("secret", serverEnv().TURNSTILE_SECRET_KEY);
  params.set("response", token);
  if (remoteIp) params.set("remoteip", remoteIp);

  let res: Response;
  try {
    res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      cache: "no-store",
    });
  } catch {
    return { ok: false, reason: "siteverify-unreachable" };
  }

  if (!res.ok) {
    return { ok: false, reason: `siteverify-http-${res.status}` };
  }

  const data = (await res.json()) as { success?: boolean };
  if (data.success !== true) {
    return { ok: false, reason: "siteverify-rejected" };
  }

  return { ok: true };
}
