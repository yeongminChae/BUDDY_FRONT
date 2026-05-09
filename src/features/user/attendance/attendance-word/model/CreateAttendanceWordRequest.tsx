export type CreateAttendanceWordRequest = {
  sessionId: number;
  name: string;
  nickname: string;
  phrase: string;
  example: string | null;
};
