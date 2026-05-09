import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAdminUserDetailResponse } from "../model/User/GetAdminUserDetailResponse";

export const getAdminUserDetail = async (
  userId: number
): Promise<ApiResponse<GetAdminUserDetailResponse>> => {
  const response = await apiClient.get<ApiResponse<GetAdminUserDetailResponse>>(
    `/api/admin/users/${userId}`
  );

  return response.data;
};
