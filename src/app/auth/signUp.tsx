import { Button } from "@/src/components/button/Button";
import { Header } from "@/src/components/header/header";
import { Input } from "@/src/components/input/Input";
import { PatientsServices } from "@/src/services/patient/PatientServices";
import { IRequestPayload } from "@/src/services/sessions/types";
import { useAuthStore } from "@/src/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { EnvelopeIcon, EyeClosedIcon, EyeIcon, LockIcon, UserIcon } from "phosphor-react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Introduza o seu nome."),
  email: z.string().trim().email("Introduza um endereço de e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  confirmpassword: z.string().min(6, "Confirme a sua senha."),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const { control, handleSubmit, register, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) });
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [isShowPass, setIsShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleSignUp = async (data: FormData) => {
    if (data.password !== data.confirmpassword) {
      Alert.alert("Atenção", "As senhas são diferentes!");
      return;
    }

    setLoading(true);
    try {
      const payload: IRequestPayload = {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      };
      const result = await PatientsServices.Register(payload);
      setUser(result);
      router.replace("/(dashboard)/home");
    } catch (error: unknown) {
      Alert.alert(
        "Não foi possível criar a conta",
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 flex-col justify-around px-6">
      <StatusBar />
      <Header />

      <View className="flex justify-between gap-5">
        <View className={`bg-gray-300 p-1 px-2 rounded-lg flex flex-row items-center ${isFocus === "name" ? "border-2 border-blue-400" : "default"}`}>
          <UserIcon color="#212121" size={25} weight="regular" />
          <Input className="w-[260px] text-base" {...register("name")} name="name"
            placeholder="Ex: António Costa" onFocus={() => setIsFocus("name")}
            blur={() => setIsFocus(null)} KeyboardType="default" control={control} />
        </View>
        {errors.name && <Text className="text-small text-red-400">{errors.name.message}</Text>}

        <View className={`bg-gray-300 max-w-full p-1 px-2 rounded-lg flex flex-row items-center justify-between ${isFocus === "email" ? "border-2 border-blue-400" : "default"}`}>
          <EnvelopeIcon color="#212121" size={25} weight="regular" />
          <Input className="w-[260px] text-base" {...register("email")} name="email"
            placeholder="exemplo@email.com" onFocus={() => setIsFocus("email")}
            blur={() => setIsFocus(null)} KeyboardType="email-address" control={control} />
        </View>
        {errors.email && <Text className="text-small text-red-400">{errors.email.message}</Text>}

        <View className={`bg-gray-300 max-w-full p-1 px-2 rounded-lg flex flex-row items-center justify-between ${isFocus === "password" ? "border-2 border-blue-400" : "default"}`}>
          <LockIcon color="#212121" size={25} weight="regular" />
          <Input className="w-3/4 text-base" placeholder="******"
            onFocus={() => setIsFocus("password")} blur={() => setIsFocus(null)}
            secureTextEntry={!isShowPass} control={control} KeyboardType="default"
            {...register("password")} name="password" />
          <Pressable onPress={() => setIsShowPass(!isShowPass)}>
            {isShowPass ? <EyeIcon color="#212121" size={25} weight="regular" />
              : <EyeClosedIcon color="#212121" size={25} weight="regular" />}
          </Pressable>
        </View>
        {errors.password && <Text className="text-small text-red-400">{errors.password.message}</Text>}

        <View className={`bg-gray-300 max-w-full p-1 px-2 rounded-lg flex flex-row items-center justify-between ${isFocus === "confirmpassword" ? "border-2 border-blue-400" : "default"}`}>
          <LockIcon color="#212121" size={25} weight="regular" />
          <Input className="w-3/4 text-base" {...register("confirmpassword")}
            name="confirmpassword" placeholder="******"
            onFocus={() => setIsFocus("confirmpassword")} blur={() => setIsFocus(null)}
            secureTextEntry={!isShowPass} control={control} KeyboardType="default" />
          <Pressable onPress={() => setIsShowPass(!isShowPass)}>
            {isShowPass ? <EyeIcon color="#212121" size={25} weight="regular" />
              : <EyeClosedIcon color="#212121" size={25} weight="regular" />}
          </Pressable>
        </View>
        {errors.confirmpassword && <Text className="text-small text-red-400">{errors.confirmpassword.message}</Text>}

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

      <View className="flex flex-row justify-center">
        <Text>Já tem conta? </Text>
        <Link href="/auth/signIn">
          <Text className="text-blue-600">Acessar conta.</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
