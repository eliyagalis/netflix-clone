import api, { ApiResponse, UserResponse } from "./api";

export const addProfile = async (): Promise<void> => {
    await api.post("/api/v1/users/profiles");
  };
  