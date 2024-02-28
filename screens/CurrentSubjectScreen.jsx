import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MyLinearGradient from "../components/ui/MyLinearGradient";
import DeleteButton from "../components/ui/DeleteButton";
import { deleteFolder } from "../store/foldersSlice";

const CurrentSubjectScreen = ({ route, navigation }) => {
  const [wantToDelete, setWantToDelete] = useState(false);
  const folders = useSelector((state) => state.folders.folders);
  const currentId = route.params.folderId;
  const currentFolder = folders.find((folder) => {
    return folder.folderId === currentId;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (wantToDelete) {
      navigation.navigate("All subjects");
      dispatch(deleteFolder({ folderId: currentId }));
    } else {
      return;
    }
  }, [wantToDelete]);

  if (currentFolder)
    navigation.setOptions({
      title: currentFolder.name,
    });

  const openTask = (task) => {
    navigation.navigate("Current task", {
      folderId: currentId,
      task: task,
    });
  };

  const deleteFolderHandler = () => {
    Alert.alert(
      "Do you want to delete this folder?",
      "You couldn't restore it.",
      [
        {
          text: "Cancel",
          onPress: () => setWantToDelete(false),
        },
        {
          text: "Delete",
          onPress: () => setWantToDelete(true),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.allBlocksContainer}>
        <Pressable onPress={() => openTask("Labs")} style={styles.block}>
          <MyLinearGradient colors={["#FFC100", "#FF7FBE"]}>
            <Text style={styles.blockText}>
              Labs: {currentFolder?.tasks.labs.length}
            </Text>
          </MyLinearGradient>
        </Pressable>

        <Pressable onPress={() => openTask("Hometasks")} style={styles.block}>
          <MyLinearGradient colors={["#2CD0E8", "#FF59E1"]}>
            <Text style={styles.blockText}>
              Hometasks: {currentFolder?.tasks.hometasks.length}
            </Text>
          </MyLinearGradient>
        </Pressable>
        <Pressable
          onPress={() => openTask("Presentations")}
          style={styles.block}
        >
          <MyLinearGradient colors={["#F237FF", "#7225FB"]}>
            <Text style={styles.blockText}>
              Presentations: {currentFolder?.tasks.presentations.length}
            </Text>
          </MyLinearGradient>
        </Pressable>
        <Pressable onPress={() => openTask("Other")} style={styles.block}>
          <MyLinearGradient colors={["#FF3D8C", "#FF9E2B"]}>
            <Text style={styles.blockText}>
              Other: {currentFolder?.tasks.other.length}
            </Text>
          </MyLinearGradient>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <DeleteButton onPress={deleteFolderHandler}>Delete folder</DeleteButton>
      </View>
    </View>
  );
};

export default CurrentSubjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },

  allBlocksContainer: {
    flex: 1,
    gap: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 100,
  },
  blocksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  block: {
    width: "90%",
    height: 80,
    borderRadius: 10,
  },

  blockText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },

  header: {
    fontSize: 22,
    textAlign: "center",
    padding: 10,
    marginVertical: 15,
  },
});
