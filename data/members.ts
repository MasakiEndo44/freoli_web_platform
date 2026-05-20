export type Member = {
  id: "yusuke" | "anomu" | "hiromu" | "aberyo";
  displayName: string;
  partLabel: string;
  partOrder: 1 | 2 | 3 | 4;
  photoPath: string | null;
  bio: string;
  consentLogged: boolean;
};

export const members: Member[] = [
  {
    id: "yusuke",
    displayName: "ゆうすけ",
    partLabel: "Gt./Vo.",
    partOrder: 1,
    photoPath: "/images/members/yusuke_1.jpg",
    bio: "（仮）歌と楽曲制作の核を担うフロントマン。バンドの輪郭をつくる。",
    consentLogged: true,
  },
  {
    id: "anomu",
    displayName: "あのむ",
    partLabel: "Gt./Cho.",
    partOrder: 2,
    photoPath: "/images/members/anomu_1.JPEG",
    bio: "Guitar, Chorus, Composer.",
    consentLogged: true,
  },
  {
    id: "hiromu",
    displayName: "ひろむ",
    partLabel: "Ba./Cho.",
    partOrder: 3,
    photoPath: "/images/members/hiromu_1.jpg",
    bio: "（仮）ベースとコーラス担当。バンド全体の空気を整える役回り。",
    consentLogged: true,
  },
  {
    id: "aberyo",
    displayName: "aberyo",
    partLabel: "Dr.",
    partOrder: 4,
    photoPath: "/images/members/aberyo_1.jpg",
    bio: "（仮）ドラム担当。SNS と人脈づくりでバンドの外側を広げる。",
    consentLogged: true,
  },
];
