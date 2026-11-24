import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function AuthLayout() {
  const { user, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return null;
  }

  if (user?.token) {
    return <Redirect href="/(dashboard)/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
    </Stack>
  );
}
