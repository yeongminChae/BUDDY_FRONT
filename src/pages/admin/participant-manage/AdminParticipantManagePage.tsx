import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { getAdminParticipantManage } from "../../../features/admin/session-applicant/session-applicant-get/api/GetAdminParticipant";
import { unwrapApiResponse } from "../../../features/client-common/unwrapApiResponse";
import type { GetAdminParticipantManageResponse } from "../../../features/admin/session-applicant/session-applicant-get/model/GetAdminParticipantManageResponse";
import { cancelSessionParticipant } from "../../../features/admin/session-applicant/session-applicant-remove/api/CancelSessionParticipant";
import { createTableing } from "../../../features/admin/session-table/api/CreateTableing";
import { Mail, Plus, Table2, Trash2, UserRound, Users } from "lucide-react";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";

type AdminSessionLoadingProps = {
  onBackBtnClick: () => void;
};

export function AdminParticipantManagePage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [participantData, setParticipantData] =
    useState<GetAdminParticipantManageResponse | null>(null);
  const [isTableingRunning, setIsTableingRunning] = useState(false);
  const [removingApplicationId, setRemovingApplicationId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const getParticipant = async () => {
      try {
        const response = await getAdminParticipantManage(Number(sessionId));
        const data = unwrapApiResponse(response);

        setParticipantData(data);
      } catch (error) {
        console.error("세션 참석자 조회 실패", error);
      }
    };

    getParticipant();
  }, [sessionId]);

  if (participantData == null) {
    return (
      <AdminSessionLoading onBackBtnClick={() => navigate("/admin/sessions")} />
    );
  }

  const session = participantData;
  const participantList = participantData.participants ?? [];

  const remainCount = Math.max(session.capacity - participantList.length, 0);

  const capacityRate =
    session.capacity <= 0
      ? 0
      : Math.round((participantList.length / session.capacity) * 100);

  const handleRemoveBtnClick = async (applicationId: number) => {
    const confirmed = window.confirm("이 참석자를 세션에서 제거할까요?");
    if (confirmed == false) return;

    try {
      setRemovingApplicationId(applicationId);

      const response = await cancelSessionParticipant(
        applicationId,
        Number(sessionId)
      );

      if (response.resultCode !== "OK") {
        window.alert(response.message);
        return;
      }

      setParticipantData((prev) => {
        if (prev == null) return prev;

        return {
          ...prev,
          attendanceCount: Math.max(0, prev.attendanceCount - 1),
          participants: prev.participants.filter(
            (item) => item.applicationId !== applicationId
          ),
        };
      });
    } catch (error: any) {
      console.error("유저 삭제 실패", error);
      const message =
        error?.response?.data?.message ?? "참석자 제거 중 오류가 발생했습니다.";

      window.alert(message);
    } finally {
      setRemovingApplicationId(null);
    }
  };

  const runTableing = async () => {
    try {
      setIsTableingRunning(true);

      const response = await createTableing(Number(sessionId));

      unwrapApiResponse(response);
      navigate(`/admin/sessions/${Number(sessionId)}/tables`);
    } catch (error) {
      console.error("자리배치 실행 실패", error);
    } finally {
      setIsTableingRunning(false);
    }
  };

  return (
    <AppShell>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate(`/admin/sessions/${session.sessionId}`)}
      />

      <PageTitle
        title="참석자 관리"
        subtitle="세션 신청자와 참석 인원을 확인하고 관리해요."
      />

      <div className="pb-10 space-y-6">
        <ParticipantManageHeroCard
          title={session.title}
          currentCount={participantList.length}
          capacity={session.capacity}
          remainCount={remainCount}
          capacityRate={capacityRate}
        />

        <BuddyButton
          fullWidth
          leftIcon={<Plus size={18} />}
          onClick={() =>
            navigate(`/admin/sessions/${session.sessionId}/participants/add`)
          }
        >
          참석자 추가
        </BuddyButton>

        <SectionBlock
          title="참석자 목록"
          description={`현재 ${participantList.length}명이 세션에 참여 예정이에요.`}
        >
          {participantList.length === 0 ? (
            <EmptyParticipantState
              onAddClick={() =>
                navigate(
                  `/admin/sessions/${session.sessionId}/participants/add`
                )
              }
            />
          ) : (
            <div className="space-y-3">
              {participantList.map((participant) => (
                <ParticipantManageCard
                  key={participant.applicationId}
                  name={participant.name}
                  nickname={participant.nickname}
                  email={participant.email}
                  removing={removingApplicationId === participant.applicationId}
                  onRemoveClick={() =>
                    handleRemoveBtnClick(participant.applicationId)
                  }
                />
              ))}
            </div>
          )}
        </SectionBlock>
      </div>

      <BuddyButton
        fullWidth
        leftIcon={<Table2 size={18} />}
        disabled={isTableingRunning || participantList.length === 0}
        onClick={runTableing}
      >
        {isTableingRunning ? "자리배치 실행 중..." : "자리배치 실행"}
      </BuddyButton>
    </AppShell>
  );
}

type ParticipantManageHeroCardProps = {
  title: string;
  currentCount: number;
  capacity: number;
  remainCount: number;
  capacityRate: number;
};

