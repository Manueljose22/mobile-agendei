import { Link } from "expo-router";
import { Text, View } from "react-native";


interface buttonProps {
    textButton: string;
    onPress?: () => void;
    url?: {pathname: any, id: string};
}



export const ButtonDefault = ({ onPress, textButton, url }: buttonProps) => {

    return (
        <View className="w-full h-12 bg-blue-500 rounded-full my-4 justify-center items-center">
        <Link href={{pathname: url?.pathname, params:{id: url?.id}}} 
        >
           <Text className="text-white text-lg font-medium ">
            {textButton}
            </Text>
        </Link>
        </View>
    )
}


