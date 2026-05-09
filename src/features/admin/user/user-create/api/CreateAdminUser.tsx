import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { CreateAdminUserRequest } from "../model/CreateAdminUserRequest";
import type { CreateAdminUserResponse } from "../model/CreateAdminUserResponse";

export const createAdminUser = async (
  request: CreateAdminUserRequest
): Promise<ApiResponse<CreateAdminUserResponse>> => {
  const response = await apiClient.post<ApiResponse<CreateAdminUserResponse>>(
    "/api/admin/users/add",
    request
  );

  return response.data;
};
