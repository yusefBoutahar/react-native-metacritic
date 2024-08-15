import { View, Text, Image, Pressable } from "react-native";
import { Score } from "./Score";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export const GameCard = ({ game }) => {
  return (
    <Link asChild href={`/${game.slug}`}>
      <StyledPressable className="active:opacity-70 border mb-2 border-black active:border-white/50 rounded-xl">
        <View
          onClick={() => {
            console.log("clicked");
          }}
          className="flex-row w-full bg-gray-900 rounded-md h-40 p-4"
          key={game.slug}
        >
          <Image
            className="w-20 h-full rounded-md mr-4"
            source={{ uri: game.image }}
          />
          <View className="flex justify-between flex-shrink">
            <Text className="text-white font-bold text-xl">{game.title}</Text>
            <Score score={game.score} />
            <Text className="text-white">
              {game.description.slice(0, 100)} ...
            </Text>
          </View>
        </View>
      </StyledPressable>
    </Link>
  );
};
