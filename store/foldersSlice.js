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
      state.folders.unshift({ name: action.payload, folderId: uuidv4() });
    },
  },
});

export const addFolder = foldersSlice.actions.addFolder;
export default foldersSlice.reducer;
