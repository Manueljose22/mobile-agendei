import Categories from "@/src/components/categories/categories";
import { useState } from "react";
import { View } from "react-native";



export default function ListCategories() {
    const [selectedOption, setSelectedOption] = useState<string | null>("");

    return (
        <View className="flex-1 bg-white py-5 px-5">
            <Categories  
                height="h-full"
                horizontal={false}
                key={3}
                columns={3}
                setSelectedOption={setSelectedOption} 
                selectedOption={selectedOption} 
            />
        </View>
    );
}