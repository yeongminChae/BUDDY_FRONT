export type TopicQuestion = {
  id: number;
  text: string;
};

export type SessionTopic = {
  topicTitle: string;
  topicDescription?: string;
  questions: TopicQuestion[];
  recommendedExpressions: string[];
};
