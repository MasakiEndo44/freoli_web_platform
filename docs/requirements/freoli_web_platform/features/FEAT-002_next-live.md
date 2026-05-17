---
doc_id: req.freoli_web_platform.feature.FEAT-002
doc_type: feature
feature_id: FEAT-002
slug: next-live
title: NextLive（次回ライブ情報セクション）
product: freoli_web_platform
layer: F
status: stable
stability: volatile
phase: v0.1-required
capabilities: [CAP-001]
existing_requirements: [F1.1, F1.2, F1.3, F1.5]
as_of: 2026-05-18
owners: [endo]
---

# FEAT-002: NextLive（次回ライブ情報セクション）

## F-1 Persona

- **Primary**: 高橋みさき（ライブ参加検討中、7〜8 割「行く」が決まってから HP で確認）
- **Secondary**: 田村ブッカー（出演履歴・動員規模判断）

## F-2 Trigger

ペルソナがヒーロー直下に到達した瞬間。あるいは SNS 投稿で「7/11 ライブ」と見て確認のため HP に来た瞬間。

## F-3 Done When

訪問者が **次回ライブの日付・会場・予約方法を 3 秒で把握**し、Google Maps タップ or 会場問い合わせ導線をタップした状態。Vision V-7「もう予約まで終わってた」の前段。

## F-4 上位 Capability

- **メイン**: CAP-001 ライブ参加意思の即時形成

## F-5 User Story

> As 高橋みさき, I want **ヒーロー直下で次のライブの日付・会場・チケット導線・Google Maps リンクを一目で把握できたら**, so that **「行こうかな」を 7〜8 割から 100% に変えて、その場で予約手段に進める**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. **ヒーロー直下に配置**（非交渉 UX シーケンス、D-C1）
2. 日付・会場名・開場/開演時刻・チケット価格・**Google Maps リンク**を 1 セクション内に表示
3. **チケット URL 未取得時の恒久フォールバック**「ご予約・お問い合わせは会場（Blue Sheep）まで」+ 会場電話 / 公式サイトリンク（**設計決定 #16**）
4. 過去日付公演は自動的に「過去のライブ」セクションへ移行（F1.5、複数公演がある場合は最も近い日付を最上位）

## F-7 Out of Scope

- 自動チケット予約システム（恒久的にスコープ外、設計決定 #16）
- 会場の地図埋め込み（Google Maps リンクのみ、埋め込みはコスト・プライバシー観点でなし）
- ライブ詳細ページ（v0.1 では 1 セクション完結、複数ページ化は v1.0 プレスキット時に検討）
- カレンダー連携（iCal / Google Calendar 連携は v1.0 候補）

## F-8 実装フェーズ

**Phase 1（v0.1、2025/5/31）必須**。Week 2 中盤（5/26〜28）に実装、初回データは 7/11 Blue Sheep。

## 既存要件対応

- F1.1（直近ライブ情報の常時表示、必須）
- F1.2（チケット予約・問い合わせ導線、必須、恒久フォールバック）
- F1.3（会場アクセス情報、Google Maps）
- F1.5（ライブ予定の未定状態 UI、重要）
- 設計決定 #16（チケット URL 恒久フォールバック）

## 整合チェック

✓ 既存ドキュメントと完全整合。Google Maps は detailed §6 インテグレーション要件（外部リンクのみ）と整合。

## 依存タスク・課題

- Blue Sheep の電話番号 or 公式サイト URL の確定（v3 中優先度 #6、5/28 まで）
- `data/lives.ts` スキーマ確定（D-F2: `actual_attendance: number \| null` を含む共通スキーマ、PastLives と共有）
