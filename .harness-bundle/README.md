# band-platform-harness — Claude Code ハーネス + Skill バンドル

新規リポジトリに対して、AI エージェント（Claude Code 等）が事故なく作業できる「ガードレール」を一括導入するためのバンドル。

> COCOSiL V2 のハーネス設計（R2+ 相当）と Skill 群から COCOSiL 固有要素を除いて汎用化したもの。

---

## 同梱物

| ファイル / ディレクトリ | 説明 |
|---|---|
| `install.sh` | 対話インストーラー |
| `docs/01_構築ガイドライン.md` | **最初に読むべき**「リスク判定 → ハーネス構築 → 初期 PR ガバナンス」の一本道ガイド |
| `hooks/prevent-destructive-command.js` | Bash 破壊コマンドのブロック hook（PreToolUse） |
| `templates/AGENTS.md.template` | プロジェクト向け AGENTS.md の雛形 |
| `templates/CODEOWNERS.template` | CODEOWNERS の雛形 |
| `templates/pull_request_template.md` | PR テンプレート（Gate 1 / Gate 2 チェックリスト付き） |
| `templates/HARNESS_DECISIONS.template.md` | リスク判定根拠の記録雛形 |
| `templates/settings.json.template` | `.claude/settings.json` の雛形（hook 有効化済み） |
| `skills/*.skill` | Skill パッケージ（zip）×11 |

---

## クイックスタート

```bash
# 1. このバンドルを新リポジトリ直下にコピー
cp -r dist/band-platform-harness /path/to/new-repo/.harness-bundle

# 2. 新リポジトリで対話インストール
cd /path/to/new-repo
bash .harness-bundle/install.sh

# 3. プレースホルダを置換
#    - AGENTS.md          <PROJECT_NAME>, <CONTENT_OWNER>, <TECH_OWNER>, etc.
#    - .github/CODEOWNERS @<PROJECT_OWNER>, @<CONTENT_OWNER>, etc.
#    - docs/harness/HARNESS_DECISIONS.md  リスク判定の根拠

# 4. ガイドラインを読む
open docs/harness/01_構築ガイドライン.md
```

---

## install.sh の使い方

```bash
# 対話モード（推奨）
./install.sh

# 全部一括
./install.sh --all

# hook と settings.json のみ
./install.sh --hooks-only

# templates のみ（AGENTS.md, CODEOWNERS, PR template, etc.）
./install.sh --templates-only

# 特定 skill のみ
./install.sh --skills goal-grill,requirements-grill,pr-draft-summary
```

### 個別 skill を手動インストールする場合

```bash
mkdir -p .claude/skills
unzip skills/goal-grill.skill -d .claude/skills/
```

---

## 同梱 Skill 一覧

| Skill | 用途 | トリガー例 |
|---|---|---|
| `goal-grill` | 実装前のゴール確認（単一機能） | 「ゴールが曖昧」「受け入れ基準がない」 |
| `requirements-grill` | 全体要件を Vision→EngSpec まで 6 層で深掘り | 「要件をグリる」 |
| `requirements-doc-creator` | システム要件定義書・PRD（Stage 1 → 2 段階） | 「要件定義書を作成」 |
| `pr-draft-summary` | PR 要約の生成 | PR 作成時 |
| `security-sensitive-change-review` | 認証・DB migration・API route の変更レビュー | 認証・migration 変更時 |
| `skill-improver` | 既存 skill の対話的改善 | 「このスキルを改善したい」 |
| `skill-creator` | 新規 skill の作成・eval | 「新しい skill を作る」 |
| `skill-shipper` | skill を中央 hub へ publish / install / update | 「skill を publish」 |
| `task-issue-generator` | TASK-INDEX タスク → Issue + TSK ファイル一括生成 | 「Issue 生成」 |
| `expert-misaki-discussion` | 専門家 2 + ギャル(みさき)による 5 ターン議論 | 「議論して」「ブレストして」 |
| `integration-nextjs-app-router` | Next.js App Router プロジェクト初期化（PostHog 連携） | Next.js セットアップ時 |

### 抽象化された skill（プロジェクト固有値の置換が必要）

| Skill | 必要な設定 |
|---|---|
| `task-issue-generator` | `requirements_doc_path` / `task_index_path` / `gh_repo` / `typecheck_cmd` / `<owner>` 系（SKILL.md §0 参照） |
| `expert-misaki-discussion` | 議論ログ保存先パス（プロジェクトの慣習に合わせる） |
| `skill-shipper` | 中央 hub repo 名（デフォルト `cocosil-standard-skills`、`.claude/skill-shipper-config.yaml` で差し替え） |

---

## 構築の進め方

1. **`docs/01_構築ガイドライン.md` を読む** — リスク判定から PR ガバナンスまでの一本道
2. **Step 0: リスク判定** — `HARNESS_DECISIONS.md` を埋める
3. **Step 1: 3 層保護モデル** — Layer 1/2/3 のパス対応表を `AGENTS.md` に記入
4. **Step 2: hook 配置** — `install.sh --hooks-only`
5. **Step 3: Gate 1/2 設計** — `pull_request_template.md` を採用
6. **Step 4: 初期 PR ガバナンス** — Ruleset Bypass List に Owner を追加（Bootstrapping）
7. **Step 5: アトミック確認ループ** — PR ごとに「壊れ方 3 パターン」のどれを起こしうるか宣言する習慣を作る
8. **Step 6: ブランチ規則** — チーム周知

---

## このバンドルに含まれていないもの

| 項目 | 理由 / 代替 |
|---|---|
| `cocosil-domain` skill | COCOSiL プロダクト哲学に特化 |
| `language-design` skill | 「占い」禁止語等が COCOSiL 専用 |
| `spec-sync` skill | COCOSiL 設計中枢が前提 |
| `/start-task` / `/finish-task` コマンド | プロジェクト固有のフロー前提（必要なら原典の `.claude/commands/` を別途参照して再構築） |
| CI ワークフロー（`.github/workflows/`） | プロジェクトの typecheck/build コマンドが必要 — typecheck/lint/build の 3 ジョブを最小構成で別途追加すること |

---

## バージョン

- バンドル元: COCOSiL V2 ハーネス（2026-05-04 時点）
- 作成日: 2026-05-18

## ライセンス

各 skill のライセンスは zip 内の `LICENSE.txt` または `NOTICE.md` を確認してください（同梱されているもののみ）。
バンドル全体の取扱いは原典リポジトリの規約に従ってください。
