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
| Section 垂直余白（汎用） | `py-16 md:py-24` | 64〜96 / 96〜144 |
| Hero 下部 padding | `px-[22px] pb-[30px]` / `md:px-16 md:pb-14` | Mobile 22/30 / Desktop 64/56 |
| NextLive Section padding | `px-[22px] py-10` / `md:px-16 md:pt-[52px] md:pb-14` | — |
| SNS Bar padding | `px-5 py-[14px]` / `md:px-16 md:py-[18px]` | Mobile 20/14 / Desktop 64/18 |
| コンテナ最大幅 | `max-w-6xl mx-auto px-4 md:px-8` | 1152px |
| Card padding (NextLive チケット予約枠) | `px-6 py-5` | 24/20 |
| Card padding (汎用 Members 等) | `p-6 md:p-8` | — |
| Card 間ギャップ | `gap-4 md:gap-6` | 16 / 24 |
| Form input padding | `px-4 py-3` | 16 / 12 |
| Form input 間ギャップ | `gap-4` | 16 |
| Button padding (Hero CTA) | `px-[22px] py-[11px]` / `md:px-7 md:py-[13px]` | Mobile 22/11 / Desktop 28/13 |
| Button padding (汎用) | `px-6 py-3` | 24 / 12 |

> **22px / 30px / 52px のカスタム値について**：採用案（[freoli-final.jsx](../references/freoli-final.jsx)）のレイアウトバランスを保持するため、Tailwind 標準スケール（`px-6`=24px 等）に丸めずカスタム任意値で残す。`tailwind.config.ts` の `theme.extend.spacing` に追加トークンとしては登録せず、`px-[22px]` 形式で都度指定する方針。

---

## 4. Component Specs（5 プリミティブ）

> `components/ui/*.tsx` で実装する際の数値仕様。Stage 4（Day 5〜7）で実装。

### 4.1 Button

