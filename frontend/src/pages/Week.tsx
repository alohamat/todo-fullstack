import { useState, useMemo } from "react";
import Dashboard from "../components/Dashboard";
import Task from "../components/Task";
import { useTasks } from "../context/TaskContext";
import { startOfWeek, endOfWeek } from "../utils/dateUtils";

function Week() {
  const { tasks } = useTasks();
  const [weekStartDay, setWeekStartDay] = useState<0 | 1>(0); // 0=Sunday, 1=Monday

  const weekRange = useMemo(() => {
    const now = new Date();
    return {
      from: startOfWeek(now, weekStartDay),
      to: endOfWeek(now, weekStartDay),
    };
  }, [weekStartDay]);

  const weekTasks = useMemo(() => {
    return tasks
      .filter((t) => t.dueDate)
      .filter((t) => {
        const due = new Date(t.dueDate as any);
        return due >= weekRange.from && due <= weekRange.to;
      })
      .sort((a, b) => new Date(a.dueDate as any).getTime() - new Date(b.dueDate as any).getTime());
  }, [tasks, weekRange]);

  return (
    <Dashboard>
      <div className="flex flex-col gap-3 mt-6 w-[90%] self-center">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-3 text-amber-300">This Week</h1>
          <div className="flex items-center gap-2">
            <label className="text-sm text-amber-300">Week starts on:</label>
            <select
              value={weekStartDay}
              onChange={(e) => setWeekStartDay(Number(e.target.value) as 0 | 1)}
              className="border px-2 py-1 rounded text-amber-300"
            >
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          {`Week: ${weekRange.from.toLocaleDateString()} — ${weekRange.to.toLocaleDateString()}`}
        </p>

        {weekTasks.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No tasks due this week. Add some chaos to your schedule! 🤘
          </p>
        ) : (
          weekTasks.map((task) => <Task key={task.id} task={task} />)
        )}
      </div>
    </Dashboard>
  );
}

export default Week;
