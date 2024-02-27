import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
const taskIcon = require("../media/images/list.png");
const descriptionIcon = require("../media/images/file.png");
const deadlineIcon = require("../media/images/deadline.png");
import { SwipeListView } from "react-native-swipe-list-view";

const TaskContainer = ({ itemData, onDeleteItem, onUpdateItem }) => {
  const { deadline } = itemData.item;

  const updateItem = () => {
    onUpdateItem(itemData.item);
  };

  const renderItem = (rowData) => (
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

  const renderHiddenItem = () => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={[styles.hiddenButton, styles.closeButton]}
        onPress={updateItem}
      >
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.hiddenButton, styles.deleteButton]}
        onPress={() => onDeleteItem(itemData.item)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={[itemData]}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={85}
        rightOpenValue={-85}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </View>
  );
};

export default TaskContainer;

const styles = StyleSheet.create({
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
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#f7ebdb",
    borderRadius: 10,
    gap: 20,
    flexWrap: "wrap",
  },
  text: {
    fontSize: 18,
    flexWrap: "wrap",
  },

  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green",
    margin: 20,
    textAlign: "center",
  },

  hiddenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 10,
    marginVertical: 5,
    height: "100%",
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  hiddenButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    // height: 80,
    height: "100%",
  },
  closeButton: {
    backgroundColor: "#8CC775",
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "#eda4a4",
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
