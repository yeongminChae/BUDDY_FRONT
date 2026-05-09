import { BuddyCard } from "../../shared/ui/buddy-card/BuddyCard";

type TopicCardProps = {
  topicTitle: string;
  topicDescription?: string;
  questions: string[];
};

export function TopicCard({
  topicTitle,
  topicDescription,
  questions
}: TopicCardProps) {
  return (
    <BuddyCard>
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-buddyText">{topicTitle}</h3>
          {topicDescription ? (
            <p className="mt-1 text-sm text-buddySubText">{topicDescription}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          {questions.map((question, index) => (
            <div
              key={`${index}-${question}`}
              className="rounded-xl bg-[#F8FAFA] px-4 py-3 text-sm text-buddyText"
            >
              {index + 1}. {question}
            </div>
          ))}
        </div>
      </div>
    </BuddyCard>
  );
}
