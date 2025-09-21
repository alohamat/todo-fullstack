// src/pages/Today.tsx
import { useState, useMemo } from "react";
import Dashboard from "../components/Dashboard";
import Task from "../components/Task";
import TaskPopup from "../components/TaskPopup";
import { useTasks } from "../context/TaskContext";
import { startOfDay, isSameDay } from "../utils/dateUtils";

function Today() {
  const { tasks, addTask } = useTasks();
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);

  const todayTasks = useMemo(() => {
  const today = new Date();
  return tasks
    .filter((t) => !!t.dueDate)
    .filter((t) => {
      const due = new Date(t.dueDate as any);
      return isSameDay(due, today)
    })
    .sort((a, b) => {
      const dueA = new Date(a.dueDate as any).getTime();
      const dueB = new Date(b.dueDate as any).getTime();
      return dueA - dueB;
    });
}, [tasks]);

  const handleSave = async (text: string, dueDate?: Date) => {
  const ok = await addTask(text, dueDate);
  if (!ok) {
    alert("❌ Can't create a task in the past!");
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
    </Dashboard>
  );
}

export default Today;
