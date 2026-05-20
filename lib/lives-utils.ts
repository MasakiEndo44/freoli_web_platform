import type { LiveEvent } from "@/data/lives";

export type LivesPartition = {
  upcoming: LiveEvent[];
  past: LiveEvent[];
};

export function partitionLives(
  lives: LiveEvent[],
  referenceDate: Date = new Date(),
): LivesPartition {
  const referenceIso = referenceDate.toISOString().slice(0, 10);
  const upcoming: LiveEvent[] = [];
  const past: LiveEvent[] = [];

  for (const live of lives) {
    if (live.date >= referenceIso) {
      upcoming.push(live);
    } else {
      past.push(live);
    }
  }

  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, past };
}
