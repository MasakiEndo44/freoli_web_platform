import { news } from "@/data/news";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";

const TAG_LABEL: Record<"live" | "release" | "media" | "other", string> = {
  live: "Live",
  release: "Release",
  media: "Media",
  other: "Other",
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

export function NewsList() {
  const sorted = [...news]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <SectionContainer id="news" className="bg-black/85">
      <Heading variant="h2" className="mb-10">
        NEWS
      </Heading>
      {sorted.length === 0 ? (
        <p className="text-zinc-400 text-center font-jp">
          ニュースは準備中です。
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {sorted.map((entry) => (
            <li key={entry.id}>
              <Card className="flex flex-col gap-3 overflow-hidden">
                <div className="flex flex-wrap items-center gap-3">
                  <time
                    dateTime={entry.date}
                    className="font-inter text-sm text-zinc-400"
                  >
                    {formatDate(entry.date)}
                  </time>
                  {entry.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="font-inter text-[10px] tracking-[0.16em] uppercase text-cyan-400 border border-cyan-400/40 px-2 py-0.5"
                    >
                      {TAG_LABEL[tag]}
                    </span>
                  ))}
                </div>
                <h3 className="min-w-0 break-words font-jp font-semibold text-lg leading-snug text-zinc-50 sm:text-xl">
                  {entry.title}
                </h3>
                <p className="min-w-0 break-words font-jp text-sm text-zinc-400 leading-relaxed">
                  {entry.body}
                </p>
                {entry.url ? (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[32px] items-center self-start font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-400 underline decoration-cyan-400/50 underline-offset-[6px] transition-colors hover:text-cyan-300 hover:decoration-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    {entry.linkLabel ?? "Detail"}
                  </a>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </SectionContainer>
  );
}
