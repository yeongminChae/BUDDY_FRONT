import type { ApiResponse } from "../../../client-common/ApiResponse";
import { apiClient } from "../../../client-common/client";
import type { GetTableAssignmentsResponse } from "../model/GetTableAssignmentsResponse";

export const getTableAssignments = async (
    sessionId: number
) : Promise<ApiResponse<GetTableAssignmentsResponse>> => {
    const response = await apiClient.get<ApiResponse<GetTableAssignmentsResponse>>(
      `/api/admin/sessions/${sessionId}/table-assignments`
    );
  
    return response.data;
}