import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";

export const cancelSessionParticipant = async (
  applicationId: number,
  sessionId: number
): Promise<ApiResponse<null>> => {
  const response = await apiClient.patch<ApiResponse<null>>(
    `/api/admin/sessions/${sessionId}/participants/${applicationId}/cancel`
  );

  return response.data;
};
