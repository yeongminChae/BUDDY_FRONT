import type { SessionMemberGroup } from "../shared/types/member";

export const sessionMembersMockMap: Record<number, SessionMemberGroup> = {
  1: {
    sessionId: 1,
    title: "English Tuesday Session",
    dateLabel: "5월 10일 오후 7:00 참석 멤버 (6명)",
    members: [
      { id: 1, name: "James", intro: ".", badge: "Host" },
      { id: 2, name: "Lee", intro: "안녕하세요", isNew: true },
      { id: 3, name: "Anna", intro: ".", isNew: true },
      { id: 4, name: "Kevin", intro: ".", isNew: true },
      { id: 5, name: "Sam", intro: "샘이라고 합니다. 잘 부탁드립니다 ☺️" },
      { id: 6, name: "Sumin", intro: "." }
    ]
  },
  2: {
    sessionId: 2,
    title: "Weekend Free Talking",
    dateLabel: "5월 12일 오후 3:00 참석 멤버 (4명)",
    members: [
      { id: 1, name: "Mina", intro: "주말 프리토킹 좋아해요!" },
      { id: 2, name: "Chris", intro: ".", isNew: true },
      { id: 3, name: "Emma", intro: "같이 편하게 대화해요 :)" },
      { id: 4, name: "Kevin", intro: "." }
    ]
  },
  3: {
    sessionId: 3,
    title: "Networking Meetup",
    dateLabel: "5월 20일 오후 7:00 참석 멤버 (5명)",
    members: [
      { id: 1, name: "Alex", intro: "네트워킹 관심 많아요." },
      { id: 2, name: "Jamie", intro: ".", badge: "Staff" },
      { id: 3, name: "John", intro: ".", isNew: true },
      { id: 4, name: "Mia", intro: "편하게 인사 나눠요!" },
      { id: 5, name: "Daniel", intro: "." }
    ]
  }
};
