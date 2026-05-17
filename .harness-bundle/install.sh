#!/usr/bin/env bash
# install.sh — ハーネスバンドル インストーラー
#
# 使い方:
#   ./install.sh                  # 対話モード（推奨）
#   ./install.sh --all            # 全 skill を install
#   ./install.sh --skills goal-grill,requirements-grill   # 指定 skill のみ
#   ./install.sh --hooks-only     # hook と settings.json のみ
#   ./install.sh --templates-only # templates をコピー
#
# 配置先（カレントディレクトリ起点）:
#   .claude/hooks/prevent-destructive-command.js
#   .claude/settings.json（既存あれば merge を促す）
#   .claude/skills/<skill-name>/
#   .github/pull_request_template.md
#   .github/CODEOWNERS
#   AGENTS.md
#   docs/harness/01_構築ガイドライン.md
#   docs/harness/HARNESS_DECISIONS.md

set -euo pipefail

BUNDLE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$(pwd)"
SKILLS_DIR="$BUNDLE_DIR/skills"
HOOKS_DIR="$BUNDLE_DIR/hooks"
TEMPLATES_DIR="$BUNDLE_DIR/templates"
DOCS_DIR="$BUNDLE_DIR/docs"

ALL_SKILLS=(
  goal-grill
  requirements-grill
  requirements-doc-creator
  pr-draft-summary
  security-sensitive-change-review
  skill-improver
  skill-creator
  skill-shipper
  integration-nextjs-app-router
  task-issue-generator
  expert-misaki-discussion
)

MODE="interactive"
SELECTED_SKILLS=()

for arg in "$@"; do
  case "$arg" in
    --all)
      MODE="all"
      SELECTED_SKILLS=("${ALL_SKILLS[@]}")
      ;;
    --hooks-only)
      MODE="hooks-only"
      ;;
    --templates-only)
      MODE="templates-only"
      ;;
    --skills=*)
      MODE="skills-only"
      IFS=',' read -r -a SELECTED_SKILLS <<< "${arg#--skills=}"
      ;;
    --skills)
      MODE="skills-only"
      shift
      IFS=',' read -r -a SELECTED_SKILLS <<< "${1:-}"
      ;;
    -h|--help)
      grep '^# ' "$0" | sed 's/^# //'
      exit 0
      ;;
  esac
done

echo "==============================================="
echo " ハーネスバンドル インストーラー"
echo "==============================================="
echo "  バンドル元: $BUNDLE_DIR"
echo "  インストール先: $TARGET_DIR"
echo "  モード: $MODE"
echo "-----------------------------------------------"

confirm() {
  read -r -p "$1 [y/N] " ans
  [[ "$ans" =~ ^[Yy]$ ]]
}

install_hooks() {
  echo "[hooks] .claude/hooks/prevent-destructive-command.js を配置"
  mkdir -p "$TARGET_DIR/.claude/hooks"
  cp "$HOOKS_DIR/prevent-destructive-command.js" "$TARGET_DIR/.claude/hooks/"
  chmod +x "$TARGET_DIR/.claude/hooks/prevent-destructive-command.js"

  if [ -f "$TARGET_DIR/.claude/settings.json" ]; then
    echo "[hooks] 既存の .claude/settings.json があります"
    echo "  → templates/settings.json.template を参考に hook を手動で merge してください"
  else
    cp "$TEMPLATES_DIR/settings.json.template" "$TARGET_DIR/.claude/settings.json"
    echo "[hooks] .claude/settings.json を新規配置（hook 有効化済み）"
  fi
}

install_skill() {
  local name="$1"
  local skill_pkg="$SKILLS_DIR/$name.skill"
  local skill_dir="$TARGET_DIR/.claude/skills/$name"

  if [ ! -f "$skill_pkg" ]; then
    echo "[skill:$name] ⚠ パッケージが見つかりません: $skill_pkg"
    return 1
  fi

  if [ -d "$skill_dir" ]; then
    if ! confirm "[skill:$name] 既存ディレクトリを上書きしますか？"; then
      echo "[skill:$name] スキップ"
      return 0
    fi
    rm -rf "$skill_dir"
  fi

  mkdir -p "$TARGET_DIR/.claude/skills"
  unzip -q "$skill_pkg" -d "$TARGET_DIR/.claude/skills/"
  echo "[skill:$name] 配置完了 → .claude/skills/$name/"
}

