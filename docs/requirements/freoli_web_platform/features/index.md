---
doc_id: req.freoli_web_platform.features.index
doc_type: features_index
product: freoli_web_platform
layer: F
status: stable
stability: evolving
as_of: 2026-05-18
owners: [endo]
parent_doc: docs/requirements/freoli_web_platform/capabilities.md
feature_count: 12
sources:
  - docs/requirements/freoli_web_platform_system_requirements.md
  - docs/requirements/freoli_web_platform_detailed_requirements_specification.md
  - AGENTS.md
grill_session: docs/sandbox/endo/grill-sessions/2026-05-18_freoli_web_platform-V-existing-docs-grill.md
---

# FREOLI Web Platform — Features Index

> **層の目的**: Capability ごとに「どんな体験として切り出すか」を Feature 単位で定義する。
> 全 12 Feature が既存 2 ドキュメントの F1〜F5（F2.5 撤回除く全 23 項目）を漏れなくカバーする。

---

## 1. Feature 一覧

| ID | Feature | Capability | Phase | 既存要件対応 | ファイル |
|---|---|---|---|---|---|
| **FEAT-001** | Hero（ヒーロービジュアル） | CAP-002, CAP-005 | v0.1 必須 | F2.1, F2.2 | [FEAT-001_hero.md](./FEAT-001_hero.md) |
| **FEAT-002** | NextLive（次回ライブ情報セクション） | CAP-001 | v0.1 必須 | F1.1, F1.2, F1.3, F1.5 | [FEAT-002_next-live.md](./FEAT-002_next-live.md) |
| **FEAT-003** | Members（メンバープロフィール） | CAP-002, CAP-004 | v0.1 必須 | F2.3 | [FEAT-003_members.md](./FEAT-003_members.md) |
| **FEAT-004** | PhotoGallery（バンド写真ギャラリー） | CAP-002, CAP-004 | v0.1 重要枠 / Phase 2 | F2.4 | [FEAT-004_photo-gallery.md](./FEAT-004_photo-gallery.md) |
| **FEAT-005** | SNSBar（SNS リンクバー） | CAP-007 | v0.1 必須 | F3.1, F3.5 | [FEAT-005_sns-bar.md](./FEAT-005_sns-bar.md) |
| **FEAT-006** | Subscriptions（サブスクリンク） | CAP-007 | v0.1 grayed out → v0.5 Embed | F3.2, F3.4 | [FEAT-006_subscriptions.md](./FEAT-006_subscriptions.md) |
| **FEAT-007** | News（お知らせ／ニュース欄） | CAP-008, CAP-004 | v0.1 必須 | F4.1, F4.2, F4.3 | [FEAT-007_news.md](./FEAT-007_news.md) |
| **FEAT-008** | ContactForm（問い合わせフォーム） | CAP-003, CAP-005 | v0.1 必須 | F3.6, F3.3 | [FEAT-008_contact-form.md](./FEAT-008_contact-form.md) |
| **FEAT-009** | Privacy（プライバシーポリシーページ） | CAP-003 | v0.1 必須 | F5.5 | [FEAT-009_privacy.md](./FEAT-009_privacy.md) |
| **FEAT-010** | PastLives（過去ライブ履歴） | CAP-006 | v0.1 重要枠 / Phase 2 | F1.4 + D-O1 | [FEAT-010_past-lives.md](./FEAT-010_past-lives.md) |
| **FEAT-011** | DeployGuard（デプロイ運用ガード） | CAP-005 | v0.1 launch 前必須（非 UI） | F5.3, F5.4 + AGENTS.md §6/§7 | [FEAT-011_deploy-guard.md](./FEAT-011_deploy-guard.md) |
| **FEAT-012** | ContentPolicy（CONTENT_POLICY.md 配置） | CAP-004 | v0.1 launch 前必須（非 UI） | F5.1, F5.2 + 付録 A | [FEAT-012_content-policy.md](./FEAT-012_content-policy.md) |

---

## 2. 非交渉 UX シーケンス（Feature 配置順）

