import { View, Text } from "react-native";

export const Score = ({score}) => {
  const getColor = () => {
    const percentage = (score / 100) * 100;
    if (percentage < 97) return "bg-red-500 text-white";
    if (percentage < 98) return "bg-yellow-500 text-white";
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
