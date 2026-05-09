import { BuddyCard } from "../../../../shared/ui/buddy-card/BuddyCard";
import { SectionBlock } from "../../../../shared/ui/section-block/SectionBlock";

type TopicPreviewQuestion = {
  value: string;
};

type SessionTopicPreviewSectionProps = {
  mainTopic: string;
  introMessage?: string;
  questions: TopicPreviewQuestion[];
};

export const AdminSessionPreview = ({
  mainTopic,
  introMessage,
  questions,
}: SessionTopicPreviewSectionProps) => {
  const displayMainTopic =
    mainTopic.trim() === "" ? "대주제를 입력해주세요." : mainTopic;

  const visibleQuestions = questions.filter((question) => {
    return (question.value ?? "").trim() !== "";
  });

  return (
    <SectionBlock
      title="미리보기"
      description="실제로 전달될 주제 형식을 미리 확인할 수 있어요."
    >
      <BuddyCard>
        <div className="space-y-4">
          {introMessage != null && introMessage.trim() !== "" && (
            <div className="whitespace-pre-line text-sm leading-7 text-[#2F3A40]">
              {introMessage}
            </div>
          )}

          <div>
            <p className="text-sm font-bold text-[#2F3A40]">
              {displayMainTopic}
            </p>
          </div>

          {visibleQuestions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-[#F9FBFB] px-4 py-6 text-center">
              <p className="text-sm font-semibold text-[#2F3A40]">
                아직 입력된 질문이 없어요
              </p>

              <p className="mt-1 text-xs leading-relaxed text-[#6C7A80]">
                토론 질문을 입력하면 이곳에 순서대로 표시돼요.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleQuestions.map((question, index) => (
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
          )}
        </div>
      </BuddyCard>
    </SectionBlock>
  );
};
