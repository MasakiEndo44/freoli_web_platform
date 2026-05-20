# FREOLI Web Platform — Claude Code 用 instructions

> AI エージェント（Claude Code / Cursor）はこのファイルを最初にロードする。
> プロジェクト全体のルールは `@AGENTS.md` を参照。本ファイルは **現在地点の状態スナップショット** を提供する。

---

## 📍 現在の実装状況（2026-05-20 時点、origin/main 反映後）

要件定義書（`docs/requirements/`）では 2025/5/31 を v0.1 launch 想定としているが、**実態は Phase 1 機能スコープ + 主要コンテンツが揃った状態**。Hero キャッチコピー確定、Members 4 名 photo + consent 揃い、NextLive 差し替え（2026-07-11 WAVER）、初回 News 投稿、SubscribeBar 文言更新済。残は本決定 bio / X 開設 / WAVER 公演詳細のみ。FEAT-008 ContactForm API は PR #9 で実装済 + 2026-05-20 動作確認済（A 案で Resend を `freoli.official@gmail.com` で再登録、フォーム送信 → Gmail 着信を確認）。**v0.2 (FEAT-004 PhotoGallery / FEAT-010 PastLives) はスケルトン実装済**（`data/photos.ts` / `lib/lives-utils.ts` / `components/sections/PastLives.tsx` / `components/sections/PhotoGallery.tsx` 配置、空データ時は非表示）。データが揃った時点で content PR のみで表示が発火する。詳細は [`docs/roadmap/IMPLEMENTATION_ROADMAP.md`](docs/roadmap/IMPLEMENTATION_ROADMAP.md)、議論経緯は [`docs/discussions/議論ログ_実装ロードマップ.md`](docs/discussions/議論ログ_実装ロードマップ.md)。

**凡例**: 🟢 完了 / 🟡 部分実装 / 🔴 未着手・破綻 / ⚪ 計画通り未着手（Phase 2 以降）

| Feature | 状態 | 主なギャップ |
|---|---|---|
| FEAT-001 Hero | 🟢 | キャッチコピー確定（「暗がりに沈んだ原風景を、音が光に変えて差し出す。東京の四人組。」） |
| FEAT-002 NextLive | 🟢 | 2026-07-11 WAVER 公演 + `venueUrl` / `venuePhone` 反映済 |
| FEAT-003 Members | 🟡 | 4 名全員 `photoPath` + `consentLogged: true` 揃った。ただし anomu 以外 3 名は bio が「（仮）」のまま → 本決定文待ち |
| FEAT-004 PhotoGallery | 🟡 | スケルトン実装済（`PhotoGallery.tsx` + `data/photos.ts`、`consentLogged && photographer` で filter、空配列時は非表示）。`data/photos.ts` に 3〜5 枚追加するだけで表示が発火 |
| FEAT-005 SNSBar | 🟡 | Instagram / YouTube / TikTok / Apple Music は `active`。X は未開設（`null` / `coming-2025`）のまま、Spotify は v0.5 予定通り |
| FEAT-006 Subscriptions | 🟢 | バッジ `Coming Soon...` 化、年表記なしに刷新済 |
| FEAT-007 News | 🟢 | 初回「公式サイト公開」投稿あり（2026-05-20） |
| **FEAT-008 ContactForm** | 🟢 | **PR #9 で完成、2026-05-20 動作確認済** |
| **FEAT-009 Privacy** | 🟢 | `app/privacy/page.tsx` 配置済 + `ContactForm.tsx` の送信前同意文に `/privacy` リンク追加済（CF-06 充足） |
| FEAT-010 PastLives | 🟡 | スケルトン実装済（`PastLives.tsx` + `lib/lives-utils.ts` の `partitionLives` で日付分割、過去 0 件時は非表示、`organizer` バッジ + `actual_attendance` 任意表示対応、NL-03 充足）。過去公演が `data/lives.ts` に入れば表示が発火 |
| FEAT-011 DeployGuard | 🟢 | hook + `lib/env.ts` (serverEnv) 配置済 |
| **FEAT-012 ContentPolicy** | 🟢 | `CONTENT_POLICY.md` リポジトリ直下に配置済（v3 §付録 A ベース、10 章構成） |

