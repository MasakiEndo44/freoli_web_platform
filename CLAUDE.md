# FREOLI Web Platform — Claude Code 用 instructions

> AI エージェント（Claude Code / Cursor）はこのファイルを最初にロードする。
> プロジェクト全体のルールは `@AGENTS.md` を参照。本ファイルは **現在地点の状態スナップショット** を提供する。

---

## 📍 現在の実装状況（2026-05-19 時点）

要件定義書（`docs/requirements/`）では 2025/5/31 を v0.1 launch 想定としているが、**実態は Phase 1 残タスクが残存**。詳細は [`docs/roadmap/IMPLEMENTATION_ROADMAP.md`](docs/roadmap/IMPLEMENTATION_ROADMAP.md)、議論経緯は [`docs/discussions/議論ログ_実装ロードマップ.md`](docs/discussions/議論ログ_実装ロードマップ.md)。

**凡例**: 🟢 完了 / 🟡 部分実装 / 🔴 未着手・破綻 / ⚪ 計画通り未着手（Phase 2 以降）

| Feature | 状態 | 主なギャップ |
|---|---|---|
| FEAT-001 Hero | 🟡 | キャッチコピー 30〜80 字未確定（v3 中優先度 #1） |
| FEAT-002 NextLive | 🟢 | — |
| FEAT-003 Members | 🟡 | あのむ以外 3 名の bio・写真・承諾未完 |
| FEAT-004 PhotoGallery | ⚪ | v0.2 で着手 |
| FEAT-005 SNSBar | 🟡 | 全 SNS URL が `null` |
| FEAT-006 Subscriptions | 🟢 | v0.1 仕様達成（grayed out） |
| FEAT-007 News | 🟡 | `data/news.ts` が空配列 |
| **FEAT-008 ContactForm** | 🔴 | **`app/api/contact/route.ts` 未配置**。送信は `console.log` のみ |
| **FEAT-009 Privacy** | 🔴 | **`app/privacy/page.tsx` 未配置** |
| FEAT-010 PastLives | ⚪ | v0.2 で着手（型定義 `actual_attendance` は実装済） |
| FEAT-011 DeployGuard | 🟢 | hook + `lib/env.ts` 配置済 |
| **FEAT-012 ContentPolicy** | 🔴 | **`CONTENT_POLICY.md` 未配置**（README から参照されているが実体なし） |

---

## 🎯 次に着手すべき TODO（Phase 1 残）

### 🔴 最優先 — Phase 1 launch 完了に必須

1. **FEAT-008 API ルート実装** — `app/api/contact/route.ts` 新設（Resend SDK + Turnstile siteverify + Zod 検証 + 503 fallback）+ `ContactForm.tsx` の `turnstileToken: "v0.1-stub"` を実トークン統合に置換
2. **FEAT-009 Privacy ページ配置** — `app/privacy/page.tsx` 新設（v3 §付録 B 素案を起点）
3. **FEAT-012 CONTENT_POLICY.md 配置** — リポジトリ直下に v3 §付録 A 素案を起点に作成
4. **Vercel Environment Variables 本番設定** — `RESEND_API_KEY` / `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` / `CONTACT_EMAIL_TO`

> 上記 1〜3 は **1 PR で束ねる**（Phase as Single PR 原則）。4 は **不可逆タスク**のため事前に Tech Owner が個別実行。

### 🟡 並行可 — コンテンツ拡充

5. Hero キャッチコピー 30〜80 字確定
6. Members 残 3 名（ゆうすけ / ひろむ / aberyo）の bio + 写真 + `consentLogged: true`（被写体承諾の Notion Yes ログ整備が前提）
7. 初回 News 投稿（7/11 Blue Sheep ライブ告知）を `data/news.ts` に追加
8. `data/links.ts` の SNS 4 種 URL 入力 + `status: "active"` 切替
9. Blue Sheep 公演に `venueUrl` or `venuePhone` 追加（v3 中優先度 #6）
10. 7/11 Blue Sheep の `actual_attendance` 遡及記入（実測値取得後）

### ⚪ v0.2 以降

- FEAT-004 PhotoGallery / FEAT-010 PastLives 実装は **Phase 1 完了後** に v0.2 PR として束ねる
- v0.5 / v1.0 は外部トリガー駆動（楽曲リリース / サーキット出演オファー）

---

## ⚠️ AI エージェント作業時の注意

### 着手前に必ず確認

1. **作業対象が Layer 1 / Layer 2（`AGENTS.md §6` Protected Areas）に該当しないか確認** — 該当する場合は Tech Owner / Content Owner 承認が必要
2. **作業対象 Feature の状態** を本ファイル「現在の実装状況」で確認 — 既に 🟢 のものは触らない、🔴 から着手
3. **非交渉 UX シーケンス** を変更しない — Hero → SNSBar → Lives → Members → Subscribe → News → Contact の順序固定（`app/page.tsx` 内）

### 機能完了の定義（`AGENTS.md §7` 再掲）

> 機能完了 = `pnpm typecheck` + `pnpm lint` + `pnpm build` 通過 + Content Owner 動作確認

`v0.1-stub` のようなフォールバックが残っている状態は **未完** として扱う。

### 進行管理図の更新義務

実装完了時、以下の 3 ファイルを必ず同期更新：
- 本ファイル（CLAUDE.md）の「現在の実装状況」「次に着手すべき TODO」
- [`docs/roadmap/IMPLEMENTATION_ROADMAP.md`](docs/roadmap/IMPLEMENTATION_ROADMAP.md) §2 実装状況インベントリ
- [`README.md`](README.md) の「🗺️ Roadmap」セクション

---

@AGENTS.md
