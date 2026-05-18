---
doc_id: req.freoli_web_platform.engineering
doc_type: engineering_spec
product: freoli_web_platform
layer: S
status: stable
stability: evolving
as_of: 2026-05-18
owners: [endo]
parent_doc: docs/requirements/freoli_web_platform/evals.md
mode: condensed
ai_applicable: false
sources:
  - docs/requirements/freoli_web_platform_system_requirements.md
  - docs/requirements/freoli_web_platform_detailed_requirements_specification.md
  - AGENTS.md
  - docs/requirements/freoli_web_platform/evals.md
grill_session: docs/sandbox/endo/grill-sessions/2026-05-18_freoli_web_platform-V-existing-docs-grill.md
---

# FREOLI Web Platform — Engineering Spec

> **層の目的**: 「どう作るか」を技術仕様として定義する。Feature / Eval が固まった後に詰める層。
> AI エージェント（Cursor / Claude Code）が実装の指示として使える精度で書く。
>
> **本案件は AI プロダクトではない** ため、S-5（モデル選定）/ S-6（プロンプト構造）は **N/A** として扱う。
>
> **モード**: 短縮版（既存 2 ドキュメントを整理 + AI エージェント向け禁止事項を明示）

---

## 1. Tech Stack（S-1）

### 1.1 採用技術

| レイヤー | 技術 | バージョン固定 | 選定理由 | 出典 |
|---|---|---|---|---|
| ランタイム | Node.js | **20 LTS** | Vercel デフォルト互換、長期サポート | system §技術スタック |
| パッケージマネージャ | **pnpm** | 9+ | lock ファイル分裂回避（npm / yarn / bun 禁止） | AGENTS.md §4 |
| フレームワーク | Next.js | **14 (App Router)** | SSG + Route Handlers でフォームのバックエンドも同居 | system §技術スタック |
| 言語 | TypeScript | **5+** | 型安全、データスキーマ化 | system §技術スタック |
| スタイリング | Tailwind CSS | **3+** | `bg-black` `text-cyan-400` `text-sky-400` でテーマ明示実装 | system §技術スタック |
| UI ライブラリ | React | **18** | Next.js 14 同梱 | detailed §7 |
| 画像最適化 | `next/image` | Next.js 14 同梱 | WebP 自動配信、レスポンシブ最適化 | system §技術スタック |
| アイコン | Lucide React | 最新 | 軽量、tree-shakable | detailed §4.4 |
| フォント | Google Fonts | — | Noto Sans JP + Inter、`next/font/google` でセルフホスト相当 | system §技術スタック / detailed §6 |
| デプロイ | Vercel | Hobby (無料) | Next.js 最適化 + GitHub 自動デプロイ + 無料 SSL + CDN | system §技術スタック |
| ドメイン | `*.vercel.app` → v1.0 で独自ドメイン | — | サーキット出演確定時まで遅延（設計決定 #8） | system 設計決定 #8 |
| メール送信 | **Resend** | Node SDK 最新 | 無料 3,000 通/月、Route Handler 統合 | system 設計決定 #20 |
| bot 対策 | **Cloudflare Turnstile** | — | reCAPTCHA より軽量・無料・プライバシー配慮 | system 設計決定 #14 |
| 解析 | Vercel Analytics | 無料枠 | Cookieless、月間 2,500 PV まで無料 | detailed §6 |
| バージョン管理 | GitHub プライベートリポジトリ | — | コード履歴 + PR レビューでガバナンス | system §技術スタック |
| バリデーション | Zod | 最新 | API 入出力契約 / フォーム検証 | AGENTS.md §2 |

### 1.2 環境変数

すべて Vercel Environment Variables で管理。**`lib/env.ts` 経由でのみアクセス**（`process.env` 直接参照禁止）。

| 変数名 | 用途 | スコープ |
|---|---|---|
| `RESEND_API_KEY` | Resend 送信認証 | server-only |
| `TURNSTILE_SITE_KEY` | Turnstile クライアントウィジェット | public |
| `TURNSTILE_SECRET_KEY` | Turnstile サーバー検証 | server-only |
| `CONTACT_EMAIL_TO` | 送信先（デフォルト `freoli.official@gmail.com`） | server-only |

### 1.3 ディレクトリ構造（推奨）

