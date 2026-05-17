---
doc_id: req.freoli_web_platform.capabilities
doc_type: capabilities
product: freoli_web_platform
layer: C
status: stable
stability: evolving
as_of: 2026-05-18
owners: [endo]
parent_doc: docs/requirements/freoli_web_platform/outcomes.md
capability_count: 8
sources:
  - docs/requirements/freoli_web_platform_system_requirements.md
  - docs/requirements/freoli_web_platform_detailed_requirements_specification.md
  - AGENTS.md
  - docs/requirements/freoli_web_platform/vision.md
  - docs/requirements/freoli_web_platform/outcomes.md
grill_session: docs/sandbox/endo/grill-sessions/2026-05-18_freoli_web_platform-V-existing-docs-grill.md
---

# FREOLI Web Platform — Capabilities

> **層の目的**: 「このシステムが何をできるか」を実装非依存の能力単位で列挙・定義する。
> 8 つの Capability すべてが既存 2 ドキュメント（system_requirements.md / detailed_requirements_specification.md）の F1〜F5 と対応している。
> ここを厚くすることで、Feature や EngSpec が変わっても Capability は安定する。

---

## 0. Capability 一覧（インデックス）

| ID | Capability | 階層 | 安定性 | v0.1 必須 | 主要対応既存要件 |
|---|---|---|---|---|---|
| **CAP-001** | ライブ参加意思の即時形成 | L1 静的 | volatile | ✓ | F1.1, F1.2, F1.3, F1.5 |
| **CAP-002** | 世界観・正体の即時伝達 | L1 静的 | evolving | ✓ | F2.1, F2.2, F2.3, F2.4 |
| **CAP-003** | 正規ブッキング窓口の提供 | L2 動的（API） | stable | ✓ | F3.3, F3.6, F5.5 |
| **CAP-004** | コンテンツ権利ガバナンスの運用 | L3 運用 | stable | ✓ | F5.1, F5.2 |
| **CAP-005** | Reversibility-First デプロイの維持 | L3 運用 | stable | ✓ | F5.3, F5.4, 技術スタック全般 |
| **CAP-006** | ライブ実績の継続記録 | L1 + L3 | evolving | ✓ | F1.4 + `(grill 新規)` D-O1 |
| **CAP-007** | SNS チャネル間の橋渡し | L1 静的 | evolving | ✓ | F3.1, F3.2, F3.4(v0.5+), F3.5 |
| **CAP-008** | ファン継続接点の維持 | L1 + L3 | evolving | ✓ | F4.1, F4.2, F4.3 |

**v0.5 / v1.0 で追加検討**: 楽曲プレビューの提供（CAP-007 拡張 or CAP-009 切り出し）/ プレスキット（CAP-010）/ メーリングリスト（CAP-011）

---

## 1. 階層分類（実現手段）

| 階層 | 意味 | 該当 Capability |
|---|---|---|
| **L1: 静的** | `data/*.ts` + Next.js の SSG で実現。実行時の動的処理なし | CAP-001 / CAP-002 / CAP-007 |
| **L1 + L3** | コード上は静的、運用上は人間の継続行動が必要 | CAP-006 / CAP-008 |
| **L2: 動的（外部 API）** | サーバーサイド処理 + 外部 SaaS への通信が必要 | CAP-003（Resend + Turnstile） |
| **L3: 運用** | コードでは完結せず、運営者の継続行動が必要 | CAP-004 / CAP-005 |

---

## 2. 安定性プロファイル

| 安定性 | 該当 Capability | 含意 |
|---|---|---|
| **stable**（v0.1〜v1.0 で不変） | CAP-003, CAP-004, CAP-005 | S 層（Engineering Spec）で API 契約・hook 仕様を厳密に固める対象。一度書けば長持ち |
| **evolving**（バージョン進行で拡張） | CAP-002, CAP-006, CAP-007, CAP-008 | v0.5 / v1.0 で再 grill 対象。今フェーズの仕様はあくまで v0.1 期 |
| **volatile**（外部要因で頻繁変動） | CAP-001 | Content Owner の月次運用タスクとして固定化が必要 |

---

## 3. 依存グラフ

