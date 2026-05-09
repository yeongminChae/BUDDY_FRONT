type BuddyTabItem = {
  label: string;
  value: string;
};

type BuddyTabsProps = {
  items: BuddyTabItem[];
  value: string;
  onChange?: (value: string) => void;
};

export function BuddyTabs({ items, value, onChange }: BuddyTabsProps) {
  return (
    <div className="mb-4 flex gap-6 border-b border-buddyLine">
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange?.(item.value)}
            className={
              isActive
                ? "border-b-2 border-buddyPrimary pb-2 text-sm font-semibold text-buddyPrimary"
                : "pb-2 text-sm font-semibold text-buddySubText"
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
