
import { createSlice } from "@reduxjs/toolkit";

const loadTodos = () => {
  const serializedTodos = localStorage.getItem("todos");
  if (serializedTodos) {
    return JSON.parse(serializedTodos);
  }
  return [];
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoSlice = createSlice({
  name: "todos",
  initialState: loadTodos(),
  reducers: {
    addTodo: (state, action) => {
      const newState = [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
      saveTodos(newState);
      return newState;
    },
    toggleTodo: (state, action) => {
      const newState = state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      saveTodos(newState);
      return newState;
    },
    deleteTodo: (state, action) => {
      const newState = state.filter((todo) => todo.id !== action.payload);
      saveTodos(newState);
      return newState;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
