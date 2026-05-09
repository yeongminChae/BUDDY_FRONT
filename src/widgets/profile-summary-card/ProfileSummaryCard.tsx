import { BuddyBadge } from "../../shared/ui/buddy-badge/BuddyBadge";
import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

type RepresentativeBadge = {
  id: string;
  icon: string;
  name: string;
};

type ProfileSummaryCardProps = {
  name: string;
  level: number;
  mbti?: string;
  intro?: string;
  likesCount?: number;
  hideLikes?: boolean;
  representativeBadges?: RepresentativeBadge[];
  onRepresentativeBadgesClick?: () => void;
};

export function ProfileSummaryCard({
  name,
  level,
  mbti,
  intro,
  likesCount,
  hideLikes = false,
  representativeBadges = [],
  onRepresentativeBadgesClick
}: ProfileSummaryCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 text-base font-semibold rounded-full bg-buddyMintLight text-buddyText">
            {name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-buddyText">{name}</span>
              <BuddyBadge label={`L${level}`} tone="mint" />
              <BuddyBadge label={`${mbti}`} tone="mint" />
            </div>
            <div className="mt-1 text-sm text-buddySubText">
              {intro ? intro : "English Buddy Member"}
            </div>
          </div>
        </div>

        {hideLikes == false ? (
          <div className="rounded-xl bg-[#F8FAFA] px-4 py-3 text-sm text-buddySubText">
            받은 좋아요 {likesCount ?? 0}개
          </div>
        ) : null}

        {representativeBadges.length > 0 ? (
          <button
            type="button"
            onClick={onRepresentativeBadgesClick}
            className="w-full px-4 py-4 text-left bg-white border rounded-xl border-buddyLine"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-buddyText">대표 뱃지</div>
              <div className="text-xs text-buddyPrimary">관리</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {representativeBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center gap-2 rounded-xl bg-[#F8FAFA] px-2 py-3"
                >
                  <div className="text-3xl leading-none">{badge.icon}</div>
                  <div className="text-xs font-semibold text-center text-buddyText">
                    {badge.name}
                  </div>
                </div>
              ))}
            </div>
          </button>
        ) : null}
      </div>
    </BuddyCard>
  );
}
