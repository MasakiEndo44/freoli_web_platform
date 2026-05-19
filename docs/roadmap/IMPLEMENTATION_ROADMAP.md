---
doc_id: roadmap.freoli_web_platform
doc_type: implementation_roadmap
product: freoli_web_platform
as_of: 2026-05-19
owners: [endo]
parent_doc: docs/requirements/freoli_web_platform/features/index.md
source_discussion: docs/discussions/議論ログ_実装ロードマップ.md
review_cycle: per-phase-transition
---

# FREOLI Web Platform — Implementation Roadmap

> **本ファイルの位置づけ**: `docs/requirements/` 配下の 6 層（Vision / Outcome / Capability / Feature / Eval / EngSpec）は **計画図**。
> このロードマップはそれを **進行管理図** に翻訳する。Phase 単位の依存グラフ + 入出口条件 + 不可逆/可逆タスク分離で記述。
>
> **更新タイミング**: Phase 遷移時 + 月次レビュー時に必ず本ファイルと CLAUDE.md / README.md の「実装状況」を同期させる。

---

## 0. 設計原則（議論ログ Turn 5 から）

### 🎯 3 原則：FREOLI Roadmap Principles

| # | 原則 | 意味 |
|---|---|---|
| ① | **Phase as Single PR** | 1 つの Phase 遷移は 1 つのブランチ・1 つの PR で完結させる。Vercel revert で Phase まるごと前バージョンに戻せる単位を維持。 |
| ② | **Reversible First, Irreversible Front-loaded** | 不可逆タスク（DNS / ENV / 外部 API 鍵 / 公開済写真）は Phase の頭に集中。可逆な UI / コピー / `data/*.ts` 更新と分離する。 |
| ③ | **Bandscape Co-evolution** | バンド像の進化（"ライブで会うバンド" → "聴いて観に行くバンド"）と HP の Feature 進化を同時に着地させる。Embed だけ追加して Hero コピーが古いままは禁。 |

---

## 1. Phase 全景

```
Phase 1 (v0.1)            v0.2                v0.5                  v1.0
─────────────────  ─────────────────  ────────────────────  ─────────────────
最小構成 launch     重要枠の追加          楽曲リリース時          サーキット出演時
2025/5/31 想定      〜 2025/7/11          2025 年内             2027 初頭

[現在地: 2026-05-19]
  ├ v0.1 launch は要件上 "完了" の想定だが Phase 1 残タスクが残存
  ├ v0.2 着手前
  └ v0.5 / v1.0 は外部トリガー待ち

進行方向 →→→
```

| Phase | 入口条件（トリガー） | 出口条件（完了判定） | 主な Feature |
|---|---|---|---|
| **Phase 1 (v0.1)** | (済) 要件定義 v3 合意 | Phase 1 残タスク 5 件すべて main マージ + Vercel 本番反映 | FEAT-001/002/003/005/006(grayed)/007/008/009/011/012 |
| **v0.2** | Phase 1 完了 + 7/11 動員数実測値の取得 | FEAT-004 + FEAT-010 が main マージ + `actual_attendance` 全公演記入 | + FEAT-004 PhotoGallery / FEAT-010 PastLives |
| **v0.5** | Spotify / Apple Music 配信代行登録完了 + 最初の楽曲マスター完成 | サブスク Embed + Hero コピー + News + Spotify ページ の 4 同時着地 PR が main マージ | FEAT-006 OP-01 / Hero 刷新 / FEAT-007 リリース告知運用 |
| **v1.0** | サーキット出演オファー受領 or 動員 100 人達成 | 独自ドメイン稼働 + 301 リダイレクト動作確認 + /press ページ公開 | OP-02 / プレスキット / メーリングリスト検討 |

---

## 2. 実装状況インベントリ（2026-05-19 時点）

> **凡例**: 🟢 完了 / 🟡 部分実装 / 🔴 未着手・破綻 / ⚪ 未着手（Phase 2 以降のため計画通り）

### 2.1 Feature × 実装状況

