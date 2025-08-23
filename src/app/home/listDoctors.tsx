import Doctors from "@/src/components/doctors/doctors";
import { View } from "react-native";



export default function ListDoctors() {
    return (
        <View className="flex-1 bg-white py-5 px-5">
            <Doctors key={2} columns={2} />
        </View>
    );
}