```
freoli-web-platform/
├── app/
│   ├── page.tsx                    # トップ（FEAT-001〜007 が同居）
│   ├── privacy/page.tsx            # FEAT-009
│   ├── api/contact/route.ts        # FEAT-008（POST のみ）
│   └── layout.tsx
├── components/                     # UI コンポーネント（Hero, NextLive, ...）
├── data/
│   ├── lives.ts                    # FEAT-002 / FEAT-010 共通スキーマ
│   ├── members.ts                  # FEAT-003
│   ├── news.ts                     # FEAT-007
│   └── links.ts                    # FEAT-005 / FEAT-006
├── lib/
│   └── env.ts                      # 環境変数の型安全ラッパー（FEAT-011 / U-06）
├── public/
│   └── images/
│       ├── members/                # FEAT-003 個別カット
│       └── lives/                  # FEAT-001 / FEAT-004 用素材
├── .claude/
│   └── hooks/
│       └── prevent-destructive-command.js  # FEAT-011 / IF-05
├── .env.local                      # ローカルのみ（.gitignore）
├── .gitignore                      # .env*, node_modules 等
├── CONTENT_POLICY.md               # FEAT-012
├── AGENTS.md
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 2. データモデル（S-2）

### 2.1 `data/lives.ts`（FEAT-002 / FEAT-010 共通スキーマ、D-F2 で確定）

```typescript
export type LiveEvent = {
  id: string;                   // unique slug、例: "2025-07-11_blue-sheep"
  date: string;                 // ISO 8601、例: "2025-07-11"
  venue: string;                // 会場名、例: "Blue Sheep"
  venueUrl?: string;            // 会場公式サイト URL、未取得時は undefined（F1.2 フォールバック発動）
  venuePhone?: string;          // 会場電話、F1.2 フォールバック表示用
  venueMapsQuery: string;       // Google Maps 検索クエリ、例: "Blue Sheep 下北沢"
  doorsOpenAt?: string;         // 開場時刻、"19:00"
  showStartAt?: string;         // 開演時刻、"19:30"
  ticketPrice?: number;         // 円、例: 3000
  ticketUrl?: string;           // チケット予約 URL、未取得時は undefined（恒久フォールバック）
  participants?: string[];      // 対バン名の配列、例: ["A バンド", "B バンド"]
  organizer?: "self" | "booked"; // 自主企画 / ブッキング 区別（FEAT-010）
  actual_attendance: number | null; // (grill 新規 D-O1) 実測動員数、公演翌日記入、未記入は null
};

export const lives: LiveEvent[] = [
  // ...
];
```

### 2.2 `data/members.ts`（FEAT-003）

```typescript
export type Member = {
  id: "yusuke" | "anomu" | "hiromu" | "aberyo"; // 通称ローマ字（AGENTS.md §5 でコード内変数名として許可）
  displayName: string;          // サイト表示通称、例: "ゆうすけ"
  partLabel: string;            // 例: "Gt./Vo."
  partOrder: 1 | 2 | 3 | 4;     // 楽器順表示順、Vo/Gt=1, Gt=2, Ba=3, Dr=4
  photoPath: string | null;     // public/images/members/ 配下、null は未承諾でシルエット代替
  bio: string;                  // 1〜2 行紹介文（中優先度 #2 で確定要）
  consentLogged: boolean;       // CAP-004 / U-09: Yes ログ確認済みフラグ
};
```

### 2.3 `data/news.ts`（FEAT-007）

```typescript
export type NewsEntry = {
  id: string;                   // YYYY-MM-DD-slug
  date: string;                 // ISO 8601
  title: string;
  body: string;                 // Markdown 可（v0.1 は短文想定、v0.5+ で MDX 検討）
  tags?: Array<"live" | "release" | "media" | "other">;
};
```

### 2.4 `data/links.ts`（FEAT-005 / FEAT-006）

```typescript
export type SocialLink = {
  platform: "instagram" | "youtube" | "tiktok" | "x" | "spotify" | "apple-music";
  label: string;
  url: string | null;           // null で grayed out（Spotify / Apple Music v0.1）
  status: "active" | "coming-2025";
};
```

### 2.5 ContactForm Zod スキーマ（FEAT-008）

```typescript
import { z } from "zod";

