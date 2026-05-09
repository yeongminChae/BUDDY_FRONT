export type AdminSessionHistoryTable = {
  tableName: string;
  members: string[];
};

export type AdminSessionHistoryTableRound = {
  roundNo: number;
  tables: AdminSessionHistoryTable[];
};
