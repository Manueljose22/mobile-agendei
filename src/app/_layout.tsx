import '@/src/styles/global.css';
import { Stack } from 'expo-router';
import { Colors } from '../styles/colors';



export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(dashboard)" options={{headerShown: false}} />
        <Stack.Screen name="doctor/[id]"  options={{
          headerShown: true,
          title: "Serviços",
          headerStyle:{backgroundColor: Colors.blue[300]},
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          headerShadowVisible: false
          }}  
        />
    </Stack>
  )
}
