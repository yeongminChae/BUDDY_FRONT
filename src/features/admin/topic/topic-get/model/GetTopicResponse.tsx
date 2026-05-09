import type { TopicQuestion } from "./TopicQuestion";

export type GetTopicResponse = {
  sessionId: number;
  sessionTitle: string;
  startsAt: string;
  location: string;
  mainTopic: string;
  introMessage: string | null;
  questions: TopicQuestion[];
};
