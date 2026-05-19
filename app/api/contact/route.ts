import { NextResponse, type NextRequest } from "next/server";
import { ContactInquirySchema } from "@/lib/contact-schema";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendContactEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ApiSuccess = { ok: true };
type ApiFailure = { ok: false; error: "invalid" | "challenge" | "send" };

function failure(code: ApiFailure["error"], status: number) {
  return NextResponse.json<ApiFailure>({ ok: false, error: code }, { status });
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return failure("invalid", 400);
  }

  const parsed = ContactInquirySchema.safeParse(raw);
  if (!parsed.success) {
    return failure("invalid", 400);
  }

  if (parsed.data.website.length > 0) {
    return failure("invalid", 400);
  }

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  const turnstile = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!turnstile.ok) {
    return failure("challenge", 400);
  }

  const sent = await sendContactEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    category: parsed.data.category,
    body: parsed.data.body,
  });
  if (!sent.ok) {
    return failure("send", 502);
  }

  return NextResponse.json<ApiSuccess>({ ok: true }, { status: 200 });
}
