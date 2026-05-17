---
doc_id: req.freoli_web_platform.feature.FEAT-009
doc_type: feature
feature_id: FEAT-009
slug: privacy
title: Privacy（プライバシーポリシーページ）
product: freoli_web_platform
layer: F
status: stable
stability: stable
phase: v0.1-required
capabilities: [CAP-003]
existing_requirements: [F5.5]
as_of: 2026-05-18
owners: [endo]
---

# FEAT-009: Privacy（プライバシーポリシーページ）

## F-1 Persona

- **Primary**: 田村ブッカー / メディア関係者（個人情報送信前のコンプライアンス確認）
- **Secondary**: 高橋みさき（フォーム送信時の安心感確保）

## F-2 Trigger

問い合わせフォーム送信前の **フォーム下部「プライバシーポリシーに同意する」リンク** をタップした瞬間。あるいはフッターの「プライバシーポリシー」リンクから到達。

## F-3 Done When

訪問者が **取得情報の範囲・利用目的・保持期間・第三者提供の有無・削除手段** を理解し、安心してフォーム送信に戻った状態。または **削除依頼の連絡先（`freoli.official@gmail.com`）** を把握。

## F-4 上位 Capability

- **メイン**: CAP-003 正規ブッキング窓口（F5.5 として CAP-003 の前提条件、**D-C4 で明示追記済み**）

## F-5 User Story

> As 田村ブッカー, I want **`/privacy` ページで取得情報（氏名・メアド・本文のみ）・利用目的（問い合わせ返信のみ）・保持期間（1 年）・第三者提供（なし）を明示的に確認できたら**, so that **個人情報送信に対するリスクが極小と判断でき、安心してブッキング打診できる**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. **`/privacy` を独立ページとして配置**（フッター + 問い合わせフォーム下部からリンク）
2. v3 **付録 B のプライバシーポリシー素案を起点**に作成。最低含む項目: 取得情報 / 利用目的 / 保持期間（1 年）/ 第三者提供（なし、Resend 経由のみ）/ 解析（Vercel Analytics、Cookieless）/ 削除依頼手段（mailto）
3. 個人情報保護法・GDPR 準拠を意識した平易な日本語（多言語対応は v1.0 で検討）

## F-7 Out of Scope

- 英語版プライバシーポリシー（v1.0 候補、🟢 低優先度 #2）
- Cookie 同意バナー（Vercel Analytics は Cookieless のため不要、detailed §6）
- プライバシーポリシー版管理 UI（変更履歴の表示、v1.0 まで Git 履歴で代替）
- 個別ユーザーが自身の保有データを確認・削除する画面（**そもそも保有データなし** = フォーム送信内容のみ Resend / Gmail 経由、サーバー保存しない、detailed §7）

## F-8 実装フェーズ

**Phase 1（v0.1、2025/5/31）必須**。Week 1（5/17〜5/23）にプライバシーポリシー素案作成、Week 2 中盤（5/26〜28）にページ実装。

## 既存要件対応

- F5.5（プライバシーポリシー、必須）
- 付録 B プライバシーポリシー素案

## 整合チェック

✓ 既存ドキュメントと完全整合。CAP-003 の前提条件として **D-C4 で明示追記済み**。

## 依存タスク・課題

- 付録 B 素案を起点に **法的観点での文面確認**（無料の弁護士相談 or テンプレート参照、5/28 まで）
- バンド継続不能時の取扱記述（リスク §法的）
