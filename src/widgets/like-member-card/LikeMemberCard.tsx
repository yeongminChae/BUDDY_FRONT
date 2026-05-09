import { BuddyBadge } from "../../shared/ui/buddy-badge/BuddyBadge";
import { BuddyButton } from "../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

type LikeMemberCardProps = {
  name: string;
  intro?: string;
  tableName: string;
  round: 1 | 2;
  alreadyLiked?: boolean;
  onLikeClick?: () => void;
  onProfileClick?: () => void;
};

export function LikeMemberCard({
  name,
  intro,
  tableName,
  round,
  alreadyLiked = false,
  onLikeClick,
  onProfileClick
}: LikeMemberCardProps) {
  return (
    <BuddyCard>
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={onProfileClick}
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-buddyMintLight text-base font-semibold text-buddyText">
            {name.charAt(0)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-base font-semibold text-buddyText">{name}</div>
              <BuddyBadge label={tableName} tone="gray" />
              <BuddyBadge label={`R${round}`} tone="mint" />
            </div>
            <div className="mt-1 text-sm text-buddySubText">
              {intro ? intro : "같은 테이블에서 함께 대화한 멤버예요."}
            </div>
          </div>
        </button>

        {alreadyLiked ? (
          <BuddyButton variant="secondary" disabled>
            좋아요 보냄
          </BuddyButton>
        ) : (
          <BuddyButton onClick={onLikeClick}>좋아요</BuddyButton>
        )}
      </div>
    </BuddyCard>
  );
}
