"use client";

import { useState, type FormEvent } from "react";
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

type FormState = {
  name: string;
  email: string;
  category: ContactInquiry["category"];
  body: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  category: "出演依頼",
  body: "",
  website: "",
};

type FieldErrors = Partial<Record<keyof ContactInquiry, string[]>>;

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = {
      ...form,
      turnstileToken: "v0.1-stub",
    };
    const result = ContactInquirySchema.safeParse(payload);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }
    setErrors({});
    console.log("[v0.1 stub] ContactInquiry", result.data);
    setSubmitted(true);
  }

  return (
    <SectionContainer id="contact" className="bg-zinc-950">
      <Heading variant="eyebrow" className="block mb-3">
        — CONTACT
      </Heading>
      <Heading variant="h2" className="mb-8">
        お問い合わせ
      </Heading>

      <div
        role="note"
        className="bg-amber-500/10 border border-amber-400 text-amber-300 p-4 mb-4 font-jp text-sm"
      >
        <strong className="font-bold">[v0.1 暫定]</strong>{" "}
        v0.1 暫定実装：実際にはメールは送信されません。本実装は別 PR で対応します。
      </div>

      {submitted ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-zinc-900 border border-emerald-400 text-emerald-300 p-6 rounded-md font-jp"
        >
          <p className="font-bold text-zinc-50 mb-2">
            送信内容を受け付けました（暫定）
          </p>
          <p className="text-sm text-zinc-400">
            v0.1 では Console に内容を出力するのみです。実送信は次の PR で実装します。
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

          <Button type="submit" variant="primary" className="self-start">
            送信する
          </Button>
        </form>
      )}
    </SectionContainer>
  );
}
