import '@/src/styles/global.css';
import { Stack } from 'expo-router';



export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(dashboard)" options={{headerShown: false}} />
        
        <Stack.Screen name="doctor/[id]"  options={{
          headerShown: true,
          title: "Detalhes do Médico",
          // headerStyle:{backgroundColor: Colors.blue[300]},
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
          }}  
        />

        <Stack.Screen name="services"  options={{
          headerShown: true,
          title: "Serviços",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
          }}  
        />
    </Stack>
  )
}
