import UserAvatar from "@/src/components/avatar/userAvatar";
import { InfoContent } from "@/src/components/infoContent/InfoContent";
import { PatientsServices } from "@/src/services/patient/PatientServices";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Colors } from "@/src/styles/colors";
import { router, useFocusEffect } from "expo-router";
import { BellIcon, InfoIcon, SignOutIcon, UserIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const { logout, user } = useAuthStore();
    const [photo, setPhoto] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        router.replace("/auth/signIn");
    };

    useFocusEffect(
        useCallback(() => {
            let active = true;

            const loadProfilePhoto = async () => {
                try {
                    const profile = await PatientsServices.Profile();
                    if (active) {
                        setPhoto(profile.photo || null);
                    }
                } catch {
                    // Mantém a imagem padrão caso não seja possível carregar o perfil.
                }
            };

            void loadProfilePhoto();

            return () => {
                active = false;
            };
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-white p-5">
            <StatusBar barStyle="dark-content" />
            <View className="flex-row items-center mb-5">
                <Text className="text-3xl font-medium">Perfil</Text>
            </View>

            <UserAvatar
                image={photo}
                username={user?.name}
                email={user?.email}
            />

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
                <Pressable
                    onPress={handleLogout}
                    className="flex-row items-center gap-3 border-b border-gray-200 py-5"
                    accessibilityRole="button"
                    accessibilityLabel="Terminar sessão"
                >
                    <SignOutIcon size={25} color={Colors.gray[200]} weight="fill" />
                    <Text className="ms-2 text-base font-medium text-red-600">
                        Terminar
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
