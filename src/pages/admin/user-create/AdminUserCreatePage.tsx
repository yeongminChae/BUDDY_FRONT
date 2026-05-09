import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { AppShell } from "../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../shared/ui/app-header/AppHeader";
import { BottomActionBar } from "../../../shared/ui/bottom-action-bar/BottomActionBar";
import { BuddyButton } from "../../../shared/ui/buddy-button/BuddyButton";
import { BuddyCard } from "../../../shared/ui/buddy-card/BuddyCard";
import { BuddyInput } from "../../../shared/ui/buddy-input/BuddyInput";
import { PageTitle } from "../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../shared/ui/section-block/SectionBlock";
import { useForm } from "react-hook-form";
import { unwrapApiResponse } from "../../../features/client-common/unwrapApiResponse";
import type { CreateAdminUserRequest } from "../../../features/admin/user/user-create/model/CreateAdminUserRequest";
import { createAdminUser } from "../../../features/admin/user/user-create/api/CreateAdminUser";
import {
  BriefcaseBusiness,
  Mail,
  Save,
  UserRound,
  Users,
  BadgeCheck,
} from "lucide-react";
import React from "react";

export type UserCreateForm = {
  email: string;
  name: string;
  nickname: string;
  gender: string;
  role: string;
  level: string;
  status: string;
  jobs: string;
  mbti: string;
};

