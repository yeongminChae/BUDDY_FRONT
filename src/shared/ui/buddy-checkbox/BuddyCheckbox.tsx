type BuddyCheckboxProps = {
  checked: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
};

export function BuddyCheckbox({
  checked,
  label,
  onChange
}: BuddyCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className="flex w-full items-center gap-3 rounded-xl bg-[#F8FAFA] px-4 py-3 text-left"
    >
      <span
        className={
          checked
            ? "flex h-5 w-5 items-center justify-center rounded border border-buddyPrimary bg-buddyPrimary text-xs text-white"
            : "flex h-5 w-5 items-center justify-center rounded border border-buddyLine bg-white"
        }
      >
        {checked ? "✓" : ""}
      </span>
      <span className="text-sm text-buddyText">{label}</span>
    </button>
  );
}
