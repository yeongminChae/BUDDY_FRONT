import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import type { GetAdminUserListResponse } from "../../../features/admin/user/user-get/model/UserList/GetAdminUserListResponse";
import { getAdminUserList } from "../../../features/admin/user/user-get/api/GetAdminUserList";
import { unwrapApiResponse } from "../../../features/client-common/unwrapApiResponse";
import { sleep } from "../../../shared/lib/cn";
import { Mail, Plus, Search, UserRound, Users, UserCheck } from "lucide-react";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";

type AdminUserListLoadingProps = {
  onBackBtnClick: () => void;
};

export function AdminUserListPage() {
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [userData, setUserData] = useState<GetAdminUserListResponse | null>(
    null
  );
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const users = userData?.users ?? [];
  const hasNext = userData?.hasNext ?? false;
  const totalUserCount = userData?.totalUserCount ?? 0;

  const handleLoadMore = () => {
    if (isLoading || hasNext === false) return;

    setOffset((prev) => prev + 10);
  };

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    setOffset(0);
  };

  useEffect(() => {
    const getUserList = async () => {
      try {
        setIsLoading(true);

        const response = await getAdminUserList({
          query,
          limit: 10,
          offset,
        });

        const data = unwrapApiResponse(response);

        await sleep(500);

        setUserData((prev) => {
          if (prev == null || offset === 0) return data;

          const merged = [...prev.users, ...data.users];
          const unique = merged.filter(
            (item, index, arr) =>
              arr.findIndex((target) => target.userId === item.userId) === index
          );

          return {
            ...data,
            users: unique,
          };
        });
      } catch (error) {
        console.error("유저 목록 조회 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserList();
  }, [query, offset]);

  useEffect(() => {
    if (loadMoreRef.current == null) return;
    if (userData == null) return;
    if (userData.hasNext === false) return;
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
  }, [userData, isLoading]);

  if (userData == null) {
    return (
      <AdminUserListLoading
        onBackBtnClick={() => navigate("/admin/sessions")}
      />
    );
  }

  return (
    <AppShell hasBottomBar>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate("/admin/sessions")}
      />

      <PageTitle
        title="유저 관리"
        subtitle="전체 유저의 상태와 최근 활동을 확인하고 관리해요."
      />

      <div className="space-y-6 pb-28">
        <AdminUserListHeroCard
          totalUserCount={totalUserCount}
          loadedUserCount={users.length}
          activeUserCount={
            users.filter((user) => user.status === "ACTIVE").length
          }
          staffUserCount={users.filter((user) => user.role === "STAFF").length}
        />

        <SectionBlock
          title="유저 검색"
          description="이름이나 닉네임으로 유저를 찾아요."
        >
          <BuddyCard>
            <div className="flex items-center gap-3 rounded-2xl border border-[#E2E6E8] bg-[#F9FBFB] px-4 py-3">
              <Search size={18} className="shrink-0 text-[#6C7A80]" />

              <input
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                placeholder="유저 이름 검색"
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#2F3A40] outline-none placeholder:text-[#6C7A80]"
              />
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[#6C7A80]">
              검색어를 입력하면 유저 목록을 다시 불러와요.
            </p>
          </BuddyCard>
        </SectionBlock>

        <SectionBlock
          title={`전체 유저 (${totalUserCount})`}
          description="유저를 선택하면 상세 정보와 출석 기록을 확인할 수 있어요."
        >
          {users.length === 0 ? (
            <EmptyUserState
              query={query}
              onCreateClick={() => navigate("/admin/users/create")}
            />
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <AdminUserListCard
                  key={user.userId}
                  name={user.name}
                  nickname={user.nickname}
                  //email={user.email}
                  level={user.level}
                  recentSession={user.recentSessionTitle ?? ""}
                  status={user.status}
                  role={user.role}
                  attendanceRate={user.attendanceRate}
                  onClick={() => navigate(`/admin/users/${user.userId}`)}
                />
              ))}
            </div>
          )}

          <div ref={loadMoreRef} className="h-10" />

          {isLoading && (
            <div className="py-4 text-center text-sm text-[#6C7A80]">
              불러오는 중...
            </div>
          )}

          {hasNext === false && users.length > 0 && (
            <div className="py-4 text-center text-xs text-[#6C7A80]">
              모든 유저를 확인했어요.
            </div>
          )}
        </SectionBlock>
      </div>

      <BottomActionBar>
        <BuddyButton
          fullWidth
          leftIcon={<Plus size={18} />}
          onClick={() => navigate("/admin/users/create")}
        >
          유저 추가
        </BuddyButton>
      </BottomActionBar>
    </AppShell>
  );
}

type AdminUserListHeroCardProps = {
  totalUserCount: number;
  loadedUserCount: number;
  activeUserCount: number;
  staffUserCount: number;
};

