import { useNavigate } from "react-router-dom";
import { AppShell } from "../../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../../shared/ui/page-title/PageTitle";
import { BuddyButton } from "../../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../../shared/ui/buddy-card/BuddyCard";
import { BuddyInput } from "../../../../shared/ui/buddy-input/BuddyInput";
import { useForm } from "react-hook-form";
import { CreateSession } from "../../../../features/admin/session/session-create/api/SessionCreate";
import { useEffect, useMemo, useState } from "react";
import { unwrapApiResponse } from "../../../../features/client-common/unwrapApiResponse";
import { getAdminUserList } from "../../../../features/admin/user/user-get/api/GetAdminUserList";
import type { GetAdminUserListResponse } from "../../../../features/admin/user/user-get/model/UserList/GetAdminUserListResponse";
import { BuddySelect } from "../../../../shared/ui/buddy-select/BuddySelect";
import {
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  UserRound,
  Users,
} from "lucide-react";
import { SectionBlock } from "../../../../shared/ui/section-block/SectionBlock";

type AdminSessionCreateFormValues = {
  title: string;
  sessionDate: string;
  sessionTime: string;
  location: string;
  capacity: number;
  topic: string;
  hostUserId: string;
};

export function AdminSessionCreatePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdminSessionCreateFormValues>({
    defaultValues: {
      title: "",
      sessionDate: "",
      sessionTime: "",
      location: "",
      capacity: 40,
      topic: "",
      hostUserId: "",
    },
  });

  const [staffData, setStaffData] = useState<GetAdminUserListResponse | null>(
    null
  );
  const [isStaffLoading, setIsStaffLoading] = useState(false);

  const watchedTitle = watch("title");
  const watchedSessionDate = watch("sessionDate");
  const watchedSessionTime = watch("sessionTime");
  const watchedLocation = watch("location");
  const watchedCapacity = watch("capacity");

  useEffect(() => {
    const getUserList = async () => {
      try {
        setIsStaffLoading(true);

        const response = await getAdminUserList({
          query: "",
          limit: 50,
          offset: 0,
          roles: ["STAFF", "ADMIN"],
        });

        const data = unwrapApiResponse(response);

        setStaffData(data);
      } catch (error) {
        console.error("유저 목록 조회 실패", error);
      } finally {
        setIsStaffLoading(false);
      }
    };

    getUserList();
  }, []);

  const staffList = staffData?.users ?? [];

  const previewTitle =
    watchedTitle.trim() === "" ? "새 영어 모임 세션" : watchedTitle;
  const previewDateTime = useMemo(() => {
    if (watchedSessionDate === "" && watchedSessionTime === "") {
      return "날짜와 시간을 선택해주세요";
    }

    if (watchedSessionDate !== "" && watchedSessionTime === "") {
      return `${watchedSessionDate} · 시간 미정`;
    }

    if (watchedSessionDate === "" && watchedSessionTime !== "") {
      return `날짜 미정 · ${watchedSessionTime}`;
    }

    return `${watchedSessionDate} · ${watchedSessionTime}`;
  }, [watchedSessionDate, watchedSessionTime]);

  const previewLocation =
    watchedLocation.trim() === "" ? "장소를 입력해주세요" : watchedLocation;

  const previewCapacity =
    Number.isNaN(watchedCapacity) || watchedCapacity == null
      ? "정원 미정"
      : `${watchedCapacity}명`;

  const onSubmit = async (data: AdminSessionCreateFormValues) => {
    try {
      const response = await CreateSession({
        title: data.title,
        sessionDate: data.sessionDate,
        sessionTime: data.sessionTime,
        location: data.location,
        capacity: data.capacity,
        topic: data.topic.trim() === "" ? null : data.topic.trim(),
        hostUserId: Number(data.hostUserId),
      });

      navigate(`/admin/sessions/${response.data?.sessionId}`);
    } catch (error) {
      console.log(error);
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
        title="세션 생성"
        subtitle="새로운 영어 모임 세션의 일정과 운영 정보를 입력해요."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-8 space-y-6">
          <SessionCreateHeroCard
            title={previewTitle}
            dateTime={previewDateTime}
            location={previewLocation}
            capacity={previewCapacity}
          />

          <SectionBlock
            title="기본 정보"
            description="관리자와 참여자에게 보여질 세션 이름과 주제를 입력해요."
          >
            <BuddyCard>
              <div className="space-y-4">
                <FormField errorMessage={errors.title?.message}>
                  <BuddyInput
                    label="세션명"
                    placeholder="예: 토요일 영어회화 정규 모임"
                    {...register("title", {
                      required: "세션명은 필수입니다.",
                    })}
                  />
                </FormField>

                <FormField errorMessage={errors.topic?.message}>
                  <BuddyInput
                    label="주제"
                    placeholder="예: 여행에서 생긴 에피소드 이야기하기"
                    {...register("topic")}
                  />
                </FormField>
              </div>
            </BuddyCard>
          </SectionBlock>

          <SectionBlock
            title="일정과 장소"
            description="세션이 열리는 날짜, 시간, 장소를 설정해요."
          >
            <BuddyCard>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField errorMessage={errors.sessionDate?.message}>
                    <BuddyInput
                      label="날짜"
                      type="date"
                      {...register("sessionDate", {
                        required: "날짜는 필수입니다.",
                      })}
                    />
                  </FormField>

                  <FormField errorMessage={errors.sessionTime?.message}>
                    <BuddyInput
                      label="시간"
                      type="time"
                      {...register("sessionTime", {
                        required: "시간은 필수입니다.",
                      })}
                    />
                  </FormField>
                </div>

                <div className="mt-4">
                  <FormField errorMessage={errors.location?.message}>
                    <BuddyInput
                      label="장소"
                      placeholder="예: 강남 스터디룸 3층"
                      {...register("location", {
                        required: "장소는 필수입니다.",
                      })}
                    />
                  </FormField>
                </div>
              </div>
            </BuddyCard>
          </SectionBlock>

          <SectionBlock
            title="운영 설정"
            description="참여 가능 인원과 담당 스탭을 설정해요."
          >
            <BuddyCard>
              <div className="space-y-4">
                <FormField errorMessage={errors.capacity?.message}>
                  <BuddyInput
                    label="정원"
                    type="number"
                    placeholder="예: 40"
                    {...register("capacity", {
                      valueAsNumber: true,
                      required: "정원은 필수입니다.",
                      min: {
                        value: 2,
                        message: "정원은 최소 2명 이상이어야 합니다.",
                      },
                    })}
                  />
                </FormField>

                <FormField errorMessage={errors.hostUserId?.message}>
                  <BuddySelect
                    label="담당 스탭"
                    {...register("hostUserId", {
                      required: "담당 스탭을 선택해주세요.",
                    })}
                  >
                    {isStaffLoading ? (
                      <option value="">담당자 불러오는 중...</option>
                    ) : staffList.length === 0 ? (
                      <option value="">선택 가능한 담당자가 없습니다.</option>
                    ) : (
                      <>
                        <option value="">담당 스탭을 선택하세요</option>
                        {staffList.map((staff) => (
                          <option key={staff.userId} value={staff.userId}>
                            {staff.nickname} · {staff.name}
                          </option>
                        ))}
                      </>
                    )}
                  </BuddySelect>
                </FormField>
              </div>
            </BuddyCard>
          </SectionBlock>

          <BuddyButton
            fullWidth
            type="submit"
            leftIcon={<Plus size={18} />}
            disabled={isSubmitting}
          >
            {isSubmitting ? "세션 생성 중..." : "세션 생성"}
          </BuddyButton>
        </div>
      </form>
    </AppShell>
  );
}

