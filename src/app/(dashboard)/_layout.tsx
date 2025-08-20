import { Tabs } from "expo-router";
import { HouseIcon } from "phosphor-react-native";



export default function RootLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name="index" options={{tabBarIcon: ({color})=>(
            <HouseIcon weight="fill" color={color} />
        ), tabBarLabel: "Início"}}/>
    </Tabs>
  );
}
