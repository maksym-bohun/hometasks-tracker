import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ButtonSecondary from "../components/ui/ButtonSecondary";
const taskIcon = require("../media/images/list.png");
const descriptionIcon = require("../media/images/file.png");
const deadlineIcon = require("../media/images/deadline.png");

const renderTasks = (itemData) => {
  const { deadline } = itemData.item;
  return (
    <View style={styles.taskContainer}>
      <View style={styles.row}>
        <Image source={taskIcon} style={styles.icon} />
        <Text style={styles.text}>{itemData.item.title}</Text>
      </View>
      <View style={styles.row}>
        <Image source={descriptionIcon} style={styles.icon} />
        <Text style={styles.text}>{itemData.item.description}</Text>
      </View>
      <View style={styles.row}>
        <Image source={deadlineIcon} style={styles.icon} />
        <Text style={styles.text}>
          {new Date(deadline).getDate()}{" "}
          {String(new Date(deadline).getMonth() + 1).padStart(2, "0")}{" "}
          {new Date(deadline).getFullYear()}
        </Text>
      </View>
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
          <Text style={styles.emptyHeader}>You don't have any tasks yet</Text>
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
  icon: {
    width: 26,
    height: 26,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  taskContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f7ebdb",
    marginVertical: 5,
    borderRadius: 10,
    gap: 20,
    flexWrap: "wrap",
  },
  text: {
    fontSize: 18,
    flexWrap: "wrap",
  },
  emptyHeader: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 22,
    color: "gray",
  },
});
