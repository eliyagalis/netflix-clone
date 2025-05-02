import api, { ApiResponse } from "./api";
import { EmailFormData, LoginFormData, SignupFormData } from "../schemas/authSchemas";
import { IUser } from "../types/IUser";


export const loginRequest = async (
  formData: LoginFormData
): Promise<ApiResponse> => {
  const { data } = await api.post<ApiResponse>("/api/v1/users/login", formData);
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
  const { data } = await api.get<IUser>("/api/v1/users/");
  return data;
};

export const logoutRequest = async (): Promise<void> => {
  await api.post("/api/users/logout");
};

export const getNewAccessToken = async (): Promise<string> => {
    const { data } = await api.post<{ token: string }>("/api/v1/users/refresh");
    return data.token;
  };