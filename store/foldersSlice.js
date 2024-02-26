import { createSlice } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const foldersSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
  },
  reducers: {
    addFolder: (state, action) => {
      state.folders.unshift({
        name: action.payload,
        folderId: uuidv4(),
        tasks: { labs: [], hometasks: [], presentations: [], other: [] },
      });
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
      };
      folder.tasks[action.payload.taskName].push(taskToAdd);
    },
  },
});

export const addFolder = foldersSlice.actions.addFolder;
export const addTask = foldersSlice.actions.addTask;
export default foldersSlice.reducer;
