import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2, MessageSquareText } from "lucide-react";
import { AppShell } from "../../../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../../../shared/ui/section-block/SectionBlock";
import { BuddyCard } from "../../../../shared/ui/buddy-card/BuddyCard";
import { BuddyInput } from "../../../../shared/ui/buddy-input/BuddyInput";
import { BuddyButton } from "../../../../shared/ui/buddy-button/BuddyButton";
import { CreateTopic } from "../../../../features/admin/topic/topic-create/api/CreateTopic";
import { BuddyTopicTextareaField } from "../../../../shared/ui/buddy-textarea/BuddyTopicTextareaField";
import { MiniMetricCard } from "../../../../shared/ui/buddy-metric-card/MiniMetricCard";

type AdminSessionTopicFormValues = {
  mainTopic: string;
  questions: {
    value: string;
  }[];
};

export function AdminSessionTopicCreatePage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdminSessionTopicFormValues>({
    defaultValues: {
      mainTopic: "",
      questions: [
        {
          value: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const watchedMainTopic = watch("mainTopic") ?? "";
  const watchedQuestions = watch("questions") ?? [];

  const previewQuestions = useMemo(() => {
    return watchedQuestions.filter((q) => (q.value ?? "").trim() !== "");
  }, [watchedQuestions]);

  const validQuestionCount = previewQuestions.length;
  const introMessage = buildIntroMessage(watchedMainTopic);

  const onSubmit = async (form: AdminSessionTopicFormValues) => {
    try {
      const request = {
        sessionId: Number(sessionId),
        mainTopic: form.mainTopic.trim(),
        questions: form.questions
          .map((question, index) => ({
            orderNo: index + 1,
            content: question.value.trim(),
          }))
          .filter((question) => question.content !== ""),
      };

      await CreateTopic(Number(sessionId), request);

      window.alert("세션 주제가 저장되었습니다.");
      navigate(`/admin/sessions/${sessionId}`);
    } catch (error) {
      console.error("세션 주제 저장 실패", error);
      window.alert("세션 주제 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <AppShell>
      <AppHeader
        showBackButton
        title="Buddy"
        onBack={() => navigate(`/admin/sessions/${sessionId}`)}
      />

      <PageTitle
        title="주제 생성"
        subtitle="세션에서 사용할 대주제와 토론 질문을 구성해요."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-10 space-y-6">
          <TopicHeroCard
            mainTopic={watchedMainTopic}
            questionCount={validQuestionCount}
          />

          <SectionBlock
            title="기본 정보"
            description="이번 세션의 대주제와 안내 문구를 입력해주세요."
          >
            <BuddyCard>
              <div className="space-y-4">
                <FormField errorMessage={errors.mainTopic?.message}>
                  <BuddyInput
                    label="대주제"
                    placeholder="예: Energy & People (에너지와 사람)"
                    {...register("mainTopic", {
                      required: "대주제는 필수입니다.",
                    })}
                  />
                </FormField>

                <div>
                  {introMessage === "" ? (
                    <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-[#F9FBFB] px-4 py-6 text-center">
                      <p className="text-sm font-semibold text-[#2F3A40]">
                        대주제를 입력해주세요
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-[#6C7A80]">
                        대주제를 입력하면 안내 문구가 자동으로 표시돼요.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-[#F3F5F6] px-4 py-4">
                      <p className="whitespace-pre-line text-sm leading-7 text-[#2F3A40]">
                        {introMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </BuddyCard>
          </SectionBlock>

          <SectionBlock
            title="토론 질문"
            description="세션에서 사용할 질문을 순서대로 입력해주세요."
          >
            <div className="space-y-3">
              {fields.map((field, index) => (
                <BuddyCard key={field.id}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="rounded-full bg-[#DFF5F3] px-3 py-1 text-xs font-bold text-[#2F3A40]">
                        질문 {index + 1}
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold transition rounded-xl text-buddyDanger hover:bg-red-100"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 size={14} />
                        삭제
                      </button>
                    </div>

                    <FormField
                      errorMessage={errors.questions?.[index]?.value?.message}
                    >
                      <BuddyTopicTextareaField
                        placeholder="예: What kind of people give you energy?"
                        rows={3}
                        {...register(`questions.${index}.value`, {
                          required: "질문 내용을 입력해주세요.",
                        })}
                      />
                    </FormField>
                  </div>
                </BuddyCard>
              ))}

              <BuddyButton
                type="button"
                fullWidth
                variant="secondary"
                leftIcon={<Plus size={16} />}
                onClick={() => append({ value: "" })}
              >
                질문 추가
              </BuddyButton>
            </div>
          </SectionBlock>

          <SectionBlock
            title="미리보기"
            description="실제로 전달될 주제 형식을 미리 확인할 수 있어요."
          >
            <BuddyCard>
              <div className="space-y-4">
                {introMessage !== "" && (
                  <div className="whitespace-pre-line text-sm leading-7 text-[#2F3A40]">
                    {introMessage}
                  </div>
                )}

                <div>
                  <p className="text-sm font-bold text-[#2F3A40]">
                    {watchedMainTopic === ""
                      ? "대주제를 입력해주세요."
                      : watchedMainTopic}
                  </p>
                </div>

                <div className="space-y-3">
                  {previewQuestions.map((question, index) => (
                    <div
                      key={`${question.value}-${index}`}
                      className="rounded-2xl bg-[#F3F5F6] px-4 py-4"
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#3AAFA9]">
                          {index + 1}
                        </div>

                        <p className="text-sm leading-6 text-[#2F3A40]">
                          {question.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BuddyCard>
          </SectionBlock>

          <div className="pb-4 space-y-3">
            <BuddyButton
              fullWidth
              type="submit"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중..." : "주제 저장"}
            </BuddyButton>

            <BuddyButton
              fullWidth
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => navigate(`/admin/sessions/${sessionId}`)}
            >
              취소
            </BuddyButton>
          </div>
        </div>
      </form>
    </AppShell>
  );
}

type TopicHeroCardProps = {
  mainTopic: string;
  questionCount: number;
};

function TopicHeroCard({ mainTopic, questionCount }: TopicHeroCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-[#3AAFA9]">
            <MessageSquareText size={24} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#3AAFA9]">
              SESSION TOPIC
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#2F3A40]">
              {mainTopic === ""
                ? "이번 세션의 주제를 입력해주세요"
                : (mainTopic ?? "")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">
              세션에서 사용할 토론 주제와 질문을 구성할 수 있어요.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <MiniMetricCard label="등록 질문 수" value={`${questionCount}개`} />
          <MiniMetricCard label="상태" value="작성 중" />
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

export function buildIntroMessage(mainTopic: string) {
  if (mainTopic.trim() === "") return "";

  return (
    <div className="flex flex-col">
      <span>안녕하세요😊 오늘의 모임 주제 전달드립니다 :) </span>
      <span>
        오늘의 대주제는 <span className="font-bold text-md">{mainTopic}</span>
        입니다.
      </span>
    </div>
  );
}
