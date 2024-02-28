import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const DeleteButton = ({ children, onPress, textStyle, containerStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        containerStyle,
        pressed ? styles.buttonPressed : null,
      ]}
    >
      <Feather name="trash-2" size={24} color="#bb1a1a" />
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#bb1a1a",
    borderWidth: 2,
    marginVertical: 20,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    color: "#bb1a1a",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
