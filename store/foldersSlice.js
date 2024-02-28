import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const foldersSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
  },
  reducers: {
    setFolders: (state, action) => {
      console.log("action.payload, ", action.payload);
      state.folders = action.payload;
    },

    addFolder: (state, action) => {
      state.folders.unshift({
        name: action.payload,
        folderId: uuidv4(),
        tasks: { labs: [], hometasks: [], presentations: [], other: [] },
      });
    },
    deleteFolder: (state, action) => {
      const folderIndex = state.folders.findIndex(
        (folder) => folder.folderId === action.payload.folderId
      );
      if (folderIndex !== -1) state.folders.splice(folderIndex, 1);
      else return;
    },
    addTask: (state, action) => {
      const folder = state.folders.find(
        (folder) => folder.folderId === action.payload.folderId
      );
      const { title, description, deadline } = action.payload.taskBody;
      const taskToAdd = {
        title,
        description,
        deadline,
        taskId: uuidv4(),
      };
      folder.tasks[action.payload.taskName].push(taskToAdd);
    },
    deleteTask: (state, action) => {
      const { folderId, taskId, taskName } = action.payload;
      const folder = state.folders.find(
        (folder) => folder.folderId === folderId
      );
      const taskIndex = folder.tasks[taskName].findIndex(
        (task) => task.taskId === taskId
      );
      folder.tasks[taskName].splice(taskIndex, 1);
    },

    updateTask: (state, action) => {
      const { folderId, taskId, taskName, taskBody } = action.payload;
      const folder = state.folders.find(
        (folder) => folder.folderId === folderId
      );

      const taskIndex = folder.tasks[taskName].findIndex(
        (task) => task.taskId === taskId
      );
      folder.tasks[taskName][taskIndex].title = taskBody.title;
      folder.tasks[taskName][taskIndex].description = taskBody.description;
      folder.tasks[taskName][taskIndex].deadline = taskBody.deadline;
    },
  },
});

export const loadFolders = () => async (dispatch) => {
  try {
    const storedFolders = await AsyncStorage.getItem("folders");
    if (storedFolders) {
      dispatch(
        foldersSlice.actions.setFolders(JSON.parse(storedFolders).folders)
      );
    }
  } catch (error) {
    console.error("Error loading folders:", error);
  }
};

export const saveFolders = (folders) => async (dispatch) => {
  try {
    await AsyncStorage.setItem("folders", JSON.stringify(folders));
  } catch (error) {
    console.error("Error saving folders:", error);
  }
};

export const { addFolder, deleteFolder, addTask, deleteTask, updateTask } =
  foldersSlice.actions;

export default foldersSlice.reducer;
