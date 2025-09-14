import UserAvatar from "@/src/components/avatar/userAvatar";
import { Input } from "@/src/components/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";


const schema = z.object({
    name: z.string(),
    photo: z.any,
    phone: z.string(),
    dateBirth: z.date(),
    address: z.string(),
    gender: z.string()
})


type formData = z.infer<typeof schema>;


export default function EditProfile() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [image, setImage] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedGender, setGender] = useState();
    const { handleSubmit, register, control, formState: { errors } } = useForm<formData>({ resolver: zodResolver(schema) })

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão para acessar a galeria foi negada!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1
        })

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    }


    return (
        <SafeAreaView className="flex-1 p-5 bg-white">
            <UserAvatar
                image={image}
                onPress={pickImage}
            />

            <View className="">
                <View className="mb-5">
                    <Text className="mb-2 font-semibold">Nome</Text>
                    <View className={`px-2 rounded-lg flex flex-row items-center ${isFocus === "name" ? 'border-2 border-blue-400' : 'border-gray-400 border-2'}`}>
                        <Input
                            className="w-[260px] text-base"
                            {...register("name")}
                            onFocus={() => setIsFocus("name")}
                            blur={() => setIsFocus(null)}
                            name="name"
                            KeyboardType="email-address"
                            control={control}
                        />
                    </View>
                </View>
                <View className="mb-5">
                    <Text className="mb-2 font-semibold">Telemóvel</Text>
                    <View className={`px-2 rounded-lg flex flex-row items-center ${isFocus === "phone" ? 'border-2 border-blue-400' : 'border-gray-400 border-2'}`}>
                        <Input
                            className="w-[260px] text-base "
                            {...register("phone")}
                            onFocus={() => setIsFocus("phone")}
                            blur={() => setIsFocus(null)}
                            name="phone"
                            KeyboardType="number-pad"
                            control={control}
                        />
                    </View>
                </View>
                <View className="mb-5">
                    <Text className="mb-2 font-semibold">Data de nascimento</Text>
                    <View className={`px-2 rounded-lg flex flex-row items-center ${isFocus === "dateBirth" ? 'border-2 border-blue-400' : 'border-gray-400 border-2'}`}>
                        <Input
                            className="w-[260px] text-base "
                            {...register("dateBirth")}
                            onFocus={() => setIsFocus("dateBirth")}
                            blur={() => setIsFocus(null)}
                            name="dateBirth"
                            KeyboardType="number-pad"
                            control={control}
                        />
                    </View>
                </View>
                <View className="mb-5">
                    <Text className="mb-2 font-semibold">Gênero</Text>
                    <View className={`px-2 rounded-lg flex flex-row items-center ${isFocus === "gender" ? 'border-2 border-blue-400' : 'border-gray-400 border-2'}`}>
                        <Picker 
                            style={{height: 40}}
                            onFocus={() => setIsFocus("gender")}
                            onBlur={() => setIsFocus(null)}
                            selectedValue={selectedGender} 
                            onValueChange={(itemValue, itemIndex)=> {setGender(itemValue)}}
                        >
                            <Picker.Item label="Masculino" value={"Masculino"}/>
                            <Picker.Item label="Femenino" value={"Femenino"}/>
                        </Picker>
                    </View>
                </View>

                <View className="mb-5">
                    <Text className="mb-2 font-semibold">Endereço</Text>
                    <View className={`px-2 rounded-lg flex flex-row items-center ${isFocus === "address" ? 'border-2 border-blue-400' : 'border-gray-400 border-2'}`}>
                        <Input
                            className="w-[260px] text-base "
                            {...register("address")}
                            onFocus={() => setIsFocus("address")}
                            blur={() => setIsFocus(null)}
                            name="address"
                            KeyboardType="default"
                            control={control}
                        />
                    </View>
                </View>
            </View>



        </SafeAreaView>
    )
}