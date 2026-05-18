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
    id: "2025-07-11-blue-sheep",
    date: "2025-07-11",
    venue: "Blue Sheep",
    venueUrl: undefined,
    venuePhone: undefined,
    venueMapsQuery: "下北沢 Blue Sheep",
    doorsOpenAt: "19:00",
    showStartAt: "19:30",
    ticketPrice: 3000,
    ticketUrl: undefined,
    participants: ["FREOLI"],
    organizer: "booked",
    actual_attendance: null,
  },
];
