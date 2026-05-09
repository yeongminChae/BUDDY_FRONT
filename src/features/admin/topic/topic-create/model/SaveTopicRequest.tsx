import type { SessionTopicItem } from "./SaveTopicQuestionRequest";

export type SaveTopicRequest = {
  sessionId: number;
  mainTopic: string;
  questions: SessionTopicItem[];
};
