import { useMemo } from "react";
import Dashboard from "../components/Dashboard";
import Task from "../components/Task";
import { useTasks } from "../context/TaskContext";
import { startOfDay, isSameDay } from "../utils/dateUtils";

function Today() {
  const { tasks } = useTasks();

  const todayTasks = useMemo(() => {
    const today = new Date();
    return tasks
      .filter((t) => t.dueDate) // só tasks com dueDate
      .filter((t) => isSameDay(new Date(t.dueDate as any), today))
      .sort((a, b) => new Date(a.dueDate as any).getTime() - new Date(b.dueDate as any).getTime());
  }, [tasks]);

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
    </Dashboard>
  );
}

export default Today;
