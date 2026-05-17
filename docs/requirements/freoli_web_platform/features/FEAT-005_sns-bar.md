---
doc_id: req.freoli_web_platform.feature.FEAT-005
doc_type: feature
feature_id: FEAT-005
slug: sns-bar
title: SNSBar（SNS リンクバー）
product: freoli_web_platform
layer: F
status: stable
stability: evolving
phase: v0.1-required
capabilities: [CAP-007]
existing_requirements: [F3.1, F3.5]
as_of: 2026-05-18
owners: [endo]
---

# FEAT-005: SNSBar（SNS リンクバー）

## F-1 Persona

- **Primary**: 高橋みさき（流入元と異なる SNS への橋渡し希望者）
- **Secondary**: 田村ブッカー（運営アカウント数を運営力の指標として確認）

## F-2 Trigger

ヒーローを見終わって直下に到達した瞬間。あるいは流入元 SNS（Instagram）から来て「TikTok でも観たい」と思った瞬間。

## F-3 Done When

訪問者が **運営中の SNS（Instagram / YouTube / TikTok / X）4 種** の存在を認識し、好みのチャネルへタップ遷移した状態。流入元 SNS とは別の SNS でフォロー追加が発生。

## F-4 上位 Capability

- **メイン**: CAP-007 SNS チャネル間の橋渡し

## F-5 User Story

> As 高橋みさき, I want **ヒーロー直下に Instagram / YouTube / TikTok / X の 4 種 SNS アイコンが並んでいたら**, so that **Instagram で見た FREOLI を TikTok でも追いかけたくなって、流入元以外のチャネルでもフォローを増やせる**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. **ヒーロー直下に配置**（AGENTS.md 非交渉 UX シーケンス、D-C1。順序変更不可）
2. アイコン + ラベルで識別可能、Lucide React など軽量ライブラリ使用
3. 全リンクが **`target="_blank"` + `rel="noopener noreferrer"`**（F3.5）。タップ時にスムーズに該当 SNS アプリ or ブラウザに遷移

## F-7 Out of Scope

- 各 SNS の最新投稿埋め込み（埋め込みは Spotify / Apple Music の v0.5+ 楽曲 Embed のみ可、設計決定 #6 / AGENTS.md §5 ドメイン言語禁止）
- フォロワー数の表示（API コスト・更新頻度の観点でスコープ外）
- 共有ボタン（X / Facebook で「シェアする」）── ペルソナは "観に来た" 側、シェアはバンド側の SNS 投稿で実施

## F-8 実装フェーズ

**Phase 1（v0.1、2025/5/31）必須**。Week 2 前半（5/26〜27）に実装。

## 既存要件対応

- F3.1（SNS リンク集 4 種、必須）
- F3.5（ターゲット属性、必須）
- AGENTS.md「非交渉 UX シーケンス」

## 整合チェック

✓ 既存ドキュメントと完全整合。非交渉 UX シーケンス（D-C1）により位置が固定。

## 依存タスク・課題

- 各 SNS の正規 URL を `data/links.ts` に確定（既存 SNS は運用中、URL 取得済前提）
