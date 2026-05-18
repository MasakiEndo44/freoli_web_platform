---
doc_type: process_flow
title: UI スタイルコンポーネント確定までのフロー
product: freoli_web_platform
version: v0.1（Phase 1 用）
as_of: 2026-05-18
owners: [endo]
status: stable
sources:
  - docs/requirements/freoli_web_platform_system_requirements.md
  - docs/requirements/freoli_web_platform/vision.md
  - docs/requirements/freoli_web_platform/engineering.md
  - AGENTS.md
derived_from: docs/discussions/議論ログ_UIスタイル確定フロー.md
---

# UI スタイルコンポーネント確定までのフロー

> Phase 1（2025/5/17〜5/31、14日間）の v0.1 公開に向けた、デザイン発散から実装可能なスタイル基盤確定までの段階的フロー。

---

## 0. このフローのスコープ

- **対象**: FREOLI Web Platform v0.1 の UI スタイル基盤（`tailwind.config.ts` + 5 プリミティブコンポーネント）
- **対象外**: 複合コンポーネント（Hero / NextLive / Members 等）の実装、コンテンツ流し込み
- **完了条件**: 内部用 `/styleguide` ページで 5 プリミティブが全状態（通常 / hover / focus / disabled / error）表示され、Content Owner（えんまさ）がビジュアル合意した時点

---

## 1. 3 原則（意思決定の判断基準）

| # | 原則 | 意味 |
|---|---|---|
| ① | **Design Before Code, Tokens Before Components** | Claude Design でビジュアル言語確定 → `tailwind.config.ts` 反映 → 5 プリミティブ設計 → 複合コンポーネント実装。順序を絶対崩さない |
| ② | **Parallel Where Possible, Serial Where Necessary** | 環境セットアップ・データ型定義はデザイン発散と並行。複合コンポーネントのスタイル実装はデザイン主案選定後の直列。混ぜない |
| ③ | **2 Cases, Not 1 — Photo Fallback Aware** | Claude Design は主案 + バックアップ案の 2 案を選定。アー写撮影遅延（既存ライブ写真 10 枚での代替）に備える |

---

## 2. 全体フロー（5 段階 × 14 日）

