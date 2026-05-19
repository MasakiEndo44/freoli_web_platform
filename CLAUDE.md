# FREOLI Web Platform — Claude Code 用 instructions

> AI エージェント（Claude Code / Cursor）はこのファイルを最初にロードする。
> プロジェクト全体のルールは `@AGENTS.md` を参照。本ファイルは **現在地点の状態スナップショット** を提供する。

---

## 📍 現在の実装状況（2026-05-20 時点、origin/main 反映後）

要件定義書（`docs/requirements/`）では 2025/5/31 を v0.1 launch 想定としているが、**実態は Phase 1 機能スコープ完遂**（FEAT-009 / FEAT-012 / CF-06 を 1 PR で着地）。残はコンテンツ拡充タスクのみ。FEAT-008 ContactForm API は PR #9 で実装済 + 2026-05-20 動作確認済（A 案で Resend を `freoli.official@gmail.com` で再登録、フォーム送信 → Gmail 着信を確認）。詳細は [`docs/roadmap/IMPLEMENTATION_ROADMAP.md`](docs/roadmap/IMPLEMENTATION_ROADMAP.md)、議論経緯は [`docs/discussions/議論ログ_実装ロードマップ.md`](docs/discussions/議論ログ_実装ロードマップ.md)。

**凡例**: 🟢 完了 / 🟡 部分実装 / 🔴 未着手・破綻 / ⚪ 計画通り未着手（Phase 2 以降）

| Feature | 状態 | 主なギャップ |
|---|---|---|
| FEAT-001 Hero | 🟡 | キャッチコピー 30〜80 字未確定（v3 中優先度 #1） |
| FEAT-002 NextLive | 🟢 | — |
| FEAT-003 Members | 🟡 | あのむ以外 3 名の bio・写真・承諾未完 |
| FEAT-004 PhotoGallery | ⚪ | v0.2 で着手 |
| FEAT-005 SNSBar | 🟡 | 全 SNS URL が `null` |
| FEAT-006 Subscriptions | 🟢 | v0.1 仕様達成（"2025 年配信予定" 文言は 2026 年現在のため見直し検討要） |
| FEAT-007 News | 🟡 | `data/news.ts` が空配列 |
| **FEAT-008 ContactForm** | 🟢 | **PR #9 で完成、2026-05-20 動作確認済** |
| **FEAT-009 Privacy** | 🟢 | `app/privacy/page.tsx` 配置済 + `ContactForm.tsx` の送信前同意文に `/privacy` リンク追加済（CF-06 充足） |
| FEAT-010 PastLives | ⚪ | v0.2 で着手（型定義 `actual_attendance` は実装済） |
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

### 🟡 コンテンツ拡充（並行可、優先度順）

1. Hero キャッチコピー 30〜80 字確定（FEAT-001、"心が先に動く" Vision V-7 整合）
2. Members 残 3 名（ゆうすけ / ひろむ / aberyo）の bio + 写真 + `consentLogged: true`（被写体承諾の Notion Yes ログ整備が前提）
3. 初回 News 投稿（7/11 Blue Sheep ライブ告知）を `data/news.ts` に追加
4. `data/links.ts` の SNS 4 種 URL 入力 + `status: "active"` 切替
5. Blue Sheep 公演に `venueUrl` or `venuePhone` 追加（v3 中優先度 #6）
6. 7/11 Blue Sheep の `actual_attendance` 遡及記入（実測値取得後）
7. "2025 年配信予定" 文言の見直し（FEAT-006、現時点 2026 年）

### ⚪ v0.2 以降

- FEAT-004 PhotoGallery / FEAT-010 PastLives 実装は **Phase 1 完了後** に v0.2 PR として束ねる
- v0.5 / v1.0 は外部トリガー駆動（楽曲リリース / サーキット出演オファー）

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
3. **非交渉 UX シーケンス** を変更しない — Hero → SNSBar → Lives → Members → Subscribe → News → Contact の順序固定（`app/page.tsx` 内）

### 機能完了の定義（`AGENTS.md §7` 再掲）

> 機能完了 = `pnpm typecheck` + `pnpm lint` + `pnpm build` 通過 + Content Owner 動作確認

### 進行管理図の更新義務

実装完了時、以下の 3 ファイルを必ず同期更新：
- 本ファイル（CLAUDE.md）の「現在の実装状況」「次に着手すべき TODO」
- [`docs/roadmap/IMPLEMENTATION_ROADMAP.md`](docs/roadmap/IMPLEMENTATION_ROADMAP.md) §2 実装状況インベントリ
- [`README.md`](README.md) の「🗺️ Roadmap」セクション

---

@AGENTS.md
