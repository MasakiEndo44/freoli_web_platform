---
doc_id: req.freoli_web_platform.evals
doc_type: evals
product: freoli_web_platform
layer: E
status: stable
stability: evolving
as_of: 2026-05-18
owners: [endo]
parent_doc: docs/requirements/freoli_web_platform/features/index.md
mode: condensed
ai_eval_applicable: false
sources:
  - docs/requirements/freoli_web_platform_system_requirements.md
  - docs/requirements/freoli_web_platform_detailed_requirements_specification.md
  - AGENTS.md
  - docs/requirements/freoli_web_platform/outcomes.md
  - docs/requirements/freoli_web_platform/capabilities.md
  - docs/requirements/freoli_web_platform/features/index.md
grill_session: docs/sandbox/endo/grill-sessions/2026-05-18_freoli_web_platform-V-existing-docs-grill.md
---

# FREOLI Web Platform — Evals（受け入れ基準 / EARS）

> **層の目的**: Capability / Feature の受け入れ基準を **EARS 記法** で形式化し、
> 「合格 / 不合格」を機械・人間ともに判定可能にする。
>
> **本案件は AI プロダクトではない** ため、GEARS-1〜3（出力品質 / Hallucination / AI Graceful Degradation）/ E-6（AI 出力評価）/ E-7（Hallucination 閾値）/ E-8（評価データセット）は **N/A** として扱う。代わりに通常の EARS 5 パターン（Ubiquitous / Event-driven / State-driven / Optional / Unwanted）に集中する。
>
> **モード**: 短縮版（Global EARS + 優先 5 Feature 抜粋）。残り 7 Feature は Global EARS で大部分カバーされる前提。

---

## 1. Global EARS（全 Feature 共通）

### 1.1 Ubiquitous（常時成立）

非機能・パフォーマンス・アクセシビリティ・セキュリティの常時要件。既存 2 ドキュメントの非機能要件を EARS 化。

| ID | EARS（英語） | 日本語解説 | 既存要件 |
|---|---|---|---|
| **U-01** | The system shall achieve a Largest Contentful Paint (LCP) of 2.5 seconds or less on 4G mobile networks. | 全ページの LCP は 4G モバイルで 2.5 秒以内（V-7「3 秒で分かる」の前提）。 | system 非機能 / detailed §5 |
| **U-02** | The system shall achieve a First Contentful Paint (FCP) of 1.5 seconds or less on 4G mobile networks. | FCP は 1.5 秒以内（SNS 流入 90% のモバイル離脱閾値）。 | system 非機能 / detailed §5 |
| **U-03** | The system shall achieve a Cumulative Layout Shift (CLS) of 0.1 or less. | CLS は 0.1 以下（Google Core Web Vitals "Good"）。 | system 非機能 / detailed §5 |
| **U-04** | The system shall maintain a text contrast ratio of 4.5:1 or higher (WCAG AA) across all pages. | テキストコントラスト比 4.5:1 以上（ネオンブルー × 黒の可読性確保）。 | system 非機能 |
| **U-05** | The system shall serve all pages via HTTPS. | 全ページ HTTPS（Vercel 標準）。 | system 非機能 / detailed §5 |
| **U-06** | The system shall not expose any secret or API key in client-side code, repository, or build artifacts. | 秘匿情報をクライアント・リポジトリ・ビルド成果物に露出させない（`lib/env.ts` 経由のみ）。 | AGENTS.md §2 / §6 Layer 1 / FEAT-011 |
| **U-07** | The system shall maintain a tap target size of 44x44 px or larger for all interactive elements. | タップターゲット最小 44×44px（モバイル離脱防止）。 | system 非機能 |
| **U-08** | The system shall be reachable at the URL `https://freoli.vercel.app` (or its successor domain in v1.0) with 99% monthly uptime. | サイト稼働率 99% / 月以上（Vercel Hobby SLA 準拠）。 | system 非機能 / O-8 |
| **U-09** | The system shall display all member photos only when the depicted member has given explicit consent (recorded in the Yes log). | メンバー写真は本人 Yes が記録されたもののみ表示。 | system F5.1, F5.2 / CAP-004 / FEAT-012 |
| **U-10** | The system shall enforce the non-negotiable UX section order: Hero → SNS Bar → Lives → Members → Subscriptions → News → Contact. | 非交渉 UX シーケンス順を維持。順序変更を伴う変更は却下対象。 | AGENTS.md 非交渉 UX / D-C1 |
| **U-11** | The system shall not embed self-hosted video on any page. | 動画の自己ホスティング埋め込み禁止（Spotify / Apple Music 公式 Embed は除外、v0.5+）。 | AGENTS.md §5 / 設計決定 #6 |

