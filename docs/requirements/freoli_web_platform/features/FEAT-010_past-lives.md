---
doc_id: req.freoli_web_platform.feature.FEAT-010
doc_type: feature
feature_id: FEAT-010
slug: past-lives
title: PastLives（過去ライブ履歴）
product: freoli_web_platform
layer: F
status: stable
stability: evolving
phase: v0.1-recommended-or-phase-2
capabilities: [CAP-006]
existing_requirements: [F1.4]
as_of: 2026-05-18
owners: [endo]
---

# FEAT-010: PastLives（過去ライブ履歴）

## F-1 Persona

- **Primary**: 高橋みさき（活動実績確認）
- **Secondary**: 田村ブッカー（**動員力・ライブ経験の判断材料**として 5 分以内判断の核）

## F-2 Trigger

ライブ情報セクションでスクロール、または田村ブッカーが「これまでどれくらいライブやってる？」と確認したい瞬間。

## F-3 Done When

過去 5〜10 公演の **日付・会場・対バン・自主企画/ブッキング区別** を把握し、「定期的に活動している」「集客実績がある」と判断した状態。

## F-4 上位 Capability

- **メイン**: CAP-006 ライブ実績の継続記録

## F-5 User Story

> As 田村ブッカー, I want **過去 5〜10 公演の履歴を日付降順で確認できたら**, so that **動員力・対バン関係・自主企画経験を 5 分以内で判断でき、ブッキングオファーの根拠ができる**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. **過去 5〜10 件を日付降順表示**（日付・会場名・対バン・自主企画 or ブッキング区別）
2. **`actual_attendance` フィールドが入っていればオプショナル表示**（v0.5 以降の集計レポートと整合、**D-O1 由来**）
3. `data/lives.ts` の **共通スキーマで管理**（FEAT-002 NextLive と同じデータソース、CAP-001 ⇄ CAP-006 依存、**D-F2 で確定**）

## F-7 Out of Scope

- ライブ写真のインライン表示（FEAT-004 で別途）
- 個別ライブ詳細ページ
- セットリスト掲載

## F-8 実装フェーズ

**v0.1 重要枠** / 確実に **Phase 2（v0.2、〜2025/7/11）** で実装。

## 既存要件対応

- F1.4（過去ライブ履歴、重要、Phase 2 繰越許容）
- `(grill 新規)` D-O1 `actual_attendance` フィールド

## 整合チェック

✓ 既存ドキュメントと完全整合 + **新規追加（D-O1）が反映済み**。

## 依存タスク・課題

- 過去ライブ履歴データの集約（FREOLI の過去公演リスト）
- `actual_attendance` の遡及記入
