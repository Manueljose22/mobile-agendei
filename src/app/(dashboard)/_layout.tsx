import { Tabs } from "expo-router";
import {
  BookBookmarkIcon,
  HouseIcon,
  UserIcon,
} from "phosphor-react-native";

export default function RootLayout() {
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
    </Tabs>
  );
}
