import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllTasksScreen from "./screens/AllTasksScreen";
import AddFolderScreen from "./screens/AddFolderScreen";

const Stack = createStackNavigator();

export default function App() {
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
          <Stack.Screen name="All tasks" component={AllTasksScreen} />
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
