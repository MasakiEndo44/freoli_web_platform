import { lives, type LiveEvent } from "@/data/lives";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";

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
  const ticketLabel =
    typeof live.ticketPrice === "number"
      ? `¥${live.ticketPrice.toLocaleString("ja-JP")}`
      : "—";
  const time =
    live.doorsOpenAt && live.showStartAt
      ? `${live.doorsOpenAt} / ${live.showStartAt}`
      : live.doorsOpenAt ?? live.showStartAt ?? "—";

  return (
    <div className="lg:grid lg:grid-cols-[auto_1px_1fr] lg:gap-[72px] lg:items-start">
      <div>
        <div className="flex items-end mb-6">
          <div className="font-inter font-extrabold text-[64px] lg:text-[96px] tracking-[-0.05em] leading-[0.84] text-zinc-50">
            {month}.{day}
          </div>
          <div className="pb-2 ml-3.5">
            <div className="font-inter font-bold text-[22px] text-cyan-400 leading-none">
              {weekday}
            </div>
            <div className="font-inter text-sm text-zinc-400">{year}</div>
          </div>
        </div>
        <div className="font-jp font-bold text-[26px] text-zinc-50 mb-1.5">
          {live.venue}
        </div>
        <div className="font-jp text-[13px] text-zinc-400">
          {live.venueMapsQuery}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hidden lg:block w-px bg-zinc-800 self-stretch mt-1"
      />

      <div className="mt-8 lg:mt-0">
        <div className="flex gap-8 md:gap-11 mb-9">
          <div className="border-l-2 border-zinc-800 pl-[18px]">
            <div className="font-inter text-[9px] tracking-[0.16em] text-zinc-400 uppercase mb-2">
              Open / Start
            </div>
            <div className="font-inter font-semibold text-[20px] text-zinc-50">
              {time}
            </div>
          </div>
          <div className="border-l-2 border-cyan-400 pl-[18px] shadow-[-2px_0_12px_rgba(34,211,238,0.2)]">
            <div className="font-inter text-[9px] tracking-[0.16em] text-zinc-400 uppercase mb-2">
              Ticket
            </div>
            <div className="font-inter font-extrabold text-[28px] text-cyan-400">
              {ticketLabel}
            </div>
          </div>
        </div>

        <Card
          variant="featured"
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <div className="font-jp text-xs text-zinc-400 mb-1.5">
              チケット予約
            </div>
            <div className="font-jp text-base text-zinc-50">
              {live.ticketUrl
                ? "公式予約ページから購入できます"
                : "会場へお問い合わせください"}
            </div>
          </div>
          {live.ticketUrl ? (
            <Button
              href={live.ticketUrl}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              予約する
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </Button>
          ) : (
            <Button href="#contact" variant="primary">
              予約方法を見る
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}

export function LivesSection() {
  const next = lives[0];

  return (
    <section
      id="next-live"
      className="bg-black/40 px-[22px] py-10 md:px-16 md:pt-[52px] md:pb-14"
    >
      <div className="max-w-6xl mx-auto">
        <Heading variant="eyebrow" className="block mb-11">
          — NEXT LIVE
        </Heading>
        {next ? (
          <NextLiveCard live={next} />
        ) : (
          <p className="font-jp text-base text-zinc-400">
            次回ライブは調整中です。SNS でお知らせします。
          </p>
        )}
      </div>
    </section>
  );
}
