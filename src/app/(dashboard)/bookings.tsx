import { Booking } from "@/src/components/booking/booking";
import { AppointmentServices } from "@/src/services/appointments/AppoitmentsService";
import { IAppointmentSave } from "@/src/services/appointments/types";
import { Colors } from "@/src/styles/colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView } from "react-native";

export default function Bookings() {
  const [bookings, setBookings] = useState<IAppointmentSave[]>([]);
  const [isRefreshing, setRefreshing] = useState(false);

  const handleLoading = async () => {
    setRefreshing(true);

    try {
      const result = await AppointmentServices.GetAll();
      setBookings(result);
    } catch (error: any) {
      console.log(
        "Erro ao carregar agendamentos:",
        error?.message ?? "Erro desconhecido"
      );
    } finally {
      setRefreshing(false);
    }
  };

  const updateBooking = (id: string) => {
    router.navigate({
      pathname: "/schedule",
      params: { idAppointment: id },
    });
  };

  const cancelBooking = async (id: string) => {
    setRefreshing(true);

    try {
      await AppointmentServices.Cancel(id);
      const updatedBookings = await AppointmentServices.GetAll();
      setBookings(updatedBookings);
    } catch (error: any) {
      console.log(
        "Erro ao cancelar agendamento:",
        error?.message ?? "Erro desconhecido"
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let active = true;

    AppointmentServices.GetAll()
      .then((result) => {
        if (active) {
          setBookings(result);
        }
      })
      .catch((error: any) => {
        console.log(
          "Erro ao carregar agendamentos:",
          error?.message ?? "Erro desconhecido"
        );
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <ScrollView
    
      className="flex-1 p-5 bg-white/40"
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleLoading}
          colors={[Colors.blue[300]]}
          tintColor={Colors.blue[300]}
        />
      }
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Booking
            photo={item.photo}
            day={item.booking_date}
            hour={item.booking_hour}
            service={item.service}
            speciality={item.specialty}
            doctor={item.doctor}
            hospital={item.hospitalname}
            btnCancel={() => cancelBooking(item.id)}
            btnUpdate={() => updateBooking(item.id)}
          />
        )}
      />
    </ScrollView>
  );
}