| Feature | 状態 | 実装の中身 | ギャップ |
|---|---|---|---|
| **FEAT-001 Hero** | 🟡 | `components/sections/Hero.tsx`、`/images/band/freoli_1.JPEG` 使用、コピー "東京発、4人組インディーロック" | キャッチコピー 30〜80 字を確定する（v3 中優先度 #1）。"心が先に動く" の Vision V-7 と整合する文面が未確定。 |
| **FEAT-002 NextLive** | 🟢 | `LivesSection.tsx`、Blue Sheep 表示、F1.5 縮退 UI + F1.2 フォールバック実装済 | — |
| **FEAT-003 Members** | 🟡 | `MembersSection.tsx`、楽器順ソート、シルエットフォールバック実装、4 名定義 | あのむ以外 3 名（ゆうすけ / ひろむ / aberyo）の bio が「（仮）」、`photoPath: null`、`consentLogged: false`。**Members 残 3 名タスク**。 |
| **FEAT-004 PhotoGallery** | ⚪ | 未実装 | Phase 2 (v0.2) で着手予定。被写体 Yes ログ照合フロー必須。 |
| **FEAT-005 SNSBar** | 🟡 | `SNSBar.tsx`、grayed out 状態 UI 実装済 | `data/links.ts` の Instagram / YouTube / TikTok / X の URL が全て `null`。**SNS URL 入力タスク**。 |
| **FEAT-006 Subscriptions** | 🟢 | `SubscribeBar.tsx`、"2025 年配信予定" ラベル + grayed out 表示 | v0.1 仕様達成。v0.5 で Embed 化へ。**ただし日付 2026 年現在のため "2025 年配信予定" 文言の見直し検討要**（議論ログ Turn 2 みさき指摘）。 |
| **FEAT-007 News** | 🟡 | `NewsList.tsx`、空配列フォールバック "ニュースは準備中です。" 表示 | `data/news.ts` が空配列。**7/11 ライブ告知の初回投稿**（v3 中優先度 #3）が必要。NW-03 月 1 回更新ルールの初回発火。 |
| **FEAT-008 ContactForm** | 🔴 | `ContactForm.tsx` UI 実装 + Zod スキーマ (`lib/contact-schema.ts`) あり、しかし `turnstileToken: "v0.1-stub"` で送信は `console.log` のみ | **`app/api/contact/route.ts` が未配置**。Resend 統合・Turnstile サーバー検証・503 fallback すべて未実装。Phase 1 launch の致命的ギャップ。 |
| **FEAT-009 Privacy** | 🔴 | `app/privacy/page.tsx` **未配置** | v3 §付録 B 素案を起点に作成。CF-06（フォームから /privacy へのリンク）の前提条件。 |
| **FEAT-010 PastLives** | ⚪ | 未実装 | Phase 2 (v0.2) で着手予定。型定義 `actual_attendance: number \| null` は `data/lives.ts` に既に実装済（D-O1 / D-F2 反映済）。 |
| **FEAT-011 DeployGuard** | 🟢 | `.claude/hooks/prevent-destructive-command.js` 配置済、`lib/env.ts` Zod fail-fast 実装、`.env.local` は `.gitignore` 対象 | — |
| **FEAT-012 ContentPolicy** | 🔴 | `CONTENT_POLICY.md` **未配置**（README から参照されているが実体ファイルなし） | v3 §付録 A 素案を起点にリポジトリ直下配置。CAP-004 運用の信頼源。 |

### 2.2 データファイル × 実装状況

| ファイル | 状態 | 課題 |
|---|---|---|
| `data/lives.ts` | 🟡 | Blue Sheep 1 件のみ。`venueUrl` / `venuePhone` / `ticketUrl` 全て `undefined`。`actual_attendance: null`。**実測値遡及記入** + Blue Sheep の電話番号 or 公式 URL（v3 中優先度 #6）。 |
| `data/members.ts` | 🟡 | 4 名定義済、あのむのみ `consentLogged: true` + `photoPath` 設定済。他 3 名未完。 |
| `data/news.ts` | 🔴 | 空配列。初回投稿待ち。 |
| `data/links.ts` | 🔴 | 全 6 件が `url: null` + `status: "coming-2025"`。SNS 実 URL 入力必須（status `"active"` 切替も）。 |

