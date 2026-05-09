import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { SaveTopicRequest } from "../model/SaveTopicRequest";
import type { SaveTopicResponse } from "../model/SaveTopicResponse";

export const CreateTopic = async (
  sessionId: number,
  request: SaveTopicRequest
): Promise<ApiResponse<SaveTopicResponse>> => {
  const response = await apiClient.post<ApiResponse<SaveTopicResponse>>(
    `/api/admin/sessions/${sessionId}/topic`,
    request
  );

  return response.data;
};
