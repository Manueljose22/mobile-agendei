import UserAvatar from "@/src/components/avatar/userAvatar";
import { InfoContent } from "@/src/components/infoContent/InfoContent";
import { PatientsServices } from "@/src/services/patient/PatientServices";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Colors } from "@/src/styles/colors";
import { router, useFocusEffect } from "expo-router";
import {
    BellIcon,
    InfoIcon,
    KeyIcon,
    SignOutIcon,
    TrashIcon,
    UserIcon,
} from "phosphor-react-native";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StatusBar,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const { logout, user } = useAuthStore();
    const [photo, setPhoto] = useState<string | null>(null);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleLogout = () => {
        logout();
        router.replace("/auth/signIn");
    };

    const resetPasswordForm = () => {
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleChangePassword = async () => {
        if (!user?.id || isChangingPassword) return;

        if (!password || !newPassword || !confirmPassword) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert(
                "Palavra-passe inválida",
                "A nova palavra-passe deve ter pelo menos 8 caracteres."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert(
                "Confirmação inválida",
                "A nova palavra-passe e a confirmação não coincidem."
            );
            return;
        }

        setIsChangingPassword(true);
        try {
            await PatientsServices.ChangePassword(user.id, {
                password,
                newPassword,
            });

            setIsPasswordModalVisible(false);
            resetPasswordForm();
            logout();

            Alert.alert(
                "Palavra-passe alterada",
                "Por segurança, a sua sessão foi terminada. Inicie sessão com a nova palavra-passe.",
                [{ text: "Entrar", onPress: () => router.replace("/auth/signIn") }]
            );
        } catch (error: unknown) {
            Alert.alert(
                "Não foi possível alterar a palavra-passe",
                error instanceof Error
                    ? error.message
                    : "Ocorreu um erro inesperado. Tente novamente."
            );
        } finally {
            setIsChangingPassword(false);
        }
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
            <View className="mb-5 flex-row items-center">
                <Text className="text-3xl font-medium">Perfil</Text>
            </View>

            <UserAvatar
                image={photo}
                username={user?.name}
                email={user?.email}
            />

            <View className="mt-12 flex-1 space-y-4">
                <InfoContent
                    color="default"
                    icon={<UserIcon size={25} color={Colors.gray[200]} weight="regular" />}
                    linkText="Editar perfil"
                    linkUrl={{ pathname: "/profile/edit-profile", params: { id: user?.id } }}
                />
                <Pressable
                    onPress={() => setIsPasswordModalVisible(true)}
                    className="flex-row items-center gap-3 border-b border-gray-200 py-5"
                    accessibilityRole="button"
                    accessibilityLabel="Alterar palavra-passe"
                >
                    <KeyIcon size={25} color={Colors.gray[200]} weight="regular" />
                    <Text className="ms-2 text-base font-medium">Alterar palavra-passe</Text>
                </Pressable>
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
                    linkUrl={{ pathname: "/about" }}
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

            <Modal
                visible={isPasswordModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => {
                    if (!isChangingPassword) {
                        setIsPasswordModalVisible(false);
                        resetPasswordForm();
                    }
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    className="flex-1 justify-end bg-black/40"
                >
                    <View className="rounded-t-3xl bg-white px-6 pb-10 pt-7">
                        <Text className="mb-2 text-xl font-semibold">
                            Alterar palavra-passe
                        </Text>
                        <Text className="mb-6 text-sm text-gray-500">
                            Introduza a palavra-passe actual e escolha uma nova com pelo menos 8 caracteres.
                        </Text>

                        <Text className="mb-2 text-sm font-medium">Palavra-passe actual</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!isChangingPassword}
                            placeholder="Palavra-passe actual"
                            className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-base"
                        />

                        <Text className="mb-2 text-sm font-medium">Nova palavra-passe</Text>
                        <TextInput
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!isChangingPassword}
                            placeholder="Mínimo de 8 caracteres"
                            className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-base"
                        />

                        <Text className="mb-2 text-sm font-medium">Confirmar nova palavra-passe</Text>
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!isChangingPassword}
                            placeholder="Repita a nova palavra-passe"
                            className="mb-6 rounded-xl border border-gray-300 px-4 py-3 text-base"
                        />

                        <Pressable
                            onPress={() => void handleChangePassword()}
                            disabled={isChangingPassword}
                            className="mb-3 items-center rounded-xl bg-blue-600 py-4"
                        >
                            {isChangingPassword ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text className="font-semibold text-white">Guardar nova palavra-passe</Text>
                            )}
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                if (isChangingPassword) return;
                                setIsPasswordModalVisible(false);
                                resetPasswordForm();
                            }}
                            disabled={isChangingPassword}
                            className="items-center py-3"
                        >
                            <Text className="font-medium text-gray-600">Cancelar</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}
