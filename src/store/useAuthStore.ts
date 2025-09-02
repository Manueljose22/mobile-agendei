import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';



const secureStore = {
    getItem: async (name: string) => {
        return await SecureStore.getItemAsync(name)
    },
    setItem: async (name: string, value: string) => {
        await SecureStore.setItemAsync(name, value);
    },
    removeItem: async (name: string) => {
        await SecureStore.deleteItemAsync(name);
    },
}


type User ={
    id: string;
    name: string;
    email: string;
    token: string;
}


type AuthState = {
    user: User | null;
    setUser: (user: User) => void
    logout: () => void
}


export const useAuthStore = create<AuthState>()(
    persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null })
      },
    }),
    {
      name: 'auth', 
      storage: createJSONStorage(() => secureStore),
    }
  )
)