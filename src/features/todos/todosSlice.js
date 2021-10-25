import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  ERROR: "ERROR",
};

const initialState = {
  status: STATUS.IDLE,
  todos: [],
  todo: {
    description: "",
  },
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const result = await axios.get(`${BASE_URL}/todos`);
    return result.data;
  } catch (error) {
    throw error;
  }
});

export const addTodo = createAsyncThunk("todos/addTodo", async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}/todos`, data);
    return result.data;
  } catch (error) {
    throw error;
  }
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.todos = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.todos = [...state.todos, action.payload];
      });
  },
});

export const selectTodos = (state) => state.todos;

export default todosSlice.reducer;
