import { categories } from "@/src/constants/data";
import { Colors } from "@/src/styles/colors";
import { Dispatch, SetStateAction } from "react";
import { FlatList, Pressable, Text, View } from "react-native";



type categoriesProps = {
    setSelectedOption: Dispatch<SetStateAction<string | null>>
    selectedOption: string | null;
    key?: number;
    columns?: number;
    horizontal?: boolean;
    height?: string;
}


export default function Categories({key,columns, selectedOption, setSelectedOption,horizontal, height }: categoriesProps) {
    return (
        <FlatList
            className={`${height ? height : "max-h-36 mb-6"} `}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={horizontal}
            key={key}
            numColumns={columns}
            keyExtractor={(item) => item.id.toString()}
            data={categories}
            renderItem={({ item }) => (
                <Pressable onPress={() => setSelectedOption(item.name)} >
                    <View style={{ elevation: 5 }} className="h-36 w-28 mb-4 flex flex-col justify-center items-center bg-gray-200 me-3 rounded-lg  py-4  shadow-md shadow-slate-500">
                        <View className="mb-4 bg-white p-4 rounded-full">
                            {<item.icon size={32} color={selectedOption === item.name ? Colors.blue[300] : Colors.gray[300]} weight="fill" />}
                        </View>
                        <Text className="text-gray-700 font-medium text-sm">{item.name}</Text>
                    </View>
                </Pressable>
            )}
        />
    )
}