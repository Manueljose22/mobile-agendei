import { doctors } from '@/src/constants/data';
import { Link } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';


type doctorsProps = {
    key?: number;
    columns?: number;
    horizontal?: boolean;
}




export default function Doctors({ key, columns, horizontal }: doctorsProps) {
    return (
        <FlatList
           
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={horizontal}
            key={key}
            numColumns={columns}
            data={doctors}
            renderItem={({ item }) => (
                <Link className='me-5 p-4 bg-gray-200 rounded-2xl mb-4' 
                    href={{ pathname: "/doctor/[id]", params: { id: item.id } }}>
                    <View className='flex flex-col items-center'>
                        <Image className='w-36 h-44 rounded-2xl' resizeMode='cover' source={item.imagem} />
                        <View className="mt-2">
                            <Text className='text-base font-medium text-center'>{item.nome}</Text>
                            <Text className='text-gray-600 font-medium text-center'>{item.especialidade}</Text>
                        </View>
                    </View>
                </Link>
            )}
        />

    )
}