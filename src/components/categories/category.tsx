import { Dispatch, ReactNode, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";



type categoriesProps = {
    setSelectedOption: Dispatch<SetStateAction<string | null>>
    name: string;
    icon: ReactNode
}


export default function Category({ name, icon, setSelectedOption }: categoriesProps) {
    return (
        <Pressable onPress={() => setSelectedOption(name)} >
            <View style={{ elevation: 5 }} className="h-36 w-28 mb-4 flex flex-col justify-center items-center bg-gray-200 me-3 rounded-lg  py-4  shadow-md shadow-slate-500">
                <View className="mb-4 bg-white p-4 rounded-full">
                    {icon}
                </View>
                <Text className="text-gray-700 font-medium text-sm">{name}</Text>
            </View>
        </Pressable>
    )
}