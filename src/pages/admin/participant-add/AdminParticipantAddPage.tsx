import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { GetAdminParticipantAddCandidate } from "../../../features/admin/session-applicant/session-applicant-add/api/GetAdminParticipantAddCandidate";
import { unwrapApiResponse } from "../../../features/client-common/unwrapApiResponse";
import type { GetAdminParticipantAddCandidateResponse } from "../../../features/admin/session-applicant/session-applicant-add/model/GetAdminParticipantAddCandidateResponse";
import { AddSessionParticipants } from "../../../features/admin/session-applicant/session-applicant-add/api/AddSessionParticipants";
import { sleep } from "../../../shared/lib/cn";
import { Check, Mail, Plus, Search, UserPlus, Users, X } from "lucide-react";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";

type AdminSessionLoadingProps = {
  onBackBtnClick: () => void;
};

export function AdminParticipantAddPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const selectedUsersRef = useRef<HTMLDivElement | null>(null);

  const [candidateData, setCandidateData] =
    useState<GetAdminParticipantAddCandidateResponse | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const getUserList = async () => {
      try {
        setIsLoading(true);

        const response = await GetAdminParticipantAddCandidate({
          sessionId: Number(sessionId),
          query,
          limit: 10,
          offset,
        });

        const data = unwrapApiResponse(response);

        await sleep(250);

        setCandidateData((prev) => {
          if (prev == null || offset === 0) return data;

          const merged = [...prev.candidates, ...data.candidates];
          const unique = merged.filter(
            (item, index, arr) =>
              arr.findIndex((target) => target.userId === item.userId) === index
          );

          return {
            ...data,
            candidates: unique,
          };
        });
      } catch (error) {
        console.error("유저 목록 조회 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserList();
  }, [sessionId, query, offset]);

  const candidates = candidateData?.candidates ?? [];
  const hasNext = candidateData?.hasNext ?? false;

  const selectedUsers = candidates.filter((user) =>
    selectedUserIds.includes(user.userId)
  );

  useEffect(() => {
    if (loadMoreRef.current == null) return;
    if (candidateData == null) return;
    if (candidateData.hasNext === false) return;
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && isLoading === false) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [candidateData, isLoading]);

  useEffect(() => {
    const element = selectedUsersRef.current;
    if (element == null) return;

    const checkOverflow = () => {
      const collapsedMaxHeight = 144;
      setIsOverflowing(element.scrollHeight > collapsedMaxHeight);
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [selectedUsers]);

  if (candidateData == null) {
    return (
      <AdminSessionLoading onBackBtnClick={() => navigate("/admin/sessions")} />
    );
  }

  const handleToggleUser = (userId: number) => {
    setSelectedUserIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }

      return [...prev, userId];
    });
  };

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    setOffset(0);
    setIsExpanded(false);
  };

  const handleLoadMore = () => {
    if (isLoading || hasNext === false) return;

    setOffset((prev) => prev + 10);
  };

  const onAddBtnClicked = async () => {
    if (selectedUserIds.length === 0) return;

    try {
      setIsAdding(true);

      const response = await AddSessionParticipants(Number(sessionId), {
        userIds: selectedUserIds,
      });

      const data = unwrapApiResponse(response);

      if (data?.addedUserCount === selectedUserIds.length) {
        navigate(`/admin/sessions/${sessionId}/participants`);
      }
    } catch (error) {
      console.error("유저 추가 실패", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <AppShell hasBottomBar>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate(`/admin/sessions/${sessionId}/participants`)}
      />

      <PageTitle
        title="참석자 추가"
        subtitle="세션에 추가할 유저를 검색하고 선택해요."
      />

      <div className="space-y-6 pb-28">
        <ParticipantAddHeroCard selectedCount={selectedUserIds.length} />

        <SectionBlock
          title="유저 검색"
          description="닉네임이나 이름으로 추가할 유저를 찾아요."
        >
          <BuddyCard>
            <div className="flex items-center gap-3 rounded-2xl border border-[#E2E6E8] bg-[#F9FBFB] px-4 py-3">
              <Search size={18} className="shrink-0 text-[#6C7A80]" />

              <input
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                placeholder="닉네임 / 이름 검색"
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#2F3A40] outline-none placeholder:text-[#6C7A80]"
              />
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[#6C7A80]">
              이미 세션에 참여 중인 유저는 후보에서 제외되어야 해요.
            </p>
          </BuddyCard>
        </SectionBlock>

        <SelectedUserSection
          selectedUsers={selectedUsers}
          selectedUsersRef={selectedUsersRef}
          isExpanded={isExpanded}
          isOverflowing={isOverflowing}
          onToggleExpanded={() => setIsExpanded((prev) => prev === false)}
          onRemoveUser={handleToggleUser}
        />

        <SectionBlock
          title="추가 후보"
          description={`${candidates.length}명의 후보를 불러왔어요.`}
        >
          {candidates.length === 0 ? (
            <EmptyCandidateState query={query} />
          ) : (
            <div className="space-y-3">
              {candidates.map((user) => {
                const isSelected = selectedUserIds.includes(user.userId);

                return (
                  <CandidateUserCard
                    key={user.userId}
                    name={user.name}
                    nickname={user.nickname}
                    email={user.email}
                    selected={isSelected}
                    onToggleClick={() => handleToggleUser(user.userId)}
                  />
                );
              })}
            </div>
          )}

          <div ref={loadMoreRef} className="h-10" />

          {isLoading && (
            <div className="py-4 text-center text-sm text-[#6C7A80]">
              불러오는 중...
            </div>
          )}

          {hasNext === false && candidates.length > 0 && (
            <div className="py-4 text-center text-xs text-[#6C7A80]">
              모든 후보를 확인했어요.
            </div>
          )}
        </SectionBlock>
      </div>

      <BottomActionBar>
        <BuddyButton
          fullWidth
          leftIcon={<UserPlus size={18} />}
          disabled={selectedUserIds.length === 0 || isAdding}
          onClick={onAddBtnClicked}
        >
          {isAdding
            ? "추가 중..."
            : selectedUserIds.length === 0
              ? "추가할 유저를 선택해주세요"
              : `${selectedUserIds.length}명 추가 완료`}
        </BuddyButton>
      </BottomActionBar>
    </AppShell>
  );
}

type ParticipantAddHeroCardProps = {
  selectedCount: number;
};

function ParticipantAddHeroCard({
  selectedCount,
}: ParticipantAddHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">ADD MEMBERS</p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#2F3A40]">
              세션에 참여할 유저를 선택해요
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
              검색 결과에서 유저를 선택하면 아래 선택 목록에 추가돼요.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#DFF5F3] px-4 py-3 text-center">
            <p className="text-xs font-medium text-[#6C7A80]">선택</p>
            <p className="mt-1 text-xl font-bold text-[#3AAFA9]">
              {selectedCount}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MiniInfoCard
            icon={<Users size={15} />}
            label="후보 선택"
            value="복수 선택"
          />
          <MiniInfoCard
            icon={<Check size={15} />}
            label="완료"
            value="하단 버튼"
          />
        </div>
      </div>
    </BuddyCard>
  );
}