export const ContactInquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  category: z.enum([
    "出演依頼",
    "取材・メディア",
    "コラボ",
    "ファン感想",       // D-F1（D-O2 + D-C4 統合）
    "その他",
  ]),
  body: z.string().min(10).max(2000),
  website: z.string().max(0),   // honeypot（IF-03、bot は埋めがち、人間は空のままが正）
  turnstileToken: z.string().min(1),
});

export type ContactInquiry = z.infer<typeof ContactInquirySchema>;
```

### 2.6 `lib/env.ts`（U-06 / DG-02）

```typescript
import { z } from "zod";

const EnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  TURNSTILE_SITE_KEY: z.string().min(1),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  CONTACT_EMAIL_TO: z.string().email().default("freoli.official@gmail.com"),
});

export const env = EnvSchema.parse(process.env);  // ビルド時 fail-fast（前提条件不在時に早期失敗）
```

---

## 3. API 契約（S-3）

### 3.1 `POST /api/contact`（FEAT-008、唯一の動的エンドポイント）

```
POST /api/contact

Request Body:
{
  "name": string (1..100),
  "email": string (RFC 5322),
  "category": "出演依頼" | "取材・メディア" | "コラボ" | "ファン感想" | "その他",
  "body": string (10..2000),
  "website": ""                  // honeypot, must be empty
  "turnstileToken": string
}

Response 200 (success):
{
  "ok": true,
  "messageId": string            // Resend message id
}

Response 400 (validation error):
{
  "ok": false,
  "error": "validation",
  "fieldErrors"?: Record<string, string>  // フィールド別エラー、内部詳細は含めない
}

Response 400 (turnstile failure):
{
  "ok": false,
  "error": "turnstile",
  "message": "人間であることを確認できませんでした、もう一度お試しください"
}

Response 200 (honeypot trap, IF-03):
{
  "ok": true,                    // 攻撃者にバレないため成功風レスポンス
  "messageId": "skipped"
}

Response 503 (Resend failure):
{
  "ok": false,
  "error": "send_failed",
  "fallback": {
    "type": "mailto",
    "address": "freoli.official@gmail.com"  // F3.3 二重窓口
  }
  // IF-01: API キー / スタックトレースは絶対に含めない
}
```

### 3.2 その他のエンドポイント

**なし**。すべて静的ページ（SSG）配信。

---

## 4. UI 画面構成（S-4）

### 4.1 ルーティング

| パス | コンテンツ | Feature |
|---|---|---|
| `/` | ヒーロー → SNSバー → 直近ライブ → メンバー → サブスク → ニュース → 問い合わせ（同一ページ内、非交渉 UX シーケンス） | FEAT-001〜FEAT-008 |
| `/privacy` | プライバシーポリシー | FEAT-009 |
| `/api/contact` | POST のみ（Route Handler） | FEAT-008 |

### 4.2 非交渉 UX シーケンス（D-C1、順序変更禁止）

```
┌─────────────────────────────────────────────────────────────────┐
│  /  (single page)                                                │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ <Hero />               ← FEAT-001                          │  │
│  │ <SNSBar />             ← FEAT-005                          │  │
│  │ <NextLive />           ← FEAT-002                          │  │
│  │ [<PastLives />]        ← FEAT-010 (Phase 2)               │  │
│  │ <Members />            ← FEAT-003                          │  │
│  │ [<PhotoGallery />]     ← FEAT-004 (Phase 2)               │  │
│  │ <Subscriptions />      ← FEAT-006                          │  │
│  │ <News />               ← FEAT-007                          │  │
│  │ <ContactForm />        ← FEAT-008                          │  │
│  │ <Footer> /privacy リンク  ← FEAT-009                         │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  /privacy  (independent page)                                    │
│  プライバシーポリシー本文                                            │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 状態遷移

| イベント | 遷移 / 状態 |
|---|---|
| 訪問者が `/` に着地 | ヒーロー全幅表示 → スクロールで次セクション |
| 訪問者が SNS Bar アイコンをタップ | 新規タブで該当 SNS アプリ / ブラウザに遷移 |
| 訪問者が Google Maps リンクをタップ | 新規タブで Maps 検索結果へ |
| 訪問者がフォーム送信成功 | クライアント側で「送信ありがとうございました」画面表示 |
| 訪問者がフォーム送信失敗（Resend ダウン） | mailto: フォールバック表示 |
| 訪問者が `/privacy` リンクタップ | 同一タブで `/privacy` ページへ遷移 |

