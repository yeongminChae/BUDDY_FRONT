import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { getAdminAttendanceAward } from "../../../features/admin/user/user-attendanceAward/api/GetAdminAttendanceAward";
import { unwrapApiResponse } from "../../../features/client-common/unwrapApiResponse";
import type { AttendanceAwardCandidate } from "../../../features/admin/user/user-attendanceAward/model/AttendanceAwardCandidate";
import type { AttendanceAwardSummary } from "../../../features/admin/user/user-attendanceAward/model/AttendanceAwardSummary";

type SummaryItem = {
  label: string;
  value: string;
  description: string;
};

export function AdminAttendanceAwardPage() {
  const navigate = useNavigate();
  const now = new Date();

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [rankingCandidates, setRankingCandidates] = useState<
    AttendanceAwardCandidate[]
  >([]);
  const [attendanceSummary, setAttendanceSummary] =
    useState<AttendanceAwardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAttendanceAward = async () => {
      try {
        setIsLoading(true);

        const response = await getAdminAttendanceAward({
          year: selectedYear,
          month: selectedMonth,
        });
        const data = unwrapApiResponse(response);

        setRankingCandidates(data.candidates);
        setAttendanceSummary(data.summary);
      } catch (error) {
        console.error("출석왕 조회 실패", error);

        setRankingCandidates([]);

        setAttendanceSummary(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceAward();
  }, [selectedYear, selectedMonth]);

  const topCandidates = rankingCandidates.filter(
    (candidate) => candidate.rank <= 3
  );

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

      <div className="pb-8 space-y-6">
        <MonthSelector
          year={selectedYear}
          month={selectedMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 mt-10">
            <div className="border-2 rounded-full h-7 w-7 animate-spin border-buddyLine border-t-buddyPrimary" />
            <p className="text-sm text-buddySubText">
              출석 정보를 불러오는 중...
            </p>
          </div>
        ) : attendanceSummary != null ? (
          <>
            <AttendanceSummarySection summary={attendanceSummary} />
            <TopCandidateSection candidates={topCandidates} />
            <RankingSection candidates={rankingCandidates.slice(0, 10)} />
          </>
        ) : (
          <div className="py-10 text-sm text-center text-buddySubText">
            출석 정보가 없습니다.
          </div>
        )}
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
        <BuddyButton variant="secondary" onClick={onPrevMonth}>
          이전 달
        </BuddyButton>

        <div className="text-center">
          <p className="text-xs font-medium text-[#6C7A80]">조회 월</p>
          <p className="mt-1 text-lg font-bold text-[#2F3A40]">
            {year}년 {month}월
          </p>
        </div>

        <BuddyButton variant="secondary" onClick={onNextMonth}>
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
      value: `${summary.averageAttendanceRate == null ? 0 : summary.averageAttendanceRate}%`,
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

        <div className="flex-1 min-w-0">
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

        <div className="flex-1 min-w-0">
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

function AttendanceMetricRow({
  candidate,
  compact = false,
}: AttendanceMetricRowProps) {
  return (
    <div
      className={
        compact ? "mt-3 grid grid-cols-4 gap-2" : "mt-4 grid grid-cols-4 gap-2"
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
