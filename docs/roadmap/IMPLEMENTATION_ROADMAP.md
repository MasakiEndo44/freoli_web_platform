---
doc_id: roadmap.freoli_web_platform
doc_type: implementation_roadmap
product: freoli_web_platform
as_of: 2026-05-20
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
| ② | **Reversible First, Irreversible Front-loaded** | 不可逆タスク（DNS / ENV / 外部 API 鍵 / 公開済写真 / Turnstile Hostname 登録）は Phase の頭に集中。可逆な UI / コピー / `data/*.ts` 更新と分離する。 |
| ③ | **Bandscape Co-evolution** | バンド像の進化（"ライブで会うバンド" → "聴いて観に行くバンド"）と HP の Feature 進化を同時に着地させる。Embed だけ追加して Hero コピーが古いままは禁。 |

> **運用原則**: ロードマップ更新時は **必ず `git fetch origin && git log origin/main --oneline` で main の最新を確認** してから現状診断を行う。作業ブランチが main 派生で古い場合、ブランチ内のローカルファイルだけ見ると未実装と誤診する（2026-05-19 → 2026-05-20 で経験）。

---

## 1. Phase 全景

```
Phase 1 (v0.1)            v0.2                v0.5                  v1.0
─────────────────  ─────────────────  ────────────────────  ─────────────────
最小構成 launch     重要枠の追加          楽曲リリース時          サーキット出演時
2025/5/31 想定      〜 2025/7/11          2025 年内             2027 初頭

[現在地: 2026-05-20]
  ├ Phase 1 機能スコープ + 主要コンテンツ完遂
  ├ launch 可能状態（残: 本決定 bio / X 開設 / WAVER 詳細）
  ├ v0.2 着手前
  └ v0.5 / v1.0 は外部トリガー待ち

進行方向 →→→
```

| Phase | 入口条件（トリガー） | 出口条件（完了判定） | 主な Feature |
|---|---|---|---|
| **Phase 1 (v0.1)** | (済) 要件定義 v3 合意 | FEAT-009 + FEAT-012 + ContactForm の /privacy リンク追加が main マージ + Vercel 本番反映 | FEAT-001/002/003/005/006(grayed)/007/008/009/011/012 |
| **v0.2** | Phase 1 完了 + 7/11 動員数実測値の取得 | FEAT-004 + FEAT-010 が main マージ + `actual_attendance` 全公演記入 | + FEAT-004 PhotoGallery / FEAT-010 PastLives |
| **v0.5** | Spotify / Apple Music 配信代行登録完了 + 最初の楽曲マスター完成 | サブスク Embed + Hero コピー + News + Spotify ページ の 4 同時着地 PR が main マージ | FEAT-006 OP-01 / Hero 刷新 / FEAT-007 リリース告知運用 |
| **v1.0** | サーキット出演オファー受領 or 動員 100 人達成 | 独自ドメイン稼働 + 301 リダイレクト動作確認 + /press ページ公開 | OP-02 / プレスキット / メーリングリスト検討 |

---

## 2. 実装状況インベントリ（2026-05-20 時点、origin/main 反映後）

> **凡例**: 🟢 完了 / 🟡 部分実装 / 🔴 未着手・破綻 / ⚪ 未着手（Phase 2 以降のため計画通り）

### 2.1 Feature × 実装状況

