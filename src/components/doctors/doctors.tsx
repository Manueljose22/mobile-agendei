import { doctors } from '@/src/constants/data'
import { Link } from 'expo-router'
import { FlatList, Image, Text, View } from 'react-native'






export default function Doctors() {
    return (
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={doctors}
            renderItem={({ item }) => (
                <Link className='me-5 p-4 bg-gray-200 rounded-2xl' 
                    href={{ pathname: "/doctor/[id]", params: { id: item.id } }}>
                    <View className='flex flex-col items-center'>
                        <Image className='w-36 h-44 rounded-2xl' resizeMode='cover' source={item.imagem} />
                        <View className="mt-2">
                            <Text className='text-lg font-medium text-center'>{item.nome}</Text>
                            <Text className='text-gray-600 font-medium text-center'>{item.especialidade}</Text>
                        </View>
                    </View>
                </Link>
            )}
        />

    )
}