import Category from "@/src/components/categories/category";
import Doctor from "@/src/components/doctors/doctor";
import HospitalCard from "@/src/components/hospitals/hospitalCard";
import { SearchComponent } from "@/src/components/search/SearchComponent";
import { specialtyIcons } from "@/src/constants/specialtyIcons";
import { useDoctorsQuery } from "@/src/hooks/queries/useDoctorsQuery";
import { useHospitalsQuery } from "@/src/hooks/queries/useHospitalsQuery";
import { useSpecialitiesQuery } from "@/src/hooks/queries/useSpecialitiesQuery";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Colors } from "@/src/styles/colors";
import { Link, router } from "expo-router";
import { BellSimpleIcon } from "phosphor-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";

export default function Home() {
  const [search, setSearch] = useState<string | undefined>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const doctorsQuery = useDoctorsQuery();
  const specialitiesQuery = useSpecialitiesQuery();
  const hospitalsQuery = useHospitalsQuery();
  const { user } = useAuthStore();

  const doctors = doctorsQuery.data ?? [];
  const specialities = specialitiesQuery.data ?? [];
  const hospitals = hospitalsQuery.data ?? [];

  const refreshData = async () => {
    await Promise.all([
      doctorsQuery.refetch(),
      specialitiesQuery.refetch(),
      hospitalsQuery.refetch(),
    ]);
  };

  const searchTerm = search?.trim().toLowerCase();
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      !searchTerm ||
      doctor.name.toLowerCase().includes(searchTerm) ||
      doctor.Specialty?.name?.toLowerCase().includes(searchTerm);

    const matchesSpeciality =
      !selectedOption || doctor.Specialty?.name === selectedOption;

    return matchesSearch && matchesSpeciality;
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 py-5 px-6 bg-slate-50"
      refreshControl={
        <RefreshControl
          refreshing={
            doctorsQuery.isRefetching ||
            specialitiesQuery.isRefetching ||
            hospitalsQuery.isRefetching
          }
          onRefresh={refreshData}
          tintColor={Colors.blue[300]}
          colors={[Colors.blue[300]]}
        />
      }
    >
      <StatusBar barStyle="dark-content" />
      <View className="flex flex-row justify-between items-center mt-5">
        <Image
          className="w-2/4 h-10"
          source={require("@/src/assets/logo.png")}
        />
        <Pressable onPress={() => router.push("/notifications")} hitSlop={10} accessibilityRole="button" accessibilityLabel="Abrir notificações"><BellSimpleIcon size={32} /></Pressable>
      </View>

      <Text className="text-3xl text-gray-600 font-medium my-8">
        Olá, {user?.name.split(" ")[0]} 🖐️
      </Text>

      <SearchComponent setSearch={setSearch} />

      <View className="mt-11 mb-5 flex flex-row justify-between items-center">
        <Text className="text-3xl font-medium">Categorias</Text>
        <Link href="/home/listCategories">
          <Text className="text-base text-gray-500 font-medium">
            Ver todas
          </Text>
        </Link>
      </View>

      {specialitiesQuery.isPending ? (
          <ActivityIndicator size="large" color={Colors.blue[300]} />
      ) : specialitiesQuery.isError ? (
        <Text className="text-red-500 mb-6">
          Não foi possível carregar as categorias.
        </Text>
      ) : (
        <FlatList
          className="max-h-36 mb-6"
          data={specialities}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Category
              icon={specialtyIcons[item.name]}
              name={item.name}
              setSelectedOption={setSelectedOption}
            />
          )}
        />
      )}

      <View className="mt-4 mb-5 flex flex-row justify-between items-center">
        <Text className="text-3xl font-medium">Hospitais</Text>
        <Link href="/home/listHospitals">
          <Text className="text-base text-gray-500 font-medium">
            Ver todos
          </Text>
        </Link>
      </View>

      {hospitalsQuery.isPending ? (
          <ActivityIndicator size="large" color={Colors.blue[300]} />

      ) : hospitalsQuery.isError ? (
        <Text className="text-red-500 mb-6">
          Não foi possível carregar os hospitais.
        </Text>
      ) : (
        <FlatList
          className="mb-6"
          horizontal
          contentContainerStyle={{ gap: 16 }}
          showsHorizontalScrollIndicator={false}
          data={hospitals.slice(0, 5)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HospitalCard hospital={item} horizontal />
          )}
          ListEmptyComponent={
            <Text className="text-gray-500 mb-6">Nenhum hospital disponível.</Text>
          }
        />
      )}

      <View className="mt-4 mb-5 flex flex-row justify-between items-center">
        <Text className="text-3xl font-medium">Médicos</Text>
        <Link href="/home/listDoctors">
          <Text className="text-base text-gray-500 font-medium">
            Ver todos
          </Text>
        </Link>
      </View>

      <View className="pb-10">
        {doctorsQuery.isPending ? (
            <ActivityIndicator size="large" color={Colors.blue[300]} />

        ) : doctorsQuery.isError ? (
          <Text className="text-red-500">
            Não foi possível carregar os médicos.
          </Text>
        ) : (
          <FlatList
            horizontal
            contentContainerStyle={{ gap: 16 }}
            showsHorizontalScrollIndicator={false}
            data={filteredDoctors}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Doctor
                id={item.id}
                name={item.name}
                photo={item.photo ?? ""}
                speciality={item.Specialty?.name ?? "Especialidade não indicada"}
              />
            )}
            ListEmptyComponent={
              <Text className="text-gray-500">Nenhum médico encontrado.</Text>
            }
          />
        )}
      </View>
    </ScrollView>
  );
}
