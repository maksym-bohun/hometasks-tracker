import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const MyLinearGradient = ({ children, colors }) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.linearGradient, styles.block]}
    >
      {children}
    </LinearGradient>
  );
};

export default MyLinearGradient;

const styles = StyleSheet.create({
  block: {
    backgroundColor: "red",
    // minWidth: 170,
    width: "100%",
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
