import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";

type AdminUserDetailErrorProps = {
  onBackBtnClick: () => void;
  onRetry: () => void;
};

export function AdminUserDetailError({
  onBackBtnClick,
  onRetry,
}: AdminUserDetailErrorProps) {
  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={onBackBtnClick} />

      <PageTitle title="유저 상세" subtitle="유저 정보를 불러오지 못했어요." />

      <div className="mt-6">
        <BuddyCard>
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F6] text-[#6C7A80]">
              !
            </div>

            <div>
              <p className="text-sm font-bold text-[#2F3A40]">
                유저 상세 조회에 실패했어요
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
                잠시 후 다시 시도하거나 유저 목록에서 다시 선택해주세요.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <BuddyButton fullWidth variant="secondary" onClick={onRetry}>
                다시 불러오기
              </BuddyButton>

              <BuddyButton fullWidth variant="ghost" onClick={onBackBtnClick}>
                유저 목록으로 돌아가기
              </BuddyButton>
            </div>
          </div>
        </BuddyCard>
      </div>
    </AppShell>
  );
}
