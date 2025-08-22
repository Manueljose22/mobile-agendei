import DoctorAvatar from "@/src/components/avatar/doctorAvatar";
import { doctors } from "@/src/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";



export default function Services() {

    const { id } = useLocalSearchParams<{ id: string }>();

    const doctor = doctors.find(doc => doc.id === Number(id));

    const handleSchedule = (idService: string) => {
        router.navigate({
            pathname: "/schedule",
            params: { idService, doctorId: doctor?.id }
        });
    }

    return (
        <ScrollView className="flex-1 bg-white py-5 px-6" showsVerticalScrollIndicator={false}>
            <DoctorAvatar
                id={doctor?.id}
                nome={doctor?.nome}
                especialidade={doctor?.especialidade}
                location={doctor?.location}
                imagem={doctor?.imagem}
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
                        data={doctor?.services}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (

                            <View className="flex-row justify-between items-center bg-gray-100  p-4 rounded-lg mb-3">
                                <View>
                                    <Text className="text-gray-800 flex-wrap">{item.name}</Text>
                                    <Text className="text-blue-600 font-semibold">{item.price} AO</Text>
                                </View>
                                <TouchableOpacity onPress={() => handleSchedule(item.id)} className="bg-blue-500 px-4 py-2 rounded-lg">
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