import Category from "@/src/components/categories/category";
import Doctor from "@/src/components/doctors/doctor";
import { SearchComponent } from "@/src/components/search/SearchComponent";
import { specialtyIcons } from "@/src/constants/specialtyIcons";
import { DoctorsServices } from "@/src/services/doctors/DoctorsServices";
import { IDoctorsSave } from "@/src/services/doctors/types";
import { SpecialitysServices } from "@/src/services/specialitys/SpecialitysServices";
import { ISpecilitySaved } from "@/src/services/specialitys/types";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Colors } from "@/src/styles/colors";
import { Link } from "expo-router";
import { BellSimpleIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, ScrollView, StatusBar, Text, View } from "react-native";



export default function Home() {
    const [search, setSearch] = useState<string | undefined>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isRefreshing, setRefreshing] = useState<boolean>(false);
    const [doctors, setDoctors] = useState<IDoctorsSave[]>();
    const [specialities, setSpecialities] = useState<ISpecilitySaved[]>();
    const { user } = useAuthStore()

    const loading = async () => {
        try {
            setRefreshing(true)
            const [
                    listDoctors, 
                    listSpecialities
                ] = await Promise.all(
                [
                    DoctorsServices.getAll(), 
                    SpecialitysServices.getAll()
                ]
            );

            setDoctors(listDoctors);
            setSpecialities(listSpecialities)
        } catch (error: any) {
            console.log("Erro Home: ", error.response.message);
        } finally{
            setRefreshing(false)
        }
    }

    useEffect(() => {
        loading()
    }, [])



    return (
        <ScrollView 
            showsVerticalScrollIndicator={false} 
            className="flex-1 py-5 px-6 bg-slate-50"
            refreshControl={<RefreshControl 
                refreshing={isRefreshing}
                onRefresh={loading}
                tintColor={Colors.blue[300]}
                colors={[Colors.blue[300]]}
            />}
            >
            
            <StatusBar />
            <View className="flex flex-row justify-between items-center mt-5">
                <Image className="w-2/4 h-10" source={require("@/src/assets/logo.png")} />
                <BellSimpleIcon size={32} />
            </View>
            <Text className="text-3xl text-gray-600 font-medium my-8">Ola, {user?.name.split(" ")[0]} 🖐️</Text>
            <SearchComponent setSearch={setSearch} />

            <View className="mt-11 mb-5 flex flex-row justify-between items-center">
                <Text className="text-3xl font-medium">Categorias</Text>
                <Link href={"/home/listCategories"}>
                    <Text className="text-base text-gray-500 font-medium">Ver todas</Text>
                </Link>
            </View>
            
            <FlatList 
                className="max-h-36 mb-6"
                data={specialities}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item})=>(
                    <Category 
                        icon={specialtyIcons[item.name]}
                        name={item.name}
                        setSelectedOption={setSelectedOption}

                    />
                )}
            />
            <View className="mt-4 mb-5 flex flex-row justify-between items-center">
                <Text className="text-3xl font-medium">Doutores</Text>
                <Link href={"/home/listDoctors"}>
                    <Text className="text-base text-gray-500 font-medium">Ver todos</Text>
                </Link>
            </View>
            <View className="pb-10">
                <FlatList 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={doctors}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item}) => (
                        <Doctor 
                            id={item.id}
                            name={item.name}
                            photo={item.photo!}
                            speciality={item.Specialty?.name!}
                        />
                    )}
                />
            </View>

        </ScrollView>
    )
}