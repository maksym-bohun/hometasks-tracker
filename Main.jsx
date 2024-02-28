import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AddFolderScreen from "./screens/AddFolderScreen";
import { store } from "./store/store";
import CurrentSubjectScreen from "./screens/CurrentSubjectScreen";
import CurrentTaskScreen from "./screens/CurrentTaskScreen";
import AllSubjectsScreen from "./screens/AllSubjectsScreen";
import AddTaskFormScreen from "./screens/AddTaskFormScreen";
import IconButton from "./components/ui/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadFolders, saveFolders } from "./store/foldersSlice";

const Stack = createNativeStackNavigator();

export default function Main() {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folders);

  useEffect(() => {
    dispatch(loadFolders());
  }, []);

  useEffect(() => {
    dispatch(saveFolders(folders));
  }, [folders]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              backgroundColor: "#FEFBF6",
            },
            headerStyle: {
              backgroundColor: "#f3d5b5",
            },
          }}
        >
          <Stack.Screen
            name="All subjects"
            component={AllSubjectsScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <IconButton
                  iconName="pluscircleo"
                  size={24}
                  onPress={() => navigation.navigate("Add Folder")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Current subject"
            component={CurrentSubjectScreen}
            options={({ route }) => ({
              title: route.params.folderName,
            })}
          />
          <Stack.Screen
            name="Current task"
            component={CurrentTaskScreen}
            options={({ route }) => ({
              title: `${route.params.folderName}: ${route.params.task}`,
            })}
          />
          <Stack.Screen
            name="Task Form"
            component={AddTaskFormScreen}
            options={({ route }) => ({
              title: route.params.action === "add" ? "Add Task" : "Update Task",
            })}
          />
          <Stack.Screen
            name="Add Folder"
            component={AddFolderScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
