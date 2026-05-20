import type { LiveEvent } from "@/data/lives";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { SectionContainer } from "@/components/ui/SectionContainer";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const MAX_VISIBLE = 10;

function formatDate(iso: string) {
  const [yearStr, monthStr, dayStr] = iso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  return { year, month, day, weekday };
}

function organizerBadge(organizer: LiveEvent["organizer"]) {
  if (!organizer) return null;
  const isSelf = organizer === "self";
  const label = isSelf ? "Self" : "Booked";
  const styles = isSelf
    ? "border-cyan-400/40 text-cyan-400"
    : "border-zinc-700 text-zinc-400";
  return (
    <span
      className={`font-inter text-[10px] tracking-wider uppercase px-2 py-1 border rounded-full ${styles}`}
    >
      {label}
    </span>
  );
}

export function PastLives({ pastLives }: { pastLives: LiveEvent[] }) {
  if (pastLives.length === 0) return null;

  const visible = pastLives.slice(0, MAX_VISIBLE);

  return (
    <SectionContainer id="past-lives" className="bg-black/85">
      <Heading variant="eyebrow" className="block mb-3">
        — PAST LIVES
      </Heading>
      <Heading variant="h2" className="mb-10">
        過去のライブ
      </Heading>
      <ul className="space-y-4">
        {visible.map((live) => {
          const { year, month, day, weekday } = formatDate(live.date);
          const others = (live.participants ?? []).filter(
            (p) => p !== "FREOLI",
          );
          return (
            <li key={live.id}>
              <Card className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="md:w-40 flex items-end gap-3 shrink-0">
                  <div className="font-inter font-extrabold text-[40px] tracking-[-0.04em] leading-none text-zinc-50">
                    {month}.{day}
                  </div>
                  <div className="pb-1">
                    <div className="font-inter font-bold text-sm text-cyan-400 leading-none">
                      {weekday}
                    </div>
                    <div className="font-inter text-xs text-zinc-500">
                      {year}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-jp font-bold text-lg text-zinc-50">
                    {live.venue}
                  </div>
                  {others.length > 0 && (
                    <div className="font-jp text-xs text-zinc-400 mt-1">
                      対バン: {others.join(" / ")}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {organizerBadge(live.organizer)}
                  {typeof live.actual_attendance === "number" && (
                    <div className="font-inter text-xs text-zinc-300">
                      <span className="text-zinc-500 mr-1">動員</span>
                      <span className="font-bold text-sm">
                        {live.actual_attendance}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </SectionContainer>
  );
}
