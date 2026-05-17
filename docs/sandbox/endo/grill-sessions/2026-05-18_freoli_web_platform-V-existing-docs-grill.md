---
doc_id: grill.freoli_web_platform.V.existing-docs-grill
doc_type: grill_session
product: [freoli_web_platform]
layer: sandbox
status: in_progress
as_of: 2026-05-18
owners: [endo]
grill_target:
  product: freoli_web_platform
  layers: [V, O, C, F, E, S]
  current_layer: O
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
- next_action: "Capability (C) 層へ進む or stop"
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
- C: { answered: 0/8, ready_to_writeout: false, writeout_done: false, items: [] }
- F: { answered: 0/8, ready_to_writeout: false, writeout_done: false, items: [] }
- E: { answered: 0/8, ready_to_writeout: false, writeout_done: false, items: [] }
- S: { answered: 0/8, ready_to_writeout: false, writeout_done: false }

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

---

## Decisions (Resolved)

- D-O1: data/lives.ts に actual_attendance: number | null フィールドを追加（O-4 由来、Capability 層 / Feature 層へ移送）
- D-O2: F3.6 問い合わせフォームに「お問い合わせ種別」プルダウン追加（O-5 由来、Feature 層へ移送）
- D-O3: 定性シグナル発生簿は Notion / Google Docs で外部運用（O-7 由来、運用ガイドラインへ移送）

---

## Conflicts

---

## Writeouts

- V -> docs/requirements/freoli_web_platform/vision.md (written at 2026-05-18T00:00:00Z)
- O -> docs/requirements/freoli_web_platform/outcomes.md (written at 2026-05-18T00:00:00Z)

---

## Web Searches

---

## Notes

- 既存 v3 要件定義書は「機能要件＋設計決定ログ」中心。Vision / Outcome / Capability / Eval / EngSpec の単独ドキュメントは未作成 → grill で 6 層に展開する。
- AGENTS.md と要件定義書が矛盾した場合は要件定義書 v3 を信頼源とする（user memory より）。
