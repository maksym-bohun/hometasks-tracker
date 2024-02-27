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

      console.log("folder.tasks[taskName]", folder.tasks[taskName]);
      const taskIndex = folder.tasks[taskName].findIndex(
        (task) => task.taskId === taskId
      );
      folder.tasks[taskName][taskIndex].title = taskBody.title;
      folder.tasks[taskName][taskIndex].description = taskBody.description;
      folder.tasks[taskName][taskIndex].deadline = taskBody.deadline;
    },
  },
});

export const addFolder = foldersSlice.actions.addFolder;
export const addTask = foldersSlice.actions.addTask;
export const deleteTask = foldersSlice.actions.deleteTask;
export const updateTask = foldersSlice.actions.updateTask;
export default foldersSlice.reducer;
