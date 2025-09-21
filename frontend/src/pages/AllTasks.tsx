import Dashboard from "../components/Dashboard";
import Task from "../components/Task";
import { useTasks } from "../context/TaskContext";
import { useEffect } from "react";

function AllTasks() {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    console.log("AllTasks mounted");
  }, []);

  // Carregar tasks do backend ao montar
  useEffect(() => {
    fetchTasks().catch((err) => {
      console.error("❌ Erro ao carregar tasks:", err);
    });
  }, [fetchTasks]);

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
    </Dashboard>
  );
}

export default AllTasks;
