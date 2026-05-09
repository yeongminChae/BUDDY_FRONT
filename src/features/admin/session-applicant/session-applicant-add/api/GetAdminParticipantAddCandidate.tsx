import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { GetAdminParticipantAddCandidateRequest } from "../model/GetAdminParticipantAddCandidateRequest";
import type { GetAdminParticipantAddCandidateResponse } from "../model/GetAdminParticipantAddCandidateResponse";

export const GetAdminParticipantAddCandidate =  async (
  request : GetAdminParticipantAddCandidateRequest
  ) : Promise<ApiResponse<GetAdminParticipantAddCandidateResponse>> => {
    const { sessionId, ...params } = request;

    const response = await apiClient.get<ApiResponse<GetAdminParticipantAddCandidateResponse>>(
      `/api/admin/sessions/${request.sessionId}/participants/candidates`, 
      {
        params
      }
    );
  
    return response.data;
};