### 4.4 レスポンシブブレイクポイント

| サイズ | 対象デバイス |
|---|---|
| 320〜639px | モバイル縦持ち（iPhone SE 含む） |
| 640〜1023px | タブレット縦 / モバイル横 |
| 1024〜1535px | デスクトップ標準 |
| 1536〜1920px | デスクトップ FHD |

メンバーカードは **640px 未満で縦並び、640px 以上で横並び**（FEAT-003 受け入れ基準 ①）。

---

## 5. モデル選定（S-5）

**N/A**。本案件は AI プロダクトではなく、LLM / 機械学習モデルは一切使用しない。

---

## 6. プロンプト / システム指示の構造（S-6）

**N/A**。AI モデル未使用のため、システムプロンプト不要。

---

## 7. 外部統合（S-7）

| 統合先 | 方式 | 認証方式 | コスト | 関連 EARS |
|---|---|---|---|---|
| **Resend** | REST API（公式 Node SDK） | API Key（`RESEND_API_KEY`） | 無料 3,000 通/月、想定月 100 通以内 | EV-03 / IF-01 |
| **Cloudflare Turnstile** | クライアントウィジェット + サーバー検証 REST | サイトキー（公開）+ シークレットキー（`TURNSTILE_SECRET_KEY`） | 無料 | IF-02 / IF-03 |
| **Vercel** | GitHub OAuth 経由の自動デプロイ + Vercel Analytics | GitHub OAuth | Hobby 無料 / 月間 PV 10,000 まで | U-08 / EV-04 |
| **GitHub** | HTTPS / SSH での push / pull | Personal Access Token or SSH Key | プライベートリポジトリ無料 | FEAT-011 / DG-NN |
| **Google Fonts** | `next/font/google` 経由でビルド時取得 | 不要 | 無料 | U-04 |
| **Google Maps** | 検索 URL への外部リンクのみ（埋め込みなし） | 不要 | 無料 | NL-04 |

**追加・廃止のルール**: 新規外部統合を増やす場合は、AGENTS.md §2「公開 API は将来増やさない」と矛盾しないか確認すること。増やす場合は AGENTS.md §2 と本ファイル §7 を同時に更新する。

---

## 8. ADR（Architecture Decision Records、S-8）

過去の検討経緯を将来エージェント・将来のメンバーに伝えるための採用 / 不採用記録。

### ADR-001: メール送信に Resend を採用（SendGrid / Mailgun / AWS SES 不採用）

- **採用日**: 2026-05-17（v3 設計決定 #20）
- **採用理由**:
  1. 無料 3,000 通/月の枠が想定月間 100 通の 30 倍で十分
  2. Next.js Route Handler との統合がスムーズな公式 Node SDK
  3. API Key 一本で開始可能（AWS SES のドメイン検証は v0.5+ で対応）
- **不採用候補**:
  - SendGrid: 無料枠が縮小傾向、UI が複雑
  - Mailgun: 無料枠が制限的
  - AWS SES: ドメイン検証必須で初期コストが高い、v1.0 独自ドメイン後に再評価候補

### ADR-002: bot 対策に Cloudflare Turnstile を採用（reCAPTCHA / hCaptcha 不採用）

- **採用日**: 2026-05-17（v3 設計決定 #14）
- **採用理由**:
  1. 無料・レート制限実質なし
  2. プライバシー配慮（Cookieless、個人情報経由なし）
  3. honeypot との二重防御で 90% 以上スパムブロック達成可能
- **不採用候補**:
  - reCAPTCHA v3: Google Cookie 経由でプライバシーポリシー記述が複雑化
  - hCaptcha: 無料枠あるが、Turnstile のほうが軽量

### ADR-003: ホスティングに Vercel Hobby を採用（Netlify / Cloudflare Pages 不採用）

- **採用日**: 2026-05-17（v3 設計決定 #7）
- **採用理由**:
  1. Next.js 公式ホスティングで App Router 最適化が最強
  2. GitHub 自動デプロイ + プレビュー URL + 無料 SSL + CDN が無料
  3. Cookieless の Analytics 内蔵
- **不採用候補**:
  - Netlify: 同等機能だが Next.js 最適化で Vercel に劣る
  - Cloudflare Pages: Next.js SSR の互換性が部分的

### ADR-004: 独自ドメインを v1.0（サーキット出演確定時）まで遅延（即時取得しない）

