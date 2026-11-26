import { HospitalDoctorCard, HospitalSpecialtyCard } from "@/src/components/hospitals/HospitalCatalog";
import { useDoctorsQuery } from "@/src/hooks/queries/useDoctorsQuery";
import { useHospitalQuery } from "@/src/hooks/queries/useHospitalsQuery";
import { useSpecialitiesQuery } from "@/src/hooks/queries/useSpecialitiesQuery";
import { Colors } from "@/src/styles/colors";
import { Link, useLocalSearchParams } from "expo-router";
import { EnvelopeSimpleIcon, MapPinIcon, PhoneIcon } from "phosphor-react-native";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

export default function HospitalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width: screenWidth } = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hospitalQuery = useHospitalQuery(id);
  const doctorsQuery = useDoctorsQuery();
  const specialitiesQuery = useSpecialitiesQuery();
  const hospital = hospitalQuery.data;
  const hospitalDoctors = (doctorsQuery.data ?? []).filter((doctor) => doctor.Hospital?.id === id);
  const hospitalSpecialtyIds = new Set(hospitalDoctors.map((doctor) => doctor.Specialty?.id).filter((specialtyId): specialtyId is string => Boolean(specialtyId)));
  const hospitalSpecialities = (specialitiesQuery.data ?? []).filter((specialty) => hospitalSpecialtyIds.has(specialty.id));

  if (hospitalQuery.isPending) {
    return <View className="flex-1 items-center justify-center bg-white"><ActivityIndicator size="large" color={Colors.blue[300]} /><Text className="text-gray-500 mt-3">A carregar hospital...</Text></View>;
  }

  if (hospitalQuery.isError || !hospital) {
    return <View className="flex-1 items-center justify-center bg-white px-6"><Text className="text-gray-600 text-center mb-4">{hospitalQuery.error instanceof Error ? hospitalQuery.error.message : "Não foi possível carregar os dados do hospital."}</Text><TouchableOpacity onPress={() => hospitalQuery.refetch()} className="bg-blue-500 px-5 py-3 rounded-lg"><Text className="text-white font-semibold">Tentar novamente</Text></TouchableOpacity></View>;
  }

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      {hospital.images.length > 0 ? (
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const nextIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setActiveImageIndex(Math.min(nextIndex, hospital.images.length - 1));
            }}
          >
            {hospital.images.map((image, index) => <Image key={`${image.urlImagem}-${index}`} source={{ uri: image.urlImagem }} style={{ width: screenWidth, height: 256 }} resizeMode="cover" />)}
          </ScrollView>
          {hospital.images.length > 1 ? (
            <View className="absolute bottom-3 left-0 right-0 flex-row items-center justify-center">
              {hospital.images.map((image, index) => (
                <View
                  key={`${image.urlImagem}-indicator-${index}`}
                  className={`h-2 rounded-full mx-1 ${activeImageIndex === index ? "w-5 bg-white" : "w-2 bg-white/60"}`}
                />
              ))}
            </View>
          ) : null}
        </View>
      ) : <View className="h-52 bg-slate-100 items-center justify-center"><Text className="text-gray-400">Sem imagens disponíveis</Text></View>}

      <View className="px-5 py-6">
        <Text className="text-2xl font-semibold text-gray-800">{hospital.name}</Text>
        <View className="flex-row items-start mt-5"><MapPinIcon size={22} color={Colors.blue[300]} /><Text className="text-base text-gray-600 ml-3 flex-1">{hospital.address}</Text></View>
        {hospital.phone ? <View className="flex-row items-center mt-4"><PhoneIcon size={22} color={Colors.blue[300]} /><Text className="text-base text-gray-600 ml-3">{hospital.phone}</Text></View> : null}
        {hospital.email ? <View className="flex-row items-center mt-4"><EnvelopeSimpleIcon size={22} color={Colors.blue[300]} /><Text className="text-base text-gray-600 ml-3">{hospital.email}</Text></View> : null}
      </View>

      <View className="mt-2">
        <View className="px-5 flex-row items-center justify-between mb-4">
          <Text className="text-xl font-semibold text-gray-800">Especialidades</Text>
          <Link href={{ pathname: "/hospital/[id]/specialties", params: { id } }}>
            <Text className="text-base text-blue-600 font-medium">Ver todos</Text>
          </Link>
        </View>
        {specialitiesQuery.isPending || doctorsQuery.isPending ? (
          <ActivityIndicator color={Colors.blue[300]} />
        ) : specialitiesQuery.isError || doctorsQuery.isError ? (
          <Text className="px-5 text-gray-500">Não foi possível carregar as especialidades.</Text>
        ) : hospitalSpecialities.length ? (
          <FlatList
            horizontal
            data={hospitalSpecialities.slice(0, 3)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HospitalSpecialtyCard hospitalId={id} specialtyId={item.id} name={item.name} />
            )}
            ItemSeparatorComponent={() => <View className="w-3" />}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 4 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text className="px-5 text-gray-500">Este hospital ainda não tem especialidades com médicos associados.</Text>
        )}
      </View>

      <View className="mt-8">
        <View className="px-5 flex-row items-center justify-between mb-4">
          <Text className="text-xl font-semibold text-gray-800">Médicos</Text>
          <Link href={{ pathname: "/hospital/[id]/doctors", params: { id } }}>
            <Text className="text-base text-blue-600 font-medium">Ver todos</Text>
          </Link>
        </View>
        {doctorsQuery.isPending ? (
          <ActivityIndicator color={Colors.blue[300]} />
        ) : doctorsQuery.isError ? (
          <Text className="px-5 text-gray-500">Não foi possível carregar os médicos.</Text>
        ) : hospitalDoctors.length ? (
          <FlatList
            horizontal
            data={hospitalDoctors.slice(0, 3)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HospitalDoctorCard doctor={item} />}
            ItemSeparatorComponent={() => <View className="w-3" />}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 4 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text className="px-5 text-gray-500">Nenhum médico associado a este hospital.</Text>
        )}
      </View>
    </ScrollView>
  );
}
