import { useDoctorsQuery } from "@/src/hooks/queries/useDoctorsQuery";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

type DoctorsProps = {
  columns?: number;
  horizontal?: boolean;
};

export default function Doctors({ columns, horizontal }: DoctorsProps) {
  const doctorsQuery = useDoctorsQuery();
  const doctors = doctorsQuery.data ?? [];

  if (doctorsQuery.isPending) {
    return (
      <View className="flex-1 items-center justify-center py-8">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (doctorsQuery.isError && doctors.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-8">
        <Text className="text-center text-red-500">
          Não foi possível carregar os médicos.
        </Text>
        <Text className="text-blue-500 mt-3" onPress={() => doctorsQuery.refetch()}>
          Tentar novamente
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ gap: 16 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={horizontal}
      numColumns={columns}
      columnWrapperStyle={columns ? { justifyContent: "space-between", gap: 16 } : undefined}
      data={doctors}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Link
          className="p-4 bg-gray-200 rounded-2xl mb-4"
          href={{ pathname: "/doctor/[id]", params: { id: item.id } }}
        >
          <View className="flex flex-col items-center">
            <Image
              className="w-36 h-44 rounded-2xl"
              resizeMode="cover"
              source={{
                uri: item.photo ?? "https://cdn-icons-png.flaticon.com/512/6210/6210017.png",
              }}
            />
            <View className="mt-2">
              <Text className="text-base font-medium text-center">{item.name}</Text>
              <Text className="text-gray-600 font-medium text-center">
                {item.Specialty?.name ?? "Especialidade não indicada"}
              </Text>
            </View>
          </View>
        </Link>
      )}
      ListEmptyComponent={
        <Text className="text-center text-gray-500 py-6">
          Nenhum médico disponível.
        </Text>
      }
    />
  );
}
