export type SocialLink = {
  platform: "instagram" | "youtube" | "tiktok" | "x" | "spotify" | "apple-music";
  label: string;
  url: string | null;
  status: "active" | "coming-2025";
};

export const links: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/freoli_official?igsh=Nm5kbHRlaGp6cHUy&utm_source=qr",
    status: "active",
  },
  {
    platform: "youtube",
    label: "YouTube",
    url: "https://youtube.com/@freoli_official?si=2IgxARtJy46GXgWX",
    status: "active",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@freoli_official?_r=1&_t=ZS-96VXP7xgeTl",
    status: "active",
  },
  {
    platform: "x",
    label: "X",
    url: "https://x.com/freoli_band",
    status: "coming-2025",
  },
  {
    platform: "spotify",
    label: "Spotify",
    url: null,
    status: "coming-2025",
  },
  {
    platform: "apple-music",
    label: "Apple Music",
    url: "https://music.apple.com/jp/artist/anomuder/1589759263",
    status: "active",
  },
];
