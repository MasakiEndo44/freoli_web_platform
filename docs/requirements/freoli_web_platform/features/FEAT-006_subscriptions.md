---
doc_id: req.freoli_web_platform.feature.FEAT-006
doc_type: feature
feature_id: FEAT-006
slug: subscriptions
title: Subscriptions（サブスクリンク + v0.5 Embed）
product: freoli_web_platform
layer: F
status: stable
stability: evolving
phase: v0.1-required-grayed-out-then-v0.5-embed
capabilities: [CAP-007]
existing_requirements: [F3.2, F3.4]
as_of: 2026-05-18
owners: [endo]
---

# FEAT-006: Subscriptions（サブスクリンク + v0.5 Embed）

## F-1 Persona

- **Primary**: 高橋みさき（Spotify Discover Weekly / Release Radar ユーザー、楽曲リリース時に試聴したい）
- **Secondary**: 田村ブッカー（音源の有無で出演判断）

## F-2 Trigger

- **v0.1 期**: メンバー紹介を見終わって「音聴いてみたい」と思った瞬間
- **v0.5 以降**: 楽曲リリース告知を SNS で見て、HP で実際に再生したい瞬間

## F-3 Done When

- **v0.1 期**: 訪問者が **「2025 年配信予定」を認識**し、楽曲リリースを待つ意思を持って **SNS フォロー（CAP-007）に流れた** 状態（楽曲未リリースを「期待」に変換）
- **v0.5 期**: 訪問者が **Spotify / Apple Music 埋め込みプレイヤーで楽曲を再生**し、お気に入り登録 or プレイリスト追加した状態

## F-4 上位 Capability

- **メイン**: CAP-007 SNS チャネル間の橋渡し（v0.5+ で楽曲入口に拡張）

## F-5 User Story

- **v0.1**: As 高橋みさき, I want **Spotify / Apple Music のアイコンが「2025 年配信予定」ラベルで表示されたら**, so that **「楽曲未リリースだけど期待できそう」と感じて、SNS フォローして配信を待つ**
- **v0.5**: As 高橋みさき, I want **Spotify Embed プレイヤーが HP 内にあったら**, so that **HP 上で即試聴して、気に入ればプレイリスト追加できる**

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. **v0.1 では Spotify / Apple Music リンクを無効状態（grayed out）+ 「2025 年配信予定」ラベル**（v3 §ドメイン言語禁止表現 / AGENTS.md §5 と整合。「配信中」と誤認させる表記禁止）
2. v0.5+ で実 URL に切り替え、Spotify Embed / Apple Music Embed を **トップページに常時設置**（F3.4）
3. **公式 Embed のみ**（設計決定 #6、自前楽曲ホスティング禁止）

## F-7 Out of Scope

- v0.1 期での **実 URL リンク有効化**（楽曲未リリース、誤認防止のため厳密に grayed out）
- v0.1 期での Embed プレイヤー（v0.5 以降）
- YouTube 楽曲動画の埋め込み（**ホームページ内の動画埋め込みは恒久的に禁止**、設計決定 #6 / AGENTS.md §5）
- Bandcamp / SoundCloud 等の他サブスク（Spotify / Apple Music のみ）

## F-8 実装フェーズ

**v0.1（2025/5/31）grayed out 状態で必須実装** → **v0.5（2025 年内楽曲リリース時）に Embed 化**。

## 既存要件対応

- F3.2（サブスクリンク、必須、v0.1 grayed out）
- F3.4（楽曲埋め込みプレイヤー、重要、v0.5+）
- 設計決定 #6（動画自己ホスティング禁止 / Spotify・Apple Music 埋め込みのみ可）
- ドメイン言語禁止表現

## 整合チェック

✓ 既存ドキュメントと完全整合。v0.1 と v0.5 で挙動が変わる **evolving Feature** であることを明示。

## 依存タスク・課題

- 楽曲リリース時に Spotify / Apple Music の Artist URL 取得（v0.5 期タスク）
- v0.1 期は依存なし
