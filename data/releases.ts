export type Release = {
  title: string;
  artist: string;
  url: string;
  description: string;
  releasedAt: string;
};

export const releases: Release[] = [
  {
    title: "サイセイトユメ",
    artist: "FREOLI",
    url: "https://linkco.re/47BNVXXy",
    description: "2nd single",
    releasedAt: "2026-09-07",
  },
  {
    title: "パドマ",
    artist: "FREOLI",
    url: "https://linkco.re/vU38MtGM",
    description: "1st single",
    releasedAt: "2026-06-18",
  },
];

export const featuredRelease = releases[0];
