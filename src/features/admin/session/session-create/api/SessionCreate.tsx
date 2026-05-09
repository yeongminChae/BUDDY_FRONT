import type { ApiResponse } from "../../../../client-common/ApiResponse";
import { apiClient } from "../../../../client-common/client";
import type { CreateSessionRequest } from "../model/CreateSessionRequest";
import type { CreateSessionResponse } from "../model/CreateSessionResponse";

export const CreateSession = async (
    request : CreateSessionRequest
): Promise<ApiResponse<CreateSessionResponse>> => {
    const response = await apiClient.post<ApiResponse<CreateSessionResponse>>(
        "/api/admin/sessions",
        request
    );

    return response.data;
}