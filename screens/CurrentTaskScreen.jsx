import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ButtonSecondary from "../components/ui/ButtonSecondary";

const renderTasks = (itemData) => {
  return (
    <View>
      <Text>Task: {itemData.item.title}</Text>
    </View>
  );
};

const CurrentTaskScreen = ({ route, navigation }) => {
  const folders = useSelector((state) => state.folders.folders);
  const { folderId, task } = route.params;
  const currentFolder = folders.find((folder) => folder.folderId === folderId);
  const currentTasks = currentFolder.tasks[task.toLowerCase()];

  navigation.setOptions({
    title: `${currentFolder.name}: ${task}`,
  });

  const addTask = () => {
    navigation.navigate("Add Task Form", {
      folderId,
      task: task.toLowerCase(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksContainer}>
        {currentTasks.length == 0 ? (
          <Text>No tasks</Text>
        ) : (
          <FlatList data={currentTasks} renderItem={renderTasks} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <ButtonSecondary onPress={addTask}>Add new task</ButtonSecondary>
      </View>
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
  buttonContainer: {
    flex: 1,
  },
});
