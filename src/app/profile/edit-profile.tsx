import UserAvatar from "@/src/components/avatar/userAvatar";
import { Input } from "@/src/components/input/Input";
import { PatientsServices } from "@/src/services/patient/PatientServices";
import { useAuthStore } from "@/src/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Informe o seu nome."),
  phone: z.string(),
  dateBirth: z.string(),
  address: z.string(),
  gender: z.string(),
});

type FormData = z.infer<typeof schema>;

const formatDate = (value?: string | Date | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [image, setImage] = useState<string | null>(null);
  const [selectedGender, setGender] = useState("");
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { register, control, reset, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      dateBirth: "",
      address: "",
      gender: "",
    },
  });

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const profile = await PatientsServices.Profile();
        if (!active) return;

        reset({
          name: profile.name ?? "",
          phone: profile.phone ?? "",
          dateBirth: formatDate(profile.dateBirth),
          address: profile.address ?? "",
          gender: profile.gender ?? "",
        });
        setGender(profile.gender ?? "");
        setImage(profile.photo || null);
      } catch (error) {
        if (active) {
          Alert.alert(
            "Não foi possível carregar o perfil",
            error instanceof Error ? error.message : "Tente novamente."
          );
        }
      } finally {
        if (active) setIsLoadingProfile(false);
      }
    };

    void loadProfile();
    return () => {
      active = false;
    };
  }, [reset]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Autorize o acesso à galeria para escolher uma fotografia.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (values: FormData) => {
    if (!user?.id) {
      Alert.alert("Sessão inválida", "Inicie sessão novamente para actualizar o perfil.");
      return;
    }

    setIsSaving(true);
    try {
      const profileData = {
        name: values.name.trim(),
        phone: values.phone.trim(),
        dateBirth: values.dateBirth.trim(),
        address: values.address.trim(),
        gender: values.gender,
      };

      const hasNewPhoto = Boolean(image && !image.startsWith("http"));

      if (hasNewPhoto && image) {
        const payload = new FormData();
        Object.entries(profileData).forEach(([key, value]) => {
          payload.append(key, value);
        });

        const filename = image.split("/").pop() || "profile.jpg";
        const extension = filename.split(".").pop()?.toLowerCase();
        const type = extension === "png"
          ? "image/png"
          : extension === "webp"
            ? "image/webp"
            : "image/jpeg";

        payload.append(
          "photo",
          { uri: image, name: filename, type } as unknown as Blob
        );

        await PatientsServices.updateProfile(user.id, payload);
      } else {
        await PatientsServices.updateProfile(user.id, profileData);
      }
      setUser({ ...user, name: values.name.trim() });
      Alert.alert("Perfil actualizado", "Os seus dados foram guardados com sucesso.");
    } catch (error) {
      Alert.alert(
        "Erro ao actualizar",
        error instanceof Error ? error.message : "Não foi possível guardar as alterações."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" keyboardShouldPersistTaps="handled">
        <Text className="mb-5 text-2xl font-semibold">Editar perfil</Text>

        <UserAvatar
          image={image}
          username={user?.name}
          email={user?.email}
          onPress={pickImage}
        />

        {isLoadingProfile ? (
          <View className="py-10 items-center">
            <ActivityIndicator size="large" />
            <Text className="mt-3 text-gray-500">A carregar os seus dados...</Text>
          </View>
        ) : (
          <View className="mt-8">
            <View className="mb-5">
              <Text className="mb-2 font-semibold">Nome</Text>
              <View className={`rounded-lg border-2 px-2 ${isFocus === "name" ? "border-blue-400" : "border-gray-300"}`}>
                <Input className="w-full text-base" {...register("name")} name="name" KeyboardType="default" control={control} onFocus={() => setIsFocus("name")} blur={() => setIsFocus(null)} />
              </View>
            </View>

            <View className="mb-5">
              <Text className="mb-2 font-semibold">Telemóvel</Text>
              <View className={`rounded-lg border-2 px-2 ${isFocus === "phone" ? "border-blue-400" : "border-gray-300"}`}>
                <Input className="w-full text-base" {...register("phone")} name="phone" KeyboardType="phone-pad" control={control} onFocus={() => setIsFocus("phone")} blur={() => setIsFocus(null)} />
              </View>
            </View>

            <View className="mb-5">
              <Text className="mb-2 font-semibold">Data de nascimento</Text>
              <View className={`rounded-lg border-2 px-2 ${isFocus === "dateBirth" ? "border-blue-400" : "border-gray-300"}`}>
                <Input className="w-full text-base" {...register("dateBirth")} name="dateBirth" placeholder="AAAA-MM-DD" KeyboardType="numbers-and-punctuation" control={control} onFocus={() => setIsFocus("dateBirth")} blur={() => setIsFocus(null)} />
              </View>
              <Text className="mt-1 text-xs text-gray-500">Formato: AAAA-MM-DD</Text>
            </View>

            <View className="mb-5">
              <Text className="mb-2 font-semibold">Género</Text>
              <View className="rounded-lg border-2 border-gray-300 px-2">
                <Picker
                  selectedValue={selectedGender}
                  onValueChange={(value) => {
                    setGender(value);
                    setValue("gender", value, { shouldDirty: true });
                  }}
                >
                  <Picker.Item label="Seleccionar" value="" />
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Feminino" value="Feminino" />
                </Picker>
              </View>
            </View>

            <View className="mb-7">
              <Text className="mb-2 font-semibold">Endereço</Text>
              <View className={`rounded-lg border-2 px-2 ${isFocus === "address" ? "border-blue-400" : "border-gray-300"}`}>
                <Input className="w-full text-base" {...register("address")} name="address" KeyboardType="default" control={control} onFocus={() => setIsFocus("address")} blur={() => setIsFocus(null)} />
              </View>
            </View>

            <Pressable
              disabled={isSaving}
              onPress={() => { void handleSubmit(onSubmit)(); }}
              className={`mb-8 items-center rounded-lg py-4 ${isSaving ? "bg-blue-300" : "bg-blue-600"}`}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="font-semibold text-white">Guardar alterações</Text>
              )}
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
