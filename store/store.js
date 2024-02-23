import { configureStore } from "@reduxjs/toolkit";
import foldersReducer from "./foldersSlice";

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
  },
});
