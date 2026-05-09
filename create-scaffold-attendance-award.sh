#!/bin/bash

set -e

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
  echo "사용법: ./create-scaffold-attendance-award.sh project-name"
  exit 1
fi

cd "$PROJECT_NAME"

mkdir -p src/features/attendanceAward/model
mkdir -p src/features/attendanceAward/mock
mkdir -p src/pages/admin

cat > src/features/attendanceAward/model/attendanceAwardTypes.ts <<'EOF'
export type AttendanceAwardSummary = {
  totalSessionCount: number;
  totalAppliedCount: number;
  totalAttendedCount: number;
  totalNoShowCount: number;
  averageAttendanceRate: number;
};

export type AttendanceAwardCandidate = {
  userId: number;
  rank: number;

  name: string;
  nickname?: string;
  level: number;

  appliedCount: number;
  attendedCount: number;
  noShowCount: number;
  attendanceRate: number;
};

export type AttendanceAwardMonth = {
  year: number;
  month: number;
};

export type AttendanceAwardResponse = {
  year: number;
  month: number;
  summary: AttendanceAwardSummary;
  candidates: AttendanceAwardCandidate[];
};
EOF

cat > src/features/attendanceAward/mock/attendanceAwardMock.ts <<'EOF'
import type { AttendanceAwardResponse } from "../model/attendanceAwardTypes";

export const attendanceAwardMock: AttendanceAwardResponse = {
  year: 2026,
  month: 4,
  summary: {
    totalSessionCount: 8,
    totalAppliedCount: 64,
    totalAttendedCount: 51,
    totalNoShowCount: 5,
    averageAttendanceRate: 79.7,
  },
  candidates: [
    {
      userId: 101,
      rank: 1,
      name: "김민영",
      nickname: "Mina",
      level: 4,
      appliedCount: 8,
      attendedCount: 8,
      noShowCount: 0,
      attendanceRate: 100,
    },
    {
      userId: 102,
      rank: 2,
      name: "조용현",
      nickname: "Yong",
      level: 5,
      appliedCount: 8,
      attendedCount: 7,
      noShowCount: 1,
      attendanceRate: 87.5,
    },
    {
      userId: 103,
      rank: 3,
      name: "셀린",
      level: 4,
      appliedCount: 7,
      attendedCount: 7,
      noShowCount: 0,
      attendanceRate: 100,
    },
    {
      userId: 104,
      rank: 4,
      name: "박지현",
      nickname: "Jihyun",
      level: 3,
      appliedCount: 7,
      attendedCount: 6,
      noShowCount: 1,
      attendanceRate: 85.7,
    },
    {
      userId: 105,
      rank: 5,
      name: "이준호",
      level: 2,
      appliedCount: 5,
      attendedCount: 5,
      noShowCount: 0,
      attendanceRate: 100,
    },
    {
      userId: 106,
      rank: 6,
      name: "한서윤",
      nickname: "Seo",
      level: 3,
      appliedCount: 6,
      attendedCount: 4,
      noShowCount: 2,
      attendanceRate: 66.7,
    },
    {
      userId: 107,
      rank: 7,
      name: "정우진",
      level: 1,
      appliedCount: 4,
      attendedCount: 3,
      noShowCount: 1,
      attendanceRate: 75,
    },
  ],
};
EOF

cat > src/pages/admin/AdminAttendanceAwardPage.tsx <<'EOF'
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { attendanceAwardMock } from "@/features/attendanceAward/mock/attendanceAwardMock";
import type {
  AttendanceAwardCandidate,
  AttendanceAwardSummary,
} from "@/features/attendanceAward/model/attendanceAwardTypes";

import { AppShell } from "@/components/common/AppShell";
import { AppHeader } from "@/components/common/AppHeader";
import { PageTitle } from "@/components/common/PageTitle";
import { SectionBlock } from "@/components/common/SectionBlock";
import { BuddyCard } from "@/components/common/BuddyCard";
import { BuddyButton } from "@/components/common/BuddyButton";

