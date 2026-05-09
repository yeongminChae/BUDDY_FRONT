import type { TableAssignmentGroup } from "./TableAssignmentGroup";

export type GetTableAssignmentsResponse = {
    sessionId: number;
    round1Tables: TableAssignmentGroup[];
    round2Tables: TableAssignmentGroup[];
  };