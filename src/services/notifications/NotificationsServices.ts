import { Api } from "@/src/utils/Api";
import { INotificationsResponse, INotification } from "./types";

export const NotificationsServices = {
    async GetAll(): Promise<INotification[]> {
        try {
            const { data } = await Api.get<INotificationsResponse>("/notifications");
            return data.notifications ?? [];
        } catch (error: any) {
            throw new Error(error.response?.data?.message ?? "Não foi possível carregar as notificações.");
        }
    },
    async MarkAsRead(id: string): Promise<void> {
        try {
            await Api.patch(`/notifications/${id}/read`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message ?? "Não foi possível marcar a notificação como lida.");
        }
    },
    async RegisterPushToken(expoPushToken: string): Promise<void> {
        try {
            await Api.put("/notifications/push-token", { expoPushToken });
        } catch (error: any) {
            throw new Error(error.response?.data?.message ?? "Não foi possível registar o dispositivo.");
        }
    },
    async RemovePushToken(expoPushToken: string): Promise<void> {
        try {
            await Api.delete("/notifications/push-token", { data: { expoPushToken } });
        } catch (error: any) {
            throw new Error(error.response?.data?.message ?? "Não foi possível remover o dispositivo.");
        }
    }
};
