export type CreateAdminUserResponse = {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  gender: "M" | "F";
  role: "USER" | "ADMIN" | "STAFF";
  level: number;
  status: "ACTIVE" | "INACTIVE";
  jobs: string | null;
  mbti: string | null;
  createdAt: string;
  updatedAt: string;
};
