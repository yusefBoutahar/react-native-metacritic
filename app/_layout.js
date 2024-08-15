import { View, Pressable } from "react-native";
import { Stack, Link } from "expo-router";
import { Logo, AwesoneInfo } from "../components/Icons";

export default function Layout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitle:"",
          headerLeft: () => (
            <Link asChild href="/">
              <Pressable>
                <Logo />
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link asChild href="/about">
              <Pressable>
                <AwesoneInfo />
              </Pressable>
            </Link>
          ),
        }}
      />
    </View>
  );
}
