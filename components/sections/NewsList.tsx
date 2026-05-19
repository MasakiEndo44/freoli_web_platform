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
    <SectionContainer id="news" className="bg-black/15">
      <Heading variant="eyebrow" className="block mb-3">
        — NEWS
      </Heading>
      <Heading variant="h2" className="mb-10">
        ニュース
      </Heading>
      {sorted.length === 0 ? (
        <p className="text-zinc-400 text-center font-jp">
          ニュースは準備中です。
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {sorted.map((entry) => (
            <li key={entry.id}>
              <Card className="flex flex-col gap-3">
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
                <h3 className="font-jp font-semibold text-xl text-zinc-50">
                  {entry.title}
                </h3>
                <p className="font-jp text-sm text-zinc-400 leading-relaxed">
                  {entry.body}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </SectionContainer>
  );
}
