import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const icon = require("./assets/icon.png");

export default function App() {
  const [timesPressed, setTimesPressed] = React.useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.logBox}>
        <Text
          style={[
            {
              color: timesPressed ? "blue" : "red",
            },
            styles.logBoxText,
          ]}
          testID="pressable_press_console"
        >
          {timesPressed ? timesPressed : "Vacio"}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "blue" : "#444",
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              {
                color: pressed ? "white" : "white",
              },
              styles.text,
            ]}
          >
            {pressed ? "Pressed!" : "Press Me"}
          </Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          setTimesPressed(0);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "red" : "#444",
          },
          styles.wrapperCustom,
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              {
                color: pressed ? "white" : "white",
              },
              styles.text,
            ]}
          >
            {pressed ? "Pressed!" : "Reset"}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 24,
  },
  wrapperCustom: {
    borderRadius: 8,
    marginHorizontal: 100,
    padding: 6,
    width: "100",
    alignItems: "center",
    justifyContent: "center",
  },
  logBox: {
    marginHorizontal: 100,
    marginTop: 100,
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
    color: "black",
    backgroundColor: "#f9f9f9",
  },
  logBoxText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
