import { BuddyButton } from "../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

type ParticipantRowProps = {
  name: string;
  nickname: string;
  email: string;
  actionLabel?: string;
  actionVariant?: "primary" | "secondary" | "danger";
  onActionClick?: () => void;
};

export function ParticipantRow({
  name,
  nickname,
  email,
  actionLabel = "제거",
  actionVariant = "danger",
  onActionClick,
}: ParticipantRowProps) {
  return (
    <BuddyCard>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1">
            <div className="text-base font-semibold text-buddyText">{name}</div>
            <div> · </div>
            <div className="text-base font-semibold text-buddySubText">
              {nickname}
            </div>
          </div>
          <div className="text-sm text-buddySubText">{email}</div>
        </div>
        <BuddyButton variant={actionVariant} onClick={onActionClick}>
          {actionLabel}
        </BuddyButton>
      </div>
    </BuddyCard>
  );
}
