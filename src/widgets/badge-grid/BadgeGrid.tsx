import type { Badge } from "../../shared/types/badge";
import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

type BadgeGridProps = {
  badges: Badge[];
  compact?: boolean;
  onBadgeClick?: (badge: Badge) => void;
};

export function BadgeGrid({
  badges,
  compact = false,
  onBadgeClick
}: BadgeGridProps) {
  return (
    <div className={compact ? "grid grid-cols-3 gap-3" : "grid grid-cols-4 gap-3"}>
      {badges.map((badge) => (
        <button
          key={badge.id}
          type="button"
          onClick={() => onBadgeClick?.(badge)}
          className="text-left"
        >
          <BuddyCard padding="sm" className="h-full">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <div className="text-4xl leading-none">{badge.icon}</div>
              <div className="text-center text-sm font-semibold text-buddyText">
                {badge.name}
              </div>
            </div>
          </BuddyCard>
        </button>
      ))}
    </div>
  );
}
