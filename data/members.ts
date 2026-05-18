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
    photoPath: null,
    bio: "（仮）フロントマン。歌とギターを担当。",
    consentLogged: false,
  },
  {
    id: "anomu",
    displayName: "あのむ",
    partLabel: "Gt./Cho.",
    partOrder: 2,
    photoPath: null,
    bio: "（仮）ギターとコーラスを担当。",
    consentLogged: false,
  },
  {
    id: "hiromu",
    displayName: "ひろむ",
    partLabel: "Ba./Cho.",
    partOrder: 3,
    photoPath: null,
    bio: "（仮）ベースとコーラスを担当。",
    consentLogged: false,
  },
  {
    id: "aberyo",
    displayName: "aberyo",
    partLabel: "Dr.",
    partOrder: 4,
    photoPath: null,
    bio: "（仮）ドラムを担当。",
    consentLogged: false,
  },
];
