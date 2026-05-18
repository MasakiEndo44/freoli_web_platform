# 議論ログ：PR#4 後の v0.1 ローカル UI 実装計画

**日付**: 2026-05-18
**スキル**: expert-misaki-discussion (Classic Mode)
**目的**: PR#4 でマージ済みの UI スタイルトークンを土台に、ローカル `pnpm dev` で動く Next.js 14 ベース v0.1 サイトの実装方針を確定する

## 登場人物

- 🧑‍💻 **上田（Next.js 14 / App Router 専門家）**：React Server Components 歴 5 年、Next.js 14 採用プロジェクト 12 件支援。RSC / Client 境界・next/image・next/font の運用設計が専門
- 🧑‍🎨 **神谷（デザインシステム & a11y 専門家、歴 12 年）**：Tailwind 採用の DS 構築 8 件・WAIC 監修者。トークン正規化と WCAG 適合検査が専門
- 💅 **みさき（ギャル）**：FREOLI を Instagram で知り、ライブ参加 2 回・楽曲未配信を残念に思っている実ユーザー。スマホしか使わない（375px 想定）

---

## Turn 1｜現状診断：PR#4 が残した「中途半端な完成度」の根本問題

**上田**：PR#4 の成果を整理しますね。Tailwind config / app/layout.tsx / app/globals.css / lib/env.ts / data 型定義は揃った。これは**設計レール層**としては完成度が高い。一方で `components/.gitkeep` だけ・`app/page.tsx` は Next.js デフォルトのまま・`data/*.ts` は空配列。つまり**走るレールはあるが車両は 0 両**という状態です。
ここで一番危険なのは、`design_spec.md` §4 の「5 プリミティブ」と非交渉シーケンス 7 セクションの実装を**同時並行で始めること**。プリミティブが固まる前にセクション側で `<button className="...">` をベタ書きすると、後から `<Button>` に差し替える二重作業が発生します。**結局これは「依存順序を無視すると工数が 1.5 倍になる」問題**です。

**神谷**：上田さんの診断に補強します。design_spec.md §7.1 に「採用案からの修正必須事項」が 5 項目挙げられている — SNS バーの 44px タップエリア未達、Desktop SNS ラベル `zinc-600` がコントラスト 2.4:1 で WCAG NG、Hero CTA / NextLive 予約ボタンの高さ不足。これは**採用案 `freoli-final.jsx` をそのまま React 化すると a11y NG を持ち込む**という構造的リスクです。
私の経験では、参考実装をピクセル写経すると検出済み欠陥がそのまま実装に流れ込む事故が必ず起きる。**結局これは「参考実装は仕様ではなく、修正済仕様こそが真の参照点である」問題**です。design_spec.md §4 と §7.1 を真の正本に据えれば回避できます。

**みさき**：え待って、要するに `freoli-final.jsx` を見ながらコピペするとダメで、`design_spec.md` を見ながら書け、ってこと？ なんかその二つ何が違うのかよく分からない〜。あとあの、私 Instagram で FREOLI 知ったんですけど、サイト開いたらまずバンド写真と次のライブ情報がドンって来ないとマジ意味ないので、そこから作ってほしいです。

**上田**：みさきさんの整理、正確です。`freoli-final.jsx` は**ピクセル配置の参考**、`design_spec.md` §7.1 の修正適用後が**実装の真の仕様**。これは「Code is Truth, Spec is Law」を反対にしてはいけない、という典型ケースです。
そして「ヒーローから作る」というみさきさんの要請は実装順序にも合致する。AGENTS.md の非交渉シーケンスでもヒーロー → SNS バーが最上位で、これは UX 順序＝実装順序にしてよい数少ない案件です。

| 観点 | 診断 |
|---|---|
| レール層 | ✅ 揃っている（PR#4 で完成） |
| 車両層（components / page 中身） | ❌ ゼロ |
| 真の参照点 | `design_spec.md` §4 + §7.1（修正済み）、`freoli-final.jsx` ではない |
| 着手順序の鉄則 | プリミティブ（§4）→ セクション → ページ合成 |

---

## Turn 2｜選択肢の発散：実装戦略を 3 軸で評価する

**神谷**：方針を決めるには評価軸を立てる必要があります。今回は 3 軸で十分です。

