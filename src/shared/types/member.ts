export type SessionMember = {
  id: number;
  name: string;
  intro?: string;
  badge?: string;
  isNew?: boolean;
  avatarUrl?: string;
};

export type SessionMemberGroup = {
  sessionId: number;
  title: string;
  dateLabel: string;
  members: SessionMember[];
};
