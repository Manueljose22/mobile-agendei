import { categories } from "@/src/constants/data";
import { Colors } from "@/src/styles/colors";
import { Dispatch, SetStateAction } from "react";
import { FlatList, Pressable, Text, View } from "react-native";



type categoriesProps = {
    setSelectedOption: Dispatch<SetStateAction<string | null>>
    selectedOption: string | null;
}


export default function Categories({ selectedOption, setSelectedOption }: categoriesProps) {
    return (
        <FlatList
            className="max-h-36  mb-6"
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            data={categories}
            renderItem={({ item }) => (
                <Pressable onPress={() => setSelectedOption(item.name)} >
                    <View style={{ elevation: 5 }} className="flex flex-col justify-center items-center bg-gray-200 me-5 rounded-lg h-36 w-36 py-4 px-2 shadow-md shadow-slate-500">
                        <View className="mb-4 bg-white p-4 rounded-full">
                            {<item.icon size={32} color={selectedOption === item.name ? Colors.blue[300] : Colors.gray[300]} weight="fill" />}
                        </View>
                        <Text className="text-gray-700 font-medium">{item.name}</Text>
                    </View>
                </Pressable>
            )}
        />
    )
}