| プロパティ | 値 |
|---|---|
| Variants | `primary` / `secondary` / `ghost` / `link` |
| Height | `min-h-[44px]`（タップエリア基準を全 variant で強制） |
| Padding (Hero CTA, primary) | `px-[22px] py-[11px] md:px-7 md:py-[13px]` |
| Padding (汎用) | `px-6 py-3` |
| Border radius | `rounded-none`（採用案は角張ったフラット形状を採用） |
| Font (Hero CTA) | `font-inter font-bold text-xs md:text-sm tracking-[0.06em]` |
| Font (汎用) | `font-inter font-semibold text-base` |
| Primary 背景・文字 | `bg-cyan-400 text-black`（hover: `bg-cyan-500`） |
| Secondary | `border border-cyan-400 text-cyan-400 bg-transparent`（hover: `bg-cyan-400/10`） |
| Min tap area | 44px × 44px（WCAG 2.2 / iOS HIG 準拠、`min-h-[44px] min-w-[44px]`） |
| States | `normal / hover / focus-visible / disabled / loading` |
| Focus ring | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black` |
| Transition | `transition-colors duration-150` |
| アイコン併用 | 右側矢印は inline-flex で `gap-2.5`（10px）、SVG 12〜14px |

> **注**：採用案の Hero CTA は本来 padding が 11px / 13px で 44px 未満になる。Spec 上は `min-h-[44px]` を強制し、padding は維持しつつ高さを自動拡張する。実装時に視覚的バランスが崩れる場合は Content Owner と再調整。

### 4.2 Input

| プロパティ | 値 |
|---|---|
| Types | `text` / `email` / `textarea` |
| Height (text/email) | `h-12`（48px、`min-h-[44px]` 担保） |
| Padding | `px-4 py-3` |
| Border radius | `rounded-md`（採用案の NextLive チケット枠 6px と同系統） |
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
| Border radius | `rounded-md`（6px、採用案 NextLive チケット枠と統一） |
| Padding | `px-6 py-5`（NextLive 系）/ `p-6 md:p-8`（Members 等の汎用） |
| Variants | `default / hoverable / featured` |
| Hover (hoverable) | `hover:border-cyan-400 transition-colors duration-200` |
| Featured (NextLive チケット強調) | 左ボーダーを `border-l-2 border-cyan-400` + `shadow-[-2px_0_12px_rgba(34,211,238,0.2)]` で発光 |

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
| `h1` | `font-inter font-extrabold text-[64px] md:text-[116px] tracking-[-0.03em] md:tracking-[-0.036em] leading-[0.92] md:leading-[0.88] text-zinc-50` | Hero タイトル（英文ロゴ "FREOLI"） |
| `h2` | `font-jp font-bold text-2xl md:text-4xl text-zinc-50` | セクション見出し |
| `h3` | `font-jp font-semibold text-xl md:text-2xl text-zinc-50` | サブ見出し |
| `eyebrow` | `font-inter font-semibold text-[9px] tracking-[0.28em] text-zinc-400 uppercase`（先頭に半角ダッシュ "— " を付与する運用） | セクション上の小見出し。採用案では `"— NEXT LIVE"` 形式で使用 |

> **採用案との差分**：`eyebrow` の色を従来案の `text-cyan-400` から `text-zinc-400` に変更（採用案の NextLive 上部ラベルが zinc-400 で実装されているため）。アクセント色を強調したい場合のみ `text-cyan-400` のバリアントを許可。

---

## 5. Responsive Behavior

> ブレイクポイントは Tailwind デフォルトを使用（sm:640 / md:768 / lg:1024 / xl:1280 / 2xl:1536）。

### 5.1 ブレイクポイントごとの主な変化

採用案は **375px と 1024px の 2 アートボード** のみ用意されている。中間帯（640〜1023px）の振る舞いは下表の方針で実装する：**`lg:` 未満は Mobile レイアウトを流用** し、`lg:` で Desktop へ一段で切替える。

| 画面幅 | Hero | Members | NextLive | Form |
|---|---|---|---|---|
| 320〜1023px (Mobile) | 縦並び、Hero 写真フル幅、テキスト下部 22px 余白、FREOLI 64px | 縦並び（1 列） | 単一カラム、日付大型は 64px に縮小 | 縦並び |
| 1024〜1535px (Desktop) | 同レイアウト + 余白 64px、FREOLI 116px | 4 列グリッド | 2 カラム（左：日付+会場 / 右：時間+価格+CTA） | フォーム + 補助情報の 2 カラム |
| 1536px〜 (Wide) | 余白のみ拡大、最大幅 1152px で頭打ち | 4 列グリッド + 余白拡大 | 同上 | 同上 |

> **Mobile/Desktop の Hero 構造は同一**（Hero photo + テキスト下部寄せ + SNSBar）。Desktop 化に伴う構造変更はない。サイズ・余白のみ Tailwind `md:` / `lg:` プレフィックスで切替える。
>
> Tablet 帯（640〜1023px）に独自レイアウトは設けない。これは v0.1 のスコープ短縮判断であり、v0.5 以降で必要なら再設計する。

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

### 7.1 採用案レビューで検出した修正必須事項

実装時に以下を **デザイン成果物から修正して反映** する：

| # | 検出箇所 | 問題 | 実装時の修正方針 |
|---|---|---|---|
| 1 | SNS バー（Mobile・Desktop 共通） | SVG アイコン 18〜20px のみで `min-h-[44px] min-w-[44px]` 未達 | `<a>` ラッパで `flex items-center justify-center min-h-11 min-w-11 p-3` を確保し、視覚的なアイコンサイズは維持 |
| 2 | Desktop SNS バーのアイコン下ラベル文字色 | `text-zinc-600` (#52525b) × `bg-zinc-950` (#0a0a0a) ≈ 2.4:1（4.5:1 未達） | ① `text-zinc-400` (#a1a1aa, 約 7.2:1) に昇格、または ② ラベルを削除して `aria-label` 属性で代替 |
| 3 | Hero CTA `bg-cyan-400` × `text-black` のテキストサイズ 12px | 大テキスト基準 18.66px 未満なので 4.5:1 必要 | cyan-400 × black ≈ 14.5:1 で問題なし、ただし最終確認は実装時 |
| 4 | Hero CTA のタップエリア（padding 11/13px のみ → 高さ約 34/40px） | 44px 未達 | `min-h-[44px]` を強制（§4.1 で規定済み） |
| 5 | NextLive チケット予約カードの「予約する →」ボタン padding 12/24px | 高さ約 38px、44px 未達 | `min-h-[44px]` を強制 |

---

## 8. 受け入れチェック（Stage 4 完了判定）

- [x] 上記すべての `(主案で確定)` 項目が埋まっている（2026-05-18 完了）
- [x] `tailwind.config.ts` に Color Tokens / Typography Scale が反映済み（2026-05-18 完了。Color は Tailwind 標準色を直接 class で利用する方針のため `theme.extend.colors` への登録は行わず、`theme.extend.fontFamily` で `font-inter` / `font-jp` のみ追加。タイポは Hero など Inter / Noto Sans JP 含むカスタム値を都度 `text-[64px]` 形式で指定する方針）
- [x] `app/globals.css` に base スタイル + フォント変数が設定済み（2026-05-18 完了。`@layer base` で body を `bg-black text-zinc-50 antialiased` に固定、`font-family` に `--font-noto-sans-jp` / `--font-inter` を CSS 変数経由で適用。`app/layout.tsx` で `next/font/google` から Inter + Noto Sans JP を読み込み、`html` 要素に `lang="ja"` と両フォント variable を付与）
- [ ] 5 プリミティブが `/styleguide` で全状態表示
- [ ] レスポンシブ 4 ブレイクポイントで崩れなし
- [ ] コントラスト比 4.5:1 を Lighthouse or DevTools で確認

---

## 9. 更新履歴

| 日付 | 更新内容 | 担当 |
|---|---|---|
| `(YYYY-MM-DD)` | 初版作成（テンプレート配置時） | endo |
| 2026-05-18 | Stage 2 主案 = HE-01（A-a × B-b × C-c）+ NextLive-2 を `docs/design/references/freoli-final.jsx` から転記。§1〜§5・§7 のプレースホルダ全埋め、§7.1 に SNS バー / CTA タップエリア・コントラスト修正方針を追加 | endo |
| 2026-05-18 | Stage 3：`tailwind.config.ts` に `font-inter` / `font-jp` を登録、`app/globals.css` で body を dark 固定 + フォント変数適用、`app/layout.tsx` を `next/font/google` の Inter + Noto Sans JP に差替え（Geist 削除）、`lang="ja"` 化。`pnpm typecheck` / `pnpm lint` 通過 | endo |
| `(YYYY-MM-DD)` | Stage 4 で 5 プリミティブ実装完了 | endo |
