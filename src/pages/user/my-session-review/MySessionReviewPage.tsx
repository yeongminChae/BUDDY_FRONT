import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userPastSessionReviewMockMap } from "../../../mocks/session-history.mock";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { BuddyCheckbox } from "../../../shared/ui/buddy-checkbox/BuddyCheckbox";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";

export function MySessionReviewPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const session = useMemo(() => {
    const numericId = Number(sessionId);
    return userPastSessionReviewMockMap[numericId] ?? userPastSessionReviewMockMap[101];
  }, [sessionId]);

  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={() => navigate("/mypage")} />
      <PageTitle title="내 세션 복습" subtitle={session.title} />

      <div className="space-y-6">
        <BuddyCard>
          <div className="space-y-2 text-sm text-buddySubText">
            <div>{session.dateTime}</div>
            <div>{session.place}</div>
          </div>
        </BuddyCard>

        <SectionBlock title="오늘의 주제">
          <BuddyCard>
            <div className="space-y-3">
              <div className="font-semibold text-buddyText">{session.topicTitle}</div>
              <div className="space-y-2">
                {session.topicQuestions.map((question) => (
                  <div key={question} className="rounded-xl bg-[#F8FAFA] px-4 py-3 text-sm text-buddyText">
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </BuddyCard>
        </SectionBlock>

        <SectionBlock title="추천 표현">
          <div className="space-y-2">
            {session.recommendedExpressions.map((expression) => (
              <BuddyCheckbox
                key={expression}
                checked={session.checkedExpressions.includes(expression)}
                label={expression}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="내 메모">
          <BuddyCard>
            <div className="text-sm text-buddyText">{session.myMemo}</div>
          </BuddyCard>
        </SectionBlock>
      </div>
    </AppShell>
  );
}
