import Categories from "@/src/components/categories/categories";
import { SearchComponent } from "@/src/components/search/SearchComponent";
import { Link } from "expo-router";
import { BellSimpleIcon } from "phosphor-react-native";
import { useState } from "react";
import { Alert, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Home() {
    const [search, setSearch] = useState<string | undefined>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    Alert.alert(`Selecionou ${selectedOption}`)

    return (
        <SafeAreaView className="flex-1 p-6">
            <StatusBar />
            <View className="flex flex-row justify-between items-center">
                <Image className="w-2/4 h-10" source={require("@/src/assets/logo.png")} />
                <BellSimpleIcon size={32} />
            </View>
            <Text className="text-3xl text-gray-600 font-medium my-8">{"Olá, Leonel!"} 🖐️</Text>
            <SearchComponent setSearch={setSearch} />

            <View className="mt-11 mb-5 flex flex-row justify-between items-center">
                <Text className="text-3xl font-medium">Categorias</Text>
                <Link href={"/(dashboard)"}>
                    <Text className="text-base text-gray-500 font-medium">Ver todas</Text>
                </Link>
            </View>

            <Categories setSelectedOption={setSelectedOption} selectedOption={selectedOption} /> 
        </SafeAreaView>
    )
}