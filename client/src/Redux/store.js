import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";

export const store = configureStore({
  devTools: true,//to make dev tools extenstion enable for solving error well dev tools is true
  reducer: {
    auth: authSliceReducer,//this is the reducer and intital state carreid from auth slice file
  },
});
