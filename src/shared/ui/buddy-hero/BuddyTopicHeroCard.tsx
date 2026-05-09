import { MessageSquareText } from "lucide-react";
import { BuddyCard } from "../buddy-card/BuddyCard";
import { MiniMetricCard } from "../buddy-metric-card/MiniMetricCard";

type TopicHeroCardProps = {
  mainTopic: string;
  questionCount: number;
};

export function TopicHeroCard({
  mainTopic,
  questionCount,
}: TopicHeroCardProps) {
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
