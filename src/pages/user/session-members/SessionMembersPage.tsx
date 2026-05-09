import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sessionMembersMockMap } from "../../../mocks/member.mock";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { MemberListItem } from "../../../widgets/member-list-item/MemberListItem";

export function SessionMembersPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const session = useMemo(() => {
    const numericId = Number(sessionId);
    return sessionMembersMockMap[numericId] ?? sessionMembersMockMap[1];
  }, [sessionId]);

  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={() => navigate(-1)} />
      <PageTitle title="참석 멤버" subtitle={session.title} />

      <div className="space-y-6">
        <SectionBlock>
          <BuddyButton fullWidth variant="secondary">
            카카오톡으로 일정 공유하기
          </BuddyButton>
        </SectionBlock>

        <SectionBlock title={session.dateLabel}>
          <div className="space-y-3">
            {session.members.map((member) => (
              <button
                key={member.id}
                type="button"
                className="block w-full text-left"
                onClick={() => navigate(`/users/${member.id}`)}
              >
                <MemberListItem
                  name={member.name}
                  intro={member.intro}
                  badge={member.badge}
                  isNew={member.isNew}
                />
              </button>
            ))}
          </div>
        </SectionBlock>

        <BuddyCard className="text-sm text-buddySubText">
          멤버를 누르면 해당 멤버의 프로필로 이동해요.
        </BuddyCard>
      </div>
    </AppShell>
  );
}
