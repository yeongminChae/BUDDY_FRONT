import type { AttendanceAwardCandidate } from "./AttendanceAwardCandidate";
import type { AttendanceAwardSummary } from "./AttendanceAwardSummary";

export type GetAdminAttendanceAwardResponse = {
  year: number;
  month: number;
  summary: AttendanceAwardSummary;
  candidates: AttendanceAwardCandidate[];
};
