import type { ApiResponse } from "../../client-common/ApiResponse";
import { apiClient } from "../../client-common/client";
import type { LoginRequest } from "../model/LoginRequest";
import type { LoginResponse } from "../model/LoginResponse";

export const login = async (
  request: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    "/api/auth/login",
    request
  );

  return response.data;
};
