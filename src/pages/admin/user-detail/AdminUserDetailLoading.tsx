import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import {
  SkeletonCardBlock,
  SkeletonMetricBlock,
  SkeletonUserHero,
} from "./SkeletonUser";

type AdminUserDetailLoadingProps = {
  onBackBtnClick: () => void;
};

export function AdminUserDetailLoading({
  onBackBtnClick,
}: AdminUserDetailLoadingProps) {
  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={onBackBtnClick} />

      <PageTitle title="유저 상세" subtitle="유저 정보를 불러오고 있어요." />

      <div className="pb-8 space-y-4">
        <SkeletonUserHero />
        <SkeletonMetricBlock />
        <SkeletonCardBlock />
        <SkeletonCardBlock />
      </div>
    </AppShell>
  );
}
