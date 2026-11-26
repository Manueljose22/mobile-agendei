import { useQuery } from "@tanstack/react-query";
import { NotificationsServices } from "@/src/services/notifications/NotificationsServices";
import { queryKeys } from "@/src/services/queries/queryKeys";

export function useNotificationsQuery() {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: NotificationsServices.GetAll,
    staleTime: 0,
    refetchInterval: 15 * 1000,
    refetchIntervalInBackground: false,
  });
}
