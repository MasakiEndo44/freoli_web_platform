export type LiveEvent = {
  id: string;
  title?: string;
  date: string;
  venue: string;
  venueUrl?: string;
  venuePhone?: string;
  venueMapsQuery: string;
  doorsOpenAt?: string;
  showStartAt?: string;
  performAt?: string;
  soundStopAt?: string;
  ticketPrice?: number;
  ticketNote?: string;
  ticketUrl?: string;
  flyerImagePath?: string;
  flyerAlt?: string;
  participants?: string[];
  organizer?: "self" | "booked";
  actual_attendance: number | null;
};

export const lives: LiveEvent[] = [
  {
    id: "2026-07-11-waver",
    title: "ORIGINAL SUMMIT II",
    date: "2026-07-11",
    venue: "下北沢 WAVER",
    venueUrl: "https://waverwaver.net/",
    venuePhone: "03-6804-0094",
    venueMapsQuery: "下北沢 WAVER",
    doorsOpenAt: "17:30",
    showStartAt: "17:40",
    performAt: "20:20",
    soundStopAt: "21:00",
    ticketPrice: 3000,
    ticketNote: "1Drink込",
    ticketUrl: undefined,
    flyerImagePath: "/images/lives/original_summit_ii_sns_4x5.png",
    flyerAlt:
      "ORIGINAL SUMMIT II 2026年7月11日 下北沢WAVER 出演者とタイムテーブルのフライヤー",
    participants: [
      "thousandmiles",
      "SLAY's LINE.",
      "In Droves",
      "BLUESHEEP",
      "FREOLI",
    ],
    organizer: "booked",
    actual_attendance: null,
  },
];
