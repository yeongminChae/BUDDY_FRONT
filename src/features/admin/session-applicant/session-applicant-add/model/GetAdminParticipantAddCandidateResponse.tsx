export type AdminParticipantAddCandidateItem = {
    userId: number;
    name: string;
    nickname: string;
    email: string;
    gender: string | null;
    level: number;
    jobs: string | null;
    mbti: string | null;
  };

export type GetAdminParticipantAddCandidateResponse = {
    sessionId: number;
    query: string;
    limit: number;
    hasNext: boolean;
    candidates: AdminParticipantAddCandidateItem[];
  };