export function AdminUserCreatePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserCreateForm>({
    defaultValues: {
      email: "",
      name: "",
      nickname: "",
      gender: "M",
      role: "USER",
      level: "1",
      status: "ACTIVE",
      jobs: "",
      mbti: "ISTJ",
    },
  });

  const watchedName = watch("name");
  const watchedNickname = watch("nickname");
  const watchedEmail = watch("email");
  const watchedJobs = watch("jobs");
  // const watchedGender = watch("gender");
  const watchedRole = watch("role");
  const watchedLevel = watch("level");
  const watchedStatus = watch("status");
  // const watchedMbti = watch("mbti");

  const previewName = useMemo(() => {
    const name = watchedName.trim();
    const nickname = watchedNickname.trim();

    if (name === "" && nickname === "") return "새 멤버";
    if (name !== "" && nickname === "") return name;
    if (name === "" && nickname !== "") return nickname;

    return `${nickname} · ${name}`;
  }, [watchedName, watchedNickname]);

  const onSubmit = async (form: UserCreateForm) => {
    try {
      const request: CreateAdminUserRequest = {
        email: form.email.trim(),
        name: form.name.trim(),
        nickname: form.nickname.trim(),
        gender: form.gender as "M" | "F",
        role: form.role as "USER" | "ADMIN" | "STAFF",
        level: Number(form.level),
        status: form.status as "ACTIVE" | "INACTIVE",
        jobs: form.jobs.trim() === "" ? null : form.jobs.trim(),
        mbti: form.mbti.trim() === "" ? null : form.mbti,
      };

      const response = await createAdminUser(request);
      unwrapApiResponse(response);

      window.alert("저장되었습니다.");
      navigate("/admin/users");
    } catch (error) {
      console.error("유저 저장 실패", error);
      window.alert("유저 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <AppShell hasBottomBar>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate("/admin/users")}
      />

      <PageTitle
        title="유저 추가"
        subtitle="초기 등록용으로 관리자가 직접 유저 정보를 입력해요."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 pb-36">
          <UserCreateHeroCard
            displayName={previewName}
            email={watchedEmail}
            job={watchedJobs}
            role={watchedRole}
            status={watchedStatus}
            level={watchedLevel}
          />

          <SectionBlock
            title="기본 정보"
            description="유저를 식별하기 위한 이름, 닉네임, 이메일을 입력해요."
          >
            <BuddyCard>
              <div className="space-y-4">
                <FormField errorMessage={errors.email?.message}>
                  <BuddyInput
                    label="이메일"
                    placeholder="이메일을 입력하세요"
                    {...register("email", {
                      validate: (value) => {
                        if (value.trim() === "") return true;

                        return (
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                          "올바른 이메일 형식이 아닙니다."
                        );
                      },
                    })}
                  />
                </FormField>

                <FormField errorMessage={errors.name?.message}>
                  <BuddyInput
                    label="이름"
                    placeholder="이름을 입력하세요"
                    {...register("name", {
                      required: "이름은 필수입니다.",
                    })}
                  />
                </FormField>

                <FormField errorMessage={errors.nickname?.message}>
                  <BuddyInput
                    label="닉네임"
                    placeholder="닉네임을 입력하세요"
                    {...register("nickname", {
                      required: "닉네임은 필수입니다.",
                    })}
                  />
                </FormField>

                <FormField errorMessage={errors.jobs?.message}>
                  <BuddyInput
                    label="직업"
                    placeholder="예: 개발자, 대학생, 마케터"
                    {...register("jobs", {
                      required: "직업은 필수입니다.",
                    })}
                  />
                </FormField>
              </div>
            </BuddyCard>
          </SectionBlock>

          <SectionBlock
            title="프로필 정보"
            description="모임 운영과 자기소개에 활용할 기본 프로필이에요."
          >
            <BuddyCard>
              <div className="grid grid-cols-2 gap-3">
                <SelectField
                  label="성별"
                  errorMessage={errors.gender?.message}
                  {...register("gender", {
                    required: "성별은 필수입니다.",
                  })}
                >
                  <option value="">선택 안 함</option>
                  <option value="M">남성</option>
                  <option value="F">여성</option>
                </SelectField>

                <SelectField
                  label="MBTI"
                  errorMessage={errors.mbti?.message}
                  {...register("mbti", {
                    required: "MBTI는 필수입니다.",
                  })}
                >
                  <option value="">선택 안 함</option>
                  {MBTI_OPTIONS.map((mbti) => (
                    <option key={mbti} value={mbti}>
                      {mbti}
                    </option>
                  ))}
                </SelectField>

                <SelectField
                  label="레벨"
                  errorMessage={errors.level?.message}
                  {...register("level", {
                    required: "레벨은 필수입니다.",
                  })}
                >
                  <option value="1">Lv.1</option>
                  <option value="2">Lv.2</option>
                  <option value="3">Lv.3</option>
                  <option value="4">Lv.4</option>
                  <option value="5">Lv.5</option>
                </SelectField>

                <SelectField
                  label="상태"
                  errorMessage={errors.status?.message}
                  {...register("status", {
                    required: "상태는 필수입니다.",
                  })}
                >
                  <option value="ACTIVE">활동</option>
                  <option value="INACTIVE">비활동</option>
                </SelectField>
              </div>
            </BuddyCard>
          </SectionBlock>

          <SectionBlock
            title="운영 권한"
            description="일반 유저, 스탭, 관리자 역할을 설정해요."
          >
            <BuddyCard>
              <div className="space-y-4">
                <SelectField
                  label="역할"
                  errorMessage={errors.role?.message}
                  {...register("role", {
                    required: "역할은 필수입니다.",
                  })}
                >
                  <option value="USER">일반 유저</option>
                  <option value="STAFF">스탭</option>
                  <option value="ADMIN">관리자</option>
                </SelectField>

                <div className="rounded-2xl bg-[#F3F5F6] px-4 py-3">
                  <p className="text-xs font-bold text-[#2F3A40]">
                    역할 설정 참고
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#6C7A80]">
                    일반 유저는 모임 참여자, 스탭은 세션 운영자, 관리자는 유저와
                    세션을 관리하는 권한으로 구분해요.
                  </p>
                </div>
              </div>
            </BuddyCard>
          </SectionBlock>
        </div>

        <BottomActionBar>
          <div className="grid grid-cols-1 gap-3">
            <BuddyButton
              fullWidth
              type="submit"
              leftIcon={<Save size={18} />}
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중..." : "저장"}
            </BuddyButton>

            <BuddyButton
              fullWidth
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/users")}
            >
              취소
            </BuddyButton>
          </div>
        </BottomActionBar>
      </form>
    </AppShell>
  );
}

type UserCreateHeroCardProps = {
  displayName: string;
  email: string;
  job: string;
  role: string;
  status: string;
  level: string;
};

function UserCreateHeroCard({
  displayName,
  email,
  job,
  role,
  status,
  level,
}: UserCreateHeroCardProps) {
  const firstLetter = displayName === "새 멤버" ? "B" : displayName.slice(0, 1);

  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-lg font-bold text-[#3AAFA9]">
            {firstLetter}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">NEW MEMBER</p>
            <h2 className="mt-2 truncate text-lg font-bold text-[#2F3A40]">
              {displayName}
            </h2>

            <div className="flex flex-wrap gap-2 mt-2">
              <RoleBadge role={role} />
              <StatusBadge status={status} />
            </div>
          </div>
        </div>

        <div className="space-y-2.5 rounded-2xl bg-[#F3F5F6] px-4 py-3">
          <InfoRow
            icon={<Mail size={15} />}
            text={email.trim() === "" ? "이메일 미입력" : email}
          />
          <InfoRow
            icon={<BriefcaseBusiness size={15} />}
            text={job.trim() === "" ? "직업 미입력" : job}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniPreviewCard
            icon={<UserRound size={15} />}
            label="레벨"
            value={`Lv.${level}`}
          />
          <MiniPreviewCard
            icon={<Users size={15} />}
            label="역할"
            value={getRoleLabel(role)}
          />
          <MiniPreviewCard
            icon={<BadgeCheck size={15} />}
            label="상태"
            value={getStatusLabel(status)}
          />
        </div>
      </div>
    </BuddyCard>
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

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  errorMessage?: string;
};

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, errorMessage, children, ...props }, ref) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#2F3A40]">
          {label}
        </label>

        <select
          ref={ref}
          {...props}
          className="h-12 w-full rounded-xl border border-[#E2E6E8] bg-white px-3 text-sm font-medium text-[#2F3A40] outline-none transition focus:border-[#3AAFA9]"
        >
          {children}
        </select>

        {errorMessage != null && (
          <p className="mt-1.5 text-sm font-medium text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

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

const MBTI_OPTIONS = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];
