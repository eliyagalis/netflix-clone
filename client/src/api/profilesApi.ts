import IMyListItem from "../types/IMyListItem";
import { IProfile, IProfilePreview } from "../types/IProfile";
import api, { ApiResponse, UserResponse } from "./api";

export const addProfileRequest = async (data:IProfilePreview): Promise<void> => {
  await api.post("/api/v1/users/profile", data);
};

export const updateProfileRequest = async (): Promise<void> => {
  await api.put("/api/v1/users/profile");
};

export const getProfileRequest = async (profile_id:string): Promise<IProfile> => {
  const {data} = await api.get<{profile: IProfile}>("/api/v1/users/profile/", { headers: { profile_id } });
  return data.profile;
}

export const addToProfileListRequest = async (profile_id:string, item:IMyListItem): Promise<void> => {
  await api.post("/api/v1/users/profile/list",   
    { data: item }, 
    { headers: { profile_id } });
}

export const removeFromProfileListRequest = async (profile_id:string, itemId:string): Promise<void> => {
  await api.delete("/api/v1/users/profile/list",   
    { headers: { profile_id, itemId } });
}