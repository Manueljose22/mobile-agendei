import { CalendarCheckIcon, HeartbeatIcon, HospitalIcon, MagnifyingGlassIcon, ShieldCheckIcon } from "phosphor-react-native";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

const features = [
    {
        icon: MagnifyingGlassIcon,
        title: "Encontre cuidados de saúde",
        description: "Explore hospitais, médicos e especialidades disponíveis na plataforma.",
    },
    {
        icon: CalendarCheckIcon,
        title: "Marque as suas consultas",
        description: "Consulte os horários disponíveis e faça os seus agendamentos.",
    },
    {
        icon: HeartbeatIcon,
        title: "Acompanhe os agendamentos",
        description: "Consulte o estado das consultas, receba notificações e faça a gestão das marcações.",
    },
];

export default function AboutScreen() {
    const appVersion = Constants.expoConfig?.version ?? "1.0.0";

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 20, paddingBottom: 36 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="items-center rounded-3xl bg-white px-6 py-8">
                    <View className="mb-4 h-20 w-20 items-center justify-center rounded-2xl bg-blue-600">
                        <Text className="text-3xl font-bold text-white">A+</Text>
                    </View>
                    <Text className="text-2xl font-bold text-gray-900">Agendei</Text>
                    <Text className="mt-1 text-sm font-medium text-blue-600">
                        Saúde mais perto de si
                    </Text>
                    <Text className="mt-4 text-center text-sm leading-6 text-gray-600">
                        O Agendei é uma plataforma que aproxima pacientes, médicos e hospitais,
                        tornando mais simples a procura por serviços de saúde e a marcação de consultas.
                    </Text>
                    <View className="mt-5 rounded-full bg-blue-50 px-4 py-2">
                        <Text className="text-xs font-semibold text-blue-700">
                            Versão {appVersion}
                        </Text>
                    </View>
                </View>

                <View className="mb-3 mt-8 flex-row items-center gap-2">
                    <HospitalIcon size={22} color="#0D6EFD" weight="duotone" />
                    <Text className="text-lg font-bold text-gray-900">O que pode fazer</Text>
                </View>

                <View className="gap-3">
                    {features.map(({ icon: Icon, title, description }) => (
                        <View
                            key={title}
                            className="flex-row items-start rounded-2xl border border-gray-100 bg-white p-4"
                        >
                            <View className="mr-4 h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                                <Icon size={23} color="#0D6EFD" weight="duotone" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-base font-semibold text-gray-900">{title}</Text>
                                <Text className="mt-1 text-sm leading-5 text-gray-500">
                                    {description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View className="mt-8 rounded-2xl bg-blue-50 p-5">
                    <View className="mb-2 flex-row items-center gap-2">
                        <ShieldCheckIcon size={22} color="#0D6EFD" weight="duotone" />
                        <Text className="text-base font-bold text-gray-900">
                            Simplicidade e organização
                        </Text>
                    </View>
                    <Text className="text-sm leading-6 text-gray-600">
                        Queremos ajudar a tornar a gestão das consultas mais simples e organizada,
                        reunindo num só lugar informações sobre hospitais, médicos e marcações.
                    </Text>
                </View>

                <Text className="mt-8 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Agendei. Todos os direitos reservados.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
