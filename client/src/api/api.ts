import axios from "axios";
import { apiBaseUrl } from "../config/config";
import { getErrorMessage } from "../utils/axiosErrorHandler";

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 1000 * 60,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getErrorMessage(error);
    return Promise.reject(new Error(message));
  }
);

export default api;