```
┌─ Stage 1 ──────────────────────────────────────────────────────────────┐
│  デザイン発散（Day 1〜3）｜並行で環境セットアップ                       │
└────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─ Stage 2 ──────────────────────────────────────────────────────────────┐
│  主案 + バックアップ案 選定（Day 4）｜マイルストーン①                   │
└────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─ Stage 3 ──────────────────────────────────────────────────────────────┐
│  Tailwind トークン化（Day 5）｜tailwind.config.ts に主案反映            │
└────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─ Stage 4 ──────────────────────────────────────────────────────────────┐
│  5 プリミティブ実装 + /styleguide 確認（Day 5〜7）｜マイルストーン②     │
│  ── ここで「UI スタイル確定」 ──                                        │
└────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─ Stage 5（本フローのスコープ外）────────────────────────────────────────┐
│  複合コンポーネント実装（Day 8〜14）｜非交渉 UX シーケンス順              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Stage 1：デザイン発散 + 環境セットアップ（Day 1〜3、並行）

### 3.1 デザイン側：Claude Design 発散

#### 目的

要件定義書で確定済みのデザイントークン（cyan/sky-400 × zinc-950）と非交渉 UX シーケンスを前提に、**「世界観の手触り」を 6〜9 案で発散**し、判断材料を揃える。

#### 事前準備（Day 1 午前）：Claude Design 入力カード作成

Claude Design への入力文書を A4 1 枚にまとめる。含めるもの：

| 項目 | 内容 | 出典 |
|---|---|---|
| North Star Quote | 「手より先に心が動かされた」 | vision.md §7 |
| 非交渉 UX シーケンス | Hero → SNSBar → NextLive → Members → Subscriptions → News → Contact | engineering.md §4.2 |
| デザイントークン素案 | カラーパレット / タイポ / スペーシング | system 付録 C |
| サウンドリファレンス | サカナクション / BUMP OF CHICKEN / PEOPLE 1 / チョーキューメイ | vision.md §6 |
| Primary Persona | 高橋みさき 29 歳 IT 系デザイナー、月 3〜4 回ライブ参加 | vision.md §5 |
| 禁止事項 | 楽曲未リリース期に「配信中」表現禁止、動画自己ホスティング禁止 | AGENTS.md §5 |

#### 発散の評価軸

| 軸 | 選択肢 | 案数 |
|---|---|---|
| **A：ヒーロー構図** | (a) バンド写真フル幅 / (b) ロゴ大胆 + 写真背景小 / (c) テキスト中心 + 写真サイド | 3 |
| **B：ネオン光の表現** | (a) 点光源 / (b) グラデーション / (c) アウトライン | 3 |
| **C：タイポ主張** | (a) 日本語見出し中心 / (b) 英文 "FREOLI" ロゴ中心 / (c) 混在型 | 3 |
| **D：実装可逆性** | Tailwind 標準トークンだけで再現可か、カスタム CSS / Framer Motion 必要か（評価軸として使用、案数には数えない） | — |

3 軸 × 2〜3 パターン = **6〜9 案** を発散。

#### 発散ボリュームの優先度

| 優先度 | 対象画面 | 発散量 |
|---|---|---|
| 🔴 必須 | ヒーロー（主案 + バックアップ案） | 各 3 案 × 2 セット = **6 案** |
| 🔴 必須 | NextLive セクション（日付・会場・予約の階層） | 3 案 |
| 🔴 必須 | ContactForm の通常 / フォーカス / エラー / 成功状態 | 1 案を 4 状態 |
| 🟡 推奨 | メンバーカードと hover インタラクション | 2 案 |
| 🟢 任意 | ニュース・写真ギャラリーの装飾 | **発散しない**（プリミティブ流用） |

#### Claude Design → Figma 出力時のルール

- **トークン命名を `tailwind.config.ts` 直結**にする
- Figma 上の色名を `cyan-400` `sky-400` `zinc-950` のまま使う（custom name 禁止、例：`FreoliBlue` ✗）
- 要件定義書付録 C のデザイントークンを Figma Variables にそのまま流し込む

#### 成果物

- Figma ファイル（Claude Design 出力、6〜9 案 + フォーム状態 4 種）
- 各案のキャプション 1 行（軸 A / B / C のどれを採用したか）

---

### 3.2 実装側：Next.js 環境セットアップ（並行）

#### 目的

Stage 2 のデザイン主案選定を待たずに、**デザイン非依存の基盤**を Day 1〜3 で完了させる。

#### 並行可能タスク（デザイン主案不要）

| # | タスク | 出典 |
|---|---|---|
| 1 | pnpm + Next.js 14 App Router 初期化（`pnpm create next-app`） | engineering.md §1.1 |
| 2 | Tailwind CSS インストール（トークン反映は Stage 3 で実施） | engineering.md §1.1 |
| 3 | `lib/env.ts`（Zod 検証付き環境変数ラッパー）配置 | engineering.md §2.6 |
| 4 | ディレクトリ構造を空ファイルで作成 | engineering.md §1.3 |
| 5 | `data/lives.ts` / `members.ts` / `news.ts` / `links.ts` の Zod スキーマ + 型定義 | engineering.md §2.1〜2.4 |
| 6 | `.claude/hooks/prevent-destructive-command.js` 配置 | AGENTS.md §6 Layer 1 |
| 7 | `.env.local` 配置（`RESEND_API_KEY` / `TURNSTILE_*` のプレースホルダー） | engineering.md §1.2 |
| 8 | Vercel プロジェクト紐付け・自動デプロイ確認 | system Phase 1 Week 1 |

#### 並行不可タスク（デザイン主案待ち）

- ヒーローのレイアウト実装
- メンバーカードのスタイル実装
- フォームの状態スタイル（色・余白・タイポ）
- 複合コンポーネント全般

#### 成果物

- ローカルで `pnpm dev` が起動し、空のページが表示される状態
- `pnpm typecheck` / `pnpm lint` / `pnpm build` の 3 コマンドがエラーなく通る
- Vercel プレビュー URL が発行されている

---

## 4. Stage 2：主案 + バックアップ案 選定（Day 4）｜マイルストーン①

### 目的

Stage 1 で発散した 6〜9 案から **主案 + バックアップ案の 2 案** を確定させ、Stage 3 以降の意思決定基盤を固める。

### レビュアー

| 役割 | 担当 |
|---|---|
| 最終承認 | えんまさ（Content Owner / Tech Owner） |
| ユーザー視点ヒアリング | Primary Persona 相当の IT 系デザイナー 1 名（15 分） |

### 選定基準：North Star Quote の含意 5 項目

| # | 含意 | 判定基準 |
|---|---|---|
| 1 | 「次のライブの日付と会場が一瞬で分かる」 | NextLive が 0〜3 秒で視認可能か |
| 2 | 「もう予約まで終わってた」 | 予約導線が 3〜5 秒で到達可能か |
| 3 | 「色合いも私の好きな感じ」 | ネオンブルー × 黒のブランド即時伝達 |
| 4 | 「手より先に心が動かされた」 | 情報密度が認知速度を阻害していないか |
| 5 | 「あの色のバンド」 | "あの色" として記憶される視覚的特異性 |

### 主案 vs バックアップ案の役割分担

| 案 | 想定素材 | 用途 |
|---|---|---|
| 主案 | アー写（5/24〜25 撮影予定）前提 | アー写が間に合った場合に採用 |
| バックアップ案 | 既存ライブ写真 10 枚 から選定 | アー写撮影が 5/28 以降にずれた場合のフォールバック |

### 成果物

- 主案 1 つ + バックアップ案 1 つの Figma スクリーンショット
- 選定理由を 5 項目評価表で記録（`docs/design/stage2_selection_log.md` として保存推奨）
- えんまさの最終承認ログ（Git コミットメッセージで OK）

---

## 5. Stage 3：Tailwind トークン化（Day 5）

### 目的

主案のビジュアル仕様を `tailwind.config.ts` に反映し、実装段階で Figma 値を直接コピペできる状態にする。

### タスク

1. `tailwind.config.ts` に色トークン追記（要件定義書付録 C 準拠）
   - Background: `#000000` / `#0a0a0a`
   - Surface: `#18181b`
   - Primary: `cyan-400` (`#22d3ee`) / `sky-400` (`#38bdf8`)
   - Primary Hover: `cyan-500` / `sky-500`
   - Text: `zinc-50` / `zinc-400`
   - Border: `zinc-800`
