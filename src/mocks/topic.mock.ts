import type { SessionTopic } from "../shared/types/topic";

export const sessionTopicMock: SessionTopic = {
  topicTitle: "Unpopular Opinions",
  topicDescription: "남들과 다른 의견을 자유롭게 이야기해보는 대화 주제입니다.",
  questions: [
    { id: 1, text: "Money can buy happiness." },
    { id: 2, text: "First impressions are usually correct." },
    { id: 3, text: "Name a popular food that you think is overrated." },
    { id: 4, text: "Attraction can grow over time." }
  ],
  recommendedExpressions: [
    "leave someone on read",
    "I see your point, but...",
    "I have a different take on that.",
    "That feels overrated to me."
  ]
};
