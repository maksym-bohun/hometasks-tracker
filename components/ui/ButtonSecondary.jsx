import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonSecondary = ({ children, onPress, textStyle, containerStyle }) => {
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

export default ButtonSecondary;

const styles = StyleSheet.create({
  button: {
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
    color: "#a47148",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
