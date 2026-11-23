import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || 'https://api.agendei.ao';

export const Api = axios.create({
  baseURL: API_URL,
});

Api.interceptors.request.use(async (config) => {
  try {
    const auth = await SecureStore.getItemAsync('auth');

    if (!auth) {
      return config;
    }

    const token = JSON.parse(auth)?.state?.user?.token;

    if (typeof token === 'string' && token.trim()) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // A requisição continua sem autenticação; a API poderá responder com 401.
    console.warn('Não foi possível recuperar a sessão armazenada.');
  }

  return config;
});
