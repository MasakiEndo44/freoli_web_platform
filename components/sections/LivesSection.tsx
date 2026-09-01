import Link from "next/link";
import type { LiveEvent } from "@/data/lives";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

function parseDate(iso: string) {
  const [yearStr, monthStr, dayStr] = iso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  return { year, month, day, weekday };
}

function NextLiveCard({ live }: { live: LiveEvent }) {
  const { year, month, day, weekday } = parseDate(live.date);
  const eventTitle = live.title ?? live.venue;
  const others = (live.participants ?? []).filter((name) => name !== "FREOLI");

  return (
    <Link
      href={`/lives/${live.id}`}
      aria-label={`${live.date} ${eventTitle} の詳細を見る`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <Card
        variant="hoverable"
        className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6"
      >
        <div className="flex shrink-0 items-end gap-3 md:w-40">
          <div className="font-jp text-[42px] font-bold leading-none tabular-nums text-zinc-50">
            {month}.{day}
          </div>
          <div className="pb-1">
            <div className="font-inter text-sm font-bold leading-none text-cyan-400">
              {weekday}
            </div>
            <div className="font-inter text-xs text-zinc-500">{year}</div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="break-words font-jp text-xl font-semibold text-zinc-50">
            {eventTitle}
          </div>
          <div className="mt-1 font-jp text-sm text-zinc-300">
            {live.venue}
          </div>
          {live.performAt ? (
            <div className="mt-2 font-jp text-xs font-semibold text-cyan-400">
              FREOLI {live.performAt}から
            </div>
          ) : null}
          {others.length > 0 ? (
            <div className="mt-1 break-words font-jp text-xs text-zinc-400">
              対バン: {others.join(" / ")}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="inline-flex font-inter text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400 underline decoration-zinc-700 underline-offset-[6px] transition-colors group-hover:text-cyan-400 group-hover:decoration-cyan-400/70">
            Detail
          </span>
        </div>
      </Card>
    </Link>
  );
}

export function LivesSection({ nextLive }: { nextLive: LiveEvent | undefined }) {
  return (
    <SectionContainer id="next-live" className="bg-black/85">
      <Heading variant="h2" className="mb-10">
        NEXT LIVE
      </Heading>
      {nextLive ? (
        <NextLiveCard live={nextLive} />
      ) : (
        <p className="font-jp text-base text-zinc-400">
          次回ライブは調整中です。SNS でお知らせします。
        </p>
      )}
    </SectionContainer>
  );
}
