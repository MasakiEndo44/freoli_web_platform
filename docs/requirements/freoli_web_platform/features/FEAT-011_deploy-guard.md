---
doc_id: req.freoli_web_platform.feature.FEAT-011
doc_type: feature
feature_id: FEAT-011
slug: deploy-guard
title: DeployGuard（デプロイ運用ガード）
product: freoli_web_platform
layer: F
status: stable
stability: stable
phase: v0.1-pre-launch-required
capabilities: [CAP-005]
existing_requirements: [F5.3, F5.4]
ui: non-ui
as_of: 2026-05-18
owners: [endo]
---

# FEAT-011: DeployGuard（デプロイ運用ガード）

> **非 UI Feature**: コードではなく運用・ガバナンスの仕組み。UI を持たないが v0.1 launch 前の必須タスク。

## F-1 Persona

- **Tech Owner = えんまさ**（v0.1 期は単一運営者、F5.3）
- **緊急時のフォールバック担当**（aberyo / ひろむ、F5.4）

## F-2 Trigger

コミット作成時 / PR レビュー時 / `.env*` 編集時 / Vercel デプロイ失敗時。

## F-3 Done When

全変更が **`git revert` + `git push` で本番が前バージョンに戻せる状態** が常に維持されている。`.env*` 誤コミット 0 件 / Vercel preview ビルド成功率 100% / 不具合発生時 5 分以内に revert。

## F-4 上位 Capability

- **メイン**: CAP-005 Reversibility-First デプロイ

## F-5 User Story

> As えんまさ（Tech Owner）, I want **destructive コマンド（`rm -rf` / `git push --force` / `.env*` 読取）を hook で自動ブロックし、`lib/env.ts` 経由でのみ環境変数アクセスできる仕組みがあったら**, so that **誤操作・キー漏洩リスクを撲滅でき、安心して頻繁にデプロイできる**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. **`.claude/hooks/prevent-destructive-command.js`** が有効化され、`.env*` 読取・`git push --force` / `git reset --hard` / `rm -rf` 引数なしをブロック
2. `.env*` が **`.gitignore` に列挙**され、`process.env` 直接参照禁止・`lib/env.ts` 経由のみ（AGENTS.md §2 / §6 Layer 1）
3. **Gate 1 検証コマンド** `pnpm typecheck` + `pnpm lint` + `pnpm build` が全 PR で通過、preview ビルド失敗時は main マージ禁止

## F-7 Out of Scope

- 自動ロールバック CI（Vercel revert の手動操作で代替）
- ステージング環境（Vercel preview が代替）
- Secret スキャン CI（v1.0+ で検討）

## F-8 実装フェーズ

**v0.1 launch 前必須**（Week 1 で hook 有効化・`.gitignore` 整備・`lib/env.ts` 配置）。

## 既存要件対応

- F5.3（更新担当ロール、必須）
- F5.4（フォールバック、重要）
- 技術スタック §環境変数管理
- AGENTS.md §6 Layer 1 / §7
- **D-C4** で CAP-005 に F5.3 / F5.4 明示追記済み

## 整合チェック

✓ 既存ドキュメントと完全整合。

## 依存タスク・課題

- `.claude/hooks/prevent-destructive-command.js` の動作確認（既に harness で配置済み）
- `lib/env.ts` の作成（Resend / Turnstile キーの型安全ラッパー）
- フォールバック手順の Notion 文書化（aberyo / ひろむ への一時的 Write 権限付与手順）
