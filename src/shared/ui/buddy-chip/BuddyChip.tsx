type BuddyChipProps = {
  label: string;
  removable?: boolean;
  onRemove?: () => void;
};

export function BuddyChip({
  label,
  removable = false,
  onRemove
}: BuddyChipProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-buddyMintLight px-3 py-2 text-sm text-buddyText">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold">
        {label.charAt(0)}
      </span>
      <span>{label}</span>
      {removable ? (
        <button type="button" onClick={onRemove} className="text-buddyDanger">
          ×
        </button>
      ) : null}
    </div>
  );
}
