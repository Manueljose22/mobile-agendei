import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const secureStore = {
  getItem: async (name: string) => SecureStore.getItemAsync(name),
  setItem: async (name: string, value: string) => { await SecureStore.setItemAsync(name, value); },
  removeItem: async (name: string) => { await SecureStore.deleteItemAsync(name); },
};

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim() || "https://api.agendei.ao";
const PUSH_TOKEN_STORAGE_KEY = "agendei-expo-push-token";

type User = { id: string; name: string; email: string; token: string; };
type AuthState = {
  user: User | null;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      hasHydrated: false,
      setUser: (user) => set({ user }),
      logout: async () => {
        const user = get().user;
        try {
          const expoPushToken = await SecureStore.getItemAsync(PUSH_TOKEN_STORAGE_KEY);
          if (user?.token && expoPushToken) {
            await axios.delete(`${API_URL}/notifications/push-token`, {
              data: { expoPushToken },
              headers: { Authorization: `Bearer ${user.token}` },
              timeout: 5000,
            });
            await SecureStore.deleteItemAsync(PUSH_TOKEN_STORAGE_KEY);
          }
        } catch {
          // A sessão é encerrada mesmo se o dispositivo estiver sem rede.
        } finally {
          set({ user: null });
        }
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => secureStore),
      onRehydrateStorage: () => () => { useAuthStore.setState({ hasHydrated: true }); },
    }
  )
);