```
┌──────────────────────────────────────────────────────────────────┐
│ FEAT-001 Hero                                                     │
│   → FEAT-005 SNSBar                                               │
│   → FEAT-002 NextLive（+ FEAT-010 PastLives は同じセクション）     │
│   → FEAT-003 Members（+ FEAT-004 PhotoGallery は同セクション）     │
│   → FEAT-006 Subscriptions                                        │
│   → FEAT-007 News                                                 │
│   → FEAT-008 ContactForm（+ FEAT-009 Privacy リンク）             │
└──────────────────────────────────────────────────────────────────┘
            ↑ D-C1 / AGENTS.md 非交渉 UX シーケンス
            順序変更を伴う Feature は却下対象

非 UI Feature（横断的に作用、フッターやリポジトリ構造に存在）:
- FEAT-011 DeployGuard（hook / .gitignore / lib/env.ts）
- FEAT-012 ContentPolicy（リポジトリ直下の CONTENT_POLICY.md）
```

---

## 3. Capability カバレッジ

| Capability | カバーする Feature | 過不足 |
|---|---|---|
| **CAP-001** ライブ参加意思の即時形成 | FEAT-002 | ✓ |
| **CAP-002** 世界観・正体の即時伝達 | FEAT-001 / 003 / 004 | ✓ |
| **CAP-003** 正規ブッキング窓口 | FEAT-008 / 009 | ✓ |
| **CAP-004** コンテンツ権利ガバナンス | FEAT-012（メイン）/ 003 / 004 / 007 連携 | ✓ |
| **CAP-005** Reversibility-First デプロイ | FEAT-011（メイン）/ 001 / 008 連携 | ✓ |
| **CAP-006** ライブ実績の継続記録 | FEAT-010 | ✓ |
| **CAP-007** SNS チャネル間の橋渡し | FEAT-005 / 006 | ✓ |
| **CAP-008** ファン継続接点の維持 | FEAT-007 | ✓ |

**結論**: 全 8 Capability が少なくとも 1 Feature でカバーされている。過不足なし。

---

## 4. 既存 2 ドキュメント整合チェック（F1〜F5 全項目対応）

| 既存要件 ID | 内容 | 担当 Feature | 状態 |
|---|---|---|---|
| F1.1 | 直近ライブ情報の常時表示 | FEAT-002 | ✓ |
| F1.2 | チケット予約・問い合わせ導線 | FEAT-002 | ✓ |
| F1.3 | 会場アクセス情報（Google Maps） | FEAT-002 | ✓ |
| F1.4 | 過去ライブ履歴 | FEAT-010 | ✓ |
| F1.5 | ライブ予定の未定状態 UI | FEAT-002（縮退） | ✓ |
| F2.1 | ヒーロービジュアル | FEAT-001 | ✓ |
| F2.2 | バンド一言紹介 | FEAT-001 | ✓ |
| F2.3 | メンバープロフィール | FEAT-003 | ✓ |
| F2.4 | バンド写真ギャラリー | FEAT-004 | ✓ |
| ~~F2.5~~ | ~~ボーカル動画~~ | （撤回） | — |
| F3.1 | SNS リンク集 | FEAT-005 | ✓ |
| F3.2 | サブスクリンク（v0.1 grayed out） | FEAT-006 | ✓ |
| F3.3 | mailto: 連絡先表示 | FEAT-008（縮退） | ✓ |
| F3.4 | 楽曲埋め込みプレイヤー（v0.5+） | FEAT-006 | ✓ |
| F3.5 | 外部リンクのターゲット属性 | FEAT-005 | ✓ |
| F3.6 | 問い合わせフォーム | FEAT-008 | ✓ |
| F4.1 | お知らせ／ニュース欄 | FEAT-007 | ✓ |
| F4.2 | ニュース投稿のレビュー手順 | FEAT-007 | ✓ |
| F4.3 | CMS 連携（中長期） | FEAT-007（evolving） | ✓ |
| F5.1 | コンテンツ削除リクエスト対応 | FEAT-012 | ✓ |
| F5.2 | 権利ポリシー明文化 | FEAT-012 | ✓ |
| F5.3 | 更新担当ロール | FEAT-011 | ✓ |
| F5.4 | 担当不在時のフォールバック | FEAT-011 | ✓ |
| F5.5 | プライバシーポリシー | FEAT-009 | ✓ |

