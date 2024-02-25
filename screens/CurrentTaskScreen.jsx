import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ButtonSecondary from "../components/ui/ButtonSecondary";

const CurrentTaskScreen = ({ route, navigation }) => {
  const folders = useSelector((state) => state.folders.folders);
  console.log("FOLDERS: ", folders);

  navigation.setOptions({
    title: folders.find((folder) => {
      return folder.folderId === route.params.folderId;
    }).name,
  });
  console.log("RENDERING");
  return (
    <View style={styles.container}>
      <View style={styles.tasksContainer}>
        <Text>Current task: {route.params.folderId}</Text>
      </View>
      {/* <View style={styles.bottomContainer}>
        <ButtonSecondary
          textStyle={styles.button}
          containerStyle={styles.buttonContainer}
        >
          Add task
        </ButtonSecondary>
      </View> */}
    </View>
  );
};

export default CurrentTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksContainer: {
    flex: 6,
  },

  //   bottomContainer: {
  //     flex: 1,
  //     backgroundColor: "#f3d5b5",
  //   },
  //   buttonContainer: {
  //     borderWidth: 3,
  //   },
  //   button: {
  //     fontWeight: "700",
  //     fontSize: 18,
  //   },
});
