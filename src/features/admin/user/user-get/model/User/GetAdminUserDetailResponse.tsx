import type { AdminUserMonthlyAttendance } from "./AdminUserMonthlyAttendance";
import type { AdminUserMonthlyWord } from "./AdminUserMonthlyWord";
import type { AdminUserRecentAttendedSession } from "./AdminUserRecentAttendedSession";

export type GetAdminUserDetailResponse = {
  userId: number;
  name: string;
  nickname: string;
  email: string | null;
  role: "ADMIN" | "STAFF" | "USER";
  status: "ACTIVE" | "INACTIVE";
  level: number;
  mbti: string | null;
  jobs: string | null;
  monthlyAttendance: AdminUserMonthlyAttendance;
  recentAttendedSession: AdminUserRecentAttendedSession | null;
  monthlyWords: AdminUserMonthlyWord[];
  badgeCount: number;
};
