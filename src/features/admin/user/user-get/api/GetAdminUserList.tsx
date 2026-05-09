import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAdminUserListRequest } from "../model/UserList/GetAdminUserListRequest";
import type { GetAdminUserListResponse } from "../model/UserList/GetAdminUserListResponse";

export const getAdminUserList = async (
  request: GetAdminUserListRequest
): Promise<ApiResponse<GetAdminUserListResponse>> => {
  const response = await apiClient.get<ApiResponse<GetAdminUserListResponse>>(
    "/api/admin/users",
    {
      params: {
        query: request.query,
        limit: request.limit,
        offset: request.offset,
        roles: request.roles,
      },
    }
  );

  return response.data;
};
