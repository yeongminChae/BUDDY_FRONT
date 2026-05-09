import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";
import { BuddyBadge } from "../../shared/ui/buddy-badge/BuddyBadge";

type MemberListItemProps = {
  name: string;
  intro?: string;
  badge?: string;
  isNew?: boolean;
};

export function MemberListItem({
  name,
  intro,
  badge,
  isNew = false
}: MemberListItemProps) {
  return (
    <BuddyCard padding="sm">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-buddyMintLight text-base font-semibold text-buddyText">
          {name.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-buddyText">{name}</span>
            {isNew ? <span className="text-sm font-semibold text-[#FF6B57]">NEW</span> : null}
            {badge ? <BuddyBadge label={badge} tone="warning" /> : null}
          </div>

          {intro ? (
            <p className="mt-1 text-sm text-buddySubText">{intro}</p>
          ) : (
            <p className="mt-1 text-sm text-buddySubText">.</p>
          )}
        </div>
      </div>
    </BuddyCard>
  );
}
