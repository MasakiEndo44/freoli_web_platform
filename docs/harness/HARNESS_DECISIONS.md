# HARNESS_DECISIONS.md — FREOLI Web Platform ハーネス設計判断記録

リスク分類・設計判断の根拠を記録する文書。月次レビューの参照元。

| 項目 | 値 |
|---|---|
| 最終更新 | 2026-05-18 |
| リスクレベル | **R2+** |
| 関連ドキュメント | `AGENTS.md` §6, `docs/harness/01_構築ガイドライン.md` |

---

## 1. リスクレベル判定

### 判定根拠

| 要素 | 状態 | リスク評価への寄与 |
|---|---|---|
| **ユーザー DB** | なし（コンテンツは `data/*.ts` のハードコード） | R2 基準 |
| **認証** | なし（管理画面なし、コンテンツ更新は git push 経由） | R2 基準 |
| **AI / 第三者 API キー** | あり（Resend API、Cloudflare Turnstile Secret） | **R2+ に押し上げ** |
| **課金機能** | なし | R3 への昇格回避 |
| **本番ユーザー影響範囲** | 〜数百人想定（2025/5/31 v0.1 公開後、2027 初頭までに 100人動員目標） | R2+ 範囲内 |
| **PII 保管** | なし（問い合わせフォーム送信内容は Resend 経由で Gmail へ転送のみ、DB 保存なし） | R3 への昇格回避 |

**結論：** **R2+**。Resend API キーと Turnstile Secret という第三者 API キーを扱うため、`.env*` 読み取りブロックと git 破壊操作ブロックが必要。一方でユーザー DB・認証・課金がないため R3 までの強化（CI gating / 本番 DB 分離）は不要。

### 昇格トリガー

以下のいずれかが発生した時点で本ファイルを更新し、上位リスクに書き換える：

- **R2+ → R3 への昇格条件**
  - 課金機能（Stripe / 物販 EC 等）の導入
  - ユーザー DB（Supabase / Firestore 等）の導入 — 例: 問い合わせ履歴の永続化、ファン会員機能
  - 認証（Clerk / Auth0 等）の導入 — 例: 限定動画・先行販売など会員ゲート
  - 月間ユーザー数 1000 人超 もしくは SLA を伴う B2B 契約
  - PII（フルネーム・住所・電話番号）の永続保管

---

## 2. 3 層保護モデルの採用根拠

「壊れたときの影響範囲」による分類を採用：

```
Layer 1 ── インフラ層（壊れると全ユーザー影響・修復不能）
  → .env* / app/api/contact/route.ts / next.config.js / vercel.json / Git 破壊操作

Layer 2 ── コンテンツ層（壊れると信頼が失われる・修復に時間）
  → data/*.ts / CONTENT_POLICY.md / app/privacy/page.tsx / public/images/members,lives/

Layer 3 ── 開発層（壊れても Git revert で修復可能）
  → app/** / components/** / styles/** （コピー以外）
```

### 各層の保護手段の選択

| 層 | 保護手段 | 選択理由 |
|---|---|---|
| Layer 1 | hook で実コマンドレベルでブロック（`.claude/hooks/prevent-destructive-command.js`） | API キー流出・force push による履歴破壊は Git で revert できない |
| Layer 2 | AGENTS.md §6 で明示 + CODEOWNERS で Content Owner 承認必須 | hook で「ライブ会場名の誤記」は検出不可能。被写体合意の有無は人間の判断に委ねる |
| Layer 3 | AI 委任 OK（Gate 1 のみ） | v0.1 を 2025/5/31 までに公開する速度を守るため、UI ロジックには過剰なフェンスを置かない |

---

## 3. Minimum Fence, Maximum Speed の判断軌跡

「最小限のフェンスで最大限に守る」原則。以下は「ブロックしないと判断したケース」とその根拠：

| 操作 | 判断 | 根拠 |
|---|---|---|
| `rm -rf node_modules` | 通す | 依存の再インストールは通常作業（Vercel 環境でも頻発） |
| `pnpm install` / `pnpm add` | 通す | パッケージ管理の通常作業 |
| `git push`（force なし） | 通す | feature ブランチへの通常 push は安全 |
| `next dev` / `next build` | 通す | ビルドは可逆操作 |
| `cat data/*.ts` | 通す | コンテンツデータの読み取りは漏洩リスク低い（公開予定情報） |
| `gh pr create` / `curl` / `jq` | 通す | 外部 API コールはインフラ操作ではない |

