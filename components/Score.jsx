import { View, Text } from "react-native";

export const Score = ({score}) => {
  const getColor = () => {
    if (score < 50) return "bg-red-500 text-white";
    if (score < 75) return "bg-yellow-500 text-white";
    return "bg-green-500 text-white";
  };
  const className = getColor();

  return (
    <View
      className={`${className} w-6 h-6 rounded-full justify-center items-center `}
    >
      <Text className="text-md font-bold text-white">{score}</Text>
    </View>
  );
};
