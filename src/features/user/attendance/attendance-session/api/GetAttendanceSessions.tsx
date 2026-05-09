import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAttendanceSessionListResponse } from "../model/GetAttendanceSessionListResponse";

export const getAttendanceSessions = async (): Promise<
  ApiResponse<GetAttendanceSessionListResponse>
> => {
  const response = await apiClient.get<
    ApiResponse<GetAttendanceSessionListResponse>
  >("/api/public/attendance/sessions");
  //   >("/api/user/attendance/sessions"); TODO : 고도화시 USER로 URI 변경 예정

  return response.data;
};
