import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../../shared/ui/page-title/PageTitle";
import { BuddyCard } from "../../../../shared/ui/buddy-card/BuddyCard";
import { getAdminSessionManage } from "../../../../features/admin/session/session-get/api/GetSessionList";
import type { GetAdminSessionManageResponse } from "../../../../features/admin/session/session-get/model/GetAdminSessionResponse";
import { unwrapApiResponse } from "../../../../features/client-common/unwrapApiResponse";
import { createTableing } from "../../../../features/admin/session-table/api/CreateTableing";
import { closeSession } from "../../../../features/admin/session/session-close/api/SessionCloseRequest";
import { SectionBlock } from "../../../../shared/ui/section-block/SectionBlock";
import {
  CalendarDays,
  ChevronRight,
  MapPin,
  MessageSquareText,
  Power,
  Table2,
  Users,
} from "lucide-react";

type AdminSessionLoadingProps = {
  onBackBtnClick: () => void;
};

export function AdminSessionManagePage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [sessionData, setSessionData] =
    useState<GetAdminSessionManageResponse | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isTableingRunning, setIsTableingRunning] = useState(false);

  useEffect(() => {
    const fetchSessionManage = async () => {
      try {
        setIsPageLoading(true);
        const response = await getAdminSessionManage(Number(sessionId));
        const data = unwrapApiResponse(response);

        setSessionData(data);
      } catch (error) {
        console.error("세션 관리 정보 조회 실패", error);
        window.alert("존재하지 않는 세션입니다.");
        navigate("/admin/sessions", { replace: true });
      } finally {
        setIsPageLoading(false);
      }
    };

    if (sessionId == null || Number.isNaN(Number(sessionId))) {
      window.alert("잘못된 세션 경로입니다.");
      navigate("/admin/sessions", { replace: true });

      return;
    }

    fetchSessionManage();
  }, [sessionId]);

  if (isPageLoading) {
    return (
      <AdminSessionLoading onBackBtnClick={() => navigate("/admin/sessions")} />
    );
  }

  if (sessionData == null) {
    return null;
  }

  const session = sessionData;

  const navigateToTableResult = () => {
    navigate(`/admin/sessions/${Number(sessionId)}/tables`);
  };

  const runTableing = async () => {
    try {
      setIsTableingRunning(true);

      if (session.hasTableAssignments) {
        navigateToTableResult();
        return;
      }

      const response = await createTableing(Number(sessionId));
      unwrapApiResponse(response);

      navigateToTableResult();
    } catch (error) {
      console.error("테이블링 생성 실패", error);
    } finally {
      setIsTableingRunning(false);
    }
  };

  const sessionCloseBtnClick = async () => {
    try {
      setIsClosing(true);

      const response = await closeSession(Number(sessionId));
      unwrapApiResponse(response);

      navigate("/admin/sessions");
    } catch (error) {
      console.error("세션 종료 실패", error);
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <AppShell>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate("/admin/sessions")}
      />

      <PageTitle
        title="세션 운영"
        subtitle="참석자, 자리배치, 주제와 종료 처리를 관리해요."
      />

      <div className="pb-8 space-y-6">
        <SessionManageHeroCard
          title={session.title}
          startsAt={session.startsAt}
          location={session.location}
          attendanceCount={session.attendanceCount}
          hasTableAssignments={session.hasTableAssignments}
        />

        <SectionBlock
          title="운영 메뉴"
          description="세션 진행 전에 필요한 항목을 확인해요."
        >
          <div className="space-y-3">
            <ManageActionCard
              icon={<Users size={20} />}
              title="참석자 관리"
              description="신청자와 참석자를 확인하고 관리해요."
              actionLabel="관리하기"
              onClick={() =>
                navigate(`/admin/sessions/${session.sessionId}/participants`)
              }
            />

            <ManageActionCard
              icon={<Table2 size={20} />}
              title={
                session.hasTableAssignments
                  ? "자리배치 결과 보기"
                  : "자리배치 실행"
              }
              description={
                session.hasTableAssignments
                  ? "이미 생성된 테이블 배정 결과를 확인해요."
                  : "참석자를 기준으로 테이블 배정을 생성해요."
              }
              actionLabel={
                session.hasTableAssignments ? "결과 보기" : "실행하기"
              }
              loading={isTableingRunning}
              onClick={runTableing}
            />

            <ManageActionCard
              icon={<MessageSquareText size={20} />}
              title="주제 관리"
              description="세션 주제와 추천 표현을 확인하거나 수정해요."
              actionLabel="관리하기"
              onClick={() => navigate(`/admin/sessions/${sessionId}/topic`)}
            />
          </div>
        </SectionBlock>

        <SectionBlock
          title="세션 종료"
          description="세션이 끝난 뒤 종료 처리하면 기록 화면에서 확인할 수 있어요."
        >
          <DangerActionCard
            title="이 세션을 종료할까요?"
            description="세션 종료 후에는 종료 세션 기록에서 참석자, 테이블 결과, 주제 정보를 확인할 수 있어요."
            actionLabel={isClosing ? "종료 중..." : "세션 종료"}
            loading={isClosing}
            onClick={sessionCloseBtnClick}
          />
        </SectionBlock>
      </div>
    </AppShell>
  );
}

