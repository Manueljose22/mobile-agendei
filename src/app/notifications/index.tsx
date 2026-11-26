import { NotificationsServices } from "@/src/services/notifications/NotificationsServices";
import { INotification } from "@/src/services/notifications/types";
import { useNotificationsQuery } from "@/src/hooks/queries/useNotificationsQuery";
import { queryKeys } from "@/src/services/queries/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, RefreshControl, Text, View } from "react-native";

const dateLabel = (value: string) => new Date(value).toLocaleString("pt-PT", { dateStyle: "short", timeStyle: "short" });

export default function NotificationsScreen() {
  const query = useNotificationsQuery();
  const queryClient = useQueryClient();
  const items = query.data ?? [];

  const markRead = async (item: INotification) => {
    if (item.isRead) return;
    try {
      await NotificationsServices.MarkAsRead(item.id);
      queryClient.setQueryData<INotification[]>(queryKeys.notifications.all, (prev) =>
        prev?.map(n => n.id === item.id ? { ...n, isRead: true } : n));
    } catch (error: any) { Alert.alert("Erro", error.message); }
  };

  if (query.isPending) return <View className="flex-1 items-center justify-center bg-white">
    <ActivityIndicator color="#0D6EFD" size="large" />
    <Text className="mt-3 text-gray-500">A carregar notificações...</Text>
  </View>;

  if (query.isError) return <View className="flex-1 items-center justify-center px-6">
    <Text className="text-gray-500 text-center">Não foi possível carregar notificações.</Text>
    <Text className="text-blue-600 mt-3" onPress={() => query.refetch()}>Tentar novamente</Text>
  </View>;

  return <FlatList className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 16, flexGrow: 1 }} data={items} keyExtractor={item => item.id}
    refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => query.refetch()} tintColor="#0D6EFD" />}
    ListEmptyComponent={<View className="flex-1 items-center justify-center py-20"><Text className="text-gray-500">Não tens notificações.</Text></View>}
    renderItem={({ item }) => <Pressable onPress={() => markRead(item)} className={`mb-3 rounded-xl p-4 border ${item.isRead ? "bg-white border-gray-100" : "bg-blue-50 border-blue-100"}`}>
      <View className="flex-row items-start justify-between"><Text className="font-semibold text-gray-800 flex-1 mr-2">{item.title}</Text>{!item.isRead && <View className="w-2 h-2 rounded-full bg-blue-600 mt-2" />}</View>
      <Text className="text-gray-600 mt-2">{item.message}</Text><Text className="text-xs text-gray-400 mt-3">{dateLabel(item.createdAt)}</Text>
    </Pressable>} />;
}
