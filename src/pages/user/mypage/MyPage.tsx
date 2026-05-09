import { useNavigate } from "react-router-dom";
import { myProfileMock } from "../../../mocks/badge.mock";
import { homeSessionMock } from "../../../mocks/home.mock";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { AttendanceStatCard } from "../../../widgets/attendance-stat-card/AttendanceStatCard";
import { ProfileSummaryCard } from "../../../widgets/profile-summary-card/ProfileSummaryCard";
import { SessionCard } from "../../../widgets/session-card/SessionCard";

export function MyPage() {
  const navigate = useNavigate();
  const joinedSessions = homeSessionMock.filter((session) => session.joined);
  const representativeBadges = myProfileMock.badges.filter((badge) =>
    (myProfileMock.representativeBadgeIds ?? []).includes(badge.id)
  ).slice(0, 3);

  return (
    <AppShell hasBottomBar>
      <AppHeader title="Buddy" />
      <PageTitle title="마이페이지" />

      <div className="space-y-6">
        <ProfileSummaryCard
          name={myProfileMock.name}
          level={myProfileMock.level}
          mbti={myProfileMock.mbti}
          intro={myProfileMock.intro}
          likesCount={myProfileMock.likesCount}
          representativeBadges={representativeBadges}
          onRepresentativeBadgesClick={() => navigate("/mypage/badges")}
        />

        <SectionBlock title="출석 요약">
          <AttendanceStatCard totalAttendance={14} monthlyAttendance={3} percentile={12} />
        </SectionBlock>

        <SectionBlock title="참여 세션">
          <div className="space-y-4">
            {joinedSessions.map((session) => (
              <SessionCard
                key={session.sessionId}
                title={session.title}
                dateTime={session.dateTime}
                place={session.place}
                participant={session.participant}
                actionLabel="복습 보기"
                onCardClick={() => navigate(`/my-sessions/${session.sessionId}/review`)}
                onActionClick={() => navigate(`/my-sessions/${session.sessionId}/review`)}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="설정">
          <div className="space-y-3">
            <BuddyButton fullWidth variant="secondary" onClick={() => navigate("/attendance")}>
              출석 현황 보기
            </BuddyButton>
            <BuddyButton fullWidth variant="secondary">
              로그아웃
            </BuddyButton>
          </div>
        </SectionBlock>
      </div>

      <BottomActionBar>
        <div className="grid grid-cols-3 gap-3">
          <BuddyButton fullWidth onClick={() => navigate("/")} variant="secondary">
            홈
          </BuddyButton>
          <BuddyButton fullWidth onClick={() => navigate("/my-sessions")} variant="secondary">
            내 모임
          </BuddyButton>
          <BuddyButton fullWidth onClick={() => navigate("/mypage")} variant="primary">
            마이
          </BuddyButton>
        </div>
      </BottomActionBar>
    </AppShell>
  );
}
