import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ButtonPrimary from "../components/ui/ButtonPrimary";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import { data } from "../data/data";
import { useDispatch } from "react-redux";
import { addFolder, saveFolders } from "../store/foldersSlice";
import validator from "validator";

const AddFolderScreen = ({ router, navigation }) => {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [inputIsInvalid, setInputIsInvalid] = useState(false);
  const dispatch = useDispatch();

  const addFolderHandler = () => {
    if (!validator.isEmpty(currentInputValue)) {
      dispatch(addFolder(currentInputValue));
      navigation.navigate("All subjects");
      setInputIsInvalid(false);
    } else {
      setInputIsInvalid(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter folder name</Text>
      <TextInput
        placeholder="Folder name"
        style={[styles.input, inputIsInvalid && styles.invalid]}
        onChangeText={(value) => setCurrentInputValue(value)}
      />
      <View style={styles.actions}>
        <ButtonSecondary onPress={() => navigation.goBack()}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary onPress={addFolderHandler}>Add folder</ButtonPrimary>
      </View>
    </View>
  );
};

export default AddFolderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    marginTop: "-20%",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderColor: "#898986",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  invalid: {
    backgroundColor: "#F7DADA",
    borderColor: "#e55959",
  },
});
