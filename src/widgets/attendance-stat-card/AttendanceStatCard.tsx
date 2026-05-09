import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

type AttendanceStatCardProps = {
  totalAttendance?: number;
  monthlyAttendance?: number;
  percentile?: number;
};

export function AttendanceStatCard({
  totalAttendance = 0,
  monthlyAttendance = 0,
  percentile = 0
}: AttendanceStatCardProps) {
  return (
    <BuddyCard>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-[#F8FAFA] px-3 py-4 text-center">
          <div className="text-lg font-semibold text-buddyText">{totalAttendance}</div>
          <div className="mt-1 text-xs text-buddySubText">총 출석</div>
        </div>
        <div className="rounded-xl bg-[#F8FAFA] px-3 py-4 text-center">
          <div className="text-lg font-semibold text-buddyText">{monthlyAttendance}</div>
          <div className="mt-1 text-xs text-buddySubText">이번 달</div>
        </div>
        <div className="rounded-xl bg-[#F8FAFA] px-3 py-4 text-center">
          <div className="text-lg font-semibold text-buddyText">{percentile}%</div>
          <div className="mt-1 text-xs text-buddySubText">상위 비율</div>
        </div>
      </div>
    </BuddyCard>
  );
}
