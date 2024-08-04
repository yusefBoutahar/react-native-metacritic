import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Logo } from "./Logo";
import { AnimatedCard } from "./AnimatedCard";

export const Games = () => {
  const [games, setGames] = React.useState([]);
  const [error, setError] = React.useState(null);
  const insets = useSafeAreaInsets();

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
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Logo />

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
    </View>
  );
};
