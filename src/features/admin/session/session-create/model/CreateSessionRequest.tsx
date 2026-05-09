export type CreateSessionRequest = {
  title: string;
  sessionDate: string; // "2026-03-20"
  sessionTime: string; // "19:00"
  location: string;
  capacity: number;
  topic: string | null;
  hostUserId: number;
};
