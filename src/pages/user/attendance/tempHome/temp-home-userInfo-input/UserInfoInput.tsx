import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { SectionBlock } from "../../../../../shared/ui/section-block/SectionBlock";
import { BuddyCard } from "../../../../../shared/ui/buddy-card/BuddyCard";
import { BuddyInput } from "../../../../../shared/ui/buddy-input/BuddyInput";
import { FormField, type TempAttendanceForm } from "../TempAttendancePage";

type UserInfoInputProps = {
  errors: FieldErrors<TempAttendanceForm>;
  register: UseFormRegister<TempAttendanceForm>;
};

export const UserInfoInput = ({ errors, register }: UserInfoInputProps) => {
  return (
    <SectionBlock
      title="본인 확인"
      description="출석 확인을 위해 이름과 소모임 닉네임을 입력해주세요."
    >
      <BuddyCard>
        <div className="space-y-4">
          <FormField errorMessage={errors.name?.message}>
            <BuddyInput
              label="이름"
              placeholder="이름을 입력해주세요"
              {...register("name", {
                required: "이름을 입력해주세요.",
              })}
            />
          </FormField>

          <FormField errorMessage={errors.nickname?.message}>
            <BuddyInput
              label="소모임 닉네임"
              placeholder="닉네임을 입력해주세요"
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
              })}
            />
          </FormField>
        </div>
      </BuddyCard>
    </SectionBlock>
  );
};
