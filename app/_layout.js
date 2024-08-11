import { View } from "react-native";
import { Slot } from "expo-router";
export default function Layout() {
  return (
    <View className="bg-black">
      <Slot />
    </View>
  );
}
