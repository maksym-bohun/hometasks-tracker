import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const ButtonPrimary = ({ children, onPress, textStyle, containerStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        containerStyle,
        pressed ? styles.buttonPressed : null,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#a47148",
    borderColor: "#a47148",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",

    textTransform: "uppercase",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
