import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAttendanceSessionDetailResponse } from "../model/GetAttendanceSessionDetailResponse";

export const getAttendanceSessionDetail = async (
  sessionId: number
): Promise<ApiResponse<GetAttendanceSessionDetailResponse>> => {
  const response = await apiClient.get<
    ApiResponse<GetAttendanceSessionDetailResponse>
  >(`/api/public/sessions/${sessionId}/attendance`);
  // /api/public
  return response.data;
};
