export type CreateSessionResponse = {
  sessionId: number;
  title: string;
  startsAt: string;   // "2026-03-20 19:00:00"
  location: string;
  capacity: number;
  topic: string;
  status: "OPEN" | "CLOSED" | "DONE";
};