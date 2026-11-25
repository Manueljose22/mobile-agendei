import UserAvatar from "@/src/components/avatar/userAvatar";
import { InfoContent } from "@/src/components/infoContent/InfoContent";
import { PatientsServices } from "@/src/services/patient/PatientServices";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Colors } from "@/src/styles/colors";
import { router, useFocusEffect } from "expo-router";
import { BellIcon, InfoIcon, SignOutIcon, TrashIcon, UserIcon } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Alert, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const { logout, user } = useAuthStore();
    const [photo, setPhoto] = useState<string | null>(null);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    const handleLogout = () => {
        logout();
        router.replace("/auth/signIn");
    };

    const confirmDeleteAccount = async () => {
        if (!user?.id || isDeletingAccount) return;

        setIsDeletingAccount(true);
        try {
            await PatientsServices.DeleteAccount(user.id);
            logout();
            router.replace("/auth/signIn");
        } catch (error: unknown) {
            Alert.alert(
                "Não foi possível eliminar a conta",
                error instanceof Error
                    ? error.message
                    : "Ocorreu um erro inesperado. Tente novamente."
            );
        } finally {
            setIsDeletingAccount(false);
        }
    };

    const handleDeleteAccount = () => {
        if (!user?.id || isDeletingAccount) return;

        Alert.alert(
            "Eliminar conta",
            "Esta operação é irreversível. Os seus dados pessoais serão anonimizados e deixará de poder aceder à conta. O histórico de consultas será preservado. Deseja continuar?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar conta",
                    style: "destructive",
                    onPress: () => void confirmDeleteAccount(),
                },
            ]
        );
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
                <Pressable
                    onPress={handleDeleteAccount}
                    disabled={isDeletingAccount}
                    className="flex-row items-center gap-3 border-b border-gray-200 py-5"
                    accessibilityRole="button"
                    accessibilityLabel="Eliminar conta"
                    accessibilityState={{ disabled: isDeletingAccount }}
                >
                    <TrashIcon size={25} color={Colors.red[200]} weight="regular" />
                    <Text className="ms-2 text-base font-medium text-red-700">
                        {isDeletingAccount ? "A eliminar conta..." : "Eliminar conta"}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
