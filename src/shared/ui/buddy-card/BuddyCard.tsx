import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type BuddyCardProps = {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
  className?: string;
};

export function BuddyCard({
  children,
  padding = "md",
  className
}: BuddyCardProps) {
  return (
    <div
      className={cn(
        "rounded-buddyCard bg-buddyCard shadow-buddyCard",
        padding === "sm" && "p-4",
        padding === "md" && "p-5",
        padding === "lg" && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
