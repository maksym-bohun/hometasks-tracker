import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const IconButton = ({ onPress, iconName, size }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AntDesign name={iconName} size={size} color="black" />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
});
