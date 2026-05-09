import type { ApiResponse } from "./ApiResponse";

export const unwrapApiResponse = <T>(response: ApiResponse<T>): T => {
    if (response.resultCode !== "OK" || response.data == null) {
      throw new Error(response.message);
    }
  
    return response.data;
  };