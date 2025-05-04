import api, { ApiResponse, UserResponse } from "./api";

export const addProfileRequest = async (): Promise<void> => {
  const {data} = await api.post("/api/v1/users/profiles");
};

export const updateProfileRequest = async (): Promise<void> => {
  const {data} = await api.post("/api/v1/users/profiles");
};