### 1.2 Event-driven（イベント駆動）

| ID | EARS（英語） | 日本語解説 | 関連 |
|---|---|---|---|
| **EV-01** | When a user lands on the home page, the system shall render the Hero section as the first visible content within the LCP target (2.5 s on 4G mobile). | 訪問者が HP に着地すると、Hero が LCP 目標内に最初に表示される。 | FEAT-001 / U-01 |
| **EV-02** | When a user opens an external SNS link from the SNS Bar, the system shall open the link in a new tab with `rel="noopener noreferrer"`. | SNS バーのリンクは新規タブ + noopener / noreferrer で開く。 | FEAT-005 / system F3.5 |
| **EV-03** | When a user submits the contact form with valid inputs and a passing Turnstile token, the system shall deliver the email to `freoli.official@gmail.com` via Resend within 10 seconds. | フォーム送信成功時、Resend 経由で 10 秒以内に送達。 | FEAT-008 / CAP-003 |
| **EV-04** | When the Content Owner pushes a new commit to `main`, the system shall complete the Vercel build and reflect changes in production within 3 minutes. | main 反映時、3 分以内に本番反映（Vercel 自動デプロイ）。 | system 非機能 / FEAT-011 |
| **EV-05** | When a user reaches the News section, the system shall display the latest 3 to 5 news entries in descending date order. | News セクション到達時、最新 3〜5 件を時系列降順表示。 | FEAT-007 |

### 1.3 State-driven（状態駆動）

| ID | EARS（英語） | 日本語解説 | 関連 |
|---|---|---|---|
| **ST-01** | While a music subscription service (Spotify / Apple Music) has no released tracks for FREOLI, the system shall display the subscription button in a disabled (grayed out) state with the label "2025 年配信予定". | 楽曲未リリース期は Spotify / Apple Music ボタンを grayed out + 「2025 年配信予定」表示（誤認誘導禁止）。 | FEAT-006 / system ドメイン言語禁止 / 設計決定 #6 |
| **ST-02** | While no upcoming live event exists in `data/lives.ts`, the system shall display "次回公演調整中" placeholder in the NextLive section and route the user to the SNS Bar. | 次回ライブ未定の間、F1.5 プレースホルダーを表示し SNS バーへ誘導。 | FEAT-002 / system F1.5 |
| **ST-03** | While the contact form is being submitted, the system shall disable the submit button to prevent duplicate submissions. | フォーム送信中は送信ボタンを無効化し重複送信を防ぐ。 | FEAT-008 |

### 1.4 Optional / Where（オプション）

| ID | EARS（英語） | 日本語解説 | 関連 |
|---|---|---|---|
| **OP-01** | Where the deployment version is v0.5 or later, the system shall replace the grayed-out Spotify / Apple Music buttons with active embed players. | v0.5+ では grayed out を解除し Spotify / Apple Music 公式 Embed を表示。 | FEAT-006 / system F3.4 / 設計決定 #6 |
| **OP-02** | Where the deployment version is v1.0 or later, the system shall serve all pages under the official custom domain (decided at v1.0 cut-over). | v1.0+ では独自ドメインで配信。 | system 設計決定 #8 / Phase 4 |
| **OP-03** | Where a live event has an `actual_attendance` value, the system may optionally display it in the PastLives section. | `actual_attendance` が記録された公演は PastLives で任意表示。 | FEAT-010 / D-O1 / D-F2 |
| **OP-04** | Where a content removal request is received from the depicted person, the Content Owner shall remove the content via a merged PR within 1 business day. | 削除依頼を受領した場合、Content Owner が 1 営業日以内に PR マージで削除（運用 SLA、コード上は時間軸を保証しないため "Content Owner shall" を採用）。 | system F5.1 / CAP-004 / FEAT-012 |

