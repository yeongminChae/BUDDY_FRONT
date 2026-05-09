import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { CreateAttendanceWordRequest } from "../model/CreateAttendanceWordRequest";
import type { CreateAttendanceWordResponse } from "../model/CreateAttendanceWordResponse";

export const createAttendanceWord = async (
  request: CreateAttendanceWordRequest,
  sessionId: number
): Promise<ApiResponse<CreateAttendanceWordResponse>> => {
  const response = await apiClient.post<
    ApiResponse<CreateAttendanceWordResponse>
  >(`/sessions/${sessionId}/attendance-words)`, request);

  return response.data;
};