| 評価軸 | 内容 |
|---|---|
| **A. コンポーネント粒度** | プリミティブ 5 個だけ実装 vs プリミティブ + セクション部品（LiveCard / MemberCard 等）の二層 |
| **B. RSC / Client 境界** | 全部 Server Component vs 必要箇所のみ "use client"（フォーム・モバイルメニュー等） |
| **C. データ層** | data/*.ts に v0.1 ダミーデータを直接書く vs 空のまま page で仮置き |

**上田**：軸の上に具体案を載せます。

- **A 案 1（プリミティブのみ）**：実装は速いが、page.tsx が肥大化（Hero 100 行 + Lives 80 行 + ...）して可読性 NG
- **A 案 2（二層構造：プリミティブ + セクション部品）**：`<Hero />` `<SNSBar />` `<LivesSection />` `<MemberGrid />` `<NewsList />` `<ContactForm />` の 6 セクション部品 + 5 プリミティブ。**推奨**。`app/page.tsx` は 50 行未満に収まる
- **B 案 1（全 RSC）**：v0.1 で問い合わせフォームを実装するなら不可（フォームは Client 境界が必要）
- **B 案 2（フォームのみ Client、他は全 RSC）**：next/image の最適化を活かせて LCP も有利。**推奨**。`<ContactForm />` だけ `"use client"` を付ける
- **C 案 1（data/*.ts に v0.1 データ投入）**：ライブ 1 件（Blue Sheep 7.11）、メンバー 4 名（実名・ダミー写真パス）、SNS リンク 4 件。**推奨**。空配列だと UI 確認すらできない
- **C 案 2（page 内に仮置き）**：データと UI の分離が崩れ、後の CMS 移行で書き換え範囲が拡大

**みさき**：てか実装の話されてもピンと来ないんですけど、私が見たいのは「あの黒地にネオンブルーのカッコいいやつ」が**ちゃんと自分のスマホで動く**ってことだけなんですよね〜。「全 RSC」とか「Client 境界」とかって、それって私のスマホで表示速くなるってこと？ それなら全部それでお願いします〜。

**神谷**：みさきさん、まさにそうです。RSC（Server Components）はサーバ側で HTML を作って送る方式で、スマホ側の JavaScript 実行が減る → 初期表示が速い、という直接的なメリットがあります。design_spec.md にあった「FCP ≦1.5 秒」の数値目標もこの方式が一番達成しやすい。
ただし v0.1 で **問い合わせフォームを実装する範囲**（要件 F3.6）は別問題で、フォームは Client が必要。**この境界を `<ContactForm />` 一つに閉じ込めるのが正解**です。

**上田**：補足すると、ContactForm の API 統合（Resend / Turnstile）はキー発行・サンドボックス契約が必要で、**ローカルでの "Web 実装" としては UI まで先行**し、API ルートと送信は別タスクに切り出すのが現実的です。`onSubmit` で `console.log` する暫定実装で UI を完成させ、API は次の PR で接続する。

**結論（評価軸別）**：A2 × B2 × C1 を採用。

---

## Turn 3｜要件・範囲の確定：みさきの実需 → 抽象パターン → 具体優先度

**みさき**：私から実ユーザーの本音いいですか？

1. スマホで開いた瞬間、**バンド写真と次のライブ日**が見えること（これがないとサイト存在意義ゼロ）
2. ライブ情報、**地図リンクとチケット買い方**まで一画面で完結すること（会場名だけだと結局調べ直す）
3. メンバー紹介、誰がどの楽器かを**写真とセットで一目で**分かること（あのむさんがボーカルとか覚えたい）
4. **Instagram / TikTok にすぐ飛べる**こと（私もう Instagram フォロー済みだけど TikTok まだだから、橋渡しほしい）
5. **問い合わせフォーム、別に v0.1 で動かなくていい**んじゃないですか？ Instagram の DM でも届くし

**神谷**：みさきさんの 5 点は、抽象化すると「**v0.1 は『見せる』が主、『送る』は副**」という要件原則になります。送信機能は副なので、UI 完成度 100% × API 接続 0% でも v0.1 として成立する。F1.1〜F1.5（ライブ集客）と F2.1〜F2.4（ビジュアル＆メンバー）と F3.1（SNS リンク）が**コア**、F3.6（問い合わせフォーム送信）と F4.1（ニュース）は**副**、と整理できます。

**上田**：その整理に基づき、ローカル実装の優先度を 🔴🟡🟢 で振りますね。

| # | 実装対象 | 優先度 | 根拠 |
|---|---|---|---|
| 1 | プリミティブ 5 個（Button / Input / Card / SectionContainer / Heading） | 🔴 必須 | セクション実装の前提 |
| 2 | `<Hero />` セクション（Mobile/Desktop 両対応・FREOLI 116px・グラデーション wash） | 🔴 必須 | 非交渉シーケンス §1、みさき要求 #1 |
| 3 | `<SNSBar />`（Instagram / YouTube / TikTok / X、44px タップエリア確保） | 🔴 必須 | 非交渉シーケンス §2、みさき要求 #4、§7.1 修正点 |
| 4 | `<LivesSection />`（NextLive-2 2 カラム、Mobile 縮小版、地図 / チケット） | 🔴 必須 | F1、みさき要求 #1-2 |
| 5 | `<MembersSection />`（4 名グリッド、写真プレースホルダで先行可） | 🔴 必須 | F2.2-2.4、みさき要求 #3 |
| 6 | `<SubscribeBar />`（v0.1 は外部リンクボタンのみ、埋め込みは v0.5） | 🟡 推奨 | F3.4 v0.1 範囲 |
| 7 | `<NewsList />`（data/news.ts から map レンダリング） | 🟡 推奨 | F4.1、空配列で空状態 UI も用意 |
| 8 | `<ContactForm />` UI（Zod スキーマ連動・送信は console.log 暫定） | 🟢 任意（次 PR で API 接続） | F3.6 UI 部分のみ |
| 9 | `data/*.ts` への v0.1 データ投入（ライブ 1 件・メンバー 4 名・SNS 4 件） | 🔴 必須 | C1 案、UI 動作確認の前提 |
| 10 | `/styleguide` ページ（5 プリミティブの全状態表示） | 🟡 推奨 | design_spec.md §8 受け入れ条件 |

**みさき**：ん？「優先度 🟢 任意」って、フォームは v0.1 でやらなくていいってこと？ てか問い合わせフォーム、Resend とか Turnstile とか難しそうな単語出てきたから、別の日にやる方が安全じゃないですか？

**神谷**：その判断は正しい。`feature/v01-ui-implementation` ブランチでは **UI 完成まで** をスコープにし、API 統合は `feature/v01-contact-api` で別 PR にする。理由は (1) ローカルで動作確認できる範囲が明確になる、(2) Vercel に Resend / Turnstile キーを登録する **Layer 1 操作**（Tech Owner 承認案件）を UI 実装から分離できる、(3) PR が小さくなって Gate 1 レビュー負荷が下がる。

---

## Turn 4｜技術深掘り：実装ノウハウ → 法則と制約の抽出

**上田**：具体実装ノウハウを 4 つ。

1. **next/image の sizes 設定**：Hero 写真は LCP 要素になるので `priority` 必須 + `sizes="100vw"`。LCP ≦2.5 秒の目標は画像最適化なしでは届きません
2. **next/font は既に layout.tsx で設定済み**だが、CSS 変数 `--font-inter` `--font-noto-sans-jp` を Tailwind の `font-inter` / `font-jp` にマッピング済みなので、コンポーネント側は `className="font-inter font-extrabold text-[64px] md:text-[116px]"` の形で書く
3. **`"use client"` は ContactForm にのみ**。Hero / Lives / Members / News はすべて Server Component。SNS リンクは `<a>` タグなので Client 不要
4. **CLS 防止**：Hero 写真は固定アスペクト比のコンテナで囲む（Mobile h-[524px] / Desktop h-[620px] を spec 通り）。画像読み込み中に高さが確定するので CLS=0 を維持

**神谷**：a11y / 修正必須事項を、design_spec.md §7.1 ベースで実装に落とします。

| 修正 # | 実装方法 |
|---|---|
| 1. SNS バー 44px タップエリア | `<a className="flex items-center justify-center min-h-11 min-w-11 p-3">` でラップ |
| 2. Desktop SNS ラベル `zinc-600` NG | `text-zinc-400` に昇格、または `<span className="sr-only">` + `aria-label` |
| 4-5. CTA / 予約ボタン高さ | `<Button>` プリミティブで `min-h-[44px]` を全 variant に強制 |
| Focus visible | 全インタラクション要素に `focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black` |
| Image alt | バンド写真 = `alt="FREOLI band photo"`、装飾は `alt=""` |
| Form label | `<label htmlFor>` で input と関連付け、エラーは `aria-describedby` |

**みさき**：あの〜ちょっと聞いていいですか？「LCP」とか「CLS」とか略語が多くて死にそうなんですけど、要するに普通の人がスマホで開いて**画像がカクカクせず一発で映る**ようにする話、で合ってます？

**上田**：完全に合っています。LCP = 一番大きい画像が出るまでの時間、CLS = 表示中にレイアウトがズレないか、です。両方とも Google が「これがダメだとサイトとして失格」と決めた基準で、要するに**「開いた瞬間にちゃんとカッコいい」を担保する数値**です。

**神谷**：上田さんと私のノウハウを抽象化すると、3 つの法則になります。

- **法則①「Spec is Law, Code is Reference」**：参考実装より修正済み仕様が優先。`freoli-final.jsx` の inline style を React 化するのではなく、`design_spec.md` §4 を真の参照点に
- **法則②「Client 境界は最小化、Server は最大化」**：Next.js 14 の RSC アーキテクチャは、Client 境界を 1 つ（ContactForm）に閉じ込めれば、残り全てを高速な Server レンダリングに振れる
- **法則③「a11y はトークンに焼き込む」**：プリミティブ層（Button / Input）で `min-h-[44px]` / `focus-visible:ring-*` を**強制**すれば、上位セクションは a11y を意識しなくて済む。design_spec.md §7.1 で検出された修正必須事項は、全部プリミティブ層で吸収する設計に

---

## Turn 5｜方針統合：設計原則 3 箇条 + 明日からの具体アクション

**上田**：v0.1 ローカル実装の設計原則を 3 つにまとめます。

> ### ① **Spec-Driven, Reference-Aware**（仕様駆動、参考実装は参照のみ）
> `design_spec.md` §4・§5・§7.1 を真の正本とする。`freoli-final.jsx` はピクセル配置の参考であって実装の写経対象にしない。修正必須事項（§7.1）はプリミティブ層で吸収する。

> ### ② **One Client Island in a Server Sea**（Server の海に Client の島を 1 つだけ）
> `<ContactForm />` 以外はすべて React Server Components。ヒーロー画像は `priority` + `sizes="100vw"` で LCP ≦2.5 秒を担保。CLS=0 を固定高で実装。

> ### ③ **a11y by Token, Not by Memory**（a11y はトークンで強制、記憶に頼らない）
> Button は全 variant で `min-h-[44px]` + `focus-visible:ring-cyan-400 ring-offset-black` を強制。SNS リンクは `<a>` を `min-h-11 min-w-11` のラッパで包む規約をプリミティブ化。

**神谷**：原則を打ち上げたので具体に降ろします。**明日から取る具体アクション 6 ステップ**：

```
1. ブランチ作成: feature/v01-ui-implementation
2. プリミティブ実装 (components/ui/)
   - Button.tsx / Input.tsx / Card.tsx / SectionContainer.tsx / Heading.tsx
   - design_spec.md §4 をそのまま class 化
3. data/*.ts に v0.1 データ投入（content/v01-seed ブランチで先行可、Content Owner = 自分自身なので即承認）
   - lives.ts: Blue Sheep 7.11
   - members.ts: yusuke / anomu / hiromu / aberyo の4名（写真は public/images/members/.gitkeep でプレースホルダ）
   - links.ts: Instagram / YouTube / TikTok / X の4SNS
   - news.ts: 空配列のまま（空状態UIで対応）
4. セクション実装 (components/sections/)
   - Hero.tsx / SNSBar.tsx / LivesSection.tsx / MembersSection.tsx / SubscribeBar.tsx / NewsList.tsx
   - ContactForm.tsx ("use client" のみ・送信は console.log 暫定)
5. app/page.tsx 全置換: 7セクションを非交渉シーケンス順に並べるだけ（50行以内）
6. ローカル検証: pnpm dev → 375px / 1024px で目視確認 → pnpm typecheck / lint / build 全通過
```

**みさき**：なんか最初は「コンポーネント未実装」「色トークンだけ」って状態でどうしようかと思ったけど、要するに今日明日でやるのは「**ボタンとかカードの部品を 5 個作って、ヒーロー〜メンバー紹介までセクションを並べて、データ流し込んで、スマホで開いて確認**」ってことですよね？ それなら**1 週間で行けそう**な気がします！ あと問い合わせフォームの送信は別の日にやるって聞いて、めっちゃ安心しました〜。

## ✅ 議論まとめ

| 項目 | 方針 |
|---|---|
| 真の参照点 | `design_spec.md` §4・§5・§7.1（`freoli-final.jsx` は参考） |
| コンポーネント粒度 | プリミティブ 5 + セクション部品 6 + フォーム 1（二層構造） |
| RSC / Client 境界 | ContactForm のみ Client、他は全 Server Components |
| データ層 | `data/*.ts` に v0.1 シードデータ投入（ライブ 1 / メンバー 4 / SNS 4 / ニュース 0） |
| v0.1 スコープ（UI） | Hero / SNSBar / Lives / Members / Subscribe / News / ContactForm UI |
| v0.1 スコープ（API） | **別 PR に分離**（`feature/v01-contact-api`） |
| パフォーマンス | next/image priority + 固定高で LCP ≦2.5s / CLS ≦0.1 |
| a11y | プリミティブで `min-h-[44px]` + `focus-visible:ring-*` 強制 |
| ブランチ | `feature/v01-ui-implementation`（kebab-case、要件定義書準拠） |
| 完了定義 | Gate 1（typecheck + lint + build）+ Gate 2（375/1024px 目視）の両通過 |

---

**関連プランファイル**: `/Users/masaki/.claude/plans/pr-4-ui-web-expert-misaki-discussion-foamy-graham.md`
