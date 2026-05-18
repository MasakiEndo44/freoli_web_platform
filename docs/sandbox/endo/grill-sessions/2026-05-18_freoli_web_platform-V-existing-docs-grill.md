---
doc_id: grill.freoli_web_platform.V.existing-docs-grill
doc_type: grill_session
product: [freoli_web_platform]
layer: sandbox
status: completed
as_of: 2026-05-18
owners: [endo]
grill_target:
  product: freoli_web_platform
  layers: [V, O, C, F, E, S]
  current_layer: S
  writeout_paths:
    V: docs/requirements/freoli_web_platform/vision.md
    O: docs/requirements/freoli_web_platform/outcomes.md
    C: docs/requirements/freoli_web_platform/capabilities/
    F: docs/requirements/freoli_web_platform/features/
    E: docs/requirements/freoli_web_platform/evals/
    S: docs/requirements/freoli_web_platform/engineering/
---

# Grill Session: freoli_web_platform / V→O→C→F→E→S

---

## State

- turns: 1
- progress_stalled_turns: 0
- last_saved: 2026-05-18T00:00:00Z
- next_action: "完了。コミットして PR 作成、または stop"
- s_layer_mode: "短縮版（既存ドキュメント整理 + AI 関連 S-5/S-6 は N/A）完了"
- f_layer_mode: "選択肢 C 完了（v0.1 UI 8 個別 + 重要枠 2 短縮 + 非 UI 2 短縮 = 11 ターン）"
- e_layer_mode: "短縮版（Global EARS + 優先 5 Feature 抜粋、AI 品質要件は本案件 N/A）"
- mode: NEW
- web_gate_suppressed_layers: []
- web_gate_refusal_count: {}
- context_sources:
  - docs/requirements/freoli_web_platform_system_requirements.md (v3 確定版)
  - docs/requirements/freoli_web_platform_detailed_requirements_specification.md
  - AGENTS.md（プロダクト方針・非交渉 UX シーケンス）

---

## Layer Progress

- V: { answered: 8/8, ready_to_writeout: true, writeout_done: true }
- O: { answered: 8/8, ready_to_writeout: true, writeout_done: true }
- C: { answered: 8/8, ready_to_writeout: true, writeout_done: true, items: [CAP-001, CAP-002, CAP-003, CAP-004, CAP-005, CAP-006, CAP-007, CAP-008] }
- F: { answered: 12/12, ready_to_writeout: true, writeout_done: true, items: [FEAT-001✓, FEAT-002✓, FEAT-003✓, FEAT-004✓, FEAT-005✓, FEAT-006✓, FEAT-007✓, FEAT-008✓, FEAT-009✓, FEAT-010✓, FEAT-011✓, FEAT-012✓] }
- E: { answered: 8/8 (短縮版で AI 関連 4 問は N/A), ready_to_writeout: true, writeout_done: true, items: [U-01..11, EV-01..05, ST-01..03, OP-01..04, IF-01..07, NL-01..04, CF-01..06, HE-01..04, DG-01..04, NW-01..04] }
- S: { answered: 8/8 (短縮版で S-5/S-6 は N/A), ready_to_writeout: true, writeout_done: true }

---

## Open Questions



---

## QA Log

### Q-INIT-1〜3: Bootstrap
- product=freoli_web_platform / start_layer=V / mode=NEW
- label: [A]
- at: 2026-05-18T00:00:00Z

### V-1: Pain（誰の・何の痛み）
- Q: このプロダクトは誰の・何の痛みを解きますか？
- recommended: 推奨を採用（既存 detailed_requirements_specification.md §2「対象課題」より導出）
- answer: |
    誰: SNS（X / Instagram / TikTok）で FREOLI に遭遇した音楽好き、およびライブハウスのブッカー・メディア関係者・対バン候補バンド。
    何の痛み:
    1. 音楽ファン側: 「気になるバンドが見つかったが、次のライブはいつ・どこで・どう予約するかが分からない」「楽曲も無いので何者か掴めない」── 興味から行動転換するための最後の一押し情報が点在している
    2. 業界関係者側: ブッキング・取材・コラボ依頼の正規窓口が SNS DM に分散し、機会が取りこぼされる
    3. バンド側: 楽曲未リリース期に「このバンドはどんなバンドか」を集約して伝える単一の窓口がない
- label: [I: docs/requirements/freoli_web_platform_detailed_requirements_specification.md §2]
- at: 2026-05-18T00:00:00Z

### V-2: 3年後の差分
- Q: 3年後、このプロダクトが世界にあるのとないのでは何が違いますか？
- recommended: 推奨を採用（v3 ロードマップ + AGENTS.md「決断の最終確認所」より導出）
- answer: |
    ある場合: SNS → サイト → 行動転換の装置を通じて、独自ドメイン下に「ライブ履歴 / 楽曲 / メディア掲載 / 業界連絡先」が時系列で蓄積された "信頼の資産" が形成される。リスナーは 90 秒で本物っぽさを確認でき、ブッカーは 5 分でブッキング判断ができる。
    ない場合: FREOLI の存在証明が SNS の流れる投稿に依存し続け、Lit.Link 系の汎用ページに混ざって離脱が増える。ブッキング機会が DM の海に沈み、サーキット出演交渉で「公式サイト無し」として土俵に上がれない局面が発生する。
    差分の核: FREOLI を本気で観察する人（リスナー上位層・業界）の "信頼形成と行動転換の歩留まり"。SNS だけでは作れない "落ち着いて読める一次資料" の保有有無。
- label: [I: v3 ロードマップ + AGENTS.md]
- at: 2026-05-18T00:00:00Z

### V-3: 我々がやる必然性
- Q: 競合・既存ツールではなく FREOLI 自前のプラットフォームでやる必然性は？
- recommended: 推奨を採用（detailed_requirements_specification.md §2 7Powers より導出）
- answer: |
    必然性は 3 つの「他に置けない資源」に依存する:
    1. Cornered Resource (独占資源 = ゆうすけの声): 業界人 (ゆうたさん) も「歌で何を伝えるかが核」と評価。汎用ページでは非対称性をヒーローに据えられない。
    2. Counter-Positioning: 多くのインディーバンドが Lit.Link 系に依存する中で、ネオンブルー × 黒の独自世界観と「ライブ集客に特化した行動転換型 UI」自体が差別化。
    3. Branding: サカナクション譲りの観察的・色彩的トーンを長期蓄積するには汎用テンプレートでは不可能。v0.1 → v0.5 → v1.0 で進化する "成長する一次資料"。
    運用面: メンバー写真・ライブ写真の権利ガバナンス (被写体本人の Yes 必須、削除依頼 1 営業日以内) は汎用プラットフォームでは保証できない (CONTENT_POLICY.md / AGENTS.md §6 Layer 2)。
- label: [I: detailed_requirements_specification.md §2 + AGENTS.md §6]
- at: 2026-05-18T00:00:00Z

