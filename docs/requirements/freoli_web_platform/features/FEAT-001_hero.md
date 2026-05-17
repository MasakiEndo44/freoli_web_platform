---
doc_id: req.freoli_web_platform.feature.FEAT-001
doc_type: feature
feature_id: FEAT-001
slug: hero
title: Hero（ヒーロービジュアル）
product: freoli_web_platform
layer: F
status: stable
stability: evolving
phase: v0.1-required
capabilities: [CAP-002, CAP-005]
existing_requirements: [F2.1, F2.2]
as_of: 2026-05-18
owners: [endo]
---

# FEAT-001: Hero（ヒーロービジュアル）

## F-1 Persona

- **Primary**: 高橋みさき（Instagram から到達した瞬間の流入者）
- **Secondary**: 田村ブッカー（プレスキット相当判断の最初の 3 秒）

## F-2 Trigger

ペルソナが SNS で気になった瞬間にホームページを開いた **最初のファーストビュー（着地〜3 秒）**。

## F-3 Done When

訪問者が「あの色のバンド」というブランド認識を持ち、**次のセクションへスクロールしたくなった** 状態。Vision V-7「手よりも先に心が動かされた」の現実化。

## F-4 上位 Capability

- **メイン**: CAP-002 世界観・正体の即時伝達
- **連携**: CAP-005（next/image priority による Reversibility-First 互換性）

## F-5 User Story

> As 高橋みさき, I want **HP を開いた瞬間にバンド写真・FREOLI のロゴ・1 行キャッチコピーを全幅で見ることができたら**, so that **「これ私の好きなやつだ」と 3 秒で確信して下にスクロールしたくなる**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. モバイル LCP **2.5 秒以内**（V-7「3 秒で分かる」/ O-8 非機能要件と整合）
2. ヒーロー画像は **全幅 + next/image `priority` 属性 + WebP 自動配信**
3. バンド名「FREOLI」+ 1 行キャッチコピー（**30〜80 字**、サカナクション系の観察的トーン）が画像上にネオンブルーで重なる

## F-7 Out of Scope

- ボーカル歌唱動画埋め込み（F2.5 撤回、AGENTS.md §5 ドメイン言語禁止）
- 楽曲再生ボタン（v0.5+ 候補、楽曲未リリース期）
- ヒーロースライダー（複数画像切替）── v0.1 は静止画 1 枚で勝負
- 動画パララックス効果
- 多言語切替（v1.0 候補）

## F-8 実装フェーズ

**Phase 1（v0.1、2025/5/31）必須**。Week 1（5/17〜5/23）にデザイントークン定義、Week 2（5/24〜25 アー写撮影 → 5/26〜31 流し込み）で完成。

## 既存要件対応

- F2.1（ヒーロービジュアル、必須）
- F2.2（バンド一言紹介、必須）
- 設計決定 #10（ネオンブルー × 黒）
- 設計決定 #21（アー写撮影）

## 整合チェック

✓ 既存ドキュメントと完全整合。新規追加・矛盾なし。

## 依存タスク・課題

- キャッチコピー文面（30〜80 字）の確定（v3 §追加情報リクエスト 🟡 中優先度 #1）
- アー写撮影（5/24〜25、間に合わない場合は既存ライブ写真 10 枚から選定）
