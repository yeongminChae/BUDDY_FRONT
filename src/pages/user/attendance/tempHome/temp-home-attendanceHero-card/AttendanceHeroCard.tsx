import { CalendarDays, MapPin, PenLine, UserRound } from "lucide-react";
import { BuddyCard } from "../../../../../shared/ui/buddy-card/BuddyCard";
import type { GetAttendanceSessionDetailResponse } from "../../../../../features/user/attendance/attendance-session/model/GetAttendanceSessionDetailResponse";

type AttendanceHeroCardProps = {
  displayName: string;
  sessionDetail?: GetAttendanceSessionDetailResponse;
  phrase: string;
};

export function AttendanceHeroCard({
  displayName,
  sessionDetail,
  phrase,
}: AttendanceHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-lg font-bold text-[#3AAFA9]">
            {displayName.slice(0, 1)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">
              ATTENDANCE CHECK
            </p>
            <h2 className="mt-2 truncate text-lg font-bold text-[#2F3A40]">
              {displayName}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
              세션 참여 확인을 위해 정보를 입력해주세요.
            </p>
          </div>
        </div>

        {sessionDetail != null && (
          <div className="space-y-2.5 rounded-2xl bg-[#F3F5F6] px-4 py-3">
            <InfoRow
              icon={<CalendarDays size={15} />}
              text={`${sessionDetail.title} · ${sessionDetail.startsAt}`}
            />
            <InfoRow
              icon={<MapPin size={15} />}
              text={sessionDetail.location}
            />
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <MiniPreviewCard
            icon={<CalendarDays size={15} />}
            label="세션"
            value={sessionDetail == null ? "선택 전" : "선택됨"}
          />
          <MiniPreviewCard
            icon={<UserRound size={15} />}
            label="본인 확인"
            value={displayName === "참석자" ? "입력 전" : "입력됨"}
          />
          <MiniPreviewCard
            icon={<PenLine size={15} />}
            label="표현"
            value={phrase.trim() === "" ? "입력 전" : "입력됨"}
          />
        </div>
      </div>
    </BuddyCard>
  );
}

type MiniPreviewCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function MiniPreviewCard({ icon, label, value }: MiniPreviewCardProps) {
  return (
    <div className="rounded-2xl bg-[#F3F5F6] px-3 py-3 text-center">
      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-xl bg-white text-[#3AAFA9]">
        {icon}
      </div>
      <p className="mt-2 text-[11px] font-medium text-[#6C7A80]">{label}</p>
      <p className="mt-1 truncate text-xs font-bold text-[#2F3A40]">{value}</p>
    </div>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  text: string;
};

function InfoRow({ icon, text }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#6C7A80]">
      <span className="shrink-0 text-[#6C7A80]">{icon}</span>
      <span className="min-w-0 truncate">{text}</span>
    </div>
  );
}
