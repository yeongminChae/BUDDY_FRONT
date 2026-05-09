import type { Badge } from "../../shared/types/badge";

type BadgeDetailSheetProps = {
  badge?: Badge | null;
  onClose?: () => void;
};

export function BadgeDetailSheet({
  badge,
  onClose
}: BadgeDetailSheetProps) {
  if (badge == null) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-0 right-0">
        <div className="mx-auto max-w-buddy rounded-t-3xl bg-white px-5 pb-8 pt-5 shadow-2xl">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-buddyLine" />
          <div className="flex items-center gap-4">
            <div className="text-5xl leading-none">{badge.icon}</div>
            <div>
              <div className="text-lg font-semibold text-buddyText">{badge.name}</div>
              <div className="mt-1 text-sm text-buddySubText">{badge.description}</div>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-[#F8FAFA] px-4 py-3">
            <div className="text-xs font-semibold text-buddySubText">획득일</div>
            <div className="mt-1 text-sm text-buddyText">{badge.acquiredAt ?? "미획득"}</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 h-12 w-full rounded-buddyButton bg-gradient-to-r from-buddyPrimary to-buddyPrimarySoft font-semibold text-white shadow-buddyButton"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
