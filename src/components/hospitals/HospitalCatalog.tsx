import { IDoctorsSave } from "@/src/services/doctors/types";
import { specialtyIcons } from "@/src/constants/specialtyIcons";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

type HospitalSpecialtyCardProps = {
  hospitalId: string;
  specialtyId: string;
  name: string;
};

export function HospitalSpecialtyCard({
  hospitalId,
  specialtyId,
  name,
}: HospitalSpecialtyCardProps) {
  return (
    <Link
      href={{
        pathname: "/hospital/[id]/specialties/[specialtyId]",
        params: { id: hospitalId, specialtyId },
      }}
      className="mr-3 w-36 rounded-2xl border border-gray-100 bg-white p-4"
    >
      <View className="h-12 w-12 items-center justify-center rounded-full bg-blue-50">
        {specialtyIcons[name] ?? (
          <Text className="text-xl font-semibold text-blue-600">
            {name.slice(0, 1).toUpperCase()}
          </Text>
        )}
      </View>
      <Text className="mt-3 font-semibold text-gray-800" numberOfLines={2}>
        {name}
      </Text>
      <Text className="mt-1 text-xs text-blue-600">Ver médicos</Text>
    </Link>
  );
}

export function HospitalDoctorCard({ doctor }: { doctor: IDoctorsSave }) {
  return (
    <Link
      href={{ pathname: "/doctor/[id]", params: { id: doctor.id } }}
      className="mr-3 w-40 rounded-2xl border border-gray-100 bg-white p-3"
    >
      <Image
        source={{
          uri:
            doctor.photo ??
            "https://cdn-icons-png.flaticon.com/512/6210/6210017.png",
        }}
        className="h-40 w-full rounded-xl"
        resizeMode="cover"
      />
      <Text className="mt-2 text-sm font-semibold text-gray-800" numberOfLines={1}>
        {doctor.name}
      </Text>
      <Text className="mt-1 text-xs text-gray-500" numberOfLines={2}>
        {doctor.Specialty?.name ?? "Especialidade não indicada"}
      </Text>
    </Link>
  );
}
