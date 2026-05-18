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

export const lives: LiveEvent[] = [];
