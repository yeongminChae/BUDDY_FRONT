import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { homeSessionMock } from "../../../mocks/home.mock";
import { sessionTopicMock } from "../../../mocks/topic.mock";
import { sessionLikeMockMap } from "../../../mocks/session-like.mock";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { BuddyCheckbox } from "../../../shared/ui/buddy-checkbox/BuddyCheckbox";
import { BuddyInput } from "../../../shared/ui/buddy-input/BuddyInput";
import { BuddyTabs } from "../../../shared/ui/buddy-tabs/BuddyTabs";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { TableCard } from "../../../widgets/table-card/TableCard";
import { TableMemberRow } from "../../../widgets/table-card/TableMemberRow";
import { TopicCard } from "../../../widgets/topic-card/TopicCard";

const tableMembersRound1 = [
  { id: 1, name: "Alex", email: "alex@email.com" },
  { id: 2, name: "Jamie", email: "jamie@email.com" },
  { id: 3, name: "Chris", email: "chris@email.com" },
];

const tableMembersRound2 = [
  { id: 4, name: "Mina", email: "mina@email.com" },
  { id: 5, name: "John", email: "john@email.com" },
  { id: 6, name: "Emma", email: "emma@email.com" },
];

export function SessionDetailPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [round, setRound] = useState("round1");
  const [checkedExpressions, setCheckedExpressions] = useState<string[]>([]);

  const session = useMemo(() => {
    const numericId = Number(sessionId);
    return (
      homeSessionMock.find((item) => item.sessionId === numericId) ??
      homeSessionMock[0]
    );
  }, [sessionId]);

  const likeState = useMemo(() => {
    const numericId = Number(sessionId);
    return sessionLikeMockMap[numericId];
  }, [sessionId]);

  const currentMembers =
    round === "round1" ? tableMembersRound1 : tableMembersRound2;

  const handleToggleExpression = (expression: string) => {
    setCheckedExpressions((prev) => {
      if (prev.includes(expression)) {
        return prev.filter((item) => item !== expression);
      }
      return [...prev, expression];
    });
  };

  return (
    <AppShell hasBottomBar>
      <AppHeader showBackButton title="Buddy" onBack={() => navigate(-1)} />
      <PageTitle
        title={session.title}
        subtitle={`${session.dateTime} · ${session.place}`}
      />

      <div className="space-y-6">
        <SectionBlock title="QR 출석">
          <BuddyButton fullWidth>QR 출석하기</BuddyButton>
        </SectionBlock>

        <SectionBlock title="오늘의 대화 주제">
          <TopicCard
            topicTitle={sessionTopicMock.topicTitle}
            topicDescription={sessionTopicMock.topicDescription}
            questions={sessionTopicMock.questions.map((item) => item.text)}
          />
        </SectionBlock>

        <SectionBlock title="내 테이블">
          <BuddyTabs
            items={[
              { label: "Round 1", value: "round1" },
              { label: "Round 2", value: "round2" },
            ]}
            value={round}
            onChange={setRound}
          />
          <TableCard
            tableName={round === "round1" ? "Table 1" : "Table 2"}
            participantCount={currentMembers.length}
          >
            {currentMembers.map((member) => (
              <TableMemberRow
                key={member.id}
                name={member.name}
                email={member.email}
              />
            ))}
          </TableCard>
        </SectionBlock>

        <SectionBlock title="오늘의 추천 표현">
          <div className="space-y-2">
            {sessionTopicMock.recommendedExpressions.map((expression) => (
              <BuddyCheckbox
                key={expression}
                checked={checkedExpressions.includes(expression)}
                label={expression}
                onChange={() => handleToggleExpression(expression)}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="표현 기록 / 메모">
          <BuddyCard>
            <div className="space-y-4">
              <BuddyInput placeholder="오늘 사용한 표현이나 메모를 입력해보세요" />
              <BuddyButton fullWidth>표현 저장</BuddyButton>
            </div>
          </BuddyCard>
        </SectionBlock>

        <SectionBlock title="세션 종료 후">
          <BuddyCard>
            <div className="space-y-3">
              <div className="text-sm text-buddySubText">
                세션이 종료되면 같은 테이블 멤버에게 좋아요를 보낼 수 있어요.
              </div>
              <BuddyButton
                fullWidth
                variant={likeState?.isSessionClosed ? "primary" : "secondary"}
                onClick={() => navigate(`/sessions/${session.sessionId}/likes`)}
              >
                같이 대화한 멤버에게 좋아요 보내기
              </BuddyButton>
            </div>
          </BuddyCard>
        </SectionBlock>
      </div>

      <BottomActionBar>
        <div className="grid grid-cols-3 gap-3">
          <BuddyButton
            fullWidth
            onClick={() => navigate("/")}
            variant="secondary"
          >
            홈
          </BuddyButton>
          <BuddyButton
            fullWidth
            onClick={() => navigate("/my-sessions")}
            variant="secondary"
          >
            내 모임
          </BuddyButton>
          <BuddyButton
            fullWidth
            onClick={() => navigate("/mypage")}
            variant="primary"
          >
            마이
          </BuddyButton>
        </div>
      </BottomActionBar>
    </AppShell>
  );
}
