import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { useSelector } from "react-redux";
import FolderContainer from "../components/FolderContainer";

const renderFolderHandler = (itemData) => {
  return <FolderContainer itemData={itemData} />;
};

const AllTasksScreen = ({ route, navigation }) => {
  const folders = useSelector((state) => state.folders.folders);

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
    <>
      {folders.length > 0 && (
        <FlatList
          data={folders}
          renderItem={renderFolderHandler}
          alwaysBounceVertical={false}
          keyExtractor={(item) => item.folderId}
        />
      )}
      {folders.length == 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyContainerText}>
            You don't have any folders yet
          </Text>
        </View>
      )}
    </>
  );
};

export default AllTasksScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100,
  },
  emptyContainerText: {
    fontSize: 22,
    color: "#7F7F7F",
    fontWeight: 600,
  },
});
