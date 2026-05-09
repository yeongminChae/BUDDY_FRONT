import { badgeCatalogMock } from "../../../mocks/badge.mock";
import type { Badge } from "../../../shared/types/badge";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { BadgeDetailSheet } from "../../../widgets/badge-detail-sheet/BadgeDetailSheet";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { adminUserDetailMockMap } from "../../../mocks/admin-user.mock";

export function AdminUserBadgePage() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  
    const user = useMemo(() => {
      const numericId = Number(userId);
      return adminUserDetailMockMap[numericId] ?? adminUserDetailMockMap[1];
    }, [userId]);
  
    const [assignedBadges, setAssignedBadges] = useState(user.badges);
  
    const handleAssignBadge = (badgeId: string) => {
      const target = badgeCatalogMock.find((badge) => badge.id === badgeId);
      if (target == null) return;
  
      setAssignedBadges((prev) => {
        if (prev.some((badge) => badge.id === badgeId)) return prev;
        return [...prev, target];
      });
    };
  
    const handleRemoveBadge = (badgeId: string) => {
      setAssignedBadges((prev) => prev.filter((badge) => badge.id !== badgeId));
    };
  
    return (
      <AppShell>
        <AppHeader
          showBackButton
          title="Buddy"
          onBack={() => navigate(`/admin/users/${user.id}`)}
        />
        <PageTitle title="유저 뱃지 관리" subtitle={`${user.name}의 뱃지를 관리할 수 있어요.`} />
  
        <div className="space-y-6">
          <SectionBlock title="보유 뱃지">
            <div className="grid grid-cols-2 gap-3">
              {assignedBadges.map((badge) => (
                <BuddyCard key={badge.id} padding="sm">
                  <div className="flex flex-col items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const fullBadge = badgeCatalogMock.find((item) => item.id === badge.id);
                        setSelectedBadge(fullBadge ?? null);
                      }}
                      className="flex flex-col items-center w-full gap-2"
                    >
                      <div className="text-4xl leading-none">{badge.icon}</div>
                      <div className="text-sm font-semibold text-center text-buddyText">
                        {badge.name}
                      </div>
                    </button>
  
                    <BuddyButton
                      fullWidth
                      variant="danger"
                      onClick={() => handleRemoveBadge(badge.id)}
                    >
                      제거
                    </BuddyButton>
                  </div>
                </BuddyCard>
              ))}
            </div>
          </SectionBlock>
  
          <SectionBlock title="뱃지 추가">
            <div className="grid grid-cols-2 gap-3">
              {badgeCatalogMock.map((badge) => {
                const alreadyAssigned = assignedBadges.some((item) => item.id === badge.id);
  
                return (
                  <BuddyCard key={badge.id} padding="sm">
                    <div className="flex flex-col items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedBadge(badge)}
                        className="flex flex-col items-center w-full gap-2"
                      >
                        <div className="text-4xl leading-none">{badge.icon}</div>
                        <div className="text-sm font-semibold text-center text-buddyText">
                          {badge.name}
                        </div>
                      </button>
  
                      {alreadyAssigned ? (
                        <BuddyButton fullWidth variant="secondary" disabled>
                          이미 보유
                        </BuddyButton>
                      ) : (
                        <BuddyButton fullWidth onClick={() => handleAssignBadge(badge.id)}>
                          추가
                        </BuddyButton>
                      )}
                    </div>
                  </BuddyCard>
                );
              })}
            </div>
          </SectionBlock>
        </div>
  
        <BadgeDetailSheet badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
      </AppShell>
    );
  }