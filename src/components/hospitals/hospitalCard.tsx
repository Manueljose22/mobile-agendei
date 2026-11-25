import { IHospital } from "@/src/services/hospitals/types";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

type HospitalCardProps = {
  hospital: IHospital;
  horizontal?: boolean;
};

export default function HospitalCard({
  hospital,
  horizontal = false,
}: HospitalCardProps) {
  const image = hospital.images[0]?.urlImagem;

  return (
    <Link
      href={{ pathname: "/hospital/[id]", params: { id: hospital.id } }}
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${horizontal ? "w-64 mr-4" : "w-full mb-4"}`}
    >
      <Image
        source={{
          uri: image ?? "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
        }}
        className={horizontal ? "w-full h-36" : "w-full h-44"}
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
          {hospital.name}
        </Text>
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
          {hospital.address}
        </Text>
        {hospital.phone ? (
          <Text className="text-sm text-blue-600 mt-2">{hospital.phone}</Text>
        ) : null}
      </View>
    </Link>
  );
}
