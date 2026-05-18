export type NewsEntry = {
  id: string;
  date: string;
  title: string;
  body: string;
  tags?: Array<"live" | "release" | "media" | "other">;
};

export const news: NewsEntry[] = [];
