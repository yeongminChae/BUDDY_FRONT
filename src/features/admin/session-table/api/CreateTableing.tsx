import type { ApiResponse } from "../../../client-common/ApiResponse";
import { apiClient } from "../../../client-common/client";
import type { RunTableingResponse } from "../model/RunTableingResponse";

export const createTableing = async (
    sessionId: number
) : Promise<ApiResponse<RunTableingResponse>> => {
    const response = await apiClient.post<ApiResponse<RunTableingResponse>>(
      `/api/admin/sessions/${sessionId}/tableing/run`
    );
  
    return response.data;
}