import { BuddyCard } from "../buddy-card/BuddyCard";

type BuddyLoadingCardProps = {
  title?: string;
  description?: string;
};

export function BuddyLoadingCard({
  title = "정보를 불러오고 있어요",
  description = "잠시만 기다려주세요.",
}: BuddyLoadingCardProps) {
  return (
    <BuddyCard>
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#E2E6E8] border-t-[#3AAFA9]" />

        <div className="text-center">
          <p className="text-sm font-bold text-[#2F3A40]">{title}</p>
          <p className="mt-1 text-xs text-[#6C7A80]">{description}</p>
        </div>
      </div>
    </BuddyCard>
  );
}
