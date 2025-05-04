import api, { ApiResponse, UserResponse } from "./api";
import { EmailFormData, LoginFormData, SignupFormData } from "../schemas/authSchemas";
import { IUser } from "../types/IUser";

export const loginRequest = async (
  formData: LoginFormData
): Promise<UserResponse> => {
  const { data } = await api.post<UserResponse>("/api/v1/users/login", formData);
  return data;
};

export const signupRequest = async (
  formData: SignupFormData
): Promise<ApiResponse> => {
  const { data } = await api.post<ApiResponse>("/api/v1/users/signup", {
    email: formData.email,
    password: formData.password,
  });
  return data;
};

export const checkEmailExist = async (formData: EmailFormData): Promise<ApiResponse> => {
  const { data } = await api.post<ApiResponse>(
    "/api/v1/users/email",
    {},
    { headers: { email: formData.email } }
  );
  return data;
};

export const getUserRequest = async (): Promise<IUser> => {
  const { data } = await api.get<{user:IUser}>("/api/v1/users/");
  return data.user;
};

export const logoutRequest = async (): Promise<void> => {
  await api.post("/api/v1/users/logout");
};
