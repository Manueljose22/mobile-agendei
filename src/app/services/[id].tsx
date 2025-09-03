import DoctorAvatar from "@/src/components/avatar/doctorAvatar";
import { DoctorsServices } from "@/src/services/doctors/DoctorsServices";
import { IDoctorsSave, IDoctorsService } from "@/src/services/doctors/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";



export default function Services() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const [doctorServices, setDoctorServices] = useState<IDoctorsService[]>();
    const [doctor, setDoctor] = useState<IDoctorsSave>();



    const handleSchedule = (idService: string) => {
        router.navigate({
            pathname: "/schedule",
            params: { idService, doctorId: id }
        });
    }

    const loadingServicesDoctor = async () => {
        try {
            const [doctor, services] = await Promise.all([DoctorsServices.getDoctorById(id), DoctorsServices.getDoctorService(id)]);
            setDoctor(doctor)
            setDoctorServices(services)
        } catch (error: any) {
            console.log("erro ao carregar dados do doctor: ", error.response.message);
        }
    }


    useEffect(() => {
        loadingServicesDoctor()
    }, [])

    return (
        <ScrollView className="flex-1 bg-white py-5 px-6" showsVerticalScrollIndicator={false}>
            <DoctorAvatar
                id={doctor?.id}
                name={doctor?.name}
                speciality={doctor?.Specialty?.name}
                location={doctor?.Hospital?.name}
                photo={doctor?.photo}
            />

            <View className="w-full h-[1px] bg-gray-300" />
            <View className="mt-4">
                <Text className="text-lg font-medium text-gray-800">Serviços oferecidos</Text>

                <View className="space-y-3 mb-6 py-5">
                    <FlatList
                        className="w-full"
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        data={doctorServices}
                        keyExtractor={(item) => item.idService}
                        renderItem={({ item }) => (

                            <View className="flex-row justify-between items-center bg-gray-100  p-4 rounded-lg mb-3">
                                <View>
                                    <Text className="text-gray-800 flex-wrap">{item.title}</Text>
                                    <Text className="text-blue-600 font-semibold">{item.price} AO</Text>
                                </View>
                                <TouchableOpacity onPress={() => handleSchedule(item.idService)} className="bg-blue-500 px-4 py-2 rounded-lg">
                                    <Text className="text-white font-semibold">Agendar</Text>
                                </TouchableOpacity>
                            </View>


                        )}
                        ListEmptyComponent={() => (
                            <Text className="text-gray-500 text-center">Nenhum serviço disponível.</Text>
                        )}
                    />
                </View>


            </View>

        </ScrollView>
    )
}