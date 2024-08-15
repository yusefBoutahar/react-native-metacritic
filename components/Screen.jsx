import { View } from "react-native";

export const Screen = (props) => {
  return <View className={`flex-1 bg-black pt-4 px-2  ${props.className}`}>{props.children}</View>;
};
