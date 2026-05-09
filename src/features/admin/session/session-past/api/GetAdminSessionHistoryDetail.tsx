import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAdminSessionHistoryDetailResponse } from "../model/GetAdminSessionHistoryDetailResponse";

export const getAdminSessionHistoryDetail = async (
  sessionId: number
): Promise<ApiResponse<GetAdminSessionHistoryDetailResponse>> => {
  const response = await apiClient.get<
    ApiResponse<GetAdminSessionHistoryDetailResponse>
  >(`/api/admin/sessions/history/${sessionId}`);

  return response.data;
};
