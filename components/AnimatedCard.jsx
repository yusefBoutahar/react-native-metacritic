import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Game } from "./Game";

export const AnimatedCard = ({ game, index }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: index * 200,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <Game game={game} />
    </Animated.View>
  );
};
