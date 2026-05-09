import type { SessionManageSummary, SessionSummary } from "../shared/types/session";

export const sessionListMock: SessionSummary[] = [
  { sessionId: 1, title: "English Tuesday Session", dateTime: "5월 10일 오후 7:00", place: "잠실 스터디룸", participant: "8 / 12" },
  { sessionId: 2, title: "React Workshop", dateTime: "5월 15일 오후 6:30", place: "강남 스터디룸", participant: "5 / 10" },
  { sessionId: 3, title: "네트워킹 밋업", dateTime: "5월 20일 오후 7:00", place: "홍대 카페", participant: "10 / 14" }
];

export const sessionManageMockMap: Record<number, SessionManageSummary> = {
  1: { sessionId: 1, title: "English Tuesday Session", dateTime: "5월 10일 오후 7:00", place: "잠실 스터디룸", participant: "8 / 12" },
  2: { sessionId: 2, title: "React Workshop", dateTime: "5월 15일 오후 6:30", place: "강남 스터디룸", participant: "5 / 10" },
  3: { sessionId: 3, title: "네트워킹 밋업", dateTime: "5월 20일 오후 7:00", place: "홍대 카페", participant: "10 / 14" }
};
