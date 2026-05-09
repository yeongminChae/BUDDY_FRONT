export type TableMoveChange = {
  userId: number;
  name: string;
  roundNo: 1 | 2;
  fromTableNo: number;
  toTableNo: number;
};

export type updateTableAssignmentsRequest = {
  changes: TableMoveChange[];
};
