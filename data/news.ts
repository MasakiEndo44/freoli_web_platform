export type NewsEntry = {
  id: string;
  date: string;
  title: string;
  body: string;
  tags?: Array<"live" | "release" | "media" | "other">;
};

export const news: NewsEntry[] = [
  {
    id: "2026-09-01-pico-pico-party-live",
    date: "2026-09-01",
    title: "10/12「PICO PICO PARTY!」出演決定",
    body: "2026年10月12日(月・祝)、新宿 SUN FACEで開催される picora. presents「PICO PICO PARTY!」に出演します。FREOLIは16:30出演予定です。詳細と申し込みQRはNEXT LIVEから確認できます。",
    tags: ["live"],
  },
  {
    id: "2026-06-21-original-summit-ii-details",
    date: "2026-06-21",
    title: "7/11「ORIGINAL SUMMIT II」の詳細を公開しました",
    body: "7月11日(土) 下北沢WAVERで開催される「ORIGINAL SUMMIT II」のOPEN / START、チケット情報、FREOLIの出演時間をNEXT LIVEに掲載しました。FREOLIは20:20出演予定です。",
    tags: ["live"],
  },
  {
    id: "2026-06-18-padoma-release",
    date: "2026-06-18",
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
