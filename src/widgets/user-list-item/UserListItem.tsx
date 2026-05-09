import { BuddyBadge } from "../../shared/ui/buddy-badge/BuddyBadge";
import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

type UserListItemProps = {
  name: string;
  nickname: string;
  level: number;
  attendanceRate: number;
  recentSession: string;
  status: "ACTIVE" | "INACTIVE" | "STAFF";
  onClick?: () => void;
};

export function UserListItem({
  name,
  nickname,
  level,
  attendanceRate,
  recentSession,
  status,
  onClick,
}: UserListItemProps) {
  const tone =
    status === "STAFF" ? "mint" : status === "INACTIVE" ? "warning" : "gray";

  return (
    <button type="button" className="block w-full text-left" onClick={onClick}>
      <BuddyCard>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-between gap-1">
                <div className="text-base font-semibold text-buddyText">
                  {name}
                </div>
                <div> · </div>
                <div className="text-base font-semibold text-buddySubText">
                  {nickname}
                </div>
              </div>

              <BuddyBadge label={`L${level}`} tone="mint" />
              <BuddyBadge label={status} tone={tone} />
            </div>
            <div className="mt-2 text-sm text-buddySubText">
              최근 30일 출석률 {attendanceRate}%
            </div>
            <div className="mt-1 text-sm truncate text-buddySubText">
              최근 참석: {recentSession}
            </div>
          </div>
          <div className="pt-1 text-buddySubText">{">"}</div>
        </div>
      </BuddyCard>
    </button>
  );
}
