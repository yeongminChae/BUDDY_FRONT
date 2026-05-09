import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAdminSessionListResponse, GetAdminSessionManageResponse } from "../model/GetAdminSessionResponse";

export const getAdminSessionList =
  async (): Promise<ApiResponse<GetAdminSessionListResponse>> => {
    const response = await apiClient.get<ApiResponse<GetAdminSessionListResponse>>(
      "/api/admin/sessions"
    );

    return response.data;
  };

export const getAdminSessionManage =
  async (sessionId: number): Promise<ApiResponse<GetAdminSessionManageResponse>> => {
    const response = await apiClient.get<ApiResponse<GetAdminSessionManageResponse>>(
      `/api/admin/sessions/${sessionId}`
    );

    return response.data;
  };