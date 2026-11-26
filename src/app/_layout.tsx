import '@/src/styles/global.css';
import { useEffect, useRef, useState } from "react";
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from "react-native";
import { PatientsServices } from "@/src/services/patient/PatientServices";
import { useAuthStore } from "@/src/store/useAuthStore";
import { QueryProvider } from "@/src/providers/QueryProvider";
import ExpoNotificationManager from "@/src/components/notifications/ExpoNotificationManager";

function RootLayoutContent() {
  const { user, hasHydrated, logout } = useAuthStore();
  const [isSessionReady, setIsSessionReady] = useState(false);
  const hasCheckedInitialSession = useRef(false);

  useEffect(() => {
    if (!hasHydrated || hasCheckedInitialSession.current) {
      return;
    }

    hasCheckedInitialSession.current = true;

    const validateSession = async () => {
      if (!user?.token) {
        setIsSessionReady(true);
        return;
      }

      try {
        const isValid = await PatientsServices.ValidateSession();

        if (!isValid) {
          logout();
        }
      } catch {
        // Falhas de rede ou do servidor não devem apagar uma sessão potencialmente válida.
      } finally {
        setIsSessionReady(true);
      }
    };

    void validateSession();
  }, [hasHydrated, user?.token, logout]);

  return (
    <View className="flex-1">\n      <ExpoNotificationManager />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="notifications/index" options={{ headerShown: true, title: "Notificações", headerTintColor: "#212121", headerTitleAlign: "center", headerShadowVisible: false }} />

        <Stack.Screen name="home/listCategories" options={{
          headerShown: true,
          title: "Categorias",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }} />
        <Stack.Screen name="home/listDoctors" options={{
          headerShown: true,
          title: "Doutores",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }} />
        <Stack.Screen name="home/listHospitals" options={{
          headerShown: true,
          title: "Hospitais",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }} />
        <Stack.Screen name="hospital/[id]" options={{
          headerShown: true,
          title: "Detalhes do Hospital",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }} />
        <Stack.Screen name="doctor/[id]" options={{
          headerShown: true,
          title: "Detalhes do Médico",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }} />
        <Stack.Screen name="services/[id]" options={{
          headerShown: true,
          title: "Serviços",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }} />
        <Stack.Screen name="schedule/index" options={{
          headerShown: true,
          title: "Marcar Consulta",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }} />
        <Stack.Screen name="profile/edit-profile" options={{
          headerShown: true,
          title: "Editar dados",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }} />
      </Stack>

      {(!hasHydrated || !isSessionReady) && (
        <View className="absolute inset-0 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#0D6EFD" />
        </View>
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <RootLayoutContent />
    </QueryProvider>
  );
}
