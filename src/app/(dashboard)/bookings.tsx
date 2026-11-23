import { Booking } from "@/src/components/booking/booking";
import { AppointmentServices } from "@/src/services/appointments/AppoitmentsService";
import { IAppointmentSave } from "@/src/services/appointments/types";
import { Colors } from "@/src/styles/colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';







export default function Bookings() {
    const [bookings, setBookings] = useState<IAppointmentSave[]>()
    const [isRefreshing, setRefreshing] = useState<boolean>(false)
    const layout = useWindowDimensions();
    const [index, setIndex] = useState<number>(0);

    const [routes] = useState([
        { key: 'proximos', title: 'Próximos' },
        { key: 'concluidos', title: 'Concluídos' },
    ]);


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

    const updateBooking = (id: string) => {
        router.navigate({ pathname: "/schedule", params: { idAppointment: id } });
    }

    const cancelBooking = async (id: string) => {
        try {
            await AppointmentServices.Cancel(id);
            setRefreshing(true)
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setRefreshing(false)
        }
    }

    useEffect(() => {
        handleLoading();
    }, [])


    

    const Confirmed = () => (
        <View className="mt-5">
            <FlatList
                scrollEnabled={false}
                data={bookings?.filter(e => e.status.toLowerCase() !== "concluido" && e.status.toLowerCase() !== "cancelado")}
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
                ListEmptyComponent={() => <Text>Nenhum agendamento</Text>}
            />
        </View>
    );

    const Completed = () => (
        <View className="mt-5">
            <FlatList
                scrollEnabled={false}
                data={bookings?.filter(e => e.status.toLowerCase() === "concluido" || e.status.toLowerCase() === "cancelado")}
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
                ListEmptyComponent={() => <Text>Nenhum agendamento concluído ou cancelado</Text>}
            />
        </View>
    );

    const renderScene = SceneMap({
        proximos: Confirmed,
        concluidos: Completed,
    });


    return (
        <ScrollView className="flex-1 p-5 bg-white/40"
            refreshControl={<RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleLoading}
                colors={[Colors.blue[300]]}
                tintColor={Colors.blue[300]}
            />}
        >

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}

                        indicatorStyle={{ backgroundColor: Colors.blue[300] }}
                        style={{ backgroundColor: "transparent", borderWidth: 0, shadowColor: "transparent", }}
                        activeColor={Colors.blue[300]}
                        inactiveColor={Colors.gray[200]}
                    />
                )}
            />
        </ScrollView>
    )
}