2. `next/font/google` で Noto Sans JP + Inter 設定（`app/layout.tsx`）
3. グローバル CSS（`app/globals.css`）で base スタイル設定
4. 主案で確定したスペーシング・タイポスケール・角丸値を `theme.extend` に追記

### 検証

- 任意のページで `bg-cyan-400` `text-zinc-50` `font-bold` 等のクラスが期待通り効くか目視確認
- `pnpm build` が通る

### 成果物

- 更新済み `tailwind.config.ts`
- 更新済み `app/globals.css` と `app/layout.tsx`

---

## 6. Stage 4：5 プリミティブ実装 + `/styleguide` 確認（Day 5〜7）｜マイルストーン②

### 目的

**5 プリミティブコンポーネント**を実装し、内部用 `/styleguide` ページで全状態確認を行うことで、Stage 5 以降の複合コンポーネント実装の土台を確定させる。**これが本フローの最終ゴール「UI スタイル確定」**。

### 5 プリミティブ

| # | コンポーネント | 想定パス | 用途 |
|---|---|---|---|
| 1 | **Button** | `components/ui/Button.tsx` | primary / secondary / ghost / link バリアント、全状態 |
| 2 | **Input** | `components/ui/Input.tsx` | text / email / textarea、通常 / focus / error / disabled |
| 3 | **Card** | `components/ui/Card.tsx` | LiveCard / MemberCard / NewsCard の共通土台 |
| 4 | **SectionContainer** | `components/ui/SectionContainer.tsx` | `max-w-6xl mx-auto py-16 md:py-24 px-4 md:px-8` のラッパー |
| 5 | **Heading** | `components/ui/Heading.tsx` | h1〜h3、`text-4xl md:text-6xl` 等のスケール統一 |

### `/styleguide` ページ要件

- パス：`app/styleguide/page.tsx`
- **本番非公開**：`robots.txt` で除外 + `process.env.NODE_ENV === 'production'` 時は 404 を返す
- 5 プリミティブを全状態並べて表示（通常 / hover / focus / disabled / error）
- レスポンシブ確認用に 320px / 640px / 1024px / 1536px のブレイクポイント切替プレビューを設置

### マイルストーン②の合意条件

- [ ] 5 プリミティブが Figma 主案と視覚的に一致している
- [ ] 全状態（通常 / hover / focus / disabled / error）が表示される
- [ ] モバイル（320px）〜デスクトップ（1536px）で崩れない
- [ ] コントラスト比 4.5:1 以上（WCAG AA）が全テキストで満たされる
- [ ] Content Owner（えんまさ）がビジュアル合意

### 成果物

- 5 プリミティブの実装ファイル（`components/ui/*.tsx`）
- `/styleguide` ページ
- マイルストーン②合意の Git コミット（コミットメッセージに「UI style confirmed」を含める）

---

## 7. shadcn/ui 採否

### v0.1 では **不採用**

| 理由 | 詳細 |
|---|---|
| コンポーネント数が少ない | 必要なのは 8 種（Hero / NextLive / Members / SNSBar / Subscriptions / News / ContactForm / Footer + privacy）。ライブラリ導入コスト < 自前実装コスト |
| ブランド独自性最優先 | Vision「あの色のバンド、絶対観に行く」の独自世界観実現には、shadcn/ui の Radix 前提テーマがむしろ制約になる |
| 可逆性 | 一度入れると外すコストが高い。v0.5 以降に CMS 移行・楽曲ページ追加でコンポーネント数が増えた時点で再評価 |

