import { createSlice } from "@reduxjs/toolkit";
import { StateMockData } from "../mockdata";
import { State } from "../model";

const initialState: State = StateMockData;

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
});

export default todoSlice.reducer;
