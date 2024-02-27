import React, { useEffect, useState } from "react";
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
import { addTask, updateTask } from "../store/foldersSlice";
import validator from "validator";

const AddTaskFormScreen = ({ route, navigation }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [invalidInputs, setInvalidInputs] = useState({
    title: false,
    description: false,
    date: false,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const defaultValues = {
    title: route.params.title || "",
    description: route.params.description || "",
    date: route.params.date || "",
  };

  const action = route.params.action || "add";

  useEffect(() => {
    console.log("defaultValues.date ", defaultValues.date);
    console.log("route.params ", route.params);
    if (action === "update") {
      setTitle(defaultValues.title);
      setDescription(defaultValues.description);
      setDate(new Date(defaultValues.date));
    }
  }, []);

  navigation.setOptions({
    title: action === "add" ? "Add Task" : "Update task",
  });

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
    console.log("DATE  ", date);
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

  const checkInputs = () => {
    if (
      !validator.isEmpty(title) &&
      !validator.isEmpty(description) &&
      date instanceof Date
    ) {
      return true;
    } else {
      if (validator.isEmpty(title)) {
        setInvalidInputs((prevInputs) => ({ ...prevInputs, title: true }));
      } else {
        setInvalidInputs((prevInputs) => ({ ...prevInputs, title: false }));
      }

      if (validator.isEmpty(description)) {
        setInvalidInputs((prevInputs) => ({
          ...prevInputs,
          description: true,
        }));
      } else {
        setInvalidInputs((prevInputs) => ({
          ...prevInputs,
          description: false,
        }));
      }

      if (!(date instanceof Date)) {
        setInvalidInputs((prevInputs) => ({ ...prevInputs, date: true }));
      } else {
        setInvalidInputs((prevInputs) => ({ ...prevInputs, date: false }));
      }
      return false;
    }
  };

  const addTaskHandler = () => {
    if (checkInputs()) {
      setInvalidInputs({ title: false, description: false, date: false });
      dispatch(
        addTask({
          folderId: route.params.folderId,
          taskBody: { title, description, deadline: date.toISOString() },
          taskName: route.params.task,
        })
      );
      navigation.goBack();
    }
  };

  const updateTaskHandler = () => {
    if (checkInputs()) {
      dispatch(
        updateTask({
          folderId: route.params.folderId,
          taskBody: { title, description, deadline: date.toISOString() },
          taskName: route.params.taskName,
          taskId: route.params.taskId,
        })
      );
      navigation.goBack();
    }
  };

  console.log("getDate()", getDate());

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView} alwaysBounceVertical={false}>
        <View style={styles.container}>
          <View style={styles.containerInScrollView}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                placeholder="Enter title"
                style={[styles.input, invalidInputs.title && styles.invalid]}
                onChangeText={(text) => changeInputHandler(text, "title")}
                defaultValue={defaultValues.title}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                placeholder="Enter description"
                style={[
                  styles.input,
                  invalidInputs.description && styles.invalid,
                  styles.multilineInput,
                ]}
                multiline={true}
                onChangeText={(text) => changeInputHandler(text, "description")}
                defaultValue={defaultValues.description}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Deadline</Text>
              <View style={styles.dateContainer}>
                <TextInput
                  style={[
                    styles.input,
                    invalidInputs.date && styles.invalid,
                    styles.dateInput,
                  ]}
                  value={getDate()}
                  placeholder="Date..."
                  editable={false}
                />
                <Button onPress={showDatePicker} title="Set Date" />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  minimumDate={new Date()}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            onPress={action === "add" ? addTaskHandler : updateTaskHandler}
          >
            Confirm
          </ButtonPrimary>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddTaskFormScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    justifyContent: "start",
    marginTop: 40,
    gap: 20,
  },
  scrollView: {
    // flex: 1,
    padding: 10,
  },
  containerInScrollView: {
    justifyContent: "center",
    gap: 20,
  },
  buttonContainer: {
    // flex: 1,
    marginTop: 20,
  },
  inputContainer: {},
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
  multilineInput: {
    maxHeight: 10 * 18,
  },
  invalid: {
    backgroundColor: "#F7DADA",
    borderColor: "#e55959",
  },
});
