import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userProfileMockMap } from "../../../mocks/badge.mock";
import type { Badge } from "../../../shared/types/badge";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { ProfileSummaryCard } from "../../../widgets/profile-summary-card/ProfileSummaryCard";
import { BadgeGrid } from "../../../widgets/badge-grid/BadgeGrid";
import { BadgeDetailSheet } from "../../../widgets/badge-detail-sheet/BadgeDetailSheet";

export function UserProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const user = useMemo(() => {
    const numericId = Number(userId);
    return userProfileMockMap[numericId] ?? userProfileMockMap[1];
  }, [userId]);

  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={() => navigate(-1)} />
      <PageTitle title="멤버 프로필" />

      <div className="space-y-6">
        <ProfileSummaryCard
          name={user.name}
          level={user.level}
          mbti={user.mbti}
          intro={user.intro}
          hideLikes={true}
        />

        <SectionBlock title="획득 뱃지">
          <BadgeGrid badges={user.badges} onBadgeClick={setSelectedBadge} />
        </SectionBlock>

        <SectionBlock title="최근 활동">
          <BuddyCard>
            <div className="text-sm text-buddySubText">{user.recentActivity}</div>
          </BuddyCard>
        </SectionBlock>
      </div>

      <BadgeDetailSheet badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </AppShell>
  );
}
