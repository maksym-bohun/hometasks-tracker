import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import MyLinearGradient from "../components/ui/MyLinearGradient";

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
      {/* <View>
        <Text style={styles.header}>Press button for adding new task</Text>
      </View> */}

      <View style={styles.allBlocksContainer}>
        {/* <View style={styles.blocksContainer}> */}
        <View style={styles.block}>
          <MyLinearGradient colors={["#FFC100", "#FF7FBE"]}>
            <Text style={styles.blockText}>Labs: 0</Text>
          </MyLinearGradient>
        </View>

        <View style={styles.block}>
          <MyLinearGradient colors={["#2CD0E8", "#FF59E1"]}>
            <Text style={styles.blockText}>Hometasks: 0</Text>
          </MyLinearGradient>
        </View>
        {/* </View> */}

        {/* <View style={styles.blocksContainer}> */}
        <View style={styles.block}>
          <MyLinearGradient colors={["#F237FF", "#7225FB"]}>
            <Text style={styles.blockText}>Presentations: 0</Text>
          </MyLinearGradient>
        </View>
        <View style={styles.block}>
          <MyLinearGradient colors={["#FF3D8C", "#FF9E2B"]}>
            <Text style={styles.blockText}>Other: 0</Text>
          </MyLinearGradient>
        </View>
        {/* </View> */}
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
    flex: 1,
  },

  allBlocksContainer: {
    flex: 5,
    gap: 20,
    marginTop: -150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
