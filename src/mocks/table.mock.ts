import type { TableGroup } from "../shared/types/table";

export const tableMock: TableGroup[] = [
  {
    id: 1,
    name: "Table 1",
    members: [
      { id: 1, name: "Alex", email: "alex@email.com" },
      { id: 2, name: "Jamie", email: "jamie@email.com" },
      { id: 3, name: "Chris", email: "chris@email.com" },
      { id: 4, name: "Mina", email: "mina@email.com" }
    ]
  },
  {
    id: 2,
    name: "Table 2",
    members: [
      { id: 5, name: "John", email: "john@email.com" },
      { id: 6, name: "Emma", email: "emma@email.com" },
      { id: 7, name: "Kevin", email: "kevin@email.com" }
    ]
  }
];
