import { apiBaseUrl } from "../config/config";
import { LoginFormData, SignupFormData } from "../schemas/authSchemas";
import { IUser } from "../types/IUser";

const api = axios.create({
    baseURL: apiBaseUrl,
    timeout: 1000 * 60,
    withCredentials: true,
})

export interface BaseApiResponse {
    message: string;
}

export interface AuthResponse extends BaseApiResponse {
    token: string;
}

export const loginRequest = async (
    formData: LoginFormData
): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/api/users/login", formData);
    return data;
};

export const signupRequest = async (
    formData: SignupFormData
): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/api/users/signup", {
        email: formData.email,
        password: formData.password,
    });
    return data;
};

export const getUserRequest = async (): Promise<IUser> => {
    const { data } = await api.get<IUser>("/api/users/me");
    return data;
};


export const logoutRequest = async (): Promise<void> => {
    await api.post("/api/users/logout");
};
