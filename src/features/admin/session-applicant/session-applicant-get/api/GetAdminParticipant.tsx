import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAdminParticipantManageResponse } from "../model/GetAdminParticipantManageResponse";

export const getAdminParticipantManage = async (sessionId: number)
  : Promise<ApiResponse<GetAdminParticipantManageResponse>> => {
    const response = await apiClient.get<ApiResponse<GetAdminParticipantManageResponse>>(
      `/api/admin/sessions/${sessionId}/participants`
    );
  
    return response.data;
  };