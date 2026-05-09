import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetTopicResponse } from "../model/GetTopicResponse";

export const getTopicQeustions = async (
  sessionId: number
): Promise<ApiResponse<GetTopicResponse>> => {
  const response = await apiClient.get<ApiResponse<GetTopicResponse>>(
    `/api/admin/sessions/${sessionId}/topic`
  );

  return response.data;
};
