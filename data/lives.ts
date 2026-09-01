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
  reservationImagePath?: string;
  reservationImageAlt?: string;
  participants?: string[];
  organizer?: "self" | "booked";
  actual_attendance: number | null;
};

export const lives: LiveEvent[] = [
  {
    id: "2026-10-12-sun-face",
    title: "PICO PICO PARTY!",
    date: "2026-10-12",
    venue: "新宿 SUN FACE",
    venueMapsQuery: "東京都新宿区新宿5丁目11-13 新宿 SUN FACE",
    doorsOpenAt: "15:00",
    showStartAt: "15:30",
    ticketPrice: 1500,
    ticketNote: "+1Drink（当日）",
    ticketUrl: undefined,
    flyerImagePath: "/images/lives/pico-pico-party-2026-10-12-flyer.jpg",
    flyerAlt:
      "picora. presents PICO PICO PARTY! 2026年10月12日 新宿 SUN FACE 出演者発表フライヤー",
    reservationImagePath: "/images/lives/pico-pico-party-2026-10-12-qr.jpg",
    reservationImageAlt:
      "PICO PICO PARTY! 申し込み用QRコード",
    participants: [
      "picora.",
      "ぎゃるばん",
      "FUTIN",
      "[THE ONE-DAY CIGARETTES]",
      "Pentumn",
      "FREOLI",
      "Armonia Mutate",
      "デリシャス☆ペンタゴン",
    ],
    organizer: "booked",
    actual_attendance: null,
  },
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