### 2.3 環境変数 × Vercel デプロイ

| 項目 | 状態 |
|---|---|
| `.env.local` | 🟢 配置済 |
| `.env.example` | 🟢 配置済（`RESEND_API_KEY` / `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` / `CONTACT_EMAIL_TO`） |
| Vercel Environment Variables | 🟡 **実値の本番設定状況は要確認**。本ファイル更新前にダッシュボードで確認すること。 |
| `lib/env.ts` Zod fail-fast | 🟢 実装済 |

---

## 3. Phase 1 残タスク（最優先）

> **方針**: 議論ログ D-R1 に従い、可能な限り **1 PR で束ねる**。ただし権利確認（Members 3 名分）は外部依存があるため分離可。

### 3.1 不可逆タスク（Phase の頭に配置）

| ID | タスク | 種別 | 補足 |
|---|---|---|---|
| P1-IR-01 | Vercel Environment Variables に `RESEND_API_KEY` / `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` / `CONTACT_EMAIL_TO` を本番・プレビュー両方に登録 | ENV 設定 | 設定後の取消は秘密情報露出のため不可逆扱い。Resend / Turnstile の発行も同時に。 |
| P1-IR-02 | Members 3 名分の写真承諾取得 + Notion Yes ログ記入 | 権利確認 | 一度公開した写真の取消は被写体合意の取り直しコストを伴う |

### 3.2 可逆タスク（Phase 内で柔軟に）

| ID | タスク | 関連 Feature / EARS | 推定 PR |
|---|---|---|---|
| P1-RV-01 | `app/api/contact/route.ts` 実装（Resend SDK + Turnstile siteverify + Zod 検証 + 503 fallback） | FEAT-008 / CF-01〜06 / IF-01〜03 | PR-A |
| P1-RV-02 | `ContactForm.tsx` の Turnstile ウィジェット統合（`turnstileToken: "v0.1-stub"` を実トークンに置換） | FEAT-008 / IF-02 | PR-A |
| P1-RV-03 | `app/privacy/page.tsx` 配置（v3 §付録 B 素案ベース） | FEAT-009 / F5.5 / CF-06 | PR-A |
| P1-RV-04 | `CONTENT_POLICY.md` をリポジトリ直下に配置（v3 §付録 A 素案ベース） | FEAT-012 / F5.1 / F5.2 | PR-A |
| P1-RV-05 | Hero キャッチコピー 30〜80 字確定（"心が先に動く" Vision 整合） | FEAT-001 / HE-03 | PR-B（独立可） |
| P1-RV-06 | Members 残 3 名（ゆうすけ / ひろむ / aberyo）の bio + `photoPath` + `consentLogged: true` 反映 | FEAT-003 / U-09 | PR-C（IR-02 完了後） |
| P1-RV-07 | 初回 News 投稿（7/11 Blue Sheep ライブ告知）を `data/news.ts` に追加 | FEAT-007 / NW-04 | PR-B 同梱可 |
| P1-RV-08 | `data/links.ts` の SNS 4 種（Instagram / YouTube / TikTok / X）の URL 入力 + `status: "active"` 切替 | FEAT-005 | PR-B 同梱可 |
| P1-RV-09 | `data/lives.ts` の Blue Sheep 公演に `venueUrl` or `venuePhone`（v3 中優先度 #6） | FEAT-002 / NL-02 | PR-B 同梱可 |
| P1-RV-10 | 7/11 Blue Sheep 公演の `actual_attendance` 遡及記入（実測値が取得できれば） | FEAT-002 / FEAT-010 / D-O1 | PR-D（v0.2 着手の最初の PR と統合可） |

### 3.3 Phase 1 完了判定（出口条件）

