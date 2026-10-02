import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { links, type SocialLink } from "@/data/links";
import { featuredRelease, releases } from "@/data/releases";

type ArtistLinkPlatform = Extract<SocialLink["platform"], "apple-music" | "spotify">;

const ARTIST_LINK_PLATFORMS: ArtistLinkPlatform[] = ["apple-music", "spotify"];

function formatReleaseDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${year}.${month}.${day}`;
}

export function SubscribeBar() {
  const artistLinks = ARTIST_LINK_PLATFORMS.map((platform) =>
    links.find((link) => link.platform === platform)
  ).filter(
    (link): link is SocialLink =>
      Boolean(link?.url) && link?.status === "active"
  );

  return (
    <SectionContainer id="subscribe" className="bg-black/85">
      <Heading variant="h2" className="mb-8">
        LISTEN
      </Heading>
      <p className="mb-6 max-w-2xl font-jp text-sm leading-relaxed text-zinc-400">
        {featuredRelease.description}「{featuredRelease.title}」を各配信サービスで配信中です。
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        {releases.map((release) => {
          return (
            <li key={release.title} className="min-w-0">
              <a
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${release.title} by ${release.artist} を聴く`}
                className="group flex min-h-[132px] min-w-0 flex-col justify-between rounded-md border border-zinc-800 bg-zinc-900/80 px-4 py-4 text-zinc-50 transition-colors duration-150 hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:px-5"
              >
                <span className="flex min-w-0 items-start justify-between gap-4">
                  <span className="min-w-0">
                    <span className="block font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-400">
                      {release.description}
                    </span>
                    <span className="mt-3 block break-words font-jp text-2xl font-semibold leading-tight">
                      {release.title}
                    </span>
                  </span>
                  <span className="shrink-0 font-inter text-xs tabular-nums text-zinc-500">
                    {formatReleaseDate(release.releasedAt)}
                  </span>
                </span>
                <span className="mt-5 inline-flex items-center gap-2 self-start font-inter text-[10px] font-semibold uppercase tracking-[0.16em]">
                  Listen
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M4.2 2.6h6.2v6.2" />
                    <path d="M10.1 2.9 2.6 10.4" />
                  </svg>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      {artistLinks.length > 0 ? (
        <div className="mt-7 border-t border-zinc-800 pt-5">
          <div className="font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Artist Links
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            {artistLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-300 underline decoration-zinc-700 underline-offset-[7px] transition-colors hover:text-cyan-400 hover:decoration-cyan-400/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </SectionContainer>
  );
}
