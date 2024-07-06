import axios, { AxiosError } from "axios";
import { logout } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await logout();
      localStorage.removeItem("loggedIn");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { api };
