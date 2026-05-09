export type AttendanceAwardCandidate = {
  rank: number;
  userId: number;
  name: string;
  nickname: string | null;
  level: number;
  appliedCount: number;
  attendedCount: number;
  noShowCount: number;
  attendanceRate: number;
};
