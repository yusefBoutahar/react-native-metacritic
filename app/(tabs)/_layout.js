import { Tabs } from "expo-router";
import { AwesomeHome, AwesoneInfo } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffee00",
        tabBarStyle: {
          backgroundColor: "#000",
        },
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <AwesomeHome color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => <AwesoneInfo color={color} />,
        }}
      />
    </Tabs>
  );
}
