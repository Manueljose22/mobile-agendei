import { Booking } from "@/src/components/booking/booking";
import { AppointmentServices } from "@/src/services/appointments/AppoitmentsService";
import { useAppointmentsQuery } from "@/src/hooks/queries/useAppointmentsQuery";
import { queryKeys } from "@/src/services/queries/queryKeys";
import { Colors } from "@/src/styles/colors";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from "react-native";

export default function Bookings() {
  const appointmentsQuery = useAppointmentsQuery();
  const queryClient = useQueryClient();
  const bookings = appointmentsQuery.data ?? [];

  const updateBooking = (id: string, doctorId: string, serviceId: string) => {
    router.navigate({
      pathname: "/schedule",
      params: { idAppointment: id, doctorId, idService: serviceId },
    });
  };

  const cancelBooking = async (id: string) => {
    try {
      await AppointmentServices.Cancel(id);
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
        <ScrollView className="flex-1 p-5" refreshControl={
          <RefreshControl refreshing={appointmentsQuery.isRefetching} onRefresh={() => appointmentsQuery.refetch()} colors={[Colors.blue[300]]} tintColor={Colors.blue[300]} />
        }>
          <FlatList scrollEnabled={false} data={bookings} keyExtractor={item => item.id.toString()}
            ListEmptyComponent={<Text className="text-center text-gray-500 py-8">Não tens agendamentos.</Text>}
            renderItem={({ item }) => (
              <Booking photo={item.photo} day={item.booking_date} hour={item.booking_hour}
                service={item.service} speciality={item.specialty} doctor={item.doctor}
                hospital={item.hospitalname} btnCancel={() => cancelBooking(item.id)}
                btnUpdate={() => updateBooking(item.id, item.idDoctor, item.idService)} />
            )} />
        </ScrollView>
      )}
    </View>
  );
}
