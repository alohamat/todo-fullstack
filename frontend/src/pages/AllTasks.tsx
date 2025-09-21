import Dashboard from "../components/Dashboard";
import Task from "../components/Task";
import TaskPopup from "../components/TaskPopup";
import { useTasks } from "../context/TaskContext";
import { useState, useEffect } from "react";

function AllTasks() {
  const { tasks, addTask, fetchTasks } = useTasks();
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);

  // Carregar tasks do backend ao montar
  useEffect(() => {
    fetchTasks().catch(err => {
      console.error("❌ Erro ao carregar tasks:", err);
    });
  }, [fetchTasks]);

  const handleSave = async (text: string, dueDate?: Date): Promise<boolean> => {
    const ok = await addTask(text, dueDate);
    if (!ok) {
      alert("❌ Can't create a task with due in past!");
      return false;
    }
    setIsTaskPopupOpen(false);
    return true;
  };

  return (
    <Dashboard>
      <div className="flex flex-col gap-3 mt-6 w-[90%] self-center">
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No tasks yet. Click the button to add! 🚀
          </p>
        ) : (
          tasks.map((task) => <Task key={task.id} task={task} />)
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

export default AllTasks;
