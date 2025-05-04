import { IProfile, IProfilePreview } from "../types/IProfile";
import api, { ApiResponse, UserResponse } from "./api";

export const addProfileRequest = async (data:IProfilePreview): Promise<void> => {
  await api.post("/api/v1/users/profile", data);
};

export const updateProfileRequest = async (): Promise<void> => {
  await api.put("/api/v1/users/profile");
};

export const getProfileRequest = async (profile_id:string): Promise<IProfile> => {
  const {data} = await api.get<IProfile>("/api/v1/users/profile/", { headers: { profile_id } });
  return data;
}