- [ ] 上記 P1-IR / P1-RV 全項目が main マージ済
- [ ] Vercel 本番 URL でフォーム実送信が成功し `freoli.official@gmail.com` に着信確認
- [ ] `/privacy` ページがリンクから到達可能で内容が法的観点で問題なし
- [ ] `CONTENT_POLICY.md` がリポジトリ直下に配置され README から参照可能
- [ ] Members 4 名全員 `consentLogged: true` か、未承諾は `photoPath: null` でシルエットフォールバック表示
- [ ] `data/news.ts` に最低 1 件のエントリ
- [ ] `data/links.ts` の SNS 4 種が `status: "active"` で実 URL を持つ
- [ ] Lighthouse モバイルで LCP 2.5 秒以内 / CLS 0.1 以下（U-01 / U-03）

---

## 4. v0.2 計画

### 4.1 入口条件

- Phase 1 完了出口条件 §3.3 すべて満たす
- 7/11 Blue Sheep ライブ実施済 + 動員数実測値取得済
- Notion Yes ログに被写体 4 名全員の Yes 記録あり

### 4.2 着地する変更（1 PR で束ねる目標）

| 同時着地が必要なもの | Feature |
|---|---|
| `actual_attendance` への 7/11 実測値遡及記入 + 過去公演がある場合は全件 | FEAT-002 / FEAT-010 / D-O1 |
| `LivesSection.tsx` に過去公演表示セクション追加（直近 5〜10 件、動員数併記） | FEAT-010 |
| バンド写真ギャラリーコンポーネント新設 + Members セクション直下に配置 | FEAT-004 |
| ライブ写真の被写体合意確認（出演者・観客プライバシー）| FEAT-004 + CAP-004 |

### 4.3 v0.2 完了判定（出口条件）

- [ ] PastLives セクションがトップページに表示され、過去公演がある場合は時系列降順で表示
- [ ] `actual_attendance` が記録された公演で動員数が表示される（記録なしは非表示で OK）
- [ ] PhotoGallery セクションがトップページに表示され、最低 6 枚以上の合意済画像が並ぶ
- [ ] 画像が WebP/AVIF で配信され Lighthouse LCP 改善（v0.1 比 +0 点以上維持）

---

## 5. v0.5 計画

### 5.1 入口条件（イベント駆動）

- Spotify / Apple Music への配信代行登録完了
- 最初の楽曲マスタリング完成 + 配信予定日確定
- Spotify アーティストページに最低限のメタ情報（プロフィール / バンド写真）反映済

### 5.2 4 つの同時着地（議論ログ Turn 3 三谷指摘の本質）

| 同時着地が必要なもの | 内容 |
|---|---|
| **(a) サブスク Embed** | `SubscribeBar.tsx` の grayed out 状態を解除し、Spotify / Apple Music 公式 Embed プレイヤーを表示（OP-01） |
| **(b) Hero コピー刷新** | "ライブで会いに行くバンド" → "聴いて観に行くバンド" 方向へコピー変更 |
| **(c) News 投稿** | 楽曲リリース告知エントリを `data/news.ts` に追加 |
| **(d) 外部資産整備** | Spotify アーティストページの整備、プロフィール / バンド写真 / リンクの最終確認 |

### 5.3 v0.5 完了判定（出口条件）

- [ ] Spotify / Apple Music Embed プレイヤーで楽曲再生が可能
- [ ] Hero コピーが楽曲ありの自己像と整合
- [ ] 楽曲リリース当日 or 前日に News 投稿が公開済
- [ ] `data/links.ts` の `coming-2025` ステータスが全て `active` に切替済（ST-01 違反解消）
- [ ] CMS 移行検討（F4.3）について議論記録あり

---

## 6. v1.0 計画

### 6.1 入口条件

- サーキット出演オファー受領 or 動員 100 人達成（North Star 到達）
- 独自ドメイン候補が確定（ドメイン取得 + DNS 設定の準備可能）

### 6.2 不可逆タスクが多い Phase（事前計画必須）

| ID | タスク | 種別 |
|---|---|---|
| V10-IR-01 | 独自ドメイン取得 + Vercel への紐付け | DNS |
| V10-IR-02 | Resend 側で新ドメイン SPF/DKIM 設定（DNS 浸透 24h 待ち） | 外部 API |
| V10-IR-03 | Cloudflare Turnstile に新ドメイン追加登録 | 外部 API |
| V10-IR-04 | 旧ドメイン `*.vercel.app` から新ドメインへの 301 リダイレクト設定 | DNS |
| V10-IR-05 | 旧ドメインを 1 週間並行運用（Turnstile / Resend が新ドメインで安定するまで） | 運用 |