type SessionCreateHeroCardProps = {
  title: string;
  dateTime: string;
  location: string;
  capacity: string;
};

function SessionCreateHeroCard({
  title,
  dateTime,
  location,
  capacity,
}: SessionCreateHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">NEW SESSION</p>
            <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-[#2F3A40]">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
              입력한 정보가 세션 생성 후 운영 화면에 반영돼요.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#DFF5F3] px-4 py-3 text-center">
            <p className="text-xs font-medium text-[#6C7A80]">정원</p>
            <p className="mt-1 text-xl font-bold text-[#3AAFA9]">{capacity}</p>
          </div>
        </div>

        <div className="space-y-2.5 rounded-2xl bg-[#F3F5F6] px-4 py-3">
          <InfoRow icon={<CalendarDays size={15} />} text={dateTime} />
          <InfoRow icon={<MapPin size={15} />} text={location} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniPreviewCard
            icon={<Clock size={15} />}
            label="일정"
            value="필수"
          />
          <MiniPreviewCard
            icon={<Users size={15} />}
            label="정원"
            value={capacity}
          />
          <MiniPreviewCard
            icon={<UserRound size={15} />}
            label="스탭"
            value="선택"
          />
        </div>
      </div>
    </BuddyCard>
  );
}

type MiniPreviewCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function MiniPreviewCard({ icon, label, value }: MiniPreviewCardProps) {
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

type FormFieldProps = {
  children: React.ReactNode;
  errorMessage?: string;
};

function FormField({ children, errorMessage }: FormFieldProps) {
  return (
    <div>
      {children}
      {errorMessage != null && (
        <p className="mt-1.5 text-sm font-medium text-red-500">
          {errorMessage}
        </p>
      )}
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
