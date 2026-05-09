import { CalendarDays, Clock, MapPin, Plus, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminPastSessionListMock } from "../../../../mocks/session-history.mock";
import { AppShell } from "../../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../../shared/ui/app-header/AppHeader";
import { BuddyButton } from "../../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../../shared/ui/buddy-card/BuddyCard";
import { PageTitle } from "../../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../../shared/ui/section-block/SectionBlock";
import { SessionCard } from "../../../../widgets/session-card/SessionCard";
import { useEffect, useState } from "react";
import { getAdminSessionList } from "../../../../features/admin/session/session-get/api/GetSessionList";
import type { GetAdminSessionListResponse } from "../../../../features/admin/session/session-get/model/GetAdminSessionResponse";
import { unwrapApiResponse } from "../../../../features/client-common/unwrapApiResponse";
import { AdminDrawer } from "../../../../shared/ui/app-drawer/AdminDrawer";
import { MiniMetricCard } from "../../../../shared/ui/buddy-metric-card/MiniMetricCard";

type AdminSessionListLoadingProps = {
  isMenuOpen: boolean;
  onMenuClick: () => void;
  onCloseDrawer: () => void;
};

type AdminSessionListErrorProps = {
  isMenuOpen: boolean;
  onMenuClick: () => void;
  onCloseDrawer: () => void;
  onRetry: () => void;
};

export function AdminSessionListPage() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sessionData, setSessionData] =
    useState<GetAdminSessionListResponse | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchSessionList = async () => {
    try {
      setIsError(false);

      const response = await getAdminSessionList();
      const data = unwrapApiResponse(response);

      setSessionData(data);
    } catch (error) {
      console.error("세션 목록 조회 실패", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchSessionList();
  }, []);

  if (sessionData == null && isError == false) {
    return (
      <AdminSessionListLoading
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen((prev) => prev == false)}
        onCloseDrawer={() => setIsMenuOpen(false)}
      />
    );
  }

  if (sessionData == null && isError == true) {
    return (
      <AdminSessionListError
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen((prev) => prev == false)}
        onCloseDrawer={() => setIsMenuOpen(false)}
        onRetry={fetchSessionList}
      />
    );
  }

  const upcomingSessions = sessionData?.upcomingSessions ?? [];
  const pastSessions = sessionData?.pastSessions ?? [];

  const totalUpcomingCount = upcomingSessions.length;
  const totalPastCount = pastSessions.length;

  const totalUpcomingAttendanceCount = upcomingSessions.reduce(
    (sum, session) => sum + session.attendanceCount,
    0
  );

  const nearestSession = upcomingSessions[0];

  return (
    <AppShell>
      <div className="relative">
        <AppHeader
          title="Buddy"
          onMenuClick={() => setIsMenuOpen((prev) => prev == false)}
        />
        <AdminDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>

      <PageTitle
        title="세션 관리"
        subtitle="예정된 세션과 종료된 세션 기록을 관리해요."
      />

      <div className="pb-8 space-y-6">
        <AdminSessionManageHero
          upcomingCount={totalUpcomingCount}
          pastCount={totalPastCount}
          totalUpcomingAttendanceCount={totalUpcomingAttendanceCount}
          onCreateClick={() => navigate("/admin/sessions/create")}
        />

        {nearestSession != null && (
          <NearestSessionCard
            title={nearestSession.title}
            startsAt={nearestSession.startsAt}
            location={nearestSession.location}
            attendanceCount={nearestSession.attendanceCount}
            onClick={() =>
              navigate(`/admin/sessions/${nearestSession.sessionId}`)
            }
          />
        )}

        <SectionBlock
          title="다가오는 세션"
          description="다가오는 세션들이에요."
        >
          {upcomingSessions.length === 0 ? (
            <EmptyState
              title="예정된 세션이 없어요"
              description="새로운 영어 모임 세션을 생성해보세요."
              actionLabel="세션 생성"
              onActionClick={() => navigate("/admin/sessions/create")}
            />
          ) : (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <SessionCard
                  key={session.sessionId}
                  title={session.title}
                  dateTime={session.startsAt}
                  place={session.location}
                  participant={session.attendanceCount.toString()}
                  onActionClick={() =>
                    navigate(`/admin/sessions/${session.sessionId}`)
                  }
                />
              ))}
            </div>
          )}
        </SectionBlock>

        <SectionBlock
          title="종료 세션 기록"
          description="최근 종료된 세션의 운영 결과를 확인해요."
        >
          {pastSessions.length === 0 ? (
            <EmptyState
              title="종료된 세션이 없어요"
              description="세션이 종료되면 이곳에서 기록을 확인할 수 있어요."
            />
          ) : (
            <div className="space-y-3">
              {pastSessions.map((session) => {
                const pastSessionMeta = adminPastSessionListMock.find(
                  (item) => item.sessionId === session.sessionId
                );

                return (
                  <PastSessionRecordCard
                    key={session.sessionId}
                    title={session.title}
                    startsAt={session.startsAt}
                    location={session.location}
                    attendanceSummary={pastSessionMeta?.attendanceSummary}
                    onClick={() =>
                      navigate(`/admin/session-history/${session.sessionId}`)
                    }
                  />
                );
              })}
            </div>
          )}
        </SectionBlock>
      </div>
    </AppShell>
  );
}

