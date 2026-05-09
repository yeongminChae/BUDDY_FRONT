import type { AdminSessionHistoryApplicant } from "./AdminSessionHistoryApplicant";
import type { AdminSessionHistoryParticipant } from "./AdminSessionHistoryParticipant";
import type { AdminSessionHistoryTableRound } from "./AdminSessionHistoryTable";
import type { GetTopicQuestionResponse } from "./GetTopicQuestionResponse";

export type GetAdminSessionHistoryDetailResponse = {
  sessionId: number;
  title: string;
  dateTime: string;
  place: string;
  attendanceRate: number;
  attendanceSummary: {
    attendedCount: number;
    appliedCount: number;
    noShowCount: number;
  };
  participants: AdminSessionHistoryParticipant[];
  applicants: AdminSessionHistoryApplicant[];
  tableSummary: AdminSessionHistoryTableRound[];
  topicTitle: string;
  topicQuestions: GetTopicQuestionResponse[];
};
