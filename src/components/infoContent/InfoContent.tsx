import React from "react";
import { Pressable, Text, View } from "react-native";
import { Href, router } from "expo-router";

interface InfoContentProps {
    icon: React.ReactNode;
    linkText: string;
    color: string;
    linkUrl: Href;
    onPress?: () => void;
}

export const InfoContent = ({
    icon,
    linkText,
    linkUrl,
    color,
    onPress,
}: InfoContentProps) => {
    const handlePress = () => {
        if (onPress) {
            onPress();
            return;
        }

        router.push(linkUrl);
    };

    return (
        <Pressable
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={linkText}
            className="border-b border-gray-200"
        >
            <View className="flex-row items-center gap-3 py-5">
                {icon}
                <Text
                    className={color === "default"
                        ? "ms-2 text-base font-medium"
                        : "ms-2 text-base font-medium text-red-600"}
                >
                    {linkText}
                </Text>
            </View>
        </Pressable>
    );
};
