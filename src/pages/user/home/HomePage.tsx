import { useNavigate } from "react-router-dom";
import { homeSessionMock } from "../../../mocks/home.mock";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyDivider } from "../../../shared/ui/buddy-divider/BuddyDivider";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { SessionCard } from "../../../widgets/session-card/SessionCard";
import { AppTopBar } from "../../../shared/ui/app-topbar/AppTopBar";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <AppShell hasBottomBar>
      <AppTopBar title="Buddy" />
      
      <div className="space-y-6">
        <SectionBlock
          title="오늘의 모임"
          description="Buddy에서 진행하는 전체 세션을 확인하고 참여할 수 있어요."
        >
          <div className="p-5 bg-white rounded-buddyCard shadow-buddyCard">
            <div className="text-sm text-buddySubText">이번 주 추천 세션</div>
            <div className="mt-2 text-lg font-semibold text-buddyText">English Tuesday Session</div>
            <div className="mt-1 text-sm text-buddySubText">화요일 19:30 · 잠실 스터디룸</div>
          </div>
        </SectionBlock>

        <BuddyDivider />

        <SectionBlock title="전체 세션">
          <div className="space-y-4">
            {homeSessionMock.map((session) => (
              <SessionCard
                key={session.sessionId}
                title={session.title}
                dateTime={session.dateTime}
                place={session.place}
                participant={session.participant}
                actionLabel={session.joined ? "상세보기" : "참여하기"}
                onCardClick={() => navigate(`/sessions/${session.sessionId}/members`)}
                onActionClick={() =>
                  session.joined
                    ? navigate(`/sessions/${session.sessionId}`)
                    : navigate("/my-sessions")
                }
              />
            ))}
          </div>
        </SectionBlock>
      </div>

      <BottomActionBar>
        <div className="grid grid-cols-3 gap-3">
          <BuddyButton fullWidth onClick={() => navigate("/")} variant="primary">홈</BuddyButton>
          <BuddyButton fullWidth onClick={() => navigate("/my-sessions")} variant="secondary">내 모임</BuddyButton>
          <BuddyButton fullWidth onClick={() => navigate("/mypage")} variant="secondary">마이</BuddyButton>
        </div>
      </BottomActionBar>
    </AppShell>
  );
}
