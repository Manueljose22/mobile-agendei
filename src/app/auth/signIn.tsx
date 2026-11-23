import { Button } from "@/src/components/button/Button";
import { Header } from "@/src/components/header/header";
import { Input } from "@/src/components/input/Input";
import { SessionServices } from "@/src/services/sessions/SessionsServices";
import { useAuthStore } from "@/src/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { EyeClosedIcon, EyeIcon, LockIcon, UserIcon } from "phosphor-react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Introduza um endereço de e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const { control, handleSubmit, register, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) });
  const { setUser } = useAuthStore();
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [isShowPass, setIsShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await SessionServices.login(data);
      setUser(result);
      router.replace("/(dashboard)/home");
    } catch (error: unknown) {
      Alert.alert(
        "Não foi possível entrar",
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 flex-col justify-around p-6">
      <StatusBar />
      <Header />

      <View className="flex justify-between gap-5">
        <View className={`bg-gray-300 p-1 px-2 rounded-lg flex flex-row items-center ${isFocus === "email" ? "border-2 border-blue-400" : "default"}`}>
          <UserIcon color="#212121" size={25} weight="regular" />
          <Input
            className="w-[260px] text-base"
            {...register("email")}
            placeholder="exemplo@email.com"
            onFocus={() => setIsFocus("email")}
            blur={() => setIsFocus(null)}
            name="email"
            KeyboardType="email-address"
            control={control}
          />
        </View>
        {errors.email && <Text className="text-small text-red-400">{errors.email.message}</Text>}

        <View className={`bg-gray-300 max-w-full p-1 px-2 rounded-lg flex flex-row items-center justify-between ${isFocus === "password" ? "border-2 border-blue-400" : "default"}`}>
          <LockIcon color="#212121" size={25} weight="regular" />
          <Input
            className="text-base w-3/4"
            {...register("password")}
            name="password"
            placeholder="******"
            onFocus={() => setIsFocus("password")}
            blur={() => setIsFocus(null)}
            secureTextEntry={!isShowPass}
            control={control}
            KeyboardType="default"
          />
          <Pressable onPress={() => setIsShowPass(!isShowPass)}>
            {isShowPass
              ? <EyeIcon color="#212121" size={25} weight="regular" />
              : <EyeClosedIcon color="#212121" size={25} weight="regular" />}
          </Pressable>
        </View>
        {errors.password && <Text className="text-small text-red-400">{errors.password.message}</Text>}

        <Button text="Entrar" onPress={handleSubmit(handleSignIn)} loading={loading} />
      </View>

      <View className="flex flex-col items-center gap-5">
        <View className="w-full flex flex-row items-center gap-2">
          <View className="h-[2px] w-[114px] bg-gray-400" />
          <Text>Ou Continuar</Text>
          <View className="h-[2px] w-[100px] bg-gray-400" />
        </View>
        <Image className="w-12 h-12" source={require("@/src/assets/logo-google.png")} />
      </View>

      <View className="flex flex-row justify-center">
        <Text>Não tem conta? </Text>
        <Link href="/auth/signUp">
          <Text className="text-blue-600">Criar conta.</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