### ブロック対象の最終リスト

`hooks/prevent-destructive-command.js` 内の `DESTRUCTIVE_PATTERNS` 配列が信頼源。
変更時は必ず本ファイルも同期更新すること。

カテゴリ別内訳（同梱 hook の初期状態）：

- DB 破壊系（Supabase）: 3 パターン — FREOLI では DB 未使用だが防御として残置
- SQL 破壊系（DROP TABLE / TRUNCATE / RLS）: 4 パターン — 同上
- `.env` 系読み取り: 2 パターン — **FREOLI で主たる防御対象**（Resend キー / Turnstile Secret）
- Git 破壊系（force push / reset --hard）: 2 パターン — **FREOLI で主たる防御対象**
- `rm` 危険形（引数なし `rm -rf`）: 1 パターン

### プロジェクト固有の追加候補（未追加・要検討）

将来追加するなら以下：

- `vercel env rm` — Vercel 本番環境変数の削除（コマンドベースの誤実行リスク）
- `vercel rollback` — 過去デプロイへの強制戻し（通常は Dashboard 経由が安全）

これらは現状コマンド経由で AI が触らないため未追加。誤実行事例が出たら追加。

---

## 4. Bootstrapping Governance — Admin bypass の設計的位置づけ

### 採用した設計判断

**Bootstrapping Governance の 3 原則：**

① **Transparent Bypass（透明なバイパス）**
Admin bypass は Ruleset Bypass List に明示的に設定する。GitHub の Audit Log で追跡可能にする。

② **Honest CODEOWNERS（現実に正直な所有者定義）**
招待されていないメンバー（ゆうすけ・ひろむ・aberyo）は現時点で CODEOWNERS に記載しない。
Bootstrap 期は @MasakiEndo44 のみ。

③ **Bootstrap PR ≠ Feature PR（初期ガバナンス PR の別扱い）**
初期段階は Admin 権限者（@MasakiEndo44）が Bootstrap PR を bypass マージし、以降の全 PR から正規フローを適用する。

### 進捗記録

| フェーズ | アクション | 状態 |
|---|---|---|
| Bootstrap 期 | GitHub リポジトリ作成・main ブランチ保護設定 | 未 |
| Bootstrap 期 | Ruleset Bypass List に Owner（@MasakiEndo44）を追加 | 未 |
| Bootstrap 期 | 初期 PR（ハーネス導入）を Admin bypass でマージ | 未 |
| コラボレーター招待後 | ひろむ・aberyo を Collaborators に招待 | 未 |
| コラボレーター招待後 | CODEOWNERS を全員記載に更新 | 未 |
| 初の正規フロー | 更新 PR を他メンバーにレビューしてもらう | 未 |

---

## 5. アトミック確認ループ設計

### 採用した設計 3 原則

```
① Define Before Build（作る前に「完了の定義」を宣言する）
② Human Gate, Machine Floor（機械は床、人間は門）
③ Smallest Loop First（最小のループを先に回す）
```

FREOLI v0.1 への適用：5/31 公開期限から逆算し、最小機能（F1〜F4 の必須項目）を Phase 1 で揃え、Phase 2 で機能追加。各 PR は「壊れ方 3 パターン」のどれを起こしうるか宣言してから実装に入る。

### 壊れ方 3 パターン（完了の定義の評価軸）

| パターン | 症状例 | 主な検証手段 |
|---|---|---|
| ① ロジック破綻 | 問い合わせフォームのバリデーション漏れ・Turnstile 検証スキップ | API ルートテスト |
| ② 状態不整合 | 送信したのにメールが届かない・Resend API エラーがクライアントに漏れる | プレビュー URL で実送信 + Vercel Functions ログ確認 |
| ③ UX 断絶 | ヒーローのファーストビューに次回ライブが表示されない・モバイルで CTA がフォールド外 | プレビュー URL での目視確認（モバイル・デスクトップ両方） |

---

## 6. 月次レビュー記録

別ファイル `HARNESS_HEALTH.md` を作成し、以下を記録する：

- ブロックされた誤検知 → hook パターン調整
- 通った危険操作 → 新パターン追加
- Gate 2 漏れ → Protected Areas 追記
- リスクレベル変化 → 本ファイル更新

初回レビュー予定：**2026-06-18**（v0.1 公開直後・初期 PR 群が出揃った段階）。
