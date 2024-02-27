import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AddFolderScreen from "./screens/AddFolderScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CurrentSubjectScreen from "./screens/CurrentSubjectScreen";
import CurrentTaskScreen from "./screens/CurrentTaskScreen";
import AllSubjectsScreen from "./screens/AllSubjectsScreen";
import AddTaskFormScreen from "./screens/AddTaskFormScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
            <Stack.Screen name="All subjects" component={AllSubjectsScreen} />
            <Stack.Screen
              name="Current subject"
              component={CurrentSubjectScreen}
            />
            <Stack.Screen name="Current task" component={CurrentTaskScreen} />
            <Stack.Screen name="Task Form" component={AddTaskFormScreen} />
            <Stack.Screen
              name="Add Folder"
              component={AddFolderScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
