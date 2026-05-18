import { z } from "zod";

const EnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  TURNSTILE_SITE_KEY: z.string().min(1),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  CONTACT_EMAIL_TO: z.string().email().default("freoli.official@gmail.com"),
});

export const env = EnvSchema.parse(process.env);
