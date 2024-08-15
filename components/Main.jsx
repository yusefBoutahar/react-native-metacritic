import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { AnimatedCard } from "./AnimatedCard";
import { Screen } from "./Screen";

export const Main = () => {
  const [games, setGames] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await getLatestGames();
        setGames(games);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGames();
  }, []);

  return (
    <Screen>
      {error ? (
        <Text>Error: {error}</Text>
      ) : games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedCard game={item} index={index} />
          )}
        ></FlatList>
      )}
    </Screen>
  );
};
