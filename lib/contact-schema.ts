import { z } from "zod";

export const ContactInquirySchema = z.object({
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .max(100, "100 文字以内で入力してください"),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  category: z.enum(
    ["出演依頼", "取材・メディア", "コラボ", "ファン感想", "その他"],
    { message: "お問い合わせ種別を選択してください" },
  ),
  body: z
    .string()
    .min(10, "10 文字以上で入力してください")
    .max(2000, "2000 文字以内で入力してください"),
  website: z.string().max(0),
  turnstileToken: z.string().min(1, "認証トークンが無効です"),
  agreeToPrivacy: z.literal(true, {
    message: "プライバシーポリシーへの同意が必要です",
  }),
});

export type ContactInquiry = z.infer<typeof ContactInquirySchema>;
