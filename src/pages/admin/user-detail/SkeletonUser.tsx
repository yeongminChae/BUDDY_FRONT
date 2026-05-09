import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";

export function SkeletonUserHero() {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 animate-pulse rounded-2xl bg-[#DFF5F3]" />

          <div className="flex-1 min-w-0 space-y-3">
            <div className="h-3 w-28 animate-pulse rounded-full bg-[#E2E6E8]" />
            <div className="h-6 w-44 animate-pulse rounded-full bg-[#E2E6E8]" />
            <div className="flex gap-2">
              <div className="h-6 w-14 animate-pulse rounded-full bg-[#F3F5F6]" />
              <div className="h-6 w-14 animate-pulse rounded-full bg-[#DFF5F3]" />
            </div>
          </div>
        </div>

        <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />

        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
          <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
          <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
        </div>
      </div>
    </BuddyCard>
  );
}

export function SkeletonMetricBlock() {
  return (
    <div className="space-y-3">
      <div className="h-5 w-36 animate-pulse rounded-full bg-[#E2E6E8]" />

      <div className="grid grid-cols-2 gap-3">
        <div className="h-24 bg-white shadow-sm animate-pulse rounded-2xl" />
        <div className="h-24 bg-white shadow-sm animate-pulse rounded-2xl" />
        <div className="h-24 bg-white shadow-sm animate-pulse rounded-2xl" />
        <div className="h-24 bg-white shadow-sm animate-pulse rounded-2xl" />
      </div>
    </div>
  );
}

export function SkeletonCardBlock() {
  return (
    <div className="space-y-3">
      <div className="h-5 w-32 animate-pulse rounded-full bg-[#E2E6E8]" />

      <BuddyCard>
        <div className="space-y-3">
          <div className="h-4 w-32 animate-pulse rounded-full bg-[#E2E6E8]" />
          <div className="h-5 w-52 animate-pulse rounded-full bg-[#E2E6E8]" />
          <div className="h-4 w-40 animate-pulse rounded-full bg-[#F3F5F6]" />
        </div>
      </BuddyCard>
    </div>
  );
}
