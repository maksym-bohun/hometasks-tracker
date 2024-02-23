import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonSecondary = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </TouchableOpacity>
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
});
