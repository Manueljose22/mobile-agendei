import { Booking } from "@/src/components/booking/booking";
import { useAppointmentsQuery } from "@/src/hooks/queries/useAppointmentsQuery";
import { AppointmentServices } from "@/src/services/appointments/AppoitmentsService";
import { IAppointmentSave } from "@/src/services/appointments/types";
import { queryKeys } from "@/src/services/queries/queryKeys";
import { Colors } from "@/src/styles/colors";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";

type BookingStatus = "Pendente" | "Confirmado" | "Cancelado";

const statusOptions: BookingStatus[] = ["Pendente", "Confirmado", "Cancelado"];

const normalizeStatus = (status?: string): BookingStatus | null => {
  const normalized = status?.trim().toLocaleLowerCase("pt-PT");
  if (normalized === "pendente") return "Pendente";
  if (normalized === "confirmado") return "Confirmado";
  if (normalized === "cancelado" || normalized === "cancelada") return "Cancelado";
  return null;
};

export default function Bookings() {
  const appointmentsQuery = useAppointmentsQuery();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("Pendente");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const bookings = useMemo(() => appointmentsQuery.data ?? [], [appointmentsQuery.data]);

  const statusCounts = useMemo(() => ({
    Pendente: bookings.filter(item => normalizeStatus(item.status) === "Pendente").length,
    Confirmado: bookings.filter(item => normalizeStatus(item.status) === "Confirmado").length,
    Cancelado: bookings.filter(item => normalizeStatus(item.status) === "Cancelado").length,
  }), [bookings]);

  const filteredBookings = useMemo(
    () => bookings.filter(item => normalizeStatus(item.status) === selectedStatus),
    [bookings, selectedStatus]
  );

  const updateBooking = (id: string, doctorId: string, serviceId: string) => {
    router.navigate({
      pathname: "/schedule",
      params: { idAppointment: id, doctorId, idService: serviceId },
    });
  };

  const cancelBooking = async (id: string) => {
    if (cancellingId) return;
    setCancellingId(id);
    try {
      await AppointmentServices.Cancel(id);
      queryClient.setQueryData<IAppointmentSave[]>(
        queryKeys.appointments.all,
        current => current?.map(item =>
          item.id === id ? { ...item, status: "Cancelado" } : item
        )
      );
      await queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
      await queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    } catch (error: any) {
      Alert.alert("Agendamento", error?.message ?? "Não foi possível cancelar o agendamento. Tenta novamente.");
    } finally {
      setCancellingId(null);
    }
  };

  const confirmCancelBooking = (id: string) => {
    if (cancellingId) return;
    Alert.alert(
      "Cancelar consulta",
      "Tens a certeza de que pretendes cancelar esta consulta? Esta acção não pode ser desfeita.",
      [
        { text: "Manter consulta", style: "cancel" },
        { text: "Sim, cancelar", style: "destructive", onPress: () => { void cancelBooking(id); } }
      ]
    );
  };

  return (
    <View className="flex-1 bg-white/40">
      {appointmentsQuery.isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={Colors.blue[300]} />
          <Text className="mt-3 text-gray-500">A carregar agendamentos...</Text>
        </View>
      ) : appointmentsQuery.isError ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-gray-600 text-center">Não foi possível carregar os agendamentos.</Text>
          <Text onPress={() => appointmentsQuery.refetch()} className="mt-3 text-blue-600">Tentar novamente</Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20, flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={appointmentsQuery.isRefetching}
              onRefresh={async () => { await appointmentsQuery.refetch(); }}
              colors={[Colors.blue[300]]}
              tintColor={Colors.blue[300]}
            />
          }
        >
          <View className="flex-row justify-center items-center rounded-xl mb-5">
            {statusOptions.map(status => {
              const isSelected = selectedStatus === status;
              return (
                <Pressable
                  key={status}
                  onPress={() => setSelectedStatus(status)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isSelected }}
                  className={`flex-row gap-6 rounded-lg py-2 px-2 items-center justify-center ${isSelected ? "bg-transparent shadow-none  border-b-2 border-blue-600" : "bg-transparent shadow-none"}`}
                  style={isSelected ? { elevation: 2, } : undefined}
                >
                  <Text className={`text-sm font-semibold ${isSelected ? "text-blue-700" : "text-gray-600"}`}>
                    {status}
                  </Text>
                  <Text className={`text-xs ${isSelected ? "text-blue-600" : "text-gray-400"}`}>
                    {statusCounts[status]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <FlatList
            scrollEnabled={false}
            data={filteredBookings}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <View className="items-center py-12">
                <Text className="text-gray-500">
                  {selectedStatus === "Pendente"
                    ? "Não tens agendamentos pendentes."
                    : selectedStatus === "Confirmado"
                      ? "Não tens agendamentos confirmados."
                      : "Não tens agendamentos cancelados."}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <Booking
                photo={item.photo}
                day={item.booking_date}
                hour={item.booking_hour}
                service={item.service}
                speciality={item.specialty}
                doctor={item.doctor}
                hospital={item.hospitalname}
                status={item.status}
                btnCancel={() => confirmCancelBooking(item.id)}
                btnUpdate={() => updateBooking(item.id, item.idDoctor, item.idService)}
                isCancelling={cancellingId === item.id}
                actionsDisabled={cancellingId !== null}
              />
            )}
          />
        </ScrollView>
      )}
    </View>
  );
}
