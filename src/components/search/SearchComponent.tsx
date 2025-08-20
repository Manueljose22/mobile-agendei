import { Colors } from "@/src/styles/colors";
import { MagnifyingGlassIcon, SlidersHorizontalIcon } from "phosphor-react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { TextInput, View } from "react-native";



interface searchProps {
    setSearch: Dispatch<SetStateAction<string | undefined>>
    search?: string;
}



export const SearchComponent = ({ setSearch, search, }: searchProps) => {
    const [isFocused, setIsFacused] = useState<boolean>(false);


    return (
        <View className={`flex flex-row items-center justify-between bg-gray-300 py-1 px-2 rounded-lg ${isFocused ? 'border-2 border-blue-400' : 'default'}`}>
            <MagnifyingGlassIcon size={28} weight='regular' color={Colors.gray[300]} />
            <TextInput
                className="w-3/4"
                placeholder='O que você está procurando?'
                onChangeText={(text) => setSearch(text)}
                value={search}
                onFocus={() => (setIsFacused(true))}
                onBlur={() => (setIsFacused(false))}

            />
            <SlidersHorizontalIcon size={28} weight='duotone' color={Colors.blue[300]} />
        </View>
    )
}


