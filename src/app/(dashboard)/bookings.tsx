import { Booking } from "@/src/components/booking/booking";
import { AppointmentServices } from "@/src/services/appointments/AppoitmentsService";
import { IAppointmentSave } from "@/src/services/appointments/types";
import { Colors } from "@/src/styles/colors";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView } from "react-native";





export default function Bookings() {
    const [bookings, setBookings] = useState<IAppointmentSave[]>()
    const [isRefreshing, setRefreshing] = useState<boolean>(false)

    const handleLoading = async () => {
        setRefreshing(true);
        try {
            const result = await AppointmentServices.GetAll();
            setBookings(result);
        } catch (error: any) {
            console.log("Erro ao carregar agendamentos: ", error.response.message)
        } finally {
            setRefreshing(false)
        }
    }

    useEffect(() => {
        handleLoading();
    }, [])
    return (
        <ScrollView className="flex-1 p-5 bg-white/40"
            refreshControl={<RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleLoading}
                colors={[Colors.blue[300]]}
                tintColor={Colors.blue[300]}
            />}
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
                        btnCancel={() => ""}
                        btnUpdate={() => ""}
                    />
                )}
            />
        </ScrollView>
    )
}