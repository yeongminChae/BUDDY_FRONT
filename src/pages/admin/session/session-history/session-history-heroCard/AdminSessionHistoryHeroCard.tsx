import { BuddyCard } from "../../../../../shared/ui/buddy-card/BuddyCard";

type SessionHeroCardProps = {
  title: string;
  dateTime: string;
  place: string;
  attendanceRate: number;
  attendedCount: number;
  appliedCount: number;
};

export function SessionHeroCard({
  title,
  dateTime,
  place,
  attendanceRate,
  attendedCount,
  appliedCount,
}: SessionHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">
              SESSION REPORT
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#2F3A40]">
              {title}
            </h2>
            <p className="mt-2 text-sm text-[#6C7A80]">{dateTime}</p>
            <p className="mt-1 text-sm text-[#6C7A80]">{place}</p>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#DFF5F3] px-4 py-3 text-center">
            <p className="text-xs font-medium text-[#6C7A80]">출석률</p>
            <p className="mt-1 text-xl font-bold text-[#3AAFA9]">
              {attendanceRate}%
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F3F5F6] px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[#6C7A80]">참석 인원</span>
            <span className="font-bold text-[#2F3A40]">
              {attendedCount} / {appliedCount}명
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E2E6E8]">
            <div
              className="h-full rounded-full bg-[#3AAFA9]"
              style={{ width: `${Math.min(attendanceRate, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </BuddyCard>
  );
}
