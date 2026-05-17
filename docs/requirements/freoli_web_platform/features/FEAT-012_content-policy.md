---
doc_id: req.freoli_web_platform.feature.FEAT-012
doc_type: feature
feature_id: FEAT-012
slug: content-policy
title: ContentPolicy（CONTENT_POLICY.md 配置）
product: freoli_web_platform
layer: F
status: stable
stability: stable
phase: v0.1-pre-launch-required
capabilities: [CAP-004]
existing_requirements: [F5.1, F5.2]
ui: non-ui
as_of: 2026-05-18
owners: [endo]
---

# FEAT-012: ContentPolicy（CONTENT_POLICY.md 配置）

> **非 UI Feature**: リポジトリ直下のポリシードキュメント。UI を持たないが v0.1 launch 前の必須タスク。

## F-1 Persona

- **Content Owner = えんまさ + メンバー 4 人**（写真承諾フローの当事者）
- **削除依頼者**（メンバー本人 or 第三者）

## F-2 Trigger

コンテンツ公開前の承認フロー / 削除依頼受領時 / 新規メンバー写真 / ライブ写真の追加時。

## F-3 Done When

**CONTENT_POLICY.md がリポジトリ直下に配置**され、写真・動画・楽曲・ニュース投稿の権利ルール（被写体 Yes 必須 / 削除 1 営業日以内 / 撮影者クレジット / 楽曲埋め込みルール）が明文化されている状態。

## F-4 上位 Capability

- **メイン**: CAP-004 コンテンツ権利ガバナンス

## F-5 User Story

> As えんまさ（Content Owner）, I want **`CONTENT_POLICY.md` がリポジトリ直下にあって、メンバー / 撮影者 / 第三者から削除依頼が来たときの手順が明文化されていたら**, so that **権利トラブルを未然に防ぎ、削除依頼時に 1 営業日以内に動ける**。

## F-6 受け入れ基準（概要、E 層で EARS 化）

1. **`CONTENT_POLICY.md` がリポジトリ直下に配置**（v3 §付録 A 素案を起点）
2. 5 項目（**メンバー写真 / ライブ写真 / アー写 / 動画 / 楽曲埋め込み / ニュース投稿**）の権利ルールが明記
3. 削除依頼の連絡先（`freoli.official@gmail.com`）と **1 営業日以内対応の SLA** が明記

## F-7 Out of Scope

- 利用規約（Terms of Service）の作成（v1.0 で検討、EC や会員機能がないため v0.1 では不要）
- 法的拘束力のある契約文書化（弁護士監修は v1.0+）

## F-8 実装フェーズ

**v0.1 launch 前必須**（**D-C3** で確定。現状未配置のため Week 1 で素案作成）。

## 既存要件対応

- F5.1（削除リクエスト対応、必須）
- F5.2（権利ポリシー明文化、必須）
- 付録 A 素案
- 設計決定 #15

## 整合チェック

✓ 既存ドキュメントと完全整合 + **D-C3 で v0.1 launch 前必須タスクに格上げ済み**。

## 依存タスク・課題

- 付録 A 素案を起点に CONTENT_POLICY.md 本文作成（Week 1）
- メンバー脱退時の取扱記述（付録 A 素案では未確定）
- 撮影者との利用範囲合意の様式テンプレート
