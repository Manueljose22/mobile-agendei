import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {
  const { user, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0D6EFD" />
      </View>
    );
  }

  return user ? (
    <Redirect href="/(dashboard)/home" />
  ) : (
    <Redirect href="/auth/signIn" />
  );
}
