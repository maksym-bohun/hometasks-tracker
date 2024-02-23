import { createSlice } from "@reduxjs/toolkit";

const foldersSlice = createSlice({
  name: "folders",
  initialState: {
    folderNames: [],
  },
  reducers: {
    addFolder: (state, action) => {
      state.folderNames.unshift(action.payload);
    },
  },
});

export const addFolder = foldersSlice.actions.addFolder;
export default foldersSlice.reducer;
