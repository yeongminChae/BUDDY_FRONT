import type { GetTopicQuestionResponse } from "../../../../admin/session/session-past/model/GetTopicQuestionResponse";

export type GetAttendanceSessionDetailResponse = {
  sessionId: number;
  title: string;
  startsAt: string;
  location: string;
  topicTitle: string;
  topicQuestions: GetTopicQuestionResponse[];
};
