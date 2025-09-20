import Dashboard from "../components/Dashboard";
import Task from "../components/Task";
import TaskPopup from "../components/TaskPopup";
import { useTasks } from "../context/TaskContext";
import { useState } from "react";

function AllTasks() {
  const { tasks, addTask } = useTasks();
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);

  const handleSave = (text: string, dueDate?: Date): boolean => {
  const ok = addTask(text, dueDate);
  if (!ok) {
    alert("❌ Não dá pra criar tarefa com vencimento no passado!");
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
