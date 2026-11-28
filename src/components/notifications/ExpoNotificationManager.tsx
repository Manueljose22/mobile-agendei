import { useEffect } from "react";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";
import { AndroidImportance } from "expo-notifications";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { NotificationsServices } from "@/src/services/notifications/NotificationsServices";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/src/services/queries/queryKeys";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function ExpoNotificationManager() {
  const user = useAuthStore(state => state.user);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.token) return;
    let isMounted = true;

    const register = async () => {
      try {
        if (!Device.isDevice) return;
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "Notificações",
            importance: AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: "default",
          });
        }
        const existing = await Notifications.getPermissionsAsync();
        let status = existing.status;
        if (status !== "granted") status = (await Notifications.requestPermissionsAsync()).status;
        if (status !== "granted") return;

        const projectId = Constants.easConfig?.projectId ?? Constants.expoConfig?.extra?.eas?.projectId;
        const tokenResult = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
        const token = tokenResult.data;
        if (!token || !isMounted) return;

        const savedToken = await SecureStore.getItemAsync("agendei-expo-push-token");
        if (savedToken === token) return;
        await NotificationsServices.RegisterPushToken(token);
        await SecureStore.setItemAsync("agendei-expo-push-token", token);
      } catch (error) {
        console.warn("Não foi possível registar o dispositivo para push.", error);
      }
    };
    void register();

    const received = Notifications.addNotificationReceivedListener(() => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
    });
    const response = Notifications.addNotificationResponseReceivedListener(() => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      router.push("/notifications");
    });
    return () => { isMounted = false; received.remove(); response.remove(); };
  }, [user?.token, queryClient]);
  return null;
}
