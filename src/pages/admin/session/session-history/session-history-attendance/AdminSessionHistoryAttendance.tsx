import { SectionBlock } from "../../../../../shared/ui/section-block/SectionBlock";

type AttendanceSummarySectionProps = {
  attendedCount: number;
  appliedCount: number;
  noShowCount: number;
  attendanceRate: number;
};

export function AttendanceSummarySection({
  attendedCount,
  appliedCount,
  noShowCount,
  attendanceRate,
}: AttendanceSummarySectionProps) {
  const summaryItems = [
    {
      label: "신청",
      value: `${appliedCount}명`,
      description: "세션 신청 인원",
    },
    {
      label: "참석",
      value: `${attendedCount}명`,
      description: "실제 출석 인원",
    },
    {
      label: "노쇼",
      value: `${noShowCount}명`,
      description: "신청 후 불참",
    },
    {
      label: "출석률",
      value: `${attendanceRate}%`,
      description: "참석 / 신청 기준",
    },
  ];

  return (
    <SectionBlock title="출석 요약">
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
