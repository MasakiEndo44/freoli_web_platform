import Image from "next/image";
import type { LiveEvent } from "@/data/lives";
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

function InfoBlock({
  label,
  value,
  note,
  highlight = false,
  className = "",
}: {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 border-l-2 pl-[18px] ${
        highlight
          ? "border-cyan-400 shadow-[-2px_0_12px_rgba(34,211,238,0.2)]"
          : "border-zinc-800"
      } ${className}`}
    >
      <div className="font-inter text-[9px] tracking-[0.16em] text-zinc-400 uppercase mb-2">
        {label}
      </div>
      <div
        className={`font-inter leading-tight ${
          highlight
            ? "font-extrabold text-[30px] md:text-[34px] text-cyan-400"
            : "font-semibold text-[24px] text-zinc-50"
        }`}
      >
        {value}
      </div>
      {note ? (
        <div className="font-jp text-xs text-zinc-400 mt-1">{note}</div>
      ) : null}
    </div>
  );
}

function NextLiveCard({ live }: { live: LiveEvent }) {
  const { year, month, day, weekday } = parseDate(live.date);
  const eventTitle = live.title ?? live.venue;
  const ticketLabel =
    typeof live.ticketPrice === "number"
      ? `¥${live.ticketPrice.toLocaleString("ja-JP")}`
      : "—";
  const time =
    live.doorsOpenAt && live.showStartAt
      ? `${live.doorsOpenAt} / ${live.showStartAt}`
      : live.doorsOpenAt ?? live.showStartAt ?? "—";

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(220px,300px)_minmax(0,1fr)_minmax(320px,430px)] xl:gap-10 xl:items-stretch">
      <div className="order-1 xl:border-r xl:border-zinc-800 xl:pr-10">
        <div className="flex items-end mb-6">
          <div className="font-inter font-extrabold text-[64px] md:text-[86px] leading-[0.84] text-zinc-50">
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
          {eventTitle}
        </div>
        <div className="font-jp text-[13px] text-zinc-400">{live.venue}</div>
      </div>

      {live.flyerImagePath ? (
        <figure className="order-2 mx-auto w-full max-w-[420px] sm:max-w-[520px] xl:order-3 xl:mx-0 xl:max-w-none xl:self-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <Image
              src={live.flyerImagePath}
              alt={live.flyerAlt ?? `${eventTitle} フライヤー`}
              fill
              sizes="(min-width: 1280px) 430px, (min-width: 640px) 520px, calc(100vw - 44px)"
              className="object-cover"
            />
          </div>
        </figure>
      ) : null}

      <div className="order-3 min-w-0 xl:order-2 xl:self-start">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InfoBlock label="Open / Start" value={time} />
          {live.performAt ? (
            <InfoBlock
              label="FREOLI"
              value={live.performAt}
              note={live.soundStopAt ? `音止め ${live.soundStopAt}` : undefined}
            />
          ) : null}
          <InfoBlock
            label="Ticket"
            value={ticketLabel}
            note={live.ticketNote}
            highlight
            className="sm:col-span-2"
          />
        </div>

        <Card
          variant="featured"
          className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <div className="font-jp text-xs text-zinc-400 mb-1.5">
              チケット予約
            </div>
            <div className="font-jp text-base text-zinc-50">
              {live.ticketUrl
                ? "公式予約ページから購入できます"
                : "取り置き・予約方法はお問い合わせください"}
            </div>
          </div>
          {live.ticketUrl ? (
            <Button
              href={live.ticketUrl}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full shrink-0 sm:w-auto sm:min-w-[136px]"
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
            <Button
              href="#contact"
              variant="primary"
              className="w-full shrink-0 sm:w-auto sm:min-w-[154px]"
            >
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

export function LivesSection({ nextLive }: { nextLive: LiveEvent | undefined }) {
  return (
    <section
      id="next-live"
      className="bg-black/85 px-[22px] py-10 md:px-16 md:pt-[52px] md:pb-14"
    >
      <div className="max-w-7xl mx-auto">
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
      </div>
    </section>
  );
}
