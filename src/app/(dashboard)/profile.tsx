import { Link } from "expo-router";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";





export default function Profile (){
    return(
        <SafeAreaView className="flex-1 bg-white p-6 flex flex-col justify-center items-center">
            <StatusBar />
                <Link href="/auth/signIn" className="text-blue-500">
                    sair    
                </Link>
            <Text>Perfil</Text>
        </SafeAreaView>
    )
}