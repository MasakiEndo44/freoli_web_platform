"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ContactInquirySchema, type ContactInquiry } from "@/lib/contact-schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";

const CATEGORIES: ContactInquiry["category"][] = [
  "出演依頼",
  "取材・メディア",
  "コラボ",
  "ファン感想",
  "その他",
];

const FALLBACK_EMAIL = "freoli.official@gmail.com";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type FormState = {
  name: string;
  email: string;
  category: ContactInquiry["category"];
  body: string;
  website: string;
  agreeToPrivacy: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  category: "出演依頼",
  body: "",
  website: "",
  agreeToPrivacy: false,
};

type FieldErrors = Partial<Record<keyof ContactInquiry, string[]>>;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [token, setToken] = useState<string>("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetChallenge() {
    setToken("");
    turnstileRef.current?.reset();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = { ...form, turnstileToken: token };
    const result = ContactInquirySchema.safeParse(payload);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });

    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.data),
      });
    } catch {
      resetChallenge();
      setStatus({
        kind: "error",
        message: "ネットワーク接続を確認のうえ、下記メールから直接ご連絡ください。",
      });
      return;
    }

    if (res.ok) {
      setStatus({ kind: "success" });
      setForm(initialState);
      resetChallenge();
      return;
    }

    resetChallenge();
    const message =
      res.status === 400
        ? "入力内容または認証が無効でした。お手数ですが下記メールから直接ご連絡ください。"
        : "送信に失敗しました。お手数ですが下記メールから直接ご連絡ください。";
    setStatus({ kind: "error", message });
  }

  const submitting = status.kind === "submitting";

  return (
    <SectionContainer id="contact" className="bg-zinc-950">
      <Heading variant="h2" className="mb-8">
        CONTACT
      </Heading>

      {status.kind === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-zinc-900 border border-emerald-400 text-emerald-300 p-6 rounded-md font-jp"
        >
          <p className="font-bold text-zinc-50 mb-2">送信ありがとうございました</p>
          <p className="text-sm text-zinc-400">
            内容を確認のうえ、担当者が返信いたします。
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input
            id="contact-name"
            label="お名前"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            autoComplete="name"
            error={errors.name?.[0]}
          />
          <Input
            id="contact-email"
            label="メールアドレス"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            autoComplete="email"
            error={errors.email?.[0]}
          />
          <div>
            <label
              htmlFor="contact-category"
              className="font-jp text-sm font-medium text-zinc-50 mb-2 block"
            >
              お問い合わせ種別
            </label>
            <select
              id="contact-category"
              value={form.category}
              onChange={(e) =>
                update("category", e.target.value as ContactInquiry["category"])
              }
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-50 rounded-md px-4 py-3 h-12 focus:outline-none focus:border-cyan-400 transition-colors duration-150"
              aria-invalid={errors.category ? true : undefined}
              aria-describedby={
                errors.category ? "contact-category-error" : undefined
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category?.[0] ? (
              <p id="contact-category-error" className="text-sm text-red-400 mt-1">
                {errors.category[0]}
              </p>
            ) : null}
          </div>
          <Input
            id="contact-body"
            label="お問い合わせ内容"
            type="textarea"
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            required
            hint="10〜2000 文字でご記入ください"
            error={errors.body?.[0]}
          />

          <div className="sr-only" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </div>

          {TURNSTILE_SITE_KEY ? (
            <div>
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={setToken}
                onError={() => setToken("")}
                onExpire={() => setToken("")}
                options={{ theme: "dark" }}
              />
              {errors.turnstileToken?.[0] ? (
                <p className="text-sm text-red-400 mt-1">
                  {errors.turnstileToken[0]}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-amber-300">
              [設定エラー] NEXT_PUBLIC_TURNSTILE_SITE_KEY が未設定です。
            </p>
          )}

          {status.kind === "error" ? (
            <div
              role="alert"
              className="bg-zinc-900 border border-red-400 text-red-300 p-4 rounded-md font-jp text-sm"
            >
              <p className="mb-2">{status.message}</p>
              <a
                href={`mailto:${FALLBACK_EMAIL}`}
                className="underline text-cyan-400 hover:text-cyan-300"
              >
                {FALLBACK_EMAIL}
              </a>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="contact-agree-privacy"
              className="flex items-start gap-3 cursor-pointer font-jp text-sm text-zinc-300"
            >
              <input
                id="contact-agree-privacy"
                type="checkbox"
                checked={form.agreeToPrivacy}
                onChange={(e) => update("agreeToPrivacy", e.target.checked)}
                required
                aria-invalid={errors.agreeToPrivacy ? true : undefined}
                aria-describedby={
                  errors.agreeToPrivacy ? "contact-agree-privacy-error" : undefined
                }
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-cyan-400 bg-zinc-900 border border-zinc-800"
              />
              <span>
                <Link
                  href="/privacy"
                  className="underline text-cyan-400 hover:text-cyan-300"
                >
                  プライバシーポリシー
                </Link>
                に同意する
              </span>
            </label>
            {errors.agreeToPrivacy?.[0] ? (
              <p id="contact-agree-privacy-error" className="text-sm text-red-400 mt-1">
                {errors.agreeToPrivacy[0]}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="self-start"
            disabled={submitting || !token || !form.agreeToPrivacy}
          >
            {submitting ? "送信中..." : "送信する"}
          </Button>
        </form>
      )}
    </SectionContainer>
  );
}