```
              ┌─────── CAP-005 (Reversibility-First) ←─┐
              │     基盤層（全 Capability の土台）        │
              │                                          │
   CAP-004 (権利ガバナンス) ── 制約 ──→ CAP-002 / CAP-006 / CAP-007 / CAP-008
              ↑                                │
              │                                │
              └── レビュー前提 ────────────────┘

   非交渉 UX シーケンス（順序固定）:
   ┌──────────────────────────────────────────────────────────────────┐
   │ Hero (CAP-002)                                                    │
   │   → SNS Bar (CAP-007)                                             │
   │   → Lives (CAP-001 + CAP-006)                                     │
   │   → Members (CAP-002)                                             │
   │   → Subscriptions (CAP-007、v0.5+ で CAP-007 拡張)                │
   │   → News (CAP-008)                                                │
   │   → Contact (CAP-003)                                             │
   └──────────────────────────────────────────────────────────────────┘
              ↑
        要件定義書 F2.1 / AGENTS.md 非交渉 UX シーケンス
        順序変更を伴う Feature は却下対象（D-C1）
```

### 依存関係の核心

1. **CAP-005 は基盤層**: これが機能しないと全 Capability の保証が崩れる。v0.1 launch 前の最優先タスク。
2. **CAP-004 は横断制約**: コードではなく運用原則として、CAP-002 / CAP-006 / CAP-007 / CAP-008 のコンテンツ更新フローに介入する。
3. **CAP-001 ⇄ CAP-006 が最強依存**: 両者は `data/lives.ts` を共有。CAP-006 の `actual_attendance` 追加は CAP-001 の型定義変更を伴う（`(grill 新規)` D-O1 の実装影響範囲）。
4. **非交渉 UX シーケンスは Capability の表示順を固定**（D-C1）: 順序を入れ替える Feature は却下対象。

---

## 4. Capability 詳細仕様（CAP-001〜CAP-008）

### CAP-001: ライブ参加意思の即時形成

| 項目 | 内容 |
|---|---|
| **何ができる** | 訪問者が 3 秒で「次のライブの日付・会場・予約方法」を把握し、行動意思を即時形成できる |
| **対応既存要件** | F1.1（直近ライブ情報常時表示）/ F1.2（チケット予約・問い合わせ導線、恒久フォールバック）/ F1.3（会場アクセス・Google Maps）/ F1.5（未定状態 UI） |
| **階層** | L1 静的（`data/lives.ts` から SSG） |
| **安定性** | volatile（ライブ毎に内容変動 + チケット URL 取得状況は恒久的に揺れる） |
| **前提条件** | ① `data/lives.ts` に最低 1 件の次回ライブ情報（日付・会場・チケット情報、`venueUrl` オプショナル） ② 過去日付公演の自動非表示ロジック or Content Owner の手動メンテ ③ Google Maps 検索 URL への遷移リンク |
| **縮退動作** | 次回未定 → F1.5 プレースホルダー「次回公演調整中」表示 + SNS リンクへ誘導 / チケット URL 未取得 → F1.2「ご予約・お問い合わせは会場（Blue Sheep）まで」+ 電話 / 会場サイトリンク表示（**設計決定 #16 で恒久仕様確定**） / 過去日付残存 → 月次レビューで Content Owner 整理 |
| **依存** | `data/lives.ts` のみ（CAP-006 と共有） |
| **Outcome 紐付け** | **O-1 北極星指標（動員数）** の中核装置 / Leading: チケット導線クリック率 / Lagging: ライブ動員数 / 公演 |

---

### CAP-002: 世界観・正体の即時伝達

