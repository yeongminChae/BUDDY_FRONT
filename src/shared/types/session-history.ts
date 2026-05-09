export type AdminPastSessionSummary = {
  sessionId: number;
  title: string;
  dateTime: string;
  place: string;
  attendanceSummary: string;
};

export type AdminPastSessionDetail = {
  sessionId: number;
  title: string;
  dateTime: string;
  place: string;
  attendanceSummary: string;
  participants: string[];
  tableSummary: {
    tableName: string;
    members: string[];
  }[];
  attendanceRate: number;
  topicTitle: string;
  recommendedExpressions: string[];
};

export type UserPastSessionReview = {
  sessionId: number;
  title: string;
  dateTime: string;
  place: string;
  topicTitle: string;
  topicQuestions: string[];
  recommendedExpressions: string[];
  myMemo: string;
  checkedExpressions: string[];
};
