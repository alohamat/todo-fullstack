import { useState } from "react";
import type { Task as TaskType } from "../context/TaskContext";
import { useTasks } from "../context/TaskContext";

export default function Task({ task }: { task: TaskType }) {
  const [checked, setChecked] = useState(false);
  const { removeTask } = useTasks();

  return (
    <div
      className="group flex items-center justify-between cursor-pointer my-2 p-3 rounded-2xl bg-white w-full mx-2"
    >
      <div className="flex items-center" onClick={() => setChecked(!checked)}>
        <svg width="28" height="28" viewBox="0 0 24 24" className="mr-2">
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="4"
            className={`fill-none stroke-[3] transition-colors duration-300 ${
              checked ? "stroke-green-500" : "stroke-gray-400"
            }`}
          />
          <path
            d="M4 12l6 6L20 6"
            fill="none"
            stroke={checked ? "green" : "transparent"}
            strokeWidth="3"
            strokeDasharray="24"
            strokeDashoffset={checked ? 0 : 24}
            style={{ transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease" }}
          />
        </svg>

        <div className="text-xs text-gray-400">
          <h1
            className={`font-bold text-xl transition-colors duration-300 ${
              checked ? "line-through text-gray-500" : "text-black"
            }`}
          >
            {task.text}
          </h1>
          Created: {task.createdAt.toLocaleDateString()}
          {task.dueDate && ` | Expires: ${task.dueDate.toLocaleDateString()}`}
        </div>
      </div>

       <button
        onClick={() => removeTask(task.id)}
        className="ml-4 text-red-500 font-bold hover:text-red-700 transition-opacity xl:opacity-0 xl:group-hover:opacity-100 hover:cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}