function AdminUserListHeroCard({
  totalUserCount,
  loadedUserCount,
  activeUserCount,
  staffUserCount,
}: AdminUserListHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">
              USER MANAGEMENT
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#2F3A40]">
              Buddy 멤버를 한눈에 관리해요
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
              유저 상태, 최근 활동, 상세 정보를 확인할 수 있어요.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#DFF5F3] px-4 py-3 text-center">
            <p className="text-xs font-medium text-[#6C7A80]">전체</p>
            <p className="mt-1 text-xl font-bold text-[#3AAFA9]">
              {totalUserCount}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniUserMetric
            icon={<Users size={15} />}
            label="불러온 유저"
            value={`${loadedUserCount}명`}
          />
          <MiniUserMetric
            icon={<UserCheck size={15} />}
            label="활동 유저"
            value={`${activeUserCount}명`}
          />
          <MiniUserMetric
            icon={<UserRound size={15} />}
            label="스탭"
            value={`${staffUserCount}명`}
          />
        </div>
      </div>
    </BuddyCard>
  );
}

type AdminUserListCardProps = {
  name: string;
  nickname?: string;
  email?: string;
  level: number;
  recentSession: string;
  status: string;
  role: string;
  attendanceRate: number;
  onClick: () => void;
};

function AdminUserListCard({
  name,
  nickname,
  email,
  level,
  recentSession,
  status,
  role,
  attendanceRate,
  onClick,
}: AdminUserListCardProps) {
  const displayName =
    nickname == null || nickname.trim() === "" ? name : `${nickname} · ${name}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-[#E2E6E8] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F9FBFB]"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-sm font-bold text-[#3AAFA9]">
          {name.slice(0, 1)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#2F3A40]">
                {displayName}
              </p>

              {email != null && email.trim() !== "" && (
                <div className="mt-2 flex items-center gap-2 text-xs text-[#6C7A80]">
                  <Mail size={13} className="shrink-0" />
                  <span className="min-w-0 truncate">{email}</span>
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-end gap-1.5">
              <RoleBadge role={role} />
              <StatusBadge status={status} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <SmallInfoPill label="레벨" value={`Lv.${level}`} />
            <SmallInfoPill
              label="출석률"
              value={`${attendanceRate == null ? 0 : attendanceRate}%`}
            />
            <SmallInfoPill
              label="최근 세션"
              value={recentSession.trim() === "" ? "없음" : recentSession}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

type RoleBadgeProps = {
  role: string;
};

function RoleBadge({ role }: RoleBadgeProps) {
  const label = getRoleLabel(role);

  const className =
    role === "USER"
      ? "bg-[#F3F5F6] text-[#2F3A40]"
      : "bg-[#DFF5F3] text-[#3AAFA9]";

  return (
    <span
      className={[
        "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold",
        className,
      ].join(" ")}
    >
      {label}
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
  const label = getStatusLabel(status);

  const className =
    status === "ACTIVE"
      ? "bg-[#DFF5F3] text-[#3AAFA9]"
      : status === "STAFF"
        ? "bg-[#F3F5F6] text-[#2F3A40]"
        : "bg-red-50 text-red-500";

  return (
    <span
      className={[
        "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold",
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function getStatusLabel(status: string) {
  if (status === "ACTIVE") return "활동";
  if (status === "INACTIVE") return "비활동";

  return status;
}

type SmallInfoPillProps = {
  label: string;
  value: string;
};

function SmallInfoPill({ label, value }: SmallInfoPillProps) {
  return (
    <div className="rounded-xl bg-[#F3F5F6] px-2 py-2 text-center">
      <p className="text-[10px] font-medium text-[#6C7A80]">{label}</p>
      <p className="mt-1 truncate text-xs font-bold text-[#2F3A40]">{value}</p>
    </div>
  );
}

type MiniUserMetricProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function MiniUserMetric({ icon, label, value }: MiniUserMetricProps) {
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

type EmptyUserStateProps = {
  query: string;
  onCreateClick: () => void;
};

function EmptyUserState({ query, onCreateClick }: EmptyUserStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-white px-5 py-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F6] text-[#6C7A80]">
        <Search size={22} />
      </div>

      <p className="mt-4 text-sm font-bold text-[#2F3A40]">
        유저를 찾을 수 없어요
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
        {query.trim() === ""
          ? "아직 등록된 유저가 없어요."
          : "검색어를 바꿔서 다시 찾아보세요."}
      </p>

      <div className="mt-5">
        <BuddyButton variant="secondary" onClick={onCreateClick}>
          유저 추가
        </BuddyButton>
      </div>
    </div>
  );
}

const AdminUserListLoading = ({
  onBackBtnClick,
}: AdminUserListLoadingProps) => {
  return (
    <AppShell>
      <AppHeader showBackButton title="Buddy" onBack={onBackBtnClick} />

      <PageTitle title="유저 관리" subtitle="유저 정보를 불러오고 있어요." />

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
        <div className="h-3 w-32 animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-6 w-52 animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="h-4 w-full animate-pulse rounded-full bg-[#E2E6E8]" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-20 animate-pulse rounded-2xl bg-[#F3F5F6]" />
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
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-12 animate-pulse rounded-xl bg-[#F3F5F6]" />
            <div className="h-12 animate-pulse rounded-xl bg-[#F3F5F6]" />
            <div className="h-12 animate-pulse rounded-xl bg-[#F3F5F6]" />
          </div>
        </div>
      </div>
    </div>
  );
}
