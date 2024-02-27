import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import TaskContainer from "../components/TaskContainer";
import { deleteTask } from "../store/foldersSlice";

const CurrentTaskScreen = ({ route, navigation }) => {
  const folders = useSelector((state) => state.folders.folders);
  const { folderId, task } = route.params;
  const currentFolder = folders.find((folder) => folder.folderId === folderId);
  const currentTasks = currentFolder.tasks[task.toLowerCase()];
  const dispatch = useDispatch();

  const renderTasks = (itemData) => {
    return (
      <TaskContainer
        itemData={itemData}
        onDeleteItem={deleteItemHandler}
        onUpdateItem={updateItemHandler}
      />
    );
  };

  const deleteItemHandler = (data) => {
    console.log("data ", data);
    dispatch(
      deleteTask({
        folderId,
        taskName: task.toLowerCase(),
        taskId: data.taskId,
      })
    );
  };

  const updateItemHandler = (data) => {
    const { title, description, deadline } = data;
    console.log("DATA", data);
    navigation.navigate("Task Form", {
      action: "update",
      folderId,
      taskId: data.taskId,
      taskName: task.toLowerCase(),
      title,
      description,
      date: deadline,
    });
  };

  navigation.setOptions({
    title: `${currentFolder.name}: ${task}`,
  });

  const addTask = () => {
    navigation.navigate("Task Form", {
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
          <FlatList
            data={currentTasks}
            renderItem={renderTasks}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
          />
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
    flex: 4,
  },
  buttonContainer: {
    flex: 1,
  },

  emptyHeader: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 22,
    color: "gray",
  },
});
