import axios, { isAxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || 'https://api.agendei.ao';

export const Api = axios.create({
  baseURL: API_URL,
});

Api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

Api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config?.headers?.Authorization
    ) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);
