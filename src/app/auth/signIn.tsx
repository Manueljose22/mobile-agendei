import { Button } from "@/src/components/button/Button";
import { Header } from "@/src/components/header/header";
import { Link, router } from "expo-router";
import { EyeClosedIcon, EyeIcon, LockIcon, UserIcon } from 'phosphor-react-native';
import { useState } from "react";
import { Image, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";





export default function SignIn() {
    const [isFocus, setIsFocus] = useState<string | null>(null)
    const [isShowPass, setIsShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [passWord, setPassword] = useState("")

    const handleSignIn = () =>{
        setLoading(true);
        try {
            router.replace("/(dashboard)/home")
        } catch (error: any) {
            console.log(`Erro ao iniciar sessão: ${error.response.message}`)
        } finally{
            setLoading(false)
        }
    } 


    return (
        <SafeAreaView className="flex-1 flex-col justify-around p-6">
            <StatusBar />
            <Header />

            <View className="flex justify-between gap-5">
                <View className={`bg-gray-300 p-1 px-2 rounded-lg flex flex-row items-center ${isFocus === "email" ? 'border-2 border-blue-400' : 'default'}`}>
                    <UserIcon color="#212121" size={25} weight="regular" />
                    <TextInput
                        className="w-[260px] text-base"
                        placeholder={"exemplo@email.com"}
                        onFocus={() => setIsFocus("email")}
                        onBlur={() => setIsFocus(null)}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>
                <View className={`bg-gray-300 max-w-full p-1 px-2 rounded-lg flex flex-row items-center justify-between ${isFocus === "senha" ? 'border-2 border-blue-400' : 'default'}`}>
                    <LockIcon color="#212121" size={25} weight="regular" />
                    <TextInput
                        className=" text-base w-3/4"
                        placeholder={"******"}
                        onFocus={() => setIsFocus("senha")}
                        onBlur={() => setIsFocus(null)}
                        secureTextEntry={isShowPass ? false : true}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Pressable onPress={() => setIsShowPass(!isShowPass)}>
                        {
                            isShowPass ? <EyeIcon color="#212121" size={25} weight="regular" /> :
                                <EyeClosedIcon color="#212121" size={25} weight="regular" />
                        }
                    </Pressable>
                </View>
                <Button text="Entrar" onPress={handleSignIn} loading={loading} />
            </View>

            <View className="flex flex-col items-center gap-5">
                <View className="w-full flex flex-row items-center gap-2">
                    <View className="h-[2px] w-[114px] bg-gray-400" />
                    <Text>Ou Continuar</Text>
                    <View className="h-[2px] w-[100px] bg-gray-400" />
                </View>
                <Image className="w-12 h-12" source={require("@/src/assets/logo-google.png")} />
            </View>



            <View className="flex flex-row justify-center ">
                <Text>Não tem conta? </Text>
                 <Link href={"/auth/signUp"}>
                    <Text className="text-blue-600">
                         Criar conta.
                    </Text>
                </Link>
            </View>



        </SafeAreaView>
    )
}