import { useNavigate } from "react-router-dom";
import { homeSessionMock } from "../../../mocks/home.mock";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SessionCard } from "../../../widgets/session-card/SessionCard";
import { AppTopBar } from "../../../shared/ui/app-topbar/AppTopBar";

export function MySessionsPage() {
  const navigate = useNavigate();
  const joinedSessions = homeSessionMock.filter((session) => session.joined);

  return (
    <AppShell hasBottomBar>
      <AppTopBar title="Buddy" />
      <PageTitle title="내 모임" subtitle="내가 참여한 세션만 모아봤어요." />

      <div className="space-y-6">
        {joinedSessions.map((session) => (
          <SessionCard
            key={session.sessionId}
            title={session.title}
            dateTime={session.dateTime}
            place={session.place}
            participant={session.participant}
            actionLabel="상세보기"
                onCardClick={() => navigate(`/sessions/${session.sessionId}/members`)}
            onActionClick={() => navigate(`/sessions/${session.sessionId}`)}
          />
        ))}
      </div>

      <BottomActionBar>
        <div className="grid grid-cols-3 gap-3">
          <BuddyButton fullWidth onClick={() => navigate("/")} variant="secondary">홈</BuddyButton>
          <BuddyButton fullWidth onClick={() => navigate("/my-sessions")} variant="primary">내 모임</BuddyButton>
          <BuddyButton fullWidth onClick={() => navigate("/mypage")} variant="secondary">마이</BuddyButton>
        </div>
      </BottomActionBar>
    </AppShell>
  );
}
