import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../redux/slices/dataSlice";

export const store = configureStore({
  reducer: {
    studentData: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