| 項目 | 内容 |
|---|---|
| **何ができる** | 訪問者がファーストビューで「あの色のバンド」というブランド認識と、メンバー構成・音楽性を直感的に取得できる |
| **対応既存要件** | F2.1（ヒーロービジュアル）/ F2.2（バンド一言紹介 30〜80字）/ F2.3（メンバープロフィール 4 人）/ F2.4（バンド写真ギャラリー、重要度） |
| **階層** | L1 静的（`data/members.ts` + `public/images/` + Tailwind cyan-400 / sky-400 × 黒） |
| **安定性** | evolving（v0.1 写真のみ → v0.5 楽曲メタ → v1.0 OG 画像戦略まで拡張。ネオンブルー × 黒のトーン自体は stable） |
| **前提条件** | ① メンバー 4 人の写真（被写体本人承諾済み）or 既存ライブ写真 10 枚から選定 ② アー写撮影 5/24〜25 完了 `(仮定)` ③ Tailwind 設定（cyan-400 / sky-400 系 × 黒）④ 30〜80 字のキャッチコピー（中優先度の追加質問）⑤ メンバー個別紹介文 1〜2 行（中優先度の追加質問） |
| **縮退動作** | ヒーロー画像読込失敗 → 黒背景 + バンド名テキストのみで成立するフォールバックレイアウト / メンバー写真の一部欠落 → パートを示すシルエットアイコンで代替 / アー写未完成 → 既存ライブ写真 10 枚から横長集合写真を選定（detailed §4.2 と整合） |
| **依存** | CAP-004（写真承諾済の条件）。UX 順序最上位（ヒーロー） |
| **Outcome 紐付け** | **O-7 Tier 1（「サイト見て来ました」）/ Tier 2（「あの色のバンド」）** の核 / Leading: ヒーロー直下スクロール率 / 定性: 外部呼称シグナル |

---

### CAP-003: 正規ブッキング窓口の提供

| 項目 | 内容 |
|---|---|
| **何ができる** | 業界関係者（ブッカー・メディア・対バン）が出演依頼・取材・コラボ問い合わせを正規ルートで送信できる |
| **対応既存要件** | F3.6（問い合わせフォーム、Resend + Turnstile + honeypot）/ F3.3（mailto: 連絡先表示、二重窓口）/ **F5.5（プライバシーポリシー `/privacy`）** |
| **階層** | L2 動的（Resend API + Cloudflare Turnstile API + Next.js Route Handler `app/api/contact/route.ts`） |
| **安定性** | stable（API 入出力契約・送信先メアド・Turnstile 構成は v0.1〜v1.0 で不変。AGENTS.md §2 API-First と整合） |
| **前提条件** | ① `RESEND_API_KEY`（環境変数） ② Turnstile サイトキー / `TURNSTILE_SECRET_KEY` ③ 送信先 `freoli.official@gmail.com`（**設計決定 #19**、aberyo 整備済み） ④ `app/api/contact/route.ts` の Zod 入出力型契約 ⑤ **F5.5 `/privacy` ページの配備**（個人情報取得の利用目的・保持期間・削除手順を明記、付録 B 素案を起点に） ⑥ 用件カテゴリプルダウン（出演依頼 / 取材・メディア / コラボ / その他、**D-O2 で「お問い合わせ種別」として確定**） ⑦ honeypot フィールド + Turnstile の二重防御（**設計決定 #14**） |
| **縮退動作** | Resend ダウン → `mailto:freoli.official@gmail.com` への自動降格（**F3.3 二重窓口**として恒久仕様）+ Vercel Functions ログに記録（**内部情報・API キーは絶対にクライアントに返さない**、AGENTS.md §7 Gate 1）/ Turnstile 失敗 → 再試行促進表示 / Zod 検証エラー → フィールド別エラーメッセージ |
| **依存** | 独立（API 契約は閉じている）/ CAP-005（環境変数管理・Vercel デプロイ）を基盤として利用 |
| **Outcome 紐付け** | **O-6 Lagging「問い合わせフォーム月間着信数」（月 3 件以上）** / Leading: フォーム表示 → 送信完了率 / D-O2 種別プルダウンによる業界 vs ファン内訳測定 |

---

### CAP-004: コンテンツ権利ガバナンスの運用

