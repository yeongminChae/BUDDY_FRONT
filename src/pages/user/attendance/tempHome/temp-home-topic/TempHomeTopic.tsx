import { MessageSquareText } from "lucide-react";
import type { GetTopicQuestionResponse } from "../../../../../features/admin/session/session-past/model/GetTopicQuestionResponse";
import { BuddyCard } from "../../../../../shared/ui/buddy-card/BuddyCard";
import { SectionBlock } from "../../../../../shared/ui/section-block/SectionBlock";
import { useState } from "react";

type TopicSectionProps = {
  topicTitle: string | undefined;
  topicQuestions: GetTopicQuestionResponse[] | undefined;
};

export function TopicSection({
  topicTitle,
  topicQuestions,
}: TopicSectionProps) {
  const [lastIndex, setLastIndex] = useState(0);
  let visibleTopicQuestions =
    topicQuestions == null ? [] : topicQuestions?.slice(0, 7 + lastIndex);

  const addBtnClick = () => {
    if (topicQuestions == null) return;

    if (visibleTopicQuestions.length >= topicQuestions.length) {
      setLastIndex(0);
    } else {
      setLastIndex((prev) => prev + 3);
    }
  };

  return (
    <SectionBlock
      title="주제"
      description="세션에서 사용한 대주제와 질문 목록이에요."
    >
      {topicTitle !== "" && topicQuestions !== undefined ? (
        <div className="space-y-5">
          <BuddyCard>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#DFF5F3] text-lg">
                💬
              </div>

              <div>
                <p className="text-xs font-medium text-[#6C7A80]">
                  Discussion Topic
                </p>
                <p className="mt-1 text-base font-bold text-[#2F3A40]">
                  {topicTitle}
                </p>
              </div>
            </div>
          </BuddyCard>

          <BuddyCard>
            <p className="text-xs font-medium text-[#6C7A80]">Questions</p>
            <div className="space-y-1">
              {[...visibleTopicQuestions]
                .sort((a, b) => a.orderNo - b.orderNo)
                .map((question, index) => (
                  <TopicQuestionCompactRow
                    key={question.questionId}
                    orderNo={question.orderNo}
                    content={question.content}
                    isLast={index === visibleTopicQuestions.length - 1}
                  />
                ))}
            </div>
            {topicQuestions != null && topicQuestions.length > 7 && (
              <button
                type="button"
                onClick={addBtnClick}
                className="mt-4 w-full rounded-2xl border border-[#E2E6E8] bg-white px-4 py-3 text-sm font-semibold text-[#3AAFA9] shadow-sm transition hover:bg-[#F9FBFB]"
              >
                {visibleTopicQuestions.length < topicQuestions.length
                  ? "질문 더 보기"
                  : "질문 접기"}
              </button>
            )}
          </BuddyCard>
        </div>
      ) : (
        <EmptyHistoryTopicCard />
      )}
    </SectionBlock>
  );
}

type TopicQuestionCompactRowProps = {
  orderNo: number;
  content: string;
  isLast?: boolean;
};

function TopicQuestionCompactRow({
  orderNo,
  content,
  isLast = false,
}: TopicQuestionCompactRowProps) {
  return (
    <div
      className={[
        "flex gap-3 py-4",
        isLast ? "" : "border-b border-[#E2E6E8]",
      ].join(" ")}
    >
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#DFF5F3] text-xs font-bold text-[#3AAFA9]">
        {orderNo}
      </div>

      <p className="flex-1 text-sm font-medium leading-6 text-[#2F3A40]">
        {content}
      </p>
    </div>
  );
}

type EmptyHistoryTopicCardProps = {
  message?: string;
};

function EmptyHistoryTopicCard({
  message = "이 종료 세션에는 등록된 주제가 없어요.",
}: EmptyHistoryTopicCardProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E2E6E8] bg-white px-5 py-7 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-buddyBg text-[#6C7A80]">
        <MessageSquareText size={22} />
      </div>

      <p className="mt-4 text-sm font-bold text-[#2F3A40]">
        주제 기록이 없어요
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#6C7A80]">{message}</p>
    </div>
  );
}
