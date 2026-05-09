type BuddyDividerProps = {
  className?: string;
};

export function BuddyDivider({ className = "" }: BuddyDividerProps) {
  return <div className={["h-px w-full bg-buddyLine", className].join(" ")} />;
}
