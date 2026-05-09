import type {
  AdminPastSessionDetail,
  AdminPastSessionSummary,
  UserPastSessionReview
} from "../shared/types/session-history";

export const adminPastSessionListMock: AdminPastSessionSummary[] = [
  {
    sessionId: 101,
    title: "English Tuesday Session",
    dateTime: "2026.03.10 19:00",
    place: "잠실 스터디룸",
    attendanceSummary: "출석 8 / 12 · 출석률 67%"
  },
  {
    sessionId: 102,
    title: "Weekend Free Talking",
    dateTime: "2026.03.03 15:00",
    place: "성수 스터디룸",
    attendanceSummary: "출석 6 / 10 · 출석률 60%"
  },
  {
    sessionId: 103,
    title: "Networking Meetup",
    dateTime: "2026.02.24 19:00",
    place: "홍대 카페",
    attendanceSummary: "출석 10 / 14 · 출석률 71%"
  }
];

export const adminPastSessionDetailMockMap: Record<number, AdminPastSessionDetail> = {
  101: {
    sessionId: 101,
    title: "English Tuesday Session",
    dateTime: "2026.03.10 19:00",
    place: "잠실 스터디룸",
    attendanceSummary: "출석 8 / 12",
    participants: ["Alex", "Jamie", "Chris", "Mina", "John", "Emma", "샘", "수민"],
    tableSummary: [
      { tableName: "Table 1", members: ["Alex", "Jamie", "Chris", "샘"] },
      { tableName: "Table 2", members: ["Mina", "John", "Emma", "수민"] }
    ],
    attendanceRate: 67,
    topicTitle: "Unpopular Opinions",
    recommendedExpressions: [
      "I see your point, but...",
      "That feels overrated to me.",
      "I have a different take on that."
    ]
  },
  102: {
    sessionId: 102,
    title: "Weekend Free Talking",
    dateTime: "2026.03.03 15:00",
    place: "성수 스터디룸",
    attendanceSummary: "출석 6 / 10",
    participants: ["Mina", "Chris", "Emma", "Kevin", "Alex", "Jamie"],
    tableSummary: [
      { tableName: "Table 1", members: ["Mina", "Chris", "Emma"] },
      { tableName: "Table 2", members: ["Kevin", "Alex", "Jamie"] }
    ],
    attendanceRate: 60,
    topicTitle: "Travel Moments",
    recommendedExpressions: [
      "That reminds me of...",
      "I had a similar experience.",
      "My favorite part was..."
    ]
  },
  103: {
    sessionId: 103,
    title: "Networking Meetup",
    dateTime: "2026.02.24 19:00",
    place: "홍대 카페",
    attendanceSummary: "출석 10 / 14",
    participants: ["Alex", "Jamie", "Chris", "Mina", "John", "Emma", "Daniel", "Mia", "샘", "수민"],
    tableSummary: [
      { tableName: "Table 1", members: ["Alex", "Jamie", "Chris", "Mina", "John"] },
      { tableName: "Table 2", members: ["Emma", "Daniel", "Mia", "샘", "수민"] }
    ],
    attendanceRate: 71,
    topicTitle: "Networking & Small Talk",
    recommendedExpressions: [
      "What brings you here today?",
      "Nice to meet you in person.",
      "What do you do these days?"
    ]
  }
};

export const userPastSessionReviewMockMap: Record<number, UserPastSessionReview> = {
  101: {
    sessionId: 101,
    title: "English Tuesday Session",
    dateTime: "2026.03.10 19:00",
    place: "잠실 스터디룸",
    topicTitle: "Unpopular Opinions",
    topicQuestions: [
      "Money can buy happiness.",
      "First impressions are usually correct.",
      "Name a popular food that you think is overrated."
    ],
    recommendedExpressions: [
      "I see your point, but...",
      "That feels overrated to me.",
      "I have a different take on that."
    ],
    myMemo: "첫 질문에서 생각보다 말이 잘 나왔다. 다음에는 예시를 하나 더 준비하면 좋겠다.",
    checkedExpressions: [
      "I see your point, but...",
      "I have a different take on that."
    ]
  },
  102: {
    sessionId: 102,
    title: "Weekend Free Talking",
    dateTime: "2026.03.03 15:00",
    place: "성수 스터디룸",
    topicTitle: "Travel Moments",
    topicQuestions: [
      "What was your most memorable trip?",
      "Do you prefer plan or spontaneity?",
      "What place do you want to revisit?"
    ],
    recommendedExpressions: [
      "That reminds me of...",
      "I had a similar experience.",
      "My favorite part was..."
    ],
    myMemo: "여행 얘기는 잘 했는데 시제 표현이 조금 흔들렸다.",
    checkedExpressions: [
      "That reminds me of...",
      "My favorite part was..."
    ]
  },
  103: {
    sessionId: 103,
    title: "Networking Meetup",
    dateTime: "2026.02.24 19:00",
    place: "홍대 카페",
    topicTitle: "Networking & Small Talk",
    topicQuestions: [
      "How do you usually start a conversation?",
      "What topic feels easiest for small talk?",
      "What makes someone easy to talk to?"
    ],
    recommendedExpressions: [
      "What brings you here today?",
      "Nice to meet you in person.",
      "What do you do these days?"
    ],
    myMemo: "짧게 질문 던지는 방식이 효과적이었다. 다음엔 follow-up 질문 더 해보기.",
    checkedExpressions: [
      "Nice to meet you in person."
    ]
  }
};