### 1.5 Unwanted / If（異常 / エラー処理）

| ID | EARS（英語） | 日本語解説 | 関連 |
|---|---|---|---|
| **IF-01** | If the Resend API returns a non-2xx response or times out, the system shall display the fallback message linking to `mailto:freoli.official@gmail.com` and shall not expose API keys, stack traces, or internal error details to the client. | Resend 失敗時、mailto: 二重窓口へ縮退。内部情報をクライアントに返さない（AGENTS.md §7 Gate 1）。 | FEAT-008 / system F3.3 / 設計決定 #14 |
| **IF-02** | If the Cloudflare Turnstile verification fails, the system shall reject the submission, retain the form inputs, and display a localized retry prompt. | Turnstile 失敗時、送信拒否 + 入力保持 + 日本語の再試行案内。 | FEAT-008 / detailed §4.3 |
| **IF-03** | If the honeypot field (`website`) contains any value upon submission, the system shall return a successful-looking response without sending email, to avoid leaking detection logic to attackers. | honeypot が空でない場合、bot 判定して正常応答風レスポンスを返す（送信せず、攻撃者への情報露出を防ぐ）。 | detailed §4.3 / 設計決定 #14 |
| **IF-04** | If the Hero image fails to load, the system shall render the band name in white text on a black background as a fallback layout. | ヒーロー画像読込失敗時、黒背景 + バンド名テキストで成立。 | FEAT-001 / detailed §4.2 |
| **IF-05** | If a destructive shell command (`rm -rf` without args, `git push --force`, `git reset --hard`, reading `.env*`) is invoked, the system shall block it via `.claude/hooks/prevent-destructive-command.js`. | destructive コマンドは hook で自動ブロック。 | AGENTS.md §6 Layer 1 / FEAT-011 |
| **IF-06** | If a Vercel preview build fails for a pull request, the system shall prevent merging that PR into `main` until the build succeeds. | preview ビルド失敗時、PR の main マージを禁止。 | AGENTS.md §7 Gate 1 / FEAT-011 |
| **IF-07** | If a production deployment causes a regression detected within the same business day, the operator shall be able to revert to the previous deployment within 5 minutes via Vercel + `git revert` + `git push`. | 当日中に検出された不具合は 5 分以内に Vercel revert + git revert で前バージョン復旧。 | O-8 信頼性 / FEAT-011 / AGENTS.md 設計原則 ② |

---

## 2. 優先 Feature 別 EARS 抜粋

### 2.1 FEAT-002 NextLive（次回ライブ情報セクション）

| ID | EARS | 関連 |
|---|---|---|
| **NL-01** | When `data/lives.ts` contains at least one event with a date in the future, the system shall display the nearest future event at the top of the NextLive section. | F1.1 / FEAT-002 受け入れ基準 ② |
| **NL-02** | When an event's `venueUrl` field is empty or undefined, the system shall display the fallback text "ご予約・お問い合わせは会場（[venue name]）まで" along with the venue's phone number or official site link if available. | F1.2 / 設計決定 #16 |
| **NL-03** | While an event date has passed and is no longer in the future, the system shall move that event from the NextLive section to the PastLives section. | F1.5 / FEAT-002 ↔ FEAT-010 連携 |
| **NL-04** | The system shall display, for each future event in the NextLive section, the date, venue name, doors/start time, ticket price (if known), and a Google Maps search link for the venue. | F1.1 + F1.3 |

### 2.2 FEAT-008 ContactForm（問い合わせフォーム）

