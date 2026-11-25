import { useHospitalQuery } from "@/src/hooks/queries/useHospitalsQuery";
import { Colors } from "@/src/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { MapPinIcon, PhoneIcon, EnvelopeSimpleIcon } from "phosphor-react-native";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HospitalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hospitalQuery = useHospitalQuery(id);
  const hospital = hospitalQuery.data;

  if (hospitalQuery.isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={Colors.blue[300]} />
        <Text className="text-gray-500 mt-3">A carregar hospital...</Text>
      </View>
    );
  }

  if (hospitalQuery.isError || !hospital) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-gray-600 text-center mb-4">
          {hospitalQuery.error instanceof Error
            ? hospitalQuery.error.message
            : "Não foi possível carregar os dados do hospital."}
        </Text>
        <TouchableOpacity
          onPress={() => hospitalQuery.refetch()}
          className="bg-blue-500 px-5 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {hospital.images.length > 0 ? (
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {hospital.images.map((image, index) => (
            <Image
              key={`${image.urlImagem}-${index}`}
              source={{ uri: image.urlImagem }}
              className="w-screen h-64"
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      ) : (
        <View className="h-52 bg-slate-100 items-center justify-center">
          <Text className="text-gray-400">Sem imagens disponíveis</Text>
        </View>
      )}

      <View className="px-6 py-6">
        <Text className="text-2xl font-semibold text-gray-800">{hospital.name}</Text>

        <View className="flex-row items-start mt-5">
          <MapPinIcon size={22} color={Colors.blue[300]} />
          <Text className="text-base text-gray-600 ml-3 flex-1">{hospital.address}</Text>
        </View>

        {hospital.phone ? (
          <View className="flex-row items-center mt-4">
            <PhoneIcon size={22} color={Colors.blue[300]} />
            <Text className="text-base text-gray-600 ml-3">{hospital.phone}</Text>
          </View>
        ) : null}

        {hospital.email ? (
          <View className="flex-row items-center mt-4">
            <EnvelopeSimpleIcon size={22} color={Colors.blue[300]} />
            <Text className="text-base text-gray-600 ml-3">{hospital.email}</Text>
          </View>
        ) : null}

        <View className="mt-7 border-t border-gray-200 pt-5">
          <Text className="text-lg font-semibold text-gray-800">Informações</Text>
          <Text className="text-sm text-gray-500 mt-2">
            Estado: {hospital.status === "ACTIVE" ? "Activo" : "Suspenso"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
