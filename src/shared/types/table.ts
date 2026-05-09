export type TableMember = {
  id: number;
  name: string;
  email: string;
};

export type TableGroup = {
  id: number;
  name: string;
  members: TableMember[];
};
