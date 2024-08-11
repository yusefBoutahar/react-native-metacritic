import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { Score } from "../components/Score";
import { useEffect, useState } from "react";
import { getGameDetails } from "../lib/metacritic";
import { useLocalSearchParams } from "expo-router";

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
    <View className="h-full">
      {game ? (
        <ScrollView className="px-4 mt-16">
          <View>
            <Image className="w-full h-96" source={{ uri: game.img }} />
            <Text className="text-white font-bold text-2xl">{game.title}</Text>
            <Score score={game.score} />
            <Text className="text-white">{game.description}</Text>
          </View>
        </ScrollView>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <ActivityIndicator color={"#fff"} size={"large"} />
      )}
    </View>
  );
};

export default Detail;
