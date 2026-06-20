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
}: {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`border-l-2 pl-[18px] ${
        highlight
          ? "border-cyan-400 shadow-[-2px_0_12px_rgba(34,211,238,0.2)]"
          : "border-zinc-800"
      }`}
    >
      <div className="font-inter text-[9px] tracking-[0.16em] text-zinc-400 uppercase mb-2">
        {label}
      </div>
      <div
        className={`font-inter ${
          highlight
            ? "font-extrabold text-[28px] text-cyan-400"
            : "font-semibold text-[20px] text-zinc-50"
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
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-start">
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
            {eventTitle}
          </div>
          <div className="font-jp text-[13px] text-zinc-400">{live.venue}</div>
        </div>

        <div
          aria-hidden="true"
          className="hidden lg:block w-px bg-zinc-800 self-stretch mt-1"
        />

        <div className="mt-8 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-9">
            <InfoBlock label="Open / Start" value={time} />
            <InfoBlock
              label="Ticket"
              value={ticketLabel}
              note={live.ticketNote}
              highlight
            />
            {live.performAt ? (
              <InfoBlock
                label="FREOLI"
                value={live.performAt}
                note={live.soundStopAt ? `音止め ${live.soundStopAt}` : undefined}
              />
            ) : null}
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
                  : "取り置き・予約方法はお問い合わせください"}
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
      {live.flyerImagePath ? (
        <figure className="lg:pt-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            <Image
              src={live.flyerImagePath}
              alt={live.flyerAlt ?? `${eventTitle} フライヤー`}
              fill
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      ) : null}
    </div>
  );
}

export function LivesSection({ nextLive }: { nextLive: LiveEvent | undefined }) {
  return (
    <section
      id="next-live"
      className="bg-black/85 px-[22px] py-10 md:px-16 md:pt-[52px] md:pb-14"
    >
      <div className="max-w-6xl mx-auto">
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
