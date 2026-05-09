import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import {
  Award,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";
import type { GetAdminUserDetailResponse } from "../../../features/admin/user/user-get/model/User/GetAdminUserDetailResponse";
import { unwrapApiResponse } from "../../../features/client-common/unwrapApiResponse";
import { AdminUserDetailLoading } from "./AdminUserDetailLoading";
import { AdminUserDetailError } from "./AdminUserDetailError";
import { MonthlyWordsSection } from "./sections/MonthlyWordsSection";
import { EmptyState } from "./EmptyState";
import { AdminActionSection } from "./sections/AdminActionBtnSection";
import { updateAdminUserRole } from "../../../features/admin/user/user-get/api/UpdateAdminUserRole";
import { getAdminUserDetail } from "../../../features/admin/user/user-get/api/GetAdminUserDetail";
import { updateAdminUserStatus } from "../../../features/admin/user/user-get/api/UpdateAdminUserStatus";
import { MiniMetricCard } from "../../../shared/ui/buddy-metric-card/MiniMetricCard";

export function AdminUserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState<GetAdminUserDetailResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const fetchUserDetail = async () => {
    try {
      setIsError(false);

      const response = await getAdminUserDetail(Number(userId));
      const data = unwrapApiResponse(response);

      setUser(data);
    } catch (error) {
      console.error("유저 상세 조회 실패", error);

      setIsError(true);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, [userId]);

  const handleToggleStaffClick = async () => {
    if (user == null) return;

    const nextRole = user.role === "STAFF" ? "USER" : "STAFF";

    try {
      setIsUpdatingRole(true);

      const response = await updateAdminUserRole(user.userId, {
        role: nextRole,
      });

      unwrapApiResponse(response);

      setUser((prev) => {
        if (prev == null) return prev;

        return {
          ...prev,
          role: nextRole,
        };
      });
      window.alert("변경이 완료되었습니다.");
    } catch (error) {
      console.error("유저 역할 변경 실패", error);
      window.alert("유저 역할 변경에 실패했습니다.");
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const handleToggleActiveClick = async () => {
    if (user == null) return;

    const nextStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const confirmed = window.confirm(
      nextStatus === "INACTIVE"
        ? "이 유저를 비활성화할까요?"
        : "이 유저를 다시 활성화할까요?"
    );

    if (confirmed === false) return;

    try {
      setIsUpdatingStatus(true);

      const response = await updateAdminUserStatus(user.userId, {
        status: nextStatus,
      });

      unwrapApiResponse(response);

      setUser((prev) => {
        if (prev == null) return prev;

        return {
          ...prev,
          status: nextStatus,
        };
      });
    } catch (error) {
      console.error("유저 상태 변경 실패", error);
      window.alert("유저 상태 변경에 실패했습니다.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const monthlyAttendance: MonthlyAttendance = {
    appliedCount: user?.monthlyAttendance?.appliedCount ?? 0,
    attendedCount: user?.monthlyAttendance?.attendedCount ?? 0,
    absentCount: user?.monthlyAttendance?.absentCount ?? 0,
    attendanceRate: user?.monthlyAttendance?.attendanceRate ?? 0,
  };

  const recentAttendedSession = user?.recentAttendedSession ?? null;
  const monthlyWords = user?.monthlyWords ?? [];

  if (user == null) {
    if (isError) {
      return (
        <AdminUserDetailError
          onBackBtnClick={() => navigate("/admin/users")}
          onRetry={fetchUserDetail}
        />
      );
    }

    return (
      <AdminUserDetailLoading onBackBtnClick={() => navigate("/admin/users")} />
    );
  }
  return (
    <AppShell>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate("/admin/users")}
      />

      <PageTitle
        title="유저 상세"
        subtitle="유저의 기본 정보와 이번 달 활동 기록을 확인해요."
      />

      <div className="pb-8 space-y-6">
        <AdminUserHeroCard
          name={user.name}
          nickname={user.nickname}
          email={user.email}
          role={user.role ?? "USER"}
          status={user.status ?? "ACTIVE"}
          level={user.level}
          mbti={user.mbti}
          jobs={user.jobs}
        />

        <MonthlyAttendanceSection monthlyAttendance={monthlyAttendance} />

        <RecentSessionSection
          recentAttendedSession={recentAttendedSession}
          fallbackSessions={[]}
          onSessionClick={(sessionId) =>
            navigate(`/admin/session-history/${sessionId}`)
          }
        />

        <MonthlyWordsSection monthlyWords={monthlyWords} />

        <BadgeSection
          badgeCount={user?.badgeCount ?? 0}
          onBadgeClick={() => navigate(`/admin/users/${user?.userId}/badges`)}
        />

        <AdminActionSection
          role={user.role}
          status={user.status}
          isUpdatingRole={isUpdatingRole}
          isUpdatingStatus={isUpdatingStatus}
          onToggleStaffClick={handleToggleStaffClick}
          onToggleActiveClick={handleToggleActiveClick}
        />
      </div>
    </AppShell>
  );
}

type AdminUserHeroCardProps = {
  name: string;
  nickname: string;
  email?: string | null;
  role: string;
  status: string;
  level: number;
  mbti?: string | null;
  jobs?: string | null;
};

function AdminUserHeroCard({
  name,
  nickname,
  email,
  role,
  status,
  level,
  mbti,
  jobs,
}: AdminUserHeroCardProps) {
  const displayName =
    nickname == null || nickname.trim() === "" ? name : `${nickname} · ${name}`;

  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-lg font-bold text-[#3AAFA9]">
            {name.slice(0, 1)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">USER DETAIL</p>
            <h2 className="mt-2 truncate text-lg font-bold text-[#2F3A40]">
              {displayName}
            </h2>

            <div className="flex flex-wrap gap-2 mt-2">
              <RoleBadge role={role} />
              <StatusBadge status={status} />
            </div>
          </div>
        </div>

        {(email != null && email.trim() !== "") ||
        (jobs != null && jobs.trim() !== "") ? (
          <div className="space-y-2.5 rounded-2xl bg-[#F3F5F6] px-4 py-3">
            {email != null && email.trim() !== "" && (
              <InfoRow icon={<Mail size={15} />} text={email} />
            )}

            {jobs != null && jobs.trim() !== "" && (
              <InfoRow icon={<UserRound size={15} />} text={jobs} />
            )}
          </div>
        ) : null}

        <div className="grid grid-cols-3 gap-2">
          <MiniMetricCard label="레벨" value={`Lv.${level}`} />
          <MiniMetricCard label="MBTI" value={mbti ?? "미입력"} />
          <MiniMetricCard label="역할" value={getRoleLabel(role)} />
        </div>
      </div>
    </BuddyCard>
  );
}

type MonthlyAttendance = {
  appliedCount: number;
  attendedCount: number;
  absentCount: number;
  attendanceRate: number;
};

type MonthlyAttendanceSectionProps = {
  monthlyAttendance: MonthlyAttendance;
};

function MonthlyAttendanceSection({
  monthlyAttendance,
}: MonthlyAttendanceSectionProps) {
  return (
    <SectionBlock
      title="이번 달 출석 통계"
      description="이번 달 세션 신청과 참석 기록을 기준으로 계산해요."
    >
      <div className="grid grid-cols-2 gap-3">
        <SummaryMetricCard
          label="출석률"
          value={`${monthlyAttendance.attendanceRate}%`}
          description="참석 / 신청 기준"
          highlight
        />
        <SummaryMetricCard
          label="참석"
          value={`${monthlyAttendance.attendedCount}회`}
          description="출석 또는 지각"
        />
        <SummaryMetricCard
          label="신청"
          value={`${monthlyAttendance.appliedCount}회`}
          description="이번 달 신청"
        />
        <SummaryMetricCard
          label="노쇼"
          value={`${monthlyAttendance.absentCount}회`}
          description="신청 후 불참"
        />
      </div>
    </SectionBlock>
  );
}

type RecentAttendedSession = {
  sessionId: number;
  title: string;
  startsAt: string;
  location: string;
};

type RecentSessionSectionProps = {
  recentAttendedSession: RecentAttendedSession | null;
  fallbackSessions: string[];
  onSessionClick: (sessionId: number) => void;
};

function RecentSessionSection({
  recentAttendedSession,
  fallbackSessions,
  onSessionClick,
}: RecentSessionSectionProps) {
  return (
    <SectionBlock
      title="최근 참석 세션"
      description="가장 최근에 참석한 세션 기록이에요."
    >
      {recentAttendedSession != null ? (
        <button
          type="button"
          onClick={() => onSessionClick(recentAttendedSession.sessionId)}
          className="w-full rounded-2xl border border-[#E2E6E8] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F9FBFB]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#3AAFA9]">
                RECENT SESSION
              </p>
              <p className="mt-2 truncate text-base font-bold text-[#2F3A40]">
                {recentAttendedSession.title}
              </p>

              <div className="mt-3 space-y-1.5 text-sm text-[#6C7A80]">
                <InfoRow
                  icon={<Clock size={14} />}
                  text={recentAttendedSession.startsAt}
                />
                <InfoRow
                  icon={<MapPin size={14} />}
                  text={recentAttendedSession.location}
                />
              </div>
            </div>

            <div className="shrink-0 rounded-xl bg-[#F3F5F6] px-3 py-2 text-xs font-bold text-[#3AAFA9]">
              기록 보기
            </div>
          </div>
        </button>
      ) : fallbackSessions.length > 0 ? (
        <div className="space-y-3">
          {fallbackSessions.map((session) => (
            <BuddyCard key={session}>
              <div className="text-sm font-medium text-[#2F3A40]">
                {session}
              </div>
            </BuddyCard>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<CalendarDays size={22} />}
          title="최근 참석 세션이 없어요"
          description="이번 달 참석 기록이 생기면 이곳에서 확인할 수 있어요."
        />
      )}
    </SectionBlock>
  );
}

type BadgeSectionProps = {
  badgeCount: number;
  onBadgeClick: () => void;
};

function BadgeSection({ badgeCount, onBadgeClick }: BadgeSectionProps) {
  return (
    <SectionBlock
      title="뱃지 관리"
      description="뱃지 기능은 MVP 이후에 연결할 예정이에요."
    >
      <BuddyCard>
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F3F5F6] text-[#6C7A80]">
            <Award size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#2F3A40]">
              보유 뱃지 {badgeCount}개
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#6C7A80]">
              대표 뱃지와 전체 뱃지 관리는 준비 중이에요.
            </p>
          </div>

          <BuddyButton
            size="sm"
            variant="secondary"
            disabled
            onClick={onBadgeClick}
          >
            준비 중
          </BuddyButton>
        </div>
      </BuddyCard>
    </SectionBlock>
  );
}

type SummaryMetricCardProps = {
  label: string;
  value: string;
  description: string;
  highlight?: boolean;
};

function SummaryMetricCard({
  label,
  value,
  description,
  highlight = false,
}: SummaryMetricCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-[#E2E6E8] p-4 shadow-sm",
        highlight ? "bg-[#DFF5F3]" : "bg-white",
      ].join(" ")}
    >
      <p className="text-xs font-medium text-[#6C7A80]">{label}</p>
      <p
        className={[
          "mt-2 text-xl font-bold",
          highlight ? "text-[#3AAFA9]" : "text-[#2F3A40]",
        ].join(" ")}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-[#6C7A80]">{description}</p>
    </div>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  text: string;
};

function InfoRow({ icon, text }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#6C7A80]">
      <span className="shrink-0 text-[#6C7A80]">{icon}</span>
      <span className="min-w-0 truncate">{text}</span>
    </div>
  );
}

type RoleBadgeProps = {
  role: string;
};

function RoleBadge({ role }: RoleBadgeProps) {
  const className =
    role === "ADMIN"
      ? "bg-[#F3F5F6] text-[#2F3A40]"
      : role === "STAFF"
        ? "bg-red-50 text-red-500"
        : "bg-[#F3F5F6] text-[#6C7A80]";

  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[11px] font-bold",
        className,
      ].join(" ")}
    >
      {getRoleLabel(role)}
    </span>
  );
}

function getRoleLabel(role: string) {
  if (role === "ADMIN") return "관리자";
  if (role === "STAFF") return "스탭";
  if (role === "USER") return "일반";
  return role;
}

type StatusBadgeProps = {
  status: string;
};

function StatusBadge({ status }: StatusBadgeProps) {
  const className =
    status === "ACTIVE"
      ? "bg-[#DFF5F3] text-[#3AAFA9]"
      : status === "INACTIVE"
        ? "bg-red-50 text-red-500"
        : "bg-[#F3F5F6] text-[#6C7A80]";

  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[11px] font-bold",
        className,
      ].join(" ")}
    >
      {getStatusLabel(status)}
    </span>
  );
}

function getStatusLabel(status: string) {
  if (status === "ACTIVE") return "활동";
  if (status === "INACTIVE") return "비활동";
  return status;
}