- **採用日**: 2026-05-17（v3 設計決定 #8）
- **採用理由**:
  1. バンド継続が困難になった場合の意思決定を後ろに倒せる（v3 リスク §ビジネス）
  2. v0.5 楽曲リリース時点ではドメイン名選定の意思決定材料が不十分
  3. 月間ランニング費用ゼロを維持できる期間が延びる
- **不採用候補**: v0.5 で取得 → 意思決定が早すぎる

### ADR-005: コンテンツ管理は TypeScript ファイル直書き（CMS 不採用、v0.5 まで）

- **採用日**: 2026-05-17（v3 §技術スタック）
- **採用理由**:
  1. v0.1 のスコープでは更新頻度が月 1 回程度、CMS 導入コストが見合わない
  2. Git PR レビューで権利ガバナンス（CAP-004）と同期した運用が可能
  3. Reversibility-First（CAP-005）と整合（CMS は revert で戻らない場合がある）
- **再評価タイミング**: v0.5（楽曲リリース時）に microCMS / Notion API 移行を検討（F4.3）

### ADR-006: パッケージマネージャは pnpm を採用（npm / yarn / bun 不採用）

- **採用日**: 2026-05-17（AGENTS.md §4）
- **採用理由**:
  1. ディスク効率（symlink ベース）
  2. lock ファイル分裂回避（npm / yarn / bun と混在すると整合性が崩れる）
- **エージェント向け強制**: 本ファイル §10「禁止事項」で `npm install` / `yarn add` / `bun add` を禁止コマンドとして明示。

---

## 9. アーキテクチャ方針（既存ドキュメント整理）

- **静的生成優先（SSG）**: ライブ情報・メンバー・ニュースはビルド時に静的生成
- **動的処理は API Route のみ**: 問い合わせフォーム送信のみ Route Handler
- **データ更新フロー**: Git push → Vercel ビルド → 静的ファイル再生成 → CDN 配信（3 分以内、EV-04）
- **コンテンツとコードの分離**: `/data/` 配下にコンテンツデータをファイル別に整理（CMS 移行時にこのディレクトリのみ置換可能な構造）
- **環境変数管理**: 秘匿情報は Vercel Environment Variables、`lib/env.ts` 経由のみ
- **権利ポリシー駆動**: `CONTENT_POLICY.md` をリポジトリ直下に置き、コミット前の確認を促す運用

---

## 10. AI エージェント向け禁止事項

実装エージェント（Cursor / Claude Code 等）が本リポジトリで作業するときは以下を必ず守る:

### 10.1 ファイル操作の禁止

- [ ] **`AGENTS.md §6 Protected Areas` Layer 1 / Layer 2 のファイルを Owner 承認なしに変更しない**
  - Layer 1（hook で自動ブロック対象）: `.env*` / `app/api/contact/route.ts` / `lib/env.ts` / `next.config.js` / `vercel.json` / `tsconfig.json`
  - Layer 2（Content Owner 承認必須）: `data/lives.ts` / `data/members.ts` / `data/news.ts` / `data/links.ts` / `app/privacy/page.tsx` / `CONTENT_POLICY.md` / `public/images/members/**` / `public/images/lives/**`
- [ ] 指定ファイル以外を修正しない
- [ ] テストを削除しない（テストファイルが追加された場合）

### 10.2 依存パッケージの禁止

- [ ] **`npm install` / `yarn add` / `bun add` を使わない**（ADR-006、pnpm のみ）
- [ ] 指定外の依存パッケージをインストールしない
- [ ] AGENTS.md §2「公開 API は将来増やさない」── 新規外部統合（追加の SaaS API）を勝手に増やさない

### 10.3 デプロイ・環境変数の禁止

- [ ] デプロイ設定（`vercel.json` / `.vercel/`）を変更しない
- [ ] `.env*` ファイルを読まない・編集しない・コミットしない
- [ ] `process.env.*` を直接参照しない（`lib/env.ts` 経由のみ、DG-02）
- [ ] `--no-verify` で hook をバイパスしない
- [ ] `git push --force` / `git reset --hard` を使わない

### 10.4 非交渉 UX シーケンスの禁止

- [ ] **Hero → SNS Bar → Lives → Members → Subscriptions → News → Contact の順序を変更しない**（D-C1 / U-10）
- [ ] 順序変更を伴う PR は却下対象
- [ ] ヒーローと SNS バーの上下関係を入れ替えるのも禁止（F2.1 違反）

