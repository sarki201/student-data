import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Student {
  id: number;
  surname: string;
  firstname: string;
  age: number;
  gender: string;
  level: string;
  state: string;
}

interface DataState {
  data: Student[] | null;
}

const initialState: DataState = {
  data: null,
};
const dataSlice = createSlice({
  name: "studentData",
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<Student[]>) => {
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
});

export const { fetchData, clearData } = dataSlice.actions;
export default dataSlice.reducer;
