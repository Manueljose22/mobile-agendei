import HospitalCard from "@/src/components/hospitals/hospitalCard";
import { useHospitalsQuery } from "@/src/hooks/queries/useHospitalsQuery";
import { Colors } from "@/src/styles/colors";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ListHospitals() {
  const [search, setSearch] = useState("");
  const hospitalsQuery = useHospitalsQuery();
  const hospitals = useMemo(() => hospitalsQuery.data ?? [], [hospitalsQuery.data]);

  const filteredHospitals = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return hospitals;

    return hospitals.filter((hospital) =>
      [hospital.name, hospital.address, hospital.phone ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [hospitals, search]);

  const handleRefresh = async (): Promise<void> => {
    await hospitalsQuery.refetch();
  };

  if (hospitalsQuery.isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color={Colors.blue[300]} />
        <Text className="text-gray-500 mt-3">A carregar hospitais...</Text>
      </View>
    );
  }

  if (hospitalsQuery.isError && hospitals.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 px-6">
        <Text className="text-gray-600 text-center mb-4">
          {hospitalsQuery.error instanceof Error
            ? hospitalsQuery.error.message
            : "Não foi possível carregar os hospitais."}
        </Text>
        <Text className="text-blue-600 font-medium" onPress={() => hospitalsQuery.refetch()}>
          Tentar novamente
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      className="flex-1 bg-slate-50 px-5"
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 32 }}
      data={filteredHospitals}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          refreshing={hospitalsQuery.isRefetching}
          onRefresh={handleRefresh}
          tintColor={Colors.blue[300]}
          colors={[Colors.blue[300]]}
        />
      }
      ListHeaderComponent={
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Pesquisar por hospital ou endereço"
          placeholderTextColor="#9CA3AF"
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-5 text-gray-800"
        />
      }
      renderItem={({ item }) => <HospitalCard hospital={item} />}
      ListEmptyComponent={
        <Text className="text-center text-gray-500 py-10">
          {search ? "Nenhum hospital corresponde à pesquisa." : "Nenhum hospital disponível."}
        </Text>
      }
    />
  );
}