type SummaryItem = {
  label: string;
  value: string;
  description: string;
};

export function AdminAttendanceAwardPage() {
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(attendanceAwardMock.year);
  const [selectedMonth, setSelectedMonth] = useState(attendanceAwardMock.month);

  // MVP 단계에서는 mock 데이터를 사용한다.
  // 추후 selectedYear, selectedMonth를 API query parameter로 넘기면 된다.
  const attendanceAward = attendanceAwardMock;

  const topCandidates = useMemo(() => {
    return attendanceAward.candidates.filter((candidate) => candidate.rank <= 3);
  }, [attendanceAward.candidates]);

  const rankingCandidates = attendanceAward.candidates;

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
      return;
    }

    setSelectedMonth(selectedMonth - 1);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(1);
      return;
    }

    setSelectedMonth(selectedMonth + 1);
  };

  return (
    <AppShell>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate("/admin/sessions")}
      />

      <PageTitle
        title="출석왕 관리"
        subtitle="월별 참석 기록을 기준으로 출석왕 후보와 전체 랭킹을 확인해요."
      />

      <div className="space-y-6 pb-8">
        <MonthSelector
          year={selectedYear}
          month={selectedMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <AttendanceSummarySection summary={attendanceAward.summary} />

        <TopCandidateSection candidates={topCandidates} />

        <RankingSection candidates={rankingCandidates} />
      </div>
    </AppShell>
  );
}

