import { Colors } from "@/src/styles/colors";
import { MapPinIcon, SealCheckIcon } from "phosphor-react-native";
import { Image, Text, View } from "react-native";


type Doctor = {
    id?: string | number ;
    name?: string;
    speciality?: string;
    location?: string;
    photo: string | null | undefined;
}



export default function DoctorAvatar({speciality, id, photo, location, name}: Doctor) {
    return (
        <View className="flex-row items-center gap-5 mb-6 py-2">
            <View>
                <Image className="w-24 h-24 rounded-full border-2 border-white" resizeMode="cover" source={{uri: photo ?? "https://cdn-icons-png.flaticon.com/512/6210/6210017.png"}} />
                <View className="w-5 h-5  absolute -bottom-0 right-3 rounded-full justify-center items-center">
                    <SealCheckIcon size={17} color={Colors.blue[300]} weight="fill" />
                </View>
            </View>
            <View>
                <Text className="text-2xl font-medium">{name}</Text>
                <Text className="text-base text-gray-600 font-medium">{speciality}</Text>
                <Text className="text-sm text-gray-500 font-medium">{location}<MapPinIcon color={Colors.blue[300]} size={15} weight="fill" /> </Text>
            </View>
        </View>
    );
}