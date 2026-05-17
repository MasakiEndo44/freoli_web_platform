# AGENTS.md — FREOLI Web Platform エージェント向けガイドライン

> このファイルは AI エージェント（Claude Code / Cursor 等）が読み込む共通ルールブック。
> ハーネス 01 構築ガイドライン（`docs/harness/01_構築ガイドライン.md`）に従う。

---

## 1. プロダクト方針（最上位）

FREOLI Web Platform は、4人組インディーロックバンド FREOLI の公式 Web サイトとして、
**「新規発見の入口」ではなく「決断の最終確認所」** として機能することを目的とする。
SNS で FREOLI に興味を持った人物を、**ライブ参加 と 楽曲再生** という二大行動へ転換させる場。

### 設計 3 原則

> **① 決断の最終確認所として設計する**
> 新規流入はSNSが担う。本サイトは「行く・聴く」を後押しする転換装置。新規発見系の機能（検索エンジン最適化以上の集客装置）を増やさない。

> **② Reversibility-First — Vercel revert で安全に戻せる構造を保つ**
> 全変更は `git revert` + `git push` で本番が前バージョンに戻る前提。スキーマ・認証・API キー絡みの操作は revert で戻らないので慎重に。

> **③ 被写体本人の合意必須 — コンテンツ権利ガバナンスを最優先**
> メンバー写真・ライブ写真は本人の Yes が出たもののみ掲載。削除依頼は1営業日以内に対応。CONTENT_POLICY.md が信頼源。

### 非交渉の UX シーケンス

```
ヒーロー（バンド写真 + 次回ライブ — トップ最上部、全幅）
  → SNS リンクバー（流入元以外の SNS への橋渡し）
  → 直近ライブ情報
  → メンバー紹介
  → サブスク（Spotify / Apple Music — v0.5 以降は埋め込みプレイヤー）
  → ニュース
  → 問い合わせフォーム
```

この順序は v0.1〜v1.0 を通じて維持する（要件定義書 F2.1 が信頼源）。設計意図：

- **ヒーロー（最上段・全幅）**：バンド写真とバンド名で世界観を即提示。次回ライブ情報を重ねて「行く」の対象を最速で見せる。F2.1 で確定。
- **SNS リンクバー（ヒーロー直下）**：流入元 SNS から来たユーザーに対し、FREOLI が他チャネル（Instagram / YouTube / TikTok / X）でも運営していることを認知させ、好みのチャネルへ橋渡しする。
- **中段（行く・聴く・知る）**：ライブ詳細 → メンバー紹介 → サブスクの順で、コンバージョン対象と信頼形成を交互に重ねる。
- **後段（ニュース・問い合わせ）**：継続接点と二次窓口。

順序を崩すと、ファーストビューで世界観と「行く」の対象が同時提示されず転換率が落ちる。ヒーローと SNS リンクバーの上下関係を入れ替えるのも禁止（要件定義書 F2.1 違反）。

> **要件定義書との優先関係**：本シーケンスと `docs/requirements/freoli_web_platform_system_requirements.md` が矛盾した場合、**要件定義書を信頼源として優先**し、本ファイルを更新する。

---

## 2. API-First 設計 & 型安全な契約

- 本プロジェクトは外部 API として **Resend**（メール送信）と **Cloudflare Turnstile**（bot 対策）のみを利用。
- `app/api/contact/route.ts` の入出力型を Zod で定義し、フォーム側はその型に依存する。型契約が確定するまでフォーム実装は着手しない。
- 公開 API は将来増やさない（増やす場合は本セクションに追記）。

---

## 3. レイヤードアーキテクチャ（役割分担）

Bootstrap 期はえんまさ（@MasakiEndo44）が **Owner / Tech Owner / Content Owner** を兼任する。
コラボレーター招待後にこのセクションを更新する。

| 役割 | 担当（現状） | 範囲 |
|---|---|---|
| **Owner / メンテナ** | @MasakiEndo44（えんまさ＝あのむ） | 全リポジトリ運営・最終承認 |
| **Tech Owner** | @MasakiEndo44 | API ルート / 環境変数 / ビルド設定 / 認証境界 |
| **Content Owner** | @MasakiEndo44 | `data/*.ts` / UI コピー / プライバシーポリシー / ニュース |
| バックアップ（緊急時のみ） | ひろむ・aberyo（招待未） | コンテンツ更新 |

---

## 4. 技術スタック

