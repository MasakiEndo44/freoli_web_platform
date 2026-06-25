import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { featuredRelease } from "@/data/releases";

export function SubscribeBar() {
  return (
    <SectionContainer id="subscribe" className="bg-black/85">
      <Heading variant="h2" className="mb-8">
        LISTEN
      </Heading>
      <p className="font-jp text-sm text-zinc-400 mb-6">
        {featuredRelease.description}「{featuredRelease.title}」を各配信サービスで配信中です。
      </p>
      <a
        href={featuredRelease.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${featuredRelease.title} by ${featuredRelease.artist} を聴く`}
        className="inline-flex items-center justify-between gap-4 min-h-[44px] w-full md:w-auto px-6 py-3 bg-cyan-400 text-zinc-950 border border-cyan-300 rounded-md font-inter font-semibold text-base transition-colors duration-150 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <span>{featuredRelease.title}</span>
        <span className="inline-flex items-center gap-2 font-inter text-[10px] tracking-[0.16em] uppercase">
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
          >
            <path d="M4.2 2.6h6.2v6.2" />
            <path d="M10.1 2.9 2.6 10.4" />
          </svg>
        </span>
      </a>
    </SectionContainer>
  );
}
