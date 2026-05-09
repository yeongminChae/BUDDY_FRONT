import type { AdminUserDetail, AdminUserSummary } from "../shared/types/admin-user";

export const adminUserListMock: AdminUserSummary[] = [
  {
    id: 1,
    name: "Alex",
    level: 2,
    attendanceRate: 82,
    recentSession: "English Tuesday Session",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Jamie",
    level: 4,
    attendanceRate: 91,
    recentSession: "Networking Meetup",
    status: "STAFF"
  },
  {
    id: 3,
    name: "Chris",
    level: 1,
    attendanceRate: 56,
    recentSession: "Weekend Free Talking",
    status: "ACTIVE"
  },
  {
    id: 4,
    name: "Mina",
    level: 2,
    attendanceRate: 38,
    recentSession: "English Tuesday Session",
    status: "INACTIVE"
  }
];

export const adminUserDetailMockMap: Record<number, AdminUserDetail> = {
  1: {
    id: 1,
    name: "Alex",
    level: 2,
    mbti: "ENFP",
    intro: "네트워킹 관심 많아요.",
    status: "ACTIVE",
    attendanceRate: 82,
    totalAttendance: 14,
    recentSessions: [
      "English Tuesday Session",
      "Networking Meetup",
      "Weekend Free Talking"
    ],
    badges: [
      { id: "attendance-king", icon: "🏆", name: "3월 출석왕" },
      { id: "newbie", icon: "🌱", name: "뉴비" },
      { id: "kind-member", icon: "🤝", name: "매너 멤버" }
    ]
  },
  2: {
    id: 2,
    name: "Jamie",
    level: 4,
    mbti: "ISFJ",
    intro: "편하게 대화 이어가는 걸 좋아해요.",
    status: "STAFF",
    attendanceRate: 91,
    totalAttendance: 27,
    recentSessions: [
      "Networking Meetup",
      "English Tuesday Session",
      "Weekend Free Talking",
      "React Workshop"
    ],
    badges: [
      { id: "leader", icon: "👑", name: "리더" },
      { id: "staff", icon: "🛡️", name: "스태프" },
      { id: "consistent", icon: "🔁", name: "꾸준한 참여자" }
    ]
  },
  3: {
    id: 3,
    name: "Chris",
    level: 1,
    mbti: "INFP",
    intro: "영어 프리토킹 연습 중입니다.",
    status: "ACTIVE",
    attendanceRate: 56,
    totalAttendance: 7,
    recentSessions: [
      "Weekend Free Talking",
      "English Tuesday Session"
    ],
    badges: [
      { id: "first-session", icon: "⭐", name: "첫 참여" },
      { id: "newbie", icon: "🌱", name: "뉴비" }
    ]
  },
  4: {
    id: 4,
    name: "Mina",
    level: 2,
    mbti: "ESFP",
    intro: "주말 프리토킹 좋아해요!",
    status: "INACTIVE",
    attendanceRate: 38,
    totalAttendance: 5,
    recentSessions: [
      "English Tuesday Session"
    ],
    badges: [
      { id: "icebreaker", icon: "☕", name: "아이스브레이커" }
    ]
  }
};
