import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { BuddyCard } from "../../../../../shared/ui/buddy-card/BuddyCard";
import { BuddyInput } from "../../../../../shared/ui/buddy-input/BuddyInput";
import { SectionBlock } from "../../../../../shared/ui/section-block/SectionBlock";
import { FormField, type TempAttendanceForm } from "../TempAttendancePage";

type WordInputProps = {
  errors: FieldErrors<TempAttendanceForm>;
  register: UseFormRegister<TempAttendanceForm>;
  watch: UseFormWatch<TempAttendanceForm>;
};

export const WordInput = ({ errors, register, watch }: WordInputProps) => {
  const watchedWord = watch("phrase");
  const watchedExample = watch("example");

  return (
    <SectionBlock
      title="오늘의 영어 표현"
      description="오늘 기억하고 싶은 영어 단어나 표현을 남겨주세요."
    >
      <BuddyCard>
        <div className="space-y-4">
          <FormField errorMessage={errors.phrase?.message}>
            <BuddyInput
              label="영어 표현 및 단어"
              placeholder="예: maintain, I see your point"
              {...register("phrase", {
                required: "오늘의 영어 표현을 입력해주세요.",
                maxLength: {
                  value: 100,
                  message: "표현은 100자 이하로 입력해주세요.",
                },
              })}
            />
            <p className="mt-1 ml-1 text-xs text-[#6C7A80]">
              {(watchedWord ?? "").length} / 100
            </p>
          </FormField>

          <FormField errorMessage={errors.example?.message}>
            <BuddyInput
              label="예문"
              placeholder="예: I try to maintain a healthy routine."
              {...register("example", {
                maxLength: {
                  value: 300,
                  message: "예문은 300자 이하로 입력해주세요.",
                },
              })}
            />
            <p className="mt-1 ml-1 text-xs text-[#6C7A80]">
              {(watchedExample ?? "").length} / 300
            </p>
          </FormField>

          <div className="rounded-2xl bg-[#F3F5F6] px-4 py-3">
            <p className="text-xs font-bold text-[#2F3A40]">이렇게 활용돼요</p>
            <p className="mt-1 text-xs leading-relaxed text-[#6C7A80]">
              입력한 표현과 예문은 출석 기록과 함께 저장되고, 나중에 세션
              복습에서 다시 확인할 수 있어요.
            </p>
          </div>
        </div>
      </BuddyCard>
    </SectionBlock>
  );
};
