export type NewsEntry = {
  id: string;
  date: string;
  title: string;
  body: string;
  tags?: Array<"live" | "release" | "media" | "other">;
};

export const news: NewsEntry[] = [
  {
    id: "2026-06-20-padoma-release",
    date: "2026-06-20",
    title: "新曲「パドマ」の配信リンクを公開しました",
    body: "1st single「パドマ」を各配信サービスで聴ける配信ページへのリンクを、LISTENセクションに追加しました。",
    tags: ["release"],
  },
  {
    id: "2026-05-20-site-launch",
    date: "2026-05-20",
    title: "FREOLI 公式サイトを公開しました",
    body: "ライブ情報、サブスク（配信準備中）、お問い合わせ窓口をここから集約していきます。最新の動きは各 SNS と本ニュース欄でお知らせします。",
    tags: ["other"],
  },
];
