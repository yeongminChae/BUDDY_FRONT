export type BadgeCategory =
  | "starter"
  | "attendance"
  | "role"
  | "vibe"
  | "growth";

export type Badge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  acquiredAt?: string;
  category: BadgeCategory;
};

export type UserProfile = {
  id: number;
  name: string;
  level: number;
  mbti?: string;
  intro?: string;
  likesCount?: number;
  badges: Badge[];
  representativeBadgeIds?: string[];
  recentActivity?: string;
};
