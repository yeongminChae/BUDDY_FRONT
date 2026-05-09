export type AdminUserSummary = {
  id: number;
  name: string;
  level: number;
  attendanceRate: number;
  recentSession: string;
  status: "ACTIVE" | "INACTIVE" | "STAFF";
};

export type AdminUserDetail = {
  id: number;
  name: string;
  level: number;
  mbti?: string;
  intro?: string;
  status: "ACTIVE" | "INACTIVE" | "STAFF";
  attendanceRate: number;
  totalAttendance: number;
  recentSessions: string[];
  badges: {
    id: string;
    icon: string;
    name: string;
  }[];
};
