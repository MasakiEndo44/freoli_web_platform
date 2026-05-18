---
doc_type: design_spec
title: v0.1 Design Spec（Tailwind / Component 数値仕様の正本）
product: freoli_web_platform
as_of: 2026-05-18
owners: [endo]
status: template
parent_flow: docs/design/ui_style_confirmation_flow.md
applies_to:
  - tailwind.config.ts
  - app/globals.css
  - app/layout.tsx
  - components/ui/*.tsx
---

# v0.1 Design Spec

> Stage 2（Day 4）で主案を選定した後、Figma の確定値をここに転記する。
> Stage 3（Day 5）で `tailwind.config.ts` に反映する際の **正本** として使う。

---

## 1. Color Tokens

> `tailwind.config.ts` の `theme.extend.colors` または `theme.colors` に反映する。
> Tailwind 標準名（`cyan-400` 等）をそのまま使い、custom name は作らない。

### 1.1 セマンティック割当（主案で確定する）

| 用途 | Tailwind トークン | HEX | 補足 |
|---|---|---|---|
| Background (base) | `bg-black` | `#000000` | ページ全体の地色 |
| Background (subtle) | `bg-zinc-950` | `#0a0a0a` | セクション切替の弱コントラスト |
| Surface (card) | `bg-zinc-900` | `#18181b` | Card / Input 背景 |
| Primary | `bg-cyan-400` / `text-cyan-400` | `#22d3ee` | CTA 背景・アクセント線・価格強調。`FR.cy4` に対応 |
| Primary Hover | `bg-cyan-500` / `text-cyan-500` | `#06b6d4` | Button / Link hover |
| Accent (補助) | `bg-sky-400` / `text-sky-400` | `#38bdf8` | Hero サブコピー・グラデーション起点。`FR.sk4` に対応 |
| Text Primary | `text-zinc-50` | `#fafafa` | 本文・見出し |
| Text Secondary | `text-zinc-400` | `#a1a1aa` | キャプション・補助情報（コントラスト比 4.5:1 を担保する下限） |
| Text Tertiary | `text-zinc-500` | `#71717a` | 装飾的ラベル（コントラスト 4.5:1 を満たさないため意味ある文字に使用禁止） |
| Border | `border-zinc-800` | `#27272a` | カード枠・区切り線 |
| Error | `text-red-400` / `border-red-400` | `#f87171` | フォームエラー |
| Success | `text-emerald-400` | `#34d399` | フォーム送信成功 |

### 1.2 ネオン光の表現パターン（主案の軸 B 選択を反映）

- **採用パターン**：**B-b（sky→cyan グラデーション wash）**
- **設計意図**：写真上に sky-400 → cyan-400 の薄い斜めグラデーションを乗せ、下部は黒へフェードしてテキスト可読性を確保。点光源やアウトラインは Hero では使用しない。
- **具体的実装パターン**：
  - **Hero カラーウォッシュ**：`bg-[linear-gradient(148deg,rgba(56,189,248,0.22)_0%,rgba(34,211,238,0.14)_40%,transparent_66%)]`（Mobile）/ `bg-[linear-gradient(148deg,rgba(56,189,248,0.20)_0%,rgba(34,211,238,0.12)_42%,transparent_68%)]`（Desktop）
  - **下部ダークフェード**：`bg-[linear-gradient(to_bottom,transparent_18%,rgba(0,0,0,0.66)_60%,#000_100%)]`（Mobile, 22%/55%/100% を Desktop で使用）
  - **CTA / アクセント線**：純色 `bg-cyan-400` を使用（グロー効果は使わない、フラットに振る）
  - **NextLive チケット枠の左ライン**：`border-l-2 border-cyan-400 shadow-[-2px_0_12px_rgba(34,211,238,0.2)]`
- **不採用**：B-a 点光源・B-c アウトラインは v0.1 では使用しない（v0.5 以降のリブランディング時に再評価）

---

## 2. Typography Scale

> `tailwind.config.ts` の `theme.extend.fontFamily` と `app/globals.css` の base スタイルに反映。

### 2.1 フォントファミリー

| 用途 | フォント | weight | next/font/google 設定 |
|---|---|---|---|
| 日本語本文・見出し | Noto Sans JP | 400 / 500 / 700 | `subsets: ['latin']`, variable: `--font-noto-sans-jp` |
| 英文ロゴ・タグ | Inter | 400 / 600 / 800 | `subsets: ['latin']`, variable: `--font-inter` |

### 2.2 スケール（主案で確定する）

| 用途 | Tailwind クラス | デザイン上のサイズ |
|---|---|---|
| Hero Title (英文ロゴ "FREOLI") | `font-inter font-extrabold text-[64px] md:text-[116px] tracking-[-0.03em] md:tracking-[-0.036em] leading-[0.92] md:leading-[0.88] text-zinc-50` | Mobile 64px / Desktop 116px |
| Hero Subtitle (日本語キャッチ) | `font-jp font-medium text-xs md:text-[15px] tracking-[0.12em] md:tracking-[0.10em] text-sky-400` | Mobile 12px / Desktop 15px |
| Section Eyebrow (例 "— NEXT LIVE") | `font-inter font-semibold text-[9px] tracking-[0.28em] text-zinc-400 uppercase` | 9px |
| NextLive 日付大 (例 "7.11") | `font-inter font-extrabold text-[96px] tracking-[-0.05em] leading-[0.84] text-zinc-50` | 96px（Desktop） |
| NextLive 日付サブ ("FRI") | `font-inter font-bold text-[22px] text-cyan-400 leading-none` | 22px |
| NextLive 価格 | `font-inter font-extrabold text-[28px] text-cyan-400` | 28px |
| NextLive 時間 | `font-inter font-semibold text-[20px] text-zinc-50` | 20px |
| NextLive 会場名 | `font-jp font-bold text-[26px] text-zinc-50` | 26px |
| Section Heading (h2) | `font-jp font-bold text-2xl md:text-4xl text-zinc-50` | — |
| Sub Heading (h3) | `font-jp font-semibold text-xl md:text-2xl text-zinc-50` | — |
| Body | `font-jp text-base md:text-lg text-zinc-50` | — |
| Caption | `font-jp text-sm text-zinc-400` | — |
| Micro Label (TICKET / OPEN 等) | `font-inter text-[9px] tracking-[0.16em] text-zinc-400 uppercase` | 9px |
| Button Label | `font-inter font-bold text-xs md:text-sm tracking-[0.06em]` | Mobile 12px / Desktop 14px |
| Form Label | `font-jp text-sm font-medium text-zinc-50` | — |

> 注：`font-inter` / `font-jp` は §2.1 で定義したフォント変数を `tailwind.config.ts` の `theme.extend.fontFamily` に登録した想定。実際のクラス名は `tailwind.config.ts` 反映時に確定する。

### 2.3 行高・字間

| 用途 | line-height | letter-spacing |
|---|---|---|
| 日本語本文 | `leading-relaxed` (1.625) | `tracking-normal` |
| 英文ロゴ (Hero) | `leading-[0.92]` (Mobile) / `leading-[0.88]` (Desktop) | `tracking-[-0.03em]` / `tracking-[-0.036em]` |
| 英文 NextLive 日付大 | `leading-[0.84]` | `tracking-[-0.05em]` |
| 見出し (h2 / h3) | `leading-tight` (1.25) | `tracking-tight` |
| 日本語キャッチ (Hero sub) | `leading-none` | `tracking-[0.12em]` (Mobile) / `tracking-[0.10em]` (Desktop) |
| Micro Label (eyebrow) | `leading-none` | `tracking-[0.28em]`（eyebrow）/ `tracking-[0.16em]`（フィールドラベル） |

---

## 3. Spacing System

> `tailwind.config.ts` の `theme.extend.spacing` で追加トークンが必要なら定義。
> 基本は Tailwind 標準スケール（4 / 8 / 12 / 16 / 20 / 24 ...）で済ませる。

| 用途 | Tailwind クラス | px 換算 |
|---|---|---|
| Section 垂直余白 | `py-16 md:py-24` | 64〜96 / 96〜144 |
| コンテナ最大幅 | `max-w-6xl mx-auto px-4 md:px-8` | 1152px |
| Card padding | `(主案で確定、例 p-6 md:p-8)` | — |
| Card 間ギャップ | `(主案で確定、例 gap-4 md:gap-6)` | — |
| Form input padding | `(主案で確定、例 px-4 py-3)` | — |
| Form input 間ギャップ | `(主案で確定、例 gap-4)` | — |
| Button padding | `(主案で確定、例 px-6 py-3)` | — |

---

## 4. Component Specs（5 プリミティブ）

> `components/ui/*.tsx` で実装する際の数値仕様。Stage 4（Day 5〜7）で実装。

### 4.1 Button

| プロパティ | 値 |
|---|---|
| Variants | `primary` / `secondary` / `ghost` / `link` |
| Height | `(主案で確定、例 h-12 / md:h-14)` |
| Padding | `(主案で確定、例 px-6)` |
| Border radius | `(主案で確定、例 rounded-full or rounded-lg)` |
| Font | `text-base font-semibold` |
| Min tap area | 44px × 44px（WCAG / iOS HIG 準拠、`min-h-[44px]`） |
| States | `normal / hover / focus-visible / disabled / loading` |
| Focus ring | `focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black` |
| Transition | `transition-colors duration-150` |

### 4.2 Input

| プロパティ | 値 |
|---|---|
| Types | `text` / `email` / `textarea` |
| Height (text/email) | `(主案で確定、例 h-12)` |
| Padding | `(主案で確定、例 px-4 py-3)` |
| Border radius | `(主案で確定、例 rounded-md)` |
| Border | `border border-zinc-800` → focus 時 `border-cyan-400` |
| Background | `bg-zinc-900` |
| Text color | `text-zinc-50` |
| Placeholder color | `placeholder-zinc-500` |
| States | `normal / focus / error / disabled` |
| Error state | `border-red-400 ring-1 ring-red-400/50` |
| Error message | `text-sm text-red-400 mt-1` |

### 4.3 Card

| プロパティ | 値 |
|---|---|
| Background | `bg-zinc-900` |
| Border | `border border-zinc-800` |
| Border radius | `(主案で確定、例 rounded-lg)` |
| Padding | `(主案で確定、例 p-6 md:p-8)` |
| Variants | `default / hoverable / featured` |
| Hover (hoverable) | `(主案で確定、例 hover:border-cyan-400 transition-colors)` |

### 4.4 SectionContainer

| プロパティ | 値 |
|---|---|
| Max width | `max-w-6xl` |
| Horizontal margin | `mx-auto` |
| Horizontal padding | `px-4 md:px-8` |
| Vertical padding | `py-16 md:py-24` |
| Background | (各セクションで独自指定可) |

### 4.5 Heading

| Variant | クラス | 用途 |
|---|---|---|
| `h1` | `(主案で確定)` | Hero タイトル |
| `h2` | `text-2xl md:text-4xl font-bold` | セクション見出し |
| `h3` | `text-xl md:text-2xl font-semibold` | サブ見出し |
| `eyebrow` | `text-sm font-semibold tracking-widest uppercase text-cyan-400` | セクション上の小見出し（主案で採用するか確定） |

---

## 5. Responsive Behavior

> ブレイクポイントは Tailwind デフォルトを使用（sm:640 / md:768 / lg:1024 / xl:1280 / 2xl:1536）。

### 5.1 ブレイクポイントごとの主な変化

| 画面幅 | Hero | Members | NextLive | Form |
|---|---|---|---|---|
| 320〜639px | 縦並び、Hero 写真フル幅、テキスト中央寄せ | 縦並び（1 列） | 単一カラム | 縦並び |
| 640〜1023px | 同上 or 軽く 2 カラム | 2 列グリッド | 単一カラム or 2 カラム | 縦並び |
| 1024〜1535px | 2 カラム or レイアウト変更 | 4 列グリッド | 2 カラム（情報 + マップ） | フォーム + 補助情報の 2 カラム |
| 1536px〜 | 同上 + 余白拡大 | 4 列グリッド + 余白拡大 | 同上 | 同上 |

詳細は Figma の Frame と照合。

### 5.2 タップエリア最低値

すべてのインタラクション要素：`min-h-[44px] min-w-[44px]`（WCAG 2.2 / iOS HIG）。

---

## 6. Animation / Transition

> Framer Motion は v0.1 では原則使わない。Tailwind の `transition-*` で済ませる。

| 対象 | クラス |
|---|---|
| Button hover/focus | `transition-colors duration-150` |
| Card hover | `transition-colors duration-200` or `transition-all duration-200` |
| Modal / Drawer | v0.1 では使用しない |
| Loading | spinner はカスタム CSS で（次セクション） |

### 6.1 Loading Spinner（Button loading 状態用）

- 実装：CSS の `@keyframes spin` を Tailwind の `animate-spin` で利用
- サイズ：Button の高さに対して 50%
- 色：`text-current`（Button のテキスト色を継承）

---

## 7. Accessibility

| チェック項目 | 基準 |
|---|---|
| コントラスト比（通常テキスト） | 4.5:1 以上（WCAG AA） |
| コントラスト比（大テキスト 18.66px / 14px Bold 以上） | 3:1 以上 |
| Focus visible | 全インタラクション要素で `focus-visible:ring-*` |
| Tap area | 44px × 44px 以上 |
| Form label | 全 input に `<label>` 関連付け（`htmlFor`） |
| Form error | `aria-invalid` + `aria-describedby` でエラーメッセージ関連付け |
| Image alt | 全 `<Image>` に `alt` 必須（装飾は `alt=""`） |
| Skip link | v0.1 ではスコープ外（単一ページなので） |

---

## 8. 受け入れチェック（Stage 4 完了判定）

- [ ] 上記すべての `(主案で確定)` 項目が埋まっている
- [ ] `tailwind.config.ts` に Color Tokens / Typography Scale が反映済み
- [ ] `app/globals.css` に base スタイル + フォント変数が設定済み
- [ ] 5 プリミティブが `/styleguide` で全状態表示
- [ ] レスポンシブ 4 ブレイクポイントで崩れなし
- [ ] コントラスト比 4.5:1 を Lighthouse or DevTools で確認

---

## 9. 更新履歴

| 日付 | 更新内容 | 担当 |
|---|---|---|
| `(YYYY-MM-DD)` | 初版作成（テンプレート配置時） | endo |
| `(YYYY-MM-DD)` | Stage 2 主案確定値を転記 | endo |
| `(YYYY-MM-DD)` | Stage 3 で `tailwind.config.ts` 反映完了 | endo |
| `(YYYY-MM-DD)` | Stage 4 で 5 プリミティブ実装完了 | endo |