### 6.3 可逆タスク

- `/press` ページ実装（プレスキット = バンドプロフィール + 写真ダウンロード + 連絡先）
- メーリングリスト機能の検討（Resend Audience or 別ツール）
- Vercel Analytics → GA4 移行検討（Cookie 追加に伴うプライバシーポリシー更新が前提）

### 6.4 v1.0 完了判定（出口条件）

- [ ] 独自ドメインで全ページ HTTPS 配信
- [ ] 旧ドメイン URL への直接アクセスが新ドメインに 301 リダイレクト
- [ ] `/press` ページが公開、プレスキット ZIP のダウンロードリンクあり
- [ ] 問い合わせフォームが新ドメインで動作確認済（Turnstile / Resend）

---

## 7. 運用ガードレール

### 7.1 PR テンプレート（要新設 `.github/PULL_REQUEST_TEMPLATE.md`）

```markdown
## 変更概要
<!-- 何を、なぜ変えたか -->

## ロードマップ Phase
<!-- このPRはどのPhaseに該当？: Phase 1 残 / v0.2 / v0.5 / v1.0 / 運用保守 -->

## 不可逆要素チェック
- [ ] このPRは環境変数の追加・変更を含む
- [ ] このPRはDNS / 外部API設定の変更を含む
- [ ] このPRは公開済写真の追加・削除を含む
- [ ] 上記いずれも含まない（純粋に可逆な変更）

不可逆要素を含む場合: Tech Owner の承認必須。`docs/operations/PHASE_TRANSITIONS.md` の該当チェックリストを参照したか確認。

## 検証
- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] プレビュー URL で目視確認（モバイル + デスクトップ）
- [ ] Content Owner 動作確認（UIコピー・写真・順序を含む変更時）
```

### 7.2 月次レビュー（Content Owner = えんまさ）

- 過去日付ライブが NextLive に残っていないか（O-8 鮮度指標）
- Notion Yes ログと `public/images/` の照合
- News 月 1 件以上更新できているか（NW-03）
- Vercel Analytics 確認（unique visitors / 直帰率 / リファラ）

### 7.3 Phase 遷移時の同時実行チェックリスト（要新設 `docs/operations/PHASE_TRANSITIONS.md`）

- [ ] ENV 追加時：Vercel ダッシュボード（Production / Preview / Development 全環境）+ `.env.example` + `lib/env.ts` Zod スキーマ更新
- [ ] DNS 変更時：浸透待ち 24h + Resend / Turnstile 側設定 + 旧ドメイン 1 週間並行運用
- [ ] 写真公開時：Notion Yes ログ記入 + `consentLogged: true` 反映 + CONTENT_POLICY 整合

---

## 8. 派生 Decisions

| ID | 内容 | 状態 |
|---|---|---|
| **D-R1** | Phase 遷移は単一 PR で束ねる | 本ファイル §0 / §3 / §4 / §5 / §6 に反映 |
| **D-R2** | 不可逆タスクは Phase の頭に集中 | 本ファイル §3.1 / §6.2 に反映 |
| **D-R3** | Phase 1 launch の "実態" を CLAUDE.md / README.md に明示 | CLAUDE.md / README.md 更新で反映 |
| **D-R4** | v0.5 遷移は 4 つの同時着地 | 本ファイル §5.2 に反映 |
| **D-R5** | `actual_attendance` 遡及記入を v0.2 着手の最初の PR とする | 本ファイル §4.2 に反映 |

---

## 9. このロードマップの更新ルール

- **更新タイミング**: Phase 遷移完了時 + 月次レビュー時
- **更新箇所**: §2 実装状況インベントリ（必ず）+ 該当 Phase の出口条件チェック
- **同期対象**: CLAUDE.md「現在の実装状況と次の TODO」/ README.md「🗺️ Roadmap」セクション
- **議論が必要な変更時**: `docs/discussions/議論ログ_*.md` を新たに残す（本ロードマップの根拠を辿れるように）
