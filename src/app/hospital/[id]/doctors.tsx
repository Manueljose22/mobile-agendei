import { HospitalDoctorCard } from "@/src/components/hospitals/HospitalCatalog";
import { useDoctorsQuery } from "@/src/hooks/queries/useDoctorsQuery";
import { useHospitalQuery } from "@/src/hooks/queries/useHospitalsQuery";
import { Colors } from "@/src/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";

export default function HospitalDoctorsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hospitalQuery = useHospitalQuery(id);
  const doctorsQuery = useDoctorsQuery();
  const doctors = (doctorsQuery.data ?? []).filter(
    (doctor) => doctor.Hospital?.id === id
  );

  if (hospitalQuery.isPending || doctorsQuery.isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={Colors.blue[300]} />
        <Text className="mt-3 text-gray-500">A carregar médicos...</Text>
      </View>
    );
  }

  if (hospitalQuery.isError || doctorsQuery.isError || !hospitalQuery.data) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-gray-600">
          Não foi possível carregar os médicos deste hospital.
        </Text>
        <Text
          className="mt-3 text-blue-600"
          onPress={() => {
            void hospitalQuery.refetch();
            void doctorsQuery.refetch();
          }}
        >
          Tentar novamente
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      className="flex-1 bg-slate-50 px-5"
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 32 }}
      data={doctors}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", gap: 12 }}
      refreshControl={
        <RefreshControl
          refreshing={hospitalQuery.isRefetching || doctorsQuery.isRefetching}
          onRefresh={() => {
            void Promise.all([hospitalQuery.refetch(), doctorsQuery.refetch()]);
          }}
          tintColor={Colors.blue[300]}
          colors={[Colors.blue[300]]}
        />
      }
      ListHeaderComponent={
        <View className="mb-5">
          <Text className="text-xl font-semibold text-gray-800">
            Médicos — {hospitalQuery.data.name}
          </Text>
          <Text className="mt-1 text-sm text-gray-500">
            {doctors.length} médico(s) associado(s) a este hospital
          </Text>
        </View>
      }
      renderItem={({ item }) => <HospitalDoctorCard doctor={item} layout="grid" />}
      ListEmptyComponent={
        <Text className="py-10 text-center text-gray-500">
          Este hospital ainda não tem médicos associados.
        </Text>
      }
    />
  );
}
