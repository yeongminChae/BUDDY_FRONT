import { BuddyButton } from "../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

import { CalendarDays, MapPin, Users } from "lucide-react";

type SessionCardProps = {
  title: string;
  dateTime: string;
  place: string;
  participant: string;
  actionLabel?: string;
  onActionClick?: () => void;
  onCardClick?: () => void;
};

export function SessionCard({
  title,
  dateTime,
  place,
  participant,
  actionLabel = "관리하기",
  onActionClick,
  onCardClick,
}: SessionCardProps) {
  const isClickable = onCardClick != null;

  return (
    <BuddyCard
      className={
        isClickable
          ? "cursor-pointer transition hover:-translate-y-0.5 hover:bg-[#F9FBFB]"
          : "transition hover:-translate-y-0.5 hover:bg-[#F9FBFB]"
      }
    >
      <div
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={onCardClick}
        onKeyDown={(event) => {
          if (onCardClick == null) return;

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onCardClick();
          }
        }}
        className="block w-full text-left"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#3AAFA9]">SESSION</p>
              <h2 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-[#2F3A40]">
                {title}
              </h2>
            </div>

            <div className="shrink-0 rounded-full bg-[#DFF5F3] px-3 py-1 text-xs font-bold text-[#2F3A40]">
              참석 {participant}명
            </div>
          </div>

          <div className="space-y-2.5 rounded-2xl bg-[#F3F5F6] px-4 py-3">
            <InfoRow icon={<CalendarDays size={15} />} text={dateTime} />
            <InfoRow icon={<MapPin size={15} />} text={place} />
            <InfoRow icon={<Users size={15} />} text={`참석 ${participant}`} />
          </div>

          {onActionClick != null && (
            <BuddyButton
              type="button"
              variant="secondary"
              fullWidth
              onClick={(event) => {
                event.stopPropagation();
                onActionClick();
              }}
            >
              {actionLabel}
            </BuddyButton>
          )}
        </div>
      </div>
    </BuddyCard>
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
