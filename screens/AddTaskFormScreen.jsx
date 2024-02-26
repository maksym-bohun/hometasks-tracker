import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import { useDispatch } from "react-redux";
import { addTask } from "../store/foldersSlice";

const AddTaskFormScreen = ({ route, navigation }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const getDate = () => {
    let tempDate = date.toString().split(" ");
    return date !== ""
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : "";
  };

  const changeInputHandler = (text, field) => {
    if (field === "title") {
      setTitle(text);
    } else if (field === "description") {
      setDescription(text);
    } else {
      return;
    }
  };

  const addTaskHandler = () => {
    if (title !== "" && description !== "" && date !== "") {
      dispatch(
        addTask({
          folderId: route.params.folderId,
          taskBody: { title, description, deadline: date.toISOString() },
          taskName: route.params.task,
        })
      );
      navigation.goBack();
    } else {
      console.log(title, description, date);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView} alwaysBounceVertical={false}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="Enter title"
              style={styles.input}
              onChangeText={(text) => changeInputHandler(text, "title")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Enter description"
              style={styles.input}
              multiline={true}
              onChangeText={(text) => changeInputHandler(text, "description")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Deadline</Text>
            <View style={styles.dateContainer}>
              <TextInput
                style={[styles.input, styles.dateInput]}
                value={getDate()}
                placeholder="Date..."
                // caretHidden={true}
                editable={false}
              />
              <Button onPress={showDatePicker} title="Set Date" />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ButtonPrimary onPress={addTaskHandler}>Confirm</ButtonPrimary>
      </View>
    </View>
  );
};

export default AddTaskFormScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "start",
    marginTop: 50,
    gap: 20,
  },
  scrollView: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  inputContainer: {
    width: "90%",
  },
  input: {
    fontSize: 18,
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    fontSize: 20,
    color: "#353535",
    paddingVertical: 5,
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: "row",
  },
  dateInput: {
    flex: 2,
  },
});
