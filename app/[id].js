import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { Score } from "../components/Score";
import { useEffect, useState } from "react";
import { getGameDetails } from "../lib/metacritic";
import { useLocalSearchParams, Stack } from "expo-router";
import { Screen } from "../components/Screen";

export const Detail = () => {
  const { id } = useLocalSearchParams();
  const [game, setGame] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getGameDetails(id).then(setGame).catch(setError);
    }
  }, [id]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#ffee00",
          },
          headerTintColor: "black",
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: game ? game.title : "Cargando...",
        }}
      />
      {game ? (
        <ScrollView>
          <View className="flex justify-between mx-2 items-center">
            <Image
              className="w-60 h-72 rounded mb-4"
              source={{ uri: game.img }}
            />
            <Score score={game.score} />
            <Text className="text-white font-bold text-2xl my-2">{game.title}</Text>
            <Text className="text-white">{game.description}</Text>
          </View>
        </ScrollView>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <ActivityIndicator color={"#fff"} size={"large"} />
      )}
    </Screen>
  );
};

export default Detail;