type SelectedUserSectionProps = {
  selectedUsers: {
    userId: number;
    name: string;
    nickname?: string;
    email: string;
  }[];
  selectedUsersRef: React.RefObject<HTMLDivElement>;
  isExpanded: boolean;
  isOverflowing: boolean;
  onToggleExpanded: () => void;
  onRemoveUser: (userId: number) => void;
};

function SelectedUserSection({
  selectedUsers,
  selectedUsersRef,
  isExpanded,
  isOverflowing,
  onToggleExpanded,
  onRemoveUser,
}: SelectedUserSectionProps) {
  return (
    <SectionBlock
      title="선택한 참석자"
      description={`현재 ${selectedUsers.length}명을 선택했어요.`}
    >
      <BuddyCard>
        {selectedUsers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-[#F9FBFB] px-5 py-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DFF5F3] text-[#3AAFA9]">
              <Plus size={20} />
            </div>
            <p className="mt-3 text-sm font-bold text-[#2F3A40]">
              아직 선택한 유저가 없어요
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#6C7A80]">
              아래 후보 목록에서 추가할 유저를 선택해주세요.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div
              ref={selectedUsersRef}
              className={[
                "flex flex-wrap gap-2 transition-all duration-200",
                isExpanded ? "" : "max-h-36 overflow-hidden",
              ].join(" ")}
            >
              {selectedUsers.map((candidate) => (
                <SelectedUserChip
                  key={candidate.userId}
                  name={candidate.name}
                  nickname={candidate.nickname}
                  onRemove={() => onRemoveUser(candidate.userId)}
                />
              ))}
            </div>

            {isOverflowing && (
              <button
                type="button"
                className="block w-full rounded-2xl bg-[#F3F5F6] px-4 py-3 text-sm font-semibold text-[#3AAFA9] transition hover:bg-[#EEF2F3]"
                onClick={onToggleExpanded}
              >
                {isExpanded ? "선택 목록 접기" : "선택 목록 펼치기"}
              </button>
            )}
          </div>
        )}
      </BuddyCard>
    </SectionBlock>
  );
}

