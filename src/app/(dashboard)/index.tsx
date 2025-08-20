import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Home() {
    return(
        <SafeAreaView className="flex-1 p-6">
            <StatusBar />
            <Text>Home</Text>
        </SafeAreaView>
    )
}