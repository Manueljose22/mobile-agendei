import { Booking } from "@/src/components/booking/booking";
import { AppointmentServices } from "@/src/services/appointments/AppoitmentsService";
import { IAppointmentSave } from "@/src/services/appointments/types";
import { useAppointmentsQuery } from "@/src/hooks/queries/useAppointmentsQuery";
import { queryKeys } from "@/src/services/queries/queryKeys";
import { Colors } from "@/src/styles/colors";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Alert, ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
  const bookings = appointmentsQuery.data ?? [];

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
    }
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
          <View className="flex-row bg-gray-100 rounded-xl p-1 mb-5">
            {statusOptions.map(status => {
              const isSelected = selectedStatus === status;
              return (
                <TouchableOpacity
                  key={status}
                  onPress={() => setSelectedStatus(status)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isSelected }}
                  className={`flex-1 rounded-lg py-3 px-1 items-center justify-center ${isSelected ? "bg-white" : "bg-transparent"}`}
                  style={isSelected ? { elevation: 2 } : undefined}
                >
                  <Text className={`text-xs font-semibold ${isSelected ? "text-blue-700" : "text-gray-500"}`}>
                    {status}
                  </Text>
                  <Text className={`text-xs mt-1 ${isSelected ? "text-blue-600" : "text-gray-400"}`}>
                    {statusCounts[status]}
                  </Text>
                </TouchableOpacity>
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
                btnCancel={() => cancelBooking(item.id)}
                btnUpdate={() => updateBooking(item.id, item.idDoctor, item.idService)}
              />
            )}
          />
        </ScrollView>
      )}
    </View>
  );
}
