import DoctorAvatar from "@/src/components/avatar/doctorAvatar";
import {
  useDoctorQuery,
  useDoctorServicesQuery,
} from "@/src/hooks/queries/useDoctorsQuery";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Services() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: doctor,
    isLoading: isDoctorLoading,
    isError: isDoctorError,
    error: doctorError,
    refetch: refetchDoctor,
  } = useDoctorQuery(id);
  const {
    data: doctorServices,
    isLoading: areServicesLoading,
    isError: areServicesError,
    error: servicesError,
    refetch: refetchServices,
  } = useDoctorServicesQuery(id);

  const handleSchedule = (idService: string) => {
    router.navigate({
      pathname: "/schedule",
      params: { idService, doctorId: id },
    });
  };

  const isLoading = isDoctorLoading || areServicesLoading;
  const hasError = isDoctorError || areServicesError;

  useEffect(() => {
    if (isDoctorError) {
      console.log("Erro ao carregar dados do médico:", doctorError);
    }
    if (areServicesError) {
      console.log("Erro ao carregar serviços do médico:", servicesError);
    }
  }, [isDoctorError, areServicesError, doctorError, servicesError]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-500 mt-3">A carregar serviços...</Text>
      </View>
    );
  }

  if (hasError || !doctor) {
    const message = doctorError instanceof Error
      ? doctorError.message
      : servicesError instanceof Error
        ? servicesError.message
        : "Não foi possível carregar os dados.";

    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-gray-700 text-center mb-4">{message}</Text>
        <TouchableOpacity
          onPress={() => {
            refetchDoctor();
            refetchServices();
          }}
          className="bg-blue-500 px-5 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white py-5 px-6"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />
      <DoctorAvatar
        id={doctor.id}
        name={doctor.name}
        speciality={doctor.Specialty?.name}
        location={doctor.Hospital?.name}
        photo={doctor.photo}
      />

      <View className="w-full h-[1px] bg-gray-300" />

      <View className="mt-4">
        <Text className="text-lg font-medium text-gray-800">
          Serviços oferecidos
        </Text>

        <View className="space-y-3 mb-6 py-5">
          <FlatList
            className="w-full"
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            data={doctorServices ?? []}
            keyExtractor={(item) => item.idService}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-lg mb-3">
                <View>
                  <Text className="text-gray-800 flex-wrap">
                    {item.title}
                  </Text>
                  <Text className="text-blue-600 font-semibold">
                    {item.price} AO
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleSchedule(item.idService)}
                  className="bg-blue-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold">Agendar</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text className="text-gray-500 text-center">
                Nenhum serviço disponível.
              </Text>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
