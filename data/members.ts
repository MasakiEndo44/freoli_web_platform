export type Member = {
  id: "yusuke" | "anomu" | "hiromu" | "aberyo";
  displayName: string;
  partLabel: string;
  partOrder: 1 | 2 | 3 | 4;
  photoPath: string | null;
  bio: string;
  consentLogged: boolean;
};

export const members: Member[] = [];
