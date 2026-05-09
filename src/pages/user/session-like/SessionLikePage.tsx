import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sessionLikeMockMap } from "../../../mocks/session-like.mock";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { LikeMemberCard } from "../../../widgets/like-member-card/LikeMemberCard";

export function SessionLikePage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [likedMemberIds, setLikedMemberIds] = useState<number[]>([]);

  const session = useMemo(() => {
    const numericId = Number(sessionId);
    return sessionLikeMockMap[numericId] ?? sessionLikeMockMap[1];
  }, [sessionId]);

  const handleLike = (memberId: number) => {
    setLikedMemberIds((prev) => {
      if (prev.includes(memberId)) {
        return prev;
      }

      if (prev.length >= session.likeLimit - session.sentLikeCount) {
        return prev;
      }

      return [...prev, memberId];
    });
  };

  const currentLikedCount = session.sentLikeCount + likedMemberIds.length;

  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={() => navigate(-1)} />
      <PageTitle
        title="같이 대화한 멤버에게 좋아요"
        subtitle={session.sessionTitle}
      />

      <div className="space-y-6">
        <BuddyCard>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-buddyText">
              세션 종료 후 같은 테이블 멤버에게만 좋아요를 보낼 수 있어요.
            </div>
            <div className="text-sm text-buddySubText">
              좋아요 가능 수: {currentLikedCount} / {session.likeLimit}
            </div>
          </div>
        </BuddyCard>

        {session.isSessionClosed ? (
          <SectionBlock title="오늘 함께한 멤버">
            <div className="space-y-3">
              {session.members.map((member) => (
                <LikeMemberCard
                  key={member.id}
                  name={member.name}
                  intro={member.intro}
                  tableName={member.tableName}
                  round={member.round}
                  alreadyLiked={member.alreadyLiked || likedMemberIds.includes(member.id)}
                  onLikeClick={() => handleLike(member.id)}
                  onProfileClick={() => navigate(`/users/${member.id}`)}
                />
              ))}
            </div>
          </SectionBlock>
        ) : (
          <BuddyCard>
            <div className="text-sm text-buddySubText">
              세션이 종료된 뒤에만 좋아요를 보낼 수 있어요.
            </div>
          </BuddyCard>
        )}
      </div>
    </AppShell>
  );
}