- **スタック:** Next.js 14（App Router）/ TypeScript 5 / Tailwind CSS 3 / Vercel Hobby / Resend / Cloudflare Turnstile
- **ランタイム:** Node.js 20 LTS
- **パッケージマネージャ:** **pnpm 9+** のみ使用。npm / yarn / bun は禁止（lock ファイル分裂回避）。
- **環境変数:** `.env.local` で管理。リポジトリには絶対にコミットしない。アプリケーションコード内では `lib/env.ts` 経由でのみ読む。`process.env` の直接参照禁止。
- **デプロイ:** Vercel が `main` ブランチを自動ビルド。プレビューは PR ごとに自動生成。

---

## 5. ドメイン言語 — 禁止表現

ユーザーが目にする文言（UI コピー・OG画像・ニュース・問い合わせ自動返信メール）に以下を含めない：

- **誤認誘導の禁止:** 楽曲未リリース期（v0.5 リリース前）に「配信中」「リリース済み」「いつでも聴ける」等の表現を使わない。代わりに「2025年配信予定」または無効状態（grayed out）で表示する。
- **動画の自己ホスティング誘導禁止:** ボーカル歌唱動画・ライブ動画をホームページ内に埋め込まない。SNS（Instagram / YouTube / TikTok）プラットフォーム上で完結させる旨を維持。Spotify / Apple Music の公式 Embed のみ可（v0.5 以降）。
- **メンバー氏名表記:** 「あのむ」と「えんまさ／遠藤 真輝」は同一人物。サイト上は通称「あのむ」を優先するが、運営文脈では「えんまさ」も可。

例外: コード内の変数名・データキー（例: `members.ts` の `id: "anomu"`）は通称ローマ字を使用してよい。

---

## 6. Protected Areas（AI エージェント操作境界）

リスクレベル **R2+**。判定根拠は `docs/harness/HARNESS_DECISIONS.md` 参照。

### Layer 1：インフラ層（hook で自動ブロック・人間が手動でのみ実行）

`.claude/hooks/prevent-destructive-command.js` が以下を実行時にブロックする：

- `.env*` ファイル読み取り（`cat .env*` 等）
- `git push --force` / `git reset --hard`
- `rm -rf` 引数なし
- DROP TABLE / TRUNCATE / RLS 無効化（FREOLI では DB なしのため理論上発火しないが防御として残す）

ファイルパスとしての保護対象：

- `.env*` すべて（`.env.example` 含む）
- `app/api/contact/route.ts` — Resend / Turnstile キー使用・送信処理
- `lib/env.ts` — 環境変数ラッパー
- `next.config.js` / `vercel.json` / `tsconfig.json` — ビルド・デプロイ設定

### Layer 2：コンテンツ層（変更前に Content Owner = @MasakiEndo44 承認必須）

- `data/lives.ts` — ライブ情報（日付・会場・チケット）
- `data/members.ts` — メンバー情報（実名・写真パス・自己紹介文）
- `data/news.ts` — ニュース投稿（CONTENT_POLICY § ニュース項に従う）
- `data/links.ts` — SNS / サブスク URL
- `app/privacy/page.tsx` — プライバシーポリシー（個人情報取り扱い）
- `CONTENT_POLICY.md` — 権利ポリシー（写真・動画・楽曲）
- `public/images/members/**` / `public/images/lives/**` — 被写体本人の合意必須
- `app/page.tsx` および `components/Hero.tsx` 内の **キャッチコピー文字列**

### Layer 3：開発層（AI 委任 OK）

- `app/**`（page / layout のレイアウト構造、コピー以外）
- `components/**`（UI ロジック・スタイリング、コピー以外）
- `styles/**`
- `next.config.js` の純粋なビルド最適化設定

> **Gate 2 適用注意**：Layer 3 ファイルでも、UI コピー・文言・UX フロー（非交渉シーケンスの順序）・ブランド要素（色・タイポグラフィ）を変更する場合は Content Owner の承認（Gate 2）が必要。

---

## 7. レビューゲート（Gate 1 / Gate 2）

AI が生成した全 PR は以下の 2 層ゲートを通過してマージする。

### Gate 1（Tech Owner = @MasakiEndo44 担当）— 技術的適合性：全 PR 必須

