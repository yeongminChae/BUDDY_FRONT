export type SessionLikeMember = {
  id: number;
  name: string;
  intro?: string;
  tableName: string;
  round: 1 | 2;
  alreadyLiked?: boolean;
};

export type SessionLikeSummary = {
  sessionId: number;
  sessionTitle: string;
  isSessionClosed: boolean;
  likeLimit: number;
  sentLikeCount: number;
  members: SessionLikeMember[];
};
