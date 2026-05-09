type BuddyBadgeProps = {
  label: string;
  tone?: "mint" | "gray" | "warning";
};

export function BuddyBadge({ label, tone = "gray" }: BuddyBadgeProps) {
  const toneClass =
    tone === "mint"
      ? "bg-buddyMintLight text-buddyPrimary"
      : tone === "warning"
        ? "bg-[#FFF4E5] text-[#B7791F]"
        : "bg-[#F4F6F7] text-buddySubText";

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${toneClass}`}>
      {label}
    </span>
  );
}
