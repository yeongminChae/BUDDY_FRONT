export type GetAdminParticipantManageResponse = {
  sessionId: number;
  title: string;
  attendanceCount: number;
  capacity: number;
  participants: AdminParticipantItem[];
};

export type AdminParticipantItem = {
  userId: number;
  applicationId: number;
  name: string;
  nickname: string;
  email: string;
  applicationStatus: "APPLIED" | "CONFIRMED" | "CANCELED";
  appliedAt: string;
};
