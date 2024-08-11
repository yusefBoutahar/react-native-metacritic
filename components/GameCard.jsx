import { View, Text, Image } from "react-native";
import { Score } from "./Score";

export const GameCard = ({ game }) => {
  return (
    <View
      className="mb-8 p-4 flex-row w-full h-32 bg-gray-800 rounded-md"
      key={game.slug}
    >
      <Image
        className="w-20 h-full rounded-sm mr-4"
        source={{ uri: game.image }}
      />
      <View>
        <Text className="text-white font-bold text-md">{game.title}</Text>
        <Score score={game.score} />
        <Text className="text-white">{game.description.slice(0, 100)} ...</Text>
      </View>
    </View>
  );
};
