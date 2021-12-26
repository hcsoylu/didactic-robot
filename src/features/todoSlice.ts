import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateMockData } from "../mockdata";
import { State } from "../model";
import { v4 } from "uuid";

export interface addItemPayloadAction {
  text: string;
  date?: string;
}

const initialState: State = StateMockData;

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<addItemPayloadAction>) => {
      const newTodo = {
        id: v4(),
        name: action.payload.text,
        date: action.payload.date,
      };
      state.todo.items.unshift(newTodo);
    },
  },
});

export default todoSlice.reducer;
export const { addItem } = todoSlice.actions;