| Feature | 状態 | 実装の中身 | ギャップ |
|---|---|---|---|
| **FEAT-001 Hero** | 🟢 | `components/sections/Hero.tsx`、`/images/band/freoli_1.JPEG` 使用、キャッチコピー「暗がりに沈んだ原風景を、音が光に変えて差し出す。東京の四人組。」確定 | — |
| **FEAT-002 NextLive** | 🟢 | `LivesSection.tsx`、2026-07-11 WAVER 公演 + `venueUrl: https://waverwaver.net/` + `venuePhone: 03-6804-0094` 反映、F1.5 縮退 UI + F1.2 フォールバック実装済 | `doorsOpenAt` / `showStartAt` / `ticketPrice` / `ticketUrl` は確定後反映 |
| **FEAT-003 Members** | 🟡 | `MembersSection.tsx`、楽器順ソート、シルエットフォールバック実装、4 名全員 `photoPath` + `consentLogged: true` 揃った | anomu 以外 3 名の bio は要件定義書付録D ベースの**仮テキスト**（先頭に「（仮）」表記）。本決定文待ち |
| **FEAT-004 PhotoGallery** | ⚪ | 未実装 | Phase 2 (v0.2) で着手予定。被写体 Yes ログ照合フロー必須。 |
| **FEAT-005 SNSBar** | 🟡 | `SNSBar.tsx`、grayed out 状態 UI 実装済 | Instagram / YouTube / TikTok / Apple Music は `active`。X は `coming-2025`（未開設）、Spotify は v0.5 リリース時設定予定 |
| **FEAT-006 Subscriptions** | 🟢 | `SubscribeBar.tsx`、バッジ `Coming Soon...` + 説明文「楽曲は配信準備中です」 + grayed out 表示 | v0.5 で Embed 化へ |
| **FEAT-007 News** | 🟢 | `NewsList.tsx` + 初回投稿（2026-05-20 公式サイト公開）あり | NW-03 月 1 回更新ルールに従い継続運用 |
| **FEAT-008 ContactForm** | 🟢 | **PR #9 で完成**。`app/api/contact/route.ts` + `lib/turnstile.ts` + `lib/resend.ts` 分割、`@marsidev/react-turnstile` 統合、Zod 検証 + honeypot + 502 fallback。**2026-05-20 動作確認済**（A 案で `freoli.official@gmail.com` Resend 再登録 → preview URL でフォーム送信成功 → `freoli.official@gmail.com` Gmail 着信確認） | — |
| **FEAT-009 Privacy** | 🟢 | `app/privacy/page.tsx` 配置済（v3 §付録 B 素案ベース、9 セクション構成）。**CF-06 充足** — `ContactForm.tsx` の送信ボタン直前に「送信することで、プライバシーポリシーに同意したものとみなされます」+ `/privacy` リンク追加済 | — |
| **FEAT-010 PastLives** | ⚪ | 未実装 | Phase 2 (v0.2) で着手予定。型定義 `actual_attendance: number \| null` は `data/lives.ts` に既に実装済（D-O1 / D-F2 反映済）。 |
| **FEAT-011 DeployGuard** | 🟢 | `.claude/hooks/prevent-destructive-command.js` 配置済、`lib/env.ts` の `serverEnv()` 関数化で fail-fast、`.env.local` は `.gitignore` 対象 | — |
| **FEAT-012 ContentPolicy** | 🟢 | `CONTENT_POLICY.md` リポジトリ直下に配置済（v3 §付録 A 素案ベース、10 章構成）。CAP-004 運用の信頼源として機能 | — |

### 2.2 データファイル × 実装状況

| ファイル | 状態 | 課題 |
|---|---|---|
| `data/lives.ts` | 🟢 | 2026-07-11 WAVER 公演 1 件、`venueUrl` + `venuePhone` 反映済。時間・チケット情報は確定後反映 |
| `data/members.ts` | 🟡 | 4 名全員 `photoPath` + `consentLogged: true`。anomu 以外 3 名の bio は仮テキスト |
| `data/news.ts` | 🟢 | 初回「公式サイト公開」投稿あり（2026-05-20） |
| `data/links.ts` | 🟡 | Instagram / YouTube / TikTok / Apple Music は `active`。X は `coming-2025`、Spotify は v0.5 |

### 2.3 環境変数 × 外部サービス設定

