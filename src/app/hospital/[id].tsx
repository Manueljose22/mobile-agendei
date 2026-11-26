import Doctor from "@/src/components/doctors/doctor";
import { specialtyIcons } from "@/src/constants/specialtyIcons";
import { useDoctorsQuery } from "@/src/hooks/queries/useDoctorsQuery";
import { useHospitalQuery } from "@/src/hooks/queries/useHospitalsQuery";
import { useSpecialitiesQuery } from "@/src/hooks/queries/useSpecialitiesQuery";
import { Colors } from "@/src/styles/colors";
import { Link, useLocalSearchParams } from "expo-router";
import { MapPinIcon, PhoneIcon, EnvelopeSimpleIcon } from "phosphor-react-native";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HospitalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
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
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      {hospital.images.length > 0 ? (
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {hospital.images.map((image, index) => <Image key={`${image.urlImagem}-${index}`} source={{ uri: image.urlImagem }} className="w-screen h-64" resizeMode="cover" />)}
        </ScrollView>
      ) : <View className="h-52 bg-slate-100 items-center justify-center"><Text className="text-gray-400">Sem imagens disponíveis</Text></View>}

      <View className="px-6 py-6">
        <Text className="text-2xl font-semibold text-gray-800">{hospital.name}</Text>
        <View className="flex-row items-start mt-5"><MapPinIcon size={22} color={Colors.blue[300]} /><Text className="text-base text-gray-600 ml-3 flex-1">{hospital.address}</Text></View>
        {hospital.phone ? <View className="flex-row items-center mt-4"><PhoneIcon size={22} color={Colors.blue[300]} /><Text className="text-base text-gray-600 ml-3">{hospital.phone}</Text></View> : null}
        {hospital.email ? <View className="flex-row items-center mt-4"><EnvelopeSimpleIcon size={22} color={Colors.blue[300]} /><Text className="text-base text-gray-600 ml-3">{hospital.email}</Text></View> : null}
        <View className="mt-7 border-t border-gray-200 pt-5"><Text className="text-lg font-semibold text-gray-800">Informações</Text><Text className="text-sm text-gray-500 mt-2">Estado: {hospital.status === "ACTIVE" ? "Activo" : "Suspenso"}</Text></View>

        <View className="mt-8">
          <View className="flex-row items-center justify-between mb-4"><Text className="text-xl font-semibold text-gray-800">Especialidades</Text><Link href={{ pathname: "/hospital/[id]/specialties", params: { id } }}><Text className="text-blue-600 font-medium">Ver todos</Text></Link></View>
          {specialitiesQuery.isPending ? <ActivityIndicator color={Colors.blue[300]} /> : specialitiesQuery.isError ? <Text className="text-gray-500">Não foi possível carregar as especialidades.</Text> : hospitalSpecialities.length ? (
            <View className="flex-row flex-wrap">
              {hospitalSpecialities.slice(0, 3).map((specialty) => (
                <Link key={specialty.id} href={{ pathname: "/hospital/[id]/specialties/[specialtyId]", params: { id, specialtyId: specialty.id } }} className="w-[31%] mr-[2%] mb-3 rounded-xl bg-slate-100 px-2 py-4 items-center">
                  <View className="bg-white rounded-full p-3 mb-2">{specialtyIcons[specialty.name]}</View>
                  <Text className="text-gray-700 text-center text-sm font-medium">{specialty.name}</Text>
                </Link>
              ))}
            </View>
          ) : <Text className="text-gray-500">Este hospital ainda não tem especialidades com médicos associados.</Text>}
        </View>

        <View className="mt-7">
          <View className="flex-row items-center justify-between mb-4"><Text className="text-xl font-semibold text-gray-800">Médicos</Text><Link href={{ pathname: "/hospital/[id]/doctors", params: { id } }}><Text className="text-blue-600 font-medium">Ver todos</Text></Link></View>
          {doctorsQuery.isPending ? <ActivityIndicator color={Colors.blue[300]} /> : doctorsQuery.isError ? <Text className="text-gray-500">Não foi possível carregar os médicos.</Text> : hospitalDoctors.length ? (
            <View className="flex-row flex-wrap">
              {hospitalDoctors.slice(0, 3).map((doctor) => <View key={doctor.id} className="w-[48%]"><Doctor id={doctor.id} name={doctor.name} photo={doctor.photo ?? ""} speciality={doctor.Specialty?.name ?? "Especialidade não indicada"} /></View>)}
            </View>
          ) : <Text className="text-gray-500">Nenhum médico associado a este hospital.</Text>}
        </View>
      </View>
    </ScrollView>
  );
}