### 10.5 ドメイン言語の禁止

- [ ] 楽曲未リリース期（v0.5 リリース前）に「配信中」「リリース済み」「いつでも聴ける」等の表現を使わない（AGENTS.md §5 / ST-01）
- [ ] ボーカル歌唱動画・ライブ動画をホームページ内に埋め込まない（U-11 / 設計決定 #6）

### 10.6 コンテンツ権利の禁止

- [ ] **メンバー写真・ライブ写真は本人の Yes が記録されたもののみ掲載**（U-09 / CAP-004）
- [ ] 削除依頼を受領した場合、勝手にスキップせず Content Owner に必ずエスカレーション（OP-04）

---

## 11. 既存 2 ドキュメントとの整合チェック

| 既存セクション | 本ファイルでの対応 |
|---|---|
| system §技術スタック | §1.1 Tech Stack |
| system §開発ロードマップ | features/index.md §6 実装スケジュール |
| system §非機能要件（22 項目） | evals.md §4.1 で網羅、本ファイル §1.1 でバージョン固定 |
| system §設計決定 21 項目 | §1.1, §2, §8 ADR-001〜006 で個別反映 |
| system §付録 A（CONTENT_POLICY 素案） | FEAT-012 / Week 1 で配置 |
| system §付録 B（privacy 素案） | FEAT-009 / Week 1 で配置 |
| system §付録 C（デザイントークン） | §1.1 Tailwind + §1.3 ディレクトリで反映 |
| system §付録 D（メンバー表記） | §2.2 `data/members.ts` で型定義 |
| detailed §6 インテグレーション要件（6 項目） | §7 で網羅 |
| detailed §7 技術選定とアーキテクチャ | §9 アーキテクチャ方針 |
| detailed §10 ランニング費用 | （変動が大きいため engineering ではなく運用ガイド側で管理） |

**結論**: 既存 2 ドキュメントの技術関連セクションを **engineering.md で 1 つに統合・整理 + バージョン固定 + AI エージェント向け禁止事項を明示** した。技術仕様の漏れなし。

---

## 12. Phase（実装フェーズ）

| Phase | 期間 | 対応 Feature | 主な技術タスク |
|---|---|---|---|
| **Phase 1 v0.1** | 2025/5/17〜5/31 | FEAT-001 / 002 / 003 / 005 / 006(grayed)/ 007 / 008 / 009 / 011 / 012 | 基盤構築 + 非 UI Feature 配置 + UI 実装 + 5/31 公開 |
| **Phase 2 v0.2** | 2025/6/1〜7/11 | + FEAT-004 / FEAT-010 | 重要枠の追加実装 + Lighthouse 改善 + OG 画像 |
| **Phase 3 v0.5** | 2025/7〜9 | FEAT-006 を grayed out → Embed 化（OP-01） | Spotify / Apple Music Embed + 楽曲ページ + microCMS / Notion API 検討（F4.3） |
| **Phase 4 v1.0** | 2026 後半〜2027 初頭 | （独自ドメイン取得、OP-02）+ プレスキット | 独自ドメイン紐付け + 301 リダイレクト + /press ページ + メーリングリスト検討 |

---

## 13. 機能完了の定義（AGENTS.md §7 再掲）

> **機能完了 = 型チェック通過（機械）＋ ビルド成功（機械）＋ 動作確認済み（Content Owner）**

3 条件が揃うまで main マージ不可。「ビルドが通ったから完了」は禁止。

### 検証コマンド（DG-03 / IF-06）

- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — `next lint`
- `pnpm build` — `next build`

### 壊れ方 3 パターン（タスク着手時に該当を宣言）

| パターン | 関連 EARS | 確認手段 |
|---|---|---|
| ① ロジック破綻 | CF-03 (Zod) | API ルートテスト |
| ② 状態不整合 | IF-01 (Resend) / OP-04 (削除 SLA) / NW-02 (PR レビュー) | プレビュー URL でフォーム実送信 + Vercel Functions ログ + 月次目視照合 |
| ③ UX 断絶 | U-10 (UX 順序) / ST-02 (未定状態) / ST-01 (grayed out) | プレビュー URL での目視確認（モバイル・デスクトップ両方） |
