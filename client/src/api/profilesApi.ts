import { IProfilePreview } from "../types/IProfile";
import api, { ApiResponse, UserResponse } from "./api";

export const addProfileRequest = async (data:IProfilePreview): Promise<void> => {
  await api.post("/api/v1/users/profile", data);
};

export const updateProfileRequest = async (): Promise<void> => {
  const {data} = await api.put("/api/v1/users/profile");
};

