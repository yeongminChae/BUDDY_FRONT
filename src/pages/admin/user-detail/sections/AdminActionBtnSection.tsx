import { BuddyButton } from "../../../../shared/ui/buddy-button/BuddyButton";
import { SectionBlock } from "../../../../shared/ui/section-block/SectionBlock";

type AdminActionSectionProps = {
  role: "USER" | "STAFF" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  isUpdatingRole: boolean;
  isUpdatingStatus: boolean;
  onToggleStaffClick: () => void;
  onToggleActiveClick: () => void;
};

export function AdminActionSection({
  role,
  status,
  isUpdatingRole,
  isUpdatingStatus,
  onToggleStaffClick,
  onToggleActiveClick,
}: AdminActionSectionProps) {
  const isStaff = role === "STAFF";
  const isAdmin = role === "ADMIN";
  const isActive = status === "ACTIVE";

  return (
    <SectionBlock
      title="관리자 기능"
      description="유저 권한과 활동 상태를 관리해요."
    >
      <div className="space-y-3">
        <BuddyButton
          fullWidth
          variant="secondary"
          disabled={isUpdatingRole || isAdmin}
          onClick={onToggleStaffClick}
        >
          {isUpdatingRole
            ? "권한 변경 중..."
            : isAdmin
              ? "관리자는 스태프 변경 불가"
              : isStaff
                ? "일반 유저로 변경"
                : "스태프로 지정"}
        </BuddyButton>

        <BuddyButton
          fullWidth
          variant={isActive ? "danger" : "secondary"}
          disabled={isUpdatingStatus}
          onClick={onToggleActiveClick}
        >
          {isUpdatingStatus
            ? "상태 변경 중..."
            : isActive
              ? "유저 비활성화"
              : "유저 활성화"}
        </BuddyButton>
      </div>
    </SectionBlock>
  );
}
