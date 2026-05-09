import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { badgeCatalogMock, myProfileMock } from "../../../mocks/badge.mock";
import type { Badge } from "../../../shared/types/badge";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { BadgeDetailSheet } from "../../../widgets/badge-detail-sheet/BadgeDetailSheet";

export function BadgeManagePage() {
  const navigate = useNavigate();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [representativeIds, setRepresentativeIds] = useState<string[]>(
    myProfileMock.representativeBadgeIds ?? []
  );

  const representativeBadges = useMemo(() => {
    return badgeCatalogMock.filter((badge) => representativeIds.includes(badge.id));
  }, [representativeIds]);

  const handleAddRepresentative = (badgeId: string) => {
    setRepresentativeIds((prev) => {
      if (prev.includes(badgeId)) return prev;
      if (prev.length >= 3) return prev;
      return [...prev, badgeId];
    });
  };

  const handleRemoveRepresentative = (badgeId: string) => {
    setRepresentativeIds((prev) => prev.filter((id) => id !== badgeId));
  };

  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={() => navigate(-1)} />
      <PageTitle title="대표 뱃지 관리" subtitle="프로필 상단에 노출할 대표 뱃지를 최대 3개까지 고를 수 있어요." />

      <div className="space-y-6">
        <SectionBlock title={`현재 대표 뱃지 (${representativeIds.length}/3)`}>
          <div className="grid grid-cols-3 gap-3">
            {representativeBadges.map((badge) => (
              <BuddyCard key={badge.id} padding="sm">
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBadge(badge)}
                    className="flex w-full flex-col items-center gap-2"
                  >
                    <div className="text-4xl leading-none">{badge.icon}</div>
                    <div className="text-center text-sm font-semibold text-buddyText">{badge.name}</div>
                  </button>
                  <BuddyButton fullWidth variant="danger" onClick={() => handleRemoveRepresentative(badge.id)}>
                    제거
                  </BuddyButton>
                </div>
              </BuddyCard>
            ))}
          </div>

          {representativeBadges.length === 0 ? (
            <BuddyCard className="text-sm text-buddySubText">
              아직 대표 뱃지가 없어요. 아래 보유 뱃지에서 선택해보세요.
            </BuddyCard>
          ) : null}
        </SectionBlock>

        <SectionBlock title="보유 뱃지 전체">
          <div className="grid grid-cols-2 gap-3">
            {badgeCatalogMock.map((badge) => {
              const isSelected = representativeIds.includes(badge.id);

              return (
                <BuddyCard key={badge.id} padding="sm">
                  <div className="flex flex-col items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedBadge(badge)}
                      className="flex w-full flex-col items-center gap-2"
                    >
                      <div className="text-4xl leading-none">{badge.icon}</div>
                      <div className="text-center text-sm font-semibold text-buddyText">{badge.name}</div>
                    </button>

                    {isSelected ? (
                      <BuddyButton fullWidth variant="secondary" onClick={() => handleRemoveRepresentative(badge.id)}>
                        선택 해제
                      </BuddyButton>
                    ) : (
                      <BuddyButton fullWidth onClick={() => handleAddRepresentative(badge.id)}>
                        대표로 선택
                      </BuddyButton>
                    )}
                  </div>
                </BuddyCard>
              );
            })}
          </div>
        </SectionBlock>

        <BuddyCard className="text-sm text-buddySubText">
          이 화면은 scaffold 상태라 저장 버튼을 눌러도 로컬 상태만 반영돼요.
        </BuddyCard>

        <BuddyButton fullWidth onClick={() => navigate("/mypage")}>
          저장하고 돌아가기
        </BuddyButton>
      </div>

      <BadgeDetailSheet badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </AppShell>
  );
}
