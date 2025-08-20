import { ActivityIndicator, Text, TouchableOpacity } from "react-native";


interface buttonProps {
    text: string;
    onPress: () => void;
    loading: boolean;
}



export const Button = ({ onPress, text, loading }: buttonProps) => {

    return (
        <TouchableOpacity className="w-full h-12 bg-blue-500 items-center justify-center rounded-lg my-4"  onPress={onPress} >
            {loading ?
                (<ActivityIndicator color={"#fff"} />) : (<Text className="text-white text-lg" >{text}</Text>)
            }
        </TouchableOpacity>
    )
}