type AdminSessionManageHeroProps = {
  upcomingCount: number;
  pastCount: number;
  totalUpcomingAttendanceCount: number;
  onCreateClick: () => void;
};

function AdminSessionManageHero({
  upcomingCount,
  pastCount,
  totalUpcomingAttendanceCount,
  onCreateClick,
}: AdminSessionManageHeroProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#3AAFA9]">
              ADMIN SESSION
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#2F3A40]">
              오늘 운영할 세션을 한눈에 확인해요
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
              예정 세션을 준비하고, 종료된 세션 기록을 확인할 수 있어요.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#DFF5F3] px-4 py-3 text-center">
            <p className="text-xs font-medium text-[#6C7A80]">예정</p>
            <p className="mt-1 text-xl font-bold text-[#3AAFA9]">
              {upcomingCount}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniMetricCard label="예정 세션" value={`${upcomingCount}개`} />
          <MiniMetricCard
            label="신청 인원"
            value={`${totalUpcomingAttendanceCount}명`}
          />
          <MiniMetricCard label="종료 기록" value={`${pastCount}개`} />
        </div>

        <BuddyButton
          fullWidth
          leftIcon={<Plus size={18} />}
          onClick={onCreateClick}
        >
          세션 생성
        </BuddyButton>
      </div>
    </BuddyCard>
  );
}

type NearestSessionCardProps = {
  title: string;
  startsAt: string;
  location: string;
  attendanceCount: number;
  onClick: () => void;
};