| 項目 | 内容 |
|---|---|
| **何ができる** | 被写体本人の Yes が取れた画像のみが公開状態にあり、削除依頼に 1 営業日以内に応答できる |
| **対応既存要件** | F5.1（削除リクエスト 1 営業日対応）/ F5.2（CONTENT_POLICY.md による権利ポリシー明文化、**v3 付録 A 素案**） |
| **階層** | L3 運用（Notion or Google Docs での Yes ログ運用 + PR レビューでの目視確認 + `data/members.ts` / `data/lives.ts` 編集前承認フロー） |
| **安定性** | stable（「被写体本人の Yes 必須 / 削除 1 営業日以内」はバージョン不変原則、AGENTS.md 設計原則 ③） |
| **前提条件** | ① **CONTENT_POLICY.md の配置**（v0.1 launch 前の必須タスク、**D-C3**。現状未配置 = `(要確認)`、v3 §付録 A の素案を起点に作成） ② 被写体本人とのコミュニケーション窓口（Slack DM 等） ③ Yes ログの保管場所（Notion or Google Docs、O-7 / D-O3 と整合） |
| **縮退動作** | 削除依頼検知漏れ → 月次レビューで Notion Yes ログと `public/images/` を必ず照合 / 検知後 → 1 営業日以内に PR マージで削除（v3 設計決定 #15）+ Vercel revert で前バージョン復旧（CAP-005 連携） |
| **依存** | 独立（運用原則）。CAP-002 / CAP-006 / CAP-007 / CAP-008 の **公開可否判定** に直接介入 |
| **Outcome 紐付け** | **O-8 運用品質**（写真権利確認率 100% / 削除依頼対応時間 1 営業日以内） |

---

### CAP-005: Reversibility-First デプロイの維持

| 項目 | 内容 |
|---|---|
| **何ができる** | 全変更が `git revert` + `git push` で本番が前バージョンに戻る前提で運用できる |
| **対応既存要件** | **F5.3（更新担当ロール、えんまさ一括管理）** / **F5.4（担当不在時のフォールバック、aberyo/ひろむ への一時的 Write 権限付与）** / 技術スタック（Next.js + Tailwind + Vercel Hobby + Resend）/ §11 変更管理 |
| **階層** | L3 運用（Git + Vercel の標準機能 + 運営者が `.env*` 経由でしか秘匿情報を扱わない運用規律） |
| **安定性** | stable（Git + Vercel の標準フロー。v1.0 で独自ドメイン取得しても Reversibility 自体は不変） |
| **前提条件** | ① Vercel と GitHub の連携（main 自動デプロイ + PR プレビュー）② `.claude/hooks/prevent-destructive-command.js` の有効化（AGENTS.md §6 Layer 1）③ `.env*` を `.gitignore` に列挙 ④ `lib/env.ts` 経由でのみ環境変数アクセス（`process.env` 直接参照禁止）⑤ **F5.3 単一 Content Owner（えんまさ）による一括管理体制**（Owner / Tech Owner / Content Owner の兼任、AGENTS.md §3）⑥ **F5.4 フォールバック手順の文書化**（aberyo or ひろむ への一時的 Write 権限付与手順を Notion に文書化、長期不在時に発動） |
| **縮退動作** | 不正コミット → 5 分以内に Vercel ダッシュボードから revert + `git revert` + `git push`（O-8 信頼性指標と整合）/ `.env*` 誤コミット → hook で自動ブロック + 万一通過したら即時 GitHub secret rotation / preview ビルド失敗時 → main マージ禁止（AGENTS.md §7 Gate 1 検証コマンド） |
| **依存** | なし（基盤層）。**全 Capability の土台** |
| **Outcome 紐付け** | **O-8 信頼性**（revert 復旧 5 分以内 / `.env*` 誤コミット 0 件 / Vercel ビルド成功率 100%） |

---

### CAP-006: ライブ実績の継続記録

| 項目 | 内容 |
|---|---|
| **何ができる** | 過去ライブ履歴と公演動員数（`actual_attendance`）を時系列で保持・参照できる |
| **対応既存要件** | F1.4（過去ライブ履歴、優先度: 重要）+ `(grill 新規)` D-O1 `actual_attendance` フィールドの追加 |
| **階層** | L1 静的（コード面: `data/lives.ts` 拡張）+ L3 運用（Content Owner が公演翌日に実測値記入） |
| **安定性** | evolving（v0.1 では `data/lives.ts` 拡張のみ。v0.5 で集計レポート機能を追加するかは `(要確認)`） |
| **前提条件** | ① **`data/lives.ts` の型定義に `actual_attendance: number \| null` を追加**（`(grill 新規)` D-O1、**D-C2**）② Content Owner が公演翌日に実測値記入する運用ルール |
| **縮退動作** | 記入忘れ → `actual_attendance: null` を許容（型定義で明示）+ 月次レビューで遡って記入 / 動員数不明（無料イベント等）→ `null` のまま運用、KGI 算出時は記録ある公演のみで集計（未記入は減点しない） |
| **依存** | CAP-001 に強依存（`data/lives.ts` の型と表示ロジックを共有） |
| **Outcome 紐付け** | **O-1 北極星指標の計測精度**（D-O1） / O-7 Tier 1「ブッカーから動員力を確認した上でオファー」の根拠資料 |

