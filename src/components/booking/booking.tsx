import { Colors } from "@/src/styles/colors";
import { CalendarIcon, ClockIcon, MapPinIcon } from "phosphor-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

type bookingProps = {
    day: Date;
    hour: string;
    doctor: string;
    speciality: string;
    hospital: string;
    service: string;
    photo: string;
    status: string;
    btnCancel: () => void;
    btnUpdate: () => void;
};

export const Booking = ({
    speciality,
    btnCancel,
    btnUpdate,
    day,
    doctor,
    photo,
    hospital,
    hour,
    service,
    status
}: bookingProps) => {
    const isCancelled = status?.toLowerCase() === "cancelado";

    return (
        <View style={{ elevation: 10 }} className="bg-white rounded-lg shadow-md p-5 mb-5">
            <View className="rounded-lg mb-3 flex-row gap-4 items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <CalendarIcon color={Colors.blue[300]} size={20} weight="fill" />
                    <Text className="text-gray-600 font-medium">{day.toString().split("T")[0]}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <ClockIcon color={Colors.blue[300]} size={20} weight="fill" />
                    <Text className="text-gray-600 font-medium">{hour}</Text>
                </View>
            </View>

            <View className="self-start rounded-full px-3 py-1 mb-3"
                style={{ backgroundColor: isCancelled ? "#fee2e2" : "#dbeafe" }}>
                <Text className="text-sm font-semibold"
                    style={{ color: isCancelled ? "#b91c1c" : "#1d4ed8" }}>
                    {status || "Pendente"}
                </Text>
            </View>

            <View className="border-b border-gray-200 mb-4" />
            <View className="mb-4 flex-row gap-4">
                <Image
                    className="w-24 h-28 rounded-lg"
                    resizeMode="cover"
                    source={{ uri: photo ?? "https://cdn-icons-png.flaticon.com/512/6210/6210017.png" }}
                />
                <View className="flex-1">
                    <Text className="text-lg font-semibold mb-2">{doctor}</Text>
                    <Text className="text-gray-600">{speciality}</Text>
                    <Text className="text-gray-600">{hospital} <MapPinIcon color={Colors.blue[300]} size={15} weight="fill" /></Text>
                    <Text className="text-gray-600 font-medium">{service}</Text>
                </View>
            </View>

            {!isCancelled ? (
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity onPress={btnCancel} className="bg-red-500 rounded-lg p-3 flex-1">
                        <Text className="text-white text-center font-semibold">Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={btnUpdate} className="bg-blue-500 rounded-lg p-3 flex-1">
                        <Text className="text-white text-center font-semibold">Reagendar</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};
