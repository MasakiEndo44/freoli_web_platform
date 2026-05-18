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
    url: null,
    status: "coming-2025",
  },
  {
    platform: "youtube",
    label: "YouTube",
    url: null,
    status: "coming-2025",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    url: null,
    status: "coming-2025",
  },
  {
    platform: "x",
    label: "X",
    url: null,
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
    url: null,
    status: "coming-2025",
  },
];
