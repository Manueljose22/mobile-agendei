import { Button } from "@/src/components/button/Button";
import { Header } from "@/src/components/header/header";
import { Input } from "@/src/components/input/Input";
import { Link, router } from "expo-router";
import { EnvelopeIcon, EyeClosedIcon, EyeIcon, LockIcon, UserIcon } from "phosphor-react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// const schema = 



export default function SignIn() {
    const { control, handleSubmit, register, formState: { errors } } = useForm()
    const [isFocus, setIsFocus] = useState<string | null>(null)
    const [isShowPass, setIsShowPass] = useState(false);
    const [loading, setLoading] = useState(false);



    const handleSignUp = () => {
        setLoading(true);
        try {
            
            router.replace("/(dashboard)");
        } catch (error: any) {
            console.log(`Erro ao iniciar sessão: ${error.response.message}`)
        } finally {
            setLoading(false)
        }
    }


    return (
        <SafeAreaView className="flex-1 flex-col justify-around px-6">
            <StatusBar />
            <Header />

            <View className="flex justify-between gap-5">
                <View className={`bg-gray-300 p-1 px-2 rounded-lg flex flex-row items-center ${isFocus === "nome" ? 'border-2 border-blue-400' : 'default'}`}>
                    <UserIcon color="#212121" size={25} weight="regular" />
                    <Input
                        className="w-[260px] text-base"
                        name="nome"
                        placeholder={"Ex: António Costa"}
                        onFocus={() => setIsFocus("nome")}
                        blur={() => setIsFocus(null)}
                        KeyboardType="default"
                        control={control}
                    // {...register("nome")}
                    />
                </View>
                <View className={`bg-gray-300 max-w-full p-1 px-2 rounded-lg flex flex-row items-center justify-between ${isFocus === "email" ? 'border-2 border-blue-400' : 'default'}`}>
                    <EnvelopeIcon color="#212121" size={25} weight="regular" />
                    <Input
                        className="w-[260px] text-base"
                        name="email"
                        placeholder={"exemplo@email.com"}
                        onFocus={() => setIsFocus("email")}
                        blur={() => setIsFocus(null)}
                        KeyboardType="email-address"
                        control={control}
                    // {...register("email")}
                    />
                </View>
                <View className={`bg-gray-300 max-w-full p-1 px-2 rounded-lg flex flex-row items-center justify-between ${isFocus === "senha" ? 'border-2 border-blue-400' : 'default'}`}>
                    <LockIcon color="#212121" size={25} weight="regular" />
                    <Input
                        className="w-3/4 text-base"
                        name="senha"
                        placeholder={"******"}
                        onFocus={() => setIsFocus("senha")}
                        blur={() => setIsFocus(null)}
                        secureTextEntry={isShowPass ? false : true}
                        control={control}
                        KeyboardType="default"
                        // {...register("senha")}
                    />
                    <Pressable onPress={() => setIsShowPass(!isShowPass)}>
                        {
                            isShowPass ? <EyeIcon color="#212121" size={25} weight="regular" /> :
                                <EyeClosedIcon color="#212121" size={25} weight="regular" />
                        }
                    </Pressable>
                </View>
                <View className={`bg-gray-300 max-w-full p-1 px-2 rounded-lg flex flex-row items-center justify-between ${isFocus === "confirmesenha" ? 'border-2 border-blue-400' : 'default'}`}>
                    <LockIcon color="#212121" size={25} weight="regular" />
                    <Input
                        className="w-3/4 text-base"
                        name="confirmesenha"
                        placeholder={"******"}
                        onFocus={() => setIsFocus("confirmesenha")}
                        blur={() => setIsFocus(null)}
                        secureTextEntry={isShowPass ? false : true}
                        control={control}
                        KeyboardType="default"
                        // {...register("confirmesenha")}
                    />
                    <Pressable onPress={() => setIsShowPass(!isShowPass)}>
                        {
                            isShowPass ? <EyeIcon color="#212121" size={25} weight="regular" /> :
                                <EyeClosedIcon color="#212121" size={25} weight="regular" />
                        }
                    </Pressable>
                </View>
                <Button text="Criar conta" onPress={handleSubmit(handleSignUp)} loading={loading} />
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
                <Text>Já tem conta? </Text>
                <Link href={"/auth/signIn"}>
                    <Text className="text-blue-600">
                        Acessar conta.
                    </Text>
                </Link>
            </View>



        </SafeAreaView>
    )
}