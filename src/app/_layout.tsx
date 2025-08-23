import '@/src/styles/global.css';
import { Stack } from 'expo-router';



export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>

        <Stack.Screen name="auth" options={{headerShown: false}} />
        <Stack.Screen name="(dashboard)" options={{headerShown: false}} />
        
        <Stack.Screen name="home/listCategories"  options={{
          headerShown: true,
          title: "Categorias",
          // headerStyle:{backgroundColor: Colors.blue[300]},
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
          }}  
        />
        <Stack.Screen name="home/listDoctors"  options={{
          headerShown: true,
          title: "Doutores",
          // headerStyle:{backgroundColor: Colors.blue[300]},
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
          }}  
        />
        <Stack.Screen name="doctor/[id]"  options={{
          headerShown: true,
          title: "Detalhes do Médico",
          // headerStyle:{backgroundColor: Colors.blue[300]},
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
          }}  
        />

        <Stack.Screen name="services/[id]"  options={{
          headerShown: true,
          title: "Serviços",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',
          headerShadowVisible: false
          }}  
        />

        <Stack.Screen name="schedule/index"  options={{
          headerShown: true,
          title: "Marcar Consulta",
          headerTintColor: "#212121",
          headerTitleAlign: 'center',

          }}  
        />
    </Stack>
  )
}