外部サービス設定：

| 項目 | 状態 |
|---|---|
| Vercel Environment Variables | 🟢 設定済（Production + Preview + Development） |
| Cloudflare Turnstile Hostname Management | 🟢 `vercel.app` ワイルドカード登録済（D-R6） |
| Resend アカウント | 🟢 `freoli.official@gmail.com` で登録（A 案、D-R7） |

---

## 🎯 次に着手すべき TODO（Phase 1 残）

### 🟡 残作業（優先度順）

1. Members 残 3 名（ゆうすけ / ひろむ / aberyo）の **本決定 bio**（現在は要件定義書付録D ベースの仮テキスト）
2. X アカウント開設後に `data/links.ts` の X を `url` 設定 + `status: "active"` 切替
3. 2026/7/11 WAVER 公演の `doorsOpenAt` / `showStartAt` / `ticketPrice` / `ticketUrl` 確定後に反映（現在 `undefined`）

### 🟡 v0.2 残（スケルトン後の content 投入）

- FEAT-010 PastLives：2026/7/11 WAVER 公演実施後に `actual_attendance` を記入し過去公演として表示発火
- FEAT-004 PhotoGallery：被写体 Yes 取得済の 3〜5 枚を `data/photos.ts` に追加（`consentLogged: true` + `photographer` 必須）

### ⚪ v0.5 以降

- Spotify URL は楽曲リリース時に設定（v0.5）
- 楽曲リリース確定後に Hero コピー / SubscribeBar の文言を再点検

### ⚪ v1.0 以降

- 外部トリガー駆動（サーキット出演オファー / 動員 100 人達成）

---

## ⚠️ AI エージェント作業時の注意

### 着手前に必ず実行（2026-05-20 失敗からの教訓）

ロードマップ docs を更新するとき、または Phase 1 残実装に着手するときは、**必ず以下を最初に実行**して main の現状を把握する：

```bash
git fetch origin
git log origin/main --oneline -20   # main の最新コミットを確認
git status                          # 作業ブランチと main の差分を把握
```

作業ブランチが main 派生で古い場合（main で別 PR がマージされている場合）、ローカルファイルだけ見ると **未実装と誤診する**。要件定義書の Feature ID と main 上のファイル存在を必ず照合すること。

### 着手前のチェック

1. **作業対象が Layer 1 / Layer 2（`AGENTS.md §6` Protected Areas）に該当しないか確認** — 該当する場合は Tech Owner / Content Owner 承認が必要
2. **作業対象 Feature の状態** を本ファイル「現在の実装状況」で確認 — 既に 🟢 のものは触らない、🔴 から着手
3. **非交渉 UX シーケンス** を変更しない — Hero → SNSBar → NextLive → PastLives → Members → PhotoGallery → Subscribe → News → Contact の順序固定（`app/page.tsx` 内、engineering.md §4.2）

### 機能完了の定義（`AGENTS.md §7` 再掲）

> 機能完了 = `pnpm typecheck` + `pnpm lint` + `pnpm build` 通過 + Content Owner 動作確認

### 進行管理図の更新義務

実装完了時、以下の 3 ファイルを必ず同期更新：
- 本ファイル（CLAUDE.md）の「現在の実装状況」「次に着手すべき TODO」
- [`docs/roadmap/IMPLEMENTATION_ROADMAP.md`](docs/roadmap/IMPLEMENTATION_ROADMAP.md) §2 実装状況インベントリ
- [`README.md`](README.md) の「🗺️ Roadmap」セクション

---

@AGENTS.md