function ParticipantManageHeroCard({
  title,
  currentCount,
  capacity,
  remainCount,
  capacityRate,
}: ParticipantManageHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">PARTICIPANTS</p>
            <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-[#2F3A40]">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
              참석자를 추가하거나 제거하고, 자리배치를 실행할 수 있어요.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#DFF5F3] px-4 py-3 text-center">
            <p className="text-xs font-medium text-[#6C7A80]">참석</p>
            <p className="mt-1 text-xl font-bold text-[#3AAFA9]">
              {currentCount}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F3F5F6] px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[#6C7A80]">정원 현황</span>
            <span className="font-bold text-[#2F3A40]">
              {currentCount} / {capacity}명
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E2E6E8]">
            <div
              className="h-full rounded-full bg-[#3AAFA9]"
              style={{ width: `${Math.min(capacityRate, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniParticipantMetric
            icon={<Users size={15} />}
            label="참석"
            value={`${currentCount}명`}
          />
          <MiniParticipantMetric
            icon={<UserRound size={15} />}
            label="정원"
            value={`${capacity}명`}
          />
          <MiniParticipantMetric
            icon={<Plus size={15} />}
            label="여유"
            value={`${remainCount}명`}
          />
        </div>
      </div>
    </BuddyCard>
  );
}

type MiniParticipantMetricProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function MiniParticipantMetric({
  icon,
  label,
  value,
}: MiniParticipantMetricProps) {
  return (
    <div className="rounded-2xl bg-[#F3F5F6] px-3 py-3 text-center">
      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-xl bg-white text-[#3AAFA9]">
        {icon}
      </div>
      <p className="mt-2 text-[11px] font-medium text-[#6C7A80]">{label}</p>
      <p className="mt-1 truncate text-xs font-bold text-[#2F3A40]">{value}</p>
    </div>
  );
}

type ParticipantManageCardProps = {
  name: string;
  nickname?: string;
  email: string;
  removing: boolean;
  onRemoveClick: () => void;
};

function ParticipantManageCard({
  name,
  nickname,
  email,
  removing,
  onRemoveClick,
}: ParticipantManageCardProps) {
  const displayName =
    nickname == null || nickname.trim() === "" ? name : `${nickname} · ${name}`;

  return (
    <BuddyCard>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-sm font-bold text-[#3AAFA9]">
          {name.slice(0, 1)}
        </div>

        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-bold text-[#2F3A40]">
            {displayName}
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs text-[#6C7A80]">
            <Mail size={13} className="shrink-0" />
            <span className="min-w-0 truncate">{email}</span>
          </div>

          <div className="mt-3 inline-flex rounded-full bg-[#F3F5F6] px-3 py-1 text-xs font-bold text-[#6C7A80]">
            참여 예정
          </div>
        </div>

        <button
          type="button"
          disabled={removing}
          onClick={onRemoveClick}
          className="px-3 py-2 text-xs font-bold text-red-500 transition shrink-0 rounded-xl bg-red-50 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="inline-flex items-center gap-1">
            <Trash2 size={13} />
            {removing ? "제거 중" : "제거"}
          </span>
        </button>
      </div>
    </BuddyCard>
  );
}

type EmptyParticipantStateProps = {
  onAddClick: () => void;
};

function EmptyParticipantState({ onAddClick }: EmptyParticipantStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-white px-5 py-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DFF5F3] text-[#3AAFA9]">
        <Users size={22} />
      </div>

      <p className="mt-4 text-sm font-bold text-[#2F3A40]">
        아직 참석자가 없어요
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
        참석자를 추가하면 이곳에서 목록을 확인할 수 있어요.
      </p>

      <div className="mt-5">
        <BuddyButton variant="secondary" onClick={onAddClick}>
          참석자 추가
        </BuddyButton>
      </div>
    </div>
  );
}

const AdminSessionLoading = ({ onBackBtnClick }: AdminSessionLoadingProps) => {
  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={onBackBtnClick} />

      <PageTitle
        title="참석자 관리"
        subtitle="참석자 정보를 불러오고 있어요."
      />

      <div className="pb-8 space-y-4">
        <SkeletonHero />
        <SkeletonParticipant />
        <SkeletonParticipant />
        <SkeletonParticipant />
      </div>
    </AppShell>
  );
};

function SkeletonHero() {
  return (
    <BuddyCard>
      <div className="space-y-4">
        <div className="h-3 w-28 animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-6 w-52 animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-4 w-full animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-16 animate-pulse rounded-2xl bg-[#F3F5F6]" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-20 animate-pulse rounded-2xl bg-[#F3F5F6]" />
          <div className="h-20 animate-pulse rounded-2xl bg-[#F3F5F6]" />
          <div className="h-20 animate-pulse rounded-2xl bg-[#F3F5F6]" />
        </div>
      </div>
    </BuddyCard>
  );
}

function SkeletonParticipant() {
  return (
    <div className="rounded-2xl border border-[#E2E6E8] bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 animate-pulse rounded-2xl bg-[#DFF5F3]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 animate-pulse rounded-full bg-[#E2E6E8]" />
          <div className="h-3 w-48 animate-pulse rounded-full bg-[#E2E6E8]" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-[#F3F5F6]" />
        </div>
      </div>
    </div>
  );
}
