import { z } from "zod";

const ServerEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  CONTACT_EMAIL_TO: z.string().email().default("freoli.official@gmail.com"),
  CONTACT_EMAIL_FROM: z
    .string()
    .min(1)
    .default("FREOLI Contact <onboarding@resend.dev>"),
});

let cachedServerEnv: z.infer<typeof ServerEnvSchema> | null = null;

export function serverEnv(): z.infer<typeof ServerEnvSchema> {
  if (cachedServerEnv) return cachedServerEnv;
  cachedServerEnv = ServerEnvSchema.parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
    CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM,
  });
  return cachedServerEnv;
}
