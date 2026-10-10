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
    displayName: "yusuke",
    partLabel: "Gt./Vo.",
    partOrder: 1,
    photoPath: "/images/members/yusuke_profile_scaled_balance.jpg",
    bio: "柄シャツ担当",
    consentLogged: true,
  },
  {
    id: "anomu",
    displayName: "anomu",
    partLabel: "Gt./Cho.",
    partOrder: 2,
    photoPath: "/images/members/anomu_profile_scaled_balance.jpg",
    bio: "黒ジャケット担当",
    consentLogged: true,
  },
  {
    id: "hiromu",
    displayName: "hiromu",
    partLabel: "Ba./Cho.",
    partOrder: 3,
    photoPath: "/images/members/hiromu_profile_scaled_balance_down120.jpg",
    bio: "トラックパンツ担当",
    consentLogged: true,
  },
  {
    id: "aberyo",
    displayName: "aberyo",
    partLabel: "Dr.",
    partOrder: 4,
    photoPath: "/images/members/aberyo_profile_scaled_balance_110.jpg",
    bio: "タンクトップ担当",
    consentLogged: true,
  },
];
