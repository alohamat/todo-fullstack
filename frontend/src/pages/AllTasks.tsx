import Dashboard from "../components/Dashboard";
import NewTaskButton from "../components/NewTaskButton";
import Task from "../components/Task";
import TaskPopup from "../components/TaskPopup";
import { useTasks } from "../context/TaskContext";
import { useState } from "react";

function AllTasks() {
  const { tasks, addTask } = useTasks();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <Dashboard>
      <NewTaskButton click={() => setIsPopupOpen(true)}/>

      <div className="flex flex-col gap-3 mt-6 w-[90%] self-center">
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No tasks yet. Click the button to add! 🚀
          </p>
        ) : (
          tasks.map((task) => <Task key={task.id} task={task} />)
        )}
      </div>
      {isPopupOpen && <TaskPopup onSave={(text, dueDate) => addTask(text, dueDate)}
    onClose={() => setIsPopupOpen(false)} />}
    </Dashboard>
  );
}

export default AllTasks;