### V-4: Non-goals (絶対に目指さない方向)
- Q: FREOLI Web Platform が絶対に目指さない方向は？
- recommended: 推奨を採用（AGENTS.md 設計 3 原則 + v3 ドメイン言語禁止表現より導出）
- answer: |
    1. 「新規発見の入口」になること: SEO 集客装置・楽曲ディスカバリーサイト化は目指さない。新規発見は SNS が担い、本サイトは「決断の最終確認所」に徹する。
    2. 動画の自己ホスティング: ボーカル歌唱動画・ライブ動画をホームページ内に埋め込まない。SNS プラットフォーム内で完結。Spotify / Apple Music の公式 Embed のみ可 (v0.5 以降)。
    3. 動的バックエンド・DB の保有: ユーザー認証・ファンクラブ会員・コメント・EC は v1.0 までスコープ外。Next.js + 静的 data/*.ts + Resend だけで完結し、Vercel revert で戻せる Reversibility-First を保つ。
    4. 被写体本人未承諾コンテンツの掲載: メンバー写真・ライブ写真は本人の Yes が出たもののみ。"とりあえず載せて後で承認" は禁止。
    5. 誤認誘導表現: 楽曲未リリース期に「配信中」等の表現を使わない。「2025年配信予定」または無効状態で表示。
    6. 独自ドメインの早期取得: v0.5 では取得せず、サーキット出演確定時 (v1.0) まで *.vercel.app で運用。
- label: [I: AGENTS.md §設計3原則 + §5 ドメイン言語 + 設計決定 #6, #8]
- at: 2026-05-18T00:00:00Z

### V-5: Primary Persona
- Q: このプロダクトで中心に置く 1 人のユーザーは誰ですか？
- recommended: 推奨を採用（detailed_requirements_specification.md §3 ペルソナより導出）
- answer: |
    Primary: 高橋 みさき、29歳、都内勤務（IT系・デザイナー）、下北沢／渋谷生活圏の独身女性。
    状況: 月3〜4回ライブハウス通い (¥3,000〜5,000/回)、Spotify Discover Weekly/Release Radar を毎週月曜朝チェック、Instagram の固定投稿 → HP の順で確認、参加は7〜8割決まってからHPで会場・チケット確認。BUMP / サカナクション / PEOPLE 1 / チョーキューメイ をリファレンスに。
    痛み: HP情報が古いとモチベ低下、チケット予約フロー不明確で離脱、SNSフォロー後の更新シグナル枯渇。
    期待: 次のライブの日付・場所・予約方法が 3 秒で分かる／世界観がビジュアルから直感伝達／"本物っぽい" 情報密度。
    Secondary (参考): 田村 健司、42歳、下北沢ライブハウス・ブッカー。プレスキット相当の情報を 5 分で確認したい業界関係者。
- label: [I: detailed_requirements_specification.md §3 ペルソナ]
- at: 2026-05-18T00:00:00Z

### V-6: 対象ドメイン
- Q: 最初に狙うドメイン・対象領域は？
- recommended: 推奨を採用（v3 システム概要 + 戦略ロードマップより導出）
- answer: |
    地理: 東京・関東圏（下北沢・渋谷・新宿エリアのライブハウス文化圏）。
    音楽ジャンル: 日本のインディーロック／オルタナティブロック。サカナクション・BUMP・PEOPLE 1・チョーキューメイ系統を聴く層が "となりにある音楽" と認識する領域。
    業界ポジション: 100人動員 → サーキット出演 → 全国規模認知 へのロードマップ上の「無名 → 中堅」境界域。
    時間軸の対象:
    - v0.1 (〜2025/5/31): 7/11 Blue Sheep ライブ集客 (30〜40人) が最初の対象イベント
    - v0.5 (楽曲リリース時): 都内ライブ通常回路で 60〜80人、Spotify/Apple Music 初回再生獲得
    - v1.0 (サーキット出演確定時): 100人動員達成、独自ドメインで全国向け情報発信
    対象外: 海外市場、メジャーレーベル契約バンド層、アイドル・ボカロ・EDM 等の隣接ジャンル。
- label: [I: v3 システム概要 + ロードマップ]
- at: 2026-05-18T00:00:00Z

### V-7: North Star Quote
- Q: 成功したとき顧客が自然に言う 1 文は？
- recommended: 候補 A / B / C を提示
- answer: |
    候補 A をベースに、ユーザーが世界観伝達の文言を追加:
    「FREOLI、Instagram で気になって HP 開いたら、次のライブの日付と会場が一瞬で分かって、もう予約まで終わってた。HP の色合いも私の好きな感じだったし、手よりも先に心が動かされた感じ。あの色のバンド、絶対観に行く。」
    含意:
    - 「次のライブの日付と会場が一瞬で分かる」: F1 ライブ集客機能（3 秒で把握）
    - 「もう予約まで終わってた」: チケット導線の摩擦最小化
    - 「色合いも私の好きな感じ」: ネオンブルー × 黒のブランド即時伝達（F2.1 ヒーロー）
    - 「手よりも先に心が動かされた」: 認知より早い情動転換（決断の最終確認所として、迷いを溶かす速度）
    - 「あの色のバンド」: Branding 資産化（"あの色" として記憶される）
- label: [U: ユーザー直言（候補A採択 + 世界観伝達文言を追加）]
- at: 2026-05-18T00:00:00Z

### V-8: One-line Thesis (草案)
- Q: このビジョンを 1 文で言うと？
- recommended: 候補 A / B / C を提示（フロントマターには C 併記の構成）
- answer: |
    候補 A 採択:
    「SNS で FREOLI に出会った人を、心が先に動くネオンブルーの世界観と、3 秒で分かるライブ情報で、観客とブッキング相手に変える "決断の最終確認所"。」
    フロントマター用の短縮版（候補 C）:
    「心が先に動く、ライブへの最終確認所。」
- label: [U: ユーザー直言（候補A採択）]
- at: 2026-05-18T00:00:00Z

### O-1: North Star Metric
- Q: 成功を 1 つの指標で表すと？
- recommended: 「全ライブの総動員数」（代替 B: サイト経由転換率は v0.5 以降で精緻化）
- answer: |
    北極星指標: 全ライブの総動員数 (KGI)
    根拠:
    1. Vision V-7 North Star Quote の終着点が「絶対観に行く」= ライブ参加。サイトの成功を最も説明する 1 指標。
    2. v3 §2 でも「主要 KPI/KGI」として動員数を KGI と明記。
    3. AGENTS.md「決断の最終確認所」── ライブ参加への転換が起こったかどうかがサイトの存在意義そのもの。
    指標の正確な定義: 全ライブの総動員数（サイトの貢献は推定で算出）
    v0.5 以降で精緻化: サイト訪問 → ライブ参加転換率（GA + 自己申告アンケート）
- label: [I: v3 §ビジネス要件 + Vision V-7 派生]
- at: 2026-05-18T00:00:00Z

### O-2: バージョン節目別ターゲット値
- Q: 北極星指標を各バージョンの節目で何人にするか？
- recommended: v3 §ビジネス要件のロードマップ準拠（(仮定) ラベル維持）
- answer: |
    v0.1 launch (2025/5/31): サイト公開のみ、測定は次の 7/11 から
    v0.1 期最初の証明 (2025/7/11 Blue Sheep): 30〜40 人 (仮定)
    v0.5 期 (2025 年内、楽曲リリース局面): 60〜80 人 / 回 (仮定) + Spotify/Apple Music 初回再生も同時測定
    v1.0 期 (2027 年初頭): 100 人 / 回 (仮定) ── サーキット出演オファーが届きやすくなる業界閾値
    根拠: 戦略リサーチ「2025 年以降のインディーズロックシーンにおける躍進戦略」(v3 §情報源)
- label: [I: v3 §2 主要 KPI/KGI + ロードマップ]
- at: 2026-05-18T00:00:00Z

### O-3: 失敗とみなす下限値
- Q: これを下回ったら方向転換が必要、という失敗下限値は？
- recommended: v3 ターゲット 50% 未達ルール + サーキット出演条件の業界閾値より導出
- answer: |
    動員数の失敗下限:
    - 2025/7/11 Blue Sheep: 動員 15 人未満（目標 50% 未達） → F1 とSNS導線の見直し
    - 2025 年内 v0.5 期: 平均動員 40 人未満 / 回が 3 公演連続 → 戦略全体の見直し（サイト単独では効果薄前提）
    - 2027 年初頭 v1.0 期: 100 人未達のまま 1 年経過 → Vision 3 年後シナリオの見直し検討
    動員数以外の失敗シグナル:
    - 問い合わせフォーム 0 件 / 3 ヶ月連続 → F3.6 バグ調査と SNS DM 流出度の確認
    - サイト訪問者数 100 unique / 月未満（ライブ告知期を除く） → SNS → サイト導線が壊れている可能性
- label: [I: v3 KPI/KGI 派生]
- at: 2026-05-18T00:00:00Z

### O-4: 計測方法
- Q: 北極星指標と KPI 群をどうやって計測するか？
- recommended: v0.1 期は計測基盤最小限・段階的精緻化
- answer: |
    北極星指標「全ライブの総動員数」:
    - データソース: 会場入場カウント（ライブハウス報告 or 自前手集計）
    - 計算式: その月の全ライブ動員数の合計
    - 計測頻度: ライブごとに即日記録、月次レポート集計
    - 担当: えんまさ（Content Owner）が公演翌日に記入
    - 提案: data/lives.ts に actual_attendance: number | null フィールド追加
    KPI 群:
    - サイト訪問者数 (unique visitors): Vercel Analytics（無料枠）、月次、ライブ告知期 ±1 ヶ月を主要監視
    - 問い合わせフォーム着信数: Resend メール受信 + Gmail ラベル「freoli/inquiry」自動付与、月次
    - SNS フォロー転換率: サイト訪問数 ÷ SNS フォロー増加数（自己申告アンケート併用）、月次、概算と明記
    - Spotify/Apple Music 初回再生数 (v0.5 以降): 各プラットフォームの artist 管理画面、月次
    計測コスト方針:
    - v0.1: Vercel Analytics + Resend ログ + 手集計のみ
    - v0.5: GA4 検討（Cookie 追加にはプライバシーポリシー更新が必要）
    - v1.0: 独自ドメイン取得後に本格導入を検討
- label: [I: 派生（v0.1 リバーシビリティ + 権利ガバナンス制約）]
- at: 2026-05-18T00:00:00Z

### O-5: セグメント別の観点
- Q: 顧客セグメント別に指標を見る必要があるか？
- recommended: v0.1 は全体値のみ。v0.5 以降に段階導入。F3.6 にお問い合わせ種別プルダウンを先取り実装。
- answer: |
    v0.1 期: セグメント分けせず全体値のみ運用（サンプル数不足のため統計的有意性が確保できない）
    v0.5 期以降に検討する切り口:
    - ファン vs 業界（問い合わせフォーム送信時の選択肢）: ブッキング窓口としての機能度合い
    - SNS チャネル別流入（リファラ取得）: どの SNS が決断後押しに効くか
    - モバイル vs デスクトップ: ペルソナ想定（Instagram = モバイル中心）と実態のギャップ
    - ライブ告知期 vs 平常期: 月次レポートで前後比較
    v0.1 への先取り実装: F3.6 問い合わせフォームに「お問い合わせ種別」プルダウン追加（ファン感想 / 出演依頼 / 取材 / その他）── 極小コストで業界 vs ファン内訳が即座に取れる
- label: [I: Vision V-5 派生]
- at: 2026-05-18T00:00:00Z

### O-6: Leading / Lagging KPI
- Q: 先行指標と遅行指標をそれぞれ何にするか？
- recommended: v3 KPI/KGI 構造 + ライブ集客装置の特性より整理
- answer: |
    Leading KPI (週次〜月次、ユーザー行動):
    - サイト訪問者数 (unique / 月): SNS → サイト導線の通過量
    - ヒーロー直下までスクロール率 (≒ 直帰の逆数): 「3 秒で分かる」の機能度
    - チケット導線クリック率 (F1.2 のリンク CTR): 行動転換寸前の意思
    - SNS リンクバー クリック率: 流入元以外の SNS への橋渡し効果
    - 問い合わせフォーム表示 → 送信完了率: フォームの摩擦の少なさ
    Lagging KPI (月次〜四半期、ビジネス成果):
    - ライブ動員数 / 公演 (KGI / 北極星指標)
    - 問い合わせフォーム月間着信数 (月 3 件以上)
    - SNS 総フォロワー数の月次増分: 「あの色のバンド」記憶定着
    - Spotify/Apple Music 月間リスナー数 (v0.5 以降): 楽曲入口の成果
    監視サイクル:
    - Leading: 月次レビュー（Content Owner が月初に Vercel Analytics 確認）
    - Lagging: 公演ごと（動員数）+ 四半期レビュー（その他）
    診断ルール:
    - Leading 下落 + Lagging 維持 → サイト以外の要因が支えている → サイト貢献低下シグナル
    - Leading 好調 + Lagging 不振 → サイトは機能、実ライブ体験 or チケット導線に問題
- label: [I: v3 派生]
- at: 2026-05-18T00:00:00Z

### O-7: 定性的成功シグナル
- Q: 数値以外で「成功している」とわかるシグナルは？
- recommended: Vision V-7 + 業界関係者ペルソナより 3 Tier に整理
- answer: |
    Tier 1 (強いシグナル、どれかで成功軌道確定):
    - ライブ会場で「サイト見て来ました」と声をかけられる: V-7 North Star 現実化
    - ブッカーから「サイトで動員力を確認した上で出演オファー」: Secondary Persona 想定挙動
    - メディアから取材依頼: 業界での「公式サイトが整っている若手バンド」ポジション獲得
    - 対バン候補バンドからコラボ・対バン依頼: 業界内ネットワーク認知
    Tier 2 (中位、複数積み重なれば成功軌道):
    - 「あの色のバンド」「ネオンブルーの」という外部呼称: Branding 資産化
    - SNS 投稿で「FREOLI のサイト見て来た」言及
    - ライブ前後で SNS フォロワー急増: ライブ → SNS 回帰の好循環
    - 問い合わせフォーム経由が SNS DM 経由を上回る: 正規窓口機能定着
    Tier 3 (弱いシグナル、参考程度):
    - メンバー個人 SNS への「サイトかっこいい」コメント
    計測・記録方法:
    - シグナル発生簿は Notion or Google Docs の運用ログとして外部記録（リポジトリにコミットしない、CONTENT_POLICY 準拠）
    - 月次レビュー時に Tier 1 発生をカウント、四半期で 0 件なら定性面で黄信号
- label: [I: Vision V-7 + Secondary Persona 派生]
- at: 2026-05-18T00:00:00Z

### O-8: コンテンツ／運用品質指標（AI 指標を読み替え）
- Q: サイトとして守るべき品質を測る指標は？
- recommended: AGENTS.md 設計 3 原則 + 権利ガバナンス + v3 非機能要件より導出
- answer: |
    運用品質指標:
    - ライブ情報の鮮度: 過去日付のライブを 24 時間以上トップに残さない
    - 写真・コンテンツの権利確認率: 掲載中の 100% が被写体本人の Yes ログ保持
    - 削除依頼への対応時間: 1 営業日以内に削除完了
    - Vercel ビルド成功率: 100% (main マージ前の preview)
    - 問い合わせフォーム送信成功率: 99% 以上
    - Turnstile bot 防御: スパム着信 0 件 / 月
    信頼性指標 (Reversibility-First):
    - Vercel revert 復旧時間: 不具合発生時に最大 5 分以内に前バージョン稼働
    - .env* 誤コミット件数: 0 件 (hook で自動ブロック)
    非機能性能指標:
    - LCP: 2.5 秒以内 (モバイル 4G、V-7「3 秒で分かる」の前提)
    - CLS: 0.1 以下
    - 可用性: 99% / 月 (Vercel Hobby SLA 準拠)
- label: [I: AGENTS.md §設計3原則 + §6 + v3 §非機能要件 派生]
- at: 2026-05-18T00:00:00Z

### C-1: できること動詞列挙
- Q: このプロダクトができるべきことを動詞で列挙
- recommended: 7 Capability に集約（CAP-001〜007）
- answer: |
    CAP-001: ライブ参加意思の即時形成 ができる ← system_requirements F1 / detailed §4.1
    CAP-002: バンドの世界観・正体の即時伝達 ができる ← system_requirements F2 / detailed §4.2
    CAP-003: 正規ブッキング窓口の提供 ができる ← system_requirements F3.3,F3.6 / detailed §4.3
    CAP-004: コンテンツ権利ガバナンスの運用 ができる ← system_requirements §運用ルール + 設計決定#15 / AGENTS.md §6 Layer 2
    CAP-005: Reversibility-First デプロイの維持 ができる ← system_requirements §非機能要件 / AGENTS.md 設計原則②
    CAP-006: ライブ実績の継続記録 ができる ← system_requirements F1.4 + (grill 新規) D-O1 actual_attendance フィールド
    CAP-007: SNS チャネル間の橋渡し ができる ← system_requirements F3.1〜F3.5 (特に F3.4) / AGENTS.md 非交渉UXシーケンス
    v0.5 / v1.0 追加候補: CAP-008 楽曲プレビューの提供 / CAP-009 ファン継続接点の維持
- label: [I: O 層 §10 接続 + v3 機能要件カテゴリ + 既存 2 ドキュメント整合]
- at: 2026-05-18T00:00:00Z

### C-2: 実現手段の階層分類（base/uplift 読み替え）
- Q: 各 capability は静的か動的か運用依存か
- recommended: L1 静的 / L2 動的（外部 API）/ L3 運用 の 3 階層に分類
- answer: |
    L1 静的（data/*.ts + SSG、追加処理ゼロ）:
    - CAP-001 ライブ参加意思の即時形成 (data/lives.ts) ← system F1 / detailed §4.1
    - CAP-002 世界観伝達 (data/members.ts + public/images/ + Tailwind) ← system F2 / detailed §4.2
    - CAP-006 ライブ実績の継続記録（コード面）← system F1.4 + (grill 新規) D-O1
    - CAP-007 SNS チャネル間の橋渡し (data/links.ts) ← system F3.1〜F3.5 / AGENTS.md 非交渉UX
    L2 動的（外部 API 必要）:
    - CAP-003 正規ブッキング窓口: Resend + Cloudflare Turnstile + Route Handler ← system F3.6 + 設計決定 #14,#20 / detailed §4.3
    L3 運用（人間依存）:
    - CAP-004 権利ガバナンス: Notion/Google Docs Yes ログ + PR レビュー ← system §運用ルール + 設計決定 #15
    - CAP-005 Reversibility-First デプロイ: Git + Vercel 標準機能 + 運用規律 ← AGENTS.md §6 Layer 1
    - CAP-006 ライブ実績の継続記録（運用面）: Content Owner が公演翌日記入
    含意:
    - L1 主体（6/7 Capability）: Vercel Hobby 無料枠で完結、Reversibility-First 成立
    - L2 は CAP-003 のみ: Resend/Turnstile 障害時の縮退を C-5 で規定（mailto: フォールバック候補）
    - L3 は 3 Capability: コードでは保証できず運営者規律に依存
- label: [I: 既存 2 ドキュメント整合確認済み]
- at: 2026-05-18T00:00:00Z

### C-3: 依存前提（データ・外部 API・人間インプット）
- Q: 各 capability が機能するために必要な前提条件は？
- recommended: Capability 別に前提と不在時の縮退を整理
- answer: |
    CAP-001: data/lives.ts に最低1件 + 過去日付の自動非表示 / 不在時 → F1.5 プレースホルダー ← system F1
    CAP-002: 承諾済写真 + アー写撮影5/24-25 (仮定) + Tailwind cyan/sky × 黒 / 不在時 → テキストフォールバック ← system 設計決定 #21, #10
    CAP-003: RESEND_API_KEY + Turnstile キー + freoli.official@gmail.com + app/api/contact/route.ts Zod 契約 / 不在時 → lib/env.ts で早期失敗 or mailto: 縮退 (F3.3) ← system F3.6, F3.3 + 設計決定 #14, #19, #20 / AGENTS.md §2
    CAP-004: CONTENT_POLICY.md 配置 (v0.1 配置予定、現状未配置 = 要確認) + 被写体本人窓口 + Yes ログ (Notion/Google Docs) / 不在時 → CAP-004 不完全 ← system §運用ルール + 設計決定 #15 / AGENTS.md §6 Layer 2
    CAP-005: Vercel-GitHub 連携 + prevent-destructive-command hook + .gitignore で .env* + lib/env.ts 経由のみ / 不在時 → .env* 誤コミットリスク ← AGENTS.md §6 Layer 1
    CAP-006: (grill 新規) data/lives.ts 型に actual_attendance: number | null 追加 + Content Owner が公演翌日記入 ← system F1.4 + D-O1
    CAP-007: data/links.ts に SNS/サブスク URL + 楽曲未リリース期は Spotify/Apple Music grayed out + SNS リンクバーをヒーロー直下 / 不在時 → 月次手動リンクチェック ← system F3.1〜F3.5, ドメイン言語禁止 / AGENTS.md §5, 非交渉 UX
    整合チェック:
    - 完全整合: CAP-001 / CAP-002 / CAP-005 / CAP-007
    - 新規追加: CAP-006 (actual_attendance フィールド = D-O1)
    - (要確認) 残: CAP-004 CONTENT_POLICY.md 未配置
- label: [I: 既存 2 ドキュメント整合 + (要確認) フラグ付き]
- at: 2026-05-18T00:00:00Z

### C-4: 安定性（Stability）
- Q: 各 capability の安定性は？
- recommended: stable / evolving / volatile に分類
- answer: |
    判定基準（本案件用）:
    - stable: v0.1〜v1.0 で中身が変わらない
    - evolving: バージョン進行で拡張・変形（撤回なし）
    - volatile: 外部要因で内容が頻繁に変動
    Capability 別:
    - CAP-001 volatile: data/lives.ts の内容はライブ毎に変動 + チケット URL は恒久的に揺れる (設計決定 #16)
    - CAP-002 evolving: v0.1 写真のみ → v0.5 楽曲メタ → v1.0 OG 画像戦略まで拡張。ネオンブルー × 黒のトーン自体は stable
    - CAP-003 stable: Zod 型契約・送信先メアド・Turnstile 構成は不変 (AGENTS.md §2 API-First)
    - CAP-004 stable: 被写体本人 Yes 必須 / 削除 1 営業日以内はバージョン不変原則 (設計原則 ③)
    - CAP-005 stable: Git + Vercel 標準フロー、独自ドメイン取得しても Reversibility 不変
    - CAP-006 evolving: v0.1 は data/lives.ts 拡張のみ、v0.5 で集計レポート (要確認)
    - CAP-007 evolving: v0.1 外部リンクのみ → v0.5 Spotify/Apple Music Embed 追加 (設計決定 #6)
    集計: stable 3 / evolving 3 / volatile 1
    含意:
    - stable 3 (003, 004, 005): S 層で API 契約・hook 仕様を厳密に固める対象
    - evolving 3 (002, 006, 007): v0.5 / v1.0 で再 grill 対象
    - volatile 1 (001): 運用負荷が継続発生、Content Owner の月次運用タスク固定化
- label: [I: 既存 2 ドキュメント ロードマップ整合]
- at: 2026-05-18T00:00:00Z

### C-5: Graceful Degradation
- Q: 各 capability が失敗したときの縮退動作は？
- recommended: system F1.2/F3.3/F3.6 のフォールバック仕様 + AGENTS.md §7 壊れ方 3 パターンと整合
- answer: |
    CAP-001 失敗パターン: 次回ライブ未定 / チケット URL 未取得 / 過去日付残存
      縮退: F1.5 プレースホルダー / F1.2「会場へお問い合わせください」恒久フォールバック (設計決定 #16) / 月次手動整理
    CAP-002 失敗パターン: 写真承諾未取得 / アー写撮影遅延
      縮退: 表示せずテキストプレースホルダーに降格 (権利優先) / 既存ライブ写真 10 枚から代替
    CAP-003 失敗パターン: Resend ダウン / Turnstile 失敗 / Zod 検証エラー / 全送信失敗
      縮退: F3.3 mailto: freoli.official@gmail.com 二重窓口へ自動降格 / 再試行促進 / フィールド別エラー / 内部情報はクライアントに返さない (AGENTS.md §7 Gate 1)
    CAP-004 失敗パターン: 削除依頼検知漏れ / Yes ログと公開画像の照合漏れ
      縮退: 月次照合 (Notion Yes ログ ↔ public/images/) / 検知後 1 営業日以内 PR マージ削除 (設計決定 #15) / Vercel revert で前バージョン (CAP-005 連携)
    CAP-005 失敗パターン: 不正コミットが main / .env* 誤コミット / ビルド失敗
      縮退: 5 分以内に Vercel revert + git revert + git push (O-8 整合) / hook で自動ブロック + secret rotation / preview ビルド失敗時 main マージ禁止
    CAP-006 失敗パターン: 記入忘れ / 動員数不明
      縮退: actual_attendance: null 許容 / 遡って記入 / null は KGI 算出から除外、未記入を減点しない
    CAP-007 失敗パターン: SNS 凍結 / URL 切れ / 楽曲未リリース期のタップ
      縮退: data/links.ts から除外 / 月次手動チェック / 無効状態 + 「2025 年配信予定」ラベル (system §ドメイン言語禁止)
    AGENTS.md §7 壊れ方 3 パターン対応:
    - ① ロジック破綻 → CAP-003 Zod / API ルートテスト
    - ② 状態不整合 → CAP-003 Resend / CAP-004 Yes ログ / CAP-006 / プレビュー実送信 + ログ + 目視照合
    - ③ UX 断絶 → CAP-001 / CAP-002 / CAP-007 / プレビュー URL モバイル・デスクトップ目視
- label: [I: 既存 2 ドキュメント整合 + AGENTS.md §7 整合]
- at: 2026-05-18T00:00:00Z

### C-6: 独立進化と依存グラフ
- Q: どの capability が独立して進化できるか、依存関係は？
- recommended: 既存 2 ドキュメントの非交渉 UX シーケンス + 設計決定から依存抽出
- answer: |
    Capability ごとの独立進化:
    - CAP-005 (Reversibility): 完全独立、全 Capability の基盤層
    - CAP-004 (権利ガバナンス): 半独立、CAP-002/006/007 の公開可否判定に介入
    - CAP-001 (ライブ集客): 独立、data/lives.ts のみ、CAP-006 に影響
    - CAP-002 (世界観伝達): 半独立、CAP-004 依存、UX 順序最上位
    - CAP-003 (ブッキング窓口): 独立、Zod 契約閉鎖、D-O2 が O 層 KPI に影響
    - CAP-006 (ライブ実績記録): CAP-001 に強依存、data/lives.ts 型共有
    - CAP-007 (SNS 橋渡し): 半独立、CAP-004 (URL のみ管理) / 非交渉 UX シーケンス制約
    依存関係の核心:
    1. CAP-005 は基盤層: v0.1 launch 前の最優先
    2. CAP-004 は横断制約: コードではなく運用原則として CAP-002/006/007 介入
    3. CAP-001 ⇄ CAP-006 が最強依存: data/lives.ts 共有、actual_attendance 追加は型変更を伴う
    4. 非交渉 UX シーケンス (F2.1 / AGENTS.md) が Capability 表示順を固定:
       Hero(CAP-002) → SNS Bar(CAP-007) → Lives(CAP-001) → Members(CAP-002) → Subs(CAP-007) → News(CAP-006 派生) → Contact(CAP-003)
       順序を入れ替える Feature は却下対象
    整合チェック:
    - 完全整合: 依存グラフは既存 2 ドキュメント記述から構造化
    - (grill 新規): CAP-001 ⇄ CAP-006 依存は D-O1 由来
- label: [I: 既存 2 ドキュメント整合 + AGENTS.md 非交渉 UX]
- at: 2026-05-18T00:00:00Z

### C-7: 複数プロダクト間での共通化
- Q: 他プロダクトでも使えそうな capability は？
- recommended: 今フェーズでは共通化しない。横展開候補のみメモ化
- answer: |
    現状: 単一プロダクト運営（他プロダクト未存在）、30_themes ディレクトリ未配置
    横展開ポテンシャル評価:
    - CAP-001 ライブ集客: 高 (バンド・ライブ系事業者共通)
    - CAP-002 世界観伝達: 低 (バンド固有)
    - CAP-003 ブッキング窓口: 高 (フォーム + Resend + Turnstile は汎用)
    - CAP-004 権利ガバナンス: 高 (写真扱う全事業共通原則)
    - CAP-005 Reversibility: 極めて高 (Vercel + Git の標準)
    - CAP-006 ライブ実績記録: 中 (公演履歴を持つ事業者)
    - CAP-007 SNS 橋渡し: 高 (マルチチャネル運営者共通)
    結論: 今フェーズ (v0.1〜v1.0) では共通化しない
    将来候補: ひろむ・aberyo がバックアップ招待され別バンドプロジェクトが立ち上がった場合、CAP-003 / CAP-004 / CAP-005 が横展開最初の候補
    整合チェック: 既存 2 ドキュメントは FREOLI 単独前提、横断テーマ概念は (grill 新規)
- label: [I: 現状確認 + 推論]
- at: 2026-05-18T00:00:00Z

### C-8: Outcome との紐付け
- Q: 各 capability は Outcomes のどれにどう貢献？
- recommended: Capability × Outcome マトリクスで紐付け
- answer: |
    CAP-001 → O-1 動員数 (主) + Leading チケット導線 CTR
    CAP-002 → O-7 Tier 1/2 (「サイト見て来ました」「あの色のバンド」) + Leading スクロール率
    CAP-003 → O-6 Lagging 問い合わせ着信 + Leading 送信完了率 + D-O2 内訳
    CAP-004 → O-8 運用品質 (権利確認 100% / 削除 1 営業日)
    CAP-005 → O-8 信頼性 (revert 5 分 / ビルド 100% / .env* 0 件)
    CAP-006 → O-1 計測精度 (D-O1 actual_attendance) + Tier 1 ブッカー根拠資料
    CAP-007 → O-6 Leading SNS リンクバー CTR + Lagging SNS フォロワー月次増分
    Outcome 側カバレッジ:
    - O-1 動員数: CAP-001 主 + CAP-006 計測基盤 + CAP-002/007 補助 ✓
    - O-3 失敗下限: CAP-003 ✓
    - O-4 計測: CAP-006 + Vercel Analytics ✓
    - O-5 セグメント: CAP-003 + D-O2 ✓
    - O-6 Leading/Lagging: CAP-001/003/007 直接 + CAP-002 間接 ✓
    - O-7 定性: CAP-002 主 / CAP-003 ブッカー ✓
    - O-8 運用品質: CAP-004/005 直接 + CAP-001 鮮度 ✓
    整合チェック:
    - 全 Outcome が少なくとも 1 Capability でカバー、過不足なし
    - 重複貢献は CAP-001 ⇄ CAP-006 と CAP-002 ⇄ CAP-007、O-6 と O-7 で役割分担明確
    - (grill 新規): CAP-006 → O-1 計測精度紐付けは grill 由来（既存ドキュメントは F1.4 のみ）
- label: [I: Outcome 層 + 既存 2 ドキュメント整合]
- at: 2026-05-18T00:00:00Z

### FEAT-001: Hero（ヒーロービジュアル）
- Persona: Primary 高橋みさき / Secondary 田村ブッカー
- Trigger: SNS から HP 着地後の最初の 3 秒
- Done When: 「あの色のバンド」認識 + スクロール意欲発生
- Capability: CAP-002（メイン）+ CAP-005
- User Story: HP を開いた瞬間にバンド写真・ロゴ・1 行キャッチが全幅で見えて、3 秒で「私の好きなやつだ」と確信してスクロールしたくなる
- 受け入れ基準: ① LCP 2.5 秒以内 ② next/image priority + WebP 全幅 ③ FREOLI ロゴ + 30〜80 字キャッチがネオンブルーで重なる
- Out of Scope: 動画埋め込み / スライダー / パララックス / 楽曲再生ボタン / 多言語
- Phase: v0.1 必須
- 既存要件対応: F2.1 + F2.2 + 設計決定 #10, #21
- 整合: ✓ 完全整合
- 依存課題: キャッチコピー文面確定（v3 中優先度 #1）
- label: [I: 既存 v3 §F2 + 設計決定 + Vision V-7 派生]
- at: 2026-05-18T00:00:00Z

### FEAT-002: NextLive（次回ライブ情報セクション）
- Persona: Primary 高橋みさき / Secondary 田村ブッカー
- Trigger: ヒーロー直下到達 or SNS で 7/11 ライブを見て確認しに来た瞬間
- Done When: 日付・会場・予約方法を 3 秒で把握、Google Maps or 会場問い合わせをタップ
- Capability: CAP-001
- User Story: ヒーロー直下で次のライブ日付・会場・チケット導線・Google Maps を一目で把握、行く意欲を 100% に変え予約手段へ進める
- 受け入れ基準: ① ヒーロー直下配置（D-C1） ② 日付・会場・時刻・価格・Google Maps を 1 セクション内 ③ チケット URL 未取得時の恒久フォールバック「ご予約・お問い合わせは会場まで」+ 電話/公式サイト ④ 過去日付の自動移行
- Out of Scope: 自動予約システム / 地図埋め込み / ライブ詳細ページ / カレンダー連携
- Phase: v0.1 必須、Week 2 中盤、初回データは 7/11 Blue Sheep
- 既存要件対応: F1.1, F1.2, F1.3, F1.5 + 設計決定 #16
- 整合: ✓ 完全整合、Google Maps は detailed §6 インテグレーション（外部リンクのみ）と整合
- 依存課題: Blue Sheep の電話番号 or 公式サイト URL 確定（v3 中優先度 #6）
- label: [I: 既存 v3 §F1 + 設計決定 #16 + AGENTS.md 非交渉 UX]
- at: 2026-05-18T00:00:00Z

### FEAT-003: Members（メンバープロフィール）
- Persona: Primary 高橋みさき / Secondary 田村ブッカー
- Trigger: ヒーロー → ライブ情報を見終わってメンバーセクションへスクロールした瞬間
- Done When: 4 人の名前・パート・顔・個性を把握、親近感発生（業界はメンバー構成即時判明）
- Capability: CAP-002（メイン）+ CAP-004（写真承諾の制約）
- User Story: 4 人のメンバー名（ゆうすけ/あのむ/ひろむ/Aberyo）・パート・顔写真・1〜2 行紹介を一覧、「この 4 人の音、想像できる」
- 受け入れ基準: ① 横並び（デスクトップ）/ 縦並び（モバイル） ② 楽器順 Vo/Gt → Gt → Ba → Dr ③ 被写体 Yes 取得済写真のみ、未承諾はシルエットアイコン代替
- Out of Scope: 個別詳細ページ / メンバー個人 SNS / 個人 YouTube / インタビュー記事
- Phase: v0.1 必須、Week 2 中盤実装、写真承諾 5/29-31
- 既存要件対応: F2.3 + 設計決定 #17 (4 人組) + #18 (えんまさ = あのむ) + 付録 D
- 整合: ✓ 完全整合、付録 D 表記と楽器順を採用
- 依存課題: 個別紹介文 1〜2 行 ×4（v3 中優先度 #2）/ 写真合意取得
- label: [I: 既存 v3 §F2.3 + 付録 D + 設計決定 #17, #18]
- at: 2026-05-18T00:00:00Z

### FEAT-005: SNSBar（SNS リンクバー）
- Persona: Primary 高橋みさき（流入元と異なる SNS への橋渡し希望者）/ Secondary 田村ブッカー
- Trigger: ヒーロー直下到達 or 流入元 SNS と別 SNS で追いたくなった瞬間
- Done When: 4 種 SNS の存在認識 → 好みのチャネルへタップ → 流入元以外でフォロー追加
- Capability: CAP-007
- User Story: ヒーロー直下に IG / YouTube / TikTok / X の 4 種アイコンが並び、流入元以外でもフォロー追加できる
- 受け入れ基準: ① ヒーロー直下配置（D-C1 順序固定） ② アイコン + ラベル、Lucide React 等の軽量ライブラリ ③ target="_blank" + rel="noopener noreferrer"
- Out of Scope: SNS 投稿埋め込み（設計決定 #6）/ フォロワー数表示 / 共有ボタン
- Phase: v0.1 必須、Week 2 前半実装
- 既存要件対応: F3.1 + F3.5 + AGENTS.md 非交渉 UX シーケンス
- 整合: ✓ 完全整合
- 依存課題: 各 SNS 正規 URL を data/links.ts に確定（既存運用中、取得済前提）
- label: [I: 既存 v3 §F3 + AGENTS.md 非交渉 UX]
- at: 2026-05-18T00:00:00Z

### FEAT-006: Subscriptions（サブスクリンク + v0.5 Embed）
- Persona: Primary 高橋みさき（Discover Weekly / Release Radar ユーザー）/ Secondary 田村ブッカー
- Trigger: v0.1 メンバー紹介後「音聴きたい」/ v0.5+ リリース告知後の試聴
- Done When: v0.1 「2025 年配信予定」認識 → SNS フォローで期待化 / v0.5 Embed で試聴 → プレイリスト追加
- Capability: CAP-007（v0.5+ で楽曲入口に拡張）
- User Story v0.1: アイコンが grayed out + 「2025 年配信予定」、期待感で SNS フォロー
- User Story v0.5: Spotify Embed で即試聴、お気に入り追加可
- 受け入れ基準: ① v0.1 grayed out + 「2025 年配信予定」(誤認防止) ② v0.5+ で実 URL + Embed 常時設置 (F3.4) ③ 公式 Embed のみ (設計決定 #6)
- Out of Scope: v0.1 実 URL 有効化 / v0.1 Embed / YouTube 楽曲動画埋め込み (恒久禁止) / Bandcamp 等
- Phase: v0.1 grayed out 必須 → v0.5 Embed 化
- 既存要件対応: F3.2 + F3.4 + 設計決定 #6 + ドメイン言語禁止
- 整合: ✓ 完全整合、evolving Feature 明示
- 依存課題: v0.5 期に Artist URL 取得
- label: [I: 既存 v3 §F3.2/F3.4 + 設計決定 #6 + AGENTS.md §5]
- at: 2026-05-18T00:00:00Z

### FEAT-007: News（お知らせ／ニュース欄）
- Persona: Primary 高橋みさき（活動中シグナル確認、再訪動機）/ Secondary 田村ブッカー（最近の活動・メディア露出把握）
- Trigger: サブスク後「最近どうしてる？」/ SNS 投稿で「メディア出演」見て詳細確認
- Done When: 最新 3〜5 件を時系列把握、「活動中・定期更新」認識、再訪意欲形成
- Capability: CAP-008（メイン）+ CAP-004（投稿前レビュー）
- User Story: ニュース欄で最新 3〜5 件（ライブ・楽曲・メディア）時系列降順、「活動中・更新されている」確認、フォロー継続 or 再訪動機
- 受け入れ基準: ① 時系列降順 3〜5 件（日付・タイトル・本文・タグ） ② v0.1 は data/news.ts 直書き + PR レビューえんまさ必須 (F4.2) ③ 月 1 回以上更新（毎月 1 日カレンダーリマインダー）
- Out of Scope: コメント/いいね（DB 禁止）/ RSS（v0.5+）/ 個別詳細ページ / CMS（v0.5+ F4.3）/ 通知メール（v1.0 メーリングリスト）
- Phase: v0.1 必須、初回投稿 = 7/11 Blue Sheep ライブ告知
- 既存要件対応: F4.1 + F4.2 + F4.3 + 設計決定 #15
- 整合: ✓ 完全整合、CAP-008 として v0.1 必須に格上げ（D-C4 由来）、detailed §4.5 整合
- 依存課題: 初回投稿文面（v3 中優先度 #3）/ 月次更新リマインダー
- label: [I: 既存 v3 §F4 + 設計決定 #15 + D-C4]
- at: 2026-05-18T00:00:00Z

### FEAT-008: ContactForm（問い合わせフォーム）
- Persona: Primary 田村ブッカー / メディア / 対バン / Secondary 高橋みさき（D-O2 種別プルダウンで分離）
- Trigger: サイトを見終わって「話したい」/ 業界 5 分以内判断後の最後のアクション
- Done When: 4 項目 + Turnstile 完了 → 送信完了画面、Gmail 受信 → 24h 以内 1 次返信
- Capability: CAP-003（メイン）+ CAP-005（環境変数）
- User Story: 田村ブッカーが「出演依頼」カテゴリで本文送信、SNS DM 経由しない正規ルート、迅速返信期待
- 受け入れ基準: ① 4 フィールド + 5 種カテゴリ（出演/取材/コラボ/ファン感想/その他、D-O2 D-C4 拡張） ② 送信成功で完了画面 + Resend で freoli.official@gmail.com 送達 ③ 失敗時 mailto: フォールバック（F3.3）、内部情報はクライアントに返さない（AGENTS.md §7 Gate 1）、30 秒以内完了
- Out of Scope: 差出人ドメイン (v0.5+) / ファイル添付 / ボイス / 多言語 / 履歴管理 UI
- Phase: v0.1 必須、Week 2 中盤集中実装、Week 1 で API キー取得
- 既存要件対応: F3.6 + F3.3 + 設計決定 #14, #19, #20
- 整合: ✓ 完全整合、D-O2 ファン感想追加で 5 種に拡張済み、AGENTS.md §2 API-First Zod 契約整合
- 依存課題: Vercel 環境変数設定 / Privacy ページ連携 (FEAT-009) / honeypot 名 (website 推奨)
- label: [I: 既存 v3 §F3.6/F3.3 + 設計決定 #14/#19/#20 + D-O2/D-C4]
- at: 2026-05-18T00:00:00Z

### FEAT-009: Privacy（プライバシーポリシーページ）
- Persona: Primary 田村ブッカー / メディア（個人情報送信前のコンプラ確認）/ Secondary 高橋みさき（安心感）
- Trigger: フォーム下部「プライバシーポリシーに同意する」or フッターからアクセス
- Done When: 取得情報・利用目的・保持期間・第三者提供・削除手段を理解、安心してフォーム送信へ戻る
- Capability: CAP-003（F5.5 として前提条件）
- User Story: /privacy で取得情報（氏名・メアド・本文）・利用目的（返信のみ）・1 年保持・第三者提供なしを明示確認、リスク極小判断で安心打診
- 受け入れ基準: ① /privacy 独立ページ、フッター + フォーム下部リンク ② v3 付録 B 素案起点、6 項目必須 ③ 個人情報保護法・GDPR 準拠平易な日本語
- Out of Scope: 英語版（v1.0）/ Cookie バナー（Cookieless）/ 版管理 UI / ユーザー保有データ確認画面（そもそも保有なし）
- Phase: v0.1 必須、Week 1 素案 → Week 2 中盤ページ実装
- 既存要件対応: F5.5 + 付録 B
- 整合: ✓ 完全整合、D-C4 で CAP-003 前提に明示追記済み
- 依存課題: 付録 B 素案の法的確認、バンド継続不能時の取扱記述
- label: [I: 既存 v3 §F5.5 + 付録 B + D-C4]
- at: 2026-05-18T00:00:00Z

### FEAT-004: PhotoGallery（バンド写真ギャラリー）[短縮]
- Persona: Primary 高橋みさき / Trigger: メンバー紹介後「ライブの様子も見たい」/ Done When: 3〜5 枚を視認、世界観補強
- Capability: CAP-002 + CAP-004（撮影者クレジット + 全員 Yes）
- User Story: アー写・ライブ写真 3〜5 枚をギャラリー表示で世界観補強、ライブ参加意欲向上
- 受け入れ基準: ① 3〜5 枚グリッド + next/image ② 被写体 Yes + 撮影者クレジット（付録 A） ③ 撮影禁止会場の写真は掲載不可
- Out of Scope: ライトボックス / ダウンロード / コメント
- Phase: v0.1 重要枠（時間許可時）/ 確実に Phase 2
- 既存要件対応: F2.4 + 付録 A
- 整合: ✓ 完全整合
- label: [I: 既存 v3 §F2.4 + 付録 A]
- at: 2026-05-18T00:00:00Z

### FEAT-010: PastLives（過去ライブ履歴）[短縮]
- Persona: Primary 高橋みさき + Secondary 田村ブッカー（動員力・ライブ経験判断、5 分判断の核）
- Trigger: ライブ情報後スクロール or 業界の「これまでどれくらいライブやってる？」
- Done When: 過去 5〜10 公演の日付・会場・対バン・自主/ブッキング区別を把握、活動実績判断
- Capability: CAP-006
- User Story: 過去 5〜10 公演を日付降順、動員力・対バン関係・自主企画経験を 5 分判断、ブッキング根拠化
- 受け入れ基準: ① 過去 5〜10 件日付降順、日付・会場・対バン・自主/ブッキング区別 ② actual_attendance あればオプショナル表示（D-O1） ③ data/lives.ts 共通スキーマ管理（CAP-001 ⇄ CAP-006 依存）
- Out of Scope: ライブ写真インライン（FEAT-004 へ）/ 個別詳細ページ / セットリスト
- Phase: v0.1 重要枠 / 確実に Phase 2
- 既存要件対応: F1.4 + (grill 新規) D-O1
- 整合: ✓ 完全整合 + D-O1 反映済み
- label: [I: 既存 v3 §F1.4 + D-O1]
- at: 2026-05-18T00:00:00Z

### FEAT-011: DeployGuard（デプロイ運用ガード）[短縮、非 UI]
- Persona: Tech Owner えんまさ + フォールバック担当 aberyo/ひろむ
- Trigger: コミット / PR レビュー / .env* 編集 / Vercel デプロイ失敗
- Done When: 全変更 revert 可能、.env* 誤コミット 0 件、preview ビルド 100%、不具合時 5 分以内 revert
- Capability: CAP-005
- User Story: destructive コマンド hook ブロック + lib/env.ts 経由のみで、誤操作・キー漏洩リスク撲滅、頻繁デプロイ可
- 受け入れ基準: ① prevent-destructive-command.js hook 有効化 ② .gitignore 列挙 + process.env 直接参照禁止 + lib/env.ts 経由 ③ Gate 1 (pnpm typecheck/lint/build) 全 PR 通過、preview 失敗時 main マージ禁止
- Out of Scope: 自動ロールバック CI / ステージング環境 (Vercel preview 代替) / Secret スキャン CI (v1.0+)
- Phase: v0.1 launch 前必須、Week 1 で hook + .gitignore + lib/env.ts
- 既存要件対応: F5.3 + F5.4 + 技術スタック §環境変数管理 + AGENTS.md §6 Layer 1, §7
- 整合: ✓ 完全整合、D-C4 で CAP-005 に F5.3/F5.4 明示追記済み
- label: [I: 既存 v3 §F5.3/F5.4 + AGENTS.md §6/§7 + D-C4]
- at: 2026-05-18T00:00:00Z

### FEAT-012: ContentPolicy（CONTENT_POLICY.md 配置）[短縮、非 UI]
- Persona: Content Owner えんまさ + メンバー 4 人（承諾フロー当事者）+ 削除依頼者
- Trigger: コンテンツ公開前承認 / 削除依頼受領 / 新規写真追加
- Done When: CONTENT_POLICY.md がリポジトリ直下、5 項目の権利ルール明文化
- Capability: CAP-004
- User Story: CONTENT_POLICY.md があり、削除依頼時の手順明文化、権利トラブル予防 + 1 営業日対応可
- 受け入れ基準: ① リポジトリ直下配置（v3 付録 A 素案起点） ② 5 項目（メンバー写真/ライブ写真/アー写/動画/楽曲埋め込み/ニュース投稿） ③ 削除依頼連絡先 + 1 営業日 SLA 明記
- Out of Scope: 利用規約 ToS（v1.0）/ 法的拘束力のある契約文書（弁護士監修 v1.0+）
- Phase: v0.1 launch 前必須（D-C3 確定、現状未配置 → Week 1）
- 既存要件対応: F5.1 + F5.2 + 付録 A + 設計決定 #15
- 整合: ✓ 完全整合 + D-C3 で v0.1 launch 前必須タスクに格上げ
- label: [I: 既存 v3 §F5.1/F5.2 + 付録 A + D-C3]
- at: 2026-05-18T00:00:00Z

---

## Decisions (Resolved)

- D-O1: data/lives.ts に actual_attendance: number | null フィールドを追加（O-4 由来、Capability 層 / Feature 層へ移送）
- D-O2: F3.6 問い合わせフォームに「お問い合わせ種別」プルダウン追加（O-5 由来、Feature 層へ移送）
- D-O3: 定性シグナル発生簿は Notion / Google Docs で外部運用（O-7 由来、運用ガイドラインへ移送）
- D-C1: 非交渉 UX シーケンス（Hero → SNS Bar → Lives → Members → Subs → News → Contact）は Capability 独立進化の制約として明文化（C-6 由来、Feature 層判断基準）
- D-C2: data/lives.ts 型に actual_attendance: number | null を追加（C-3, CAP-006 由来、Feature 層 F-PastLives で具体化）
- D-C3: CONTENT_POLICY.md は v0.1 launch 前の必須タスクとして明文化（C-3, CAP-004 由来、v3 §付録 A 素案を起点）
- D-C4: F4 ニュース機能を CAP-008 として追加（既存 2 ドキュメント整合チェック由来）+ F5.3/F5.4 を CAP-005 に明示、F5.5 を CAP-003 に明示。これで F1〜F5 全項目が Capability でカバー
- D-F1: 用件カテゴリプルダウンを 5 種に拡張（出演依頼 / 取材・メディア / コラボ / ファン感想 / その他）。D-O2 + D-C4 の統合（FEAT-008 で確定）
- D-F2: data/lives.ts に NextLive と PastLives の共通スキーマを採用し actual_attendance: number | null を共有（CAP-001 ⇄ CAP-006 依存、FEAT-002 / FEAT-010 で確定）

---

## Conflicts

- C1: C-1 で 7 Capability に集約したが、書き出し前の整合性チェックで F4 ニュース機能の漏れ・F5.3/F5.4/F5.5 の明示不足を検出。CAP-008 追加 + CAP-003/CAP-005 への明示追記で解決（D-C4 / 2026-05-18 解決済み）。

---

## Writeouts

- V -> docs/requirements/freoli_web_platform/vision.md (written at 2026-05-18T00:00:00Z)
- O -> docs/requirements/freoli_web_platform/outcomes.md (written at 2026-05-18T00:00:00Z)
- C -> docs/requirements/freoli_web_platform/capabilities.md (written at 2026-05-18T00:00:00Z, 8 capabilities CAP-001〜CAP-008)
- F -> docs/requirements/freoli_web_platform/features/ (written at 2026-05-18T00:00:00Z, 12 features FEAT-001〜FEAT-012 + index.md, B 形式ディレクトリ)
- E -> docs/requirements/freoli_web_platform/evals.md (written at 2026-05-18T00:00:00Z, 短縮版: Global EARS 30 + 優先 5 Feature 抜粋 18 = 計 48 件、AI 品質要件は N/A 明示)
- S -> docs/requirements/freoli_web_platform/engineering.md (written at 2026-05-18T00:00:00Z, 短縮版: Tech Stack + データモデル + API 契約 + UI 構成 + 外部統合 + ADR 6 件 + AI エージェント向け禁止事項。S-5/S-6 は N/A)

---

## Web Searches

---

## Notes

- 既存 v3 要件定義書は「機能要件＋設計決定ログ」中心。Vision / Outcome / Capability / Eval / EngSpec の単独ドキュメントは未作成 → grill で 6 層に展開する。
- AGENTS.md と要件定義書が矛盾した場合は要件定義書 v3 を信頼源とする（user memory より）。
