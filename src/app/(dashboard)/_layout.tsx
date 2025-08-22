import { Tabs } from "expo-router";
import { BookBookmarkIcon, HouseIcon, UserIcon } from "phosphor-react-native";



export default function RootLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name="home" options={{tabBarIcon: ({color})=>(
            <HouseIcon weight="fill" color={color} />
        ), tabBarLabel: "Início"}}/>

        <Tabs.Screen name="bookings" options={{tabBarIcon: ({color})=>(
            <BookBookmarkIcon weight="fill" color={color} />
        ), tabBarLabel: "Agendamentos"}}/>

        <Tabs.Screen name="profile" options={{tabBarIcon: ({color})=>(
            <UserIcon weight="fill" color={color} />
        ), tabBarLabel: "Perfil"}}/>
    </Tabs>
  );
}