| 項目 | 状態 | 補足 |
|---|---|---|
| `.env.local` | 🟢 配置済 | 2026-05-20 に A 案で `RESEND_API_KEY` を新キー（`freoli.official@gmail.com` 登録の Resend アカウント発行）に差し替え済 |
| `.env.example` | 🟢 配置済 | `RESEND_API_KEY` / `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` / `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM` |
| Vercel Environment Variables | 🟢 設定済 | Production + Preview + Development で 2026-05-20 動作確認済 |
| **Cloudflare Turnstile Hostname Management** | 🟢 設定済 | 2026-05-20 に `vercel.app` ワイルドカード追加で `*.vercel.app` 全 preview / 本番をカバー（D-R6） |
| `lib/env.ts` Zod fail-fast | 🟢 実装済 | `serverEnv()` 関数化 + キャッシュ |
| Resend アカウント | 🟢 `freoli.official@gmail.com` で登録（A 案） | サンドボックス制限解消、`freoli.official@gmail.com` 宛送信成功 |

---

## 3. Phase 1 残タスク（最優先）

> **方針**: 議論ログ D-R1 に従い、可能な限り **1 PR で束ねる**。**PR-Privacy（FEAT-009 + FEAT-012 + CF-06）は本ブランチで完了** — 残はコンテンツ拡充タスクのみ。

### 3.1 不可逆タスク（Phase の頭に配置）

すべて完了。Phase 1 残では新規不可逆タスクはありません。

> （参考）これまでに発火した Phase 1 不可逆タスク：
> - `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM` を Vercel に登録
> - Cloudflare Turnstile Hostname Management に `vercel.app` ワイルドカード登録（**D-R6**）
> - Resend アカウントを `freoli.official@gmail.com` で登録（A 案、PR #9 マージ後の動作確認時に発火）

### 3.2 可逆タスク

| ID | タスク | 関連 Feature / EARS | 推定 PR |
|---|---|---|---|
| ~~P1-RV-A1~~ | ~~`app/privacy/page.tsx` 配置~~ **(完了)** | FEAT-009 / F5.5 / CF-06 | PR-Privacy |
| ~~P1-RV-A2~~ | ~~`CONTENT_POLICY.md` リポジトリ直下配置~~ **(完了)** | FEAT-012 / F5.1 / F5.2 | PR-Privacy |
| ~~P1-RV-A3~~ | ~~`ContactForm.tsx` に `/privacy` リンク追加~~ **(完了)** | FEAT-008 / CF-06 | PR-Privacy |
| ~~P1-RV-B1~~ | ~~Hero キャッチコピー 30〜80 字確定~~ **(完了)**「暗がりに沈んだ原風景を、音が光に変えて差し出す。東京の四人組。」 | FEAT-001 / HE-03 | PR-Content |
| P1-RV-B2 | Members 残 3 名の **本決定 bio**（現状は要件定義書付録D ベースの仮テキスト）。`photoPath` + `consentLogged: true` は反映済 | FEAT-003 / U-09 | （随時） |
| ~~P1-RV-B3~~ | ~~初回 News 投稿~~ **(完了)**「FREOLI 公式サイトを公開しました」（2026-05-20） | FEAT-007 / NW-04 | PR-Content |
| ~~P1-RV-B4~~ | ~~Instagram / YouTube / TikTok の URL 入力 + `status: "active"` 切替~~ **(完了)** + Apple Music も `active`。**X は未開設のため保留** | FEAT-005 | PR-Content |
| ~~P1-RV-B5~~ | ~~`data/lives.ts` の公演に `venueUrl` + `venuePhone`~~ **(完了)** WAVER 公式 / 電話 反映 | FEAT-002 / NL-02 | PR-Content |
| P1-RV-B6 | 2026-07-11 WAVER 公演の `actual_attendance` 記入（ライブ後） | FEAT-002 / FEAT-010 / D-O1 | PR-D（v0.2 着手の最初の PR と統合可） |
| ~~P1-RV-B7~~ | ~~"2025 年配信予定" 文言の見直し~~ **(完了)** バッジ `Coming Soon...` 化、年表記なし | FEAT-006 / ST-01 | PR-Content |

### 3.3 Phase 1 完了判定（出口条件）