---

### CAP-007: SNS チャネル間の橋渡し

| 項目 | 内容 |
|---|---|
| **何ができる** | 流入元 SNS から来た訪問者が、運営中の他 SNS（Instagram / YouTube / TikTok / X）と楽曲サブスク（Spotify / Apple Music）へ最短遷移できる |
| **対応既存要件** | F3.1（SNS リンク集 4 種）/ F3.2（サブスクリンク、v0.1 grayed out）/ F3.4（楽曲埋め込みプレイヤー、v0.5+）/ F3.5（外部リンクの `target="_blank"` + `rel="noopener noreferrer"`） |
| **階層** | L1 静的（`data/links.ts` から SSG。リンク先 SNS への遷移は外部 URL） |
| **安定性** | evolving（v0.1 は外部リンクのみ → v0.5 で Spotify / Apple Music 公式 Embed 追加、**設計決定 #6** で確定。リンク先 SNS の追加・廃止が継続発生） |
| **前提条件** | ① `data/links.ts` に Instagram / YouTube / TikTok / X / Spotify / Apple Music の正規 URL ② **楽曲未リリース期は Spotify / Apple Music リンクを無効状態（grayed out）+ 「2025 年配信予定」ラベル**（v3 §ドメイン言語禁止表現 / detailed §4.4 と整合）③ SNS リンクバーはヒーロー直下に配置（AGENTS.md 非交渉 UX シーケンス）④ アイコンは Lucide React 等の軽量ライブラリ |
| **縮退動作** | SNS アカウント凍結 → `data/links.ts` から該当アイコンを除外（手動）/ URL 切れ → 月次手動リンクチェック / 楽曲未リリース期のタップ → 無効状態 + 「2025 年配信予定」ラベル（誤って「配信中」と誘導しない、v3 §ドメイン言語禁止表現と整合） |
| **依存** | CAP-004（SNS 投稿の権利確認は対象外、URL のみ管理）/ 非交渉 UX シーケンスでヒーロー直下に配置されることが固定 |
| **Outcome 紐付け** | **O-6 Leading「SNS リンクバー クリック率」** / **O-6 Lagging「SNS 総フォロワー数の月次増分」**（「あの色のバンド」記憶定着） |

---

### CAP-008: ファン継続接点の維持

| 項目 | 内容 |
|---|---|
| **何ができる** | ライブ告知・楽曲リリース・メディア出演を時系列で発信し、訪問者がサイト再訪する動機を継続的に作り出せる |
| **対応既存要件** | F4.1（お知らせ／ニュース欄、必須・月 1 回以上更新）/ F4.2（投稿前のえんまさレビュー、必須）/ F4.3（CMS 連携、任意・中長期） |
| **階層** | L1 静的（v0.1: `data/news.ts` 直書きで時系列降順 3〜5 件）+ L3 運用（月 1 回以上更新、F4.2 レビュー手順） |
| **安定性** | evolving（v0.5 以降の microCMS / Notion API 移行で構成が変わる、F4.3） |
| **前提条件** | ① `data/news.ts` ファイル（日付・タイトル・本文・タグの構造化データ） ② **初回投稿（7/11 ライブ告知）の文面準備**（中優先度の追加質問）③ えんまさレビュー手順（F4.2、CMS 移行後はステータス管理で代替） |
| **縮退動作** | ニュース欄が空（運用初期）→ 「初回投稿準備中」プレースホルダーは表示せず、**7/11 ライブ告知を初回投稿として用意**（detailed §4.5 と整合）/ 月 1 回更新が滞る → カレンダーリマインダー（毎月 1 日）を Content Owner に固定 |
| **依存** | CAP-004（投稿前のえんまさレビューが権利ガバナンス制約と接続）/ CAP-005 を基盤として利用 |
| **Outcome 紐付け** | **O-6 Lagging「SNS フォロワー月次増分」**（更新頻度がフォロワー関心維持に貢献）/ **O-8 運用品質**（鮮度）/ **O-7 Tier 2**（継続発信が信頼形成シグナル） |

