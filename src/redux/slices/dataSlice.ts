import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  data: object[] | null;
}

const initialState: DataState = {
  data: null,
};
const dataSlice = createSlice({
  name: "studentData",
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<object[]>) => {
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
});

export const { fetchData, clearData } = dataSlice.actions;
export default dataSlice.reducer;
