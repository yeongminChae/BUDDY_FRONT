export type AdminSessionListItem = {
  sessionId: number;
  title: string;
  startsAt: string;
  location: string;
  attendanceCount: number;
  capacity: number;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
};

export type AdminPastSessionListItem = {
  sessionId: number;
  title: string;
  startsAt: string;
  location: string;
  attendanceCount: number;
  capacity: number;
  status: "CLOSED";
};

export type GetAdminSessionListResponse = {
  upcomingSessions: AdminSessionListItem[];
  pastSessions: AdminPastSessionListItem[];
};

export type GetAdminSessionManageRequest = {
  sessionId: number;
};

export type GetAdminSessionManageResponse = {
  sessionId: number;
  title: string;
  startsAt: string;
  location: string;
  attendanceCount: number;
  capacity: number;
  hasTableAssignments: boolean;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
};