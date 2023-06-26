import React from "react";
import "@mdi/font/css/materialdesignicons.css";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <ul id="list-container">
      <li className={`${task.completed ? "checked" : "unchecked"}`}>
        <i
          className={`${task.completed ? "checked" : "unchecked"}`}
          onClick={() => toggleComplete(task.id)}
          id="check"
        ></i>
        <p>{task.task}</p>
        <span className="actions">
          <i
            className="mdi mdi-pencil"
            onClick={() => editTodo(task.id)}
            id="edit"
          ></i>
          <i
            className="mdi mdi-close"
            onClick={() => deleteTodo(task.id)}
            id="delete"
          ></i>
        </span>
      </li>
    </ul>
  );
};
