export type SocialLink = {
  platform: "instagram" | "youtube" | "tiktok" | "x" | "spotify" | "apple-music";
  label: string;
  url: string | null;
  status: "active" | "coming-2025";
};

export const links: SocialLink[] = [];
