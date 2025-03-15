import React from "react";

interface GreetingProps {
  id: number;
  name: string;
  handelDeleteTask: (id: number) => void;
  handelEditTask: (id: number, name: string) => void;
}

const TodoListShow: React.FC<GreetingProps> = ({
  id,
  name,
  handelDeleteTask,
  handelEditTask,
}) => {
  return (
    <>
      <tbody>
        <tr>
          <td className="px-4 py-2 border-b">{id}</td>
          <td className="px-4 py-2 border-b">{name}</td>
          <td className="px-4 py-2 border-b flex justify-center">
            <button
              onClick={() => handelEditTask(id, name)}
              className="bg-green-800 text-white tex-xs px-2 rounded me-2"
            >
              Edit
            </button>
            <button
              onClick={() => handelDeleteTask(id)}
              className="bg-red-800 text-white tex-xs px-2 rounded me-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TodoListShow;
