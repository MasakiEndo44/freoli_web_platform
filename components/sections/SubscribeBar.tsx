import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";

const services = [
  { key: "spotify", label: "Spotify" },
  { key: "apple-music", label: "Apple Music" },
] as const;

export function SubscribeBar() {
  return (
    <SectionContainer id="subscribe" className="bg-zinc-950">
      <Heading variant="eyebrow" className="block mb-3">
        — LISTEN
      </Heading>
      <Heading variant="h2" className="mb-8">
        Subscribe
      </Heading>
      <p className="font-jp text-sm text-zinc-400 mb-6">
        楽曲は 2025 年配信予定です。配信開始時に各サブスクへリンクします。
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        {services.map((s) => (
          <div
            key={s.key}
            role="link"
            aria-disabled="true"
            aria-label={`${s.label}（2025 年配信予定）`}
            className="inline-flex items-center justify-between gap-4 min-h-[44px] px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-md opacity-50 cursor-not-allowed font-inter font-semibold text-base text-zinc-50"
          >
            <span>{s.label}</span>
            <span className="font-inter text-[10px] tracking-[0.16em] text-cyan-400 uppercase">
              2025 年配信予定
            </span>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
