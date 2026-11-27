import { specialtyIcons } from "@/src/constants/specialtyIcons";
import { IDoctorsSave } from "@/src/services/doctors/types";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type HospitalSpecialtyCardProps = {
  hospitalId: string;
  specialtyId: string;
  name: string;
  layout?: "horizontal" | "grid";
};

export function HospitalSpecialtyCard({
  hospitalId,
  specialtyId,
  name,
  layout = "horizontal",
}: HospitalSpecialtyCardProps) {
  return (
    <Link
      href={{
        pathname: "/hospital/[id]/specialties/[specialtyId]",
        params: { id: hospitalId, specialtyId },
      }}
      asChild
    >
      <Pressable className={`${layout === "grid" ? "flex-1" : "w-36"} rounded-2xl border border-gray-100 bg-white p-4 active:opacity-70`}>
        <View style={{ elevation: 5 }} className="h-36 mb-4 flex flex-col  me-3 rounded-lg py-4 shadow-md shadow-slate-500h-10 w-10 items-center justify-center  bg-blue-50">
          {specialtyIcons[name] ?? (
            <Text className="text-xl font-semibold text-blue-600">
              {name.slice(0, 1).toUpperCase()}
            </Text>
          )}
          
        </View>
        <Text className="mt-3 font-semibold text-gray-800" numberOfLines={2}>
          {name}
        </Text>
      </Pressable>
    </Link>
  );
}

export function HospitalDoctorCard({ doctor, layout = "horizontal" }: { doctor: IDoctorsSave; layout?: "horizontal" | "grid" }) {
  return (
    <Link href={{ pathname: "/doctor/[id]", params: { id: doctor.id } }} asChild>
      <Pressable className={`${layout === "grid" ? "flex-1" : "w-40"} rounded-2xl border border-gray-100 bg-white p-3 active:opacity-70`}>
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
      </Pressable>
    </Link>
  );
}
