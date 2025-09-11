import { InfoContent } from "@/src/components/infoContent/InfoContent";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Colors } from "@/src/styles/colors";

import { BellIcon, InfoIcon, PenIcon, SignOutIcon, UserIcon } from "phosphor-react-native";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Profile() {
    const {logout, user} = useAuthStore();

    return (
        <SafeAreaView className="flex-1 bg-white p-5" >
            <View className="flex-row items-center mb-5">
                {/* <Image className="w-2/4 h-10" source={require("@/src/assets/logo.png")} /> */}
                <Text className="text-3xl font-medium">Perfil</Text>
            </View>

            <View className="items-center mt-5">
                <View>
                    <Image
                        className="w-[120px] h-[120px] rounded-full border-2 border-gray-500"
                        source={{ uri: "https://avatars.githubusercontent.com/u/102646626?v=5" }}
                    />
                    <View style={{elevation: 2}} className="absolute bottom-2 right-2 bg-gray-500 p-2 rounded-full z-10">
                        <PenIcon 
                            size={20} 
                            color={"#FFFFFF"} 
                            weight="fill"
                        />
                    </View>
                </View>
                <Text className="font-medium text-lg mb-1" >{user?.name}</Text>
                <Text className="text-sm text-gray-600">{user?.email}</Text>
            </View>

            <View className="flex-1 mt-12 space-y-4">
                <InfoContent 
                    color="default"
                    icon={<UserIcon size={25} color={Colors.gray[200]} weight="regular" />}
                    linkText="Editar perfil"
                    linkUrl={{ pathname: "/dashboard/edit-profile", params: { id: "12345" } }}
                />
                <InfoContent
                    color="default" 
                    icon={<BellIcon size={25} color={Colors.gray[200]} weight="regular" />}
                    linkText="Notificações"
                    linkUrl={{ pathname: "/dashboard/about" }}
                />
                <InfoContent
                    color="default" 

                    icon={<InfoIcon size={25} color={Colors.gray[200]} weight="regular" />}
                    linkText="Sobre"
                    linkUrl={{ pathname: "/dashboard/about" }}
                />
                <InfoContent 
                    color="danger"
                    icon={<SignOutIcon size={25} color={Colors.gray[200]} weight="fill" />}
                    linkText="Terminar"
                    onPress={logout}
                    linkUrl={{ pathname: "/auth/signIn"}}
                />
            </View>


        </SafeAreaView>
    )
}

