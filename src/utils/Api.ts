import axios from 'axios';
import * as SecureStore from 'expo-secure-store';





export const Api = axios.create({
  baseURL: "http://192.168.85.108:3000",
})


Api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const auth = await SecureStore.getItemAsync("auth")
    if (auth) {
      try {
        const token = JSON.parse(auth)?.state?.user?.token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (e) {
        console.error('Erro ao parsear auth:', e)
      }
    }
  }
  return config
})