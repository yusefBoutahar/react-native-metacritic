import { Text, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { AwesomeHome } from "../components/Icons";

export default function About() {
  return (
    <ScrollView className="pt-24">
      <Link asChild href="/">
        <Pressable>
          <AwesomeHome />
        </Pressable>
      </Link>

      <Text className="text-xl" style={{ color: "#fff" }}>
        This is a simple app that fetches the latest games from Metacritic and
        displays them in a list. It uses the React Navigation library for
        routing and the React Native Safe Area Context library to handle the
        safe area insets on iOS devices. This is a simple app that fetches the
        latest games from Metacritic and displays them in a list. It uses the
        React Navigation library for routing and the React Native Safe Area
        Context library to handle the safe area insets on iOS devices. This is a
        simple app that fetches the latest games from Metacritic and displays
        them in a list. It uses the React Navigation library for routing and the
        React Native Safe Area Context library to handle the safe area insets on
        iOS devices.
      </Text>
      <Text style={{ color: "#fff" }}>
        This is a simple app that fetches the latest games from Metacritic and
        displays them in a list. It uses the React Navigation library for
        routing and the React Native Safe Area Context library to handle the
        safe area insets on iOS devices.
      </Text>
      <Text style={{ color: "#fff" }}>
        This is a simple app that fetches the latest games from Metacritic and
        displays them in a list. It uses the React Navigation library for
        routing and the React Native Safe Area Context library to handle the
        safe area insets on iOS devices.
      </Text>
    </ScrollView>
  );
}
