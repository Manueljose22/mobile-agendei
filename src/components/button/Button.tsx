import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    text: string;
    onPress: () => void;
    loading: boolean;
    disabled?: boolean;
}

export const Button = ({ onPress, text, loading, disabled = false }: ButtonProps) => {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            className={`w-full h-12 items-center justify-center rounded-lg my-4 ${isDisabled ? "bg-blue-300" : "bg-blue-500"}`}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
        >
            {loading
                ? <ActivityIndicator color="#fff" />
                : <Text className="text-white text-lg">{text}</Text>
            }
        </TouchableOpacity>
    );
};
