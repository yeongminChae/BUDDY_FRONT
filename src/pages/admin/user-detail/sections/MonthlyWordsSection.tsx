import { BadgeCheck } from "lucide-react";
import { SectionBlock } from "../../../../shared/ui/section-block/SectionBlock";
import { BuddyCard } from "../../../../shared/ui/buddy-card/BuddyCard";
import { EmptyState } from "../EmptyState";

type MonthlyWord = {
  wordEntryId?: number;
  sessionId?: number;
  phrase: string;
  example?: string | null;
  submittedAt?: string;
};

type MonthlyWordsSectionProps = {
  monthlyWords: MonthlyWord[];
};

export function MonthlyWordsSection({
  monthlyWords,
}: MonthlyWordsSectionProps) {
  return (
    <SectionBlock
      title="이번 달 영어 표현"
      description="출석 체크 때 남긴 단어와 예문이에요."
    >
      {monthlyWords.length === 0 ? (
        <EmptyState
          icon={<BadgeCheck size={22} />}
          title="아직 남긴 표현이 없어요"
          description="출석 체크 때 입력한 영어 표현이 이곳에 표시돼요."
        />
      ) : (
        <div className="space-y-3">
          {monthlyWords.map((item) => (
            <BuddyCard key={item.wordEntryId}>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-2xl border-2 border-[#DFF5F3] px-4 py-3 text-sm font-bold text-buddyPrimary">
                    {item.phrase}
                  </span>

                  {item.submittedAt != null &&
                    item.submittedAt.trim() !== "" && (
                      <span className="shrink-0 text-xs font-semibold text-[#6C7A80]">
                        {formatSubmittedAt(item.submittedAt)}
                      </span>
                    )}
                </div>

                {item.example != null && item.example.trim() !== "" && (
                  <div className="rounded-2xl bg-[#F3F5F6] px-4 py-4">
                    <p className="text-xs font-bold text-[#6C7A80]">예문</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#2F3A40]">
                      {item.example}
                    </p>
                  </div>
                )}
              </div>
            </BuddyCard>
          ))}
        </div>
      )}
    </SectionBlock>
  );
}

function formatSubmittedAt(value: string) {
  if (value.trim() === "") return "";

  const normalizedValue = value.replace(" ", "T");
  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 16);
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${month}.${day} ${hour}:${minute}`;
}
