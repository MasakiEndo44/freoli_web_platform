import type { Metadata } from "next";
import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "プライバシーポリシー | FREOLI",
  description:
    "FREOLI 公式 Web プラットフォームにおける個人情報の取扱いについて。問い合わせフォームで取得する情報の利用目的・保持期間・削除手順を記載しています。",
  robots: { index: true, follow: true },
};

const CONTACT_EMAIL = "freoli.official@gmail.com";
const LAST_UPDATED = "2026-05-20";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <SectionContainer className="bg-zinc-950">
        <Heading variant="eyebrow" className="block mb-3">
          — PRIVACY POLICY
        </Heading>
        <Heading variant="h2" className="mb-2">
          プライバシーポリシー
        </Heading>
        <p className="font-jp text-sm text-zinc-400 mb-12">
          最終更新日：{LAST_UPDATED}
        </p>

        <div className="flex flex-col gap-10 font-jp text-base text-zinc-200 leading-relaxed">
          <section aria-labelledby="privacy-intro">
            <p>
              FREOLI（以下「当バンド」）は、公式 Web プラットフォーム（
              <span className="text-zinc-400">freoli.vercel.app</span>
              ）の利用者から取得する個人情報を、本ポリシーに基づき適切に取り扱います。
              本ポリシーの対象範囲は本サイト上で取得する情報に限られ、各 SNS（Instagram / YouTube / TikTok / X）のプライバシー方針は各プラットフォームに従います。
            </p>
          </section>

          <section aria-labelledby="privacy-collect">
            <Heading variant="h3" id="privacy-collect" className="mb-3">
              1. 取得する情報
            </Heading>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>問い合わせフォームでの送信者氏名</li>
              <li>問い合わせフォームでの連絡用メールアドレス</li>
              <li>問い合わせフォームでの問い合わせ内容（用件カテゴリ・本文）</li>
            </ul>
            <p className="mt-3 text-sm text-zinc-400">
              上記以外の情報（IP アドレスの永続的記録、Cookie による行動追跡、第三者広告配信用 ID 等）は取得しません。
            </p>
          </section>

          <section aria-labelledby="privacy-purpose">
            <Heading variant="h3" id="privacy-purpose" className="mb-3">
              2. 利用目的
            </Heading>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>問い合わせへの返信</li>
              <li>出演依頼・取材依頼・コラボ依頼への対応</li>
              <li>ファンからの感想に対する確認・お礼</li>
            </ul>
            <p className="mt-3 text-sm text-zinc-400">
              取得した情報は、上記目的の範囲外では利用しません。
            </p>
          </section>

          <section aria-labelledby="privacy-retention">
            <Heading variant="h3" id="privacy-retention" className="mb-3">
              3. 保持期間
            </Heading>
            <p>
              問い合わせ対応完了後、<span className="text-zinc-50 font-semibold">1 年間</span>
              で削除します。継続的なやり取りが必要な案件については、案件終了後 1 年で削除します。
            </p>
          </section>

          <section aria-labelledby="privacy-third-party">
            <Heading variant="h3" id="privacy-third-party" className="mb-3">
              4. 第三者提供
            </Heading>
            <p>個人情報を第三者に提供することは一切ありません。</p>
            <p className="mt-3 text-sm text-zinc-400">
              ただし、フォーム送信処理には{" "}
              <a
                href="https://resend.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-cyan-400 hover:text-cyan-300"
              >
                Resend
              </a>
              （メール送信サービス）を利用しており、送信データは Resend のインフラを経由します。Resend は当バンドが指定する宛先へメールを送信する目的でのみデータを処理し、第三者への提供は行いません。
            </p>
          </section>

          <section aria-labelledby="privacy-analytics">
            <Heading variant="h3" id="privacy-analytics" className="mb-3">
              5. 解析ツール
            </Heading>
            <p>
              本サイトでは{" "}
              <a
                href="https://vercel.com/docs/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-cyan-400 hover:text-cyan-300"
              >
                Vercel Analytics
              </a>
              （Cookieless、個人特定不可）を利用してアクセス傾向を計測することがあります。個人を識別する情報は収集しません。
            </p>
          </section>

          <section aria-labelledby="privacy-bot-prevention">
            <Heading variant="h3" id="privacy-bot-prevention" className="mb-3">
              6. スパム対策
            </Heading>
            <p>
              問い合わせフォームでは、bot による自動送信を防ぐため{" "}
              <a
                href="https://www.cloudflare.com/products/turnstile/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-cyan-400 hover:text-cyan-300"
              >
                Cloudflare Turnstile
              </a>
              を利用しています。Turnstile は Cookie を使用せず、個人を識別する情報を当バンドに提供しません。
            </p>
          </section>

          <section aria-labelledby="privacy-delete">
            <Heading variant="h3" id="privacy-delete" className="mb-3">
              7. 削除依頼の手段
            </Heading>
            <p>
              取得した情報の削除をご希望の場合は、下記メールアドレスまで「削除希望」の旨をお送りください。
              <span className="text-zinc-50 font-semibold">1 営業日以内</span>
              に対応します。
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline text-cyan-400 hover:text-cyan-300"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section aria-labelledby="privacy-revision">
            <Heading variant="h3" id="privacy-revision" className="mb-3">
              8. 本ポリシーの改定
            </Heading>
            <p>
              法令の変更や運用変更に伴い、本ポリシーは予告なく改定する場合があります。改定後は本ページに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section aria-labelledby="privacy-contact">
            <Heading variant="h3" id="privacy-contact" className="mb-3">
              9. 問い合わせ窓口
            </Heading>
            <p>本ポリシーに関するお問い合わせは下記までお願いいたします。</p>
            <p className="mt-3">
              FREOLI 運営（担当：あのむ／遠藤 真輝）
              <br />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline text-cyan-400 hover:text-cyan-300"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-150"
          >
            ← トップへ戻る
          </Link>
        </div>
      </SectionContainer>
    </main>
  );
}
