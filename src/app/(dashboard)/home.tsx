import Categories from "@/src/components/categories/categories";
import Doctors from "@/src/components/doctors/doctors";
import { SearchComponent } from "@/src/components/search/SearchComponent";
import { Link } from "expo-router";
import { BellSimpleIcon } from "phosphor-react-native";
import { useState } from "react";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";



export default function Home() {
    const [search, setSearch] = useState<string | undefined>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);


    return (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 py-5 px-6 bg-slate-50">
            <StatusBar />
            <View className="flex flex-row justify-between items-center mt-5">
                <Image className="w-2/4 h-10" source={require("@/src/assets/logo.png")} />
                <BellSimpleIcon size={32} />
            </View>
            <Text className="text-3xl text-gray-600 font-medium my-8">{"Olá, Leonel!"} 🖐️</Text>
            <SearchComponent setSearch={setSearch} />

            <View className="mt-11 mb-5 flex flex-row justify-between items-center">
                <Text className="text-3xl font-medium">Categorias</Text>
                <Link href={"/home/listCategories"}>
                    <Text className="text-base text-gray-500 font-medium">Ver todas</Text>
                </Link>
            </View>

            <Categories horizontal={true} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />

            <View className="mt-4 mb-5 flex flex-row justify-between items-center">
                <Text className="text-3xl font-medium">Doutores</Text>
                <Link href={"/home/listDoctors"}>
                    <Text className="text-base text-gray-500 font-medium">Ver todos</Text>
                </Link>
            </View>
            <View className="pb-10">
                <Doctors horizontal={true} />
            </View>

        </ScrollView>
    )
}