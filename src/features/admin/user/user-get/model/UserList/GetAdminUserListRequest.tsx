export type GetAdminUserListRequest = {
  query: string;
  limit: number;
  offset: number;
  roles?: string[];
};
