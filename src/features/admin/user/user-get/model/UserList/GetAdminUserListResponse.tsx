type AdminUserListItem = {
  userId: number;
  name: string;
  nickname: string;
  level: number;
  attendanceRate: number;
  recentSession: string | null;
  recentSessionTitle: string | null;
  status: "ACTIVE" | "INACTIVE";
  role: "STAFF" | "USER";
};

export type GetAdminUserListResponse = {
  users: AdminUserListItem[];
  query: string;
  limit: number;
  offset: number;
  hasNext: boolean;
  totalUserCount: number;
};
