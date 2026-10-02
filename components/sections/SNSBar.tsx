import type { ReactElement } from "react";
import { links, type SocialLink } from "@/data/links";

type SnsPlatform = Extract<
  SocialLink["platform"],
  "instagram" | "youtube" | "tiktok" | "x"
>;

const SNS_PLATFORMS: SnsPlatform[] = ["instagram", "youtube", "tiktok", "x"];

const icons: Record<SnsPlatform, ReactElement> = {
  instagram: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <polygon points="10,9 15,12 10,15" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 1 0 6.33 6.34l.03-8.46a8.16 8.16 0 0 0 4.77 1.53V3.04a4.85 4.85 0 0 1-1.03-.35z" />
    </svg>
  ),
  x: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export function SNSBar() {
  const snsLinks = SNS_PLATFORMS.map((platform) =>
    links.find((l) => l.platform === platform)
  ).filter((l): l is SocialLink => Boolean(l));

  return (
    <nav
      aria-label="SNS リンク"
      className="border-y border-zinc-800 bg-black/85"
    >
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-8">
        <ul className="grid grid-cols-4 items-center gap-1 py-7 sm:gap-4 md:py-10">
          {snsLinks.map((link) => {
            const icon = icons[link.platform as SnsPlatform];
            const isActive = link.url !== null && link.status === "active";
            if (!isActive) {
              return (
                <li key={link.platform}>
                  <span
                    aria-disabled="true"
                    aria-label={`${link.label}（準備中）`}
                    className="flex min-h-16 min-w-0 cursor-not-allowed flex-col items-center justify-center gap-2 text-zinc-600"
                  >
                    <span className="[&_svg]:h-7 [&_svg]:w-7 md:[&_svg]:h-9 md:[&_svg]:w-9">
                      {icon}
                    </span>
                    <span className="min-w-0 truncate font-inter text-[11px] tracking-[0.04em] text-zinc-500 sm:text-sm md:text-lg">
                      {link.label}
                    </span>
                  </span>
                </li>
              );
            }
            return (
              <li key={link.platform}>
                <a
                  href={link.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex min-h-16 min-w-0 flex-col items-center justify-center gap-2 text-zinc-400 transition-colors duration-150 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <span className="[&_svg]:h-7 [&_svg]:w-7 md:[&_svg]:h-9 md:[&_svg]:w-9">
                    {icon}
                  </span>
                  <span className="min-w-0 truncate font-inter text-[11px] tracking-[0.04em] text-zinc-400 sm:text-sm md:text-lg">
                    {link.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