| ID | EARS | 関連 |
|---|---|---|
| **CF-01** | The system shall present a contact form with exactly 4 visible fields (name, email, inquiry category, body) and 1 invisible honeypot field (`website`). | system F3.6 + 設計決定 #14 |
| **CF-02** | The system shall present the inquiry category as a dropdown with 5 options: 出演依頼, 取材・メディア, コラボ, ファン感想, その他. | D-F1（D-O2 + D-C4 統合） |
| **CF-03** | When the form is submitted, the system shall validate inputs server-side using a Zod schema before invoking the Resend API. | AGENTS.md §2 / FEAT-008 受け入れ基準 ② |
| **CF-04** | The system shall complete a successful submission round-trip (user clicks Submit → success screen) within 30 seconds on a 4G mobile network. | system 非機能（フォーム完了時間 30 秒以内） |
| **CF-05** | If submission succeeds, the system shall display a success screen with the message "送信ありがとうございました" and shall not return any user input back to the client. | detailed §4.3 業務フロー |
| **CF-06** | The system shall ensure that the `/privacy` page (FEAT-009) is linked from the form area before submission. | system F5.5 / FEAT-008 ↔ FEAT-009 連携 |

### 2.3 FEAT-001 Hero（ヒーロービジュアル）

| ID | EARS | 関連 |
|---|---|---|
| **HE-01** | The system shall serve the Hero image with the `priority` attribute on `next/image` and the WebP format when supported. | FEAT-001 受け入れ基準 ② / detailed §4.2 |
| **HE-02** | The system shall render the Hero section at full viewport width on all supported screen sizes (320 px〜1920 px). | detailed §5 対応環境 / system 非機能 |
| **HE-03** | The system shall overlay the band name "FREOLI" and a single-line catchphrase (30〜80 characters in Japanese) on the Hero image using neon-blue accent colors from the design tokens (cyan-400 / sky-400). | FEAT-001 受け入れ基準 ③ / 設計決定 #10 / 付録 C |
| **HE-04** | The system shall NOT include any embedded video or auto-playing media in the Hero section. | F2.5 撤回 / AGENTS.md §5 |

### 2.4 FEAT-011 DeployGuard（デプロイ運用ガード）

| ID | EARS | 関連 |
|---|---|---|
| **DG-01** | The repository shall list `.env*` (and equivalents such as `.env.local`, `.env.production`) in `.gitignore`. | AGENTS.md §6 Layer 1 |
| **DG-02** | The codebase shall access environment variables only through `lib/env.ts`; direct `process.env.*` references in application code are prohibited. | AGENTS.md §2 / §6 Layer 1 |
| **DG-03** | Each pull request shall pass `pnpm typecheck`, `pnpm lint`, and `pnpm build` before merging into `main`. | AGENTS.md §7 Gate 1 |
| **DG-04** | If `.claude/hooks/prevent-destructive-command.js` is disabled or removed, the operator shall restore it before any subsequent commit. | AGENTS.md §6 Layer 1 / FEAT-011 |

### 2.5 FEAT-007 News（お知らせ／ニュース欄）

| ID | EARS | 関連 |
|---|---|---|
| **NW-01** | The system shall display News entries in descending date order, with a maximum of 5 entries visible at any time on the home page. | FEAT-007 受け入れ基準 ① |
| **NW-02** | When a News entry is added, modified, or removed, the change shall pass a Content Owner PR review before being merged into `main`. | F4.2 / 設計決定 #15 |
| **NW-03** | The Content Owner shall publish at least one News entry per calendar month (operational target, monitored via O-8 freshness metric). | F4.1 / O-8 / FEAT-007 受け入れ基準 ③ |
| **NW-04** | If the News array becomes empty, the system shall NOT display a "no news" placeholder; instead, the launch state shall include the 7/11 Blue Sheep ライブ告知 as the seeded first entry. | detailed §4.5 / FEAT-007 縮退 |

---

## 3. AI 品質要件（GEARS-1〜3 / E-6〜E-8）

**N/A（本案件は AI プロダクトではない）**。

- **GEARS-1（出力品質）**: N/A — システムが生成する出力はすべて静的データ（`data/*.ts`）由来。
- **GEARS-2（Hallucination 制約）**: N/A — LLM 出力なし。
- **GEARS-3（AI Graceful Degradation）**: N/A — AI capability なし（代わりに通常の API Graceful Degradation を IF-01〜IF-07 で規定）。
- **E-6（AI 出力評価方法）**: N/A — exact match / semantic similarity / rubric scoring / human eval / model self-eval いずれも適用なし。
- **E-7（Hallucination 許容閾値）**: N/A。
- **E-8（評価データセット）**: N/A — 代わりに **Vercel preview ビルド + 手動目視確認** で受け入れ判定（AGENTS.md §7 機能完了の定義）。

