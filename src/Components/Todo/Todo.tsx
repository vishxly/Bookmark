import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import "./Todo.css";

interface TodoItem {
  id: number;
  todoText: string;
  isCompleted: boolean;
}

const Todo: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [editedTodo, setEditedTodo] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: new Date().getTime(),
        todoText: todo,
        isCompleted: false,
      },
    ]);
    setTodo("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const newTodos = todos.map((todo) => {
      if (id === todo.id) {
        todo.todoText = editedText;
      }
      return todo;
    });
    setTodos(newTodos);
    setEditedTodo(null);
  };

  const toggleTodoState = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    // console.log(todos);
  }, [todos]);

  const setInputFocus = (input: HTMLInputElement | null) => {
    if (input !== null) {
      input.focus();
    }
  };

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json || "[]") as TodoItem[];
    if (loadedTodos.length > 0) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  return (
    <div className="todo-card bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <div className="todos-wrapper">
        <h3 className="todo-heading">Todos</h3>
        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            className="todo-input "
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            ref={(input) => setInputFocus(input)}
          />
          <button type="submit" className="btn-add">
            Add +
          </button>
        </form>
        {todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            {todo.id === editedTodo ? (
              <div className="todo-wrapper">
                <form onSubmit={(e) => editTodo(e, todo.id)}>
                  <input
                    type="text"
                    className="todo-input input-edit"
                    onChange={(e) => setEditedText(e.target.value)}
                    defaultValue={todo.todoText}
                    ref={(input) => setInputFocus(input)}
                  />
                </form>
                <button
                  className="todo-controls cancel"
                  onClick={() => setEditedTodo(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="todo-wrapper">
                <span
                  className={
                    "todo-text " +
                    (todo.isCompleted === true ? "completed" : "")
                  }
                >
                  {todo.todoText}
                </span>
                <div className="todo-controls">
                  {todo.isCompleted === true ? (
                    <ImCheckboxChecked
                      onClick={() => toggleTodoState(todo.id)}
                    />
                  ) : (
                    <ImCheckboxUnchecked
                      onClick={() => toggleTodoState(todo.id)}
                    />
                  )}
                  <RiDeleteBin6Line onClick={() => deleteTodo(todo.id)} />
                  <AiFillEdit onClick={() => setEditedTodo(todo.id)} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
