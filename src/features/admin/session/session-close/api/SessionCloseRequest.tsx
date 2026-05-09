import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";

export const closeSession = async (
  sessionId: number
): Promise<ApiResponse<number>> => {
  const response = await apiClient.patch<ApiResponse<number>>(
    `/api/admin/sessions/${sessionId}/cancel`
  );

  return response.data;
};
