import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';


type doctorProps = {
    id: string;
    photo: string;
    name: string;
    speciality: string
}




export default function Doctor({ id, name, photo, speciality }: doctorProps) {
    return (

        <Link className='me-5 p-4 bg-gray-200 rounded-2xl mb-4'
            href={{ pathname: "/doctor/[id]", params: { id:id } }}>
            <View className='flex flex-col items-center'>
                <Image className='w-36 h-44 rounded-2xl' resizeMode='cover' source={{uri: photo ?? "https://cdn-icons-png.flaticon.com/512/6210/6210017.png" }} />
                <View className="mt-2">
                    <Text className='text-base font-medium text-center'>{name}</Text>
                    <Text className='text-gray-600 font-medium text-center'>{speciality}</Text>
                </View>
            </View>
        </Link>

    )
}