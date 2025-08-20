import { colors } from "@/src/constants/colorsTheme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


interface buttonProps {
    textButton: string;
    onPress: () => void;
}



export const ButtonDefault = ({ onPress, textButton }: buttonProps) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
           <Text style={styles.text}>
            {textButton}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.green,
        borderRadius: 30,
        height: 45,
        justifyContent: 'center'

    },
    text: {
        textAlign: 'center',
        color: "#fff",
        fontSize: 16,
        fontWeight: 500
    }
})
