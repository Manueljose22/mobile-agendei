import { PenIcon } from "phosphor-react-native";
import { Image, Pressable, Text, View } from "react-native";


type avatarProps = {
    image?: string | null;
    username?: string;
    email?: string;
    onPress?: () => void
}




export default function UserAvatar({email, image, username, onPress}:avatarProps) {
    return (
        <View className="items-center">
            <View>
                <Image
                    className="w-[120px] h-[120px] rounded-full border-2 border-gray-500"
                    source={{ uri: image || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                />
                <Pressable onPress={onPress} style={{ elevation: 2 }} className="absolute bottom-2 right-2 bg-gray-500 p-2 rounded-full z-10">
                    <PenIcon
                        size={20}
                        color={"#FFFFFF"}
                        weight="fill"
                    />
                </Pressable>
            </View>
            <Text className="font-medium text-lg mb-1" >{username}</Text>
            <Text className="text-sm text-gray-600">{email}</Text>
        </View>
    )
}