---

## 5. Outcome × Capability カバレッジ

| Outcome | カバーする Capability | 過不足 |
|---|---|---|
| **O-1 北極星指標（動員数）** | CAP-001（主）+ CAP-006（計測基盤）+ CAP-002 / CAP-007（補助的に決断を後押し）| ✓ カバー |
| **O-3 失敗下限値（問い合わせ 0 件）** | CAP-003 | ✓ カバー |
| **O-4 計測方法** | CAP-006（`actual_attendance`）+ Vercel Analytics（C 層対象外）| ✓ カバー |
| **O-5 セグメント（種別プルダウン）** | CAP-003 + D-O2 | ✓ カバー（Feature 層で具体化） |
| **O-6 Leading/Lagging KPI** | CAP-001 / CAP-003 / CAP-007 / **CAP-008**（直接寄与）+ CAP-002（間接的にスクロール率に影響）| ✓ カバー |
| **O-7 定性シグナル** | CAP-002（Tier 1〜2 の核）/ CAP-003（Tier 1 のブッカー）/ **CAP-008**（Tier 2 継続発信） | ✓ カバー |
| **O-8 運用品質** | CAP-004 / CAP-005（直接）+ CAP-001 鮮度 / **CAP-008** 鮮度（間接）| ✓ カバー |

---

## 6. 既存 2 ドキュメントとの整合チェック（F1〜F5 全項目対応）

| 既存要件 ID | 内容 | 担当 Capability | 状態 |
|---|---|---|---|
| F1.1 | 直近ライブ情報の常時表示 | CAP-001 | ✓ |
| F1.2 | チケット予約・問い合わせ導線（恒久フォールバック） | CAP-001 | ✓ |
| F1.3 | 会場アクセス情報（Google Maps） | CAP-001 | ✓ |
| F1.4 | 過去ライブ履歴 | CAP-006 | ✓ |
| F1.5 | ライブ予定の未定状態 UI | CAP-001（縮退） | ✓ |
| F2.1 | ヒーロービジュアル | CAP-002 | ✓ |
| F2.2 | バンド一言紹介 | CAP-002 | ✓ |
| F2.3 | メンバープロフィール | CAP-002 | ✓ |
| F2.4 | バンド写真ギャラリー | CAP-002 | ✓ |
| ~~F2.5~~ | ~~ボーカル動画~~ | （撤回） | — |
| F3.1 | SNS リンク集 | CAP-007 | ✓ |
| F3.2 | サブスクリンク（v0.1 grayed out） | CAP-007 | ✓ |
| F3.3 | mailto: 連絡先表示 | CAP-003（二重窓口） | ✓ |
| F3.4 | 楽曲埋め込みプレイヤー（v0.5+） | CAP-007（拡張） | ✓ |
| F3.5 | 外部リンクのターゲット属性 | CAP-007 | ✓ |
| F3.6 | 問い合わせフォーム | CAP-003 | ✓ |
| F4.1 | お知らせ／ニュース欄 | CAP-008 | ✓ |
| F4.2 | ニュース投稿のレビュー手順 | CAP-008（+ CAP-004 連携） | ✓ |
| F4.3 | CMS 連携（中長期、任意） | CAP-008（evolving） | ✓ |
| F5.1 | コンテンツ削除リクエスト対応 | CAP-004 | ✓ |
| F5.2 | 権利ポリシー明文化（CONTENT_POLICY.md） | CAP-004 | ✓ |
| F5.3 | 更新担当ロール（えんまさ一括管理） | CAP-005 | ✓ |
| F5.4 | 担当不在時のフォールバック | CAP-005 | ✓ |
| F5.5 | プライバシーポリシー（`/privacy`） | CAP-003 | ✓ |

