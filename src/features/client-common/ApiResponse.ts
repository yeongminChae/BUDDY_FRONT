
export type ApiResponse<T> = {
    resultCode: string;
    message: string;
    data: T | null;
  };