import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lives, type LiveEvent } from "@/data/lives";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

function findLive(id: string) {
  return lives.find((live) => live.id === id);
}

function formatDate(iso: string) {
  const [yearStr, monthStr, dayStr] = iso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  return { year, month, day, weekday };
}

function ticketLabel(live: LiveEvent) {
  if (typeof live.ticketPrice !== "number") return "未定";
  return `¥${live.ticketPrice.toLocaleString("ja-JP")}`;
}

function timeLabel(live: LiveEvent) {
  if (live.doorsOpenAt && live.showStartAt) {
    return `${live.doorsOpenAt} / ${live.showStartAt}`;
  }
  return live.doorsOpenAt ?? live.showStartAt ?? "未定";
}

export function generateStaticParams() {
  return lives.map((live) => ({ id: live.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const live = findLive(params.id);
  if (!live) return { title: "Live | FREOLI" };

  return {
    title: `${live.title ?? live.venue} | FREOLI`,
    description: `${live.date} ${live.venue} のライブ詳細。`,
  };
}

export default function LiveDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const live = findLive(params.id);
  if (!live) notFound();

  const { year, month, day, weekday } = formatDate(live.date);
  const todayIso = new Date().toISOString().slice(0, 10);
  const isUpcoming = live.date >= todayIso;
  const others = (live.participants ?? []).filter((name) => name !== "FREOLI");

  return (
    <main className="min-h-screen bg-black/85">
      <section className="mx-auto max-w-6xl px-3 py-8 sm:px-4 md:px-8 md:py-14">
        <Link
          href={isUpcoming ? "/#next-live" : "/#past-lives"}
          className="mb-10 inline-flex font-inter text-[10px] font-semibold tracking-[0.18em] text-cyan-400 uppercase underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {isUpcoming ? "Next Live" : "Past Lives"}
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-start">
          <div className="min-w-0">
            <Heading variant="eyebrow" className="mb-4">
              Live Detail
            </Heading>
            <div className="mb-7 flex items-end gap-3">
              <div className="font-inter text-[56px] font-extrabold leading-none tracking-[-0.04em] text-zinc-50 md:text-[76px]">
                {month}.{day}
              </div>
              <div className="pb-1.5">
                <div className="font-inter text-lg font-bold leading-none text-cyan-400">
                  {weekday}
                </div>
                <div className="font-inter text-sm text-zinc-500">{year}</div>
              </div>
            </div>

            <h1 className="font-jp text-3xl font-bold leading-tight text-zinc-50 md:text-5xl">
              {live.title ?? live.venue}
            </h1>
            <p className="mt-4 font-jp text-lg font-semibold text-zinc-300">
              {live.venue}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Card>
                <div className="font-inter text-[10px] tracking-[0.16em] text-zinc-500 uppercase">
                  Open / Start
                </div>
                <div className="mt-2 font-inter text-xl font-bold text-zinc-50">
                  {timeLabel(live)}
                </div>
              </Card>
              <Card>
                <div className="font-inter text-[10px] tracking-[0.16em] text-zinc-500 uppercase">
                  Ticket
                </div>
                <div className="mt-2 font-inter text-xl font-bold text-zinc-50">
                  {ticketLabel(live)}
                </div>
                {live.ticketNote ? (
                  <div className="mt-1 font-jp text-xs text-zinc-400">
                    {live.ticketNote}
                  </div>
                ) : null}
              </Card>
              {live.performAt ? (
                <Card>
                  <div className="font-inter text-[10px] tracking-[0.16em] text-zinc-500 uppercase">
                    FREOLI
                  </div>
                  <div className="mt-2 font-inter text-xl font-bold text-cyan-400">
                    {live.performAt}
                  </div>
                  {live.soundStopAt ? (
                    <div className="mt-1 font-jp text-xs text-zinc-400">
                      音止め {live.soundStopAt}
                    </div>
                  ) : null}
                </Card>
              ) : null}
            </div>

            {live.reservationImagePath ? (
              <Card className="mt-6 max-w-full overflow-hidden">
                <div className="font-inter text-[10px] tracking-[0.16em] text-zinc-500 uppercase">
                  Reservation
                </div>
                <p className="mt-2 font-jp text-sm leading-relaxed text-zinc-400">
                  申し込みはこちらのQRから。
                </p>
                <div className="mt-4 w-full max-w-[260px] overflow-hidden rounded-md border border-zinc-800 bg-white">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={live.reservationImagePath}
                      alt={live.reservationImageAlt ?? "ライブ申し込み用QRコード"}
                      fill
                      sizes="260px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </Card>
            ) : null}

            {others.length > 0 ? (
              <section className="mt-10">
                <Heading variant="h2" className="mb-4 text-xl md:text-2xl">
                  ACTS
                </Heading>
                <ul className="flex flex-wrap gap-2">
                  {others.map((name) => (
                    <li
                      key={name}
                      className="max-w-full break-words border border-zinc-800 bg-zinc-900/70 px-3 py-2 font-jp text-sm text-zinc-300"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {live.flyerImagePath ? (
            <figure className="mx-auto min-w-0 w-full max-w-[min(100%,420px)] lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
                <Image
                  src={live.flyerImagePath}
                  alt={live.flyerAlt ?? `${live.title ?? live.venue} フライヤー`}
                  fill
                  sizes="(min-width: 1024px) 420px, calc(100vw - 24px)"
                  className="object-contain"
                />
              </div>
            </figure>
          ) : null}
        </div>
      </section>
    </main>
  );
}