install_templates() {
  mkdir -p "$TARGET_DIR/.github" "$TARGET_DIR/docs/harness"

  if [ ! -f "$TARGET_DIR/AGENTS.md" ]; then
    cp "$TEMPLATES_DIR/AGENTS.md.template" "$TARGET_DIR/AGENTS.md"
    echo "[templates] AGENTS.md を配置（プレースホルダを編集してください）"
  else
    echo "[templates] 既存 AGENTS.md を保持（templates/AGENTS.md.template を参照）"
  fi

  if [ ! -f "$TARGET_DIR/.github/pull_request_template.md" ]; then
    cp "$TEMPLATES_DIR/pull_request_template.md" "$TARGET_DIR/.github/pull_request_template.md"
    echo "[templates] .github/pull_request_template.md を配置"
  else
    echo "[templates] 既存 PR テンプレートを保持"
  fi

  if [ ! -f "$TARGET_DIR/.github/CODEOWNERS" ]; then
    cp "$TEMPLATES_DIR/CODEOWNERS.template" "$TARGET_DIR/.github/CODEOWNERS"
    echo "[templates] .github/CODEOWNERS を配置（プレースホルダを編集してください）"
  else
    echo "[templates] 既存 CODEOWNERS を保持"
  fi

  if [ ! -f "$TARGET_DIR/docs/harness/HARNESS_DECISIONS.md" ]; then
    cp "$TEMPLATES_DIR/HARNESS_DECISIONS.template.md" "$TARGET_DIR/docs/harness/HARNESS_DECISIONS.md"
    echo "[templates] docs/harness/HARNESS_DECISIONS.md を配置"
  fi

  cp "$DOCS_DIR/01_構築ガイドライン.md" "$TARGET_DIR/docs/harness/01_構築ガイドライン.md"
  echo "[templates] docs/harness/01_構築ガイドライン.md を配置"
}

interactive_select_skills() {
  echo ""
  echo "インストールする skill を選んでください（番号をカンマ区切り / 'a' で全選択 / 空入力でスキップ）"
  local i=1
  for s in "${ALL_SKILLS[@]}"; do
    printf "  %2d) %s\n" "$i" "$s"
    i=$((i + 1))
  done
  read -r -p "選択: " choice
  if [ -z "$choice" ]; then
    SELECTED_SKILLS=()
    return
  fi
  if [ "$choice" = "a" ]; then
    SELECTED_SKILLS=("${ALL_SKILLS[@]}")
    return
  fi
  SELECTED_SKILLS=()
  IFS=',' read -r -a indices <<< "$choice"
  for idx in "${indices[@]}"; do
    idx=$(echo "$idx" | tr -d ' ')
    if [[ "$idx" =~ ^[0-9]+$ ]]; then
      local arr_idx=$((idx - 1))
      if [ "$arr_idx" -ge 0 ] && [ "$arr_idx" -lt "${#ALL_SKILLS[@]}" ]; then
        SELECTED_SKILLS+=("${ALL_SKILLS[$arr_idx]}")
      fi
    fi
  done
}

case "$MODE" in
  interactive)
    if confirm "1) hook と settings.json をインストールしますか？"; then
      install_hooks
    fi
    if confirm "2) templates（AGENTS.md / CODEOWNERS / PR template / HARNESS_DECISIONS）を配置しますか？"; then
      install_templates
    fi
    if confirm "3) skill をインストールしますか？"; then
      interactive_select_skills
      for s in "${SELECTED_SKILLS[@]}"; do
        install_skill "$s"
      done
    fi
    ;;
  hooks-only)
    install_hooks
    ;;
  templates-only)
    install_templates
    ;;
  all)
    install_hooks
    install_templates
    for s in "${SELECTED_SKILLS[@]}"; do
      install_skill "$s"
    done
    ;;
  skills-only)
    for s in "${SELECTED_SKILLS[@]}"; do
      install_skill "$s"
    done
    ;;
esac

echo ""
echo "==============================================="
echo " 完了"
echo "==============================================="
echo ""
echo "次のステップ:"
echo "  1. AGENTS.md のプレースホルダ <...> をプロジェクト固有値に置換"
echo "  2. .github/CODEOWNERS のメンバー名を実体に置換"
echo "  3. docs/harness/HARNESS_DECISIONS.md にリスク判定根拠を記入"
echo "  4. docs/harness/01_構築ガイドライン.md を読んで Bootstrapping を進める"