---

## 4. 既存 2 ドキュメントとの整合チェック

### 4.1 system §非機能要件（22 項目）との対応

| 既存 非機能要件 | 対応 EARS |
|---|---|
| FCP 1.5 秒以内 | U-02 |
| LCP 2.5 秒以内 | U-01 |
| ライブ情報の更新反映 3 分以内 | EV-04 |
| モバイル表示の最適化 | U-07 + 全 Feature でモバイル対応 |
| 2 タップ以内に問い合わせ着地 | FEAT-008 受け入れ基準 |
| コントラスト比 4.5:1 以上 | U-04 |
| フォーム完了 30 秒以内 | CF-04 |
| サイト稼働率 99.5% 以上 | U-08（保守的に 99% 採用、Vercel Hobby SLA 準拠） |
| コンテンツ復元性 | IF-07 |
| フォーム送信到達確認 | IF-01 |
| Resend 障害時 mailto: | IF-01 |
| スパム 90% 以上ブロック | IF-02 + IF-03 |
| 個人情報取得最小化 | CF-01 + FEAT-009 |
| Resend API キー管理 | U-06 / DG-01 / DG-02 |
| HTTPS 常時 | U-05 |
| 第三者 JS 埋め込み制限 | U-11 |
| 同時アクセス 月間 PV 10,000 | U-08 ベース（容量はインフラ層で担保） |
| フォーム月間 3,000 通 | （Resend 無料枠で担保、Eval 対象外） |
| 画像最適化 | HE-01 |
| ブラウザ対応 | （対応環境、Eval ではなく compat matrix で担保） |
| 画面サイズ 320〜1920px | HE-02 |

### 4.2 detailed §5 非機能要件との対応

すべて §4.1 の対応で吸収済み。さらに detailed §5 で挙げられる **アクセシビリティ要件**（alt 属性 / label-input 紐付け / focus ring / セマンティック HTML）は **EARS では U レベル要件**として U-04（コントラスト）+ U-07（タップサイズ）の派生で吸収。詳細は Engineering Spec 層で実装基準として書き下す。

---

## 5. EARS パターン充足チェック

QUESTIONS_E.md の完了条件「ユビキタス要件 (U) が最低 1 つ、When/While/If の各パターンが最低 1 つ書けること」:

| パターン | 個数 | 充足 |
|---|---|---|
| Ubiquitous (U-NN) | 11 | ✓ |
| Event-driven (EV-NN) | 5 | ✓ |
| State-driven (ST-NN) | 3 | ✓ |
| Optional (OP-NN) | 4 | ✓ |
| Unwanted (IF-NN) | 7 | ✓ |
| Feature 個別 EARS | 18（NL-04 + CF-06 + HE-04 + DG-04 + NW-04） | — |

**合計 48 件の EARS 受け入れ基準**を定義済み。

---

## 6. Engineering Spec 層への接続

Eval 層で確定した受け入れ基準は、Engineering Spec（S）層で以下のように受ける：

| Eval 由来要件 | S 層での具体化 |
|---|---|
| U-01〜U-03（Core Web Vitals）| Next.js 14 SSG + `next/image` + フォント `font-display: swap` |
| U-04（コントラスト）| Tailwind デザイントークン定義（付録 C）+ Lighthouse aXe 自動検証 |
| U-06 / DG-01〜DG-04（環境変数 / hook） | `lib/env.ts` 型定義 + `.gitignore` 列挙 + `.claude/hooks/` 配置 |
| EV-03 / CF-01〜CF-06（フォーム） | `app/api/contact/route.ts` の Zod スキーマ + Resend SDK + Turnstile siteverify |
| EV-04（デプロイ反映 3 分） | Vercel GitHub 連携設定 |
| IF-01 / IF-02 / IF-03（縮退）| API エラーハンドラ仕様 |
| IF-05 / IF-06 / IF-07（CI / revert）| pre-commit hook + GitHub PR checks + Vercel ダッシュボード操作手順 |
| OP-01 / OP-02（v0.5 / v1.0 切替） | フィーチャートグル不要（ビルド時定数 + Phase ブランチで対応） |
