import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { data } from "../data/data";
const folderImage = require("../media/images/folder.png");

const renderFolderHandler = (itemData) => {
  return (
    <View style={styles.folderContainer}>
      <Image source={folderImage} style={styles.image} />
      <Text style={styles.folderName}>{itemData.item}</Text>
    </View>
  );
};

const AllTasksScreen = ({ route, navigation }) => {
  navigation.setOptions({
    headerRight: () => {
      return (
        <IconButton
          iconName="pluscircleo"
          size={24}
          onPress={() => navigation.navigate("Add Folder")}
        />
      );
    },
  });

  return (
    <FlatList
      data={data.folderNames}
      renderItem={renderFolderHandler}
      alwaysBounceVertical={false}
    />
  );
};

export default AllTasksScreen;

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
    fontSize: 18,
    flexWrap: "wrap",
  },
});
