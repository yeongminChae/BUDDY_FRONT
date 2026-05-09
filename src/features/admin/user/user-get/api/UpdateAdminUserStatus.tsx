import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type {
  UpdateAdminUserStatusRequest,
  UpdateAdminUserStatusResponse,
} from "../model/User/AdminUserTypes";

export const updateAdminUserStatus = async (
  userId: number,
  data: UpdateAdminUserStatusRequest
): Promise<ApiResponse<UpdateAdminUserStatusResponse>> => {
  const response = await apiClient.patch<
    ApiResponse<UpdateAdminUserStatusResponse>
  >(`/api/admin/users/${userId}/status`, data);

  return response.data;
};
