---
doc_id: req.freoli_web_platform.feature.FEAT-008
doc_type: feature
feature_id: FEAT-008
slug: contact-form
title: ContactForm（問い合わせフォーム）
product: freoli_web_platform
layer: F
status: stable
stability: stable
phase: v0.1-required
capabilities: [CAP-003, CAP-005]
existing_requirements: [F3.3, F3.6]
as_of: 2026-05-18
owners: [endo]
---

# FEAT-008: ContactForm（問い合わせフォーム）

## F-1 Persona

- **Primary**: 田村ブッカー / メディア関係者 / 対バン候補バンド（ブッキング・取材・コラボ依頼の主要窓口、Vision V-5 Secondary Persona）
- **Secondary**: 高橋みさき（ファン感想送信、**D-O2 種別プルダウンで分離**）

## F-2 Trigger

サイト全体を見終わって「このバンドと話したい」と思った瞬間（業界）/ ライブ感想 / コラボ提案を送りたい瞬間（ファン）/ 業界関係者は **5 分以内判断後の最後のアクション**。

## F-3 Done When

送信者が **必要 4 項目（名前 / メアド / 用件カテゴリ / 本文）+ Turnstile を完了し、送信完了画面に到達**。えんまさが Gmail で受信し 24 時間以内に 1 次返信（detailed §4.3 業務フロー）。

## F-4 上位 Capability

- **メイン**: CAP-003 正規ブッキング窓口
- **連携**: CAP-005（環境変数管理）

## F-5 User Story

> As 田村ブッカー, I want **HP の問い合わせフォームで「出演依頼」カテゴリで本文を送信できたら**, so that **SNS DM に頼らずに正規ルートで打診でき、迅速な返信が期待できる**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. **4 フィールド**: 名前 / 連絡先メアド / 用件カテゴリ（**出演依頼 / 取材・メディア / コラボ / ファン感想 / その他**、**D-F1 で 5 種に拡張**）/ 本文。フィールド数 5 項目以下（detailed §5）
2. **送信成功時**: クライアントで「送信ありがとうございました」画面表示、Resend で `freoli.official@gmail.com` 宛にメール送達
3. **送信失敗時の縮退**: Resend / Turnstile 失敗で **mailto: フォールバック**（F3.3 二重窓口）を表示、内部情報（API キー・スタックトレース）は **絶対にクライアントに返さない**（AGENTS.md §7 Gate 1）。完了所要時間 **30 秒以内**

## F-7 Out of Scope

- 自動返信メール本文の差出人カスタマイズ（v0.5+ で独自ドメイン取得後の Resend ドメイン検証以降に検討）
- ファイル添付（プレスキット送付など、v1.0+ で検討）
- ボイス入力 / 音声録音
- 多言語フォーム（v1.0 候補）
- 履歴管理 UI（送信履歴をユーザーが確認する機能、ログインなしの v1.0 まで不要）

## F-8 実装フェーズ

**Phase 1（v0.1、2025/5/31）必須**。Week 2 中盤（5/26〜28）に集中実装。Week 1 で Resend / Turnstile アカウント・APIキー取得。

## 既存要件対応

- F3.6（問い合わせフォーム、必須）
- F3.3（mailto: 連絡先、必須）
- 設計決定 #14（honeypot + Turnstile 二重防御）
- 設計決定 #19（freoli.official@gmail.com）
- 設計決定 #20（Resend 採用）

## 整合チェック

✓ 既存ドキュメントと完全整合。**D-O2 「お問い合わせ種別プルダウン」拡張**（D-F1 でファン感想を追加して 5 種）が反映済み。AGENTS.md §2 API-First の Zod 型契約と整合。

## 依存タスク・課題

- Resend / Turnstile 環境変数の Vercel 設定（Week 1）
- Privacy ページとの連携（FEAT-009）
- honeypot フィールド名の決定（`website` 推奨、detailed §9）
