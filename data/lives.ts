export type LiveEvent = {
  id: string;
  date: string;
  venue: string;
  venueUrl?: string;
  venuePhone?: string;
  venueMapsQuery: string;
  doorsOpenAt?: string;
  showStartAt?: string;
  ticketPrice?: number;
  ticketUrl?: string;
  participants?: string[];
  organizer?: "self" | "booked";
  actual_attendance: number | null;
};

export const lives: LiveEvent[] = [
  {
    id: "2026-07-11-waver",
    date: "2026-07-11",
    venue: "Booking Live",
    venueUrl: "https://waverwaver.net/",
    venuePhone: "03-6804-0094",
    venueMapsQuery: "下北沢 WAVER",
    doorsOpenAt: undefined,
    showStartAt: undefined,
    ticketPrice: undefined,
    ticketUrl: undefined,
    participants: ["FREOLI"],
    organizer: "booked",
    actual_attendance: null,
  },
];
