import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonPrimary = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </TouchableOpacity>
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
});
