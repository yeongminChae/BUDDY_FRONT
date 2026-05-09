import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAdminAttendanceAwardRequest } from "../model/GetAdminAttendanceAwardRequest";
import type { GetAdminAttendanceAwardResponse } from "../model/GetAdminAttendanceAwardResponse";

export const getAdminAttendanceAward = async (
  request: GetAdminAttendanceAwardRequest
): Promise<ApiResponse<GetAdminAttendanceAwardResponse>> => {
  const response = await apiClient.get<
    ApiResponse<GetAdminAttendanceAwardResponse>
  >("/api/admin/users/attendance-awards", {
    params: {
      year: request.year,
      month: request.month,
    },
  });

  return response.data;
};