**結論**: 既存 2 ドキュメントの **F1〜F5 全項目が 8 Capability で漏れなくカバーされている**。

---

## 7. 横展開ポテンシャル（今フェーズでは共通化しない）

単一プロダクト運営（他プロダクト未存在）のため今フェーズでは共通化しない。将来、別バンドプロジェクトが立ち上がった場合の横展開候補:

| 横展開順位 | Capability | 理由 |
|---|---|---|
| 1 位 | **CAP-005** Reversibility-First | Vercel + Git の標準ベストプラクティス、Vercel/Next.js を使う全プロジェクト共通 |
| 2 位 | **CAP-004** 権利ガバナンス | 写真扱う全事業者共通の原則 |
| 3 位 | **CAP-003** 正規ブッキング窓口 | フォーム + Resend + Turnstile の構成は汎用 |

`30_themes` 系の横断テーマドキュメントは今フェーズで作らない。grill セッション Notes に記録、必要になったら抽出する。

---

## 8. C 層で派生した Decisions

| ID | 内容 | 影響先 |
|---|---|---|
| **D-C1** | 非交渉 UX シーケンス（Hero → SNS Bar → Lives → Members → Subs → News → Contact）は Capability 独立進化の **制約** として明文化。順序変更を伴う Feature は却下対象。 | Feature 層全般の判断基準 |
| **D-C2** | CAP-006 の v0.1 実装のため、`data/lives.ts` の型に `actual_attendance: number \| null` を追加する必要あり（D-O1 の具体化）。 | Feature 層（F1 拡張） |
| **D-C3** | CONTENT_POLICY.md は v0.1 launch 前の **必須タスク** として明文化（CAP-004 の前提条件不在を解消）。v3 付録 A の素案を起点に作成。 | v0.1 launch 前タスク |
| **D-C4** | F4 ニュース機能を CAP-008 として **追加**（初版 grill では漏れていた）。F5.3 / F5.4 を CAP-005 に、F5.5 を CAP-003 に明示追記。これで F1〜F5 全項目が Capability でカバーされる。 | 本ファイル §6 整合チェック表 |

---

## 9. 次層への接続（Feature 層への移送リスト）

Capability 層が確定したことで、以下が次の Feature 層で詰める対象になる：

| 次層 Feature 候補 | 紐付く Capability | 主な仕様課題 |
|---|---|---|
| **F-Hero**: ヒーロービジュアル UI | CAP-002 | キャッチコピー 30〜80 字確定、画像優先度・next/image 最適化、フォールバックレイアウト |
| **F-NextLive**: 次回ライブ情報セクション | CAP-001 | `data/lives.ts` スキーマ確定、F1.5 未定状態 UI 詳細、F1.2 フォールバック文言 |
| **F-Members**: メンバープロフィール | CAP-002 + CAP-004 | 個別紹介文 1〜2 行確定、写真承諾フロー、表記順（楽器順 or 年齢順） |
| **F-SNSBar**: SNS リンクバー | CAP-007 | 6 アイコン配置、ヒーロー直下固定、grayed out 状態の UI |
| **F-News**: ニュース欄 | CAP-008 | `data/news.ts` スキーマ確定、表示件数（3〜5 件）、初回投稿文面 |
| **F-ContactForm**: 問い合わせフォーム | CAP-003 | Zod スキーマ確定、4 フィールド + Turnstile + honeypot 配置、用件カテゴリ確定（D-O2） |
| **F-Privacy**: プライバシーポリシーページ | CAP-003 | `/privacy` ページ文面（付録 B 素案を起点） |
| **F-PastLives**: 過去ライブ履歴 | CAP-006 | `data/lives.ts` 拡張（`actual_attendance`）、表示件数（5〜10 件） |
| **F-Deploy**: デプロイ運用ガード | CAP-005 | hook 仕様、`.env*` 防御、ビルド検証コマンド |
| **F-ContentPolicy**: CONTENT_POLICY.md 配置 | CAP-004 | v3 付録 A 素案を起点に、削除手順詳細化 |
