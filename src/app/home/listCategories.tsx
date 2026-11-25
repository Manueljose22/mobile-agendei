import Category from "@/src/components/categories/category";
import { specialtyIcons } from "@/src/constants/specialtyIcons";
import { useSpecialitiesQuery } from "@/src/hooks/queries/useSpecialitiesQuery";
import { Colors } from "@/src/styles/colors";
import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListCategories() {
  const specialitiesQuery = useSpecialitiesQuery();
  const specialities = specialitiesQuery.data ?? [];
  const [isRefreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    try {
      await specialitiesQuery.refetch();
    } finally {
      setRefreshing(false);
    }
  };

  if (specialitiesQuery.isPending) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={Colors.blue[300]} size="large" />
      </SafeAreaView>
    );
  }

  if (specialitiesQuery.isError && specialities.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-red-500">
          Não foi possível carregar as especialidades.
        </Text>
        <Text className="text-blue-500 mt-3" onPress={() => specialitiesQuery.refetch()}>
          Tentar novamente
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white py-5 px-5">
      <StatusBar barStyle="dark-content" />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing || specialitiesQuery.isRefetching}
            onRefresh={refresh}
            tintColor={Colors.blue[300]}
            colors={[Colors.blue[300]]}
          />
        }
        data={specialities}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Category
            icon={specialtyIcons[item.name]}
            name={item.name}
          />
        )}
      />
    </SafeAreaView>
  );
}
