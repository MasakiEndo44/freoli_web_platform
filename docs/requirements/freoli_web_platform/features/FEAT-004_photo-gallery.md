---
doc_id: req.freoli_web_platform.feature.FEAT-004
doc_type: feature
feature_id: FEAT-004
slug: photo-gallery
title: PhotoGallery（バンド写真ギャラリー）
product: freoli_web_platform
layer: F
status: stable
stability: evolving
phase: v0.1-recommended-or-phase-2
capabilities: [CAP-002, CAP-004]
existing_requirements: [F2.4]
as_of: 2026-05-18
owners: [endo]
---

# FEAT-004: PhotoGallery（バンド写真ギャラリー）

## F-1 Persona

- **Primary**: 高橋みさき（バンド世界観の深堀り、ライブ感の擬似体験）

## F-2 Trigger

メンバー紹介を見終わって「ライブの様子も見たい」と思った瞬間。

## F-3 Done When

アー写・ライブ写真 3〜5 枚を視認し、バンドの「動いている姿」「ライブ感」を補強された状態。

## F-4 上位 Capability

- **メイン**: CAP-002 世界観・正体の即時伝達
- **連携**: CAP-004 権利ガバナンス（撮影者クレジット + 写っているメンバー全員の Yes）

## F-5 User Story

> As 高橋みさき, I want **アー写・ライブ写真 3〜5 枚をギャラリー表示で見られたら**, so that **バンドの世界観を視覚的に補強でき、ライブ参加意欲が高まる**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. 3〜5 枚をグリッド表示、`next/image` で最適化（WebP / レスポンシブ）
2. 全写真が **被写体 Yes + 撮影者クレジット**（CAP-004 制約、付録 A）
3. 会場が撮影禁止の写真は **掲載不可**（付録 A）

## F-7 Out of Scope

- ライトボックス拡大表示
- 写真ダウンロード
- コメント機能

## F-8 実装フェーズ

**v0.1 重要枠**（時間が許せば）/ 確実に **Phase 2（v0.2、〜2025/7/11）** で実装。

## 既存要件対応

- F2.4（バンド写真ギャラリー、重要、Phase 2 繰越許容）
- 付録 A 権利ポリシー

## 整合チェック

✓ 既存ドキュメントと完全整合。

## 依存タスク・課題

- 既存ライブ写真 10 枚 + アー写（5/24〜25 撮影）からの選定
- 全写真の被写体 Yes 取得
- 撮影者クレジット情報の整備
