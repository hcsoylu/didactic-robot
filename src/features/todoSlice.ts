import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DraggableLocation } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { StateMockData } from "../mockdata";
import { State, Todo } from "../model";

export interface addItemPayloadAction {
  text: string;
  date?: string;
}

export interface deleteItemPayloadAction {
  id: string;
  key: string;
}

export interface changeItemStatusPayloadAction {
  item: Todo;
  source: DraggableLocation;
  destination: DraggableLocation;
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
    deleteItem: (state, action: PayloadAction<deleteItemPayloadAction>) => {
      const { key, id } = action.payload;
      state[key].items = state[key].items.filter((item) => item.id !== id);
    },
    changeItemStatus: (
      state,
      action: PayloadAction<changeItemStatusPayloadAction>
    ) => {
      const { item, source, destination } = action.payload;

      state[source.droppableId].items.splice(source.index, 1);
      state[destination.droppableId].items.splice(destination.index, 0, item);
    },
  },
});

export default todoSlice.reducer;
export const { addItem, deleteItem, changeItemStatus } = todoSlice.actions;
