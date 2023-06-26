import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";

uuidv4();

export const TodoWrapper = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);
  const addTodo = (todo) => {
    const newTasks = [
      ...tasks,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const toggleCompleteTask = (id) => {
    const newTasks = tasks.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const editTask = (task, id) => {
    const newTasks = tasks.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const deleteTodo = (id) => {
    const newTasks = tasks.filter((todo) => todo.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  const editTodo = (id) => {
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="todo-app">
      <h2>
        <img src="icon.png" alt="" />
        To-Do List
      </h2>
      <TodoForm addTodo={addTodo} />
      {tasks.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleCompleteTask}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