- [x] P1-RV-A1〜A3（PR-Privacy）配置完了 → ContactForm から `/privacy` 到達可能 + CONTENT_POLICY.md がリポジトリ直下に存在（main マージ済）
- [x] フォーム実送信が成功し `freoli.official@gmail.com` に着信確認（2026-05-20 動作確認済）
- [x] Members 4 名全員 `consentLogged: true` + `photoPath` 設定済（bio は anomu のみ本決定、他 3 名は仮）
- [x] `data/news.ts` に最低 1 件のエントリ（2026-05-20 公式サイト公開）
- [x] `data/links.ts` の主要 SNS が `status: "active"` で実 URL を持つ（X は未開設のため例外、Spotify は v0.5）
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
| V10-IR-03 | Cloudflare Turnstile Hostname Management に新ドメイン追加登録 | 外部 API |
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
- [ ] このPRはDNS / 外部API設定の変更（Cloudflare Turnstile Hostname Management 含む）を含む
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
- [ ] **Turnstile Hostname 追加時**：Cloudflare ダッシュボード Hostname Management に対象ホスト追加（`vercel.app` ワイルドカード / 独自ドメイン / `localhost`）
- [ ] 写真公開時：Notion Yes ログ記入 + `consentLogged: true` 反映 + CONTENT_POLICY 整合

### 7.4 ロードマップ更新時の必須プロトコル（2026-05-20 経験より）

ロードマップ docs を更新するときは、**必ず以下を最初に実行**：

```bash
git fetch origin
git log origin/main --oneline -20   # main の最新コミットを確認
git diff --stat <作業ブランチ> origin/main  # 作業ブランチと main の差分を把握
```

作業ブランチが main 派生で古い場合（main で別 PR がマージされている場合）、ローカルファイルだけ見ると未実装と誤診する。`docs/requirements/` の Feature ID と main 上のファイル存在を必ず照合する。

---

## 8. 派生 Decisions

| ID | 内容 | 状態 |
|---|---|---|
| **D-R1** | Phase 遷移は単一 PR で束ねる | 本ファイル §0 / §3 / §4 / §5 / §6 に反映 |
| **D-R2** | 不可逆タスクは Phase の頭に集中 | 本ファイル §3.1 / §6.2 に反映 |
| **D-R3** | Phase 1 launch の "実態" を CLAUDE.md / README.md に明示 | CLAUDE.md / README.md 更新で反映、2026-05-20 main 反映で更新 |
| **D-R4** | v0.5 遷移は 4 つの同時着地 | 本ファイル §5.2 に反映 |
| **D-R5** | `actual_attendance` 遡及記入を v0.2 着手の最初の PR とする | 本ファイル §4.2 に反映 |
| **D-R6** | **Cloudflare Turnstile Hostname Management の登録は不可逆タスク**として明文化。Vercel ENV 登録と同等の扱い | 2026-05-20 追記。`vercel.app` ワイルドカード登録完了。v1.0 独自ドメイン取得時に再発火（V10-IR-03） |
| **D-R7** | **Resend アカウント登録メアドと `CONTACT_EMAIL_TO` は一致させる**（A 案）。サンドボックスモードのドメイン制限を回避するため | 2026-05-20 PR #9 マージ後の動作確認時に発見。`freoli.official@gmail.com` で Resend 再登録済 |
| **D-R8** | **ロードマップ更新前に `git fetch origin && git log origin/main` で main 最新を必ず確認する** | 2026-05-20 追記。2026-05-19 の現状診断ミス（FEAT-008 を未実装と誤診）を教訓に明文化 |

---

## 9. このロードマップの更新ルール

- **更新タイミング**: Phase 遷移完了時 + 月次レビュー時
- **更新箇所**: §2 実装状況インベントリ（必ず）+ 該当 Phase の出口条件チェック
- **同期対象**: CLAUDE.md「現在の実装状況と次の TODO」/ README.md「🗺️ Roadmap」セクション
- **必須プロトコル**: §7.4 に従い `git fetch origin && git log origin/main` で main の最新を確認してから更新を始める
- **議論が必要な変更時**: `docs/discussions/議論ログ_*.md` を新たに残す（本ロードマップの根拠を辿れるように）