| チェック項目 | 観点 |
|---|---|
| 認可（IDOR 防御） | ※FREOLI は認証なしのため対象外。代わりに「Turnstile 検証が全送信パスで走るか」を確認 |
| 型安全境界 | `app/api/contact/route.ts` の入出力が Zod で検証されているか |
| 環境変数アクセス | `process.env` 直接参照なし / `lib/env.ts` 経由か |
| エラー境界 | Resend 失敗時に API キー等の内部情報をクライアントに返していないか |
| Vercel ビルド | preview デプロイが成功しているか |

### Gate 2（Content Owner = @MasakiEndo44 担当）— 意味的妥当性

| 変更タイプ | 対象パス | 添付物 |
|---|---|---|
| ライブ情報変更 | `data/lives.ts` | 会場名・日時・チケットURLの一次情報スクショ |
| メンバー情報変更 | `data/members.ts` + `public/images/members/**` | 本人の Yes ログ（Slack DM 等） |
| UI コピー変更 | `components/**` / `app/**` のテキスト | プレビュー URL + 変更文言 diff |
| プライバシーポリシー変更 | `app/privacy/page.tsx` | 変更箇所の根拠（法的要件・運用変更等） |
| ニュース投稿 | `data/news.ts` | 投稿前のレビュー済み確認 |

Gate 2 **対象外**: スタイリングのみ / バグ修正（表示内容変更なし）/ パフォーマンス改善・リファクタリング

### 検証コマンド

- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — `next lint`
- `pnpm build` — `next build`

### 機能完了の定義

> **機能完了 = 型チェック通過（機械）＋ ビルド成功（機械）＋ 動作確認済み（Content Owner）**

3 条件が揃うまで main マージ不可。「ビルドが通ったから完了」は禁止。

#### 壊れ方 3 パターン（タスク着手時に該当を宣言）

| パターン | 症状 | 確認手段 |
|---|---|---|
| ① ロジック破綻 | 同一入力で異なる結果（例: 同じフォーム送信で結果が変わる） | 単体テスト / API ルートテスト |
| ② 状態不整合 | 送信したのにメールが届かない / Turnstile が通らない | プレビュー URL でフォーム実送信 + Vercel Functions ログ確認 |
| ③ UX 断絶 | API は動くが UI が仕様と違う / 非交渉シーケンスの順序が崩れた | プレビュー URL での目視確認（モバイル・デスクトップ両方） |

---

## 8. ブランチ管理規則

`main` への直接 push は禁止。feature ブランチで作業し PR 経由でマージ。

### 命名規則

| プレフィックス | 用途 |
|---|---|
| `feature/<slug>` | 新機能開発 |
| `fix/<slug>` | バグ修正 |
| `docs/<slug>` | ドキュメント |
| `chore/<slug>` | 設定・依存関係・CI |
| `refactor/<slug>` | リファクタリング |
| `content/<slug>` | `data/*.ts` のコンテンツ更新（FREOLI 固有） |

- `<slug>` は kebab-case（例：`feature/contact-form`、`content/2025-07-11-blue-sheep`）
- 日本語・スペース禁止

### 自動化ルール（3 原則）

- **Merge Once, Delete Immediately**：PR マージ後ブランチは自動削除（GitHub Settings の「Automatically delete head branches」ON）
- **Name First, Automate Second**：命名規則違反は PR コメントで警告のみ（マージブロックなし）
- **Long-term Branches are Explicit**：長期育成ブランチは `.github/PROTECTED_BRANCHES.txt` に明示列挙

---

## 9. スキル使い分けガイド

### 場面別の skill（同梱）

| 場面 | skill |
|---|---|
| 実装前のゴール確認（単一機能・タスク） | `/goal-grill` |
| 全体要件を Vision→EngSpec まで段階的に深掘り | `/requirements-grill` |
| 認証・API route 変更時（`app/api/contact/**`） | `/security-sensitive-change-review` |
| PR ドラフト要約生成 | `/pr-draft-summary` |
| Next.js App Router プロジェクト初期化 | `/integration-nextjs-app-router` |

### 関連ドキュメント

- `docs/harness/01_構築ガイドライン.md` — リスク判定・3 層保護モデル・PR ガバナンスの一本道
- `docs/harness/HARNESS_DECISIONS.md` — リスク判定根拠と設計判断の記録
- `docs/requirements/freoli_web_platform_system_requirements.md` — システム要件定義書 v3
- `docs/requirements/freoli_web_platform_detailed_requirements_specification.md` — 詳細要件仕様書
- `CONTENT_POLICY.md` — 写真・動画・楽曲の権利ポリシー（v0.1 配置予定）
