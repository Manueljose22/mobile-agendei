import { ButtonDefault } from "@/src/components/button/ButtonDefault";
import { doctors } from "@/src/constants/data";
import { Colors } from "@/src/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { BagIcon, MapPinIcon, SealCheckIcon, StarIcon, UsersIcon } from "phosphor-react-native";
import { Image, ScrollView, Text, View } from "react-native";



export default function DoctorServices() {
  const { id } = useLocalSearchParams<{id: string}>();

  const doctor = doctors.find(doc => doc.id === Number(id));

  return (
    <ScrollView className="flex-1 bg-white py-5 px-6" showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center gap-5 mb-6 py-2">
        <View>
          <Image className="w-24 h-24 rounded-full border-2 border-white" resizeMode="cover" source={doctor?.imagem} />
          <View className="w-5 h-5  absolute -bottom-0 right-3 rounded-full justify-center items-center">
            <SealCheckIcon size={17} color={Colors.blue[300]} weight="fill" />
          </View>
        </View>
        <View>
          <Text className="text-2xl font-medium">{doctor?.nome}</Text>
          <Text className="text-base text-gray-600 font-medium">{doctor?.especialidade}</Text>
          <Text className="text-sm text-gray-500 font-medium">{doctor?.location}<MapPinIcon color={Colors.blue[300]} size={15} weight="fill" /> </Text>
        </View>
      </View>
      <View className="w-full h-[1px] bg-gray-300" />

      <View className="py-5 my-5">

        <View className="flex-row justify-between mb-5">
          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-full mb-1">
              <BagIcon weight="fill" color={Colors.blue[300]} size={25} />
            </View>
            <Text className="text-lg text-blue-500 font-medium">{doctor?.yaersOfExperience}</Text>
            <Text className="text-gray-600 text-sm">Anos de Experiência</Text>
          </View>
          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-full mb-1">
              <UsersIcon weight="fill" color={Colors.blue[300]} size={25} />
            </View>
            <Text className="text-lg text-blue-500 font-medium">+{doctor?.numberOfPatients}</Text>
            <Text className="text-gray-600 text-sm">Pacientes</Text>
          </View>
          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-full mb-1">
              <StarIcon weight="fill" color={Colors.blue[300]} size={25} />
            </View>
            <Text className="text-lg text-blue-500 font-medium">+{doctor?.rating}</Text>
            <Text className="text-gray-600 text-sm">Avaliações</Text>
          </View>
        </View>

        <View>
          <Text className="text-lg font-medium mb-2">Sobre</Text>
          <Text className="text-gray-600 text-base leading-relaxed">{doctor?.about}</Text>
        </View>

        <View className="mt-5">
          <Text className="text-lg font-medium mb-2">Horário de Trabalho</Text>
          <View className="w-full h-[1px] bg-gray-300 my-2" />
          {doctor?.workingHours.map((item, index) => (
            <View key={index} className="flex-row justify-between mb-1">
              <Text className="text-gray-600 text-base">{item.day}</Text>
              <Text className="text-gray-600 text-base">{item.hours}</Text>
            </View>
          ))}
        </View>
        <View className="w-full h-[1px] bg-gray-300 my-2" />

        <ButtonDefault textButton="Agendar consulta" url={{pathname: "/services/[id]", id: id}} />

      </View>



    </ScrollView>
  )
}