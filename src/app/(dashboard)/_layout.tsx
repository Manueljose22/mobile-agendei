import { Tabs, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import {
  BookBookmarkIcon,
  HouseIcon,
  UserIcon,
} from "phosphor-react-native";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function DashboardLayout() {
  const { user, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0D6EFD" />
      </View>
    );
  }

  if (!user?.token) {
    return <Redirect href="/auth/signIn" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <HouseIcon
              weight="fill"
              color={typeof color === "string" ? color : "#64748b"}
            />
          ),
          tabBarLabel: "Início",
        }}
      />

      <Tabs.Screen
        name="bookings"
        options={{
          tabBarIcon: ({ color }) => (
            <BookBookmarkIcon
              weight="fill"
              color={typeof color === "string" ? color : "#64748b"}
            />
          ),
          tabBarLabel: "Agendamentos",
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          title: "Meus Agendamentos",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <UserIcon
              weight="fill"
              color={typeof color === "string" ? color : "#64748b"}
            />
          ),
          tabBarLabel: "Perfil",
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          href: null,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          title: "Sobre o Agendei",
        }}
      />
    </Tabs>
  );
}
