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
| Primary | `(主案で確定)` | `(値)` | cyan-400 / sky-400 のどちらを主として使うか確定 |
| Primary Hover | `(主案で確定)` | `(値)` | cyan-500 / sky-500 |
| Text Primary | `text-zinc-50` | `#fafafa` | 本文・見出し |
| Text Secondary | `text-zinc-400` | `#a1a1aa` | キャプション・補助情報 |
| Border | `border-zinc-800` | `#27272a` | カード枠・区切り線 |
| Error | `(主案で確定、推奨 red-400)` | `(値)` | フォームエラー |
| Success | `(主案で確定、推奨 emerald-400)` | `(値)` | フォーム送信成功 |

### 1.2 ネオン光の表現パターン（主案の軸 B 選択を反映）

主案で採用した軸 B（点光源 / グラデーション / アウトライン）に応じて記載：

- **採用パターン**：`(B-a / B-b / B-c のいずれか)`
- **具体的実装**：
  - 例（B-a 点光源採用時）：`text-cyan-400 drop-shadow-[0_0_8px_rgb(34,211,238,0.5)]`
  - 例（B-b グラデーション採用時）：`bg-gradient-to-b from-sky-400/20 via-black to-black`
  - 例（B-c アウトライン採用時）：`border border-cyan-400 text-cyan-400 bg-transparent`

---

## 2. Typography Scale

> `tailwind.config.ts` の `theme.extend.fontFamily` と `app/globals.css` の base スタイルに反映。

### 2.1 フォントファミリー

| 用途 | フォント | weight | next/font/google 設定 |
|---|---|---|---|
| 日本語本文・見出し | Noto Sans JP | 400 / 500 / 700 | `subsets: ['latin']`, variable: `--font-noto-sans-jp` |
| 英文ロゴ・タグ | Inter | 400 / 600 / 800 | `subsets: ['latin']`, variable: `--font-inter` |

### 2.2 スケール（主案で確定する）

| 用途 | Tailwind クラス | Figma 上のサイズ |
|---|---|---|
| Hero Title (英文ロゴ) | `(主案で確定、例 text-5xl md:text-7xl font-bold)` | `(Figma 値)` |
| Hero Subtitle (日本語キャッチ) | `(主案で確定、例 text-base md:text-xl font-medium)` | `(Figma 値)` |
| Section Heading (h2) | `text-2xl md:text-4xl font-bold` | `(Figma 値)` |
| Sub Heading (h3) | `text-xl md:text-2xl font-semibold` | `(Figma 値)` |
| Body | `text-base md:text-lg` | `(Figma 値)` |
| Caption | `text-sm text-zinc-400` | `(Figma 値)` |
| Button Label | `text-base font-semibold` | `(Figma 値)` |
| Form Label | `text-sm font-medium` | `(Figma 値)` |

### 2.3 行高・字間

| 用途 | line-height | letter-spacing |
|---|---|---|
| 日本語本文 | `leading-relaxed` (1.625) | `tracking-normal` |
| 英文ロゴ | `(主案で確定、例 leading-none)` | `(主案で確定、例 tracking-tight or tracking-widest)` |
| 見出し | `leading-tight` | `(主案で確定)` |

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