**結論**: F1〜F5 の全 23 項目（F2.5 撤回除く）が Feature で漏れなくカバー。設計決定 21 項目すべてが Feature 仕様に反映。

---

## 5. F 層で派生した Decisions

| ID | 内容 | 影響 |
|---|---|---|
| **D-F1** | 用件カテゴリプルダウンを **5 種に拡張**（出演依頼 / 取材・メディア / コラボ / **ファン感想** / その他）。D-O2 + D-C4 の統合。 | FEAT-008 ContactForm 仕様 |
| **D-F2** | `data/lives.ts` に **NextLive と PastLives の共通スキーマ** を採用し、`actual_attendance: number \| null` を共有。CAP-001 ⇄ CAP-006 依存の具体化。 | FEAT-002 / FEAT-010 / Engineering Spec |

---

## 6. v0.1 launch 前 実装スケジュール（既存 Phase 1 計画と整合）

| Week | 日付 | 必須完了 Feature |
|---|---|---|
| **Week 1** | 5/17〜5/23 | FEAT-011 DeployGuard（hook + `.gitignore` + `lib/env.ts`）/ FEAT-012 ContentPolicy（素案）/ FEAT-009 Privacy（素案）/ 環境変数取得（Resend / Turnstile） |
| **Week 2 前半** | 5/24〜5/25 | アー写撮影（FEAT-001 / FEAT-003 / FEAT-004 の素材）/ FEAT-005 SNSBar 実装 |
| **Week 2 中盤** | 5/26〜5/28 | FEAT-001 Hero / FEAT-002 NextLive / FEAT-003 Members / FEAT-006 Subscriptions（grayed out）/ FEAT-008 ContactForm / FEAT-009 Privacy ページ |
| **Week 2 後半** | 5/29〜5/31 | FEAT-007 News（初回投稿）/ 全メンバー承諾取得 / 最終確認 / **5/31 本番公開** |

---

## 7. 依存タスク・課題の集約

| タスク | 対応 Feature | 既存ドキュメント根拠 | 期限 |
|---|---|---|---|
| キャッチコピー文面（30〜80 字）確定 | FEAT-001 | v3 中優先度 #1 | 5/25 |
| メンバー個別紹介文 1〜2 行 ×4 | FEAT-003 | v3 中優先度 #2 | 5/28 |
| 初回ニュース投稿（7/11 ライブ告知）文面 | FEAT-007 | v3 中優先度 #3 | 5/31 |
| Blue Sheep 電話番号 or 公式 URL | FEAT-002 | v3 中優先度 #6 | 5/28 |
| `data/lives.ts` スキーマ確定（`actual_attendance` 含む） | FEAT-002, FEAT-010 | D-O1, D-F2 | 5/24 |
| プライバシーポリシー法的観点確認 | FEAT-009 | v3 §法的リスク | 5/28 |

---

## 8. 次層への接続（Eval 層）

Feature 層が確定したため、Eval（E）層では各 Feature の **F-6 受け入れ基準を EARS 記法で精緻化** する。

優先度の高い Feature（Eval 必須）:
1. **FEAT-002 NextLive** ← O-1 北極星指標に最も貢献、EARS で「3 秒で分かる」を測定可能化
2. **FEAT-008 ContactForm** ← CAP-003 stable の API 契約、Gate 1 検証対象
3. **FEAT-001 Hero** ← LCP 2.5 秒以内、Vision V-7 の核
4. **FEAT-011 DeployGuard** ← Reversibility 全体の信頼基盤
5. **FEAT-007 News** ← O-8 鮮度指標、月次運用の達成判定

短縮対象（共通基準で十分）: FEAT-003 / 004 / 005 / 006 / 009 / 010 / 012
