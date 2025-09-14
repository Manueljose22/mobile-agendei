import UserAvatar from "@/src/components/avatar/userAvatar";
import { InfoContent } from "@/src/components/infoContent/InfoContent";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Colors } from "@/src/styles/colors";

import { BellIcon, InfoIcon, SignOutIcon, UserIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Profile() {
    const {logout, user} = useAuthStore();

    return (
        <SafeAreaView className="flex-1 bg-white p-5" >
            <View className="flex-row items-center mb-5">
                <Text className="text-3xl font-medium">Perfil</Text>
            </View>

            <UserAvatar username={user?.name} email={user?.email} />

            <View className="flex-1 mt-12 space-y-4">
                <InfoContent 
                    color="default"
                    icon={<UserIcon size={25} color={Colors.gray[200]} weight="regular" />}
                    linkText="Editar perfil"
                    linkUrl={{ pathname: "/profile/edit-profile", params: { id: user?.id } }}
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

