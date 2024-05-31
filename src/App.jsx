import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTodo, toggleTodo, deleteTodo } from "./redux/todoSlice";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <div className="box">
        <div className="app">
          <h1>My Todo App</h1>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter todo"
            className="todo"
          />
          <button onClick={handleAddTodo} className="btn">
            Add Todo
          </button>

          <ol>
            {todos.map((todo, i) => (
              <li
                key={todo.id}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  backgroundColor: todo.completed ? "#ff8787" : "white",
                  color: todo.completed ? "white" : "black",
                  border: todo.completed ? "none" : "1px solid black",
                }}
                className="items"
              >
                <div className="c">
                  {i + 1}) {todo.text}
                </div>
                <div className="btnn">
                  <button
                    onClick={() => dispatch(toggleTodo(todo.id))}
                    className="btnc"
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="btnd"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <p className="p">Total Completed Items: {completedCount}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
