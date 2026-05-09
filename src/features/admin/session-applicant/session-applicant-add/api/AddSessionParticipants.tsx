import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { AddSessionParticipantsRequest } from "../model/AddAdminParticipantAddRequest";
import type { AddSessionParticipantsResponse } from "../model/AddAdminParticipantAddResponse";

export const AddSessionParticipants = async (
    sessionId : number,
    request : AddSessionParticipantsRequest
): Promise<ApiResponse<AddSessionParticipantsResponse>> => {
    const response = await apiClient.post<ApiResponse<AddSessionParticipantsResponse>>(
        `/api/admin/sessions/${sessionId}/participants`, 
        request
    );

    return response.data;
}