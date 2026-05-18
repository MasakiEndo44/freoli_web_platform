import { z } from "zod";

export const ContactInquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  category: z.enum([
    "出演依頼",
    "取材・メディア",
    "コラボ",
    "ファン感想",
    "その他",
  ]),
  body: z.string().min(10).max(2000),
  website: z.string().max(0),
  turnstileToken: z.string().min(1),
});

export type ContactInquiry = z.infer<typeof ContactInquirySchema>;
