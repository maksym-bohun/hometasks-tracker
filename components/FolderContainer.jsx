import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
const folderImage = require("../media/images/folder.png");

const FolderContainer = ({ itemData }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.folderContainer}
      onPress={() => {
        navigation.navigate("Current subject", {
          folderId: itemData.item.folderId,
          folderName: itemData.item.name,
        });
      }}
    >
      <Image source={folderImage} style={styles.image} />
      <Text style={styles.folderName}>{itemData.item.name}</Text>
    </Pressable>
  );
};

export default FolderContainer;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  folderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
    borderBottomColor: "#8CB9BD",
    borderBottomWidth: 1,
    width: "100%",
  },
  folderName: {
    flex: 2,
    fontSize: 18,
    flexWrap: "wrap",
  },
});
