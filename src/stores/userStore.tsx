import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers/userReducer";

const userStore = configureStore({
  reducer,
});

export default userStore;
