import Doctors from "@/src/components/doctors/doctors";
import { StatusBar, View } from "react-native";



export default function ListDoctors() {
    return (
        <View className="flex-1 bg-white py-5 px-5">
            <StatusBar barStyle="dark-content" />
            <Doctors key={2} columns={2} />
        </View>
    );
}