type SelectedUserChipProps = {
  name: string;
  nickname?: string;
  onRemove: () => void;
};

function SelectedUserChip({ name, nickname, onRemove }: SelectedUserChipProps) {
  const label =
    nickname == null || nickname.trim() === "" ? name : `${nickname} · ${name}`;

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#DFF5F3] px-3 py-2 text-xs font-bold text-[#2F3A40]">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full bg-white/70 p-0.5 text-[#6C7A80] transition hover:text-red-500"
        aria-label={`${label} 선택 해제`}
      >
        <X size={13} />
      </button>
    </span>
  );
}

type CandidateUserCardProps = {
  name: string;
  nickname?: string;
  email: string;
  selected: boolean;
  onToggleClick: () => void;
};

function CandidateUserCard({
  name,
  nickname,
  email,
  selected,
  onToggleClick,
}: CandidateUserCardProps) {
  const displayName =
    nickname == null || nickname.trim() === "" ? name : `${nickname} · ${name}`;

  return (
    <BuddyCard
      className={
        selected
          ? "border-[#3AAFA9] bg-[#F9FBFB]"
          : "transition hover:-translate-y-0.5 hover:bg-[#F9FBFB]"
      }
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold",
            selected
              ? "bg-[#3AAFA9] text-white"
              : "bg-[#DFF5F3] text-[#3AAFA9]",
          ].join(" ")}
        >
          {selected ? <Check size={18} /> : name.slice(0, 1)}
        </div>

        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-bold text-[#2F3A40]">
            {displayName}
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs text-[#6C7A80]">
            <Mail size={13} className="shrink-0" />
            <span className="min-w-0 truncate">{email}</span>
          </div>

          <div
            className={[
              "mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold",
              selected
                ? "bg-[#DFF5F3] text-[#3AAFA9]"
                : "bg-[#F3F5F6] text-[#6C7A80]",
            ].join(" ")}
          >
            {selected ? "선택됨" : "추가 가능"}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleClick}
          className={[
            "shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition",
            selected
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-[#DFF5F3] text-[#3AAFA9] hover:bg-[#CFEFEB]",
          ].join(" ")}
        >
          {selected ? "- 제거" : "+ 추가"}
        </button>
      </div>
    </BuddyCard>
  );
}

type EmptyCandidateStateProps = {
  query: string;
};

function EmptyCandidateState({ query }: EmptyCandidateStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-white px-5 py-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F6] text-[#6C7A80]">
        <Search size={22} />
      </div>

      <p className="mt-4 text-sm font-bold text-[#2F3A40]">
        추가 가능한 유저가 없어요
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
        {query.trim() === ""
          ? "아직 불러온 후보가 없거나 모든 유저가 이미 참여 중일 수 있어요."
          : "검색어를 바꿔서 다시 찾아보세요."}
      </p>
    </div>
  );
}

type MiniInfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function MiniInfoCard({ icon, label, value }: MiniInfoCardProps) {
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

const AdminSessionLoading = ({ onBackBtnClick }: AdminSessionLoadingProps) => {
  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={onBackBtnClick} />

      <PageTitle
        title="참석자 추가"
        subtitle="추가 가능한 유저를 불러오고 있어요."
      />

      <div className="pb-8 space-y-4">
        <SkeletonHero />
        <SkeletonUser />
        <SkeletonUser />
        <SkeletonUser />
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
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 animate-pulse rounded-2xl bg-[#F3F5F6]" />
          <div className="h-20 animate-pulse rounded-2xl bg-[#F3F5F6]" />
        </div>
      </div>
    </BuddyCard>
  );
}

function SkeletonUser() {
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
