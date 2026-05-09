import type { Badge, UserProfile } from "../shared/types/badge";

export const badgeCatalogMock: Badge[] = [
  {
    id: "attendance-king-2026-03",
    name: "3월 출석왕",
    icon: "🏆",
    description: "2026년 3월 출석률 상위 5% 달성 시 획득",
    acquiredAt: "2026.03.31",
    category: "attendance"
  },
  {
    id: "newbie",
    name: "뉴비",
    icon: "🌱",
    description: "Buddy 첫 달에 참여한 멤버에게 지급",
    acquiredAt: "2026.03.02",
    category: "starter"
  },
  {
    id: "kind-member",
    name: "매너 멤버",
    icon: "🤝",
    description: "긍정적인 피드백을 꾸준히 받은 멤버에게 지급",
    acquiredAt: "2026.03.10",
    category: "vibe"
  },
  {
    id: "leader",
    name: "리더",
    icon: "👑",
    description: "리더 역할을 맡아 세션 운영에 기여한 멤버",
    acquiredAt: "2026.02.18",
    category: "role"
  },
  {
    id: "attendance-10",
    name: "출석 10회",
    icon: "🔟",
    description: "Buddy 세션 누적 10회 참석 시 획득",
    acquiredAt: "2026.03.05",
    category: "attendance"
  },
  {
    id: "recent-level-up",
    name: "최근 레벨업",
    icon: "🚀",
    description: "최근 레벨 상승을 달성한 멤버에게 지급",
    acquiredAt: "2026.03.12",
    category: "growth"
  },
  {
    id: "staff",
    name: "스태프",
    icon: "🛡️",
    description: "Buddy 운영에 참여 중인 멤버",
    acquiredAt: "2026.01.11",
    category: "role"
  },
  {
    id: "first-session",
    name: "첫 참여",
    icon: "⭐",
    description: "Buddy 첫 세션 참석 시 획득",
    acquiredAt: "2026.01.05",
    category: "starter"
  },
  {
    id: "consistent",
    name: "꾸준한 참여자",
    icon: "🔁",
    description: "4주 연속 세션 참석 시 획득",
    acquiredAt: "2026.03.15",
    category: "attendance"
  },
  {
    id: "icebreaker",
    name: "아이스브레이커",
    icon: "☕",
    description: "새로운 사람들과 자연스럽게 대화를 시작한 멤버",
    acquiredAt: "2026.03.09",
    category: "vibe"
  }
];

export const myProfileMock: UserProfile = {
  id: 100,
  name: "영민",
  level: 3,
  mbti: "ENFP",
  intro: "대화로 분위기를 풀어가는 걸 좋아해요.",
  likesCount: 12,
  representativeBadgeIds: [
    "attendance-king-2026-03",
    "kind-member",
    "recent-level-up"
  ],
  badges: badgeCatalogMock,
  recentActivity: "최근 Buddy 세션에 꾸준히 참여 중"
};

export const userProfileMockMap: Record<number, UserProfile> = {
  1: {
    id: 1,
    name: "Alex",
    level: 2,
    mbti: "ENFP",
    intro: "네트워킹 관심 많아요.",
    badges: [
      badgeCatalogMock[0],
      badgeCatalogMock[1],
      badgeCatalogMock[2],
      badgeCatalogMock[3],
      badgeCatalogMock[4],
      badgeCatalogMock[9]
    ],
    recentActivity: "최근 Buddy 세션에 2회 참여했어요!"
  },
  2: {
    id: 2,
    name: "Jamie",
    level: 4,
    mbti: "ISFJ",
    intro: "편하게 대화 이어가는 걸 좋아해요.",
    badges: [
      badgeCatalogMock[2],
      badgeCatalogMock[3],
      badgeCatalogMock[6],
      badgeCatalogMock[8]
    ],
    recentActivity: "운영과 참여를 꾸준히 이어가고 있어요."
  },
  3: {
    id: 3,
    name: "Chris",
    level: 1,
    mbti: "INFP",
    intro: "영어 프리토킹 연습 중입니다.",
    badges: [badgeCatalogMock[1], badgeCatalogMock[7]],
    recentActivity: "첫 참여 이후 꾸준히 세션을 살펴보는 중"
  },
  4: {
    id: 4,
    name: "Mina",
    level: 2,
    mbti: "ESFP",
    intro: "주말 프리토킹 좋아해요!",
    badges: [badgeCatalogMock[1], badgeCatalogMock[2], badgeCatalogMock[9]],
    recentActivity: "새 멤버들과 자연스럽게 어울리는 중"
  },
  5: {
    id: 5,
    name: "John",
    level: 2,
    mbti: "ISTP",
    intro: "편하게 영어 대화 연습하고 싶어요.",
    badges: [badgeCatalogMock[0], badgeCatalogMock[4]],
    recentActivity: "최근 Buddy 세션에 꾸준히 참여 중"
  },
  6: {
    id: 6,
    name: "Emma",
    level: 3,
    mbti: "INFJ",
    intro: "차분한 분위기의 대화를 좋아해요.",
    badges: [badgeCatalogMock[2], badgeCatalogMock[5]],
    recentActivity: "이번 달 활동이 활발해요"
  }
};
