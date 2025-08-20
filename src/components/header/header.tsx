import { Image, View, } from 'react-native';



export const Header = () => {
    return (
        <View className='items-center my-4' >
            <Image className='h-12 w-45'  source={require('../../assets/logo.png')} />
        </View>
    )
}
