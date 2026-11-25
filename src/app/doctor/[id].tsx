import DoctorAvatar from "@/src/components/avatar/doctorAvatar";
import { ButtonDefault } from "@/src/components/button/ButtonDefault";
import { workingHours } from "@/src/constants/data";
import { useDoctorQuery } from "@/src/hooks/queries/useDoctorsQuery";
import { Colors } from "@/src/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { BagIcon, StarIcon, UsersIcon } from "phosphor-react-native";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DoctorServices() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [readMore, setReadMore] = useState(false);
  const { data: doctor, isLoading, isError, error, refetch } = useDoctorQuery(id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={Colors.blue[300]} />
        <Text className="text-gray-500 mt-3">A carregar dados do médico...</Text>
      </View>
    );
  }

  if (isError || !doctor) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-gray-700 text-center mb-4">
          {error instanceof Error ? error.message : "Não foi possível carregar os dados do médico."}
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
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
      <DoctorAvatar
        id={doctor.id}
        name={doctor.name}
        speciality={doctor.Specialty?.name}
        location={doctor.Hospital?.name}
        photo={doctor.photo}
      />

      <View className="w-full h-[1px] bg-gray-300" />

      <View className="py-5 my-5">
        <View className="flex-row justify-between mb-5">
          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-full mb-1">
              <BagIcon weight="fill" color={Colors.blue[300]} size={25} />
            </View>
            <Text className="text-lg text-blue-500 font-medium">
              {doctor.yaersOfExperience ?? 0}
            </Text>
            <Text className="text-gray-600 text-sm">Anos de Experiência</Text>
          </View>

          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-full mb-1">
              <UsersIcon weight="fill" color={Colors.blue[300]} size={25} />
            </View>
            <Text className="text-lg text-blue-500 font-medium">
              +{doctor.numberOfPatients ?? 0}
            </Text>
            <Text className="text-gray-600 text-sm">Pacientes</Text>
          </View>

          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-full mb-1">
              <StarIcon weight="fill" color={Colors.blue[300]} size={25} />
            </View>
            <Text className="text-lg text-blue-500 font-medium">
              +{doctor.rating ?? 0}
            </Text>
            <Text className="text-gray-600 text-sm">Avaliações</Text>
          </View>
        </View>

        <View>
          <Text className="text-lg font-medium mb-2">Sobre</Text>
          <Text className="text-gray-600 text-base text-justify leading-relaxed">
            {readMore
              ? doctor.bio ?? "Informação não disponível."
              : doctor.bio
                ? `${doctor.bio.slice(0, 350)}${doctor.bio.length > 350 ? "..." : ""}`
                : "Informação não disponível."}
          </Text>

          {(doctor.bio?.length ?? 0) > 350 && (
            <Text
              className="text-blue-500 mt-1"
              onPress={() => setReadMore(!readMore)}
            >
              {readMore ? "Ler menos" : "Ler mais"}
            </Text>
          )}
        </View>

        <View className="mt-5">
          <Text className="text-lg font-medium mb-2">
            Horário de Trabalho
          </Text>
          <View className="w-full h-[1px] bg-gray-300 my-2" />
          {workingHours.map((item, index) => (
            <View key={index} className="flex-row justify-between mb-1">
              <Text className="text-gray-600 text-base">{item.day}</Text>
              <Text className="text-gray-600 text-base">{item.hours}</Text>
            </View>
          ))}
        </View>

        <View className="w-full h-[1px] bg-gray-300 my-2" />

        <ButtonDefault
          textButton="Agendar consulta"
          url={{ pathname: "/services/[id]", id }}
        />
      </View>
    </ScrollView>
  );
}
