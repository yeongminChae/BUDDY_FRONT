import type { ReactNode } from "react";
import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

type TableCardProps = {
  tableName: string;
  participantCount: number;
  children: ReactNode;
};

export function TableCard({
  tableName,
  participantCount,
  children
}: TableCardProps) {
  return (
    <BuddyCard>
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold text-buddyText">{tableName}</div>
        <div className="text-sm text-buddySubText">{participantCount}명</div>
      </div>
      <div className="space-y-2">{children}</div>
    </BuddyCard>
  );
}