type MonthSelectorProps = {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

function MonthSelector({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: MonthSelectorProps) {
  return (
    <BuddyCard>
      <div className="flex items-center justify-between">
        <BuddyButton variant="secondary" size="sm" onClick={onPrevMonth}>
          이전 달
        </BuddyButton>

        <div className="text-center">
          <p className="text-xs font-medium text-[#6C7A80]">조회 월</p>
          <p className="mt-1 text-lg font-bold text-[#2F3A40]">
            {year}년 {month}월
          </p>
        </div>

        <BuddyButton variant="secondary" size="sm" onClick={onNextMonth}>
          다음 달
        </BuddyButton>
      </div>
    </BuddyCard>
  );
}

type AttendanceSummarySectionProps = {
  summary: AttendanceAwardSummary;
};

function AttendanceSummarySection({ summary }: AttendanceSummarySectionProps) {
  const summaryItems: SummaryItem[] = [
    {
      label: "총 세션",
      value: `${summary.totalSessionCount}회`,
      description: "이번 달 종료 세션",
    },
    {
      label: "총 신청",
      value: `${summary.totalAppliedCount}건`,
      description: "세션 신청 합계",
    },
    {
      label: "총 참석",
      value: `${summary.totalAttendedCount}건`,
      description: "실제 출석 합계",
    },
    {
      label: "노쇼",
      value: `${summary.totalNoShowCount}건`,
      description: "신청 후 불참",
    },
    {
      label: "평균 출석률",
      value: `${summary.averageAttendanceRate}%`,
      description: "참석 / 신청 기준",
    },
  ];

  return (
    <SectionBlock title="이번 달 요약">
      <div className="grid grid-cols-2 gap-3">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#E2E6E8] bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-medium text-[#6C7A80]">{item.label}</p>
            <p className="mt-2 text-xl font-bold text-[#2F3A40]">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-[#6C7A80]">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}

type TopCandidateSectionProps = {
  candidates: AttendanceAwardCandidate[];
};

function TopCandidateSection({ candidates }: TopCandidateSectionProps) {
  return (
    <SectionBlock
      title="TOP 3 후보"
      description="이번 달 참석 횟수가 높은 출석왕 후보예요."
    >
      <div className="space-y-3">
        {candidates.map((candidate) => (
          <TopCandidateCard key={candidate.userId} candidate={candidate} />
        ))}
      </div>
    </SectionBlock>
  );
}

type TopCandidateCardProps = {
  candidate: AttendanceAwardCandidate;
};

function TopCandidateCard({ candidate }: TopCandidateCardProps) {
  const rankEmoji = getRankEmoji(candidate.rank);

  return (
    <BuddyCard>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-2xl">
          {rankEmoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#2F3A40]">
                {candidate.rank}위 {candidate.name}
              </p>
              <p className="mt-1 text-xs text-[#6C7A80]">
                {candidate.nickname ? `${candidate.nickname} · ` : ""}
                Lv.{candidate.level}
              </p>
            </div>

            <div className="rounded-full bg-[#3AAFA9] px-3 py-1 text-xs font-bold text-white">
              출석 {candidate.attendedCount}회
            </div>
          </div>

          <AttendanceMetricRow candidate={candidate} />
        </div>
      </div>
    </BuddyCard>
  );
}

type RankingSectionProps = {
  candidates: AttendanceAwardCandidate[];
};

function RankingSection({ candidates }: RankingSectionProps) {
  return (
    <SectionBlock
      title="전체 랭킹"
      description="이번 달 신청자들의 참석 기록을 순위별로 확인해요."
    >
      <div className="space-y-3">
        {candidates.map((candidate) => (
          <RankingRow key={candidate.userId} candidate={candidate} />
        ))}
      </div>
    </SectionBlock>
  );
}

type RankingRowProps = {
  candidate: AttendanceAwardCandidate;
};

function RankingRow({ candidate }: RankingRowProps) {
  return (
    <button
      type="button"
      className="w-full rounded-2xl border border-[#E2E6E8] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F9FBFB]"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F6] text-sm font-bold text-[#2F3A40]">
          {candidate.rank}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#2F3A40]">
                {candidate.name}
              </p>
              <p className="mt-1 text-xs text-[#6C7A80]">
                {candidate.nickname ? `${candidate.nickname} · ` : ""}
                Lv.{candidate.level}
              </p>
            </div>

            <p className="text-sm font-bold text-[#3AAFA9]">
              {candidate.attendanceRate}%
            </p>
          </div>

          <AttendanceMetricRow candidate={candidate} compact />
        </div>
      </div>
    </button>
  );
}

type AttendanceMetricRowProps = {
  candidate: AttendanceAwardCandidate;
  compact?: boolean;
};

function AttendanceMetricRow({ candidate, compact = false }: AttendanceMetricRowProps) {
  return (
    <div
      className={
        compact
          ? "mt-3 grid grid-cols-4 gap-2"
          : "mt-4 grid grid-cols-4 gap-2"
      }
    >
      <MetricPill label="신청" value={`${candidate.appliedCount}`} />
      <MetricPill label="참석" value={`${candidate.attendedCount}`} />
      <MetricPill label="노쇼" value={`${candidate.noShowCount}`} />
      <MetricPill label="출석률" value={`${candidate.attendanceRate}%`} />
    </div>
  );
}

type MetricPillProps = {
  label: string;
  value: string;
};

function MetricPill({ label, value }: MetricPillProps) {
  return (
    <div className="rounded-xl bg-[#F3F5F6] px-2 py-2 text-center">
      <p className="text-[11px] font-medium text-[#6C7A80]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#2F3A40]">{value}</p>
    </div>
  );
}

function getRankEmoji(rank: number) {
  if (rank === 1) return "🏆";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "⭐";
}
EOF

echo "출석왕 관리 화면 scaffold 생성 완료"
echo ""
echo "생성된 파일:"
echo "- src/features/attendanceAward/model/attendanceAwardTypes.ts"
echo "- src/features/attendanceAward/mock/attendanceAwardMock.ts"
echo "- src/pages/admin/AdminAttendanceAwardPage.tsx"
echo ""
echo "라우터에 아래 경로를 수동으로 추가해줘:"
echo "path: '/admin/attendance-award'"
EOF
