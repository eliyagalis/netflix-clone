import axios from "axios";
import { apiBaseUrl } from "../config/config";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 1000 * 60,
  withCredentials: true,
});

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  exists?: boolean;
  token?: string;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try refreshing tokens via cookies
        await api.post("/auth/refresh"); // backend reads refresh token cookie and issues new access cookie

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
