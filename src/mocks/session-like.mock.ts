import type { SessionLikeSummary } from "../shared/types/session-like";

export const sessionLikeMockMap: Record<number, SessionLikeSummary> = {
  1: {
    sessionId: 1,
    sessionTitle: "English Tuesday Session",
    isSessionClosed: true,
    likeLimit: 3,
    sentLikeCount: 1,
    members: [
      {
        id: 1,
        name: "Alex",
        intro: "네트워킹 관심 많아요.",
        tableName: "Table 1",
        round: 1,
        alreadyLiked: false
      },
      {
        id: 2,
        name: "Jamie",
        intro: "편하게 대화 이어가는 걸 좋아해요.",
        tableName: "Table 1",
        round: 1,
        alreadyLiked: true
      },
      {
        id: 3,
        name: "Chris",
        intro: "영어 프리토킹 연습 중입니다.",
        tableName: "Table 2",
        round: 2,
        alreadyLiked: false
      }
    ]
  },
  2: {
    sessionId: 2,
    sessionTitle: "Weekend Free Talking",
    isSessionClosed: true,
    likeLimit: 3,
    sentLikeCount: 0,
    members: [
      {
        id: 4,
        name: "Mina",
        intro: "주말 프리토킹 좋아해요!",
        tableName: "Table 1",
        round: 1,
        alreadyLiked: false
      },
      {
        id: 5,
        name: "John",
        intro: "편하게 영어 대화 연습하고 싶어요.",
        tableName: "Table 1",
        round: 2,
        alreadyLiked: false
      }
    ]
  },
  3: {
    sessionId: 3,
    sessionTitle: "Networking Meetup",
    isSessionClosed: false,
    likeLimit: 3,
    sentLikeCount: 0,
    members: [
      {
        id: 6,
        name: "Emma",
        intro: "차분한 분위기의 대화를 좋아해요.",
        tableName: "Table 2",
        round: 1,
        alreadyLiked: false
      }
    ]
  }
};
