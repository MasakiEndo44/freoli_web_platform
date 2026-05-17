#!/usr/bin/env node
// R2+ ハーネス: 破壊的 Bash コマンドの実行ブロック
// 原則: Reversibility-First / Minimum Fence, Maximum Speed / Layer-Aware Protection
// 仕様: PreToolUse hook (matcher: Bash) — stdin で payload を受信、deny 時は hookSpecificOutput を stdout へ
//
// プロジェクト固有のパターンを追加するときは DESTRUCTIVE_PATTERNS 配列を編集する。
// 追加時は docs/harness/HARNESS_DECISIONS.md にも追記すること（信頼源 = この配列）。

const DESTRUCTIVE_PATTERNS = [
  // Supabase インフラ層（Layer 1）— Supabase を使うプロジェクトのみ有効
  { pattern: /supabase\s+db\s+reset/i, reason: 'supabase db reset は本番 DB が消える可能性。人間が手動で実行してください。' },
  { pattern: /supabase\s+db\s+push/i, reason: 'supabase db push はマイグレーション無断実行。人間が手動で実行してください。' },
  { pattern: /supabase\s+migration\s+repair/i, reason: 'supabase migration repair はマイグレーション状態の強制書き換え。' },

  // SQL 破壊的操作（Layer 1）
  { pattern: /\bDROP\s+TABLE\b/i, reason: 'DROP TABLE はテーブル削除。スキーマ変更は migration ファイル経由で。' },
  { pattern: /\bTRUNCATE\b/i, reason: 'TRUNCATE は全データ削除。' },
  { pattern: /ALTER\s+TABLE.*DISABLE.*ROW\s+LEVEL\s+SECURITY/i, reason: 'RLS 無効化はセキュリティ層を破る重大変更。' },
  { pattern: /CREATE\s+POLICY[\s\S]*\bFOR\s+ALL\b/i, reason: '全権限ポリシー追加はセキュリティ層を緩める。' },

  // .env 系の読み取り・編集（Layer 1）
  { pattern: /\b(cat|less|more|head|tail|bat)\s+(\.\/)?\.env(\.local|\.production|\.development)?(\s|$)/i, reason: '.env 系の読み取りは秘密情報漏洩リスク。値は @/lib/env 等のラッパー経由で参照してください。' },
  { pattern: /\b(cat|less|more|head|tail|bat)\s+supabase\/\.env/i, reason: 'supabase/.env の読み取りは秘密情報漏洩リスク。' },

  // Git 破壊的操作
  { pattern: /git\s+push\s+(--force|-f|--force-with-lease)\b/i, reason: 'force push は他人の作業を上書きする。人間が手動で実行してください。' },
  { pattern: /git\s+reset\s+--hard\b/i, reason: 'git reset --hard は履歴・作業内容を破壊する。人間が手動で実行してください。' },

  // rm の危険形のみ（rm -rf node_modules 等は通す）
  { pattern: /rm\s+-[rRf]+\s*$/, reason: 'rm -rf [引数なし] は危険。明示的なパスを指定してください。' },
];

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
  });
}

(async () => {
  const raw = await readStdin();
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const command = payload?.tool_input?.command;
  if (typeof command !== 'string' || command.length === 0) {
    process.exit(0);
  }

  // heredoc 本体はコマンドではなくデータ。<<EOF 以降を除いてチェックする。
  // gh / curl / jq 等の外部 API コールはインフラ操作ではないのでスキップ。
  const firstToken = command.trimStart().split(/\s+/)[0];
  if (['gh', 'curl', 'jq'].includes(firstToken)) {
    process.exit(0);
  }
  const commandHead = command.split(/<<['"]?EOF['"]?/i)[0];

  for (const { pattern, reason } of DESTRUCTIVE_PATTERNS) {
    if (pattern.test(commandHead)) {
      const output = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: `[R2+ ハーネス] BLOCK: ${reason}\n\n対象コマンド: ${command}`,
        },
      };
      process.stdout.write(JSON.stringify(output));
      process.exit(0);
    }
  }

  process.exit(0);
})();
