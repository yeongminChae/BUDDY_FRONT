import type { ApiResponse } from "../../../client-common/ApiResponse";
import { apiClient } from "../../../client-common/client";
import type { updateTableAssignmentsRequest } from "../model/update/UpdateTableAssignmentsRequest";
import type { UpdateTableAssignmentsResponse } from "../model/update/UpdateTableAssignmentsResponse";

export const updateTableAssignments = async (
  sessionId: number,
  request: updateTableAssignmentsRequest
): Promise<ApiResponse<UpdateTableAssignmentsResponse>> => {
  const response = await apiClient.patch<
    ApiResponse<UpdateTableAssignmentsResponse>
  >(`/api/admin/sessions/${sessionId}/table-assignments`, request);

  return response.data;
};
