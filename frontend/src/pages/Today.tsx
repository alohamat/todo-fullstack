// src/pages/Today.tsx
import { useState, useMemo } from "react";
import Dashboard from "../components/Dashboard";
import Task from "../components/Task";
import TaskPopup from "../components/TaskPopup";
import { useTasks } from "../context/TaskContext";
import { startOfDay, endOfDay, isSameDay } from "../utils/dateUtils";

function Today() {
  const { tasks, addTask } = useTasks();
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);

  const todayTasks = useMemo(() => {
    const today = new Date();
    // filter tasks that are due today
    return tasks
      .filter((t) => t.dueDate && t.dueDate instanceof Date)
      .filter((t) => isSameDay(t.dueDate!, today))
      .sort((a, b) => a.dueDate!.getTime() - b.dueDate!.getTime());
  }, [tasks]);

  const handleSave = (text: string, dueDate?: Date): boolean => {
    if (!dueDate) dueDate = new Date();
    const ok = addTask(text, dueDate);
    if (!ok) {
      alert("❌ Can't create a task with a past due date!");
      return false;
    }
    setIsTaskPopupOpen(false);
    return true;
  };

  const todayLabel = startOfDay(new Date()).toLocaleDateString();

  return (
    <Dashboard>
      <div className="flex flex-col gap-3 mt-6 w-[90%] self-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-3 text-amber-300">Today</h1>
          <p className="text-sm text-gray-500">{todayLabel}</p>
        </div>

        {todayTasks.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No tasks due today. Chill or create one! ☕
          </p>
        ) : (
          todayTasks.map((task) => <Task key={task.id} task={task} />)
        )}
      </div>

      {isTaskPopupOpen && (
        <TaskPopup
          onSave={handleSave}
          onClose={() => setIsTaskPopupOpen(false)}
        />
      )}

      <button
        onClick={() => setIsTaskPopupOpen(true)}
        className="fixed right-6 bottom-6 bg-amber-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-amber-600 transition"
        aria-label="Add task"
      >
        +
      </button>
    </Dashboard>
  );
}

export default Today;