type SessionManageHeroCardProps = {
  title: string;
  startsAt: string;
  location: string;
  attendanceCount: number;
  hasTableAssignments: boolean;
};

function SessionManageHeroCard({
  title,
  startsAt,
  location,
  attendanceCount,
  hasTableAssignments,
}: SessionManageHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">
              SESSION OPERATION
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#2F3A40]">
              {title}
            </h2>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#DFF5F3] px-4 py-3 text-center">
            <p className="text-xs font-medium text-[#6C7A80]">참여</p>
            <p className="mt-1 text-xl font-bold text-[#3AAFA9]">
              {attendanceCount}
            </p>
          </div>
        </div>

        <div className="space-y-2.5 rounded-2xl bg-[#F3F5F6] px-4 py-3">
          <InfoRow icon={<CalendarDays size={15} />} text={startsAt} />
          <InfoRow icon={<MapPin size={15} />} text={location} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MiniStatusCard label="참여 인원" value={`${attendanceCount}명`} />
          <MiniStatusCard
            label="자리배치"
            value={hasTableAssignments ? "완료" : "미실행"}
            accent={hasTableAssignments}
          />
        </div>
      </div>
    </BuddyCard>
  );
}

type ManageActionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

function ManageActionCard({
  icon,
  title,
  description,
  actionLabel,
  loading = false,
  disabled = false,
  onClick,
}: ManageActionCardProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={[
        "w-full rounded-2xl border border-[#E2E6E8] bg-white p-4 text-left shadow-sm transition",
        disabled || loading
          ? "cursor-not-allowed opacity-60"
          : "hover:-translate-y-0.5 hover:bg-[#F9FBFB]",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-[#3AAFA9]">
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#2F3A40]">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#6C7A80]">
                {description}
              </p>
            </div>

            <ChevronRight
              size={18}
              className="mt-0.5 shrink-0 text-[#6C7A80]"
            />
          </div>

          <div className="mt-3 inline-flex rounded-full bg-[#F3F5F6] px-3 py-1 text-xs font-bold text-[#3AAFA9]">
            {loading ? "처리 중..." : actionLabel}
          </div>
        </div>
      </div>
    </button>
  );
}

type DangerActionCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  loading?: boolean;
  onClick: () => void;
};

function DangerActionCard({
  title,
  description,
  actionLabel,
  loading = false,
  onClick,
}: DangerActionCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center text-red-500 h-11 w-11 shrink-0 rounded-2xl bg-red-50">
            <Power size={20} />
          </div>

          <div>
            <p className="text-sm font-bold text-[#2F3A40]">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#6C7A80]">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={onClick}
          className="w-full px-4 py-3 text-sm font-bold text-red-500 transition rounded-xl bg-red-50 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actionLabel}
        </button>
      </div>
    </BuddyCard>
  );
}

type MiniStatusCardProps = {
  label: string;
  value: string;
  accent?: boolean;
};

function MiniStatusCard({ label, value, accent = false }: MiniStatusCardProps) {
  return (
    <div
      className={[
        "rounded-2xl px-4 py-3 text-center",
        accent ? "bg-[#DFF5F3]" : "bg-[#F3F5F6]",
      ].join(" ")}
    >
      <p className="text-[11px] font-medium text-[#6C7A80]">{label}</p>
      <p
        className={[
          "mt-1 text-sm font-bold",
          accent ? "text-[#3AAFA9]" : "text-[#2F3A40]",
        ].join(" ")}
      >
        {value}
      </p>
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

const AdminSessionLoading = ({ onBackBtnClick }: AdminSessionLoadingProps) => {
  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={onBackBtnClick} />

      <PageTitle title="세션 운영" subtitle="세션 정보를 불러오고 있어요." />

      <div className="pb-8 space-y-4">
        <SkeletonHero />
        <SkeletonAction />
        <SkeletonAction />
        <SkeletonAction />
      </div>
    </AppShell>
  );
};

function SkeletonHero() {
  return (
    <BuddyCard>
      <div className="space-y-4">
        <div className="h-3 w-32 animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-6 w-52 animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-20 animate-pulse rounded-2xl bg-[#F3F5F6]" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
          <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
        </div>
      </div>
    </BuddyCard>
  );
}

function SkeletonAction() {
  return (
    <div className="rounded-2xl border border-[#E2E6E8] bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 animate-pulse rounded-2xl bg-[#DFF5F3]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 animate-pulse rounded-full bg-[#E2E6E8]" />
          <div className="h-3 w-full animate-pulse rounded-full bg-[#E2E6E8]" />
          <div className="h-3 w-44 animate-pulse rounded-full bg-[#E2E6E8]" />
        </div>
      </div>
    </div>
  );
}
