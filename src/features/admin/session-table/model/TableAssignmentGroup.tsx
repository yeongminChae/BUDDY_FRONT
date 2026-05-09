import type { TableMember } from "./update/TableMember";

export type TableAssignmentGroup = {
  round: 1 | 2;
  tableNo: number;
  members: TableMember[];
};