function NearestSessionCard({
  title,
  startsAt,
  location,
  attendanceCount,
  onClick,
}: NearestSessionCardProps) {
  return (
    <SectionBlock
      title="가장 가까운 세션"
      description="먼저 확인하면 좋은 다음 운영 세션이에요."
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-2xl border border-[#E2E6E8] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F9FBFB]"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#3AAFA9]">
                NEXT SESSION
              </p>
              <p className="mt-2 truncate text-base font-bold text-[#2F3A40]">
                {title}
              </p>
            </div>

            <div className="rounded-full bg-[#DFF5F3] px-3 py-1 text-xs font-bold text-[#2F3A40]">
              신청 {attendanceCount}명
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#6C7A80]">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} />
              <span>{startsAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={15} />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </button>
    </SectionBlock>
  );
}

type PastSessionRecordCardProps = {
  title: string;
  startsAt: string;
  location: string;
  attendanceSummary?: string;
  onClick: () => void;
};

function PastSessionRecordCard({
  title,
  startsAt,
  location,
  attendanceSummary,
  onClick,
}: PastSessionRecordCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-[#E2E6E8] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F9FBFB]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#F3F5F6] px-2.5 py-1 text-[11px] font-bold text-[#6C7A80]">
              종료
            </span>
            {attendanceSummary != null && (
              <span className="rounded-full bg-[#DFF5F3] px-2.5 py-1 text-[11px] font-bold text-[#2F3A40]">
                {attendanceSummary}
              </span>
            )}
          </div>

          <p className="mt-3 truncate text-base font-bold text-[#2F3A40]">
            {title}
          </p>

          <div className="mt-3 space-y-1.5 text-sm text-[#6C7A80]">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{startsAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 rounded-xl bg-[#F3F5F6] px-3 py-2 text-xs font-bold text-[#3AAFA9]">
          보기
        </div>
      </div>
    </button>
  );
}

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

function EmptyState({
  title,
  description,
  actionLabel,
  onActionClick,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-white px-5 py-8 text-center">
      <p className="text-sm font-bold text-[#2F3A40]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
        {description}
      </p>

      {actionLabel != null && onActionClick != null && (
        <div className="mt-5">
          <BuddyButton variant="secondary" onClick={onActionClick}>
            {actionLabel}
          </BuddyButton>
        </div>
      )}
    </div>
  );
}

const AdminSessionListLoading = ({
  isMenuOpen,
  onMenuClick,
  onCloseDrawer,
}: AdminSessionListLoadingProps) => {
  return (
    <AppShell>
      <div className="relative">
        <AppHeader title="Buddy" onMenuClick={onMenuClick} />
        <AdminDrawer open={isMenuOpen} onClose={onCloseDrawer} />
      </div>

      <PageTitle title="세션 관리" subtitle="세션 정보를 불러오고 있어요." />

      <div className="pb-8 space-y-4">
        <SkeletonHero />
        <SkeletonBlock />
        <SkeletonBlock />
      </div>
    </AppShell>
  );
};

const AdminSessionListError = ({
  isMenuOpen,
  onMenuClick,
  onCloseDrawer,
  onRetry,
}: AdminSessionListErrorProps) => {
  return (
    <AppShell>
      <div className="relative">
        <AppHeader title="Buddy" onMenuClick={onMenuClick} />
        <AdminDrawer open={isMenuOpen} onClose={onCloseDrawer} />
      </div>

      <PageTitle title="세션 관리" subtitle="세션 정보를 불러오지 못했어요." />

      <div className="mt-6">
        <BuddyCard>
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F6] text-[#6C7A80]">
              <RotateCcw size={22} />
            </div>

            <div>
              <p className="text-sm font-bold text-[#2F3A40]">
                세션 목록 조회에 실패했어요
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
                잠시 후 다시 시도하거나 서버 상태를 확인해주세요.
              </p>
            </div>

            <BuddyButton variant="secondary" onClick={onRetry}>
              다시 불러오기
            </BuddyButton>
          </div>
        </BuddyCard>
      </div>
    </AppShell>
  );
};

function SkeletonHero() {
  return (
    <BuddyCard>
      <div className="space-y-4">
        <div className="h-3 w-24 animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-6 w-48 animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-4 w-full animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
          <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
          <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
        </div>
      </div>
    </BuddyCard>
  );
}

function SkeletonBlock() {
  return (
    <div className="space-y-3">
      <div className="h-5 w-32 animate-pulse rounded-full bg-[#E2E6E8]" />
      <BuddyCard>
        <div className="space-y-3">
          <div className="h-5 w-40 animate-pulse rounded-full bg-[#E2E6E8]" />
          <div className="h-4 w-56 animate-pulse rounded-full bg-[#E2E6E8]" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-[#E2E6E8]" />
        </div>
      </BuddyCard>
    </div>
  );
}
