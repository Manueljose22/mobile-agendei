import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';


interface InfoContentProps {
    icon: React.ReactNode;
    linkText: string;
    color: string;
    linkUrl: {
        pathname: any;
        params?: Record<string, any>;
    }
}



export const InfoContent = ({ icon, linkText, linkUrl, color }: InfoContentProps) => {
    return (
        <View className='border-b border-gray-200' >
            <Link href={linkUrl}>
                <View className='flex flex-row items-center py-5 gap-3'>
                    {icon}
                    <Text className={`${color === 'default' ? "text-base ms-2 font-medium" : "text-base ms-2 font-medium text-red-600" }`} >
                        {linkText}
                    </Text>
                </View>
            </Link>
        </View>
    )
}



