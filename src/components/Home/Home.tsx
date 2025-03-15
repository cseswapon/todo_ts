"use client";

import React, { useCallback, useState, useEffect } from "react";
import TodoListShow from "./TodoListShow";

interface Task {
  name: string;
  data: { id: number; name: string }[];
  editing?: { id: number; name: string } | null;
}

const Home: React.FC = () => {
  const [state, setState] = useState<Task>({
    name: "",
    data: [],
    editing: null,
  });

  useEffect(() => {
    const savedData = localStorage.getItem("todos");
    if (savedData) {
      setState((prev) => ({ ...prev, data: JSON.parse(savedData) }));
    }
  }, []);

  useEffect(() => {
    if (state.data.length > 0) {
      localStorage.setItem("todos", JSON.stringify(state.data));
    }
  }, [state.data]);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, name: e.target.value }));
  };

  const handelSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (state.editing) {
        setState((prev) => ({
          ...prev,
          data: prev.data.map((task) =>
            task.id === prev.editing?.id ? { ...task, name: state.name } : task
          ),
          editing: null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          data: [...prev.data, { id: prev.data.length + 1, name: state.name }],
        }));
      }

      reset();
    },
    [state]
  );

  const reset = () => {
    setState((prev) => ({ ...prev, name: "" }));
  };

  const handelDeleteTask = (id: number) => {
    const confirm = window.confirm("Are Your Sure Task Delete ? ");
    if (confirm) {
      const deleteData = state.data.filter((item) => item.id !== id);
      setState((prev) => ({ ...prev, data: deleteData }));
    }
  };

  const handelEditTask = (id: number, name: string) => {
    setState((prev) => ({ ...prev, editing: { id, name }, name }));
  };

  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold pb-1">
        {state.editing ? "Edit Todo" : "Create Todo List"}
      </h1>
      <form onSubmit={handelSubmit} className="flex gap-2 items-center my-2">
        <input
          type="text"
          name="task_name"
          id="task_name"
          className="w-full focus:outline-0 border p-1 rounded"
          value={state.name}
          onChange={handelChange}
          placeholder={state.editing ? "Edit Task Name" : "Task Name"}
        />
        <button
          type="submit"
          className="dark:bg-gray-800 dark:text-white bg-gray-300 text-black py-2 w-32 px-4 cursor-pointer rounded text-sm"
        >
          {state.editing ? "Update Task" : "Create Task"}
        </button>
      </form>

      {state.data.length > 0 && (
        <div>
          <h1 className="text-2xl font-bold pb-1">All Todo List Show</h1>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="dark:bg-gray-800 dark:text-white bg-gray-300 text-black">
              <tr>
                <th className="px-4 py-2 border-b text-left">SL</th>
                <th className="px-4 py-2 border-b text-left">Task Name</th>
                <th className="px-4 py-2 border-b text-center">Action</th>
              </tr>
            </thead>
            {state.data.map((item) => (
              <TodoListShow
                key={item.id}
                id={item.id}
                name={item.name}
                handelDeleteTask={handelDeleteTask}
                handelEditTask={handelEditTask}
              />
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
