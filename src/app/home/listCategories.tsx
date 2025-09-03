import Category from "@/src/components/categories/category";
import { specialtyIcons } from "@/src/constants/specialtyIcons";
import { SpecialitysServices } from "@/src/services/specialitys/SpecialitysServices";
import { ISpecilitySaved } from "@/src/services/specialitys/types";
import { Colors } from "@/src/styles/colors";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function ListCategories() {
    const [specialities, setSpecialities] = useState<ISpecilitySaved[]>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isRefreshing, setRefreshing] = useState<boolean>(false);



    const loading =
        async () => {
            setRefreshing(true);
            try {
                const result = await SpecialitysServices.getAll();
                setSpecialities(result);
            } catch (error: any) {
                console.log("Erro ao carregar especialidades: ", error.response.message);

            } finally {
                setRefreshing(false)
            }
        }

    useEffect(() => {
        loading()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white py-5 px-5">
            <FlatList
                refreshControl={<RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={loading}
                    tintColor={Colors.blue[300]}
                    colors={[Colors.blue[300]]}
                />}
                data={specialities}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Category
                        icon={specialtyIcons[item.name]}
                        name={item.name}
                        setSelectedOption={setSelectedOption}
                    />
                )}

            />
        </SafeAreaView>
    );
}