# FREOLI — Official Web Platform

```
  ╔═══════════════════════════════════════════════╗
  ║  ███████╗██████╗ ███████╗ ██████╗ ██╗     ██╗ ║
  ║  ██╔════╝██╔══██╗██╔════╝██╔═══██╗██║     ██║ ║
  ║  █████╗  ██████╔╝█████╗  ██║   ██║██║     ██║ ║
  ║  ██╔══╝  ██╔══██╗██╔══╝  ██║   ██║██║     ██║ ║
  ║  ██║     ██║  ██║███████╗╚██████╔╝███████╗██║ ║
  ║  ╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝╚═╝ ║
  ╚═══════════════════════════════════════════════╝
```

> 東京の4人組インディーロックバンド「**FREOLI**」の公式 Web プラットフォーム
> 🌐 **Live:** [https://freoli.vercel.app](https://freoli.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Hobby-000000?style=flat&logo=vercel)
![Resend](https://img.shields.io/badge/Resend-API-000000?style=flat)
![License](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=flat)

---

## ✨ What is this?

FREOLI の公式 Web プラットフォーム。「**新規発見の入口**」ではなく「**決断の最終確認所**」── SNS で FREOLI に興味を持った人物が、**ライブ参加 と 楽曲再生** という二大行動への転換を受ける場として設計されている。

ネオン系の鮮やかな青（`cyan-400` / `sky-400`）× シンプルな黒系背景で、サカナクション寄りの観察的・色彩的なトーンを表現。`v0.1（2025/5/31）→ v0.5（楽曲リリース時）→ v1.0（サーキット出演確定時）` の3段階リリースで進化する。

詳細仕様は [`docs/system_requirements.md`](./docs/system_requirements.md) と [`docs/detailed_requirements.md`](./docs/detailed_requirements.md) を参照。

---

## 🚀 Quick Start

```bash
# 1. クローン
git clone https://github.com/[your-account]/freoli-web.git
cd freoli-web

# 2. 依存パッケージのインストール（pnpm 推奨）
pnpm install

# 3. 環境変数ファイルの準備
cp .env.example .env.local
# ↓ .env.local を編集して各値を埋める（後述「Environment Variables」参照）

# 4. 開発サーバー起動
pnpm dev
# ブラウザで http://localhost:3000 を開く
```

**前提**: Node.js 20 LTS / pnpm 9+

---

## 📁 Project Structure

```
freoli-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # ルートレイアウト（フォント・メタ）
│   ├── page.tsx                  # トップページ（全セクション集約）
│   ├── privacy/
│   │   └── page.tsx              # プライバシーポリシー
│   └── api/
│       └── contact/
│           └── route.ts          # 問い合わせフォーム送信処理
├── components/                   # React コンポーネント
│   ├── Hero.tsx                  # ヒーロービジュアル
│   ├── NextLive.tsx              # 直近ライブ情報
│   ├── Members.tsx               # メンバープロフィール
│   ├── Links.tsx                 # SNS/サブスクリンク集
│   ├── ContactForm.tsx           # 問い合わせフォーム
│   ├── News.tsx                  # お知らせ
│   └── Footer.tsx                # フッター
├── data/                         # 🌟 コンテンツデータ（更新箇所はここ）
│   ├── lives.ts                  # ライブ情報
│   ├── members.ts                # メンバー情報
│   ├── news.ts                   # お知らせ
│   └── links.ts                  # SNS・サブスクのURL
├── public/                       # 静的ファイル
│   ├── images/                   # 写真素材
│   │   ├── hero/                 # ヒーロー画像
│   │   ├── members/              # メンバー写真
│   │   └── lives/                # ライブ写真
│   └── og.png                    # SNSシェア用OG画像
├── styles/
│   └── globals.css               # グローバルスタイル + Tailwind
├── docs/                         # 設計ドキュメント
│   ├── system_requirements.md
│   └── detailed_requirements.md
├── CONTENT_POLICY.md             # 🛡️ 権利ポリシー（写真・動画・楽曲）
├── .env.example                  # 環境変数のテンプレート
├── .env.local                    # 🔐 環境変数の実値（gitignore済 / commit禁止）
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 📝 Content Management

### 🎤 ライブ情報を追加する

[`data/lives.ts`](./data/lives.ts) を編集する。配列の先頭に追記（日付降順を維持）：

```typescript
// data/lives.ts
export const lives: Live[] = [
  {
    id: "live-2025-07-11",
    date: "2025-07-11",
    startTime: "19:00",
    venue: "Blue Sheep (下北沢)",
    venueUrl: "",                 // 空文字なら「会場へお問い合わせください」表示
    ticketUrl: "",                // 空文字なら表示しない
    price: "¥2,500 + 1D",
    withBands: ["対バン名1", "対バン名2"],
    isPublished: true,            // false にすると非表示
  },
  // ↑ 既存のライブはこの下に
];
```

### 📰 ニュースを投稿する

[`data/news.ts`](./data/news.ts) を編集：

```typescript
// data/news.ts
export const news: NewsItem[] = [
  {
    id: "news-2025-05-31",
    date: "2025-05-31",
    title: "公式サイトを公開しました",
    body: "FREOLI の公式 Web サイトを公開しました。7月11日のライブもよろしく！",
    tag: "announcement",          // "live" | "release" | "media" | "announcement"
  },
  // ...
];
```

### 👥 メンバー情報を更新する

[`data/members.ts`](./data/members.ts) を編集：

```typescript
// data/members.ts
export const members: Member[] = [
  {
    id: "yusuke",
    name: "ゆうすけ",
    realName: "上田 祐介",
    part: "Gt. / Vo.",
    photo: "/images/members/yusuke.jpg",
    bio: "1〜2行の自己紹介文",
  },
  // ...
];
```

### 🖼️ 写真を更新する

1. 画像を `public/images/` 配下に配置（メンバー → `members/`、ライブ → `lives/`）
2. ファイル名は英数小文字＋ハイフン推奨（例: `yusuke.jpg`, `live-2025-07-11-01.jpg`）
3. データファイル（`members.ts` / `lives.ts`）でパスを参照
4. **被写体本人の合意必須**（[CONTENT_POLICY.md](./CONTENT_POLICY.md) 参照）

---

## 🌐 Deployment

このプロジェクトは **Vercel** で自動デプロイされる：

```bash
# 通常の更新
git add .
git commit -m "Add: 2025-07-11 ライブ情報"
git push origin main
# ↑ push されると Vercel が自動ビルド・デプロイ（3分以内に本番反映）
```

**本番URL**: https://freoli.vercel.app

プレビュー（PR ごと）: PR を作ると Vercel が自動でプレビューURLを生成。Issue/PR コメントで共有可能。

---

## 🔐 Environment Variables

セットアップ時に `.env.local` に以下の変数を設定する。**値は絶対に commit しない**。

```bash
# Resend API（問い合わせフォーム送信用）
RESEND_API_KEY=                  # https://resend.com/api-keys から取得
RESEND_FROM_EMAIL=               # 例: noreply@resend.dev（初期）

# Cloudflare Turnstile（フォームのbot対策）
NEXT_PUBLIC_TURNSTILE_SITE_KEY=  # 公開可、クライアントで使用
TURNSTILE_SECRET_KEY=            # 秘匿、サーバーのみ

# 問い合わせの送信先
CONTACT_TO_EMAIL=freoli.official@gmail.com
```

> **⚠️ Secrets 取り扱い**:
> - `.env.local` は `.gitignore` に含まれており commit されない
> - 本番環境の値は **Vercel Dashboard → Settings → Environment Variables** で管理
> - もし誤って commit してしまった場合は、即座にキーを再発行し、Git 履歴からの削除を実施

---

## 🛡️ Content Policy

このサイトに掲載されるコンテンツは [CONTENT_POLICY.md](./CONTENT_POLICY.md) に従う。要点：

- **メンバー写真**: 本人の Yes が出たもののみ掲載、削除依頼から1営業日以内に対応
- **ライブ写真**: 撮影者の明示、写っているメンバー全員の Yes が必要
- **動画**: ホームページ内には動画を埋め込まない（SNSプラットフォームで完結）
- **楽曲埋め込み**: 公式配信プラットフォーム（Spotify / Apple Music）の埋め込みのみ可
- **ニュース投稿**: 投稿前にえんまさのレビュー必須

問い合わせフォームで取得した個人情報の取り扱いは [`app/privacy/page.tsx`](./app/privacy/page.tsx)（プライバシーポリシー）を参照。

---

## 🆘 Troubleshooting

### サイトが落ちている / 表示がおかしい

1. **Vercel Dashboard** を確認 → 最新デプロイの状態をチェック
2. ビルドが失敗していれば、ログから原因を特定
3. 直前の commit を `git revert` して push すると、自動で前バージョンに戻る

```bash
# 直前の commit を取り消す
git revert HEAD
git push origin main
```

### 問い合わせフォームが動かない

1. Vercel Dashboard の **Functions ログ** を確認
2. Resend API キーが正しく設定されているか確認
3. Resend のステータスページを確認: https://status.resend.com/
4. 一時的に対応できない場合は、サイト上で `freoli.official@gmail.com` への mailto: にフォールバック表示

### 環境変数を間違って commit してしまった

1. **即座に該当 APIキーを再発行**（Resend / Cloudflare ダッシュボードで）
2. `.env.local` を `.gitignore` に追加（既に追加されているはず）
3. Git 履歴からの完全削除は `git filter-repo` 等で実施 → えんまさに即連絡

### 急ぎでサイトを更新する必要があるが、えんまさが連絡取れない

1. このリポジトリにアクセス権があるか確認（ひろむ・aberyo はバックアップ担当）
2. 上記 [Content Management](#-content-management) のセクションに従って該当データファイルを編集
3. commit → push で自動デプロイ
4. **不安な場合は、まずは Slack で他のメンバーに相談すること**

### 困った時の連絡先

- **えんまさ (あのむ / 遠藤 真輝)**: Slack DM が最速 / 緊急時は LINE
- **バックアップ担当**: ひろむ・aberyo （Slack / LINE）

---

## 👥 Contributors / Members

このプロジェクトは FREOLI のメンバーで運営されている：

| 通称 | パート | このリポジトリでの役割 |
|---|---|---|
| **ゆうすけ** (上田 祐介) | Gt. / Vo. | プロフィール文・写真の承認 |
| **あのむ / えんまさ** (遠藤 真輝) | Gt. / Cho. | **メンテナ・全コンテンツ更新の主担当** |
| **ひろむ** (森田 紘睦) | Ba. / Cho. | バックアップ担当（緊急時の更新） |
| **Aberyo** | Dr. | バックアップ担当 / SNS連動 / 写真選定 |

---

## 🗺️ Roadmap

| Phase | 期間 | 主な内容 |
|---|---|---|
| **v0.1** ✅ | 2025/5/31 | 最小構成リリース、7/11 ライブ集客装置 |
| **v0.2** | 〜 2025/7/11 | 写真ギャラリー、過去ライブ履歴、パフォーマンス改善 |
| **v0.5** | 2025年7〜9月 | Spotify / Apple Music 埋め込み、楽曲ページ |
| **v1.0** | 2026 後半〜 | サーキット出演対応、独自ドメイン取得、プレスキット |

詳細は [`docs/system_requirements.md`](./docs/system_requirements.md) の「開発ロードマップ」セクションを参照。

---

## 📐 README メンテナンスルール

このREADME を信頼できるドキュメントとして保つため、以下を**変更時に必ずチェック**：

- [ ] ディレクトリ構造が変わった → `Project Structure` を更新
- [ ] 環境変数を追加・変更した → `Environment Variables` を更新
- [ ] 主要コマンドが変わった → `Quick Start` を更新
- [ ] 新しい運用フローができた → `Content Management` を更新
- [ ] メンバーに変動があった → `Contributors / Members` を更新

---

## 📄 License

**All Rights Reserved.**

このリポジトリのコード・コンテンツの著作権はバンド「FREOLI」およびそのメンバーに帰属する。無断複製・転載・商用利用を禁ずる。

ライブ参加・楽曲視聴・SNSフォロー等を通じた応援はもちろん歓迎。

---

```
[ FREOLI / 2025– ]   built with caffeine and cyan-400.
```