### v0.5 以降の再評価タイミング

- 楽曲ページ / プレスキット追加でコンポーネント数が 15 を超えたとき
- メーリングリスト機能等で複雑なフォームが必要になったとき

---

## 8. 並行 / 直列の境界（要点再掲）

> **法則：デザインの未確定要素と実装の未確定要素を、同じレイヤーで衝突させない**

| カテゴリ | 並行可 / 不可 | 理由 |
|---|---|---|
| 環境セットアップ（pnpm / Next.js / Tailwind 導入） | ✅ 並行可 | デザイン主案に依存しない |
| データ型定義（`data/*.ts` Zod スキーマ） | ✅ 並行可 | 要件定義書 engineering.md §2 で確定済み |
| ディレクトリ構造 | ✅ 並行可 | 要件定義書 engineering.md §1.3 で確定済み |
| `lib/env.ts` | ✅ 並行可 | 要件定義書 engineering.md §2.6 で確定済み |
| Tailwind 色トークン定義（付録 C 部分） | ✅ 並行可 | 要件定義書付録 C で確定済み |
| Tailwind スペーシング / タイポスケール（主案部分） | ❌ 直列（Stage 3） | デザイン主案で確定する要素 |
| 5 プリミティブ実装 | ❌ 直列（Stage 4） | デザイン主案のスタイルに依存 |
| 複合コンポーネント実装 | ❌ 直列（Stage 5） | 5 プリミティブの確定に依存 |

---

## 9. マイルストーンと検収ゲート

| マイルストーン | 期日 | 検収ゲート |
|---|---|---|
| **MS①：デザイン主案 + バックアップ案 選定** | Day 4（2025/5/20） | North Star Quote 含意 5 項目 + えんまさ承認 |
| **MS②：UI スタイル確定（5 プリミティブ + `/styleguide` 合意）** | Day 7（2025/5/23） | 5 プリミティブ全状態表示 + レスポンシブ崩れなし + コントラスト比 4.5:1 + えんまさ承認 |
| Phase 1 公開 | Day 14（2025/5/31） | system Phase 1 完了条件 + AGENTS.md §7 機能完了の定義 |

---

## 10. リスクと対策

| リスク | 影響 | 対策 |
|---|---|---|
| アー写撮影が 5/25 までに完了しない | Stage 2 の主案選定が遅延 | バックアップ案（既存ライブ写真 10 枚）で先行進行、アー写到着後に主案へ差し替え |
| Claude Design 発散の精度が低い | Stage 2 で選定不能 | 評価軸 A / B / C / D を Day 1 入力カードで明示、発散の方向を固定 |
| Stage 4 で 5 プリミティブの状態漏れが発覚 | Stage 5 で「ここのスタイル決まってない」が頻発 | `/styleguide` のチェックリスト（全状態 × レスポンシブ）で漏れを潰す |
| `tailwind.config.ts` 再構築の手戻り | Phase 1 期日逸脱 | Stage 3 終了時点で `pnpm build` 通過を確認、以降 config は触らない |
| Tech Owner（えんまさ）のレビュー待機が長い | MS①/②の遅延 | レビュー枠を Day 4 / Day 7 にカレンダーで予約 |

---

## 11. AGENTS.md との整合

| AGENTS.md 該当箇所 | 本フローでの対応 |
|---|---|
| §1 非交渉 UX シーケンス | Stage 5（フロー外）で順序遵守。本フロー内ではコンポーネント並びを変更しない |
| §4 pnpm 限定 | Stage 1.2 で `pnpm create next-app` を採用、npm / yarn / bun 禁止 |
| §6 Layer 1（hook 自動ブロック） | Stage 1.2 タスク 6 で `.claude/hooks/prevent-destructive-command.js` 配置 |
| §6 Layer 2（Content Owner 承認） | MS① / MS② はえんまさ承認必須 |
| §7 Gate 1（Tech Owner） | Stage 3〜4 の `pnpm typecheck` / `lint` / `build` 通過必須 |
| §7 機能完了の定義 | MS② = 型チェック + ビルド成功 + Content Owner 動作確認の 3 条件を満たす |

---

## 12. このフロー完了後の次ステップ

本フロー完了（MS② 達成）後、`docs/development/v0.1_implementation_plan.md`（または別途定義）に従って Stage 5（複合コンポーネント実装、Day 8〜14）に進む。複合コンポーネントは非交渉 UX シーケンス順に実装：

```
Hero → SNSBar → NextLive → Members → Subscriptions → News → ContactForm → Footer
```

---

*本フローの議論プロセスは `docs/discussions/議論ログ_UIスタイル確定フロー.md` を参照。*
