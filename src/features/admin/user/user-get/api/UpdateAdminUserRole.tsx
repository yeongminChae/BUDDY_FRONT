import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type {
  UpdateAdminUserRoleRequest,
  UpdateAdminUserRoleResponse,
} from "../model/User/AdminUserTypes";

export const updateAdminUserRole = async (
  userId: number,
  data: UpdateAdminUserRoleRequest
): Promise<ApiResponse<UpdateAdminUserRoleResponse>> => {
  const response = await apiClient.patch<
    ApiResponse<UpdateAdminUserRoleResponse>
  >(`/api/admin/users/${userId}/role`, data);

  return response.data;
};
